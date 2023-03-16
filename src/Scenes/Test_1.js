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

  /*await BABYLON.SceneLoader.ImportMeshAsync("",Figures,"",scene).then((result => {
    for(var i = 1; i < result.meshes.length; i++){
      result.meshes[i].material = toonMaterial;
    }
    result.meshes[1].position = new BABYLON.Vector3(1,0,0);
    result.meshes[2].position = new BABYLON.Vector3(2,0,0);
  }));*/

  
  var pyramid = await ModelsModule.CreateCuadranguarPyramid();

  pyramid.material = material;

  var cube = await ModelsModule.CreateCube();

  cube.material = material;
  cube.position = new BABYLON.Vector3(1,0,0);

  var cylinder = await ModelsModule.CreateCylinder();

  cylinder.material = material;
  cylinder.position = new BABYLON.Vector3(2,0,0);
  cylinder.scaling = new BABYLON.Vector3(1,1,1);

  const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);

  box.position = new BABYLON.Vector3(-3, 0, 0);

  const assetManager = new BABYLON.AssetsManager(scene);
  assetManager.load();

 
};



function Scene() {
  return (
    <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas" />
  );
}

export default Scene;
