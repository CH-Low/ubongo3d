import * as THREE from 'three';
import { useEffect } from 'react';
import SceneInit from './SceneInit';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import './App.css';

function App() {
  const layout = new SceneInit('model');
  let model, requestAnimationId;
  useEffect(() => {
    layout.initialize();
    layout.animate();
  }, []);

  function loadModel(glbFile) {
    const glftLoader = new GLTFLoader();
    glftLoader.load(glbFile, (gltfScene) => {
      model = gltfScene;
      gltfScene.scene.position.x = 0;
      gltfScene.scene.position.y = 5;
      gltfScene.scene.position.z = 75;
      gltfScene.scene.rotation.x = -1;
      gltfScene.scene.rotation.y = 0;
      gltfScene.scene.rotation.z = -50;
      gltfScene.scene.scale.set(10, 10, 10);
      layout.scene.add(gltfScene.scene);
      // const animate = () => {
      //   model.scene.rotation.z += 0.01;
      //   requestAnimationId = requestAnimationFrame(animate);
      // };
      // animate();
    });
  }

  function removeModel() {
    if (!!model) {
      model.scene.traverse(function (obj) {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          obj.material.dispose();
          model.scene.remove(obj);
        }
      });
      layout.scene.remove(model.scene);
      cancelAnimationFrame(requestAnimationId);
    }
  }

  function replaceModel(glbFile) {
    removeModel();
    loadModel(glbFile);
  }

  function rotate() {
    if (!!model) {
      model.scene.rotation.z += 0.45;
    }
  }
  return (
    <>
      <div className="buttonContainer">
        <button onClick={() => replaceModel('/assets/1.glb')}>1</button>
        <button onClick={() => replaceModel('/assets/2.glb')}>2</button>
      </div>
      <div>
        <canvas id="model" />
      </div>
      <button className="rotateButton" onClick={rotate}>Rotate</button>
    </>
  )
}

export default App
