// Kaleidoscope Interaction

let saveButton;
let clearButton;
let strokeSlider;
let strokeLabel;
let symmSlider;
let symmLabel;
let transparency = 0;
let rSlider;
let rLabel;
let gSlider;
let gLabel;
let bSlider;
let bLabel;

function setup() {
  
  createCanvas(800, 800);
  angleMode(DEGREES);
  background(0);
  
  saveButton = createButton('save');
  saveButton.mousePressed(saveSnowflake);
  clearButton = createButton('clear');
  clearButton.mousePressed(clearCanvas);
  
  symmLabel = createDiv('Symmetry ');
  symmLabel.position(170, 800);
  symmSlider = createSlider(4, 30, 6, 2);
  symmSlider.parent(symmLabel);
  
  strokeLabel = createDiv('Stroke Weight ');
  strokeLabel.position(420, 800);
  strokeSlider = createSlider(1, 32, 12, 0.1);
  strokeSlider.parent(strokeLabel);
  
  rLabel = createDiv('Red ');
  rLabel.position(170, 830);
  rSlider = createSlider(0, 255, 100, 1);
  rSlider.parent(rLabel);
  
  gLabel = createDiv('Green ');
  gLabel.position(370, 830);
  gSlider = createSlider(0, 255, 100, 1);
  gSlider.parent(gLabel);
  
  bLabel = createDiv('Blue ');
  bLabel.position(590, 830);
  bSlider = createSlider(0, 255, 100, 1);
  bSlider.parent(bLabel);
  
  colorMode(RGB);

}

function saveSnowflake() {
  save('myKaleidoscope.png');
}

function clearCanvas() {
  background(0);
  // background(0); black background
}


function draw() {
  
  translate(width / 2, height / 2);
  let symmetry = symmSlider.value();
  let angle = 360 / symmetry;

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    if (mouseIsPressed) {
      
      let r = rSlider.value();
      let g = gSlider.value();
      let b = bSlider.value();
      let alphaVal = map(sin(transparency), -1, 1, 80, 180);
      
      transparency += 1;
      
      stroke(r, g, b, alphaVal);
      
      let angle = 360 / symmetry;
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        
        //let d = dist(mx, my, pmx, pmy);
        //let sw = map(d, 0, 16, 16, 2);
        let sw = strokeSlider.value();
        strokeWeight(sw);
        line(mx, my, pmx, pmy);
        
        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
    }
  }
}