import React, { Suspense } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import {
 ZapparCamera, ImageTracker, ZapparCanvas, Loader, BrowserCompatibility,
} from '@zappar/zappar-react-three-fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import glb from './assets/waving.glb';
import targetImage from './assets/example-tracking-image.zpt';

let action: THREE.AnimationAction;

const Model = () => {
  const clock = new THREE.Clock();
  const gltf = useLoader(GLTFLoader, glb) as any ;
  const mixer = new THREE.AnimationMixer(gltf.scene);

  action = mixer.clipAction(gltf.animations[0]);
  gltf.scene.rotateX(Math.PI / 2);

  useFrame(() => mixer.update(clock.getDelta()));

  return <primitive object={gltf.scene} />;
};

function App() {
  return (
    <>
      <BrowserCompatibility />
      <ZapparCanvas>
        <ZapparCamera />
        <Suspense fallback={null}>
          <ImageTracker targetImage={targetImage}>
            <React.Suspense fallback={null}>
              <Model />
            </React.Suspense>
          </ImageTracker>
        </Suspense>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
        <Loader />
      </ZapparCanvas>
      <div
        id="zappar-button"
        role="button"
        onKeyPress={() => action.play() }
        tabIndex={0}
        onClick={() => action.play() }
      >Play Animation</div>
    </>
  );
}

export default App;



