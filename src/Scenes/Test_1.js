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
  
  var cylinder = await ModelsModule.CreateCylinder();
  var cube = await ModelsModule.CreateCube();
  var sphere = await ModelsModule.CreateSphere();
  var pyramid = await ModelsModule.CreatePyramid();
  var board = await ModelsModule.CreateBoard();

  ModelsModule.CreateWalls();
  var ground = ModelsModule.CreateGround();

  //XR
  await XR.XR_Experience(ground, skybox, scene);
  
  // Debug layer
  scene.debugLayer.show();

  // GUI
  ModelsModule.CreateFloatingPanel(cylinder, scene, "Cylinder", true);
  ModelsModule.CreateFloatingPanel(cube, scene, "Cube", true);
  ModelsModule.CreateFloatingPanel(sphere, scene, "Sphere", true);
  ModelsModule.CreateFloatingPanel(pyramid, scene, "Pyramid", true);


  var triangle = ModelsModule.CreateTriangleInsideSemiCircle("Triangle", 90, scene)

  ModelsModule.CreateFloatingSlider(triangle, scene, "Pyramid", true);

  triangle.position = new BABYLON.Vector3(0, 0, -.5);
  triangle.material = new BABYLON.StandardMaterial("material", scene);
  triangle.material.diffuseColor = new BABYLON.Color3(0, 0, 1);

  //camera.target = board.position;
  
  triangle.rotate(BABYLON.Axis.Y,90*Math.PI/180, BABYLON.Space.LOCAL);
  triangle.rotate(BABYLON.Axis.Z,90*Math.PI/180, BABYLON.Space.LOCAL);
  triangle.parent = board;

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
