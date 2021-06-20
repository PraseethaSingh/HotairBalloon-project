

var balloon1,balloonImage1,balloonImage2;
// create database and position variable here


function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon1=createSprite(250,650,150,150);
  balloon1.addAnimation("hotAirBalloon",balloonImage2);
  balloon1.scale=0.5;

  var hotairballoonposition = database.ref('balloon/position')
  hotairballoonposition.on("value",readPosition,showError)
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon1.addAnimation("hotAirBalloon",balloonImage2);
    updatePosition(-10,0)
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(10,0)
    balloon1.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0,-10)
    balloon1.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction


  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0,10)
    balloon1.addAnimation("hotAirBalloon",balloonImage2);

  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function updatePosition(x,y){
  database.ref("balloon/position").set({ 
         x:position.x+x,
          y:position.y+y
      })
}
function readPosition(data){
  //database.ref("balloon/position").set({ 
  position = data.val();
  console.log(position);
  balloon1.x=position.x;
  balloon1.y=position.y;
//})
}
function showError(){
  console.log("Error in the code");    
}