import React, { Suspense, useRef } from "react";
import { BoxHelper } from "three";
import { Canvas, extend, useLoader, useFrame } from "@react-three/fiber";
import {
    OrbitControls,
    PerspectiveCamera,
    Environment,
    Effects,
    Loader,
    useTexture,
    useHelper,
} from "@react-three/drei";
import { LUTPass } from "three/examples/jsm/postprocessing/LUTPass";
import { LUTCubeLoader } from "three/examples/jsm/loaders/LUTCubeLoader";

import cube from "../../assets/three/cubicle-99.CUBE";
import textureImg from "../../assets/three/test.jpg";

import "./_globe.scss";

extend({ LUTPass });

function Grading() {
    const { texture3D } = useLoader(LUTCubeLoader, cube);
    return (
        <Effects>
            <lUTPass attachArray="passes" lut={texture3D} />
        </Effects>
    );
}

function Sphere(props) {
    const texture = useTexture(textureImg);
    const canvas = useRef();
    // eslint-disable-next-line no-return-assign
    useFrame(() => {
        canvas.current.rotation.y -= 0.004;
        // canvas.current.rotation.x -= 0.005;
    });
    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <mesh ref={canvas} {...props}>
            <sphereBufferGeometry args={[1, 2, 2]} rotateX attach="geometry" />
            <meshPhysicalMaterial
                envMapIntensity={0.4}
                map={texture}
                clearcoat={0.8}
                clearcoatRoughness={0}
                roughness={1}
                metalness={0}
                reflectivity={0}
            />
        </mesh>
    );
}

// const loadingManager =

export default function Globe() {
    return (
        <div className="header__globe">
            <Canvas
                invalidateFrameloop
                concurrent
                pixelRatio={[1, 1.5]}
                camera={{ position: [0, 0, 5], fov: 45 }}
            >
                <spotLight
                    intensity={0.4}
                    angle={0.2}
                    penumbra={0.5}
                    position={[5, 15, 10]}
                    color="#2c3a8a"
                />
                <pointLight
                    position={[-12, -5, -10]}
                    color="#1a5ef3"
                    intensity={0.1}
                />
                <Suspense fallback={null}>
                    <Sphere />
                    <Grading />
                    <Environment preset="night" />
                </Suspense>
                <OrbitControls enableZoom={false} />
            </Canvas>
            <Loader
                containerStyles={{
                    backgroundColor: "#020029",
                }}
            />
        </div>
    );
}
