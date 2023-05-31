import { HemisphericLight, Scene, SceneLoader } from "babylonjs";
import * as XR from "../Modules/XR_Module";
import Player from "../Models/Player.glb";
import Room_1 from "../Models/Room_1.glb";
import Room_2 from "../Models/Room_2.glb";
import Room_3 from "../Models/Room_3.glb";
import Room_4 from "../Models/Room_4.glb";
import * as BABYLON from "babylonjs";
import earcut from "earcut";
import * as GUI from "babylonjs-gui";
import ammo from "ammo.js";
import buttonSound from "../Models/buttonSound128kbs.mp3";

export async function CreateEnviroment(scene){

    await createRoom_1(scene);
    await createRoom_2(scene);
    await createRoom_3(scene);
    await createRoom_4(scene);
    
}

/**
 * 
 * @param {Scene} scene Scene
 */
export async function SetupScene(scene, canvas){
    
    CreatePlayerController(scene, canvas)
    XR.XR_Experience(scene);

    let ambientLight = new HemisphericLight("ambientLight", new BABYLON.Vector3(0, 2, 0), scene);
    ambientLight.intensity = 0.5;
    
    const frameRate = 60;
    const gravity = -9.81;
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.AmmoJSPlugin(true,await ammo()));
    scene.gravity = new BABYLON.Vector3(0, -0.98, 0)
    scene.collitionsEnabled = true;


}

async function CreatePlayerController(scene ,canvas){

    const firstPersonCamera = new BABYLON.FreeCamera("firstPersonCamera", new BABYLON.Vector3(0, 1, 0), scene);
    firstPersonCamera.attachControl(canvas, true);
    firstPersonCamera.checkCollisions = true;
    firstPersonCamera.applyGravity = true;
    firstPersonCamera.ellipsoid = new BABYLON.Vector3(.25, .5, .25);
    firstPersonCamera.speed = 0.1;
    firstPersonCamera.minZ = 0.45;
    firstPersonCamera.angularSensibility = 4000;
    firstPersonCamera.fov = 1.2;

    await SceneLoader.ImportMeshAsync("",Player,"",scene);
    let player = scene.getMeshByName("Player");
    
    const isometricViewCamera = new BABYLON.UniversalCamera("isometricViewCamera", new BABYLON.Vector3(2.5, 10, -2.5), scene);
    isometricViewCamera.setTarget(new BABYLON.Vector3(2.5, 0, -2.5));
   
    //ViewPort
    firstPersonCamera.viewport = new BABYLON.Viewport(0, .25, 1, 1);
    isometricViewCamera.viewport = new BABYLON.Viewport(0.75, 0, .25, .25);

    isometricViewCamera.inputs.clear();

    scene.activeCameras.push(isometricViewCamera);
    scene.activeCameras.push(firstPersonCamera);

    player.position = firstPersonCamera.position;
    player.parent = firstPersonCamera;
    player.checkCollisions = true;

    return firstPersonCamera;
}

 async function createRoom_1(scene){
    const {meshes, animationGroups} = await SceneLoader.ImportMeshAsync("",Room_1,"",scene);

    animationGroups.map((animationGroup) => {
        animationGroup.stop();
    })

    console.log(animationGroups);
    
    meshes.map((mesh) => {
        mesh.checkCollisions = true;
    })

    const squareL = scene.getMeshByName("Room_1_Square_L");
    const circleL = scene.getMeshByName("Room_1_Circle_L");
    const triangleL = scene.getMeshByName("Room_1_Triangle_L");
    const lock = scene.getMeshByName("Room_1_Locker");
    let door = scene.getMeshByName("Room_1_Door");
    const roof = scene.getMeshByName("Room_1_Roof");
    let colliderMesh = scene.getMeshByName("Room_1_Collider");

    
    colliderMesh.checkCollisions = false;
    colliderMesh.isPickable = false;
    colliderMesh.isVisible = false;


    roomEnterTrigger(colliderMesh, scene.getMeshByName("Player"), scene);
    

  
    roof.isVisible = false;

     //Set PressAnimations 
    OpenDoorProcess(squareL,scene, door,animationGroups[0]);
    OpenDoorProcess(circleL,scene);
    OpenDoorProcess(triangleL,scene);

    return meshes;
}

async function createRoom_2(scene){

    const {meshes} = await SceneLoader.ImportMeshAsync("",Room_2,"",scene);

    meshes.map((mesh) => {
        mesh.checkCollisions = true;
    })
    
    let roof = scene.getMeshByName("Room_2_Roof");
    roof.isVisible = false;

    let colliderMesh = scene.getMeshByName("Room_2_Collider");

    colliderMesh.checkCollisions = false;
    colliderMesh.isPickable = false;
    colliderMesh.isVisible = false;

    roomEnterTrigger(colliderMesh, scene.getMeshByName("Player"), scene);
    return meshes;

}

