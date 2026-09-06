'use client';

import {
  Component,
  createContext,
  memo,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import {
  BoxGeometry,
  CylinderGeometry,
  DoubleSide,
  MeshStandardMaterial,
  OrthographicCamera,
  PCFShadowMap,
  PlaneGeometry,
  Shape,
  ShapeGeometry,
  SphereGeometry,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  TorusGeometry,
  Vector3,
} from 'three';
import type { StudioSceneProps, StudioZone } from './types';

type Point = [number, number, number];
type Surface = keyof typeof COLORS;

const COLORS = {
  plaster: '#ede6d6',
  plasterEdge: '#d4caba',
  oak: '#b98c62',
  lightOak: '#caa47b',
  oakDark: '#785e43',
  floorA: '#d4b594',
  floorB: '#cdb092',
  green: '#344b3f',
  moss: '#61765c',
  leaf: '#4e6847',
  leafLight: '#7e9164',
  dark: '#242d27',
  ink: '#393b32',
  linen: '#e0d7c2',
  paper: '#f9f1df',
  clay: '#ab694e',
  brass: '#a18c59',
  glass: '#a4b7ad',
  screen: '#b9d1bc',
  rug: '#7e8a72',
  white: '#fff4dc',
} as const;

function createAssets() {
  return {
    box: new BoxGeometry(1, 1, 1),
    cylinder: new CylinderGeometry(1, 1, 1, 16),
    tapered: new CylinderGeometry(0.76, 1, 1, 16),
    sphere: new SphereGeometry(1, 12, 10),
    torus: new TorusGeometry(1, 0.2, 6, 16),
    plane: new PlaneGeometry(1, 1),
    materials: Object.fromEntries(
      Object.entries(COLORS).map(([name, color]) => [
        name,
        new MeshStandardMaterial({
          color,
          roughness: name === 'brass' ? 0.45 : 0.87,
          metalness: name === 'brass' ? 0.4 : 0,
        }),
      ]),
    ) as Record<Surface, MeshStandardMaterial>,
  };
}

type Assets = ReturnType<typeof createAssets>;
const AssetContext = createContext<Assets | null>(null);

function useAssets() {
  const assets = useContext(AssetContext);
  if (!assets) throw new Error('Studio assets are unavailable');
  return assets;
}

function AssetProvider({ children }: { children: ReactNode }) {
  const assets = useMemo(() => createAssets(), []);
  useEffect(() => () => {
    assets.box.dispose();
    assets.cylinder.dispose();
    assets.tapered.dispose();
    assets.sphere.dispose();
    assets.torus.dispose();
    assets.plane.dispose();
    Object.values(assets.materials).forEach((material) => material.dispose());
  }, [assets]);
  return <AssetContext.Provider value={assets}>{children}</AssetContext.Provider>;
}

type ObjectProps = {
  at?: Point;
  size?: Point;
  color?: Surface;
  rotation?: Point;
};

function Box({ at = [0, 0, 0], size = [1, 1, 1], color = 'oak', rotation }: ObjectProps) {
  const assets = useAssets();
  return <mesh position={at} rotation={rotation} scale={size} geometry={assets.box} material={assets.materials[color]} castShadow receiveShadow dispose={null} />;
}

function Cylinder({ at = [0, 0, 0], size = [1, 1, 1], color = 'oak', rotation, tapered = false }: ObjectProps & { tapered?: boolean }) {
  const assets = useAssets();
  return <mesh position={at} rotation={rotation} scale={size} geometry={tapered ? assets.tapered : assets.cylinder} material={assets.materials[color]} castShadow receiveShadow dispose={null} />;
}

function Ellipsoid({ at = [0, 0, 0], size = [1, 1, 1], color = 'leaf', rotation }: ObjectProps) {
  const assets = useAssets();
  return <mesh position={at} rotation={rotation} scale={size} geometry={assets.sphere} material={assets.materials[color]} castShadow dispose={null} />;
}

function Cup({ at, color = 'paper', rotation = 0 }: { at: Point; color?: Surface; rotation?: number }) {
  const assets = useAssets();
  return <group position={at} rotation={[0, rotation, 0]}>
    <Cylinder at={[0, 0.025, 0]} size={[0.16, 0.025, 0.16]} color={color} />
    <Cylinder at={[0, 0.105, 0]} size={[0.103, 0.15, 0.103]} color={color} />
    <Cylinder at={[0, 0.182, 0]} size={[0.079, 0.008, 0.079]} color="oakDark" />
    <mesh position={[0.12, 0.115, 0]} scale={[0.065, 0.06, 0.055]} geometry={assets.torus} material={assets.materials[color]} dispose={null} />
  </group>;
}

function Plant({ at, size = 1, pot = 'clay' }: { at: Point; size?: number; pot?: Surface }) {
  return <group position={at} scale={size}>
    <Cylinder at={[0, 0.28, 0]} size={[0.28, 0.54, 0.28]} color={pot} tapered />
    <Cylinder at={[0, 0.555, 0]} size={[0.235, 0.018, 0.235]} color="oakDark" />
    <Cylinder at={[0, 1.08, 0]} size={[0.023, 1.13, 0.023]} color="oakDark" rotation={[0.03, 0, -0.06]} />
    {[
      [-0.22, 0.99, 0.02, 0.72], [0.24, 1.16, 0.07, -0.8],
      [-0.15, 1.4, -0.08, 0.6], [0.16, 1.55, 0.02, -0.5],
      [0.015, 1.8, 0, -0.06], [0.01, 1.26, 0.22, 0.4],
    ].map(([x, y, z, tilt], index) => <Ellipsoid key={index} at={[x, y, z]} size={[0.13, 0.34, 0.065]} color={index % 2 ? 'leaf' : 'leafLight'} rotation={[index === 5 ? 0.8 : -0.25, index * 0.8, tilt]} />)}
  </group>;
}

function Book({ at, size = [0.53, 0.07, 0.69], color = 'green', rotation = 0 }: { at: Point; size?: Point; color?: Surface; rotation?: number }) {
  return <group position={at} rotation={[0, rotation, 0]}>
    <Box size={size} color={color} />
    <Box at={[0.015, 0, 0]} size={[size[0] - 0.035, size[1] * 0.56, size[2] - 0.025]} color="paper" />
  </group>;
}

function Chair({ at, rotation = 0, color = 'linen' }: { at: Point; rotation?: number; color?: Surface }) {
  return <group position={at} rotation={[0, rotation, 0]}>
    {[[-0.29, -0.25], [0.29, -0.25], [-0.29, 0.25], [0.29, 0.25]].map(([x, z], i) => <Box key={i} at={[x, 0.25, z]} size={[0.065, 0.5, 0.065]} color="oakDark" rotation={[z > 0 ? 0.08 : -0.08, 0, x > 0 ? -0.08 : 0.08]} />)}
    <Box at={[0, 0.53, 0]} size={[0.71, 0.12, 0.64]} color={color} />
    <Box at={[-0.31, 0.88, -0.27]} size={[0.07, 0.7, 0.07]} color="oakDark" rotation={[-0.1, 0, 0]} />
    <Box at={[0.31, 0.88, -0.27]} size={[0.07, 0.7, 0.07]} color="oakDark" rotation={[-0.1, 0, 0]} />
    <Box at={[0, 1.14, -0.32]} size={[0.72, 0.27, 0.095]} color={color} rotation={[-0.1, 0, 0]} />
  </group>;
}

function DeskLamp({ at, rotation = 0 }: { at: Point; rotation?: number }) {
  return <group position={at} rotation={[0, rotation, 0]}>
    <Cylinder at={[0, 0.035, 0]} size={[0.21, 0.07, 0.21]} color="green" />
    <Cylinder at={[0, 0.41, 0]} size={[0.021, 0.77, 0.021]} color="brass" rotation={[0, 0, -0.15]} />
    <Cylinder at={[0.105, 0.79, 0]} size={[0.23, 0.23, 0.23]} color="green" tapered />
    <Cylinder at={[0.105, 0.668, 0]} size={[0.219, 0.01, 0.219]} color="white" />
  </group>;
}

function usePhoto(url: string) {
  const [texture, setTexture] = useState<Texture | null>(null);
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    let alive = true;
    let loaded: Texture | null = null;
    const loader = new TextureLoader();
    loader.load(url, (image) => {
      loaded = image;
      if (!alive) {
        image.dispose();
        return;
      }
      const source = image.image as HTMLImageElement;
      const maxSide = Math.max(source.width, source.height);
      if (maxSide > 1024) {
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(source.width * 1024 / maxSide);
        canvas.height = Math.round(source.height * 1024 / maxSide);
        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(source, 0, 0, canvas.width, canvas.height);
          loaded.image = canvas;
          image.needsUpdate = true;
        }
      }
      image.colorSpace = SRGBColorSpace;
      image.anisotropy = 2;
      setTexture(image);
      invalidate();
    }, undefined, () => { /* The paper-colored backing remains visible if an image is unavailable. */ });
    return () => {
      alive = false;
      loaded?.dispose();
    };
  }, [url, invalidate]);
  return texture;
}

