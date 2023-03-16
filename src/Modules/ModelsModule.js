import { SceneLoader } from "babylonjs";
import Figures from "../Models/Figures.glb";

export async function CreateCuadranguarPyramid(){

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

