const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var engine, world;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boyM;
var distance = 0;
var score1 =0;
var score = 0;
var count = 3;

var coin, scoin, bcoin;

var isMoving = false;

function preload(){
	//BackGround & Ground
	groundL = loadImage("img/ground.png");
	bgH = loadImage("img/bg.jpg");
	//stage
	stageG = loadImage("img/stage.png");
	standR = loadImage("img/R.png");
	standL = loadImage("img/L.png");
	//boy left & right stand Animation 
	boyR = loadAnimation("img/b1.png","img/b2.png","img/b3.png","img/b4.png","img/b5.png","img/b6.png","img/b7.png","img/b8.png","img/b9.png","img/b10.png","img/b11.png","img/b12.png","img/b13.png")
	boyL = loadAnimation("img/l1.png","img/l2.png","img/l3.png","img/l4.png","img/l5.png","img/l6.png","img/l7.png","img/l8.png","img/l9.png","img/l10.png","img/l11.png","img/l12.png","img/l13.png")
	//boy jump left & right Animation
	jumpR = loadAnimation("img/jr1.png","img/jr2.png","img/jr3.png","img/jr4.png","img/jr5.png","img/jr6.png","img/jr7.png","img/jr8.png","img/jr9.png","img/jr10.png","img/jr11.png","img/jr12.png","img/jr13.png","img/jr14.png","img/jr15.png","img/jr16.png","img/jr17.png")
	jumpR.frameDelay = 5;
	jumpL = loadAnimation("img/jl1.png","img/jl2.png","img/jl3.png","img/jl4.png","img/jl5.png","img/jl6.png","img/jl7.png","img/jl8.png","img/jl9.png","img/jl10.png","img/jl11.png","img/jl12.png","img/jl13.png","img/jl14.png","img/jl15.png","img/jl16.png","img/jl17.png",)
	//damage Image
	damageI = loadAnimation("img/damage.png");
	// damageI.frameDelay = 0.005
	//death animation
	deathI = loadAnimation("img/dl1.png","img/dl2.png","img/dl3.png","img/dl4.png","img/dl5.png","img/dl6.png",)
	deathI.islooping = false;
	//obstcles
	obstI1 = loadImage("img/obstacle1.png");
	obstI2 = loadImage("img/obstacle2.png");
	obstI3 = loadImage("img/obstacle3.png");
	obstI4 = loadAnimation("img/ring.png","img/ring1.png","img/ring2.png","img/ring3.png","img/ring4.png",);
	obstI4.frameDelay = 1
	obstI5 = loadAnimation("img/Fireball1.png","img/Fireball2.png","img/Fireball3.png","img/Fireball4.png")
	obstI6 = loadAnimation("img/p1.png","img/p2.png","img/p3.png","img/p4.png","img/p5.png","img/p6.png","img/p7.png","img/p8.png","img/p9.png")
	//coin Images & Animaiton
	coinY = loadAnimation("img/y1.png","img/y2.png","img/y3.png","img/y4.png","img/y5.png","img/y6.png","img/y7.png","img/y8.png","img/y9.png",)
	coinA = loadAnimation("img/c1.png","img/c2.png","img/c3.png","img/c4.png","img/c5.png","img/c6.png","img/c7.png","img/c8.png",)
	coinG = loadImage("img/c1.png");
	coinGY = loadImage("img/y1.png");
	//Treasure
	treasureGr = loadAnimation("img/green1.png","img/green2.png","img/green3.png")
	treasureGo = loadAnimation("img/gold1.png","img/gold2.png","img/gold3.png")
	//life
	life = loadImage("img/life.png");
	//distance
	distanceI = loadImage("img/distance.png");
	//total
	totalI = loadImage("img/total.png");
	//game over & restart
	gameoverI = loadImage("img/gameOver.png");
	restartI = loadImage("img/restart.png");
	//Game Sounds
	scoin = loadSound("spoint.mp3");
	dCoin = loadSound("simpleCoin.mp3")
	damageS = loadSound("damage.mp3");
	gameOverS = loadSound("gameOver.mp3");
	treaS = loadSound("fS.mp3");
	treaB = loadSound("fB.mp3");

}