function Photo({ url, at, size, rotation = [0, 0, 0], frame = 'oakDark' }: { url: string; at: Point; size: [number, number]; rotation?: Point; frame?: Surface }) {
  const texture = usePhoto(url);
  const assets = useAssets();
  return <group position={at} rotation={rotation}>
    <Box size={[size[0] + 0.09, size[1] + 0.09, 0.05]} color={frame} />
    <Box at={[0, 0, 0.03]} size={[size[0] + 0.035, size[1] + 0.035, 0.012]} color="paper" />
    <mesh position={[0, 0, 0.04]} scale={[size[0], size[1], 1]} geometry={assets.plane} dispose={null}>
      <meshStandardMaterial key={texture?.uuid ?? 'placeholder'} map={texture} color={texture ? '#ffffff' : '#b9c1a7'} roughness={0.94} />
    </mesh>
  </group>;
}

function Mountain({ at, color, peaks }: { at: Point; color: string; peaks: number[] }) {
  const geometry = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(-2.15, -0.05);
    shape.lineTo(-2.15, peaks[0]);
    for (let i = 1; i < peaks.length; i++) {
      const x = -2.15 + (4.3 * i) / (peaks.length - 1);
      const previousX = -2.15 + (4.3 * (i - 1)) / (peaks.length - 1);
      shape.bezierCurveTo(previousX + 0.22, peaks[i - 1], x - 0.22, peaks[i], x, peaks[i]);
    }
    shape.lineTo(2.15, -0.05);
    shape.closePath();
    return new ShapeGeometry(shape);
  }, [peaks]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh position={at} geometry={geometry}>
    <meshBasicMaterial color={color} side={DoubleSide} />
  </mesh>;
}

