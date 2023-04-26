import * as BABYLON from "babylonjs";
import SceneComponent from "../Babylon_components/SceneComponent";
import * as Modules from "../Modules/Modules";


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
  const camera = Modules.CreateController(scene);
  
  //Lights
  var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 0, 0), scene);
  //const shadowGenerator = new BABYLON.ShadowGenerator(2048, light);
  const gl = new BABYLON.GlowLayer("glow", scene);
  light.intensity = 4;
  //light.diffuse = new BABYLON.Color3(1, 1, 1);
 
  await Modules.CreateEnviroment();

  //Get mesh by name

  const squareL = scene.getMeshByName("Room_1_Square_L");
  const circleL = scene.getMeshByName("Room_1_Circle_L");
  const triangleL = scene.getMeshByName("Room_1_Triangle_L");
  const lock = scene.getMeshByName("Room_1_Locker");
  var door = scene.getMeshByName("Room_1_Door");
  const roof = scene.getMeshByName("Room_1_Roof");
  const lightBulb = scene.getMeshByName("Room_1_LightBulb_Part2");

  lightBulb.material.emissiveColor = new BABYLON.Color3(1, 1, 0);

  //Set infoPanels
  
  //Set PressAnimations 
  Modules.MakePressProccess(squareL,scene, door);
  Modules.MakePressProccess(circleL,scene);
  Modules.MakePressProccess(triangleL,scene);

  //
  light.position = lightBulb.position.clone();
  light.position.y -= .3;



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