function setup() {
	createCanvas(windowWidth, windowHeight);
	engine = Engine.create();
	world = engine.world;

	//backGroud & Ground
	back = createSprite(windowWidth/2+29300, windowHeight-440, 1500, 20)
	back.addImage(bgH);

	ground = createSprite(windowWidth/2, windowHeight-60, 30000, 20);
	ground.visible = false;

	//Right wall & Left Wall
	wallR = createSprite(windowWidth-600, windowHeight/2, 10, 5000);
	wallR.visible = false;

	wallL = createSprite(windowWidth/2-600, windowHeight/2, 10, 5000);
	wallL.visible = false;

	wallT = createSprite(windowWidth/2, windowHeight/2-380, 5000, 10);
	wallT.visible = false;
	
	//side score simple coin
	coinP = createSprite(windowWidth/2-630, windowHeight/2-220, 40, 40);
	coinP.addImage(coinG);
	coinP.scale = 0.9
	coinP.visible = true;

	//side score bonus coin
	coinBP = createSprite(windowWidth/2-630, windowHeight/2-290, 40, 40);
	coinBP.addImage(coinGY);
	coinBP.scale = 0.3
	coinBP.visible = true;

	
	//distance sprite
	distanceS = createSprite(windowWidth/2-450, windowHeight/2-300, 40, 40);
	distanceS.addImage(distanceI);
	
	//3 life line
	life1 = createSprite(windowWidth-150, windowHeight/2-300, 40, 40);
	life1.addImage(life);
	life1.scale = 0.1

	life2 = createSprite(windowWidth-100, windowHeight/2-300, 40, 40);
	life2.addImage(life);
	life2.scale = 0.1
	
	life3 = createSprite(windowWidth-50, windowHeight/2-300, 40, 40);
	life3.addImage(life);
	life3.scale = 0.1

	//boy Animation & sprite
	boy = createSprite(windowWidth/2-400, windowHeight-120, 20 ,20)
	boy.addAnimation("standR", standR)
	boy.addAnimation("moveR", boyR);
	boy.addAnimation("moveL", boyL);
	boy.addAnimation("jumpR", jumpR);
	boy.addAnimation("death", deathI);
	boy.addAnimation("back", damageI);
	boy.scale = 1
	boy.debug = false;
	boy.setCollider("rectangle", -7,0, 70, 100);

	//game Over
	gameOver = createSprite(windowWidth/2, windowHeight/2-150, 40, 40);
	gameOver.addImage(gameoverI);
	gameOver.scale = 0.7
	gameOver.visible = false;

	//restart
	restart = createSprite(windowWidth/2, windowHeight/2+150, 40, 40);
	restart.addImage(restartI);
	restart.scale = 0.8
	restart.visible = false;
	restart.debug = false;
	restart.setCollider("rectangle", 0,0, 500, 150)

	//Create Group
	stageGroup = new Group();
	//coin group
	coinSGroup = new Group();
	coinBGroup = new Group();
	coinSDGroup = new Group();
	coinBDGroup = new Group();
	//treasure Group
	treasure1Group = new Group();
	treasure2Group = new Group();
	treasure3Group = new Group();
	treasure4Group = new Group();
	//obstacle Group
	obstacleGroup = new Group();
	obstacleBGroup = new Group();
	
	
	Engine.run(engine);
}


