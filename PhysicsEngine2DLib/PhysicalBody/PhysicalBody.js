
import Vector from '../Vector.js';

class PhysicalBody {
    constructor(args) {

        this.position = new Vector(args.position.x, args.position.y);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0, 0);

        this.shapeType = null;
        this.mass = 1;
        this.invertedMass = 1;
        this.elasticity = 1;

        this.forces = [];
        this.collide = true;

        this.preventCovering = true;
        this.collisionReaction = true;

        this.colliding = false;
    }

    update(dt) {
        this.velocity.add(this.acceleration.clone().mult(dt));
        this.position.add(this.velocity.clone().mult(dt));
    }

    applyForce(force) {
        this.forces.push(force);
        this.updateAcceleration();
    }

    removeForce() {

        this.updateAcceleration();
    }

    updateAcceleration() {
        for (let force of this.forces) {
            this.acceleration.add(force.calculate(this));
        }
    }

    collision(obj) {
        this.colliding = true;
        // if (this.preventCovering) {
        //     this.velocity.set(0, 0);
        // }
    }

    setMass(mass) {
        this.mass = mass;
        if (mass == 0) {
            this.invertedMass = 0;
        }
        else {
            this.invertedMass = 1 / mass;
        }
    }
}

export default PhysicalBody;