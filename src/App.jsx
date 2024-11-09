import { useEffect, useState } from 'react';
import * as THREE from 'three';
import SceneInit from './SceneInit';

import './App.css';

function App() {
  const layout = new SceneInit('model');

  useEffect(() => {
    layout.initialize();
    layout.animate();
  }, [])

  function add() {
    let boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    let boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.rotation.x = 0.45;
    boxMesh.rotation.y = -0.25;
    boxMesh.name = 'box';
    layout.scene.add(boxMesh);
  }

  function remove() {
    let selectedObject = layout.scene.getObjectByName('box');
    layout.scene.remove(selectedObject);
    if(!!selectedObject){
      selectedObject.geometry.dispose();
      selectedObject.material.dispose();  
    }
  }

  function replace(){
    remove()
    let boxGeometry = new THREE.BoxGeometry(4,4,4);
    const boxMaterial = new THREE.MeshNormalMaterial();
    let boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.rotation.x = 0.45;
    boxMesh.rotation.y = -0.25;
    boxMesh.name = 'box';
    layout.scene.add(boxMesh);
  }

  return (
    <>
      <canvas id="model" />
      <button onClick={add}>Add</button>
      <button onClick={remove}>Remove</button>
      <button onClick={replace}>Replace</button>
    </>
  )
}

export default App
