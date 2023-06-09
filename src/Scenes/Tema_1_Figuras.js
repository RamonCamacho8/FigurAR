
import React from "react";
import * as BABYLON from "babylonjs";
import * as MATERIALS from "babylonjs-materials"
import SceneComponent from "../Babylon_components/SceneComponent"; 
import "babylonjs-loaders";
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.


const onSceneReady = (e) => {

  const { canvas, scene, engine } = e;
  // This creates and positions a free camera (non-mesh)
  const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, false);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  //Display 3D axes
  const axes3D = new BABYLON.AxesViewer(scene,2)

  // Our built-in shapes examples.
  var box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
  var sphere = BABYLON.MeshBuilder.CreateSphere("sphere",{diameterX:2,diameterY:2,diameterZ:2},scene)
  var cone = BABYLON.MeshBuilder.CreateCylinder("cone",{height:2,diameterTop:0,diameterBottom:2,tessellation:4},scene)
  var plane = BABYLON.MeshBuilder.CreatePlane("plane", {width: 5, height: 2}, scene);

  var torus = BABYLON.MeshBuilder.CreateTorus("torus", {thickness: 0.2,diameter:2}, scene);

  // Our built-in 'ground' shape.
  var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 100, height: 100,subdivisions:100 }, scene);

  // Move the position of each shape
  box.position.x = 0;
  box.position.y = 1;
  box.position.z = 0;

  sphere.setAbsolutePosition(new BABYLON.Vector3(-3,1,0));
  var newSpherePosition = sphere.position.addInPlace(new BABYLON.Vector3(0,0,0));
  console.log(newSpherePosition)

  cone.setAbsolutePosition(new BABYLON.Vector3(3,1,0));

  plane.setAbsolutePosition(new BABYLON.Vector3(0,3,2));

  torus.setAbsolutePosition(new BABYLON.Vector3(-6,1,0))


  scene.onBeforeRenderObservable.add(() =>{
    if (box !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();
  
      const rpm = 30
      box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000); 
      //cone.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);  
      //sphere.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);   
    } 

  });

};


function Tema() {
  return (
      <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas" />
  );
}

export default Tema;
