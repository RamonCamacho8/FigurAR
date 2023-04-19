import * as BABYLON from "babylonjs";
import SceneComponent from "../Babylon_components/SceneComponent";
import * as XR from "../Modules/XR_Module";

import * as ModelsModule from "../Modules/ModelsModule";

import { GizmoInterface } from "../Modules/GizmoInterface";
import "babylonjs-loaders";

const onSceneReady = async (
  e = {
    engine: new BABYLON.Engine(),
    scene: new BABYLON.Scene(),
    canvas: new HTMLCanvasElement(),
  }
) => {
  const { canvas, scene, engine } = e;

  scene.onPointerDown = (evt) => {
    if (evt.button === 0) engine.enterPointerlock();
    if (evt.button === 1) engine.exitPointerlock();
  };


  // Setup scene
  ModelsModule.SetupScene(scene);

  // Camera
  ModelsModule.CreateController(scene);

  //SkyBox
  const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 100.0 }, scene);
  const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;

  
  // GUI
  GizmoInterface(scene);
  
  await ModelsModule.CreateEnviroment();

  //Get mesh by name
  const mesh =  scene.getMeshByName("Floor");

  mesh.position.x = 2;

  // Debug layer
  scene.debugLayer.show();


  scene.onBeforeRenderObservable.add(() =>{
  });

  engine.runRenderLoop(() => {
    if (scene) {
      scene.render();
    }
  });

};





function Scene() {
  return (
    <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas" />
  );
}

export default Scene;
