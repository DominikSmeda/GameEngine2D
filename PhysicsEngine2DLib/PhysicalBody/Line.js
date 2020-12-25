
import Vector from '../Vector.js';
import PhysicalBody from './PhysicalBody.js';

class Line {
    constructor(x1, y1, x2, y2) {

        this.type = 'Line';
        this.startPoint = new Vector(x1, y1);
        this.endPoint = new Vector(x2, y2);
        this.directionalVector = this.endPoint.clone().subtr(this.startPoint).normalize();
        console.log(this.directionalVector);

        this.engineTempData = {
            lockPosition: false
        }
    }

    update(dt) {

    }

    render() {
        ctx.save();
        ctx.lineWidth = '3'
        ctx.beginPath();
        ctx.moveTo(this.startPoint.x, this.startPoint.y);
        ctx.lineTo(this.endPoint.x, this.endPoint.y);
        // ctx.fillStyle='';
        ctx.stroke();
    }

    collision() {

    }


}

export default Line;