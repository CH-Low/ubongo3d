import * as THREE from 'three';
import { useEffect, useState } from 'react';
import SceneInit from './SceneInit';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import './App.css';
import Dropdown from './Dropdown';
import { data } from './data';

function App() {
  // const [requestAnimationId, setRequestAnimationId] = useState();
  const [buttonSelected, setButtonSelected] = useState('A');
  const [layout, setLayout] = useState();
  const [model, setModel] = useState();
  const [level, setLevel] = useState([1, 1]);

  useEffect(() => {
    loadModel(`/assets/level ${level[0]}/${level.join('-')}${buttonSelected}.glb`);

    // Cleanup function on component unmount
    return () => {
      removeModel();
    };
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
      //   gltfScene.scene.rotation.z += 0.01;
      //   const newRequestAnimationId = requestAnimationFrame(animate);
      //   setRequestAnimationId(newRequestAnimationId);
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
      if (!!layout) {
        layout.scene.remove(model.scene);
      }
      // cancelAnimationFrame(requestAnimationId);
    }
  }

  function replaceModel(levelValue, buttonValue) {
    removeModel();
    loadModel(`/assets/level ${levelValue[0]}/${levelValue.join('-')}${buttonValue}.glb`);
    setButtonSelected(buttonValue);
  }

  function rotateLeft() {
    if (!!model) {
      model.scene.rotation.z -= 0.45;
    }
  }

  function rotateRight() {
    if (!!model) {
      model.scene.rotation.z += 0.45;
    }
  }

  function changeDifficulty(value) {
    const newLevel = [...level];
    newLevel[0] = value;
    setLevel(newLevel);
    replaceModel(newLevel, 'A');
  }

  function changeStage(value) {
    const newLevel = [...level];
    newLevel[1] = value;
    setLevel(newLevel);
    replaceModel(newLevel, 'A');
  }

  const buttons = data[level.join('-')];

  return (
    <>
      <div className="dropdown-container">
        <Dropdown description={level[0]} items={[1, 2, 3, 4]} onChange={changeDifficulty} />
        &ndash;
        <Dropdown description={level[1]} items={[
          1, 2, 3, 4, 5, 6, 7, 8, 9,
          10, 11, 12, 13, 14, 15, 16, 17, 18,
          19, 20, 21, 22, 23, 24, 25, 26, 27,
          28, 29, 30, 31, 32, 33, 34, 35, 36,
        ]} onChange={changeStage} />
      </div>
      <div className="button-container">
        {
          buttons.map((button, index) =>
          (
            <button
              key={index}
              onClick={() => replaceModel(level, button)}
              className={buttonSelected === button ? 'button active' : 'button'}>
              {button}</button>
          ))
        }
      </div>
      <canvas id="model" />

      <div className='canvas-container'>
        <div className="buttons">
          <button className="rotate-button" onClick={rotateLeft}>
            <img className="button-image" src={'/assets/rotate-left.png'} alt={'rotate-left'} />
          </button>
          <button className="rotate-button" onClick={rotateRight}>
            <img className="button-image" src={'/assets/rotate-right.png'} alt={'rotate-right'} />
          </button>
        </div>
      </div>
    </>
  )
}

export default App
