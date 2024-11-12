import * as THREE from 'three';
import { useEffect, useState } from 'react';
import SceneInit from './SceneInit';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import './App.css';
import Dropdown from './Dropdown';


function App() {
  let requestAnimationId;
  const [buttonSelected, setButtonSelected] = useState('A');
  const [layout, setLayout] = useState();
  const [model, setModel] = useState();

  useEffect(() => {
    loadModel('/assets/1.glb');
  }, []);

  function loadModel(glbFile) {
    const newLayout = new SceneInit('model');
    newLayout.initialize();
    newLayout.animate();

    const glftLoader = new GLTFLoader();
    glftLoader.load(glbFile, (gltfScene) => {
      setModel(gltfScene);
      gltfScene.scene.position.x = 0;
      gltfScene.scene.position.y = 5;
      gltfScene.scene.position.z = 75;
      gltfScene.scene.rotation.x = -1;
      gltfScene.scene.rotation.y = 0;
      gltfScene.scene.rotation.z = -50;
      gltfScene.scene.scale.set(10, 10, 10);
      newLayout.scene.add(gltfScene.scene);
      // const animate = () => {
      //   model.scene.rotation.z += 0.01;
      //   requestAnimationId = requestAnimationFrame(animate);
      // };
      // animate();
      setLayout({ ...newLayout });
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
      if(!!layout) {
        layout.scene.remove(model.scene);
      }
      cancelAnimationFrame(requestAnimationId);
    }
  }

  function replaceModel(glbFile, buttonValue) {
    removeModel();
    loadModel(glbFile);
    setButtonSelected(buttonValue);
  }

  function rotate() {
    console.log(model);
    if (!!model) {
      model.scene.rotation.z += 0.45;
    }
  }

  return (
    <>
      <div className="dropdownContainer">
        <Dropdown description={"1"} items={["1", "2", "3", "4"]} />
        &ndash; 
        <Dropdown description={"1"} items={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"]} />
      </div>
      <div className="container">
        <button onClick={() => replaceModel('/assets/1.glb', 'A')} className={buttonSelected === 'A' ? 'button active' : 'button'}>A</button>
        <button onClick={() => replaceModel('/assets/2.glb', 'B')} className={buttonSelected === 'B' ? 'button active' : 'button'}>B</button>
        <button onClick={() => replaceModel('/assets/1.glb', 'C')} className={buttonSelected === 'C' ? 'button active' : 'button'}>C</button>
        <button onClick={() => replaceModel('/assets/2.glb', 'D')} className={buttonSelected === 'D' ? 'button active' : 'button'}>D</button>
        <button onClick={() => replaceModel('/assets/1.glb', 'E')} className={buttonSelected === 'E' ? 'button active' : 'button'}>E</button>
        <button onClick={() => replaceModel('/assets/2.glb', 'F')} className={buttonSelected === 'F' ? 'button active' : 'button'}>F</button>
      </div>
      <div className='canvasContainer'>
        <canvas id="model" />
        <button className="rotateButton" onClick={rotate}>Rotate</button>
      </div>
    </>
  )
}

export default App
