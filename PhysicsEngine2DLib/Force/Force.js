const { default: Vector } = require("../Vector");

import Vector from '../Vector';


class Force extends Vector {
    constructor(name, vec) {
        super(vec.x, vec.y);
        this.name = name;
    }

    calculate(obj) {

    }
}


export default Force;