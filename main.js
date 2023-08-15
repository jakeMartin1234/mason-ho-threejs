// Import required modules
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {getSearchGeometry} from './utils/getSvgGeometry.js';
import AddTheSearch from "./particleLogo/TheSearch";
import AddBoarders from "./particleLogo/Boarders";

// Set up Three.js components
console.log("Starting Three.js setup");

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const clock = new THREE.Clock();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

console.log("Scene, camera, and renderer set up");

// Set initial camera position
camera.position.z = 30;

// Set background color
const backgroundColor = new THREE.Color(0xDDDDDD);
renderer.setClearColor(backgroundColor);

// Add directional light to the scene
const pointLight = new THREE.PointLight(0xffffff, 1000000);
pointLight.position.set(0, 20, 3);
scene.add(pointLight);


const particles = AddTheSearch(scene);
const boarderParticles = AddBoarders(scene);
const boarderPosition = boarderParticles.position;

// Add axes helper
const axesHelper = new THREE.AxesHelper(200);
scene.add(axesHelper);

// Set up camera controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

console.log("Setup complete");

// Animation loop
function animate() {
    const elapsedTime = clock.getElapsedTime();
    requestAnimationFrame(animate);
    controls.update();

    const amplitude = 0.01;
    const frequency = 5;

    boarderParticles.position.y = boarderPosition.y + amplitude * Math.sin(elapsedTime * frequency);

    // for (let i = 0; i < numParticles; i++) {
    //
    //     let positionVector = positions[i];
    //
    //     const yOffset = amplitude * Math.sin(elapsedTime * frequency + i * 0.1);
    //
    //     // Update position
    //     positionVector.y = positionVector.y + yOffset;
    //
    //     // Update matrix
    //     tempObject.position.copy(positionVector);
    //     tempObject.updateMatrix();
    //
    //     // Set the updated matrix back to instanced mesh
    //     spheres.setMatrixAt(i, tempObject.matrix);
    // }

    // Upload the updated matrices to the GPU
    particles.instanceMatrix.needsUpdate = true;

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});





