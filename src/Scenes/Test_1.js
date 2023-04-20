import * as BABYLON from "babylonjs";
import SceneComponent from "../Babylon_components/SceneComponent";
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
  
  //Lights
  const light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(1, 10, 1), scene);
  light.intensity = 2;
  light.diffuse = new BABYLON.Color3(1, 1, 1);
  //GizmoInterface(scene);
  
  await Modules.CreateEnviroment();

  //Get mesh by name
  const circle =  scene.getMeshByName("Room_1_Circle");
  const triangle =  scene.getMeshByName("Room_1_Triangle");
  const square =  scene.getMeshByName("Room_1_Square");

  const squareL = scene.getMeshByName("Room_1_Square_L");
  const circleL = scene.getMeshByName("Room_1_Circle_L");
  const triangleL = scene.getMeshByName("Room_1_Triangle_L");

  const lock = scene.getMeshByName("Room_1_Locker");

  const door = scene.getMeshByName("Room_1_Door");

  const roof = scene.getMeshByName("Room_1_Roof");
  const lightBulb = scene.getMeshByName("Room_1_LightBulb");

  

  light.position = lightBulb.position-.5;
  lightBulb.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
  
  //roof.dispose();

  //Set infoPanels
  Modules.CreateInfoPanel(square,scene,"--Cuadrado-- \n Un Cuadrado tiene 4 lados.",false);
  Modules.CreateInfoPanel(triangle,scene,"--Triangulo-- \n Un Triangulo tiene 3 lados.",false);
  Modules.CreateInfoPanel(circle,scene,"--Circulo-- \n Un Circulo sólo tiene un lado. ",false);
  Modules.CreateInfoPanel(lock,scene,"¿Qué forma tiene esta habitación?",false,true);



  //Set PressAnimations 
  Modules.MakePressProccess(squareL,scene, door);
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
