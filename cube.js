const CUBE_SIZE = 100;
const PADDING = 10
const OFFSET = CUBE_SIZE + CUBE_SIZE / 2 + PADDING / 2

const DEFAULT_RX = -25;
const DEFAULT_RY = 45;
const TOP_DOWN_RX = -90;
const TOP_DOWN_RY = 0;

class Cube {

    n
    nSquare
    nCube

    currentCube = 0;

    rxTarget = DEFAULT_RX
    ryTarget = DEFAULT_RY

    camera

    constructor(camera, n = 3) {
        this.n = n
        this.nSquare = n * n
        this.nCube = n * n * n

        this.camera = camera
        camera.setPosition(-1000, -600, -1000);
        camera.lookAt(0, 0, 0);
    }

    renderCube(x, y, z, c) {
        push()
        translate(x, y, z);
        stroke(0);
        fill(c);
        box(CUBE_SIZE);
        pop()
    }

    handleInput(code) {
        const layer = (this.currentCube - this.currentCube % this.nSquare) / this.nSquare

        switch (code) {

            case RIGHT_ARROW:
                if (this.currentCube + 1 < (layer + 1) * this.nSquare) this.currentCube += 1
                else this.currentCube = layer * this.nSquare
                break
            case LEFT_ARROW:
                if (this.currentCube - 1 >= layer * this.nSquare) this.currentCube -= 1
                else this.currentCube = ((layer + 1) * this.nSquare) - 1
                break

            case DOWN_ARROW:
                // 2 11 20 29
                if (this.currentCube + this.nSquare < this.nCube) this.currentCube += this.nSquare
                else this.currentCube = this.currentCube % this.nSquare
                break

            case UP_ARROW:
                // 20 11 2 -7
                // 1 5 9 13
                // 13 9 5 1 -3
                if (this.currentCube - this.nSquare >= 0) this.currentCube -= this.nSquare
                else this.currentCube = this.currentCube % this.nSquare + (this.nSquare * (this.n - 1))
                break
            default:
                console.log(keyCode);
        }
    }

    render() {
        push()

        for (let i = 0; i < this.nCube; i++) {

            const row = i % this.n;
            const col = ((i - row) / this.n) % this.n;
            const layer = (i - i % (this.nSquare)) / (this.nSquare)

            const highlightColor = (this.currentCube === i) ? HIGHLIGHT : INACTIVE
            // const playerColor = i === 0 ? COLOR_X : i === this.nCube - 1 ? COLOR_O : null
            const playerColor = null

            this.renderCube(
                row * (CUBE_SIZE + PADDING) - OFFSET,
                layer * (CUBE_SIZE + PADDING) - OFFSET,
                col * (CUBE_SIZE + PADDING) - OFFSET,
                playerColor ?? highlightColor
            )
        }


        pop()
    }
}