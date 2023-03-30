import * as BABYLON from "babylonjs";
import * as MATERIALS from "babylonjs-materials";
import * as GUI from "babylonjs-gui";
import SceneComponent from "../Babylon_components/SceneComponent";
import earcut from "earcut";


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

  // GUI
  GizmoInterface(scene);
  
  var cylinder = await ModelsModule.CreateCylinder();
  var cube = await ModelsModule.CreateCube();
  var sphere = await ModelsModule.CreateSphere();
  var pyramid = await ModelsModule.CreatePyramid();
  var board = await ModelsModule.CreateBoard();

  ModelsModule.CreateWalls();
  ModelsModule.CreateGround();
  

  scene.debugLayer.show();

  // GUI
  ModelsModule.CreateFloatingPanel(cylinder, scene, "Cylinder", true);
  ModelsModule.CreateFloatingPanel(cube, scene, "Cube", true);
  ModelsModule.CreateFloatingPanel(sphere, scene, "Sphere", true);
  ModelsModule.CreateFloatingPanel(pyramid, scene, "Pyramid", true);

  var deltaTimeInSeconds = 0;
  var angleTriangle = 5;
  var sign = 1;
  var triangle = ModelsModule.CreateTriangleInsideSemiCircle("Triangle", angleTriangle, scene)

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
