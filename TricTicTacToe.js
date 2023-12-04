
// scene management
const Scene = {
  Cube: 0,
  Board: 1
}

let currentScene = Scene.Cube;
let cube, board


// initial setup called once
function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  // surface.setLocation(800, 100);
  background(0);

  const camera = createCamera();

  cube = new Cube(camera, 4);
  // board = new Board();
}

// game loop called every frame
function draw() {
  // cleanup
  background(0);
  noLights()

  orbitControl(4, 4, 1)

  // render 3d cube scene
  if (currentScene == Scene.Cube) cube.render();
  // if (currentScene == Scene.Board) board.render(deltaTime);
}

function mouseClicked() {
  // send inputs to board scene
  // if(currentScene == Scene.Board) board.handleInput(mouseX, mouseY);
}

function keyPressed() {
  // send inputs to cube scene
  if (currentScene == Scene.Cube) cube.handleInput(keyCode);
}