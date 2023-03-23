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

  // This creates and positions a free camera (non-mesh)
  var camera = new BABYLON.FreeCamera(
    "camera1",
    new BABYLON.Vector3(0, 2, 0),
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
  
  var cylinder = await ModelsModule.CreateCylinder("cylinder", 4, scene,1,1);
  var cube = await ModelsModule.CreateCube("cube", 4, scene,1,1);
  var sphere = await ModelsModule.CreateSphere("sphere", 4, scene,1,1);
  var pyramid = await ModelsModule.CreatePyramid("pyramid", 4, scene,1,1);
  var board = await ModelsModule.CreateBoard("board", 4, scene,1,1);
  ModelsModule.CreateWalls();
  ModelsModule.CreateGround();
  

  scene.debugLayer.show();

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


  var button1 = GUI.Button.CreateSimpleButton("but1", "Cilindro\n Su volumen se calcula con la formula: \n V = π*radio^2*altura");
  button1.color = "white";
  button1.fontSize = 20;
  button1.background = "green";
  button1.onPointerUpObservable.add(function () {
    alert("Lo hiciste!");
  });


  var button2 = GUI.Button.CreateSimpleButton("but2", "Cubo\n Todas sus caras son cuadradas y sus aristas son iguales. \n Su volumen se calcula con la formula: \n V = lado^3");
  button2.color = "white";
  button2.fontSize = 20;
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

  
 
	
  

  var deltaTimeInSeconds = 0;
  var angleTriangle = 5;
  var sign = 1;
  var triangle = ModelsModule.CreateTriangleInsideSemiCircle("Triangle", angleTriangle, scene)
  triangle.position = new BABYLON.Vector3(0, 0, -.5);
  triangle.material = new BABYLON.StandardMaterial("material", scene);
  triangle.material.diffuseColor = new BABYLON.Color3(0, 0, 1);

  camera.target = board.position;
  
  triangle.rotate(BABYLON.Axis.Y,90*Math.PI/180, BABYLON.Space.LOCAL);
  triangle.rotate(BABYLON.Axis.Z,90*Math.PI/180, BABYLON.Space.LOCAL);

 

  triangle.parent = board;
  scene.onBeforeRenderObservable.add(() =>{
    if (triangle !== undefined) {

      deltaTimeInSeconds += scene.getEngine().getDeltaTime()/1000;
      if(deltaTimeInSeconds >= .1){
        ModelsModule.UpdateTriangleAngle(triangle, angleTriangle)
        angleTriangle += 1*sign;  
        deltaTimeInSeconds = 0;
        if(angleTriangle >= 175 || angleTriangle <= 5)
          sign = sign*(-1);

      } 
  
       
    } 

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
