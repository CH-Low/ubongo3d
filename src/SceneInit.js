import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class SceneInit {
    constructor(canvasId) {
        // NOTE: Core components to initialize Three.js app.
        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;
        // this.width = window.innerWidth;
        // this.height = window.innerHeight;
        this.width = 400;
        this.height = 400;

        // NOTE: Camera params;
        this.fov = 45;
        this.nearPlane = 1;
        this.farPlane = 1000;
        this.canvasId = canvasId;

        // NOTE: Additional components.
        this.clock = undefined;
        this.stats = undefined;
        // this.controls = undefined;

        // NOTE: Lighting is basically required.
        this.ambientLight = undefined;
        this.directionalLight = undefined;
    }

    initialize() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            this.width / this.height,
            1,
            1000
        );
        // this.camera.position.x = 45;
        // this.camera.position.y = 45;
        this.camera.position.z = 150;

        // NOTE: Specify a canvas which is already created in the HTML.
        const canvas = document.getElementById(this.canvasId);
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            // NOTE: Anti-aliasing smooths out the edges.
            antialias: true,
        });
        this.renderer.setSize(this.width, this.height);
        // this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);

        this.clock = new THREE.Clock();
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.stats = Stats();
        // document.body.appendChild(this.stats.dom);

        // ambient light which is for the whole scene
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.ambientLight.castShadow = true;
        this.scene.add(this.ambientLight);

        // directional light - parallel sun rays
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        // this.directionalLight.castShadow = true;
        this.directionalLight.position.set(0, 32, 64);
        this.scene.add(this.directionalLight);
    }

    animate() {
        // NOTE: Window is implied.
        // requestAnimationFrame(this.animate.bind(this));
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
        // this.stats.update();
        // this.controls.update();
    }

    render() {
        // NOTE: Update uniform data on each render.
        // this.uniforms.u_time.value += this.clock.getDelta();
        this.renderer.render(this.scene, this.camera);
    }
}