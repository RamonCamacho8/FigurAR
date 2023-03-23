import * as BABYLON from "babylonjs";
import * as MATERIALS from "babylonjs-materials";
import * as GUI from "babylonjs-gui";
import SceneComponent from "../Babylon_components/SceneComponent";

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

  // This creates and positions a free camera (non-mesh)
  var camera = new BABYLON.FreeCamera(
    "camera1",
    new BABYLON.Vector3(0, 5, -10),
    scene
  );
  //const camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 0, new BABYLON.Vector3(2, 3, 4), scene);

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());
  //camera.setPosition(new BABYLON.Vector3(10, 3, -10))

  // This attaches the camera to the canvass
  camera.attachControl(canvas, false);

  //scene.clearColor = new BABYLON.Color3(0, 0, 0);

  var light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.intensity = 0.7;

  // GUI

  GizmoInterface(scene);
  
  var cylinder = ModelsModule.CreateCylinder("cylinder", 4, scene,1,1);
  var cube = await ModelsModule.CreateCube("cube", 4, scene,1,1);
  var sphere = await ModelsModule.CreateSphere("sphere", 4, scene,1,1);
  var pyramid = await ModelsModule.CreatePyramid("pyramid", 4, scene,1,1);
  var board = await ModelsModule.CreateBoard("board", 4, scene,1,1);
  ModelsModule.CreateWalls();
  ModelsModule.CreateGround();

  

  // GUI
  var meshGUI = BABYLON.MeshBuilder.CreatePlane(
    "plane",
    {
      width: 1 * 1.8,
      height: 1,
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    },
    scene
  );

  meshGUI.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

  var meshGUI_2 = BABYLON.MeshBuilder.CreatePlane(
    "plane_2",
    {
      width: 1 * 1.8,
      height: 1,
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    },
    scene
  );

  meshGUI_2.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

  var advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(meshGUI);
  var advancedTexture_2 = GUI.AdvancedDynamicTexture.CreateForMesh(meshGUI_2);

  var container = new GUI.Rectangle("container");
  container.width = 1;
  container.height = 1;
  container.thickness = 0;
  container.background = "white";
  container.alpha = 0.05;
  container.zIndex = -1;

  var container_2 = new GUI.Rectangle("container2");
  container.width = 1;
  container.height = 1;
  container.thickness = 0;
  container.background = "white";
  container.alpha = 0.05;
  container.zIndex = -1;

  advancedTexture.addControl(container);
  advancedTexture.scaleTo(300, 150);
  advancedTexture_2.addControl(container_2);
  advancedTexture_2.scaleTo(300, 150);


  var button1 = GUI.Button.CreateSimpleButton("but1", "Cilindro\n Ramon");
  button1.color = "white";
  button1.fontSize = 28;
  button1.background = "green";
  button1.onPointerUpObservable.add(function () {
    alert("Lo hiciste!");
  });


  var button2 = GUI.Button.CreateSimpleButton("but2", "Cubo\n Ramon");
  button2.color = "white";
  button2.fontSize = 28;
  button2.background = "green";
  button2.onPointerUpObservable.add(function () {
    alert("Lo hiciste!");
  });

  advancedTexture.addControl(button1);
  advancedTexture_2.addControl(button2);

  meshGUI_2.parent = cube;
  meshGUI_2.position = new BABYLON.Vector3(0, -2, 0);
  let angle_2 = 90;
  meshGUI_2.rotation = new BABYLON.Vector3(angle_2*Math.PI / 2, 0, 0);

  meshGUI.parent = await cylinder;
  meshGUI.position = new BABYLON.Vector3(0, -2, 0);
  let angle = 90;
  meshGUI.rotation = new BABYLON.Vector3(angle*Math.PI / 2, 0, 0);

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
