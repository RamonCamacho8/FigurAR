import React from "react";
import * as BABYLON from "babylonjs";
import * as MATERIALS from "babylonjs-materials";
import SceneComponent from "../Babylon_components/SceneComponent";
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.

import * as Cameras_Module from "../Modules/Cameras_Module";
import * as Lights_Module from "../Modules/Lights_Module";
import * as Materials_Module from "../Modules/Materials_Module";

import * as Babylon_Components from "../Babylon_components";

import * as XR_Module from "../Modules/XR_Module";
import * as Gizmo from "../Modules/GizmoInterface";
import "babylonjs-loaders";

import * as ModelsModule from "../Modules/ModelsModule";

const onSceneReady = async (
  e = {
    engine: new BABYLON.Engine(),
    scene: new BABYLON.Scene(),
    canvas: new HTMLCanvasElement(),
  }
) => {
  const { canvas, scene, engine } = e;

  Cameras_Module.FreeCameraDefault(canvas, scene);
  const camera = new BABYLON.FreeCamera(
    "camera1",
    new BABYLON.Vector3(0, 5, -10),
    scene
  );
  Lights_Module.HemisphericLight(scene);

  var material = new BABYLON.StandardMaterial("material",scene);
  material.diffuseColor = new BABYLON.Color3(1, 0, 0);

  var toonMaterial = new Materials_Module.ToonMaterial("toon", scene);

  //make a white ground 
  var groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
  var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
  groundMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
  ground.material = groundMaterial;
  ground.position = new BABYLON.Vector3(0, -1, 0);
  
  var cubeMaterial = new BABYLON.StandardMaterial("cubeMaterial", scene);
  cubeMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1);
  var cube = ModelsModule.CreateCube();
    
  var sphereMaterial = new BABYLON.StandardMaterial("sphereMaterial", scene);
  sphereMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0);
  var sphere = ModelsModule.CreateSphere();

  var cylinderMaterial = new BABYLON.StandardMaterial("cylinderMaterial", scene);
  cylinderMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0);
  var cylinder = ModelsModule.CreateCylinder();

  var pyramidMaterial = new BABYLON.StandardMaterial("pyramidMaterial", scene);
  pyramidMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
  var pyramid = ModelsModule.CreatePyramid();

  var wallsMaterial = new BABYLON.StandardMaterial("wallsMaterial", scene);
  wallsMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
  var walls = ModelsModule.CreateWalls();

  cube.material = cubeMaterial;
  sphere.material = sphereMaterial;
  cylinder.material = cylinderMaterial;
  pyramid.material = pyramidMaterial;
  walls.material = wallsMaterial;



  

  
  const assetManager = new BABYLON.AssetsManager(scene);
  assetManager.load();
  
  var angle = 5;
  var sign = -1;

  
  scene.onBeforeRenderObservable.add(() =>{
    


  });
 
};



function Scene() {
  return (
    <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas" />
  );
}

export default Scene;