const FAR_PEAKS = [0.8, 1.3, 1.75, 1.1, 1.5, 1.32, 0.9];
const MID_PEAKS = [0.38, 0.78, 1.08, 0.73, 1.23, 0.62, 0.7];
const NEAR_PEAKS = [0.33, 0.51, 0.35, 0.74, 0.67, 0.35, 0.56];

const Architecture = memo(function Architecture() {
  return <group>
    <Box at={[0, -0.23, 0]} size={[10.45, 0.38, 8.3]} color="plasterEdge" />
    <Box at={[0, -0.09, 0]} size={[10.25, 0.14, 8.15]} color="oakDark" />
    {Array.from({ length: 22 }, (_, i) => <Box key={i} at={[0, 0, -3.92 + i * 0.373]} size={[10.05, 0.07, 0.362]} color={i % 3 === 0 ? 'floorB' : 'floorA'} />)}
    <Box at={[0, 0.65, -4.06]} size={[10.25, 1.3, 0.18]} color="plaster" />
    <Box at={[2.62, 2.35, -4.06]} size={[5.02, 2.1, 0.18]} color="plaster" />
    <Box at={[-4.81, 2.35, -4.06]} size={[0.64, 2.1, 0.18]} color="plaster" />
    <Box at={[-2.2, 3.34, -4.06]} size={[4.55, 0.15, 0.18]} color="plaster" />
    <Box at={[-2.25, 2.26, -4.19]} size={[4.36, 2.06, 0.035]} color="glass" />
    <Mountain at={[-2.25, 1.28, -4.157]} color="#c1ccc0" peaks={FAR_PEAKS} />
    <Mountain at={[-2.25, 1.28, -4.145]} color="#9bae9d" peaks={MID_PEAKS} />
    <Mountain at={[-2.25, 1.28, -4.133]} color="#809682" peaks={NEAR_PEAKS} />
    {[-4.5, -2.26, 0.0].map((x) => <Box key={x} at={[x, 2.29, -3.98]} size={[0.085, 2.08, 0.17]} color="oakDark" />)}
    <Box at={[-2.25, 3.31, -3.98]} size={[4.58, 0.09, 0.17]} color="oakDark" />
    <Box at={[-2.25, 1.3, -3.94]} size={[4.65, 0.095, 0.37]} color="lightOak" />
    <Box at={[-5.07, 1.7, -0.95]} size={[0.16, 3.4, 6.35]} color="plaster" />
    <Box at={[-5.07, 3.44, -0.9]} size={[0.23, 0.13, 6.44]} color="lightOak" />
    <Box at={[0, 3.44, -4.05]} size={[10.43, 0.13, 0.25]} color="lightOak" />
    <Box at={[-4.92, 0.19, -0.95]} size={[0.045, 0.26, 6.3]} color="oakDark" />
    <Box at={[0, 0.19, -3.93]} size={[10.1, 0.26, 0.045]} color="oakDark" />
    <Box at={[-0.1, 0.051, 0.73]} size={[5.65, 0.025, 4.37]} color="rug" />
    {[-1.25, -0.99, 2.43, 2.7].map((z) => <Box key={z} at={[-0.1, 0.067, z]} size={[5.39, 0.007, 0.029]} color="linen" />)}
    <Box at={[4.38, 0.09, 2.94]} size={[1.0, 0.075, 1.2]} color="linen" rotation={[0, -0.1, 0]} />
    <Plant at={[4.23, 0.09, 2.72]} size={1.18} pot="paper" />
    <Plant at={[-4.22, 0.06, -3.19]} size={0.78} />
  </group>;
});