function draw() {
  background("black");

  boy.changeAnimation("standR", standR);
  boy.velocityX = 0;

  if(gameState === PLAY){

  back.velocityX = 0

  	life1.visible = true;
	life2.visible = true;
	life3.visible = true;

//  backGround.velocityX = -(5 + distance/200)

//f(distance/200){
//	backGround.velocityX = -5
//

  boy.collide(wallR)
  boy.collide(wallL)
  boy.collide(wallT)
  boy.collide(ground)
  boy.collide(stageGroup); 
  
  if(keyDown ("RIGHT_ARROW") || keyDown ("D")){
	boy.x = boy.x +5;
	boy.changeAnimation("moveR", boyR);
	back.velocityX = -(4 + distance/200)
	distance = distance + Math.round(getFrameRate()/50)
	isMoving = true;
}

if(keyDown ("LEFT_ARROW") || keyDown ("A")){
	boy.x = boy.x -5;
	boy.changeAnimation("moveL", boyL);
	isMoving = true;
}

if(keyDown ("SPACE") && boy.y > windowHeight/2+150 ||
   keyDown ("UP_ARROW") && boy.y > windowHeight/2+50){
	//boy.changeAnimation("jumpR", jumpR)
	//jumpR.looping = true;
	boy.velocityY = -10;
	//boy.frameDelay = 20
	boy.changeAnimation("standR", standR);
	isMoving = true;
}
boy.velocityY = boy.velocityY +0.5




//obstacles come automaticaly
var obstacles = Math.round(random(1,5))

if(frameCount %100 === 0 && isMoving === true){
	 if(obstacles == 1){
		 spwanObstacle1();
	 }else if(obstacles == 2){
		 spwanObstacle2();
	 }else if(obstacles == 3){
		 spwanObstacle3();
	 }else if(obstacles == 4){
		 spwanObstacle4();
	 }else {
		 spwanObstacle5();
	 }
}

if(boy.isTouching(obstacleGroup)){
	boy.x = boy.x -50
	//boy.changeAnimation("back", damageI);
	for (let i = 0; i< obstacleGroup.length; i++){
		obstacleGroup[i].remove();
	}
	count = count -1
	if(count === 2){
		damageS.play();
		life1.destroy();
	}if(count === 1){
		damageS.play();
	    life2.destroy();
	}if(count === 0){
		damageS.play();
		life3.destroy();
	}if(count < 0){
		gameOverS.play();
		gameState = END;
	}
}

if(boy.isTouching(obstacleBGroup)){
	boy.x = boy.x -50

	for (let i = 0; i < obstacleBGroup.length; i++){
		obstacleBGroup[i].remove();
	}
	count = count -1
	if(count === 2){
		damageS.play();
		life1.destroy();
	}if(count === 1){
		damageS.play();
		life2.destroy();
	}if(count === 0){
		damageS.play();
		life3.destroy();
	}if(count < 0){
		gameOverS.play();
		gameState = END;
	}
}

spwanStage();

var coins = Math.round(random(1,8));

if(frameCount % 200 === 0){
	if(coins == 1 || coins == 2 || coins == 3){
		spwanUSimpleCoin();
	}else if(coins == 4){
		spwanUBonusCoin();
	}else if(coins == 5 || coins == 6 || coins == 7){
		spwanDSimpleCoin();
	}else {
		spwanDBonusCoin();
	}
}   

var treasures = Math.round(random(1,6));

if(frameCount % 600 === 0){
	if(treasures == 1 || treasures == 2){
		spwanUTreasure1();
	}else if(treasures == 3){
		spwanUTreasure2();
	}else if(treasures == 4 || treasures == 5){
		spawnDTreasure3();
	}else {
		spwanDTreasure4();
	}
}

if(boy.isTouching(coinSGroup)){
	scoin.play();
	score1 = score1 +5
	for (let i = 0; i < coinSGroup.length; i++) {

		coinSGroup[i].remove();
	 }
}

if(boy.isTouching(coinBGroup)){
	dCoin.play();
	score = score +10
	for (let i = 0; i< coinBGroup.length; i++){

		coinBGroup[i].remove();

	}
}

if(boy.isTouching(coinSDGroup)){
	scoin.play();
	score1 = score1 +5
	for (let i = 0; i< coinSDGroup.length; i++){
		coinSDGroup[i].remove();
	}
}

if(boy.isTouching(coinBDGroup)){
	dCoin.play();
	score = score +10
	for (let i = 0; i< coinBDGroup.length; i++){
		coinBDGroup[i].remove();
	}
}

if(boy.isTouching(treasure1Group)){
	treaS.play();
	score1 = score1 +50
	for (let i = 0; i< treasure1Group.length; i++){
		treasure1Group[i].remove();
	}
}

if(boy.isTouching(treasure2Group)){
	treaB.play();
	score = score +100
	for (let i = 0; i< treasure2Group.length; i++){
		treasure2Group[i].remove();
	}
}

if(boy.isTouching(treasure3Group)){
	treaS.play();
	score1 = score1 +50
	for (let i = 0; i< treasure3Group.length; i++){
		treasure3Group[i].remove();
	}
}

if(boy.isTouching(treasure4Group)){
	treaB.play();
	score = score +100
	for (let i = 0; i< treasure4Group.length; i++){
		treasure4Group[i].remove();
	}
}

if(back.x > 5000){
	back.x = windowWidth/2
}

 }
 else if(gameState === END){

	back.velocityX = 0
	boy.velocityX = 0;
	boy.velocityY = +5;

	boy.collide(ground);

	life1.visible = false;
	life2.visible = false;
	life3.visible = false;

	gameOver.visible = true;
	restart.visible = true;

	boy.changeAnimation("death", deathI);
	boy.islooping = false
	obstacleBGroup.destroyEach();
	obstacleGroup.destroyEach();
	coinBGroup.destroyEach();
	coinSGroup.destroyEach();
	coinBDGroup.destroyEach();
	coinSDGroup.destroyEach();
	treasure1Group.destroyEach();
	treasure2Group.destroyEach();
	treasure3Group.destroyEach();
	treasure4Group.destroyEach();
	stageGroup.destroyEach();

	if(mousePressedOver(restart)){
		reset();
	}

 }

  spwanBird();
  //spwanDBonusCoin();
  //spwanDSimpleCoin();
  drawSprites();

  fill("black");
  textSize(20);
  text(" : "+ score1, windowWidth/2-600, windowHeight/2-215)

  fill("black");
  textSize(20);
  text(" : "+ score, windowWidth/2-600,windowHeight/2-285);

  fill("black");
  textSize(20);
  text(" "+ distance, windowWidth/2-375, windowHeight/2-293);

  //textSize(20);
  //text(" "+ score1 + score, windowWidth/2-230, windowHeight/2-290);
}

