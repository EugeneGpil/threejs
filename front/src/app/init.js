import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import * as dat from "dat.gui";

export default (container) => {
  const renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    80, //between 40 and 80
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
  camera.position.set(11, 10, 10);
  orbit.update();

  const boxGeometry = new THREE.BoxGeometry();
  const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  scene.add(box);

  const planeGeometry = new THREE.PlaneGeometry(30, 30);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  scene.add(plane);
  plane.rotation.x = -0.5 * Math.PI;

  const gridHelper = new THREE.GridHelper(30 /*100*/);
  scene.add(gridHelper);

  const sphereGeometry = new THREE.SphereGeometry(2, 16, 8);
  // const sphereMaterial = new THREE.MeshBasicMaterial({
  //   color: 0x0000ff,
  //   wireframe: false,
  // });
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF,
    wireframe: false,
  })
  // const sphereMaterial = new THREE.MeshLambertMaterial({
  //   color: 0x0000FF,
  //   wireframe: false,
  // })
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.castShadow = true;
  scene.add(sphere);

  sphere.position.x = -5;
  sphere.position.y = 7;
  sphere.position.z = 2;

  const ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);

  // const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
  // directionalLight.position.set(-30, 50, 0)
  // directionalLight.castShadow = true;
  // directionalLight.shadow.camera.bottom = -20
  // directionalLight.shadow.camera.left = -20
  // directionalLight.shadow.camera.right = 20
  // directionalLight.shadow.camera.top = 20
  // scene.add(directionalLight)
  //
  // const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
  // scene.add(directionalLightHelper)
  //
  // const directionalLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
  // scene.add(directionalLightShadowHelper)

  const spotLight = new THREE.SpotLight(0xFFFFFF, 1);
  spotLight.position.set(5, 5, 0)
  spotLight.castShadow = true;
  scene.add(spotLight)

  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper)

  // scene.fog = new THREE.Fog(0xFFFFFF, 0, 200)
  // scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01)

  // renderer.setClearColor(0xFFEA00);

  const textureLoader = new THREE.TextureLoader();

  scene.background = textureLoader.load('img/background.jpeg')

  const gui = new dat.GUI();

  const options = {
    // sphereColor: "#ffee00",
    // wireframe: false,
    speed: 0.01,
    spotLightAngle: 0.6,
    spotLightPenumbra: 0,
    spotLightIntensity: 1,
  };

  // gui.addColor(options, "sphereColor").onChange((e) => {
  //   sphere.material.color.set(e);
  // });
  //
  // gui.add(options, "wireframe").onChange((e) => {
  //   sphere.material.wireframe = e;
  // });
  //
  // gui.add(options, "speed", 0, 0.1)

  gui.add(options, "spotLightAngle", 0, 1)
  gui.add(options, 'spotLightPenumbra', 0, 1)
  gui.add(options, 'spotLightIntensity', 0, 1)

  // gui.hide()

  let step = 0;

  spotLight.angle = options.spotLightAngle
  spotLight.penumbra = options.spotLightPenumbra
  spotLight.intensity = options.spotLightIntensity

  renderer.setAnimationLoop((time) => {
    spotLight.angle = options.spotLightAngle
    spotLight.penumbra = options.spotLightPenumbra
    spotLight.intensity = options.spotLightIntensity
    spotLightHelper.update()

    box.rotation.x = time / 2400;
    box.rotation.y = time / 2400;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step)) + 2

    renderer.render(scene, camera);
  });

  renderer.render(scene, camera);
};
