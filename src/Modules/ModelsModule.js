import { SceneLoader } from "babylonjs";
import Figures from "../Models/Figures.glb";
import * as BABYLON from "babylonjs";

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



/** 
* @param {string} name string name of the instanced material
* @param {double} radius the radius of the prism
* @param {double} height the height of the prism
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
    for(var i = numOfFaces; i > 0; i--){
        vertex[numOfFaces-i] = [[r*Math.cos(angle*i)], [h/2], [r*Math.sin(angle*i)]]
        vertex[numOfFaces*2-i] = [[r*Math.cos(angle*i)], [-h/2], [r*Math.sin(angle*i)]]
    }
    //Makes the faces from the vertex's
    var faces = []
    for(var i = 1; i <= numOfFaces; i++){
        //Clockwise
        //faces[i-1] = [i%numOfFaces, (i%numOfFaces)+numOfFaces, i+numOfFaces-1, i-1]
        //Counter-Clockwise
        faces[i-1] = [ i-1, i+numOfFaces-1,(i%numOfFaces)+numOfFaces,i%numOfFaces]
    }
    
    for(var i = 0; i < 2; i++){
        var temp = []
        for(var j = 0; j < numOfFaces; j++){
            if(i == 0)
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
    for(var i = numOfFaces; i > 0; i--){
        vertex[numOfFaces-i] = [[r*Math.cos(angle*i)], [h/2], [r*Math.sin(angle*i)]]
        vertex[numOfFaces*2-i] = [[r*Math.cos(angle*i)], [-h/2], [r*Math.sin(angle*i)]]
    }
    //Makes the faces from the vertex's
    var faces = []
    for(var i = 1; i <= numOfFaces; i++){
        //Clockwise
        //faces[i-1] = [i%numOfFaces, (i%numOfFaces)+numOfFaces, i+numOfFaces-1, i-1]
        //Counter-Clockwise
        faces[i-1] = [ i-1, i+numOfFaces-1,(i%numOfFaces)+numOfFaces,i%numOfFaces]
    }
    
    for(var i = 0; i < 2; i++){
        var temp = []
        for(var j = 0; j < numOfFaces; j++){
            if(i == 0)
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
    var sides = 3;
    var angle = Math.PI /2;
    var radius = 1;
    var height = .005;
    //ang to rad
    if(ang)
        angle = ang * Math.PI / 180;

    var vertex = []

    vertex[0] = [[0], [height/2], [-radius]]
    vertex[1] = [[0], [height/2], [radius]]
    vertex[2] = [[radius*Math.sin(angle)], [height/2], [radius*Math.cos(angle)]]
    
    vertex[3] = [[0], [-height/2], [-radius]]
    vertex[4] = [[0], [-height/2], [radius]]
    vertex[5] = [[radius*Math.sin(angle)], [-height/2], [radius*Math.cos(angle)]]

    var faces = []
    for(var i = 1; i <= sides; i++){
        //Clockwise
        //faces[i-1] = [i%numOfFaces, (i%numOfFaces)+numOfFaces, i+numOfFaces-1, i-1]
        //Counter-Clockwise
        faces[i-1] = [i-1, i+sides-1,(i%sides)+sides,i%sides]
    }

    for(var i = 0; i < 2; i++){
        var temp = []
        for(var j = 0; j < sides; j++){
            if(i == 0)
                temp[j] = j
            else
                temp[j] = sides*2-j-1
        }
        faces[sides+i] = temp
    }

    var heptagonalPrism = { 
        "name":"Heptagonal Prism", 
        "category":["Prism"], 
        "vertex":vertex,
        "face":faces
    };

    var prism = BABYLON.MeshBuilder.CreatePolyhedron(name, {custom:heptagonalPrism}, scene);

    //console.table(vertex);
    //console.table(faces);
    

    return prism;
}

