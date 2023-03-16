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
import Pyramid from "../Models/Pyramid.glb";

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

  const pyramid = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    Pyramid,
    "",
    scene,
    function (meshes) {
        
    }
  );
  
  let pyramidMesh = pyramid.meshes[0];
  const material = new BABYLON.StandardMaterial("material", scene);
  material.diffuseColor = new BABYLON.Color3(0, 0, 1);

  pyramidMesh.material = material;



  const assetManager = new BABYLON.AssetsManager(scene);
  assetManager.load();

 
};



function Scene() {
  return (
    <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas" />
  );
}

export default Scene;
