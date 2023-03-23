import { SceneLoader } from "babylonjs";
import Figures from "../Models/Figures.glb";
import * as BABYLON from "babylonjs";
import earcut from "earcut";

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
    
        return meshes[1];
}

export async function CreateGround(){

    const {meshes} = await SceneLoader.ImportMeshAsync("Ground",Figures,"");

    return meshes[1];

}

export async function CreateBoard(){

    const {meshes} = await SceneLoader.ImportMeshAsync("Board",Figures,"");

    return meshes[1];

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
