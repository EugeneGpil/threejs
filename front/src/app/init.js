import * as THREE from "three";

export default (container) => {
  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
      75, //between 40 and 80
      window.innerWidth / window.innerHeight,
      0.1,
      1000
  )

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper)

  // camera.position.z = 5;
  // camera.position.y = 2;
  // camera.position.x = 2;
  camera.position.set(2, 2, 5);

  renderer.render(scene, camera)
};
