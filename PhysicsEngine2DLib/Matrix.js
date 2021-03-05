
class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];

        this.init()
    }

    init() {

        for (let r = 0; r < this.rows; r++) {
            this.matrix.push([]);
            for (let c = 0; c < this.cols; c++) {
                this.matrix[r].push(0)
            }
        }
    }

    static fromArray(array) {
        let m = new Matrix(array.length, 1);
        for (let i = 0; i < array.length; i++) {
            m.matrix[i][0] = array[i]
        }

        return m;
    }

    static multiply(a, b) {
        // Matrix product
        if (a.cols !== b.rows) {
            console.log('Columns of A must match rows of B.')
            return undefined;
        }
        let result = new Matrix(a.rows, b.cols);
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                // Dot product of values in col
                let sum = 0;
                for (let k = 0; k < a.cols; k++) {
                    sum += a.matrix[i][k] * b.matrix[k][j];
                }
                result.matrix[i][j] = sum;
            }
        }
        return result;
    }

    static substract(a, b) {
        let result = new Matrix(a.rows, a.cols);
        for (let r = 0; r < a.rows; r++) {
            for (let c = 0; c < a.cols; c++) {
                result.matrix[r][c] = a.matrix[r][c] - b.matrix[r][c]
            }
        }
        return result;


    }

    toArray() {
        let arr = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                arr.push(this.matrix[i][j]);
            }
        }
        return arr;
    }

    add(n) {

        if (n instanceof Matrix) {
            if (this.rows == n.rows && this.cols == n.cols) {
                for (let r = 0; r < this.rows; r++) {
                    for (let c = 0; c < this.cols; c++) {
                        this.matrix[r][c] += n.matrix[r][c]
                    }
                }
            }
            else {
                throw new Error('Matrix sizes are different!')
            }
        }
        else {
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    this.matrix[r][c] += n
                }
            }
        }
    }

    multiply(n) {

        if (n instanceof Matrix) {
            if (this.cols == n.rows) {
                let result = new Matrix(this.rows, n.cols);
                console.log(result);

                for (let r = 0; r < result.rows; r++) {
                    for (let c = 0; c < result.cols; c++) {
                        let sum = 0;

                        for (let k = 0; k < this.cols; k++) {
                            sum += this.matrix[r][k] * n.matrix[k][c];
                        }

                        result.matrix[r][c] = sum;
                    }
                }

                return result;
            }
            else {
                throw new Error('Invalid sizes of Matrixes!')
            }
        }
        else {
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    this.matrix[r][c] *= n
                }
            }
        }
    }

    print(mess) {
        if (mess)
            console.log("-- " + mess + " --");
        console.table(this.matrix)
    }

    randomize(fn) {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                // this.matrix[r][c] = Math.random() * 2 - 1;
                this.matrix[r][c] = Math.floor(Math.random() * 4 + 1)
            }
        }
    }

    static transpose(m) {
        let result = new Matrix(m.cols, m.rows);

        for (let r = 0; r < m.rows; r++) {
            for (let c = 0; c < m.cols; c++) {
                result.matrix[c][r] = m.matrix[r][c]
            }
        }

        return result;
    }

    map(fn) {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this.matrix[r][c] = fn(this.matrix[r][c])
            }
        }
    }

    clone() {
        let m = new Matrix(this.rows, this.cols);
        m.matrix = this.matrix;
        return m;
    }

    static rotationMatrix(angle) {
        let m = new Matrix(2, 2);
        m.matrix = [
            [Math.cos(angle), -Math.sin(angle)],
            [Math.sin(angle), Math.cos(angle)]
        ]
        return m;
    }
}

export default Matrix;