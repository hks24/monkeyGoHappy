var backImage,backgr;
var player, player_running;
var ground,ground_img;
var score;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(350,200,20,20);
  gameOver.addImage(gameOverImg);
  


  bananaGroup = new Group();
  obstacleGroup = new Group();
  score = 0;
  
}

function draw() { 
  background(0);

  

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(player.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      player.scale = player.scale+0.02;
    }

    if(player.isTouching(obstacleGroup)){
      gameState = END;
    }

    gameOver.visible = false;

    if(frameCount%30===0){
      score = score + 1;
    }

  }

  if(gameState === END){
    player.visible = false;
    obstacleGroup.visible = false;
    bananaGroup.visible = false;
    backgr.velocityX = 0

    gameOver.visible = true;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);

    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

   
  }
  spawnBananas();
  spawnObstacles();
  drawSprites();

  textSize(25);
  stroke("black");
  fill("black");
  text("Survival Time = "+score,500,30);
}

function spawnBananas(){
  if(frameCount%160===0){
    banana1 = createSprite(1000,random(170,230),10,40);
   banana1.addImage(bananaImage);
    banana1.velocityX = -5;
    banana1.scale = 0.07
    
    bananaGroup.add(banana1);
    
  }
}

function spawnObstacles(){
  if(frameCount%200===0){
    obstacle1 = createSprite(1000,320,10,40);
   obstacle1.addImage(obstacleImage);
    obstacle1.velocityX = -5;
    obstacle1.scale = 0.25
    
    obstacleGroup.add(obstacle1);
    
  }
}
