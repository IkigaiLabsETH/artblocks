import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';

let camera, scene, renderer, composer;
let particles = [];

const PARTICLE_COUNT = 1000;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.z = 1000;

  scene = new THREE.Scene();

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const material = new THREE.SpriteMaterial({
      color: Math.random() * 0x808008 + 0x808080
    });

    const particle = new THREE.Sprite(material);
    particle.position.x = Math.random() * 2000 - 1000;
    particle.position.y = Math.random() * 2000 - 1000;
    particle.position.z = Math.random() * 2000 - 1000;

    particle.position.normalize();
    particle.position.multiplyScalar(Math.random() * 10 + 450);

    particle.scale.x = particle.scale.y = 10;

    scene.add(particle);

    particles.push(particle);
  }

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const renderPass = new RenderPass(scene, camera);

  const bokehPass = new BokehPass(scene, camera, {
    focus: 1.0,
    aperture: 0.025,
    maxblur: 1.0,

    width: window.innerWidth,
    height: window.innerHeight
  });

  composer = new EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(bokehPass);
}

function animate() {
  requestAnimationFrame(animate);

  const time = Date.now() * 0.00005;

  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (- mouseY - camera.position.y) * 0.05;

  camera.lookAt(scene.position);

  for (let i = 0; i < scene.children.length; i++) {
    const object = scene.children[i];

    if (object instanceof THREE.Sprite) {
      object.rotation.y = time * (i < 4 ? i + 1 : - (i + 1));
    }
  }

  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    particle.position.y = 50 * Math.sin((i + time) * 0.5);
  }

  renderer.render(scene, camera);
  composer.render();
}
