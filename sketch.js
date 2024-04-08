let ROWS = 4;
let COLS = 4;
let gutter = 2;
let cellSize; // Added variable for cell size
let value = true;
let record;
let rot =0 
let wedgeOrient = [];

function wedge(x, y, size, orient) {
  switch (orient) {
    case 0: // SW
      arc(x, y + size, 2 * size, 2 * size, 1.5 * PI, TWO_PI);
      break;

    case 1: // SE
      arc(x + size, y + size, 2 * size, 2 * size, PI, 1.5 * PI);
      // triangle(x,y,x,y+size,x+size,y+size)
      
      break;

    case 2: // NE
      arc(x + size, y, 2 * size, 2 * size, 0.5 * PI, PI);
      break;

    case 3: // NW
      arc(x, y, 2 * size, 2 * size, 0, 0.5 * PI);
      break;

    case 4: // square
      rect(x, y, size, size);
      break;

    case 5: // circle
      ellipse(x + size / 2, y + size / 2, size, size);
      break;

    case 6: // circle
      // ellipse(x,y,1,1);
      break;
  }
}

function randomOrient() {
  return int(random(6));
}



 let xOffset
 let yOffset
 let gutSlider
 let rowSlider
 let colSlider
 
function setup() {
  // createCanvas(400, 500);
  createCanvas(500, 500,SVG);
  // rectMode(CENTER)
  noStroke();
  fill(0, 0, 255);

  // Calculate cell size based on canvas dimensions and number of columns
  cellSize = min(width, height) / COLS;

  gutSlider = createSlider(0, 5, 0,1);
  gutSlider.position(width + 10, 50);
  gutSlider.style('width', '80px');
  // ROWS = gutSlider.value()
  rowSlider = createSlider(1,ROWS,ROWS)
  rowSlider.position(width + 10 , 10)
  
  colSlider = createSlider(1,COLS,COLS)
  colSlider.position(width + 10, 30)

  for (let i = 0; i < ROWS; i++) {
    wedgeOrient[i] = [];
    for (let j = 0; j < COLS; j++) {
      wedgeOrient[i][j] = randomOrient();
      
    }
  }
}

function draw() {
  background(255);

  noStroke();
  fill(255, 200, 60);
  // for (let i = 0; i < ROWS; i++) {
  //   for (let j = 0; j < COLS; j++) {
  //     let x = j * cellSize;
  //     let y = i * cellSize;
  //     wedge(x, y, cellSize - gutter, wedgeOrient[i][j]);
  //   }
  // }
  gutter = gutSlider.value()
  ROWS = rowSlider.value()
  COLS = colSlider.value()
  
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let x = j * cellSize;
      let y = i * cellSize;
      
      // wedgeOrient[i][j] = floor(map(sin((i/1*j/2)/10 + frameCount/100),-1,1,0,7))
      // wedgeOrient[i][j] = floor(map(sin(millis()/1000 - dist(width/2, height/2, x/10*cos(x/200+frameCount/50), y)/200),-1,1,0,7))
      // wedgeOrient[i][j] = floor(map(sin(millis()/2000 - dist(width/2, height/2, x, y)/500),-1,1,0,7))
      
      // wedgeOrient[i][j] = floor(map(sin(i/1 + frameCount/100),-1,1,0,6))

      
      
      wedge(x, y, cellSize - gutter, wedgeOrient[i][j]);
    }
  }

 
}


function mousePressed() {
  let i = int(mouseY / cellSize);
  let j = int(mouseX / cellSize);
  wedgeOrient[i][j] = (wedgeOrient[i][j] + 1) % 7;
  redraw();
  
}

function keyTyped() {
  if (key == 's') {
    save("image.svg");
  } else if (key == 'r') {
    ROWS++; // Increase the number of rows
    for (let i = 0; i < ROWS; i++) {
      wedgeOrient[i] = [];
      for (let j = 0; j < COLS; j++) {
        wedgeOrient[i][j] = randomOrient();
      }
    }
    redraw();
  } else if (key == 'e' && ROWS > 1) {
    // ROWS--; // Decrease the number of rows, but ensure it stays above 1
    for (let i = 0; i < ROWS; i++) {
      wedgeOrient[i] = [];
      for (let j = 0; j < COLS; j++) {
        wedgeOrient[i][j] = randomOrient();
      }
    }
    redraw();
  } else if (key == 'c') {
    COLS++; // Increase the number of columns
    for (let i = 0; i < ROWS; i++) {
      wedgeOrient[i].push(randomOrient());
    }
    redraw();
  } else if (key == 'x' && COLS > 1) {
    COLS--; // Decrease the number of columns, but ensure it stays above 1
    for (let i = 0; i < ROWS; i++) {
      wedgeOrient[i].pop();
    }
    redraw();
  }
  else if (key >= '1' && key <= '7') {
    let i = int((ROWS * mouseY) / (ROWS*cellSize));
    let j = int((COLS * mouseX) / (COLS*cellSize));
    wedgeOrient[i][j] = int(key) - 1;
    redraw();
  }
 else if (key == 'z') {
    let i = int((ROWS * mouseY) / height);
    let j = int((COLS * mouseX) / width);
   for(let i = 0 ; i <ROWS;i++){
     
   }
    wedgeOrient[i][j] = 7;
    redraw();
  }
}
