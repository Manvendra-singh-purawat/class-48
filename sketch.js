var marioI,mario;
var backgroundI;
var groundI;
var invisibleGround;
var obstacleI,obstacle;
var gameOverI,gameOver;
var boxI;
var gomba1I,gomba;
var obstacleGroup;
var gombaGroup;
var gameState = "play";
var boxGroup;
var score;
var restart,restartI;
var coin,coinI;
var coinGroup;


function preload() {
    backgroundI = loadImage("bg.png");
    groundI = loadImage("ground2.png");
    marioI = loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
    obstacleI = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
    gameOverI = loadImage("gameOver.png");
    boxI = loadImage("brick.png");
    gomba1I = loadAnimation("gomba1.png","gomba2.png");
    restartI = loadImage("restart.png");

    marioCollide = loadAnimation("mario02.png")

    gombaCollide= loadAnimation("gomba1.png");

    obstacleCollide= loadAnimation("obstacle1.png");
    coinI = loadImage("coin.png");
    coinGroup = createGroup();
}

function setup(){
    createCanvas(800,500);

    backgroundS = createSprite(400,350);
    backgroundS.addImage(backgroundI);
    backgroundS.scale=2.3;

   
    
    ground = createSprite(200,465,1200,30);
    ground.addImage(groundI);
    ground.x = ground.width/2;

    invisibleGround = createSprite(50,430,1000,10);
    invisibleGround.visible = false;


    mario = createSprite(200,385,10,10);
    mario.addAnimation("mario",marioI);
    mario.scale = 2;
    //mario.debug = true;
    mario.setCollider("rectangle",0,0,20,30)


    restart = createSprite(375,200,100,100);
    restart.addImage(restartI);
    restart.visible = false;
    restart.scale=0.5

    
    
    gameOver = createSprite(370,150,100,100);
    gameOver.addImage(gameOverI);
    gameOver.visible = false;
    


    obstacleGroup = createGroup();
    gombaGroup = createGroup();
    boxGroup = createGroup();

    score=0;
    
}



function draw() {
    background(0);
    mario.collide(invisibleGround);

    

    if(gameState==="play"){
    
        if(ground.x<300){
            ground.x = 600;
        }
        ground.velocityX = -3;

        if(keyDown ("space") && mario.y> 330) {
            mario.velocityY = -15;
        }
        mario.velocityY = mario.velocityY+0.5;

        spawnObstacle();
        spawnBox();
        gombaObstacle();
        

        




        if(obstacleGroup.isTouching(mario) || gombaGroup.isTouching(mario)  ) {
            gameState= "end";
            
        }

        for(var i=0; i< boxGroup.length ; i++){

            if(boxGroup.get(i).isTouching(mario)) {
                boxGroup.get(i).remove();
                score++;
            }
        }

        //mario.collide(boxGroup);


    }

    if(gameState ==="end"){
        gameOver.visible = true;
        restart.visible = true;
        obstacleGroup.setVelocityEach(0,0);
        boxGroup.setVelocityEach(0,0);
        gombaGroup.setVelocityEach(0,0);
        coinGroup.setVelocityEach(0,0);
        mario.velocityY=0;
        ground.velocityX = 0;

        mario.addAnimation("mario",marioCollide);

        gomba.addAnimation("gomba",gombaCollide);

        obstacle.addAnimation("obstacle",obstacleCollide);
        
        
        if(mousePressedOver(restart)) {
            reset();
        }


        
    }

    drawSprites();

    
    textSize(25);
    stroke("black");
    text("score :"  + score , 600,50);
    
    
}
function reset() {
    gameState = "play";
  
    gameOver.visible = false;
    restart.visible = false;
    obstacleGroup.destroyEach();
    gombaGroup.destroyEach();
    boxGroup.destroyEach();
    coinGroup.destroyEach();

    mario.addAnimation("mario",marioI);

    gomba.addAnimation("gomba",gomba1I);

    obstacle.addAnimation("obstacle",obstacleI);
        

  
  
    score = 0;
  
}



function spawnObstacle() {
    if(frameCount % 180 === 0) {
        obstacle = createSprite(800,400,100,100);
        obstacle.addAnimation("obstacle",obstacleI);
        obstacle.velocityX = -3;
        obstacleGroup.add(obstacle)
        
        

    }

}

function spawnBox() {
if(frameCount % 150 === 0) {
    box1 = createSprite(800,random(280,360));
    box1.addImage(boxI);
    box1.velocityX = -3

    box2 = createSprite(850,random(300,340));
    box2.addImage(boxI);
    box2.velocityX = -3;
    boxGroup.add(box1);
    boxGroup.add(box2);

    // coin= createSprite(box1.x, box1.y-60);
    // coin.addImage(coinI);
    // coin.velocityX= -3;
    // coin.scale= 0.02;

    // coin2= createSprite(box2.x, box2.y-40);
    // coin2.addImage(coinI);
    // coin2.velocityX= -3;
    // coin2.scale= 0.02;


    // coin3= createSprite(box1.x+50, box2.y-100);
    // coin3.addImage(coinI);
    // coin3.velocityX= -3;
    // coin3.scale= 0.02;

    // coinGroup.add(coin);
    // coinGroup.add(coin2);
    // coinGroup.add(coin3);

   


}

}
function gombaObstacle() {
    if(frameCount % 300 === 0) {
        gomba = createSprite(700,400,10,10);
        gomba.addAnimation("gomba",gomba1I);
        gomba.velocityX = -6;
        gomba.scale=2.5;
        gombaGroup.add(gomba);
        
    
    }
    
    }

