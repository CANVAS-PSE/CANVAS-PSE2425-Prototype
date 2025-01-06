import * as THREE from "three";
import { Vector3 } from "three";
import { Object3D } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/**
 * Represents a Heliostat 3D model containing all the necassary parameters and functions for that.
 */
export class Heliostat extends Object3D {
  /**
   * Creates a new Heliostat
   * @param {Number} apiID Is the id for api requests
   * @param {Vector3} position Is the position of the Heliostat
   * @param {Vector3} aimPoint Is the point the heliostat is aiming at
   * @param {Number} numberOfFacets Are the number of facets this heliostat has
   * @param {String} kinematicType Is the type of kinemtic this heliostat has
   */
  constructor(apiID, position, aimPoint, numberOfFacets, kinematicType) {
    super();
    this.loader = new GLTFLoader();
    this.mesh;
    this.loader.load("/static/models/heliostat.glb", (gltf) => {
      this.mesh = gltf.scene;
      this.mesh.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      this.add(this.mesh);
    });
    this.position.copy(position);
    this.apiID = apiID;
    this.aimPoint = aimPoint;
    this.numberOfFacets = numberOfFacets;
    this.kinematicType = kinematicType;
  }
}

/**
 * Represents a Receiver 3D model containing all the necassary parameters and functions for that.
 */
export class Receiver extends Object3D {
  /**
   * Creates a new receiver
   * @param {Number} apiID Is the id for api requests
   * @param {Vector3} position Is the position of the receiver
   * @param {Vector3} normalVector The normal to the plane of the receiver
   * @param {Number} rotationY Is the rotation of the receiver
   * @param {Number} planeE The width of the receiver
   * @param {Number} planeU The height of the receiver
   * @param {Number} resolutionE The horizontal resolution of the receiver
   * @param {Number} resolutionU The vertical resolution of the receiver
   * @param {Number} [curvatureE] The curvature of the receiver in east direction
   * @param {Number} [curvatureU] The curvature of the receiver in up direction
   */
  constructor(
    apiID,
    position,
    normalVector,
    rotationY,
    curvatureE,
    curvatureU,
    planeE,
    planeU,
    resolutionE,
    resolutionU
  ) {
    super();
    // place the 3D object
    this.base = new ReceiverBase();
    this.base.position.copy(new Vector3(position.x, 0, position.z));
    this.add(this.base);

    this.top = new ReceiverTop();
    this.top.position.copy(position);
    this.add(this.top);

    this.rotateY(rotationY);
    this.apiID = apiID;
    this.normalVector = normalVector;
    this.curvatureE = curvatureE;
    this.curvatureU = curvatureU;
    this.planeE = planeE;
    this.planeU = planeU;
    this.resolutionE = resolutionE;
    this.resolutionU = resolutionU;
  }

  /**
   * Updates the position of the receiver manually to ensure that it's standing on the ground
   * @param {Vector3} newPosition Is the new position for the receiver
   */
  updatePosition(newPosition) {
    this.top.position.copy(newPosition);
    this.base.position.copy(new Vector3(newPosition.x, 0, newPosition.z));
  }
}

export class ReceiverBase extends Object3D {
  constructor() {
    super();
    this.loader = new GLTFLoader();
    this.loader.load("/static/models/towerBase.glb", (gltf) => {
      this.base = gltf.scene;
      this.add(this.base);
      this.base.traverse((child) => {
        if (child.type == "Mesh") {
          child.castShadow = true;
        }
      });
    });
  }
}

export class ReceiverTop extends Object3D {
  constructor() {
    super();
    this.loader = new GLTFLoader();
    this.loader.load("/static/models/towerTop.glb", (gltf) => {
      this.top = gltf.scene;
      this.add(this.top);
      this.top.traverse((child) => {
        if (child.type == "Mesh") {
          child.castShadow = true;
        }
      });
    });
  }
}

/**
 * Represents a Lightsource 3D model containing all the necassary parameters and functions for that.
 */
export class Lightsource extends Object3D {
  /**
   * Create a new lightsource
   * @param {Number} apiID Is the id for api requests
   * @param {Number} numberOfRays Is the number of sent-out rays sampled from the sun distribution
   * @param {String} lightsourceType Is the type of the lightsource
   * @param {String} distributionType Is the distribtion used to model the lightsource e.g. normal
   * @param {Number} mean Parameter of the distribution
   * @param {Number} covariance Parameter of the distribtution
   */
  constructor(
    apiID,
    numberOfRays,
    lightsourceType,
    distributionType,
    mean,
    covariance
  ) {
    super();
    this.apiID = apiID;
    this.numberOfRays = numberOfRays;
    this.lightsourceType = lightsourceType;
    this.distributionType = distributionType;
    this.mean = mean;
    this.covariance = covariance;
  }
}

export class Terrain extends Object3D {
  constructor(size) {
    super();

    this.terrain = new THREE.Mesh(
      new THREE.CircleGeometry(size / 2),
      new THREE.MeshStandardMaterial({
        color: 0x5fd159,
      })
    );
    this.terrain.receiveShadow = true;
    this.terrain.rotateX((3 * Math.PI) / 2);
    this.add(this.terrain);

    this.mountains = new THREE.Group();
    this.add(this.mountains);
    for (let i = 0; i < 100; i++) {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(THREE.MathUtils.randFloat(20, 100)),
        new THREE.MeshStandardMaterial({
          color: 0x50ba78,
        })
      );
      sphere.position.set(
        (size / 2) * Math.sin((i / 100) * 2 * Math.PI),
        0,
        (size / 2) * Math.cos((i / 100) * 2 * Math.PI)
      );
      this.mountains.add(sphere);
    }
  }
}