async function createRoom_3(scene){
    const {meshes} = await SceneLoader.ImportMeshAsync("",Room_3,"",scene);

    meshes.map((mesh) => {
        mesh.checkCollisions = true;
    })

    let roof = scene.getMeshByName("Room_3_Roof");
    roof.isVisible = false;

    let colliderMesh = scene.getMeshByName("Room_3_Collider");


    colliderMesh.checkCollisions = false;
    colliderMesh.isPickable = false;
    colliderMesh.isVisible = false;

    roomEnterTrigger(colliderMesh, scene.getMeshByName("Player"), scene);
    return meshes;

}

async function createRoom_4(scene){
    const {meshes} = await SceneLoader.ImportMeshAsync("",Room_4,"",scene);

    let roof = scene.getMeshByName("Room_4_Roof");
    roof.isVisible = false;

    meshes.map((mesh) => {
        mesh.checkCollisions = true;
    })
    
    let door = scene.getMeshByName("Room_4_Door");
    let colliderMesh = scene.getMeshByName("Room_4_Collider");

    colliderMesh.checkCollisions = false;
    colliderMesh.isPickable = false;
    colliderMesh.isVisible = false;

    roomEnterTrigger(colliderMesh, scene.getMeshByName("Player"), scene);

    door.dispose();

    return meshes;

}

/**
 * 
 * 
 * @param {Mesh} colliderMesh
 */

function roomEnterTrigger(colliderMesh, collitionerObject, scene){

    colliderMesh.visibility = .5;
    let material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = BABYLON.Color3.Red();
    colliderMesh.material = material;
    

    let showedHUD = false;

    scene.registerBeforeRender(function () {
        if (colliderMesh.intersectsMesh(collitionerObject, true)) {
            if(colliderMesh == scene.getMeshByName("Room_4_Collider")){
                console.log("Room 4");
                if(!showedHUD){
                    showedHUD = true;
                    showHUD(scene);
                }
            }
            colliderMesh.material.diffuseColor = BABYLON.Color3.Green();
        } else {
            colliderMesh.material.diffuseColor = BABYLON.Color3.Red();
        }
    });
    
}

async function showHUD(scene){
    //Create advance texture
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
    advancedTexture.idealWidth = 1600;
    advancedTexture.renderAtIdealSize = true;
   
    await advancedTexture.parseFromSnippetAsync("ET5SI0#1");
    return scene;
   
}



export function OpenDoorProcess(mesh, scene, doorMesh, animation){
    mesh.actionManager = new BABYLON.ActionManager(scene);
    mesh.edgesWidth = 1.0;
    mesh.edgesColor = new BABYLON.Color4(0, 0, 0, 1);   
    
    let frameRate = setPressAnimation(mesh)


    mesh.actionManager.registerAction(new BABYLON.PlaySoundAction(
        BABYLON.ActionManager.OnPickDownTrigger,new BABYLON.Sound("down", buttonSound, scene)));

    mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnLeftPickTrigger,
        function (evt) {
            scene.beginAnimation(mesh, 0,frameRate);
            console.log(mesh.name)
            if(doorMesh){
                animation.play();
                console.log("play")
            }
        }
    ));

    mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPointerOverTrigger,
        function (evt) {

            mesh.enableEdgesRendering();
        }
    ));

    mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnPointerOutTrigger,
        function (evt) {
       
            mesh.disableEdgesRendering();


        }
    ));
}

function setPressAnimation(mesh,id){
    const frameRate = 2;
    
    const keyFrames = [];

    let initialPos = mesh.position.x 


    keyFrames.push({
        frame: 0,
        value: initialPos // Starting rotation
    });
    keyFrames.push({
        frame: frameRate/2, // Duration of animation (in frames)
        value: initialPos-.005 // Ending rotation
    });

    keyFrames.push({
        frame: frameRate, // Duration of animation (in frames)
        value: initialPos // Ending rotation
    });


    const pressAnimation = new BABYLON.Animation(
        "pressAnimation"+id,
        "position.x",
        16, // Frames per second
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT  
    );

    pressAnimation.setKeys(keyFrames);


    mesh.animations.push(pressAnimation);

    return frameRate;
} 




/**
 *
 * 
 * @param {Scene} scene string name of the instanced material 
 */


/**
 *
 * @param {Mesh} mesh The mesh 
 * @param {Scene} scene Reference to the active scene
 * @param {string} panelText String of the text to be displayed
 * @param {boolean} billboardAll If the mesh is to be billboarded
 */