function ZoneObject({ children, zone, selected, onSelect }: { children: ReactNode; zone: StudioZone; selected: StudioZone; onSelect: StudioSceneProps['onSelect'] }) {
  const gl = useThree((state) => state.gl);
  const [hovered, setHovered] = useState(false);
  const active = selected === zone;
  const click = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(zone);
  };
  return <group
    onClick={click}
    onPointerOver={(event) => {
      event.stopPropagation();
      setHovered(true);
      gl.domElement.style.setProperty('cursor', 'pointer');
    }}
    onPointerOut={() => {
      setHovered(false);
      gl.domElement.style.removeProperty('cursor');
    }}
  >
    {children}
    <ZoneMarker zone={zone} active={active || hovered} />
  </group>;
}

const MARKERS: Record<Exclude<StudioZone, 'overview'>, Point> = {
  work: [0.1, 1.265, 1.1],
  build: [2.75, 1.23, -2.73],
  notes: [-3.75, 1.12, -0.69],
};

function ZoneMarker({ zone, active }: { zone: StudioZone; active: boolean }) {
  const assets = useAssets();
  if (zone === 'overview') return null;
  return <group position={MARKERS[zone]}>
    <mesh geometry={assets.torus} scale={[0.075, 0.075, 0.06]} rotation={[-Math.PI / 2, 0, 0]} dispose={null}>
      <meshBasicMaterial color={active ? '#eaba71' : '#fff4dc'} />
    </mesh>
    <Cylinder at={[0, -0.008, 0]} size={[0.034, 0.012, 0.034]} color={active ? 'brass' : 'green'} />
  </group>;
}

