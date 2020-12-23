
//Basic
import Vector from './Vector.js';
import Timer from './Timer.js';

//PhysicalBody
import PhysicalBody from './PhysicalBody/PhysicalBody.js';
import Circle from './PhysicalBody/Circle.js';
var t = new Timer();

class Engine2D {
    constructor() {

        this.objects = [];
        this.tickCollisionTimer = new Timer();
        this.tickCollisionMaxCalcTime = 40;
        this.lastCollisionIndex = 0;

    }

    init() {

    }

    update(dt) {
        for (let obj of this.objects) {
            obj.update(dt);
        }
        // let timer = new Timer();
        this.handleCollisions();
        // console.log('handleCollision', timer.deltaTimeMs());
    }

    addObject(obj) {
        this.objects.push(obj);
    }

    handleCollisions() {

        // if (this.lastCollisionIndex == 0) {
        //     console.log(t.deltaTimeMs());
        // }
        this.tickCollisionTimer.reset();


        const length = this.objects.length;
        for (let index = this.lastCollisionIndex; index < length; index++) {
            if (this.tickCollisionTimer.timeElapsed() > this.tickCollisionMaxCalcTime) {
                this.lastCollisionIndex = index;
                return
            }

            let obj1 = this.objects[index];
            for (let i = index + 1; i < length; i++) {
                this.detectCollisionBetween(obj1, this.objects[i]);
            }
        }
        this.lastCollisionIndex = 0;
    }

    detectCollisionBetween(obj1, obj2) {

        let detectFunction = null;

        if (obj1.shapeType == obj2.shapeType) {
            switch (obj1.shapeType) {
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
                let newSeparatingVelocity = -separatingVelocity * elasticity;

                let separatingVelocityDiff = newSeparatingVelocity - separatingVelocity;
                let c1InvMass = 1 / c1.mass;
                let c2InvMass = 1 / c2.mass;

                if (c1.mass == 0) {
                    c1InvMass = 0;
                }
                if (c2.mass == 0) {
                    c2InvMass = 0;
                }

                let impulse = separatingVelocityDiff / (c1InvMass + c2InvMass);
                let impulseVec = normal.mult(impulse);

                c1.velocity.add(impulseVec.mult(c1InvMass));
                c2.velocity.add(impulseVec.mult(c2InvMass).negate());
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