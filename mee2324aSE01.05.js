//header comment

//declare variables
let colorPicker; //variable used to access the ColorPicker control
let clearButton; //variable used to access the Button control
let shapeSelector; //variable used to access the dropdown Select control
let sizeSlider; //variable used to access the Slider control
let imageSelector; //variable used to access a Select dropdown control for images
let controlsContainer; //this is an html section in the index.html file!
let sliderValue; //this is the value of the slider which sets the paintbrush size
let currentShape = "draw"; //variable to decide the shape of the paintbrush
let images = []; //collection of images that you can draw on
let currentImage; //the image selected to draw on
let selectedImage; //currently selected image

//create an array of objects with two fields, file and description 
//#0.1 enter the following array code into *AI* to have it explain it to you
//#0.2 Find 5 images for your theme and load them into the assets folder
let imageFiles = [
  { file: './assets/cedric.png', 
   description: 'Cedric - A Brave Competitor' },
  { file: './assets/hermione.png', 
   description: 'Hermione - The Brightest Witch' },
  { file: './assets/hogwarts parchment.png', 
   description: 'Hogwarts Parchment - The Magical School' },
  { file: './assets/marauders map title.png', 
   description: 'Marauders Map - The Mischievous Guide' },
  { file: './assets/severus-snape.png', 
   description: 'Severus Snape - A Complex Soul' }
];

//preload images for asynchronous web
//#1.1 enter the following code into *AI* to explain it to you
function preload() {
  for (let file of imageFiles){
    images.push(loadImage(file.file)); //load each image
  }
} //end function preload()

//initialize variables and setup program
function setup() {
  //update the title in the index.html file from Processing!
  let bannerDiv = select('#app-header');
  bannerDiv.html('Friends Drawing Program'); //#2 Change to your themed title
  
  let canvas = createCanvas(windowWidth, windowHeight-200);
  let canvasContainer = select("#canvasContainer");
  canvas.parent("canvasContainer");
  
  let controlsContainer = select("#controlsContainer1"); //look in the index.html file
  let controlsContainer2 = select("#controlsContainer2"); //look in the index.html file
  background(255);

  //create a color picker
  colorPicker = createColorPicker("#D22630"); //#3.1 Change the default color
  colorPicker.parent(controlsContainer);
  
  //create a clear button
  clearButton = createButton("Clear").parent(controlsContainer);
  clearButton.mousePressed(clearCanvas); //assign a function

  //create a shape selector dropdown
  //*** createSelect() ***//
  shapeSelector = createSelect().parent(controlsContainer);
  //add the dropdown options!
  shapeSelector.option("draw");
  shapeSelector.option("circle");
  shapeSelector.option("square");
  shapeSelector.option("triangle");
  shapeSelector.option("diamond");

  //create a size slider
  sizeSlider = createSlider(1, 100, 5).parent(controlsContainer2);
  
  //create a paragraph for slider value display
  sliderValueDisplay = createSpan("size: " + sizeSlider.value()).parent(
    controlsContainer2
  );
  sliderValueDisplay.style("margin-left", "10px"); //add margin for spacing
  sliderValueDisplay.style("flex-shrink", "0"); //prevent the span from shrinking

  //*** getting value from slider to label ***//
  sizeSlider.input(() => {
    sliderValueDisplay.html("size: " + sizeSlider.value());
  });
  
  //create a transparency slider
  transSlider = createSlider(0, 255, 255).parent(controlsContainer2);
  
  //create a paragraph for slider value display
  transValueDisplay = createSpan("transparency: " + transSlider.value()).parent(
    controlsContainer2
  );
  sliderValueDisplay.style("margin-left", "10px"); //add margin for spacing
  sliderValueDisplay.style("flex-shrink", "0"); //prevent the span from shrinking

  //*** getting value from slider to label ***//
  transSlider.input(() => {
    transValueDisplay.html("transparency: " + transSlider.value());
  });

  //create an image selector dropdown
  imageSelector = createSelect().parent(controlsContainer);
  //populate image selector (assuming you have an array of image names)
  //populate the selector with options using descriptions
  imageFiles.forEach((file, index) => {
    imageSelector.option(file.description, index.toString());
  });

  imageSelector.changed(onImageSelect); //event handler for selection

} //end function setup()

//use variables to have fun
function draw() {
  if (mouseIsPressed) {
    drawShape();
  }
} //end function draw()

//draw the selected shape
//*** drawShape() ***//
function drawShape() {
  let size = sizeSlider.value();
  let currentColor = colorPicker.color();
  currentColor.setAlpha(transSlider.value());
  fill(currentColor);
  noStroke();
  
  //*** switch ***// 
  switch (shapeSelector.value()) {
    case "draw":
      stroke(currentColor);
      strokeWeight(size);
      line(pmouseX, pmouseY, mouseX, mouseY);
      break;
    case "circle":
      ellipse(mouseX, mouseY, size, size);
      break;
    case "square":
      rect(mouseX, mouseY, size, size);
      break;
    case "triangle":
      triangle(
        mouseX, mouseY,
        mouseX + size, mouseY,
        mouseX + size / 2, mouseY - size
      );
      break;
    case "diamond":
      quad(
        mouseX, mouseY - size / 2,
        mouseX + size / 2, mouseY,
        mouseX, mouseY + size / 2,
        mouseX - size / 2, mouseY
      );
      break;
  }
} //end function drawShape()

//clear the canvas
function clearCanvas() {
  clear();
  background(255);
} //end function clearCanvas()

//function to handle image selection - this function is mapped to the control
function onImageSelect() {
  const selectedIndex = parseInt(imageSelector.value(), 10);
  selectedImage = images[selectedIndex];
  clearCanvas();
  //displaying the image at width, height below changes the image. 
  //build an algorithm to set the height or width in the resize function.
  image(selectedImage, 0, 0, width, height);
}//end function onImageSelect()

