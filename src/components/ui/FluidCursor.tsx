"use client";

import { useEffect, useRef, useState } from "react";
import * as Shaders from "./fluid/cursorShaders";

// Interface for mouse info
interface MouseInfos {
    current: number[] | null;
    last: number[] | null;
    velocity: number[] | null;
}

const FluidCursor = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        // --- THEME OBSERVER ---
        const updateTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setTheme(isDark ? 'dark' : 'light');
        };
        updateTheme();
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((m) => {
                if (m.attributeName === 'class') updateTheme();
            });
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        const canvas = canvasRef.current;
        if (!canvas) return;

        let device: GPUDevice;
        let context: GPUCanvasContext;
        let presentationFormat: GPUTextureFormat;

        // Simulation Settings (CodePen Config)
        const settings: any = {
            grid_size: 64,
            dye_size: 256,
            sim_speed: 5,
            contain_fluid: true,
            velocity_add_intensity: 0.28,
            velocity_add_radius: 0.001,
            velocity_diffusion: 1,
            dye_add_intensity: 0.8,
            dye_add_radius: 0.0035,
            dye_diffusion: 0.96204,
            viscosity: 0,
            vorticity: 0,
            pressure_iterations: 8,
            buffer_view: "dye",
            input_symmetry: "none", // 0

            // Dynamic props
            grid_w: 0, grid_h: 0,
            dye_w: 0, dye_h: 0,
            dx: 0, rdx: 0, dyeRdx: 0,
            time: 0, dt: 0, reset: () => { }
        };

        const mouseInfos: MouseInfos = {
            current: null,
            last: null,
            velocity: null
        };

        // Buffers
        let velocity: DynamicBuffer, velocity0: DynamicBuffer;
        let dye: DynamicBuffer, dye0: DynamicBuffer;
        let divergence: DynamicBuffer, divergence0: DynamicBuffer;
        let pressure: DynamicBuffer, pressure0: DynamicBuffer;
        let vorticity: DynamicBuffer;

        // Uniforms
        const globalUniforms: Record<string, Uniform> = {};
        let time: Uniform, dt: Uniform, mouse: Uniform, grid: Uniform;
        let uSimSpeed: Uniform, vel_force: Uniform, vel_radius: Uniform, vel_diff: Uniform;
        let dye_force: Uniform, dye_radius: Uniform, dye_diff: Uniform;
        let viscosity: Uniform, uVorticity: Uniform, containFluid: Uniform, uSymmetry: Uniform, uRenderIntensity: Uniform;

        // Programs
        let checkerProgram: Program;
        let updateDyeProgram: UpdateProgram;
        let updateProgram: UpdateProgram;
        let advectProgram: AdvectProgram;
        let boundaryProgram: BoundaryProgram;
        let divergenceProgram: DivergenceProgram;
        let boundaryDivProgram: BoundaryProgram;
        let pressureProgram: PressureProgram;
        let boundaryPressureProgram: BoundaryProgram;
        let gradientSubtractProgram: GradientSubtractProgram;
        let advectDyeProgram: AdvectProgram;
        let clearPressureProgram: UpdateProgram;
        let vorticityProgram: VorticityProgram;
        let vorticityConfinmentProgram: VorticityConfinmentProgram;
        let renderProgram: RenderProgram;

        // --- Helper Classes ---

        class DynamicBuffer {
            dims: number;
            bufferSize: number;
            w: number;
            h: number;
            buffers: GPUBuffer[];

            constructor({ dims = 1, w = settings.grid_w, h = settings.grid_h } = {}) {
                this.dims = dims;
                this.bufferSize = w * h * 4;
                this.w = w;
                this.h = h;
                this.buffers = new Array(dims).fill(0).map((_) =>
                    device.createBuffer({
                        size: this.bufferSize,
                        usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC | GPUBufferUsage.COPY_DST
                    })
                );
            }

            copyTo(buffer: DynamicBuffer, commandEncoder: GPUCommandEncoder) {
                for (let i = 0; i < Math.max(this.dims, buffer.dims); i++) {
                    commandEncoder.copyBufferToBuffer(
                        this.buffers[Math.min(i, this.buffers.length - 1)],
                        0,
                        buffer.buffers[Math.min(i, buffer.buffers.length - 1)],
                        0,
                        this.bufferSize
                    );
                }
            }

            clear(queue: GPUQueue) {
                for (let i = 0; i < this.dims; i++) {
                    queue.writeBuffer(this.buffers[i], 0, new Float32Array(this.w * this.h));
                }
            }
        }

        class Uniform {
            name: string;
            size: number;
            needsUpdate: boolean | any;
            alwaysUpdate: boolean = false;
            buffer: GPUBuffer;

            constructor(name: string, { size, value }: { size?: number; value?: any } = {}) {
                this.name = name;
                this.size = size ?? (value && typeof value === "object" ? value.length : 1);
                this.needsUpdate = false;

                if (this.size === 1) {
                    if (settings[name] == null) {
                        settings[name] = value ?? 0;
                        this.alwaysUpdate = true;
                    }
                }

                if (this.size === 1 || value != null) {
                    this.buffer = device.createBuffer({
                        mappedAtCreation: true,
                        size: this.size * 4,
                        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
                    });

                    const arrayBuffer = this.buffer.getMappedRange();
                    const sourceValue = value ?? [settings[this.name]];
                    const sourceArray =
                        typeof sourceValue === "number"
                            ? [sourceValue]
                            : Array.isArray(sourceValue)
                                ? sourceValue
                                : [0];
                    new Float32Array(arrayBuffer).set(new Float32Array(sourceArray));
                    this.buffer.unmap();
                } else {
                    this.buffer = device.createBuffer({
                        size: this.size * 4,
                        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
                    });
                }

                globalUniforms[name] = this;
            }

            setValue(value: any) {
                settings[this.name] = value;
                this.needsUpdate = true;
            }

            update(queue: GPUQueue, value?: any) {
                if (this.needsUpdate || this.alwaysUpdate || value != null) {
                    if (typeof this.needsUpdate !== "boolean") value = this.needsUpdate;
                    queue.writeBuffer(
                        this.buffer,
                        0,
                        new Float32Array(value ?? [parseFloat(settings[this.name])]),
                        0,
                        this.size
                    );
                    this.needsUpdate = false;
                }
            }
        }

        class Program {
            computePipeline: GPUComputePipeline;
            bindGroup: GPUBindGroup;
            dispatchX: number;
            dispatchY: number;

            constructor({
                buffers = [],
                uniforms = [],
                shader,
                dispatchX = settings.grid_w,
                dispatchY = settings.grid_h
            }: {
                buffers?: DynamicBuffer[];
                uniforms?: Uniform[];
                shader: string;
                dispatchX?: number;
                dispatchY?: number;
            }) {
                this.computePipeline = device.createComputePipeline({
                    layout: "auto",
                    compute: {
                        module: device.createShaderModule({ code: shader }),
                        entryPoint: "main"
                    }
                });

                const storageEntries = buffers.map((b) => b.buffers).flat();
                const uniformEntries = uniforms
                    .filter((u) => u && u.buffer)
                    .map((u) => u.buffer);

                const allEntries = [...storageEntries, ...uniformEntries].map(
                    (buffer, i) => ({
                        binding: i,
                        resource: { buffer }
                    })
                );

                this.bindGroup = device.createBindGroup({
                    layout: this.computePipeline.getBindGroupLayout(0),
                    entries: allEntries
                });

                this.dispatchX = dispatchX;
                this.dispatchY = dispatchY;
            }

            dispatch(passEncoder: GPUComputePassEncoder) {
                passEncoder.setPipeline(this.computePipeline);
                passEncoder.setBindGroup(0, this.bindGroup);
                passEncoder.dispatchWorkgroups(
                    Math.ceil(this.dispatchX / 8),
                    Math.ceil(this.dispatchY / 8)
                );
            }
        }

        class RenderProgram {
            vertexBuffer: GPUBuffer;
            renderPipeline: GPURenderPipeline;
            buffer: DynamicBuffer;
            renderBindGroup: GPUBindGroup;
            renderPassDescriptor: GPURenderPassDescriptor;

            constructor() {
                const vertices = new Float32Array([
                    -1, -1, 0, 1, -1, 1, 0, 1, 1, -1, 0, 1,
                    1, -1, 0, 1, -1, 1, 0, 1, 1, 1, 0, 1
                ]);

                this.vertexBuffer = device.createBuffer({
                    size: vertices.byteLength,
                    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
                    mappedAtCreation: true
                });
                new Float32Array(this.vertexBuffer.getMappedRange()).set(vertices);
                this.vertexBuffer.unmap();

                const vertexBuffersDescriptors: GPUVertexBufferLayout[] = [
                    {
                        attributes: [
                            { shaderLocation: 0, offset: 0, format: "float32x4" }
                        ],
                        arrayStride: 16,
                        stepMode: "vertex"
                    }
                ];

                const shaderModule = device.createShaderModule({
                    code: Shaders.renderShader
                });

                this.renderPipeline = device.createRenderPipeline({
                    layout: "auto",
                    vertex: {
                        module: shaderModule,
                        entryPoint: "vertex_main",
                        buffers: vertexBuffersDescriptors
                    },
                    fragment: {
                        module: shaderModule,
                        entryPoint: "fragment_main",
                        targets: [{
                            format: presentationFormat, blend: {
                                color: { srcFactor: 'src-alpha', dstFactor: 'one', operation: 'add' },
                                alpha: { srcFactor: 'zero', dstFactor: 'one', operation: 'add' },
                            }
                        }] // Additive blend for light-on-dark
                    },
                    primitive: { topology: "triangle-list" }
                });

                this.buffer = new DynamicBuffer({
                    dims: 3,
                    w: settings.dye_w,
                    h: settings.dye_h
                });

                const entries = [
                    ...this.buffer.buffers,
                    globalUniforms.gridSize.buffer,
                    globalUniforms.render_intensity_multiplier.buffer
                ].map((b, i) => ({
                    binding: i,
                    resource: { buffer: b }
                }));

                this.renderBindGroup = device.createBindGroup({
                    layout: this.renderPipeline.getBindGroupLayout(0),
                    entries
                });

                this.renderPassDescriptor = {
                    colorAttachments: [
                        {
                            view: undefined as any, // assigned later
                            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.0 }, // Transparent clear
                            loadOp: "clear",
                            storeOp: "store"
                        }
                    ]
                };
            }

            dispatch(commandEncoder: GPUCommandEncoder) {
                // @ts-ignore
                this.renderPassDescriptor.colorAttachments[0].view = context
                    .getCurrentTexture()
                    .createView();

                const renderPassEncoder = commandEncoder.beginRenderPass(
                    this.renderPassDescriptor
                );

                renderPassEncoder.setPipeline(this.renderPipeline);
                renderPassEncoder.setBindGroup(0, this.renderBindGroup);
                renderPassEncoder.setVertexBuffer(0, this.vertexBuffer);
                renderPassEncoder.draw(6);
                renderPassEncoder.end();
            }
        }

        // --- Subclass wrappers for Programs --- 
        class AdvectProgram extends Program {
            constructor({ in_quantity, in_velocity, out_quantity, uniforms, shader = Shaders.advectShader, ...props }: any) {
                uniforms ??= [globalUniforms.gridSize];
                super({ buffers: [in_quantity, in_velocity, out_quantity], uniforms, shader, ...props });
            }
        }
        class DivergenceProgram extends Program {
            constructor({ in_velocity, out_divergence, uniforms, shader = Shaders.divergenceShader }: any) {
                uniforms ??= [globalUniforms.gridSize];
                super({ buffers: [in_velocity, out_divergence], uniforms, shader });
            }
        }
        class PressureProgram extends Program {
            constructor({ in_pressure, in_divergence, out_pressure, uniforms, shader = Shaders.pressureShader }: any) {
                uniforms ??= [globalUniforms.gridSize];
                super({ buffers: [in_pressure, in_divergence, out_pressure], uniforms, shader });
            }
        }
        class GradientSubtractProgram extends Program {
            constructor({ in_pressure, in_velocity, out_velocity, uniforms, shader = Shaders.gradientSubtractShader }: any) {
                uniforms ??= [globalUniforms.gridSize];
                super({ buffers: [in_pressure, in_velocity, out_velocity], uniforms, shader });
            }
        }
        class BoundaryProgram extends Program {
            constructor({ in_quantity, out_quantity, uniforms, shader = Shaders.boundaryShader }: any) {
                uniforms ??= [globalUniforms.gridSize];
                super({ buffers: [in_quantity, out_quantity], uniforms, shader });
            }
        }
        class UpdateProgram extends Program {
            constructor({ in_quantity, out_quantity, uniforms, shader = Shaders.updateVelocityShader, ...props }: any) {
                uniforms ??= [globalUniforms.gridSize];
                super({ buffers: [in_quantity, out_quantity], uniforms, shader, ...props });
            }
        }
        class VorticityProgram extends Program {
            constructor({ in_velocity, out_vorticity, uniforms, shader = Shaders.vorticityShader, ...props }: any) {
                uniforms ??= [globalUniforms.gridSize];
                super({ buffers: [in_velocity, out_vorticity], uniforms, shader, ...props });
            }
        }
        class VorticityConfinmentProgram extends Program {
            constructor({ in_velocity, in_vorticity, out_velocity, uniforms, shader = Shaders.vorticityConfinmentShader, ...props }: any) {
                uniforms ??= [globalUniforms.gridSize];
                super({ buffers: [in_velocity, in_vorticity, out_velocity], uniforms, shader, ...props });
            }
        }

        // --- Init Functions ---

        function initBuffers() {
            velocity = new DynamicBuffer({ dims: 2 });
            velocity0 = new DynamicBuffer({ dims: 2 });
            dye = new DynamicBuffer({ dims: 3, w: settings.dye_w, h: settings.dye_h });
            dye0 = new DynamicBuffer({ dims: 3, w: settings.dye_w, h: settings.dye_h });
            divergence = new DynamicBuffer();
            divergence0 = new DynamicBuffer();
            pressure = new DynamicBuffer();
            pressure0 = new DynamicBuffer();
            vorticity = new DynamicBuffer();
        }

        function initUniforms() {
            time = new Uniform("time");
            dt = new Uniform("dt");
            mouse = new Uniform("mouseInfos", { size: 4 });
            grid = new Uniform("gridSize", {
                size: 7,
                value: [
                    settings.grid_w, settings.grid_h, settings.dye_w, settings.dye_h, settings.dx, settings.rdx, settings.dyeRdx
                ]
            });
            uSimSpeed = new Uniform("sim_speed", { value: settings.sim_speed });
            vel_force = new Uniform("velocity_add_intensity", { value: settings.velocity_add_intensity });
            vel_radius = new Uniform("velocity_add_radius", { value: settings.velocity_add_radius });
            vel_diff = new Uniform("velocity_diffusion", { value: settings.velocity_diffusion });
            dye_force = new Uniform("dye_add_intensity", { value: settings.dye_add_intensity });
            dye_radius = new Uniform("dye_add_radius", { value: settings.dye_add_radius });
            dye_diff = new Uniform("dye_diffusion", { value: settings.dye_diffusion });
            viscosity = new Uniform("viscosity", { value: settings.viscosity });
            uVorticity = new Uniform("vorticity", { value: settings.vorticity });
            containFluid = new Uniform("contain_fluid", { value: settings.contain_fluid });
            uSymmetry = new Uniform("mouse_type", { value: 0 });
            uRenderIntensity = new Uniform("render_intensity_multiplier", { value: 1 });
        }

        function initPrograms() {
            checkerProgram = new Program({
                buffers: [dye],
                shader: Shaders.checkerboardShader,
                dispatchX: settings.dye_w,
                dispatchY: settings.dye_h,
                uniforms: [grid, time]
            });

            updateDyeProgram = new UpdateProgram({
                in_quantity: dye, out_quantity: dye0,
                uniforms: [grid, mouse, dye_force, dye_radius, dye_diff, time, dt, uSymmetry],
                dispatchX: settings.dye_w, dispatchY: settings.dye_h,
                shader: Shaders.updateDyeShader
            });

            updateProgram = new UpdateProgram({
                in_quantity: velocity, out_quantity: velocity0,
                uniforms: [grid, mouse, vel_force, vel_radius, vel_diff, dt, time, uSymmetry]
            });

            advectProgram = new AdvectProgram({ in_quantity: velocity0, in_velocity: velocity0, out_quantity: velocity, uniforms: [grid, dt] });
            boundaryProgram = new BoundaryProgram({ in_quantity: velocity, out_quantity: velocity0, uniforms: [grid, containFluid] });
            divergenceProgram = new DivergenceProgram({ in_velocity: velocity0, out_divergence: divergence0 });
            boundaryDivProgram = new BoundaryProgram({ in_quantity: divergence0, out_quantity: divergence, shader: Shaders.boundaryPressureShader });
            pressureProgram = new PressureProgram({ in_pressure: pressure, in_divergence: divergence, out_pressure: pressure0 });
            boundaryPressureProgram = new BoundaryProgram({ in_quantity: pressure0, out_quantity: pressure, shader: Shaders.boundaryPressureShader });
            gradientSubtractProgram = new GradientSubtractProgram({ in_pressure: pressure, in_velocity: velocity0, out_velocity: velocity });

            advectDyeProgram = new AdvectProgram({
                in_quantity: dye0, in_velocity: velocity, out_quantity: dye,
                uniforms: [grid, dt], dispatchX: settings.dye_w, dispatchY: settings.dye_h,
                shader: Shaders.advectDyeShader
            });

            clearPressureProgram = new UpdateProgram({
                in_quantity: pressure, out_quantity: pressure0,
                uniforms: [grid, viscosity], shader: Shaders.clearPressureShader
            });

            vorticityProgram = new VorticityProgram({ in_velocity: velocity, out_vorticity: vorticity });
            vorticityConfinmentProgram = new VorticityConfinmentProgram({
                in_velocity: velocity, in_vorticity: vorticity, out_velocity: velocity0,
                uniforms: [grid, dt, uVorticity]
            });

            renderProgram = new RenderProgram();
        }

        function initSizes() {
            const dpr = window.devicePixelRatio || 1;
            const aspectRatio = window.innerWidth / window.innerHeight;
            const maxBufferSize = device.limits.maxStorageBufferBindingSize;
            const maxCanvasSize = device.limits.maxTextureDimension2D;

            const getPreferredDimensions = (baseSize: number) => {
                let w, h;
                const scaledBaseSize = baseSize * dpr;
                if (aspectRatio > 1) {
                    h = scaledBaseSize;
                    w = Math.floor(h * aspectRatio);
                } else {
                    w = scaledBaseSize;
                    h = Math.floor(w / aspectRatio);
                }
                return getValidDimensions(w, h);
            };

            const getValidDimensions = (w: number, h: number) => {
                let downRatio = 1;
                if (w * h * 4 >= maxBufferSize) downRatio = Math.sqrt(maxBufferSize / (w * h * 4));
                if (w > maxCanvasSize) downRatio = maxCanvasSize / w;
                else if (h > maxCanvasSize) downRatio = maxCanvasSize / h;
                return { w: Math.floor(w * downRatio), h: Math.floor(h * downRatio) };
            };

            let gridSize = getPreferredDimensions(settings.grid_size);
            settings.grid_w = gridSize.w;
            settings.grid_h = gridSize.h;

            let dyeSize = getPreferredDimensions(settings.dye_size);
            settings.dye_w = dyeSize.w;
            settings.dye_h = dyeSize.h;

            settings.rdx = settings.grid_size * 4;
            settings.dyeRdx = settings.dye_size * 4;
            settings.dx = 1 / settings.rdx;

            canvas.width = settings.dye_w;
            canvas.height = settings.dye_h;
        }

        function refreshSizes() {
            initSizes();
            initBuffers();
            initPrograms();
            globalUniforms.gridSize.needsUpdate = [
                settings.grid_w, settings.grid_h, settings.dye_w, settings.dye_h, settings.dx, settings.rdx, settings.dyeRdx
            ];
        }

        // --- Main Logic ---

        async function initContext() {
            if (!navigator.gpu) {
                console.warn("WebGPU not supported");
                return false;
            }
            const adapter = await navigator.gpu.requestAdapter();
            if (!adapter) {
                console.warn("No adapter found");
                return false;
            }
            device = await adapter.requestDevice();
            context = canvas.getContext("webgpu") as unknown as GPUCanvasContext;
            if (!context) {
                console.warn("No context");
                return false;
            }

            canvas.style.width = "100%";
            canvas.style.height = "100%";

            presentationFormat = navigator.gpu.getPreferredCanvasFormat();
            context.configure({
                device,
                format: presentationFormat,
                usage: GPUTextureUsage.RENDER_ATTACHMENT,
                alphaMode: "premultiplied"
            });

            initSizes();
            return true;
        }

        function handlePointerMove(e: MouseEvent | TouchEvent) {
            const pointer = (e as TouchEvent).touches ? (e as TouchEvent).touches[0] : (e as MouseEvent);
            const rect = canvas.getBoundingClientRect();
            if (!mouseInfos.current) mouseInfos.current = [];
            // Important: invert Y calculation or match shader space
            mouseInfos.current[0] = (pointer.clientX - rect.left) / rect.width;
            mouseInfos.current[1] = 1 - (pointer.clientY - rect.top) / rect.height;
        }

        let animationId: number;

        async function main() {
            const success = await initContext();
            if (!success) return;

            initBuffers();
            initUniforms();
            initPrograms();

            settings.reset = () => {
                velocity.clear(device.queue);
                dye.clear(device.queue);
                pressure.clear(device.queue);
                settings.time = 0;
            };

            // Loop
            let lastFrame = performance.now();

            function step() {
                animationId = requestAnimationFrame(step);
                const now = performance.now();
                settings.dt = Math.min(1 / 60, (now - lastFrame) / 1000) * settings.sim_speed;
                settings.time += settings.dt;
                lastFrame = now;

                Object.values(globalUniforms).forEach((u) => u.update(device.queue));

                if (mouseInfos.current) {
                    let dx = mouseInfos.last ? mouseInfos.current[0] - mouseInfos.last[0] : 0;
                    let dy = mouseInfos.last ? mouseInfos.current[1] - mouseInfos.last[1] : 0;
                    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
                    if (isMobile) {
                        dx *= 0.2; dy *= 0.2;
                    }
                    mouseInfos.velocity = [dx, dy];
                    mouse.update(device.queue, [...mouseInfos.current, ...mouseInfos.velocity]);
                    mouseInfos.last = [...mouseInfos.current];
                }

                // Dispatch Compute
                const commandEncoder = device.createCommandEncoder();
                const passEncoder = commandEncoder.beginComputePass();

                updateDyeProgram.dispatch(passEncoder);
                updateProgram.dispatch(passEncoder);
                advectProgram.dispatch(passEncoder);
                boundaryProgram.dispatch(passEncoder);
                divergenceProgram.dispatch(passEncoder);
                boundaryDivProgram.dispatch(passEncoder);
                for (let i = 0; i < settings.pressure_iterations; i++) {
                    pressureProgram.dispatch(passEncoder);
                    boundaryPressureProgram.dispatch(passEncoder);
                }
                gradientSubtractProgram.dispatch(passEncoder);
                clearPressureProgram.dispatch(passEncoder);
                vorticityProgram.dispatch(passEncoder);
                vorticityConfinmentProgram.dispatch(passEncoder);
                advectDyeProgram.dispatch(passEncoder);
                passEncoder.end();

                velocity0.copyTo(velocity, commandEncoder);
                pressure0.copyTo(pressure, commandEncoder);
                dye.copyTo(renderProgram.buffer, commandEncoder);

                // Draw
                renderProgram.dispatch(commandEncoder);
                device.queue.submit([commandEncoder.finish()]);
            }

            step();
        }

        main();

        // Event Listeners
        window.addEventListener("mousemove", handlePointerMove);
        window.addEventListener("touchmove", handlePointerMove, { passive: false });
        window.addEventListener("resize", refreshSizes);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("mousemove", handlePointerMove);
            window.removeEventListener("touchmove", handlePointerMove);
            window.removeEventListener("resize", refreshSizes);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className={`fixed inset-0 w-full h-full pointer-events-none z-[100] transition-all duration-500 ${theme === 'light'
                        ? 'mix-blend-multiply opacity-60 invert'
                        : 'mix-blend-screen opacity-80'
                    }`}
                style={{ touchAction: 'none' }}
            />
            {/* Overlay for fallback text if WebGPU fails? */}
            <div className="webgpu-not-supported hidden fixed bottom-4 right-4 text-red-500 bg-black/80 p-2 text-xs">
                WebGPU Not Supported
            </div>
        </>
    );
};

export default FluidCursor;
