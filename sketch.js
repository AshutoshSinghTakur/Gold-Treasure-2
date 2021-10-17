const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var engine, world;

var standIMG, boyM;
var boyS, boy1, boy2, boy3, boy4, boy5, boy6, boy7, boy8;

function preload()
{
	
	standIMG = loadImage("img/BoyS.png");
 	boyM = loadAnimation("img/Boy1.png", "img/Boy2.png", "img/Boy3.png",  "img/Boy4.png", "img/Boy5.png", "img/Boy6.png", "img/Boy7.png", "img/Boy8.png");
}

function setup() {
	createCanvas(1000,600);

	boy1 = createSprite(100,500,50,50);
	boy1.addAnimation("walking",boyM);
	boy1.scale = 0.2;
	//fairy.setCollider();
 

	engine = Engine.create();
	world = engine.world;

	
	Engine.run(engine);
}


function draw() {
  background("black");



  drawSprites();

}

function keyPressed() {

}



