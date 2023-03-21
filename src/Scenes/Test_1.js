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

  

  
  const assetManager = new BABYLON.AssetsManager(scene);
  assetManager.load();
  
  var angle = 5;
  var sign = -1;

  var prism = ModelsModule.CreateTriangleInsideSemiCircle("triangle", 170, scene);
  prism.material = material;
  
  scene.onBeforeRenderObservable.add(() =>{
    
  

    
    /*if (angle==170) {
      sign = -1*sign;
    }
    if (angle==5) {
      sign = -1*sign;
    }

    prism = ModelsModule.CreateTriangleInsideSemiCircle("triangle", angle, scene);
    prism.material = material;
    angle += 1*sign;

    console.log(angle);*/



  });
 
};



function Scene() {
  return (
    <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas" />
  );
}

export default Scene;
