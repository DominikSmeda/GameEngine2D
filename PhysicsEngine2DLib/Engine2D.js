
//Basic
import Vector from './Vector.js';
// import Timer from './Timer.js';

//PhysicalBody
import PhysicalBody from './PhysicalBody/PhysicalBody.js';
import Circle from './PhysicalBody/Circle.js';


class Engine2D {
    constructor() {

        this.objects = [];
    }

    init() {
    }

    update(dt) {
        for (let obj of this.objects) {
            obj.update(dt);
        }

        this.handleCollisions();
    }

    addObject(obj) {
        this.objects.push(obj);
    }

    handleCollisions() {
        this.objects.forEach((obj1, index) => {
            for (let i = index + 1; i < this.objects.length; i++) {
                this.detectCollisionBetween(obj1, this.objects[i]);
            }
        });
    }

    detectCollisionBetween(obj1, obj2) {//Must be change to instance of due to inheritance posibility
        let objClass1 = obj1.constructor.name;
        let objClass2 = obj2.constructor.name;

        let detectFunction = null;

        if (objClass1 == objClass2) {
            switch (objClass1) {
                case 'Circle':
                    detectFunction = this.colisionCircleCircle;
                    break;

                default:
                    return new Error('Cannot recognize PhysicalBody type');
            }
        }
        else {

        }

        return detectFunction(obj1, obj2);
    }

    colisionCircleCircle(c1, c2) {
        let centerDistance = c1.position.clone().subtr(c2.position).mag();
        let bothR = c1.radius + c2.radius;

        if (centerDistance <= bothR) {

            c1.collision(c2);
            c2.collision(c1);

            let distance = centerDistance - bothR;

            if (c1.preventCovering && c2.preventCovering) {
                let penetrationVec = c2.position.clone().subtr(c1.position).normalize().mult(distance / 2);

                c1.position.add(penetrationVec);
                c2.position.add(penetrationVec.negate());

                let normal = c1.position.clone().subtr(c2.position).normalize();

                let relativeVelocity = c1.velocity.clone().subtr(c2.velocity);

                let separatingVelocity = relativeVelocity.dot(normal);
                let elasticity = 1;
                let separatingVelocityVector = normal.mult(-separatingVelocity * elasticity);

                c1.velocity.add(separatingVelocityVector);
                c2.velocity.add(separatingVelocityVector.negate());

            }
            return { centerDistance, distance, collision: true };
        }
        else {
            return { collision: false };
        }
    }

    colisionLineCircle() {

    }

}

export default Engine2D;