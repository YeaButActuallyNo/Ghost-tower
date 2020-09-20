var PLAY = 1;
var END = 0;
var state = PLAY; 

var ghost, ghost_image; 
var tower, tower_image;
var climber, door, climber_image, door_image;
var invisclimber, invis_image;
var climberGroup, doorGroup, invisGroup;

function preload(){
  ghost_image = loadImage("ghost-standing.png");
  tower_image = loadImage("tower.png")
  climber_image = loadImage("climber.png");
  door_image = loadImage("door.png");
}
  
function setup(){
  createCanvas(400, 400);
  
  tower = createSprite(200, 200, 20, 20);
  tower.addImage("towerImage", tower_image);
  tower.scale = 0.7;
  tower.y = tower.height/2;
  
  ghost = createSprite(200, 200, 20, 20);
  ghost.addImage("ghostImage", ghost_image);
  ghost.scale = 0.3;
  
  climberGroup = createGroup();
  doorGroup = createGroup();
  invisGroup = createGroup();
}

function draw(){
  background("white");
  if(state === PLAY){
    ghost.collide(climberGroup);

    tower.velocityY = 3;

    if(tower.y > 400){
      tower.y = 200;
    }

    ghost.velocityY = 4;
    if(keyDown("space")){
      ghost.velocityY = -6;
    }

    climberSpawn();
    movement();

    if(ghost.isTouching(climberGroup)){
      state = END;
    }
  }
  if(state === END){
    background("black");
    tower.destroy();
    textSize(width/10);
    textFont("Georgia");
    text("Game over", width/3.5, height/2);
  }
  
  drawSprites(); 
}
function movement(){
  if(keyDown("right")){
    ghost.velocityX = 2;
  }
  if(keyDown("left")){
    ghost.velocityX = -2;
  }
}
function climberSpawn(){
  
  if(frameCount%60 === 0){
  door = createSprite(200, 0, 20, 20);
  door.addImage("doorImage", door_image);
  door. scale = 0.8;
  door.x = Math.round(random(30,360));
  door.velocityY = 4;
  door.lifetime = 100;
  doorGroup.add(door);
  
  climber = createSprite(door.x, door.y + 60, 20, 20);
  climber.addImage("climberImage", climber_image);
  climber.velocityY = 4;
  climber.lifetime = 100;
  climberGroup.add(climber);
    
  invisclimber = createSprite(door.x, door.y + 70, 20, 5);
  invisclimber.visible = false;
  invisGroup.add(invisclimber);
  
  }

}