const SharedTable = memo(function SharedTable() {
  return <group>
    <Box at={[0, 1.13, 0.55]} size={[4.15, 0.17, 1.79]} color="lightOak" />
    <Box at={[0, 1.025, 0.55]} size={[3.85, 0.14, 1.48]} color="oak" />
    {[-1.7, 1.7].flatMap((x) => [-0.05, 1.15].map((z) => <Box key={`${x}-${z}`} at={[x, 0.55, z]} size={[0.13, 1.1, 0.13]} color="oakDark" />))}
    {[-1.15, 0.05, 1.24].map((x) => <Chair key={`back-${x}`} at={[x, 0.07, -0.91]} color="green" />)}
    {[-1.12, 1.15].map((x) => <Chair key={`front-${x}`} at={[x, 0.07, 2.0]} rotation={Math.PI} />)}
    <Chair at={[2.65, 0.07, 0.55]} rotation={Math.PI / 2} />
    <Photo url="/images/work/03.jpg" at={[-1.13, 1.24, 0.43]} size={[0.73, 0.48]} rotation={[-Math.PI / 2, 0, -0.11]} frame="paper" />
    <Photo url="/blog/superai-china/team.jpg" at={[-0.35, 1.24, 0.16]} size={[0.68, 0.45]} rotation={[-Math.PI / 2, 0, 0.18]} frame="paper" />
    <Book at={[0.81, 1.265, 0.96]} size={[0.62, 0.08, 0.8]} color="clay" rotation={-0.08} />
    <Box at={[0.81, 1.311, 1.05]} size={[0.37, 0.012, 0.18]} color="paper" rotation={[0, -0.08, 0]} />
    <Cup at={[-1.52, 1.22, 0.93]} rotation={0.4} />
    <Cup at={[1.51, 1.22, 0.02]} color="green" rotation={-1} />
    <Box at={[-0.24, 1.225, 0.95]} size={[0.27, 0.015, 0.39]} color="paper" rotation={[0, 0.19, 0]} />
    <Box at={[-0.34, 1.239, 0.87]} size={[0.015, 0.015, 0.26]} color="clay" rotation={[0, -0.3, 0]} />
    <Cylinder at={[0.39, 1.365, -0.01]} size={[0.1, 0.28, 0.1]} color="linen" tapered />
    <Cylinder at={[0.39, 1.64, -0.01]} size={[0.012, 0.42, 0.012]} color="leaf" rotation={[0, 0, -0.2]} />
    <Ellipsoid at={[0.34, 1.79, -0.01]} size={[0.085, 0.13, 0.07]} color="leafLight" rotation={[0, 0, 0.7]} />
    <Ellipsoid at={[0.45, 1.66, 0]} size={[0.07, 0.12, 0.065]} color="leaf" rotation={[0, 0, -0.6]} />
  </group>;
});

