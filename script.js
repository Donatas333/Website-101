import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('hero-canvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add geometry
const geometry = new THREE.IcosahedronGeometry(1.5, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x0A84FF, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Light
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5,5,5);
scene.add(light);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.003;
  renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Scroll-triggered animations
gsap.from("#services .card", {
  opacity: 0, y: 50, stagger: 0.2,
  scrollTrigger: { trigger: "#services", start: "top 80%" }
});
gsap.from("#ai .card", {
  opacity: 0, scale: 0.8, stagger: 0.2,
  scrollTrigger: { trigger: "#ai", start: "top 80%" }
});
gsap.from("#about p", {
  opacity: 0, y: 30,
  scrollTrigger: { trigger: "#about", start: "top 80%" }
});
