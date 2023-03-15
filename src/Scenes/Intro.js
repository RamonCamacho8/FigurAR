
import React from "react";
import * as BABYLON from "babylonjs";
import * as MATERIALS from "babylonjs-materials"
import SceneComponent from "../Babylon_components/SceneComponent";
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.

import * as Cameras_Module from "../Modules/Cameras_Module"
import * as Lights_Module from "../Modules/Lights_Module"
import * as Materials_Module from "../Modules/Materials_Module";

import * as Babylon_Components from "../Babylon_components"

import * as XR_Module from "../Modules/XR_Module"
import * as Gizmo from "../Modules/GizmoInterface"

import ammo from "ammo.js"


const onSceneReady = async (e = { engine: new BABYLON.Engine, scene: new BABYLON.Scene, canvas: new HTMLCanvasElement }) => {

  const { canvas, scene, engine } = e;

  Cameras_Module.FreeCameraDefault(canvas, scene);

  Lights_Module.HemisphericLight(scene);

  // Sky material
  var skyboxMaterial = new MATERIALS.SkyMaterial("skyMaterial", scene);
  skyboxMaterial.backFaceCulling = false;

  // Sky mesh (box)
  var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
  skybox.material = skyboxMaterial;

  skybox.material.inclination = -0.35;

  var playground = Babylon_Components.PlayGround();

  scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.AmmoJSPlugin(true, await ammo()));


  var ground_impostor = new BABYLON.PhysicsImpostor(playground.ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
  playground.ground.physicsImpostor = ground_impostor;

  var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 3 }, scene);
  sphere.position.y = 4;
  var sphere_impostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
  sphere.physicsImpostor = sphere_impostor;

  var box_material = Materials_Module.MaterialRandom();
  var box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
  box.material = box_material;

  box.position = new BABYLON.Vector3(1, 1, 1);
  var box_impostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.9 }, scene);
  box.physicsImpostor = box_impostor;

  Babylon_Components.showWorldAxis(10, scene);
  var localAxe1 = Babylon_Components.showLocalAxes(3, scene);

  localAxe1.parent = box;

  scene.onBeforeRenderObservable.add(() => {
    if (box !== undefined) {
      const deltaTimeInMillis = scene.getEngine().getDeltaTime();

      const rpm = 30
      //box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
      box.rotate(BABYLON.Axis.Y, (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000), scene);
    }

  });


  const XR = XR_Module.XR_Experience(playground.ground, skybox, scene);
  Gizmo.GizmoInterface(scene);
  box.XRpickable = true;
  sphere.XRpickable = true;

  var meshes = [];
  meshes.push(box, sphere,skybox);

  /**
   * 
   * @param {BABYLON.Mesh} mesh mesh to add reflective texture.
   * @param {[BABYLON.Mesh]} otherMeshs array of meshes to reflect.
   * @param {BABYLON.Scene} scene a constructed babylon js scene.
   */
  function CreateReflectionTexture(mesh, otherMeshs, scene) {

    // Reflection probe
    var rp = new BABYLON.ReflectionProbe('ref', 512, scene);
    otherMeshs.forEach(element => {

      rp.renderList.push(element);
    });

    // PBR
    var pbr = new BABYLON.PBRMaterial('pbr', scene);
    pbr.reflectionTexture = rp.cubeTexture;
    mesh.material = pbr;

    rp.attachToMesh(mesh);

  }
  //CreateReflectionTexture(box, meshes, scene);
  //CreateReflectionTexture(sphere, meshes, scene);

};


function Scene() {
  return (
    <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas" />
  );
}

export default Scene;
