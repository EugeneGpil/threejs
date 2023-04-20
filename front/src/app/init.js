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
    color: 0x0000ff,
    wireframe: false,
  });
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

  const spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(5, 5, 0);
  spotLight.castShadow = true;
  scene.add(spotLight);

  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);

  // scene.fog = new THREE.Fog(0xFFFFFF, 0, 200)
  // scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01)

  // renderer.setClearColor(0xFFEA00);

  const backgroundImage = "img/background.jpeg";

  const cubeTextureLoader = new THREE.CubeTextureLoader();
  scene.background = cubeTextureLoader.load([
    backgroundImage,
    backgroundImage,
    backgroundImage,
    backgroundImage,
    backgroundImage,
    backgroundImage,
  ]);

  const textureLoader = new THREE.TextureLoader();

  const box2Geometry = new THREE.BoxGeometry(4, 4, 4);
  const box2Material = new THREE.MeshBasicMaterial({
    // color: 0x00FF00,
    // map: textureLoader.load(backgroundImage)
  });

  const box2MultiMaterial = [
    new THREE.MeshBasicMaterial({ map: textureLoader.load(backgroundImage) }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load(backgroundImage) }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load(backgroundImage) }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load(backgroundImage) }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load(backgroundImage) }),
    new THREE.MeshBasicMaterial({ map: textureLoader.load(backgroundImage) }),
  ];

  // const box2 = new THREE.Mesh(box2Geometry, box2Material)
  const box2 = new THREE.Mesh(box2Geometry, box2MultiMaterial);
  // box2.material.map = textureLoader.load(backgroundImage)
  scene.add(box2);
  box2.position.set(-10, 5, -10);

  // scene.background = textureLoader.load('img/background.jpeg')

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

  gui.add(options, "spotLightAngle", 0, 1);
  gui.add(options, "spotLightPenumbra", 0, 1);
  gui.add(options, "spotLightIntensity", 0, 1);

  gui.hide();

  let step = 0;

  const mousePosition = new THREE.Vector2();

  window.addEventListener("mousemove", function (e) {
    mousePosition.x = (2 * e.clientX) / window.innerWidth - 1;
    mousePosition.y = (-2 * e.clientY) / window.innerHeight + 1;
  });

  const rayCaster = new THREE.Raycaster();

  const sphereId = sphere.id;

  const plane2Geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
  const plane2Material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  });
  const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
  scene.add(plane2);
  plane2.position.set(10, 10, 15);

  plane2.geometry.attributes.position.array[0] -= 10 * Math.random();
  plane2.geometry.attributes.position.array[1] -= 10 * Math.random();
  plane2.geometry.attributes.position.array[2] -= 10 * Math.random();
  const lastElementNumber =
    plane2.geometry.attributes.position.array.length - 1;
  plane2.geometry.attributes.position.array[lastElementNumber] -=
    10 * Math.random();
  plane2.geometry.attributes.position.array[lastElementNumber - 1] -=
    10 * Math.random();
  plane2.geometry.attributes.position.array[lastElementNumber - 2] -=
    10 * Math.random();

  const sphere2Geometry = new THREE.SphereGeometry(4);
  const vShader = `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;
  const fShader = `
    void main() {
      gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);
    }
  `;
  const sphere2Material = new THREE.ShaderMaterial({
    vertexShader: vShader,
    fragmentShader: fShader,
  });
  const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
  scene.add(sphere2);
  sphere2.position.set(-5, 10, 10);

  spotLight.angle = options.spotLightAngle;
  spotLight.penumbra = options.spotLightPenumbra;
  spotLight.intensity = options.spotLightIntensity;

  let prevTime = 0;
  renderer.setAnimationLoop((time) => {
    spotLight.angle = options.spotLightAngle;
    spotLight.penumbra = options.spotLightPenumbra;
    spotLight.intensity = options.spotLightIntensity;
    spotLightHelper.update();

    box.rotation.x = time / 2400;
    box.rotation.y = time / 2400;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step)) + 2;

    rayCaster.setFromCamera(mousePosition, camera);
    const intersects = rayCaster.intersectObjects(scene.children);
    // console.log(intersects)

    const firstIntersect = intersects[0];
    if (firstIntersect?.object.id === sphereId) {
      sphere.material.color.set(0xff0000);
    } else {
      sphere.material.color.set(0x00ff00);
    }

    for (let intersect of intersects) {
      if (intersect.object.id === sphereId) {
        // console.log('SPHERE')
      }
    }

    if (time - prevTime >= 1000) {
      plane2.geometry.attributes.position.array[0] = 10 * Math.random();
      plane2.geometry.attributes.position.array[1] = 10 * Math.random();
      plane2.geometry.attributes.position.array[2] = 10 * Math.random();
      const lastElementNumber =
        plane2.geometry.attributes.position.array.length - 1;
      plane2.geometry.attributes.position.array[lastElementNumber] =
        10 * Math.random();
      plane2.geometry.attributes.position.array[lastElementNumber - 1] =
        10 * Math.random();
      plane2.geometry.attributes.position.array[lastElementNumber - 2] =
        10 * Math.random();
      plane2.geometry.attributes.position.needsUpdate = true;
      prevTime = time;
    }

    renderer.render(scene, camera);
  });

  renderer.render(scene, camera);
};
