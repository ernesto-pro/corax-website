import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { VelaSpace } from "../../data/experience";

type Props = {
  spaces: VelaSpace[];
  activeRef: React.RefObject<string | null>;
  /** Space hovered from the HTML index, mirrored inside the scene. */
  hoverRef?: React.RefObject<string | null>;
  onSelect: (slug: string) => void;
  onHover?: (slug: string | null) => void;
  onFail?: () => void;
  onReady?: () => void;
  onEntered?: () => void;
  /** Filled by the scene so the host page can offer a "skip the entrance" control. */
  skipRef?: React.RefObject<(() => void) | null>;
  reduced: boolean;
};

/** How long the entrance lasts, in ms. */
const INTRO_MS = 3000;
const INTRO_KEY = "corax-spaces-entered-v2";

const VELA_X = -4.2;
const TEMPIO_X = 8.6;

const easeOutQuart = (x: number) =>
  1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 4);
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

/* -------------------------------------------------------------------------- */
/*  Canvas helpers                                                            */
/* -------------------------------------------------------------------------- */

function canvasTexture(
  width: number,
  height: number,
  paint: (ctx: CanvasRenderingContext2D) => void,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) paint(ctx);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function pinTexture(index: string, accent: string) {
  return canvasTexture(256, 256, (ctx) => {
    ctx.clearRect(0, 0, 256, 256);
    ctx.beginPath();
    ctx.arc(128, 122, 82, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(8, 7, 14, 0.72)";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.85;
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.arc(128, 216, 14, 0, Math.PI * 2);
    ctx.fillStyle = accent;
    ctx.fill();

    ctx.fillStyle = accent;
    ctx.font = "600 78px 'Inter', 'Helvetica Neue', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(index, 128, 126);
  });
}

function signTexture(name: string, sub: string) {
  return canvasTexture(1024, 256, (ctx) => {
    ctx.clearRect(0, 0, 1024, 256);
    ctx.textAlign = "center";
    ctx.fillStyle = "#f4f1ea";
    ctx.font = "600 92px 'Inter', 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText(name, 512, 122);
    ctx.fillStyle = "rgba(244, 241, 234, 0.55)";
    ctx.font = "500 25px 'Inter', 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText(sub, 512, 180);
  });
}

function screenTexture(title: string, sub: string, accent: string) {
  return canvasTexture(768, 432, (ctx) => {
    const bg = ctx.createLinearGradient(0, 0, 768, 432);
    bg.addColorStop(0, "#0b0710");
    bg.addColorStop(0.55, "#160c12");
    bg.addColorStop(1, "#26100c");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 768, 432);

    const glow = ctx.createRadialGradient(590, 330, 10, 590, 330, 330);
    glow.addColorStop(0, "rgba(255, 112, 62, 0.5)");
    glow.addColorStop(1, "rgba(255, 112, 62, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 768, 432);

    ctx.strokeStyle = "rgba(244, 241, 234, 0.16)";
    ctx.lineWidth = 2;
    ctx.strokeRect(28, 28, 712, 376);

    ctx.fillStyle = accent;
    ctx.font = "600 20px 'Inter', 'Helvetica Neue', Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(sub.toUpperCase(), 58, 96);

    ctx.fillStyle = "#f4f1ea";
    ctx.font = "600 74px 'Inter', 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText(title, 54, 196);

    ctx.fillStyle = "rgba(244, 241, 234, 0.5)";
    ctx.font = "500 19px 'Inter', 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText("NUOVI MEDIA · FORMAT · PALINSESTI", 58, 244);

    for (let i = 0; i < 16; i += 1) {
      const h = 10 + ((i * 37) % 60);
      ctx.fillStyle =
        i < 7 ? accent : `rgba(244, 241, 234, ${0.08 + (i % 5) * 0.035})`;
      ctx.fillRect(58 + i * 40, 356 - h, 18, h);
    }
  });
}

function totemTexture(accent: string) {
  return canvasTexture(512, 1024, (ctx) => {
    const bg = ctx.createLinearGradient(0, 0, 512, 1024);
    bg.addColorStop(0, "#120a10");
    bg.addColorStop(1, "#08060c");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 512, 1024);

    ctx.strokeStyle = "rgba(244, 241, 234, 0.2)";
    ctx.lineWidth = 2;
    ctx.strokeRect(18, 18, 476, 988);

    ctx.fillStyle = accent;
    ctx.font = "600 24px 'Inter', 'Helvetica Neue', Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("02 · SECONDA SEDE", 50, 92);

    ctx.fillStyle = "#f4f1ea";
    ctx.font = "600 78px 'Inter', 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText("IL", 48, 214);
    ctx.fillText("TEMPIO", 48, 296);

    ctx.fillStyle = "rgba(244, 241, 234, 0.55)";
    ctx.font = "500 22px 'Inter', 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText("EDITORIA", 50, 350);
    ctx.fillText("TALENT MANAGEMENT", 50, 384);
    ctx.fillText("COMMUNITY DIGITALI", 50, 418);

    ctx.strokeStyle = "rgba(244, 241, 234, 0.16)";
    ctx.beginPath();
    ctx.moveTo(50, 700);
    ctx.lineTo(462, 700);
    ctx.stroke();

    const glow = ctx.createLinearGradient(0, 730, 0, 940);
    glow.addColorStop(0, accent);
    glow.addColorStop(1, "rgba(255, 90, 60, 0.05)");
    ctx.fillStyle = glow;
    ctx.fillRect(50, 740, 412, 6);
    ctx.fillRect(50, 772, 300, 6);
    ctx.fillRect(50, 804, 360, 6);
  });
}

/* -------------------------------------------------------------------------- */
/*  Scene                                                                     */
/* -------------------------------------------------------------------------- */

