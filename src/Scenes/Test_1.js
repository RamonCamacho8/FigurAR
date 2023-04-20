import * as BABYLON from "babylonjs";
import SceneComponent from "../Babylon_components/SceneComponent";
import * as XR from "../Modules/XR_Module";

import * as Modules from "../Modules/Modules";

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
  Modules.SetupScene(scene);

  // Camera
  Modules.CreateController(scene);

  //SkyBox
  const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 100.0 }, scene);
  const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;

  
  // GUI
  GizmoInterface(scene);
  
  await Modules.CreateEnviroment();

  //Get mesh by name
  const circle =  scene.getMeshByName("Circle");
  const triangle =  scene.getMeshByName("Triangle");
  const square =  scene.getMeshByName("Square");

  const squareL = scene.getMeshByName("Square_L");
  const circleL = scene.getMeshByName("Circle_L");
  const triangleL = scene.getMeshByName("Triangle_L");

  const lock = scene.getMeshByName("Locker");

  //Set infoPanels

  Modules.CreateInfoPanel(square,scene,"--Cuadrado-- \n Un Cuadrado tiene 4 lados.",false);
  Modules.CreateInfoPanel(triangle,scene,"--Triangulo-- \n Un Triangulo tiene 3 lados.",false);
  Modules.CreateInfoPanel(circle,scene,"--Circulo-- \n Un Circulo sólo tiene un lado. ",false);

  Modules.CreateInfoPanel(lock,scene,"¿Qué forma tiene esta habitación?",false,true);



  //Set PressAnimations 


 

  Modules.MakePressProccess(squareL,scene);
  Modules.MakePressProccess(circleL,scene);
  Modules.MakePressProccess(triangleL,scene);



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
