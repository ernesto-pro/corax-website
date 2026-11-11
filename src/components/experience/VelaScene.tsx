import { useEffect, useRef } from "react";
import * as THREE from "three";

export type SceneNode = { slug: string; angle: number; accent: string };

type Props = {
  nodes: SceneNode[];
  activeRef: React.RefObject<string | null>;
  labelsRef: React.RefObject<HTMLDivElement | null>;
  onSelect: (slug: string) => void;
  onFail?: () => void;
  onReady?: () => void;
  reduced: boolean;
};

const NODE_R = 4.7;
const NODE_Y = 0.55;

export default function VelaScene({
  nodes,
  activeRef,
  labelsRef,
  onSelect,
  onFail,
  onReady,
  reduced,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const selectRef = useRef(onSelect);
  const failRef = useRef(onFail);
  const readyRef = useRef(onReady);
  selectRef.current = onSelect;
  failRef.current = onFail;
  readyRef.current = onReady;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      failRef.current?.();
      return;
    }
    if (!renderer.getContext()) {
      failRef.current?.();
      return;
    }

    const small = window.innerWidth < 760;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.8));
    renderer.setClearColor(0x08070d, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08070d, 0.038);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 80);
    camera.position.set(0, 4.4, 14);
    const look = new THREE.Vector3(0, 1.9, 0);

    const root = new THREE.Group();
    scene.add(root);

    const disposables: Array<{ dispose: () => void }> = [];
    const track = <T extends { dispose: () => void }>(item: T) => {
      disposables.push(item);
      return item;
    };

    /* Lights */
    scene.add(new THREE.AmbientLight(0x6f5ce0, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(-7, 10, 8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x8f7cff, 0.9);
    rim.position.set(8, 4, -8);
    scene.add(rim);
    const coreLight = new THREE.PointLight(0x5b3df5, 38, 22, 1.6);
    coreLight.position.set(0, 2.4, 0);
    scene.add(coreLight);
    const acidLight = new THREE.PointLight(0xc8ff4d, 14, 12, 2);
    acidLight.position.set(3.4, 2.6, 3.2);
    scene.add(acidLight);

    /* Core */
    const CORE_Y = 2.15;
    const core = new THREE.Group();
    core.position.set(0, CORE_Y, 0);
    root.add(core);

    const coreGeo = track(new THREE.IcosahedronGeometry(1.12, 1));
    const coreMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x1a1140,
        emissive: 0x2a1890,
        emissiveIntensity: 0.55,
        metalness: 0.9,
        roughness: 0.24,
        flatShading: true,
      }),
    );
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    core.add(coreMesh);

    const wireGeo = track(new THREE.WireframeGeometry(coreGeo));
    const wireMat = track(
      new THREE.LineBasicMaterial({
        color: 0xa595ff,
        transparent: true,
        opacity: 0.45,
      }),
    );
    const wire = new THREE.LineSegments(wireGeo, wireMat);
    wire.scale.setScalar(1.006);
    core.add(wire);

    const glowGeo = track(new THREE.SphereGeometry(1.62, 32, 24));
    const glowMat = track(
      new THREE.MeshBasicMaterial({
        color: 0x5b3df5,
        transparent: true,
        opacity: 0.09,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    const glow = new THREE.Mesh(glowGeo, glowMat);
    core.add(glow);

    const ringSpecs = [
      { r: 1.9, color: 0xc8ff4d, tilt: 1.05, spin: 0.16, opacity: 0.55 },
      { r: 2.35, color: 0x5b3df5, tilt: -0.62, spin: -0.1, opacity: 0.5 },
      { r: 2.85, color: 0xff5a3c, tilt: 0.3, spin: 0.06, opacity: 0.3 },
    ];
    const rings = ringSpecs.map((spec, i) => {
      const geo = track(new THREE.TorusGeometry(spec.r, 0.008, 6, 180));
      const mat = track(
        new THREE.MeshBasicMaterial({
          color: spec.color,
          transparent: true,
          opacity: spec.opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = spec.tilt;
      mesh.rotation.y = i * 0.5;
      core.add(mesh);
      return { mesh, spin: spec.spin };
    });

    /* Floor */
    const floorMat = track(
      new THREE.LineBasicMaterial({
        color: 0x2a2166,
        transparent: true,
        opacity: 0.55,
      }),
    );
    const floor = new THREE.Group();
    root.add(floor);
    [1.3, 2.4, 3.5, 4.7, 5.9, 7.2, 8.7].forEach((radius) => {
      const points: THREE.Vector3[] = [];
      for (let i = 0; i < 128; i += 1) {
        const a = (i / 128) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
      }
      const geo = track(new THREE.BufferGeometry().setFromPoints(points));
      floor.add(new THREE.LineLoop(geo, floorMat));
    });
    for (let i = 0; i < 24; i += 1) {
      const a = (i / 24) * Math.PI * 2;
      const geo = track(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(Math.cos(a) * 1.2, 0, Math.sin(a) * 1.2),
          new THREE.Vector3(Math.cos(a) * 8.7, 0, Math.sin(a) * 8.7),
        ]),
      );
      floor.add(new THREE.Line(geo, floorMat));
    }

    /* Glow disc */
    const discCanvas = document.createElement("canvas");
    discCanvas.width = 512;
    discCanvas.height = 512;
    const ctx = discCanvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(256, 256, 8, 256, 256, 252);
      gradient.addColorStop(0, "rgba(91,61,245,0.55)");
      gradient.addColorStop(0.42, "rgba(91,61,245,0.16)");
      gradient.addColorStop(1, "rgba(91,61,245,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
    }
    const discTex = track(new THREE.CanvasTexture(discCanvas));
    discTex.colorSpace = THREE.SRGBColorSpace;
    const discGeo = track(new THREE.PlaneGeometry(17, 17));
    const discMat = track(
      new THREE.MeshBasicMaterial({
        map: discTex,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.rotation.x = -Math.PI / 2;
    disc.position.y = 0.004;
    root.add(disc);

    /* Nodes */
    type NodeObj = {
      slug: string;
      group: THREE.Group;
      gem: THREE.Mesh;
      ring: THREE.Mesh;
      baseMat: THREE.MeshStandardMaterial;
      ringMat: THREE.MeshBasicMaterial;
      beamMat: THREE.MeshBasicMaterial;
      hit: THREE.Mesh;
      anchor: THREE.Vector3;
      worldPos: THREE.Vector3;
      phase: number;
    };
    const nodeObjs: NodeObj[] = [];
    const hits: THREE.Mesh[] = [];

    const baseGeo = track(new THREE.CylinderGeometry(1.02, 1.06, 0.1, 64));
    const ringGeo = track(new THREE.TorusGeometry(1.03, 0.015, 6, 120));
    const beamGeo = track(new THREE.CylinderGeometry(0.82, 0.82, 3.2, 32, 1, true));
    const gemGeo = track(new THREE.IcosahedronGeometry(0.34, 1));
    const hitGeo = track(new THREE.SphereGeometry(1.25, 8, 8));

    nodes.forEach((node, i) => {
      const accent = new THREE.Color(node.accent);
      const group = new THREE.Group();
      const x = Math.cos(node.angle) * NODE_R;
      const z = Math.sin(node.angle) * NODE_R;
      group.position.set(x, NODE_Y, z);
      root.add(group);

      const baseMat = track(
        new THREE.MeshStandardMaterial({
          color: 0x0d0a1c,
          metalness: 0.75,
          roughness: 0.36,
          emissive: accent.clone().multiplyScalar(0.16),
          emissiveIntensity: 0.85,
        }),
      );
      const base = new THREE.Mesh(baseGeo, baseMat);
      group.add(base);

      const ringMat = track(
        new THREE.MeshBasicMaterial({
          color: accent,
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.055;
      group.add(ring);

      const beamMat = track(
        new THREE.MeshBasicMaterial({
          color: accent,
          transparent: true,
          opacity: 0.055,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.y = 1.65;
      group.add(beam);

      const gemMat = track(
        new THREE.MeshStandardMaterial({
          color: accent,
          emissive: accent,
          emissiveIntensity: 1.5,
          metalness: 0.3,
          roughness: 0.28,
          flatShading: true,
        }),
      );
      const gem = new THREE.Mesh(gemGeo, gemMat);
      gem.position.y = 1.62;
      group.add(gem);

      const hitMat = track(
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
      );
      const hit = new THREE.Mesh(hitGeo, hitMat);
      hit.position.y = 0.9;
      hit.userData.slug = node.slug;
      group.add(hit);
      hits.push(hit);

      nodeObjs.push({
        slug: node.slug,
        group,
        gem,
        ring,
        baseMat,
        ringMat,
        beamMat,
        hit,
        anchor: new THREE.Vector3(
        x + Math.cos(node.angle) * 1.1,
        NODE_Y + 1.5,
        z + Math.sin(node.angle) * 1.1,
      ),
        worldPos: new THREE.Vector3(x, NODE_Y, z),
        phase: i * 1.7,
      });
    });

    /* Dust */
    const dustCount = reduced ? 0 : small ? 420 : 1100;
    let dust: THREE.Points | null = null;
    if (dustCount > 0) {
      const positions = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i += 1) {
        const radius = 2 + Math.random() * 12;
        const angle = Math.random() * Math.PI * 2;
        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = 0.4 + Math.random() * 7;
        positions[i * 3 + 2] = Math.sin(angle) * radius;
      }
      const dustGeo = track(new THREE.BufferGeometry());
      dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const dustMat = track(
        new THREE.PointsMaterial({
          color: 0xdedbf5,
          size: 0.032,
          transparent: true,
          opacity: 0.5,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
        }),
      );
      dust = new THREE.Points(dustGeo, dustMat);
      root.add(dust);
    }

    /* Labels */
    const labelEls: Record<string, HTMLElement> = {};
    labelsRef.current?.querySelectorAll<HTMLElement>("[data-node]").forEach((el) => {
      const key = el.dataset.node;
      if (key) labelEls[key] = el;
    });
    labelsRef.current?.classList.add("is-live");
    const projected = new THREE.Vector3();

    /* Camera state */
    const state = {
      az: 0,
      el: 0.3,
      radius: 11.4,
      targetRadius: 11.4,
      px: 0,
      py: 0,
      dragging: false,
      moved: 0,
      lastX: 0,
      lastY: 0,
    };
    const camPos = new THREE.Vector3(0, 5.4, 15);
    const camLook = new THREE.Vector3(0, 1.9, 0);
    const desiredPos = new THREE.Vector3();
    const desiredLook = new THREE.Vector3();
    const outward = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hovered: string | null = null;

    const damp = (current: number, target: number, lambda: number, dt: number) =>
      reduced ? target : THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));

    let needsRender = true;
    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      needsRender = true;
    };
    resize();

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const px = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const py = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      state.px = Math.max(-1, Math.min(1, px));
      state.py = Math.max(-1, Math.min(1, py));
      pointer.set(px, -py);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(hits, false)[0];
      const slug = (hit?.object.userData.slug as string | undefined) ?? null;
      if (slug !== hovered) {
        hovered = slug;
        host.style.cursor = slug ? "pointer" : state.dragging ? "grabbing" : "grab";
      }
      if (!state.dragging) return;
      const dx = event.clientX - state.lastX;
      const dy = event.clientY - state.lastY;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      state.moved += Math.abs(dx) + Math.abs(dy);
      state.az -= dx * 0.0055;
      state.el = Math.max(0.06, Math.min(0.62, state.el + dy * 0.0025));
      host.style.cursor = "grabbing";
    };

    const onPointerDown = (event: PointerEvent) => {
      state.dragging = true;
      state.moved = 0;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      host.setPointerCapture?.(event.pointerId);
      host.style.cursor = "grabbing";
    };

    const onPointerUp = (event: PointerEvent) => {
      const wasDragging = state.dragging;
      state.dragging = false;
      host.releasePointerCapture?.(event.pointerId);
      if (wasDragging && state.moved < 6) {
        const rect = host.getBoundingClientRect();
        pointer.set(
          ((event.clientX - rect.left) / rect.width) * 2 - 1,
          -(((event.clientY - rect.top) / rect.height) * 2 - 1),
        );
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(hits, false)[0];
        const slug = hit?.object.userData.slug as string | undefined;
        if (slug) selectRef.current(slug);
      }
      host.style.cursor = hovered ? "pointer" : "grab";
    };

    const onPointerLeave = () => {
      state.px = 0;
      state.py = 0;
      host.style.cursor = "grab";
    };

    host.style.cursor = "grab";
    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerdown", onPointerDown);
    host.addEventListener("pointerup", onPointerUp);
    host.addEventListener("pointerleave", onPointerLeave);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    window.addEventListener("resize", resize);

    let inView = true;
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.01 },
    );
    io.observe(host);

    let raf = 0;
    let elapsed = 0;
    let ready = false;
    const clock = new THREE.Clock();

    const update = (dt: number) => {
      elapsed += dt;
      const t = elapsed;
      const active = activeRef.current;
      const activeNode = active ? nodeObjs.find((n) => n.slug === active) : undefined;

      /* Core */
      if (!reduced) {
        coreMesh.rotation.y += dt * 0.16;
        coreMesh.rotation.x = Math.sin(t * 0.35) * 0.14;
        wire.rotation.copy(coreMesh.rotation);
        glow.scale.setScalar(1 + Math.sin(t * 0.9) * 0.05);
        rings.forEach((ring) => {
          ring.mesh.rotation.z += dt * ring.spin;
        });
        if (dust) dust.rotation.y += dt * 0.012;
        coreLight.intensity = 38 + Math.sin(t * 1.2) * 6;
      }

      /* Nodes */
      nodeObjs.forEach((node) => {
        const isActive = node.slug === active;
        const isHover = node.slug === hovered;
        const lift = isActive ? 0.22 : isHover ? 0.08 : 0;
        node.group.position.y = THREE.MathUtils.lerp(
          node.group.position.y,
          NODE_Y + lift,
          reduced ? 1 : 1 - Math.exp(-6 * dt),
        );
        if (!reduced) {
          node.gem.position.y = 1.62 + Math.sin(t * 0.9 + node.phase) * 0.08;
          node.gem.rotation.y += dt * (isActive ? 0.9 : 0.32);
          node.gem.rotation.x += dt * 0.12;
          node.ringMat.opacity = 0.45 + Math.sin(t * 1.4 + node.phase) * 0.16 + (isActive ? 0.25 : 0);
        }
        const dim = active ? (isActive ? 1 : 0.28) : 1;
        node.baseMat.emissiveIntensity = damp(
          node.baseMat.emissiveIntensity,
          (isActive ? 1.55 : 0.85) * (active && !isActive ? 0.5 : 1),
          4,
          dt,
        );
        node.beamMat.opacity = damp(
          node.beamMat.opacity,
          (isActive ? 0.16 : isHover ? 0.1 : 0.055) * dim,
          4,
          dt,
        );
      });

      /* Camera */
      if (activeNode) {
        outward.set(activeNode.group.position.x, 0, activeNode.group.position.z).normalize();
        desiredPos
          .copy(activeNode.worldPos)
          .add(outward.multiplyScalar(5.15))
          .add(new THREE.Vector3(0, 2.05, 0));
        desiredLook.copy(activeNode.worldPos).add(new THREE.Vector3(0, 1.3, 0));
      } else {
        state.radius = damp(state.radius, state.targetRadius, 1.2, dt);
        const az = state.az + state.px * 0.1;
        const el = state.el + state.py * 0.03;
        desiredPos.set(
          Math.sin(az) * state.radius * Math.cos(el),
          1.1 + Math.sin(el) * state.radius,
          Math.cos(az) * state.radius * Math.cos(el),
        );
        desiredLook.set(0, 1.92, 0);
      }
      camPos.x = damp(camPos.x, desiredPos.x, activeNode ? 2.6 : 1.1, dt);
      camPos.y = damp(camPos.y, desiredPos.y, activeNode ? 2.6 : 1.1, dt);
      camPos.z = damp(camPos.z, desiredPos.z, activeNode ? 2.6 : 1.1, dt);
      camLook.x = damp(camLook.x, desiredLook.x, activeNode ? 2.6 : 1.6, dt);
      camLook.y = damp(camLook.y, desiredLook.y, activeNode ? 2.6 : 1.6, dt);
      camLook.z = damp(camLook.z, desiredLook.z, activeNode ? 2.6 : 1.6, dt);
      camera.position.copy(camPos);
      camera.lookAt(camLook);

      /* Labels */
      const w = host.clientWidth;
      const h = host.clientHeight;
      nodeObjs.forEach((node) => {
        const el = labelEls[node.slug];
        if (!el) return;
        projected.copy(node.anchor).project(camera);
        const rawX = (projected.x * 0.5 + 0.5) * w;
        const y = (-projected.y * 0.5 + 0.5) * h;
        const x = Math.min(w - 120, Math.max(120, rawX));
        const inFront = projected.z < 1;
        const isActive = node.slug === active;
        const isHover = node.slug === hovered;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
        el.style.opacity = inFront && (isHover || isActive) ? "1" : "0";
      });
    };

    let lastActive: string | null | undefined;
    const render = () => {
      raf = requestAnimationFrame(render);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!inView || document.hidden) return;
      if (reduced) {
        const current = activeRef.current;
        if (current !== lastActive) {
          lastActive = current;
          needsRender = true;
        }
        if (!needsRender) return;
        needsRender = false;
      }
      update(dt);
      renderer.render(scene, camera);
      if (!ready) {
        ready = true;
        host.classList.add("is-ready");
        readyRef.current?.();
      }
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerdown", onPointerDown);
      host.removeEventListener("pointerup", onPointerUp);
      host.removeEventListener("pointerleave", onPointerLeave);
      labelsRef.current?.classList.remove("is-live");
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
      host.classList.remove("is-ready");
    };
  }, [nodes, reduced, activeRef, labelsRef]);

  return <div ref={hostRef} className="vela-canvas-host" aria-hidden="true" />;
}