export default function VelaScene({
  spaces,
  activeRef,
  hoverRef,
  onSelect,
  onHover,
  onFail,
  onReady,
  onEntered,
  skipRef,
  reduced,
}: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const selectRef = useRef(onSelect);
  const failRef = useRef(onFail);
  const readyRef = useRef(onReady);
  const enteredRef = useRef(onEntered);
  const hoverCbRef = useRef(onHover);
  selectRef.current = onSelect;
  failRef.current = onFail;
  readyRef.current = onReady;
  enteredRef.current = onEntered;
  hoverCbRef.current = onHover;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: window.innerWidth >= 760,
        alpha: false,
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
    const dprCap = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75);
    let dpr = dprCap;
    renderer.setPixelRatio(dpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0815, small ? 0.012 : 0.0145);

    const camera = new THREE.PerspectiveCamera(small ? 54 : 41, 1, 0.1, 220);
    const disposables: Array<{ dispose: () => void }> = [];
    const track = <T extends { dispose: () => void }>(item: T) => {
      disposables.push(item);
      return item;
    };
    const tex = (texture: THREE.Texture) => {
      track(texture);
      return texture;
    };

    const root = new THREE.Group();
    scene.add(root);

    /* ------------------------------------------------------------------ */
    /*  Sky, stars, horizon                                                */
    /* ------------------------------------------------------------------ */

    const skyTex = tex(
      canvasTexture(1024, 512, (ctx) => {
        const sky = ctx.createLinearGradient(0, 0, 0, 512);
        sky.addColorStop(0, "#04050c");
        sky.addColorStop(0.34, "#070814");
        sky.addColorStop(0.5, "#0d0b20");
        sky.addColorStop(0.6, "#1a1230");
        sky.addColorStop(0.665, "#2a1832");
        sky.addColorStop(0.72, "#170f1e");
        sky.addColorStop(1, "#06050c");
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, 1024, 512);

        const cool = ctx.createRadialGradient(300, 300, 10, 300, 300, 380);
        cool.addColorStop(0, "rgba(76, 58, 180, 0.32)");
        cool.addColorStop(1, "rgba(76, 58, 180, 0)");
        ctx.fillStyle = cool;
        ctx.fillRect(0, 0, 1024, 512);

        const warm = ctx.createRadialGradient(690, 330, 10, 690, 330, 330);
        warm.addColorStop(0, "rgba(255, 104, 56, 0.22)");
        warm.addColorStop(1, "rgba(255, 104, 56, 0)");
        ctx.fillStyle = warm;
        ctx.fillRect(0, 0, 1024, 512);
      }),
    );
    const sky = new THREE.Mesh(
      track(new THREE.SphereGeometry(110, 32, 24)),
      track(
        new THREE.MeshBasicMaterial({
          map: skyTex,
          side: THREE.BackSide,
          depthWrite: false,
          toneMapped: false,
          fog: false,
        }),
      ),
    );
    sky.renderOrder = -10;
    scene.add(sky);

    const starCount = small ? 340 : 640;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i += 1) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(0.12 + Math.random() * 0.86);
      const r = 88 + Math.random() * 16;
      starPositions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      starPositions[i * 3 + 1] = Math.cos(phi) * r;
      starPositions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * r;
    }
    const starGeo = track(new THREE.BufferGeometry());
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = track(
      new THREE.PointsMaterial({
        color: 0xdfe2ff,
        size: 0.42,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        fog: false,
        toneMapped: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      }),
    );
    const stars = new THREE.Points(starGeo, starMat);
    stars.renderOrder = -9;
    scene.add(stars);

    /* ------------------------------------------------------------------ */
    /*  Shared materials                                                   */
    /* ------------------------------------------------------------------ */

    const matStone = track(
      new THREE.MeshStandardMaterial({
        color: 0x14121b,
        roughness: 0.72,
        metalness: 0.18,
      }),
    );
    const matConcrete = track(
      new THREE.MeshStandardMaterial({
        color: 0x101018,
        roughness: 0.84,
        metalness: 0.08,
      }),
    );
    const matDark = track(
      new THREE.MeshStandardMaterial({
        color: 0x0b0b12,
        roughness: 0.58,
        metalness: 0.42,
      }),
    );
    const matMetal = track(
      new THREE.MeshStandardMaterial({
        color: 0x34343f,
        roughness: 0.38,
        metalness: 0.86,
      }),
    );
    const sailFabric = tex(
      canvasTexture(1024, 512, (ctx) => {
        ctx.fillStyle = "#f4f0e6";
        ctx.fillRect(0, 0, 1024, 512);
        /* Soft shading so the sail reads as stretched fabric. */
        const shade = ctx.createLinearGradient(0, 0, 1024, 512);
        shade.addColorStop(0, "rgba(255,255,255,0.35)");
        shade.addColorStop(0.45, "rgba(255,255,255,0)");
        shade.addColorStop(1, "rgba(120,118,138,0.28)");
        ctx.fillStyle = shade;
        ctx.fillRect(0, 0, 1024, 512);
        /* Panel seams. */
        ctx.strokeStyle = "rgba(120,118,138,0.32)";
        ctx.lineWidth = 2;
        for (let i = 1; i < 8; i += 1) {
          const x = (i / 8) * 1024;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, 512);
          ctx.stroke();
        }
        for (let i = 1; i < 4; i += 1) {
          const y = (i / 4) * 512;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(1024, y);
          ctx.stroke();
        }
      }),
    );
    sailFabric.wrapS = sailFabric.wrapT = THREE.ClampToEdgeWrapping;
    const matWhite = track(
      new THREE.MeshStandardMaterial({
        color: 0xf6f2e9,
        map: sailFabric,
        roughness: 0.82,
        metalness: 0.02,
        emissive: 0x77748c,
        emissiveIntensity: 0.58,
        side: THREE.DoubleSide,
      }),
    );
    const matWood = track(
      new THREE.MeshStandardMaterial({
        color: 0x50331f,
        roughness: 0.72,
        metalness: 0.06,
      }),
    );
    const matWoodDark = track(
      new THREE.MeshStandardMaterial({
        color: 0x2b1a11,
        roughness: 0.7,
        metalness: 0.12,
      }),
    );
    const matWoodLit = track(
      new THREE.MeshStandardMaterial({
        color: 0x7a4a29,
        roughness: 0.66,
        metalness: 0.08,
        emissive: 0x1d0c04,
        emissiveIntensity: 0.55,
      }),
    );
    const matGlass = track(
      new THREE.MeshPhysicalMaterial({
        color: 0x08111f,
        roughness: 0.12,
        metalness: 0.2,
        transparent: true,
        opacity: 0.24,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    );
    const matCable = track(
      new THREE.MeshStandardMaterial({
        color: 0x8f8f9c,
        roughness: 0.45,
        metalness: 0.9,
      }),
    );
    const matFoliage = track(
      new THREE.MeshStandardMaterial({
        color: 0x11251a,
        roughness: 0.92,
        metalness: 0,
      }),
    );
    const matFoliageLight = track(
      new THREE.MeshStandardMaterial({
        color: 0x1e3a25,
        roughness: 0.9,
        metalness: 0,
      }),
    );

    const fadeMats: Array<{ mat: { opacity: number }; base: number }> = [];
    const litMats: Array<{ mat: THREE.MeshStandardMaterial; base: number }> = [];
    const fadeLights: Array<{ light: THREE.Light; base: number }> = [];

    const glowMaterial = (color: number, opacity: number) => {
      const material = track(
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity,
          toneMapped: false,
          depthWrite: false,
        }),
      );
      fadeMats.push({ mat: material, base: opacity });
      return material;
    };

    const standardGlow = (
      material: THREE.MeshStandardMaterial,
      intensity: number,
    ) => {
      material.emissiveIntensity = intensity;
      litMats.push({ mat: material, base: intensity });
      return material;
    };

    /* ------------------------------------------------------------------ */
    /*  Helpers                                                            */
    /* ------------------------------------------------------------------ */

    const addBox = (
      parent: THREE.Object3D,
      size: [number, number, number],
      material: THREE.Material,
      position: [number, number, number],
    ) => {
      const mesh = new THREE.Mesh(
        track(new THREE.BoxGeometry(size[0], size[1], size[2])),
        material,
      );
      mesh.position.set(position[0], position[1], position[2]);
      parent.add(mesh);
      return mesh;
    };

    const addCylinder = (
      parent: THREE.Object3D,
      radiusTop: number,
      radiusBottom: number,
      height: number,
      material: THREE.Material,
      position: [number, number, number],
      segments = 16,
    ) => {
      const mesh = new THREE.Mesh(
        track(
          new THREE.CylinderGeometry(
            radiusTop,
            radiusBottom,
            height,
            segments,
            1,
          ),
        ),
        material,
      );
      mesh.position.set(position[0], position[1], position[2]);
      parent.add(mesh);
      return mesh;
    };

    const addCable = (
      parent: THREE.Object3D,
      from: [number, number, number],
      to: [number, number, number],
      radius = 0.018,
    ) => {
      const a = new THREE.Vector3(...from);
      const b = new THREE.Vector3(...to);
      const direction = b.clone().sub(a);
      const length = direction.length();
      const mesh = new THREE.Mesh(
        track(new THREE.CylinderGeometry(radius, radius, length, 5, 1, true)),
        matCable,
      );
      mesh.position.copy(a).addScaledVector(direction, 0.5);
      mesh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.normalize(),
      );
      parent.add(mesh);
      return mesh;
    };

    const shadowTex = tex(
      canvasTexture(256, 256, (ctx) => {
        const g = ctx.createRadialGradient(128, 128, 12, 128, 128, 126);
        g.addColorStop(0, "rgba(0,0,0,0.62)");
        g.addColorStop(0.55, "rgba(0,0,0,0.34)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 256, 256);
      }),
    );
    const contactShadow = (
      parent: THREE.Object3D,
      width: number,
      depth: number,
      position: [number, number, number],
    ) => {
      const mesh = new THREE.Mesh(
        track(new THREE.PlaneGeometry(width, depth)),
        track(
          new THREE.MeshBasicMaterial({
            map: shadowTex,
            transparent: true,
            opacity: 0.85,
            depthWrite: false,
          }),
        ),
      );
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(position[0], 0.04, position[2]);
      parent.add(mesh);
      return mesh;
    };

    /* ------------------------------------------------------------------ */
    /*  Ground                                                             */
    /* ------------------------------------------------------------------ */

    const groundMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x0a0912,
        roughness: 0.82,
        metalness: 0.22,
      }),
    );
    const ground = new THREE.Mesh(track(new THREE.CircleGeometry(95, 96)), groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.02;
    scene.add(ground);

    const grid = new THREE.GridHelper(96, 96, 0x262043, 0x17132a);
    grid.position.y = 0.012;
    const gridMat = grid.material as THREE.LineBasicMaterial;
    gridMat.transparent = true;
    gridMat.opacity = 0.3;
    gridMat.depthWrite = false;
    track(grid.geometry);
    track(gridMat);
    scene.add(grid);

    /* Plaza in front of both buildings */
    const plaza = new THREE.Mesh(
      track(new THREE.CircleGeometry(10.5, 64)),
      track(
        new THREE.MeshStandardMaterial({
          color: 0x1b1826,
          roughness: 0.46,
          metalness: 0.42,
        }),
      ),
    );
    plaza.rotation.x = -Math.PI / 2;
    plaza.scale.set(1.55, 1, 0.72);
    plaza.position.set(0.4, 0.025, 7.6);
    scene.add(plaza);

    const plazaRing = new THREE.Mesh(
      track(new THREE.RingGeometry(10.1, 10.22, 72)),
      glowMaterial(0xc8ff4d, 0.16),
    );
    plazaRing.rotation.x = -Math.PI / 2;
    plazaRing.scale.set(1.55, 0.72, 1);
    plazaRing.position.set(0.4, 0.045, 7.6);
    scene.add(plazaRing);

    /* Walkway between the two entrances */
    const walk = new THREE.Mesh(
      track(new THREE.PlaneGeometry(13, 2.2)),
      track(
        new THREE.MeshStandardMaterial({
          color: 0x191623,
          roughness: 0.62,
          metalness: 0.24,
        }),
      ),
    );
    walk.rotation.x = -Math.PI / 2;
    walk.position.set(0.8, 0.03, 6.9);
    scene.add(walk);
    addBox(scene, [13, 0.012, 0.035], glowMaterial(0xc8ff4d, 0.24), [0.8, 0.05, 5.82]);
    addBox(scene, [13, 0.012, 0.035], glowMaterial(0xff5a3c, 0.2), [0.8, 0.05, 7.98]);

    /* Shallow reflecting pool */
    addBox(scene, [7.2, 0.14, 1.5], matStone, [1.2, 0.07, 10.1]);
    const water = new THREE.Mesh(
      track(new THREE.PlaneGeometry(6.9, 1.2)),
      track(
        new THREE.MeshStandardMaterial({
          color: 0x06070d,
          roughness: 0.05,
          metalness: 0.92,
          emissive: 0x05060f,
          emissiveIntensity: 0.6,
        }),
      ),
    );
    water.rotation.x = -Math.PI / 2;
    water.position.set(1.2, 0.145, 10.1);
    scene.add(water);
    addBox(scene, [7.0, 0.02, 0.05], glowMaterial(0xffb27a, 0.35), [1.2, 0.15, 9.38]);
    addBox(scene, [7.0, 0.02, 0.05], glowMaterial(0xffb27a, 0.35), [1.2, 0.15, 10.82]);

    /* Bollards and benches along the plaza edge. */
    for (let i = 0; i < 7; i += 1) {
      const x = -4.4 + i * 1.85;
      addCylinder(scene, 0.05, 0.06, 0.62, matMetal, [x, 0.31, 8.55], 8);
      addBox(scene, [0.16, 0.06, 0.16], glowMaterial(0xffc795, 0.7), [x, 0.65, 8.55]);
    }
    addBox(scene, [2.4, 0.12, 0.55], matWood, [-2.8, 0.55, 11.9]);
    addBox(scene, [0.12, 0.5, 0.55], matMetal, [-3.95, 0.3, 11.9]);
    addBox(scene, [0.12, 0.5, 0.55], matMetal, [-1.65, 0.3, 11.9]);
    addBox(scene, [2.4, 0.12, 0.55], matWood, [4.6, 0.55, 11.9]);
    addBox(scene, [0.12, 0.5, 0.55], matMetal, [3.45, 0.3, 11.9]);
    addBox(scene, [0.12, 0.5, 0.55], matMetal, [5.75, 0.3, 11.9]);

    /* Trees on the plaza edge */
    const treeSpots: Array<[number, number, number]> = [
      [-16.6, 8.6, 1.15],
      [-13.2, -6.6, 0.92],
      [17.4, -6.8, 1.05],
      [19.6, 7.9, 0.86],
      [-2.4, -9.8, 0.8],
      [5.6, -11.2, 0.94],
    ];
    treeSpots.forEach(([x, z, scale]) => {
      const tree = new THREE.Group();
      tree.position.set(x, 0, z);
      addCylinder(tree, 0.08, 0.12, 2.3 * scale, matWoodDark, [0, 1.15 * scale, 0], 8);
      const crown = new THREE.Mesh(
        track(new THREE.IcosahedronGeometry(1.25 * scale, 1)),
        Math.random() > 0.5 ? matFoliage : matFoliageLight,
      );
      crown.position.set(0, 2.7 * scale, 0);
      crown.scale.set(0.9, 1.15, 0.9);
      tree.add(crown);
      const crown2 = new THREE.Mesh(
        track(new THREE.IcosahedronGeometry(0.8 * scale, 1)),
        matFoliageLight,
      );
      crown2.position.set(0.55 * scale, 3.25 * scale, 0.2 * scale);
      tree.add(crown2);
      scene.add(tree);
    });

    /* Distant city silhouette */
    const cityMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x080811,
        roughness: 0.94,
        metalness: 0.12,
      }),
    );
    const cityLightMat = track(
      new THREE.MeshBasicMaterial({
        color: 0x9d7fc4,
        transparent: true,
        opacity: 0.28,
        toneMapped: false,
      }),
    );
    const city = new THREE.Group();
    for (let i = 0; i < 24; i += 1) {
      const angle = (i / 24) * Math.PI * 2 + 0.12;
      const radius = 72 + Math.random() * 24;
      const height = 3 + Math.random() * 7;
      const width = 3 + Math.random() * 7;
      const depth = 3 + Math.random() * 7;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const tower = addBox(
        city,
        [width, height, depth],
        cityMat,
        [x, height / 2 - 1, z],
      );
      tower.rotation.y = Math.random() * Math.PI;
      if (i % 3 === 0) {
        addBox(
          city,
          [0.16, height * 0.45, 0.16],
          cityLightMat,
          [x, height * 0.52, z + depth * 0.52],
        );
      }
    }
    scene.add(city);

    contactShadow(scene, 26, 20, [VELA_X, 0, 0]);
    contactShadow(scene, 24, 20, [TEMPIO_X, 0, 0]);

    /* Warm light pools keep the buildings anchored to the plaza. */
    const poolTex = tex(
      canvasTexture(256, 256, (ctx) => {
        const g = ctx.createRadialGradient(128, 128, 8, 128, 128, 126);
        g.addColorStop(0, "rgba(255,255,255,0.7)");
        g.addColorStop(0.4, "rgba(255,255,255,0.26)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 256, 256);
      }),
    );
    const lightPool = (
      x: number,
      color: number,
      width: number,
      depth: number,
      z: number,
    ) => {
      const mesh = new THREE.Mesh(
        track(new THREE.PlaneGeometry(width, depth)),
        track(
          new THREE.MeshBasicMaterial({
            map: poolTex,
            color,
            transparent: true,
            opacity: 0.3,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            toneMapped: false,
          }),
        ),
      );
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(x, 0.05, z);
      scene.add(mesh);
      return mesh;
    };
    lightPool(VELA_X + 2.0, 0xffb27a, 20, 14, 4.6);
    lightPool(TEMPIO_X, 0xff8a5c, 17, 14, 4.2);

    /* ------------------------------------------------------------------ */
    /*  La Vela                                                            */
    /* ------------------------------------------------------------------ */

    const vela = new THREE.Group();
    vela.position.set(VELA_X, 0, 0);
    root.add(vela);

    /* Deck and pavilion */
    addBox(vela, [13.8, 0.34, 9.6], matStone, [0, 0.17, 0.3]);
    addBox(vela, [11.2, 0.16, 7.2], matWoodDark, [0, 0.42, 0]);
    addBox(vela, [11.2, 3.35, 0.06], matGlass, [0, 2.11, 3.6]);
    addBox(vela, [0.06, 3.35, 7.2], matGlass, [-5.6, 2.11, 0]);
    addBox(vela, [0.06, 3.35, 7.2], matGlass, [5.6, 2.11, 0]);
    addBox(vela, [11.2, 3.35, 0.18], matWood, [0, 2.11, -3.51]);

    /* Mullions */
    for (let i = 0; i < 8; i += 1) {
      const x = -5.6 + i * (11.2 / 7);
      addBox(vela, [0.05, 3.4, 0.1], matMetal, [x, 2.11, 3.62]);
    }
    addBox(vela, [11.3, 0.12, 0.12], matMetal, [0, 0.48, 3.62]);
    addBox(vela, [11.3, 0.12, 0.12], matMetal, [0, 3.75, 3.62]);
    for (let i = 0; i < 5; i += 1) {
      const z = -3.4 + i * (6.8 / 4);
      addBox(vela, [0.05, 3.4, 0.1], matMetal, [5.62, 2.11, z]);
      addBox(vela, [0.05, 3.4, 0.1], matMetal, [-5.62, 2.11, z]);
    }

    /* Roof */
    addBox(vela, [11.9, 0.26, 7.7], matDark, [0, 3.95, 0]);
    addBox(vela, [11.4, 0.05, 0.14], glowMaterial(0xffc08c, 0.35), [0, 3.82, 3.55]);

    /* Interior */
    addBox(vela, [10.8, 0.05, 6.6], matWood, [0, 0.46, 0]);
    for (let i = 0; i < 3; i += 1) {
      addBox(
        vela,
        [8.6, 0.035, 0.1],
        glowMaterial(0xffd7a8, 0.92),
        [0, 3.72, -1.7 + i * 1.7],
      );
    }
    const innerCeiling = new THREE.Mesh(
      track(new THREE.PlaneGeometry(9.8, 6.0)),
      glowMaterial(0xffb877, 0.2),
    );
    innerCeiling.rotation.x = Math.PI / 2;
    innerCeiling.position.set(0, 3.7, 0);
    vela.add(innerCeiling);
    for (let i = 0; i < 3; i += 1) {
      const x = -0.9 + i * 1.5;
      addCylinder(vela, 0.012, 0.012, 1.1, matMetal, [x, 3.12, 0.5], 5);
      const bulb = new THREE.Mesh(
        track(new THREE.SphereGeometry(0.11, 10, 10)),
        glowMaterial(0xffd2a1, 0.95),
      );
      bulb.position.set(x, 2.55, 0.5);
      vela.add(bulb);
    }
    for (let i = 0; i < 3; i += 1) {
      addBox(
        vela,
        [0.05, 1.8, 0.06],
        glowMaterial(0xffbd87, 0.4),
        [1.4 + i * 1.2, 1.9, -3.39],
      );
    }
    /* Meeting table and chairs */
    addBox(vela, [3.5, 0.1, 1.15], matWoodDark, [0.6, 1.1, 0.5]);
    addBox(vela, [3.4, 0.55, 0.08], matMetal, [0.6, 0.85, 0.5]);
    for (let i = 0; i < 4; i += 1) {
      const x = -0.7 + i * 0.85;
      addBox(vela, [0.5, 0.08, 0.5], matDark, [x, 0.92, -0.35]);
      addBox(vela, [0.5, 0.5, 0.07], matDark, [x, 1.18, -0.63]);
      addBox(vela, [0.5, 0.08, 0.5], matDark, [x, 0.92, 1.35]);
      addBox(vela, [0.5, 0.5, 0.07], matDark, [x, 1.18, 1.63]);
    }
    /* Sideboard + shelf lights */
    addBox(vela, [3.2, 0.75, 0.5], matWoodDark, [3.4, 0.85, -3.1]);
    addBox(vela, [3.0, 0.03, 0.1], glowMaterial(0xffbd87, 0.55), [3.4, 1.3, -3.35]);
    addBox(vela, [7.6, 0.05, 0.05], glowMaterial(0xffbd87, 0.5), [1.4, 2.55, -3.4]);
    /* Reception desk */
    addBox(vela, [2.4, 1.0, 0.7], matWood, [-3.5, 0.98, 2.1]);

    /* Wooden core volume */
    addBox(vela, [3.3, 5.5, 4.7], matWood, [-3.85, 2.75, -1.15]);
    for (let i = 0; i < 9; i += 1) {
      addBox(
        vela,
        [0.08, 4.6, 0.12],
        matWoodLit,
        [-5.35 + i * 0.36, 2.7, 1.23],
      );
    }
    addBox(vela, [0.05, 2.6, 0.08], glowMaterial(0xffcf9e, 0.5), [-5.3, 3.4, 1.3]);

    /* Entrance */
    addBox(vela, [2.0, 2.7, 0.1], matGlass, [3.55, 1.83, 3.65]);
    addBox(vela, [0.06, 2.7, 0.12], matMetal, [2.55, 1.83, 3.66]);
    addBox(vela, [0.06, 2.7, 0.12], matMetal, [4.55, 1.83, 3.66]);
    addBox(vela, [2.06, 0.06, 0.12], matMetal, [3.55, 3.17, 3.66]);
    addBox(vela, [2.5, 0.12, 1.1], matDark, [3.55, 3.42, 4.12]);

    const velaSignTex = tex(signTexture("LA VELA", "BODIO CENTER · MILANO"));
    const velaSign = new THREE.Mesh(
      track(new THREE.PlaneGeometry(3.2, 0.8)),
      track(
        new THREE.MeshBasicMaterial({
          map: velaSignTex,
          transparent: true,
          toneMapped: false,
          depthWrite: false,
        }),
      ),
    );
    velaSign.position.set(0.9, 3.32, 3.69);
    vela.add(velaSign);

    /* Terrace */
    addBox(vela, [7.4, 0.16, 3.3], matWood, [3.6, 0.34, 5.6]);
    for (let i = 0; i < 5; i += 1) {
      const x = 0.2 + i * 1.7;
      addBox(vela, [0.06, 0.9, 0.06], matMetal, [x, 0.84, 7.1]);
    }
    addBox(vela, [6.9, 0.05, 0.06], matMetal, [3.5, 1.28, 7.1]);
    addBox(vela, [6.9, 0.035, 0.05], matMetal, [3.5, 0.72, 7.1]);
    /* Planters */
    addBox(vela, [1.1, 0.5, 0.55], matStone, [1.0, 0.62, 6.6]);
    addBox(vela, [1.1, 0.5, 0.55], matStone, [6.1, 0.62, 6.6]);
    const planterCrowns = [
      [1.0, 1.05, 6.6],
      [6.1, 1.05, 6.6],
    ];
    planterCrowns.forEach(([x, y, z]) => {
      const bush = new THREE.Mesh(
        track(new THREE.IcosahedronGeometry(0.48, 1)),
        matFoliage,
      );
      bush.position.set(x, y, z);
      vela.add(bush);
    });
    /* Lounge */
    addBox(vela, [1.9, 0.35, 0.75], matDark, [4.4, 0.62, 5.4]);
    addBox(vela, [1.9, 0.5, 0.15], matDark, [4.4, 0.86, 5.05]);
    /* String lights along the terrace */
    for (let i = 0; i < 7; i += 1) {
      const light = new THREE.Mesh(
        track(new THREE.SphereGeometry(0.055, 8, 8)),
        glowMaterial(0xffd2a1, 0.9),
      );
      light.position.set(1.2 + i * 0.82, 2.35 - Math.sin((i / 6) * Math.PI) * 0.12, 6.35);
      vela.add(light);
    }

    /* Tensile sail */
    const sailSpan = 11.2;
    const sailDepth = 7.4;
    const sailH = (u: number, v: number) => {
      const h00 = 4.7;
      const h10 = 5.1;
      const h01 = 5.3;
      const h11 = 9.3;
      let h =
        h00 * (1 - u) * (1 - v) +
        h10 * u * (1 - v) +
        h01 * (1 - u) * v +
        h11 * u * v;
      h -= 0.62 * Math.sin(Math.PI * u) * Math.sin(Math.PI * v);
      h -= 0.42 * Math.sin(Math.PI * u) * Math.pow(Math.abs(2 * v - 1), 2.4);
      h -= 0.24 * Math.sin(Math.PI * v) * Math.pow(Math.abs(2 * u - 1), 2.4);
      return h;
    };
    const sailU = 40;
    const sailV = 26;
    const sailPositions: number[] = [];
    const sailUvs: number[] = [];
    const sailIndices: number[] = [];
    for (let j = 0; j <= sailV; j += 1) {
      const v = j / sailV;
      for (let i = 0; i <= sailU; i += 1) {
        const u = i / sailU;
        sailPositions.push((u - 0.5) * sailSpan, sailH(u, v), (v - 0.5) * sailDepth);
        sailUvs.push(u, v);
      }
    }
    for (let j = 0; j < sailV; j += 1) {
      for (let i = 0; i < sailU; i += 1) {
        const a = j * (sailU + 1) + i;
        const b = a + 1;
        const c = a + sailU + 1;
        const d = c + 1;
        sailIndices.push(a, c, b, b, c, d);
      }
    }
    const sailGeo = track(new THREE.BufferGeometry());
    sailGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(sailPositions, 3),
    );
    sailGeo.setAttribute("uv", new THREE.Float32BufferAttribute(sailUvs, 2));
    sailGeo.setIndex(sailIndices);
    sailGeo.computeVertexNormals();
    const sail = new THREE.Mesh(sailGeo, matWhite);
    vela.add(sail);

    /* Sail edges and masts */
    const edgePoints: Array<Array<[number, number]>> = [
      Array.from({ length: 25 }, (_, i) => [i / 24, 0] as [number, number]),
      Array.from({ length: 25 }, (_, i) => [i / 24, 1] as [number, number]),
      Array.from({ length: 21 }, (_, i) => [0, i / 20] as [number, number]),
      Array.from({ length: 21 }, (_, i) => [1, i / 20] as [number, number]),
    ];
    edgePoints.forEach((edge) => {
      const points = edge.map(
        ([u, v]) =>
          new THREE.Vector3(
            (u - 0.5) * sailSpan,
            sailH(u, v) + 0.035,
            (v - 0.5) * sailDepth,
          ),
      );
      const curve = new THREE.CatmullRomCurve3(points);
      const tube = new THREE.Mesh(
        track(new THREE.TubeGeometry(curve, 32, 0.032, 6, false)),
        matCable,
      );
      vela.add(tube);
    });
    const corners: Array<[number, number]> = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ];
    corners.forEach(([u, v]) => {
      const height = sailH(u, v);
      const x = (u - 0.5) * sailSpan;
      const z = (v - 0.5) * sailDepth;
      addCylinder(vela, 0.055, 0.075, height, matMetal, [x, height / 2, z], 10);
    });
    const beacon = new THREE.Mesh(
      track(new THREE.SphereGeometry(0.09, 10, 10)),
      glowMaterial(0xffd9b0, 0.95),
    );
    beacon.position.set(5.6, 9.78, 3.7);
    vela.add(beacon);

    /* ------------------------------------------------------------------ */
    /*  Il Tempio                                                          */
    /* ------------------------------------------------------------------ */

    const tempio = new THREE.Group();
    tempio.position.set(TEMPIO_X, 0, -0.4);
    root.add(tempio);

    addBox(tempio, [11.8, 0.36, 8.6], matStone, [0, 0.18, 0]);
    addBox(tempio, [11.2, 0.14, 9.1], matStone, [0, 0.07, 1.1]);
    addBox(tempio, [10.2, 0.12, 9.7], matStone, [0, 0.18, 1.25]);
    addBox(tempio, [8.9, 4.9, 6.7], matConcrete, [0, 2.8, 0]);

    /* Vertical timber slats on the facade */
    const slatGeo = track(new THREE.BoxGeometry(0.11, 4.3, 0.16));
    const slatMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x4a2c1a,
        roughness: 0.68,
        metalness: 0.12,
        emissive: 0x1a0a03,
        emissiveIntensity: 0.35,
      }),
    );
    const slatCount = 26;
    const slats = new THREE.InstancedMesh(slatGeo, slatMat, slatCount);
    const dummy = new THREE.Object3D();
    let placedSlats = 0;
    for (let i = 0; i < slatCount; i += 1) {
      const x = -4.0 + (i / (slatCount - 1)) * 8.0;
      if (Math.abs(x) < 1.55) continue;
      dummy.position.set(x, 2.95, 3.28);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      slats.setMatrixAt(placedSlats, dummy.matrix);
      placedSlats += 1;
    }
    slats.count = placedSlats;
    slats.instanceMatrix.needsUpdate = true;
    tempio.add(slats);

    /* Portal */
    addBox(tempio, [3.6, 4.3, 0.55], matDark, [0, 2.5, 3.05]);
    addBox(tempio, [3.0, 3.75, 0.06], glowMaterial(0xff8a4a, 0.9), [0, 2.42, 3.34]);
    addBox(tempio, [2.15, 3.2, 0.06], matDark, [0, 1.98, 3.38]);
    addBox(tempio, [0.05, 3.2, 0.08], glowMaterial(0xffc79a, 0.65), [-1.09, 1.98, 3.4]);
    addBox(tempio, [0.05, 3.2, 0.08], glowMaterial(0xffc79a, 0.65), [1.09, 1.98, 3.4]);
    addBox(tempio, [2.25, 0.05, 0.08], glowMaterial(0xffc79a, 0.65), [0, 3.58, 3.4]);

    /* Roof line and skylight */
    addBox(tempio, [9.1, 0.16, 4.0], matDark, [0, 5.28, 1.15]);
    addBox(tempio, [4.6, 0.05, 0.42], glowMaterial(0xffb27a, 0.45), [0, 5.32, 2.1]);
    addBox(tempio, [8.95, 0.055, 0.08], glowMaterial(0xff9a5c, 0.4), [0, 5.24, 3.44]);

    /* Colonnade and canopy */
    for (let i = 0; i < 4; i += 1) {
      const x = -3.5 + i * (7 / 3);
      addCylinder(tempio, 0.15, 0.17, 4.75, matConcrete, [x, 2.72, 4.7], 18);
      const uplight = new THREE.Mesh(
        track(new THREE.CylinderGeometry(0.2, 0.24, 0.08, 18)),
        glowMaterial(0xffa870, 0.5),
      );
      uplight.position.set(x, 0.4, 4.7);
      tempio.add(uplight);
    }
    addBox(tempio, [9.8, 0.3, 2.7], matDark, [0, 5.2, 4.55]);
    addBox(tempio, [9.85, 0.04, 0.1], glowMaterial(0xffb27a, 0.4), [0, 5.04, 5.88]);

    const tempioSignTex = tex(signTexture("IL TEMPIO", "EDITORIA · TALENT · COMMUNITY"));
    const tempioSign = new THREE.Mesh(
      track(new THREE.PlaneGeometry(3.9, 0.62)),
      track(
        new THREE.MeshBasicMaterial({
          map: tempioSignTex,
          transparent: true,
          toneMapped: false,
          depthWrite: false,
        }),
      ),
    );
    tempioSign.position.set(0, 5.2, 5.94);
    tempio.add(tempioSign);

    /* Screens and totem */
    const screenTex = tex(screenTexture("IL TEMPIO", "Corax editorial lab", "#ff7a4d"));
    const screen = new THREE.Mesh(
      track(new THREE.PlaneGeometry(3.6, 2.05)),
      track(
        new THREE.MeshBasicMaterial({
          map: screenTex,
          toneMapped: false,
          transparent: true,
          opacity: 0.95,
        }),
      ),
    );
    screen.rotation.y = Math.PI / 2;
    screen.position.set(4.47, 2.95, -0.6);
    tempio.add(screen);
    fadeMats.push({ mat: screen.material, base: 0.95 });

    const totemTex = tex(totemTexture("#ff7a4d"));
    addBox(tempio, [1.0, 2.9, 0.22], matDark, [-4.95, 1.85, 4.55]);
    const totem = new THREE.Mesh(
      track(new THREE.PlaneGeometry(0.85, 2.7)),
      track(
        new THREE.MeshBasicMaterial({
          map: totemTex,
          toneMapped: false,
          transparent: true,
          opacity: 0.94,
        }),
      ),
    );
    totem.position.set(-4.95, 1.85, 4.67);
    tempio.add(totem);
    fadeMats.push({ mat: totem.material, base: 0.94 });

    /* Antenna and roof vents */
    addCylinder(tempio, 0.035, 0.035, 3.2, matMetal, [-2.6, 6.9, 0.4], 6);
    addCylinder(tempio, 0.03, 0.03, 2.1, matMetal, [2.8, 6.4, 0.8], 6);
    addBox(tempio, [1.3, 0.5, 0.8], matDark, [2.2, 5.62, 0.2]);

    /* ------------------------------------------------------------------ */
    /*  Lights                                                             */
    /* ------------------------------------------------------------------ */

    scene.add(new THREE.HemisphereLight(0x5b6099, 0x08070f, 0.72));

    const moon = new THREE.DirectionalLight(0xb6c4ff, 2.1);
    moon.position.set(-16, 22, 14);
    scene.add(moon);

    const warmFill = new THREE.DirectionalLight(0xff9d6a, 0.55);
    warmFill.position.set(18, 7, 16);
    scene.add(warmFill);

    const velaInterior = new THREE.PointLight(0xffc08a, 72, 18, 1.7);
    velaInterior.position.set(VELA_X + 0.5, 3.0, 0.8);
    scene.add(velaInterior);
    fadeLights.push({ light: velaInterior, base: 48 });

    const velaWash = new THREE.SpotLight(0xffd6b0, 240, 24, 0.74, 0.7, 1.5);
    velaWash.position.set(VELA_X + 4.4, 0.35, 8.5);
    velaWash.target.position.set(VELA_X + 0.2, 4.6, 0.5);
    scene.add(velaWash, velaWash.target);
    fadeLights.push({ light: velaWash, base: 240 });

    const sailGlow = new THREE.PointLight(0xcdd8ff, 95, 30, 1.3);
    sailGlow.position.set(VELA_X + 3.5, 14.5, 8.5);
    scene.add(sailGlow);
    fadeLights.push({ light: sailGlow, base: 95 });

    const tempioInterior = new THREE.PointLight(0xff8652, 30, 12, 1.8);
    tempioInterior.position.set(TEMPIO_X, 2.4, 2.3);
    scene.add(tempioInterior);
    fadeLights.push({ light: tempioInterior, base: 30 });

    const tempioWash = new THREE.SpotLight(0xff8f5c, 170, 20, 0.68, 0.75, 1.6);
    tempioWash.position.set(TEMPIO_X, 0.3, 8.3);
    tempioWash.target.position.set(TEMPIO_X, 3.1, 0.6);
    scene.add(tempioWash, tempioWash.target);
    fadeLights.push({ light: tempioWash, base: 170 });

    const terraceLight = new THREE.PointLight(0xffcfa4, 9, 9, 2);
    terraceLight.position.set(VELA_X + 4.0, 2.5, 6.0);
    scene.add(terraceLight);
    fadeLights.push({ light: terraceLight, base: 9 });

    /* ------------------------------------------------------------------ */
    /*  Markers and halos                                                  */
    /* ------------------------------------------------------------------ */

    const haloTexture = tex(
      canvasTexture(512, 512, (ctx) => {
        const g = ctx.createRadialGradient(256, 256, 70, 256, 256, 250);
        g.addColorStop(0, "rgba(255,255,255,0)");
        g.addColorStop(0.58, "rgba(255,255,255,0)");
        g.addColorStop(0.74, "rgba(255,255,255,0.5)");
        g.addColorStop(0.82, "rgba(255,255,255,0.16)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 512, 512);
      }),
    );

    type SpaceVisual = {
      slug: string;
      label: THREE.Sprite;
      labelMat: THREE.SpriteMaterial;
      labelY: number;
      haloMat: THREE.MeshBasicMaterial;
      halo: THREE.Mesh;
      center: THREE.Vector3;
      hit: THREE.Mesh;
      phase: number;
    };
    const visuals: SpaceVisual[] = [];
    const hits: THREE.Object3D[] = [];

    const labels: Array<[string, number, number, number]> = [
      ["vela", VELA_X + 3.55, 4.7, 4.5],
      ["tempio", TEMPIO_X, 6.2, 4.0],
    ];

    spaces.forEach((space, index) => {
      const spot = labels.find(([slug]) => slug === space.slug);
      if (!spot) return;
      const [, x, y, z] = spot;
      const texture = tex(pinTexture(space.index, space.accent));
      const labelMat = track(
        new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 0,
          depthWrite: false,
          depthTest: false,
          toneMapped: false,
        }),
      );
      const label = new THREE.Sprite(labelMat);
      label.position.set(x, y, z);
      label.scale.set(0.9, 0.9, 1);
      label.renderOrder = 20;
      label.userData.slug = space.slug;
      root.add(label);
      hits.push(label);

      const haloMat = track(
        new THREE.MeshBasicMaterial({
          map: haloTexture,
          color: new THREE.Color(space.accent),
          transparent: true,
          opacity: 0,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          toneMapped: false,
        }),
      );
      const halo = new THREE.Mesh(
        track(new THREE.PlaneGeometry(21, 15)),
        haloMat,
      );
      halo.rotation.x = -Math.PI / 2;
      halo.position.set(x, 0.06, 0.2);
      scene.add(halo);

      const hit = new THREE.Mesh(
        track(new THREE.BoxGeometry(space.slug === "vela" ? 16 : 14, 12, 14)),
        track(
          new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0,
            depthWrite: false,
            colorWrite: false,
          }),
        ),
      );
      hit.position.set(x, 5.4, space.slug === "vela" ? 0.6 : 0.4);
      hit.userData.slug = space.slug;
      root.add(hit);
      hits.push(hit);

      visuals.push({
        slug: space.slug,
        label,
        labelMat,
        labelY: y,
        haloMat,
        halo,
        center: new THREE.Vector3(x, 0, 0),
        hit,
        phase: index * 2.1,
      });
    });

    /* Fireflies over the plaza */
    const flyCount = reduced || small ? 0 : 90;
    let fireflies: THREE.Points | null = null;
    let flyBase: Float32Array | null = null;
    if (flyCount > 0) {
      flyBase = new Float32Array(flyCount * 3);
      for (let i = 0; i < flyCount; i += 1) {
        flyBase[i * 3] = -16 + Math.random() * 34;
        flyBase[i * 3 + 1] = 0.4 + Math.random() * 4.4;
        flyBase[i * 3 + 2] = -6 + Math.random() * 18;
      }
      const flyGeo = track(new THREE.BufferGeometry());
      flyGeo.setAttribute(
        "position",
        new THREE.BufferAttribute(flyBase.slice(), 3),
      );
      const flyMat = track(
        new THREE.PointsMaterial({
          color: 0xffd0a0,
          size: 0.075,
          transparent: true,
          opacity: 0.7,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
          toneMapped: false,
        }),
      );
      fireflies = new THREE.Points(flyGeo, flyMat);
      scene.add(fireflies);
    }

    /* ------------------------------------------------------------------ */
    /*  Camera + input                                                     */
    /* ------------------------------------------------------------------ */

    const defaultRadius = small ? 30.5 : 29;
    const state = {
      az: -0.16,
      el: small ? 0.38 : 0.4,
      radius: defaultRadius,
      targetRadius: defaultRadius,
      px: 0,
      py: 0,
      pxSmooth: 0,
      pySmooth: 0,
      dragging: false,
      moved: 0,
      lastX: 0,
      lastY: 0,
      lastMove: 0,
      vel: 0,
      lastInput: 0,
      pinch: 0,
      pinchRadius: defaultRadius,
    };
    const camPos = new THREE.Vector3();
    const camLook = new THREE.Vector3();
    const desiredPos = new THREE.Vector3();
    const desiredLook = new THREE.Vector3();
    const targetCenter = new THREE.Vector3(1.9, 3.4, 0.7);
    const spaceBySlug = new Map<string, VelaSpace>(
      spaces.map((space) => [space.slug, space]),
    );
    const pointers = new Map<number, { x: number; y: number }>();
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hovered: string | null = null;

    /* Start camera far outside, then glide in. */
    const introAz = state.az - 0.34;
    const introEl = state.el + 0.2;
    const introRadius = state.radius * 1.5;
    camPos.set(
      targetCenter.x + Math.sin(introAz) * introRadius * Math.cos(introEl),
      targetCenter.y + Math.sin(introEl) * introRadius,
      targetCenter.z + Math.cos(introAz) * introRadius * Math.cos(introEl),
    );
    camLook.copy(targetCenter);

    const damp = (current: number, target: number, lambda: number, dt: number) =>
      reduced ? target : THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));

    let needsRender = true;
    const resize = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.fov = w < 760 ? 54 : 41;
      camera.updateProjectionMatrix();
      needsRender = true;
    };
    resize();

    const raycastAt = (clientX: number, clientY: number) => {
      const rect = host.getBoundingClientRect();
      pointer.set(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -(((clientY - rect.top) / rect.height) * 2 - 1),
      );
      raycaster.setFromCamera(pointer, camera);
      const found = raycaster.intersectObjects(hits, false)[0];
      return (found?.object.userData.slug as string | undefined) ?? null;
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      state.px = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      state.py = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
    };

    const onPointerMove = (event: PointerEvent) => {
      state.lastInput = performance.now();
      if (pointers.has(event.pointerId)) {
        pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      }

      if (pointers.size === 2) {
        const [a, b] = Array.from(pointers.values());
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (state.pinch > 0) {
          const ratio = state.pinch / Math.max(1, distance);
          state.targetRadius = clamp(state.pinchRadius * ratio, small ? 26 : 15, small ? 74 : 52);
        }
        state.px = 0;
        state.py = 0;
        needsRender = true;
        return;
      }

      updatePointer(event);

      if (!state.dragging) {
        const now = performance.now();
        if (now - state.lastMove > 80) {
          state.lastMove = now;
          const slug = raycastAt(event.clientX, event.clientY);
          if (slug !== hovered) {
            hovered = slug;
            host.style.cursor = slug ? "pointer" : "grab";
            needsRender = true;
            hoverCbRef.current?.(slug);
          }
        }
        return;
      }
      const dx = event.clientX - state.lastX;
      const dy = event.clientY - state.lastY;
      const dtMove = Math.max(16, event.timeStamp - state.lastMove) / 1000;
      state.lastMove = event.timeStamp;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      state.moved += Math.abs(dx) + Math.abs(dy);
      state.az -= dx * 0.0052;
      state.el = clamp(state.el + dy * 0.0022, 0.1, 0.78);
      state.vel = clamp(-dx * 0.0052 / dtMove, -4, 4);
      host.style.cursor = "grabbing";
      needsRender = true;
    };

    const onPointerDown = (event: PointerEvent) => {
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (pointers.size === 2) {
        const [a, b] = Array.from(pointers.values());
        state.pinch = Math.hypot(a.x - b.x, a.y - b.y);
        state.pinchRadius = state.radius;
        state.dragging = false;
        state.vel = 0;
        return;
      }
      if (pointers.size > 2) return;
      state.dragging = true;
      state.moved = 0;
      state.vel = 0;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
      state.lastMove = event.timeStamp;
      state.lastInput = performance.now();
      host.setPointerCapture?.(event.pointerId);
      host.style.cursor = "grabbing";
      skipIntro();
    };

    const onPointerUp = (event: PointerEvent) => {
      pointers.delete(event.pointerId);
      if (pointers.size === 1) {
        const remaining = Array.from(pointers.values())[0];
        state.lastX = remaining.x;
        state.lastY = remaining.y;
        state.lastMove = event.timeStamp;
        state.dragging = true;
        state.pinch = 0;
        return;
      }
      state.pinch = 0;
      const wasDragging = state.dragging;
      state.dragging = false;
      state.lastInput = performance.now();
      host.releasePointerCapture?.(event.pointerId);
      if (wasDragging && state.moved < 8) {
        const slug = raycastAt(event.clientX, event.clientY);
        if (slug) {
          state.vel = 0;
          selectRef.current(slug);
        }
      }
      host.style.cursor = hovered ? "pointer" : "grab";
    };

    const onPointerCancel = (event: PointerEvent) => {
      pointers.delete(event.pointerId);
      state.dragging = false;
      state.pinch = 0;
      host.style.cursor = "grab";
    };

    const onPointerLeave = () => {
      if (state.dragging) return;
      state.px = 0;
      state.py = 0;
      host.style.cursor = "grab";
      if (hovered) {
        hovered = null;
        needsRender = true;
        hoverCbRef.current?.(null);
      }
    };

    const onDoubleClick = () => {
      state.az = -0.16;
      state.el = small ? 0.38 : 0.4;
      state.targetRadius = defaultRadius;
      state.px = 0;
      state.py = 0;
      needsRender = true;
    };

    host.style.cursor = "grab";
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerdown", onPointerDown);
    host.addEventListener("pointerup", onPointerUp);
    host.addEventListener("pointercancel", onPointerCancel);
    host.addEventListener("pointerleave", onPointerLeave);
    host.addEventListener("dblclick", onDoubleClick);

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

    /* Entrance */
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {
      seen = false;
    }
    const lateStart = performance.now() > 3200;
    const introScale = small ? 0.72 : lateStart ? 0.55 : 1;
    const introLength = reduced || seen ? 0 : Math.round(INTRO_MS * introScale);
    let introElapsed = 0;
    let introDone = introLength === 0;
    const finishIntro = () => {
      if (introDone) return;
      introDone = true;
      try {
        window.sessionStorage.setItem(INTRO_KEY, "1");
      } catch {
        /* private mode: the entrance replays */
      }
      enteredRef.current?.();
    };
    const skipIntro = () => {
      if (introDone) return;
      introElapsed = introLength;
      finishIntro();
      needsRender = true;
    };
    if (skipRef) skipRef.current = skipIntro;
    if (introDone) enteredRef.current?.();

    const onKeySkip = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        skipIntro();
      }
    };
    window.addEventListener("keydown", onKeySkip);

    let raf = 0;
    let elapsed = 0;
    let ready = false;
    let lastFrame = performance.now();
    let perfAcc = 0;
    let perfFrames = 0;
    let perfAdjustments = 0;
    let lastActive: string | null | undefined;
    let lastHover: string | null | undefined;

    const update = (dt: number) => {
      elapsed += dt;
      const t = elapsed;

      /* Entrance progress */
      const raw = introLength > 0 ? Math.min(1, introElapsed / introLength) : 1;
      const intro = easeOutQuart(raw);

      /* Drag inertia */
      if (!state.dragging && Math.abs(state.vel) > 0.0004) {
        state.az += state.vel * dt;
        state.vel *= Math.exp(-3.8 * dt);
      }

      /* Gentle idle drift, only before the user takes over. */
      if (!reduced && !state.dragging && performance.now() - state.lastInput > 7000) {
        state.az += dt * 0.014;
      }

      state.pxSmooth = damp(state.pxSmooth, state.px, 2.4, dt);
      state.pySmooth = damp(state.pySmooth, state.py, 2.4, dt);
      state.radius = damp(state.radius, state.targetRadius, 2.2, dt);

      const active = activeRef.current;
      const activeSpace = active ? spaceBySlug.get(active) : undefined;
      const hover = hovered ?? hoverRef?.current ?? null;

      if (activeSpace) {
        const [px, py, pz] = activeSpace.camera.position;
        const [lx, ly, lz] = activeSpace.camera.look;
        desiredLook.set(lx, ly, lz);
        desiredPos.set(px, py, pz);
        if (small) {
          desiredPos.sub(desiredLook).multiplyScalar(1.38).add(desiredLook);
        }
      } else {
        const az = state.az + state.pxSmooth * 0.09 - (1 - intro) * 0.3;
        const el = clamp(
          state.el + state.pySmooth * 0.025 + (1 - intro) * 0.18,
          0.08,
          0.9,
        );
        const radius = state.radius * (1 + (1 - intro) * 0.42);
        desiredPos.set(
          targetCenter.x + Math.sin(az) * radius * Math.cos(el),
          targetCenter.y + Math.sin(el) * radius,
          targetCenter.z + Math.cos(az) * radius * Math.cos(el),
        );
        desiredLook.copy(targetCenter);
      }

      const lambda = activeSpace ? 2.4 : 1.25;
      camPos.x = damp(camPos.x, desiredPos.x, lambda, dt);
      camPos.y = damp(camPos.y, desiredPos.y, lambda, dt);
      camPos.z = damp(camPos.z, desiredPos.z, lambda, dt);
      camLook.x = damp(camLook.x, desiredLook.x, activeSpace ? 2.4 : 1.7, dt);
      camLook.y = damp(camLook.y, desiredLook.y, activeSpace ? 2.4 : 1.7, dt);
      camLook.z = damp(camLook.z, desiredLook.z, activeSpace ? 2.4 : 1.7, dt);
      camera.position.copy(camPos);
      camera.lookAt(camLook);

      /* Buildings: subtle assembly + light-up */
      vela.scale.setScalar(0.94 + 0.06 * intro);
      tempio.scale.setScalar(0.94 + 0.06 * intro);
      vela.position.y = (1 - intro) * -0.35;
      tempio.position.y = (1 - intro) * -0.35;

      fadeMats.forEach(({ mat, base }) => {
        mat.opacity = base * intro;
      });
      litMats.forEach(({ mat, base }) => {
        mat.emissiveIntensity = base * (0.35 + 0.65 * intro);
      });
      fadeLights.forEach(({ light, base }) => {
        light.intensity = base * (0.25 + 0.75 * intro);
      });

      /* Markers */
      visuals.forEach((visual) => {
        const isHot = hover === visual.slug || active === visual.slug;
        const targetOpacity = active
          ? 0
          : intro * (isHot ? 1 : 0.85);
        visual.labelMat.opacity = damp(visual.labelMat.opacity, targetOpacity, 4, dt);
        const scale = isHot ? 1.04 : 0.9;
        visual.label.scale.x = damp(visual.label.scale.x, scale, 4, dt);
        visual.label.scale.y = damp(visual.label.scale.y, scale, 4, dt);
        if (!reduced) {
          visual.label.position.y =
            visual.labelY + Math.sin(t * 0.7 + visual.phase) * 0.05;
        }
        const haloBase = active
          ? active === visual.slug
            ? 0.52
            : 0.05
          : isHot
            ? 0.4
            : 0.2;
        visual.haloMat.opacity = damp(
          visual.haloMat.opacity,
          intro * haloBase,
          4,
          dt,
        );
      });

      /* Fireflies */
      if (fireflies && flyBase) {
        const position = fireflies.geometry.getAttribute("position") as THREE.BufferAttribute;
        const array = position.array as Float32Array;
        for (let i = 0; i < flyCount; i += 1) {
          const phase = i * 0.73;
          array[i * 3] = flyBase[i * 3] + Math.sin(t * 0.21 + phase) * 0.5;
          array[i * 3 + 1] =
            flyBase[i * 3 + 1] + Math.sin(t * 0.4 + phase * 1.4) * 0.35;
          array[i * 3 + 2] =
            flyBase[i * 3 + 2] + Math.cos(t * 0.17 + phase) * 0.5;
        }
        position.needsUpdate = true;
      }

      /* A slow breathing pulse on the beacons */
      if (!reduced) {
        beacon.scale.setScalar(1 + Math.sin(t * 1.5) * 0.15);
      }
    };

    const render = () => {
      raf = requestAnimationFrame(render);
      const nowFrame = performance.now();
      const frame = Math.max(0, (nowFrame - lastFrame) / 1000);
      lastFrame = nowFrame;
      const dt = Math.min(frame, 0.05);
      if (!inView || document.hidden) return;
      if (!introDone) introElapsed += frame * 1000;

      if (reduced) {
        const current = activeRef.current;
        const currentHover = hovered ?? hoverRef?.current ?? null;
        if (current !== lastActive || currentHover !== lastHover) {
          lastActive = current;
          lastHover = currentHover;
          needsRender = true;
        }
        if (!needsRender) return;
        needsRender = false;
      }

      update(dt);
      renderer.render(scene, camera);
      if (!introDone && introElapsed >= introLength) finishIntro();
      if (!ready) {
        ready = true;
        host.classList.add("is-ready");
        readyRef.current?.();
      }

      /* Adaptive resolution for weaker GPUs. */
      if (!reduced && ready) {
        perfAcc += frame;
        perfFrames += 1;
        if (perfFrames >= 90) {
          const average = perfAcc / perfFrames;
          if (average > 0.021 && dpr > 0.9 && perfAdjustments < 3) {
            dpr = Math.max(0.85, dpr - 0.25);
            renderer.setPixelRatio(dpr);
            perfAdjustments += 1;
          } else if (average < 0.0132 && dpr < dprCap && perfAdjustments < 3) {
            dpr = Math.min(dprCap, dpr + 0.15);
            renderer.setPixelRatio(dpr);
            perfAdjustments += 1;
          }
          perfAcc = 0;
          perfFrames = 0;
        }
      }
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeySkip);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerdown", onPointerDown);
      host.removeEventListener("pointerup", onPointerUp);
      host.removeEventListener("pointercancel", onPointerCancel);
      host.removeEventListener("pointerleave", onPointerLeave);
      host.removeEventListener("dblclick", onDoubleClick);
      if (skipRef) skipRef.current = null;
      disposables.forEach((item) => item.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
      host.classList.remove("is-ready");
    };
  }, [spaces, reduced, activeRef, hoverRef, skipRef]);

  return <div ref={hostRef} className="vela-canvas-host" aria-hidden="true" />;
}
