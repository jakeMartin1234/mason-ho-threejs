import {getBoarderGeometry} from "../utils/getSvgGeometry";
import * as THREE from "three";
import {MeshSurfaceSampler} from "three/examples/jsm/math/MeshSurfaceSampler.js";

const AddBoarders = (scene) => {
    const geometry = getBoarderGeometry();
    const particleGeometry = new THREE.PlaneGeometry(4, 4, 1, 1);
    const particleMaterial = new THREE.MeshBasicMaterial({
        color: "black",
        transparent: true,
        opacity: 0.5,
    });
    const material = new THREE.PointsMaterial({
        color: "black",
    });
    const numParticles = 10000;
    const particles = new THREE.InstancedMesh(particleGeometry, particleMaterial, numParticles);
    scene.add(particles);
    const mesh = new THREE.Points(geometry, material);
    const sampler = new MeshSurfaceSampler(mesh).build();


    const tempPosition = new THREE.Vector3();
    const tempObject = new THREE.Object3D();
    let positions = [];
    for (let i = 0; i < numParticles; i++) {
        sampler.sample(tempPosition);
        positions.push(tempPosition.clone());
        tempObject.position.set(tempPosition.x, tempPosition.y, tempPosition.z);
        tempObject.scale.setScalar(Math.random() * 0.5 + 0.5);
        tempObject.updateMatrix();
        particles.setMatrixAt(i, tempObject.matrix);
    }
    particles.position.x = -20;
    particles.position.y = 30;
    particles.position.z = 0;
    particles.scale.set(0.2, -0.2, 0.2);

    return particles;
}

export default AddBoarders;
