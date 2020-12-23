
import PhysicalBody from './PhysicalBody.js';


class Circle extends PhysicalBody {
    constructor(x, y, r) {
        super({
            position: {
                x,
                y
            },
        });
        this.shapeType = 'Circle';
        this.mass = r;
        this.radius = r;
        this.focused = false;
    }

    render() {
        ctx.save();
        if (this.colliding) {
            ctx.fillStyle = "#ff0000";
        }
        if (this.focused) {
            ctx.fillStyle = "#0000ff";
        }
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();
        ctx.stroke();
        this.colliding = false;
    }

}

export default Circle;