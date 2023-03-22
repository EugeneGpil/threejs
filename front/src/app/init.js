import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";

export default (container) => {
  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45, //between 40 and 80
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  const orbit = new OrbitControls(camera, renderer.domElement);

  // camera.position.z = 5;
  // camera.position.y = 2;
  // camera.position.x = 2;
  camera.position.set(-10, 30, 30);
  orbit.update();

  const boxGeometry = new THREE.BoxGeometry();
  const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  scene.add(box);

  const planeGeometry = new THREE.PlaneGeometry(30, 30);
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(plane);
  plane.rotation.x = -0.5 * Math.PI;

  const gridHelper = new THREE.GridHelper(30 /*100*/);
  scene.add(gridHelper);

  renderer.setAnimationLoop((time) => {
    box.rotation.x = time / 2400;
    box.rotation.y = time / 2400;
    renderer.render(scene, camera);
  });

  renderer.render(scene, camera);
};
