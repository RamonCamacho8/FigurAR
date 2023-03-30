import { HemisphericLight, Scene, SceneLoader } from "babylonjs";
import Figures from "../Models/Figures.glb";
import * as BABYLON from "babylonjs";
import earcut from "earcut";
import * as GUI from "babylonjs-gui";
import ammo from "ammo.js";

export async function CreatePyramid(){

    const {meshes} = await SceneLoader.ImportMeshAsync("Pyramid",Figures,"");

    return meshes[1];

}

export async function CreateCube(){

    const {meshes} = await SceneLoader.ImportMeshAsync("Cube",Figures,"");

    return meshes[1];

}

export async function CreateCylinder(){

    const {meshes} = await SceneLoader.ImportMeshAsync("Cylinder",Figures,"");

    return meshes[1];

}

export async function CreateSphere(){

    const {meshes} = await SceneLoader.ImportMeshAsync("Sphere",Figures,"");

    return meshes[1];
}

export async function CreateWalls(){
    
        const {meshes} = await SceneLoader.ImportMeshAsync("Walls",Figures,"");
        meshes.map((mesh) => {
            mesh.checkCollisions = true;
        })
        return meshes[1];
}

export async function CreateGround(){

    const {meshes} = await SceneLoader.ImportMeshAsync("Ground",Figures,"");
    meshes.map((mesh) => {
        mesh.checkCollisions = true;
    })
    return meshes[1];

}

export async function SetupScene(scene){
    
    new HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    
            

    const frameRate = 60;
    const gravity = -9.81;
    scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.AmmoJSPlugin(true,await ammo()));
    scene.gravity = new BABYLON.Vector3(0, -0.98, 0)
    scene.collitionsEnabled = true;

}

export async function CreateBoard(){

    const {meshes} = await SceneLoader.ImportMeshAsync("Board",Figures,"");
    return meshes[1];

}
/**
 *
 * 
 * @param {Scene} scene string name of the instanced material 
 */
export function CreateController(scene){
    const camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 1.7, 0), scene);
    camera.attachControl();
    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
    camera.speed = 0.5;
    camera.minZ = 0.45;
    camera.angularSensibility = 4000;
}

/**
 *
 * @param {Mesh} mesh string name of the instanced material
 * @param {Scene} scene string name of the instanced material 
 * @param {string} panelText string name of the instanced material
 * @param {boolean} imported string name of the instanced material
 */
export function CreateFloatingPanel(mesh,scene, panelText, imported){
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

  let container = new GUI.Rectangle("container");
  container.width = 1;
  container.height = 1;
  container.thickness = 0;
  container.background = "white";
  container.alpha = 0.05;
  container.zIndex = -1;

  advancedTexture.addControl(container);
  advancedTexture.scaleTo(300, 150);

  let button = GUI.Button.CreateSimpleButton("but1", panelText);
  button.color = "white";
  button.fontSize = 20;
  button.background = "green";
  button.onPointerEnterObservable.add(function () {
    console.log("click");
  });

  advancedTexture.addControl(button);

  meshGUI.parent =  mesh;
  meshGUI.position = new BABYLON.Vector3(0, -2, 0);

    if(imported){
        
        let angle = 90;
        meshGUI.rotation = new BABYLON.Vector3(angle*Math.PI / 2, 0, 0);
    }

    return {meshGUI, advancedTexture, container, button};
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
  information.text = "A: 90° \n B: 90° \n C: 90°";
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
    information.text = "A: "+a.toPrecision(4)+" \n B: "+b.toPrecision(4)+" \n C: "+c.toPrecision(4)+"";

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

export function createRegularPolygon(name,numOfFaces,scene,side){
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
