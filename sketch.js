let ground,lander;
var obstacle,obstacleImg;
var landersImage,bg_Image;
var thrust,leftthrust,rightthrust
var g=0.05;
var vy=0,vx=0,fuel=100
function preload(){
  landersImage=loadImage("normal.png")
  thrust=loadAnimation("b_thrust_1.png","b_thrust_2.png","b_thrust_3.png")
  leftthrust=loadAnimation("left_thruster_1.png","left_thruster_2.png")
  rightthrust=loadAnimation("right_thruster_1.png","right_thruster_2.png")
  normal=loadAnimation("normal.png")
  thrust.playing=true
  obstacleImg=loadImage("obstacle.png")
  thrust.looping=false
  leftthrust.looping=false
  rightthrust.looping=false
  bg_Image=loadImage("bg.png")
  crash=loadAnimation("crash1.png","crash2.png","crash3.png")
}
function setup(){
createCanvas(1000,700)
frameRate(80)
timer=(1624)
lander=createSprite(100,50,30,30)
lander.addImage(landersImage)
lander.scale=0.1
thrust.frameDelay=5
leftthrust.frameDelay=5
rightthrust.frameDelay=5
lander.addAnimation("thrusting",thrust)
lander.addAnimation("left",leftthrust)
lander.addAnimation("right",rightthrust)
lander.addAnimation("normal",normal)
lander.addAnimation("crashing",crash)
ground=createSprite(500,690,1000,20)
obstacle=createSprite(320,530,50,100)
obstacle.addImage(obstacleImg)
obstacle.scale=0.5
obstacle.setCollider("rectangle",0,100,300,300);
lander.setCollider("rectangle",0,0,200,200)
}
function draw(){
  background(51)
  image (bg_Image,0,0)
push()
fill(255); 
text("Horizontal Velocity: " +round(vx,2),800,50);
 text("Fuel: "+fuel,800,25);
text("Vertical Velocity: "+round(vy),800,75);
pop();
  vy=vy+g
  lander.position.y=lander.position.y+vy
  lander.position.x=lander.position.x+vx
  if(lander.collide(obstacle)===true){
  lander.changeAnimation("crashing")
  stop()
  }
  drawSprites()
}
function keyPressed(){
  if(keyCode===UP_ARROW && fuel>-100) {
    vy=-1
    lander.changeAnimation("thrusting")
    thrust.nextFrame()
    fuel=fuel-1
  }
if(keyCode===RIGHT_ARROW && fuel>-100){
  vx=vx+0.2
  lander.changeAnimation("right")
  fuel=fuel-1
}
if(keyCode===LEFT_ARROW && fuel>-100){
  vx=vx-0.2
  lander.changeAnimation("left")
  fuel=fuel-1
}
}
function stop(){
g=0;
vx=0;
vy=0;
fuel=-100
}