import * as THREE from 'three';

const randomPointsInGeometry = (geometry, count) => {
    geometry.computeBoundingBox(); // Compute bounding box before using it
    const bbox = geometry.boundingBox;

    if (!bbox) {
        console.error("Geometry bounding box is null. Please ensure the geometry has valid vertex data.");
        return null;
    }

    const points = [];

    for (let i = 0; i < count; i++) {
        let p = setRandomVector(bbox.min.clone(), bbox.max.clone());
        points.push(p);
    }

    function setRandomVector(min, max) {
        let v = new THREE.Vector3(
            Math.random() * (max.x - min.x) + min.x,
            Math.random() * (max.y - min.y) + min.y,
            Math.random() * (max.z - min.z) + min.z
        );
        if (!isInside(v)) {
            return setRandomVector(min, max);
        }
        return v;
    }

    function isInside(point) {
        let ray = new THREE.Ray(point.clone(), randomDirection());

        let intersectionCount = 0;
        let pos = geometry.attributes.position;
        let vA = new THREE.Vector3(), vB = new THREE.Vector3(), vC = new THREE.Vector3();

        for (let i = 0; i < pos.count; i += 3) {
            vA.fromBufferAttribute(pos, i);
            vB.fromBufferAttribute(pos, i + 1);
            vC.fromBufferAttribute(pos, i + 2);

            if (ray.intersectTriangle(vA, vB, vC)) {
                intersectionCount++;
            }
        }

        return intersectionCount % 2 === 1;
    }

    function randomDirection() {
        return new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
        ).normalize();
    }

    const generatedGeometry = new THREE.BufferGeometry().setFromPoints(points);

    return generatedGeometry;
};

export { randomPointsInGeometry };