const ProductBench = memo(function ProductBench() {
  return <group>
    <Box at={[2.68, 1.09, -2.9]} size={[3.78, 0.13, 1.17]} color="lightOak" />
    <Box at={[1.23, 0.56, -2.96]} size={[0.57, 1.01, 0.87]} color="green" />
    <Box at={[4.18, 0.56, -2.96]} size={[0.13, 1.01, 0.91]} color="oakDark" />
    {[0.34, 0.65, 0.96].map((y) => <Box key={y} at={[1.23, y, -2.507]} size={[0.17, 0.025, 0.02]} color="brass" />)}
    <Box at={[2.56, 1.185, -3.15]} size={[0.59, 0.07, 0.32]} color="dark" />
    <Box at={[2.56, 1.42, -3.23]} size={[0.11, 0.45, 0.09]} color="dark" />
    <Photo url="/projects/matchpoint.png" at={[2.56, 1.83, -3.2]} size={[1.59, 0.91]} frame="dark" />
    <Box at={[2.5, 1.18, -2.65]} size={[0.82, 0.04, 0.28]} color="linen" />
    {[0, 1, 2].map((row) => <Box key={row} at={[2.5, 1.203, -2.73 + row * 0.066]} size={[0.67, 0.009, 0.011]} color="plasterEdge" />)}
    <Ellipsoid at={[3.19, 1.2, -2.65]} size={[0.085, 0.035, 0.12]} color="linen" />
    <Box at={[3.87, 1.42, -3.11]} size={[0.28, 0.55, 0.27]} color="dark" />
    <Cylinder at={[3.87, 1.44, -2.966]} size={[0.074, 0.02, 0.074]} color="ink" rotation={[Math.PI / 2, 0, 0]} />
    <Cup at={[1.65, 1.16, -2.69]} color="clay" />
    <Chair at={[2.71, 0.05, -1.58]} rotation={Math.PI} color="green" />
    <Box at={[2.56, 2.81, -3.78]} size={[3.45, 0.085, 0.39]} color="oak" />
    <Book at={[1.53, 2.915, -3.78]} size={[0.75, 0.11, 0.34]} color="paper" />
    <Book at={[1.57, 3.02, -3.79]} size={[0.63, 0.1, 0.34]} color="green" />
    <Cylinder at={[3.41, 3.03, -3.77]} size={[0.125, 0.35, 0.125]} color="clay" tapered />
    <Plant at={[4.49, 0.06, -3.25]} size={0.66} pot="linen" />
    <Photo url="/images/work/03.jpg" at={[3.97, 2.34, -3.925]} size={[0.73, 0.47]} frame="lightOak" />
  </group>;
});

const WritingCorner = memo(function WritingCorner() {
  return <group>
    <Box at={[-3.83, 1.035, -1.58]} size={[1.48, 0.14, 2.48]} color="lightOak" />
    {[-4.39, -3.28].flatMap((x) => [-2.58, -0.59].map((z) => <Box key={`${x}-${z}`} at={[x, 0.52, z]} size={[0.085, 1.02, 0.085]} color="oakDark" />))}
    <Chair at={[-2.64, 0.05, -1.8]} rotation={Math.PI / 2} />
    <Book at={[-3.62, 1.15, -1.7]} size={[0.68, 0.065, 0.98]} color="green" rotation={-0.07} />
    <Box at={[-3.76, 1.188, -1.68]} size={[0.32, 0.012, 0.85]} color="paper" rotation={[0, -0.07, 0.045]} />
    <Box at={[-3.43, 1.188, -1.70]} size={[0.32, 0.012, 0.85]} color="paper" rotation={[0, -0.07, -0.045]} />
    {[0, 1, 2, 3, 4].map((i) => <Box key={i} at={[-3.43, 1.202, -1.98 + i * 0.1]} size={[0.20, 0.002, 0.009]} color="plasterEdge" rotation={[0, -0.07, 0]} />)}
    <Box at={[-3.58, 1.211, -1.43]} size={[0.023, 0.018, 0.35]} color="oakDark" rotation={[0, -0.3, 0]} />
    <DeskLamp at={[-4.22, 1.113, -2.24]} rotation={Math.PI / 3} />
    <Cup at={[-3.69, 1.113, -2.41]} color="paper" />
    <Book at={[-4.07, 1.15, -0.76]} size={[0.51, 0.08, 0.58]} color="clay" rotation={0.14} />
    <Photo url="/blog/zongtong-retreat/temple.jpg" at={[-4.78, 2.3, -1.89]} size={[1.2, 0.85]} rotation={[0, Math.PI / 2, 0]} frame="lightOak" />
    <Photo url="/blog/superai-china/team.jpg" at={[-4.78, 2.12, -0.77]} size={[0.66, 0.46]} rotation={[0, Math.PI / 2, 0]} frame="lightOak" />
  </group>;
});