function reset(){

	gameState = PLAY;

	boy.x = windowWidth/2-400;
	boy.y = windowHeight-120;

	gameOver.visible = false;
	restart.visible =  false;
	life1.visible = true;
	life2.visible = true;
	life3.visible = true;

	obstacleGroup.destroyEach();
	obstacleBGroup.destroyEach();
	coinBGroup.destroyEach();
	coinSGroup.destroyEach();
	coinBDGroup.destroyEach();
	coinSDGroup.destroyEach();
	treasure1Group.destroyEach();
	treasure2Group.destroyEach();
	treasure3Group.destroyEach();
	treasure4Group.destroyEach();
	stageGroup.destroyEach();

	score1 = 0;
	score = 0;
	count = 0;

	distance = 0;
}


function spwanUSimpleCoin(){
	//if(frameCount %180 === 0){
		coinS = createSprite(windowWidth+200, windowHeight-300, 40, 50);
		coinS.addAnimation("coin", coinA);
		coinS.y = random(windowHeight-200);
		coinS.velocityX = -(4 + distance/200)
		coinS.lifetime = 400
		coinS.y = stage1.y -80;
		coinS.x = stage1.x -10

		coinSGroup.add(coinS);
//	}

}

function spwanDSimpleCoin(){
	coinSD = createSprite(windowWidth+200, windowHeight-100, 40, 50)
	coinSD.addAnimation("down Coin", coinA);
	coinSD.velocityX = -(4+ distance/200);
	coinSD.lifetime = 400

	coinSDGroup.add(coinSD);
}

function spwanDBonusCoin(){
	coinBD = createSprite(windowWidth+200, windowHeight-100, 40, 50);
	coinBD.addAnimation("down Bonus", coinY);
	coinBD.velocityX = -(4 + distance/200);
	coinBD.lifetime = 400;
	coinBD.scale = 0.4

	coinBDGroup.add(coinBD)
}

function spwanUBonusCoin(){
	coinB = createSprite(windowWidth+200, windowHeight-300, 40, 50);
	coinB.addAnimation("bonus", coinY);
	coinB.y = random(windowHeight-200);
	coinB.velocityX = -(4 + distance/200)
	coinB.scale = 0.4
	coinB.lifetime = 400
	coinB.y = stage1.y -80;
	coinB.x = stage1.x -10;

	coinBGroup.add(coinB);
	
}

function spwanUTreasure1(){
	greenU = createSprite(windowWidth+200, windowHeight/2, 40, 50);
	greenU.addAnimation("Gr Bounus", treasureGr);
	greenU.velocityX = -(4 + distance/200);
	greenU.scale = 0.35
	greenU.lifetime = 400;
	greenU.debug = false;
	greenU.setCollider("rectangle", 0,0, 230, 250)
	greenU.y = stage1.y -80

	treasure1Group.add(greenU)
}

function spwanUTreasure2(){
	goldU = createSprite(windowWidth+200, windowHeight/2, 40, 50);
	goldU.addAnimation("Go Bonus", treasureGo);
	goldU.velocityX = -(4 + distance/200);
	goldU.scale = 0.35
	goldU.lifetime = 400;
	goldU.debug = false
	goldU.setCollider("rectangle", 0,0, 230, 250)
	goldU.y = stage1.y -80
		
	treasure2Group.add(goldU)
}

