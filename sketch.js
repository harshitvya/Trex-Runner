var trex,trun,tdead;
var ground1,ground,ground2,groundimg,iground;
var bg,bgimg;
var cactus,cactusimg,cactusg;
var cloud,cloudimg,cloudg;
var score = 0;
var play = 1;
var end = 0;
var gamestate = 1;
var go,goimg,r,rimg;
var os,js,cps;

function preload(){
    trun = loadAnimation("run 1.png","run 2.png","run 3.png","run 4.png","run 5.png","run 6.png","run 7.png","run 8.png");

  tdead = loadAnimation("dead.png");
  cactusimg = loadImage("cactus.png");
  cloudimg = loadImage("cloud.png");
  bgimg = loadImage("bg.jpg");
  groundimg = loadImage("ground.png");
  rimg = loadImage("r.png");
  goimg = loadImage("go.png");
  cps = loadSound("checkPoint.mp3");
  js = loadSound("jump.mp3");
  os = loadSound("die.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  
  bg = createSprite(width/2,height/2);
  bg.addImage(bgimg);
  bg.scale = 1.8;
  bg.setCollider("circle",-100,0,200);
  
  ground = createSprite(windowWidth-700,windowHeight);
  ground.addImage(groundimg);
  ground.scale = 2;
  ground1 = createSprite(windowWidth-600,windowHeight);
  ground1.addImage(groundimg);
  ground1.scale = 2;
  ground2 = createSprite(windowWidth-500,windowHeight);
  ground2.addImage(groundimg);
  ground2.scale = 2;
  
  trex = createSprite(windowWidth/7.4,windowHeight-500);
  trex.addAnimation("trun",trun);
  trex.addAnimation("tdead",tdead);
  trex.scale = 0.3;
  trex.setCollider("circle",-60,30,10);
  //trex.debug = true;
  r = createSprite(windowWidth/2,windowHeight/1.1);
  r.addImage(rimg);
  r.scale = 0.5;
  go = createSprite(windowWidth/2,windowHeight/1.7);
  go.addImage(goimg);
  go.scale = 0.5;

  
  
  iground = createSprite(windowWidth,windowHeight,80000,200);
  iground.visible = false;
  
  cactusg = new Group();
  cloudg = new Group();
}

function draw(){
  background(0);
  drawSprites();
  
  if(gamestate === play){
    if((keyDown("space")||touches.length>0)&&trex.collide(iground)){
     trex.velocityY = -14;
     js.play();
     touches = [];
  }

    trex.velocityY = trex.velocityY + 0.5; 
    ground.velocityX = -(7 + score/50);
    if(ground.x < 350){
      ground.x = 600;
    }
    ground2.velocityX = -(7 + score/50);
    if(ground2.x < 800){
      ground2.x = 900;
    }
    ground1.velocityX = -(7 + score/50);
    if(ground1.x < -2){
      ground1.x = 200;
    }
    Cactus();
    Cloud();
    if(trex.isTouching(cactusg)){
      gamestate = end;
      os.play();
    }
    if(score%100===0 && score > 0){
      cps.play();     
    }
    if(frameCount%10===0){
      score++;
    }
    go.visible = false;
    r.visible = false;
  }
  
  if(gamestate === end){
    trex.changeAnimation("tdead",tdead);
    cloudg.setVelocityXEach(0);
    cloudg.setLifetimeEach(-1);
    cactusg.setVelocityXEach(0);
    cactusg.setLifetimeEach(-1);
    trex.velocityY = 0;
    ground.velocityX = 0;
    ground1.velocityX = 0;
    ground2.velocityX = 0;
    go.visible = true;
    r.visible = true;
    if(mousePressedOver(r)||touches.length>0){
      cloudg.destroyEach();
      cactusg.destroyEach();
      trex.changeAnimation("trun",trun);
      score = 0;
      gamestate = play;
      touches = [];
    }
  }
  textSize(50);
  fill(0)
  text("Score : "+score,windowWidth/2.4,windowHeight/9)
  trex.collide(iground);  
}

function Cactus(){
  if (frameCount % 150 === 0){
   var cactus = createSprite(windowWidth,windowHeight-120,10,40);
   cactus.velocityX = -(7 + score/50);
   cactus.addImage(cactusimg);          
   cactus.scale = 0.3;
   cactus.lifetime = 400; 
   cactusg.add(cactus);
 }
}

function Cloud(){
  if (frameCount % 80 === 0) {
    cloud = createSprite(windowWidth,windowHeight,40,10);
    cloud.y = Math.round(random(100,200));
    cloud.addImage(cloudimg);
    cloud.scale = 0.15;
    cloud.velocityX = -(5 + score/50);
    cloud.lifetime = 400;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudg.add(cloud);
  }
}







