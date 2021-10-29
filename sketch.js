const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var engine, world;

var gameState = 0;

var boyM;
var score=0;

var isMoving = false;

function preload(){
	groundL = loadImage("img/ground.png");
	bgH = loadImage("img/bg.jpg");
	stageG = loadImage("img/stage.png");
	standR = loadImage("img/R.png");
	standL = loadImage("img/L.png");
	boyR = loadAnimation("img/b1.png","img/b2.png","img/b3.png","img/b4.png","img/b5.png","img/b6.png","img/b7.png","img/b8.png","img/b9.png","img/b10.png","img/b11.png","img/b12.png","img/b13.png")
	boyL = loadAnimation("img/l1.png","img/l2.png","img/l3.png","img/l4.png","img/l5.png","img/l6.png","img/l7.png","img/l8.png","img/l9.png","img/l10.png","img/l11.png","img/l12.png","img/l13.png")
	jumpR = loadAnimation("img/jr1.png","img/jr2.png","img/jr3.png","img/jr4.png","img/jr5.png","img/jr6.png","img/jr7.png","img/jr8.png","img/jr9.png","img/jr10.png","img/jr11.png","img/jr12.png","img/jr13.png","img/jr14.png","img/jr15.png","img/jr16.png","img/jr17.png")
	jumpR.frameDelay = 5;
	jumpL = loadAnimation("img/jl1.png","img/jl2.png","img/jl3.png","img/jl4.png","img/jl5.png","img/jl6.png","img/jl7.png","img/jl8.png","img/jl9.png","img/jl10.png","img/jl11.png","img/jl12.png","img/jl13.png","img/jl14.png","img/jl15.png","img/jl16.png","img/jl17.png",)
	monkeyM = loadAnimation("img/1.png","img/2.png","img/3.png","img/4.png","img/5.png","img/6.png","img/7.png","img/8.png","img/9.png","img/10.png","img/11.png","img/12.png","img/13.png","img/14.png","img/15.png","img/16.png")
	obstI1 = loadImage("img/obstacle1.png");
	obstI2 = loadImage("img/obstacle2.png");
	obstI3 = loadImage("img/obstacle3.png");
	obstI4 = loadAnimation("img/ring.png","img/ring1.png","img/ring2.png","img/ring3.png","img/ring4.png",);
	obstI4.frameDelay = 1
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	engine = Engine.create();
	world = engine.world;

	backGround = createSprite(windowWidth/2+29300, windowHeight-440, 1500, 20)
	backGround.addImage(bgH);

	ground = createSprite(windowWidth/2, windowHeight-60, 30000, 20);
	ground.visible = false;

	wallR = createSprite(windowWidth-600, windowHeight/2, 10, 5000);
	wallR.visible = false;

	wallL = createSprite(windowWidth/2-600, windowHeight/2, 10, 5000);
	wallL.visible = false;

	boy = createSprite(windowWidth/2-400, windowHeight-120, 20 ,20)
	boy.addAnimation("standR", standR)
	boy.addAnimation("moveR", boyR);
	boy.addAnimation("moveL", boyL);
	boy.addAnimation("jumpR", jumpR);
	boy.scale = 1
	boy.debug = false;
	boy.setCollider("rectangle", -7,0, 70, 100);

	
	Engine.run(engine);
}


function draw() {
  background("black");
  //boy.changeAnimation("standR", standR);
  backGround.velocityX = 0;

  boy.collide(wallR)
  boy.collide(wallL)
  boy.collide(ground)
  

 //if(boy.isTouching(wallR)){
	  //backGround.velocity = -5;
 //}
  
  if(keyDown ("RIGHT_ARROW")){
	boy.x = boy.x +5;
	boy.changeAnimation("moveR", boyR);
	backGround.velocityX = -5;
	isMoving = true;
}

if(keyDown ("LEFT_ARROW")){
	boy.x = boy.x -5;
	boy.changeAnimation("moveL", boyL);
	isMoving = true;
}

if(keyDown ("SPACE")){
	//boy.changeAnimation("jumpR", jumpR)
	//jumpR.looping = true;
	boy.velocityY = -10;
	//boy.frameDelay = 20
	boy.changeAnimation("standR", standR);
	isMoving = true;
}
boy.velocityY = boy.velocityY +0.5

//rand = Math.round(1,3);

var obstacles = Math.round(random(1,4))

if(frameCount %100 === 0 && isMoving === true){
	 if(obstacles == 1){
		 spwanObstacle1();
	 }else if(obstacles == 2){
		 spwanObstacle2();
	 }else if(obstacles == 3){
		 spwanObstacle3();
	 }else {
		 spwanObstacle4();
	 }
}

//if(boy.x > windowWidth/2){
//	
//}

fill("black");
text("Score: "+ score, windowWidth/2, windowHeight/2)

  stage();
  //spwanObstacle4();
  drawSprites();

}

//A 97
//D 100
//W 119
//S 115
//65

//function keyPressed(){
//if(keyCode("space")&& boy.y > windowHeight-500){
//	boy.velocityY = -10;
//	boy.changeAnimation("jumpR", jumpR);
// }
//}

function stage(){
	if(frameCount %80 === 0){
		stage1 = createSprite(windowWidth+200, windowHeight-300, 300, 20)
	    stage1.addImage(stageG);
		stage1.y = random(windowHeight-200);
		stage1.velocityX = -4;
		stage1.debug = false;
		stage1.setCollider("rectangle", 0,0, 200,80)
		boy.collide(stage1)
		
	}
	
 }


 function spwanObstacle1(){
	 obstacle1 = createSprite(windowWidth-100, windowHeight-100, 40, 50);
	 obstacle1.addImage(obstI1);
	 obstacle1.scale = 0.6;
	 obstacle1.velocityX = -5

 }

 function spwanObstacle2(){
	 obstacle2 = createSprite(windowWidth, windowHeight-100, 40, 50);
	 obstacle2.addImage(obstI2);
	 obstacle2.scale = 0.6;
	 obstacle2.velocityX = -5

 }

 function spwanObstacle3(){
	 obstacle3 = createSprite(windowWidth, windowHeight-100, 40, 50);
	 obstacle3.addImage(obstI3);
	 obstacle3.scale = 0.6;
	 obstacle3.velocityX = -5

 }

 function spwanObstacle4(){
	 obstacle4 = createSprite(windowWidth, windowHeight-110, 40, 50);
	 obstacle4.addAnimation("ring",obstI4);
	 obstacle4.scale = 0.4;
	 obstacle4.velocityX = -5
	 
 }