export function CreateInfoPanel(mesh,scene, panelText, billboardAll, rotation){
    // GUI
  let meshGUI = BABYLON.MeshBuilder.CreatePlane(
    "plane",
    {
      width: 1,
      height: .5,
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    },
    scene
  );

  //
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(meshGUI);

  let button = GUI.Button.CreateSimpleButton("button1", panelText);
  button.color = "blue";
  button.fontSize = 26;
  button.background = "white";
  button.thickness = 0;

  button.onPointerClickObservable.add(function () {
    console.log("click");
    });

  advancedTexture.addControl(button);
  advancedTexture.scaleTo(300, 150);


  meshGUI.parent =  mesh;
  meshGUI.position = new BABYLON.Vector3(0, 1, 0);

    if(billboardAll){
        
        let angle = 90;
        meshGUI.rotation = new BABYLON.Vector3(angle*Math.PI / 2, 0, 0);
        meshGUI.position = new BABYLON.Vector3(0, -1, 0);
        meshGUI.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    }

    if(rotation){
        meshGUI.rotate(BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        
    }

    
}

export function CreateFloatingSlider(mesh, scene, panelText, imported) {
  // GUI
  let meshGUI = BABYLON.MeshBuilder.CreatePlane(
    "plane",
    {
      width: 1 * 1.8,
      height: 1,
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    },
    scene
  );
  meshGUI.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(meshGUI);

  let grid = new GUI.Grid();
  grid.addColumnDefinition(0.5);
  grid.addColumnDefinition(0.5);
  grid.addRowDefinition(0.5);

  grid.widthInPixels = 500;
  grid.heightInPixels = 500;
  //grid.background = "black"; 

  let panel = new GUI.StackPanel();
  panel.width = "220px";
  panel.isVertical = true;
  /*panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;*/

  let header = new GUI.TextBlock();
  header.text = "Angulo: 90°";
  header.height = "30px";
  header.color = "white";

  let slider = new GUI.Slider();
  slider.minimum = 5;
  slider.maximum = 175;
  slider.value = 90;
  slider.step = 1;
  slider.height = "40px";
  slider.width = "200px";

  let information = new GUI.TextBlock();
  information.text = "Lados: \n A: --- \n B: --- \n C: ---";
  information.height = "150px";
  information.color = "white";

  slider.onPointerEnterObservable.add(function () {
    slider.isHighlighted = true;
  });
  slider.onPointerOutObservable.add(function () {
    slider.isHighlighted = false;
  });
  slider.onValueChangedObservable.add(function (value) {
    
    value = parseInt(value);

    let radius = 1;
    let a = radius*2;
    let x1 = radius;
    let y1 = 0;
    let x2 = -radius;
    let y2 = 0;
    let x3 = 1*Math.cos(value* Math.PI /180);
    let y3 = 1*Math.sin(value* Math.PI /180);

    
    let b = Math.sqrt(Math.pow(x3-x1,2)+Math.pow(y3-y1,2));
    let c = Math.sqrt(Math.pow(x3-x2,2)+Math.pow(y3-y2,2));

    
    header.text = "Angulo: " + value + "°";
    information.text = "Lados: \n A: "+a.toPrecision(4)+" \n B: "+b.toPrecision(4)+" \n C: "+c.toPrecision(4)+"";

    if (mesh) {
      //cast to int
      UpdateTriangleAngle(mesh, value);
    }
  });

  
  advancedTexture.addControl(grid);
  panel.addControl(header);
  panel.addControl(slider);
  grid.addControl(panel,0,0);
  grid.addControl(information,0,1);

  advancedTexture.scaleTo(500, 150);

  meshGUI.parent = mesh;
  meshGUI.position = new BABYLON.Vector3(0, -1, 0);

  if (imported) {
    let angle = 90;
    meshGUI.rotation = new BABYLON.Vector3((angle * Math.PI) / 2, 0, 0);
  }
}

/** 
* @param {string} name string name of the instanced material
* @param {double} radius the radius of the prism
* @param {double} height the height of the prism
* @param {double} side the height of the prism
* @param {int} numOfFaces the height of the prism
*/
export function CreatePrism(name,numOfFaces,scene,side,height){
    
    if(numOfFaces < 3)
        numOfFaces = 3;

    
    
    var h = 1;
    if(height)
        h = height;

    var angle = 2*Math.PI/numOfFaces;
    
    var r = 1;
    if(side)
        r = side/(2*Math.sin(angle));

    var vertex = []
    vertex[numOfFaces] = [[r], [h/2], [r]]
    for(let i = numOfFaces; i > 0; i--){
        vertex[numOfFaces-i] = [[r*Math.cos(angle*i)], [h/2], [r*Math.sin(angle*i)]]
        vertex[numOfFaces*2-i] = [[r*Math.cos(angle*i)], [-h/2], [r*Math.sin(angle*i)]]
    }
    //Makes the faces from the vertex's
    var faces = []
    for(let i = 1; i <= numOfFaces; i++){
        //Clockwise
        //faces[i-1] = [i%numOfFaces, (i%numOfFaces)+numOfFaces, i+numOfFaces-1, i-1]
        //Counter-Clockwise
        faces[i-1] = [ i-1, i+numOfFaces-1,(i%numOfFaces)+numOfFaces,i%numOfFaces]
    }
    
    for(let i = 0; i < 2; i++){
        let temp = []
        for(let j = 0; j < numOfFaces; j++){
            if(i === 0)
                temp[j] = j+(i)*numOfFaces
            else
                temp[j] = numOfFaces*2-j-1
        }
        faces[numOfFaces+i] = temp
    }

    const heptagonalPrism = { 
        "name":"Heptagonal Prism", 
        "category":["Prism"], 
        "vertex":vertex,
        "face":faces
    };

    var prism = BABYLON.MeshBuilder.CreatePolyhedron(name, {custom:heptagonalPrism}, scene);
    console.table(vertex);
    console.table(faces);

    return prism;
}

export function CreateRegularPolygon(name,numOfFaces,scene,side){
    if(numOfFaces < 3)
        numOfFaces = 3;

    var h = .005;
    var angle = 2*Math.PI/numOfFaces;

    var r = 1;
    if(side)
        r = side/(2*Math.sin(angle));

    var vertex = []
    vertex[numOfFaces] = [[r], [h/2], [r]]
    for(let i = numOfFaces; i > 0; i--){
        vertex[numOfFaces-i] = [[r*Math.cos(angle*i)], [h/2], [r*Math.sin(angle*i)]]
        vertex[numOfFaces*2-i] = [[r*Math.cos(angle*i)], [-h/2], [r*Math.sin(angle*i)]]
    }
    //Makes the faces from the vertex's
    var faces = []
    for(let i = 1; i <= numOfFaces; i++){
        //Clockwise
        //faces[i-1] = [i%numOfFaces, (i%numOfFaces)+numOfFaces, i+numOfFaces-1, i-1]
        //Counter-Clockwise
        faces[i-1] = [ i-1, i+numOfFaces-1,(i%numOfFaces)+numOfFaces,i%numOfFaces]
    }
    
    for(let i = 0; i < 2; i++){
        var temp = []
        for(var j = 0; j < numOfFaces; j++){
            if(i === 0)
                temp[j] = j+(i)*numOfFaces
            else
                temp[j] = numOfFaces*2-j-1
        }
        faces[numOfFaces+i] = temp
    }

    const heptagonalPrism = { 
        "name":"Heptagonal Prism", 
        "category":["Prism"], 
        "vertex":vertex,
        "face":faces
    };

    var prism = BABYLON.MeshBuilder.CreatePolyhedron(name, {custom:heptagonalPrism}, scene);
    console.table(vertex);
    console.table(faces);

    console.table(vertex);
    console.table(faces);

    return prism;
}

/** 
* @param {string} name string name of the instanced material
* @param {int} ang the angle of the triangle
* @param {double} height the height of the prism
*/
export function CreateTriangleInsideSemiCircle(name, ang, scene){
   
    var angle = Math.PI /2;
    var radius = 1;
;
    //ang to rad
    if(ang)
        angle = ang * Math.PI / 180;

    var vertex = [
        new BABYLON.Vector3(0, 0, -radius),
        new BABYLON.Vector3(radius*Math.sin(angle), 0, radius*Math.cos(angle)),
        new BABYLON.Vector3(0, 0, radius)
    ]

    console.table(vertex);

    let options = {

        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        shape:vertex, 
        updatable: true

    };

    let polygon = BABYLON.MeshBuilder.CreatePolygon(name, options, scene,earcut);
    
    return polygon;
}

export function UpdateTriangleAngle(mesh, ang){
   
    var angle = ang * Math.PI /180;
    var data = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);

    //pick first half of vertices data
    var data1 = data.slice(0, data.length/2);

    let vertex = []

    for (let i = 0; i < data1.length; i+=3) {
        vertex.push(new BABYLON.Vector3(data1[i], data1[i+1], data1[i+2]))
    }

    vertex[1] =  new BABYLON.Vector3(1*Math.sin(angle), 0, 1*Math.cos(angle))

    //unwrawp vertices data from Vector3 to array
    let vertexData = []
    for (let i = 0; i < vertex.length; i++) {
        vertexData[i*3] = vertex[i].x
        vertexData[i*3+1] = vertex[i].y
        vertexData[i*3+2] = vertex[i].z
    }

    //concatenate vertex data
    vertexData = vertexData.concat(vertexData);

    mesh.updateVerticesData(BABYLON.VertexBuffer.PositionKind, vertexData, false, false);

}