function spawnDTreasure3(){
	greenD = createSprite(windowWidth+200, windowHeight-110, 40, 50);
	greenD.addAnimation("down Bouns", treasureGr);
	greenD.velocityX = -(4 + distance/200)
	greenD.scale = 0.35
	greenD.lifetime = 400
	greenD.debug = false;
	greenD.setCollider("rectangle", 0,0, 230, 250);

	treasure3Group.add(greenD);
}

function spwanDTreasure4(){
	goldD = createSprite(windowWidth+200, windowHeight-110, 40, 50);
	goldD.addAnimation("down gold", treasureGo);
	goldD.velocityX = -(4 + distance/200)
	goldD.scale = 0.35
	goldD.lifetime = 400
	goldD.debug = false
	goldD.setCollider("rectangle", 0,0, 230, 250)

	treasure4Group.add(goldD);
}

function spwanStage(){
	if(frameCount %200 === 0){
		stage1 = createSprite(windowWidth+200, windowHeight-300, 300, 20)
	    stage1.addImage(stageG);
		stage1.y = random(100, 450);
		stage1.velocityX = -(4 + distance/200)
		stage1.lifetime = 420
		stage1.debug = false;
		stage1.setCollider("rectangle", -10,0, 200,80)
		boy.collide(stage1);
		
		stageGroup.add(stage1)
	}
	
 }


 function spwanObstacle1(){
	 obstacle1 = createSprite(windowWidth, windowHeight-100, 40, 50);
	 obstacle1.addImage(obstI1);
	 obstacle1.scale = 0.6;
	 obstacle1.velocityX = -(4 + distance/200);
	 obstacle1.lifetime = 400;
	 obstacle1.debug = false;
	 obstacle1.setCollider("rectangle", 0,0, 50, 50)
	 
	 obstacleGroup.add(obstacle1);

 }

 function spwanObstacle2(){
	 obstacle2 = createSprite(windowWidth, windowHeight-100, 40, 50);
	 obstacle2.addImage(obstI2);
	 obstacle2.scale = 0.6;
	 obstacle2.velocityX = -(4 + distance/200);
	 obstacle2.lifetime = 400;
	 obstacle2.debug = false;
	 obstacle2.setCollider("rectangle", 0,0, 50, 50);
	 
	 obstacleGroup.add(obstacle2);

 }

 function spwanObstacle3(){
	 obstacle3 = createSprite(windowWidth, windowHeight-100, 40, 50);
	 obstacle3.addImage(obstI3);
	 obstacle3.scale = 0.6;
	 obstacle3.velocityX = -(4 + distance/200)
	 obstacle3.lifetime = 400;
	 obstacle3.debug = false;
	 obstacle3.setCollider("rectangle", 0,0, 50, 50);
	 
	 obstacleGroup.add(obstacle3);

 }

 function spwanObstacle4(){
	 obstacle4 = createSprite(windowWidth, windowHeight-100, 40, 50);
	 obstacle4.addAnimation("ring",obstI4);
	 obstacle4.scale = 0.4;
	 obstacle4.velocityX = -(5 + distance/200)
	 obstacle4.lifetime = 400;
	 obstacle4.debug = false;
	 obstacle4.setCollider("rectangle", 0,0, 100, 100);
	 
	 obstacleGroup.add(obstacle4);
	 
 }

 function spwanObstacle5(){
	 obstacle5 = createSprite(windowWidth, windowHeight-110, 40, 40);
	 obstacle5.addAnimation("fireball",obstI5);
	 obstacle5.scale = 0.07
	 obstacle5.velocityX = -(4 + distance/200)
	 obstacle5.lifetime = 400;
	 obstacle5.debug = false;
	 obstacle5.setCollider("rectangle", 0,0, 500, 500)
	 
	 obstacleGroup.add(obstacle5);

 }

function spwanBird(){
	 if(frameCount % 350 === 0 && isMoving === true){
		 bird = createSprite(windowWidth, random(50, 400), 40, 40);
		 bird.addAnimation("moving Bird", obstI6);
		 bird.velocityX = -(4 + distance/100)
		 bird.scale = 0.5
		 bird.lifetime = 400;
		 bird.debug = false;
		 bird.setCollider("rectangle", 0,0, 80, 80)

		 if(distance > 50){
			if(frameCount %50 === 0){
				bird
			}
		}

		 obstacleBGroup.add(bird);
	 }
}