
var backgroundImg;
var balloon1;
var database;

function preload() {

  backgroundImg = loadImage("city.jpg");
  bImg = loadImage("balloon.jpg");
}

function setup() {
  createCanvas(1200,800);
  database = firebase.database();
 

}

function draw() {

  balloon1 = createSprite(200,200,200,200);
  balloon1.addImage(bImg);
  background(backgroundImg);  

  if(keyDown(LEFT_ARROW)) {
    balloon1.x = balloon1.x -10;
  }
  else if(keyDown(RIGHT_ARROW)) {
    balloon1.x = balloon1.x + 10;
  }
  else if(keyDown(UP_ARROW)) {
    balloon1.y = balloon1.y - 10;
  }
  else if(keyDown(DOWN_ARROW)) {
    balloon1.y = balloon1.y + 10;
  }

  var balloon1Position=database.ref('balloon1/height');
  balloon1Position.on("value",readPosition, showError);

  drawSprites();

}

function updateHeight(x,y) {
  database.ref('balloon1/height').set({
    'x': height.x + x,
    'y': height.y + y
})
}

function readHeight(data) {
  height = data.val();
  balloon1.x = height.x;
  balloon1.y = height.y;
}

function showError() {
  console.log("Errror in updating dataBase");
}