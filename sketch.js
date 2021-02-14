var girl,girlImg;
var backGround,houseImg;
var door,doorImg;
var go2,go2Img;
var owl,owlImg;
var invisible;
var PLAY=1;
var gameState=PLAY;
var survivalTime=0;
var END=0;
var START=3;
var gameState=START;
var over,overImg;
var doorSound;
var owlGroup;
var days;
var laughSound;
var scary;
var granny,grannyImg;
var energy,energyImg;
var note,noteImg;
var grandpa,grandpaImg;
var win,winImg;
var invisible,invisibleImg;

function preload(){
  
  houseImg=loadImage("house.png");
  doorImg=loadImage("door.jpeg");
  go2Img=loadImage("go2.jpg");
  girlImg=loadImage("girl.png");
  owlImg=loadImage("hp.png");
  doorSound=loadSound("55.mpeg");
  overImg=loadImage("over.jpg");
  noteImg=loadImage("TEXT.png");
  laughSound=loadSound("LAUGH.wav");
  grannyImg=loadImage("granny.png");
  energyImg=loadImage("energy.png");
  grandpaImg=loadImage("GRANDPA.png");
  winImg=loadImage("w.jpg");
  invisibleImg=loadImage("f.jpg");
}

function setup() {
  
  createCanvas(600, 600);
  
  backGround=createSprite(300,300,20,20);
  backGround.addImage("ghar",houseImg)
  backGround.scale=1;
  
  door=createSprite(500,370,20,20)
  door.addImage("gate",doorImg)
  door.scale=0.3;
  
  go2=createSprite(290,120,20,20)
  go2.addImage("go",go2Img);
  go2.scale=1.5;
  go2.visible=false;
  go2.velocityY=4;
  
  over=createSprite(300,300,20,20)
  over.addImage("over",overImg);
  over.visible=false;
  over.scale=1.1;
 
  girl=createSprite(300,400,20,20);
  girl.addImage("girl",girlImg);
  girl.scale=0.3;
  
  days=5;
  
  invisible=createSprite(300,500,600,20)
  invisible.visible=false;
  invisible.addImage("gh",invisibleImg);
  invisible.scale=2.5;
  
  note=createSprite(300,360,20,20)
  note.addImage("note",noteImg);
  note.visible=true;
  
  win=createSprite(300,300,20,20)
  win.addImage("win",winImg);
  win.scale=0.9;
  win.visible=false;
  
  
  owlGroup=new Group();
  drinkGroup=new Group();
  ghostGroup=new Group();
  grandpaGroup=new Group();
}

function draw() {
  
  girl.velocityX=0;
  girl.velocityY=0;
  
  
  
  if(gameState===START){
    
    if(keyDown("space")){
     note.visible=false;
     gameState=PLAY;
   }

    girl.visible=false;
    drinkGroup.visible=false;
    grandpaGroup.visible=false;
    ghostGroup.visible=false;
    owlGroup.visible=false;
  }
 
   
  if(gameState===1){
    
    girl.visible=true;
    drinkGroup.visible=true;
    ghostGroup.visible=true;
    owlGroup.visible=true;
    
    if(keyDown("right")){
    girl.velocityX=4;
  }
     

  girl.collide(invisible);
  
  if(keyDown("left")){
    girl.velocityX=-4;
  }
  
 if(keyDown("down")){
    girl.velocityY=6;
  }
  
  if(keyDown("up")){
    girl.velocityY=-6;
  }
  
    if(go2.y>600){
    go2.y=go2.height/2;
  }
    
  if(girl.isTouching(door)){
    invisible.visible=true;
    createCanvas(550,700);
    go2.visible=true;
    invisible.x=275;
    invisible.y=660;
    door.destroy();
    doorSound.play();
  } 
    
    if(girl.isTouching(drinkGroup)){
      drinkGroup.destroyEach();
      survivalTime=survivalTime+3;
    }
    

    if(days<1){
    ghostGroup.visible=true;
    }
    
    
    if(ghostGroup.isTouching(girl)||
      grandpaGroup.isTouching(girl)){
      ghostGroup.destroyEach();
      grandpaGroup.destroyEach();
      days=days-1;
    }
    
    if(days<1){
    gameState=0;
    }
  
    
        spawnghost2();
        spawnDrink();
        spawnGranny();  
        spawnOwl();
    
   
    
     if( survivalTime>49){
     win.visible=true;
     owlGroup.setVelocityYEach(0);
     girl.visible=false;
     ghostGroup.destroyEach();         
     owlGroup.setLifetimeEach(0);   
     grandpaGroup.destroyEach();
     drinkGroup.destroyEach();
     createCanvas(600,600);

   }
       
    
    if(girl.isTouching(owlGroup)){
      days=days-1;
      laughSound.play();
      owlGroup.destroyEach();
    
    }
    
  }else if(gameState===0){
  
  go2.velocityY=0;

  owlGroup.setVelocityYEach(0);
  over.visible=true;
  owlGroup.setLifetimeEach(0);
  grandpaGroup.setLifetimeEach(0);
  grandpaGroup.destroyEach();
  drinkGroup.destroyEach();
  drinkGroup.setLifetimeEach(0);
  createCanvas(600,600);
  doorSound.stop();
  
  girl.visible=false;
     
}   

  
  
  drawSprites();
  
  stroke("white");
  fill("white");
  textSize(25);
  text("DAYS : "+days,450,80)  
  text("SCORE:"+survivalTime,80,80);
}

function spawnOwl(){
  
  if(frameCount % 120===0){
  
 var  owl=createSprite(200,10,20,20)
  owl.addImage("owl",owlImg);
  owl.x=random(100,500);
  owl.lifetime=170;
  owl.velocityY=(4+survivalTime/800);
  owl.scale=0.2;
    
    grandpaGroup.depth=owl.depth+0.5;
    girl.depth=owl.depth+2;
    
    owlGroup.add(owl);
  }
}

function spawnghost2(){
   
  if(frameCount%300===0){
  var grandpa=createSprite(600,300,20,20)
  grandpa.addImage("ghost2",grandpaImg);
  grandpa.scale=0.3;
  grandpa.x=Math.round(random(600,350))
  grandpa.velocityX=-5;
  grandpa.lifetime=140;
    
        grandpa.depth=drinkGroup.depth+2;
    grandpaGroup.add(grandpa);
  }
}



function spawnGranny(){
  
  if(frameCount %400===0){
  var granny=createSprite(10,200,20,20);
  granny.addImage("ghost",grannyImg);
  granny.scale=0.3;
  granny.lifetime=140;
  granny.velocityX=(4+survivalTime/50);
  granny.x=random(3,4);
  granny.depth=owlGroup.depth+0.5;
  drinkGroup.depth=granny.depth+2;
  
  ghostGroup.add(granny);
    
  } 
}

function spawnDrink(){
  if(frameCount % 300===0){
  
  var energy=createSprite(200,60,20,20)
  energy.addImage("drink",energyImg);
  energy.velocityY=4;
  energy.scale=0.3; 
  energy.lifetime=175;
  invisible.depth=energy.depth+2;

  energy.y=Math.round(random(50,30))
    

    
    drinkGroup.add(energy);
 }
}