const Bookshelf = memo(function Bookshelf() {
  const colors: Surface[] = ['green', 'paper', 'clay', 'linen', 'oakDark', 'moss'];
  return <group position={[-4.55, 0, 1.58]}>
    <Box at={[-0.3, 0.9, 0]} size={[0.07, 1.8, 1.91]} color="oakDark" />
    <Box at={[0.01, 0.9, -0.91]} size={[0.66, 1.8, 0.075]} color="oak" />
    <Box at={[0.01, 0.9, 0.91]} size={[0.66, 1.8, 0.075]} color="oak" />
    {[0.14, 0.87, 1.67].map((y) => <Box key={y} at={[0.03, y, 0]} size={[0.69, 0.085, 1.91]} color="lightOak" />)}
    {[-0.42, -0.22, -0.04, 0.14, 0.36, 0.55].map((z, i) => <Book key={z} at={[0.1, 0.45, z]} size={[0.39, 0.52 + (i % 3) * 0.045, 0.13]} color={colors[i]} rotation={0} />)}
    {[-0.52, -0.35, -0.17, 0.03].map((z, i) => <Box key={z} at={[0.12, 1.18, z]} size={[0.37, 0.47 + (i % 2) * 0.13, 0.11]} color={colors[i + 1]} />)}
    <Box at={[0.14, 1.12, 0.48]} size={[0.43, 0.34, 0.53]} color="linen" />
    <Box at={[0.365, 1.12, 0.48]} size={[0.012, 0.06, 0.19]} color="oakDark" />
    <Plant at={[0.02, 1.75, -0.53]} size={0.43} pot="paper" />
    <Cylinder at={[0.03, 1.84, 0.6]} size={[0.18, 0.19, 0.18]} color="clay" tapered />
  </group>;
});

const CAMERA_POSES: Record<StudioZone, { target: Point; eye: Point; scale: number }> = {
  overview: { target: [0, 1.02, -0.1], eye: [12, 11.4, 14], scale: 1 },
  work: { target: [0, 0.98, 0.5], eye: [9.4, 11.3, 13.7], scale: 1.52 },
  build: { target: [2.28, 1.35, -2.6], eye: [9.8, 8.8, 12.7], scale: 1.95 },
  notes: { target: [-3.35, 1.03, -1.6], eye: [9.5, 11.6, 11.8], scale: 1.95 },
};

function CameraRig({ zone, reducedMotion }: Pick<StudioSceneProps, 'zone' | 'reducedMotion'>) {
  const getState = useThree((state) => state.get);
  const size = useThree((state) => state.size);
  const gl = useThree((state) => state.gl);
  const invalidate = useThree((state) => state.invalidate);
  const lookAt = useRef(new Vector3());
  const target = useRef(new Vector3());
  const eye = useRef(new Vector3());
  const pointer = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);
  const pose = CAMERA_POSES[zone];
  const fitZoom = Math.min(size.width / 15.1, size.height / 11.5) * pose.scale;

  useLayoutEffect(() => {
    const camera = getState().camera as OrthographicCamera;
    camera.left = -size.width / 2;
    camera.right = size.width / 2;
    camera.top = size.height / 2;
    camera.bottom = -size.height / 2;
    camera.updateProjectionMatrix();
    invalidate();
  }, [getState, size.width, size.height, invalidate]);

  useEffect(() => { invalidate(); }, [zone, reducedMotion, fitZoom, invalidate]);

  useEffect(() => {
    const canvas = gl.domElement;
    const move = (event: PointerEvent) => {
      if (reducedMotion || event.pointerType !== 'mouse' || canvas.clientWidth < 600) return;
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      invalidate();
    };
    const leave = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
      canvas.style.cursor = '';
      invalidate();
    };
    canvas.addEventListener('pointermove', move, { passive: true });
    canvas.addEventListener('pointerleave', leave, { passive: true });
    return () => {
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerleave', leave);
    };
  }, [gl, reducedMotion, invalidate]);

  useFrame((state, delta) => {
    const camera = state.camera as OrthographicCamera;
    target.current.set(...pose.target);
    eye.current.set(...pose.eye).add(target.current);
    if (!reducedMotion && size.width >= 600) {
      eye.current.x += pointer.current.x * 0.42;
      eye.current.y -= pointer.current.y * 0.22;
    }
    const amount = reducedMotion || !initialized.current ? 1 : 1 - Math.exp(-Math.min(delta, 0.06) * 6);
    camera.position.lerp(eye.current, amount);
    lookAt.current.lerp(target.current, amount);
    camera.zoom += (fitZoom - camera.zoom) * amount;
    camera.lookAt(lookAt.current);
    camera.updateProjectionMatrix();
    initialized.current = true;
    const moving = camera.position.distanceToSquared(eye.current) > 0.000005
      || lookAt.current.distanceToSquared(target.current) > 0.000005
      || Math.abs(camera.zoom - fitZoom) > 0.002;
    if (moving) invalidate();
  });
  return null;
}

function SceneLifecycle({ onReady, onFailure }: Pick<StudioSceneProps, 'onReady' | 'onFailure'>) {
  const gl = useThree((state) => state.gl);
  const invalidate = useThree((state) => state.invalidate);
  const setFrameloop = useThree((state) => state.setFrameloop);
  const readySent = useRef(false);
  const readyFrame = useRef<number | null>(null);

  useFrame(() => {
    if (readySent.current) return;
    readySent.current = true;
    // R3F draws after useFrame; the following browser frame exposes a completed canvas.
    readyFrame.current = requestAnimationFrame(onReady);
  });

  useEffect(() => {
    let intersects = true;
    const canvas = gl.domElement;
    const sync = () => {
      const active = intersects && document.visibilityState !== 'hidden';
      setFrameloop(active ? 'demand' : 'never');
      if (active) invalidate();
    };
    const observer = new IntersectionObserver(([entry]) => {
      intersects = entry.isIntersecting;
      sync();
    }, { rootMargin: '80px' });
    observer.observe(canvas);
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    canvas.addEventListener('webglcontextlost', lost, false);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      observer.disconnect();
      canvas.removeEventListener('webglcontextlost', lost);
      document.removeEventListener('visibilitychange', sync);
      if (readyFrame.current !== null) cancelAnimationFrame(readyFrame.current);
    };
  }, [gl, invalidate, setFrameloop, onFailure]);
  return null;
}

class SceneErrorBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function StudioScene({ zone, onSelect, reducedMotion, onReady, onFailure }: StudioSceneProps) {
  return <SceneErrorBoundary onFailure={onFailure}>
    <Canvas
      orthographic
      camera={{ position: [12, 12, 14], zoom: 50, near: 0.1, far: 100 }}
      frameloop="demand"
      dpr={[1, 1.6]}
      shadows={{ type: PCFShadowMap }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      style={{ touchAction: 'pan-y', width: '100%', height: '100%' }}
      fallback={null}
      onCreated={({ gl }) => {
        gl.setClearColor('#e7e7da', 0);
        // Furniture is static: camera moves can reuse the first shadow map.
        gl.shadowMap.autoUpdate = false;
        gl.shadowMap.needsUpdate = true;
        gl.domElement.setAttribute('aria-hidden', 'true');
        gl.domElement.style.touchAction = 'pan-y';
      }}
    >
      <ambientLight intensity={0.85} color="#fff3db" />
      <hemisphereLight args={['#f7f4e9', '#a9b49a', 1.65]} />
      <directionalLight
        position={[-5, 11, 7]}
        intensity={3.1}
        color="#ffead0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={0.5}
        shadow-camera-far={35}
        shadow-normalBias={0.035}
        shadow-bias={-0.0001}
        shadow-radius={4}
      />
      <directionalLight position={[7, 6, -5]} intensity={1.3} color="#dfe9d9" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.44, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <shadowMaterial transparent opacity={0.14} />
      </mesh>
      <AssetProvider>
        <Architecture />
        <ZoneObject zone="work" selected={zone} onSelect={onSelect}><SharedTable /></ZoneObject>
        <ZoneObject zone="build" selected={zone} onSelect={onSelect}><ProductBench /></ZoneObject>
        <ZoneObject zone="notes" selected={zone} onSelect={onSelect}><WritingCorner /><Bookshelf /></ZoneObject>
      </AssetProvider>
      <CameraRig zone={zone} reducedMotion={reducedMotion} />
      <SceneLifecycle onReady={onReady} onFailure={onFailure} />
    </Canvas>
  </SceneErrorBoundary>;
}
