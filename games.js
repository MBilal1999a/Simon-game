// alert("Hi");
let gamePattern=[];
let userClickedPattern=[];
let buttonColours=["red", "blue", "green", "yellow"];
var started = false;
var level=0;
let no=0;


// console.log(randomNumber);
function playSound(name){
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

setTimeout(function(){$("#"+currentColour).removeClass("pressed");}, 100);
}
function nextSequence(){
    let randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    // console.log(gamePattern);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("level "+level);
    started=true;
    // console.log(gamePattern);
}



$(".btn").on("click", function(){
    // alert("clicked");
    var userChosenColour=this.id;
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // console.log(userClickedPattern);

    if(gamePattern.length==userClickedPattern.length){
        // console.log(userClickedPattern);

        checkAnswer();
    }
    else{
        // console.log("Pagal");
        for (let i=0;i<userClickedPattern.length;i++){
            if(userClickedPattern[i]==gamePattern[i]){
                continue;
            }
            else{
                
                restart();
            }
        }
        // console.log(userChosenColour);
    }
})
function restart(){
    // alert("Game Over restart game ");
    userClickedPattern=[];
    gamePattern=[];
    level=0;
    playSound("wrong");
    started=false;
    $("h1").text("Game over, Press any key to restart");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
}
function checkAnswer(){
    
        for (let index = 0; index < gamePattern.length; index++) {
            if(gamePattern[index]==userClickedPattern[index]){
                no++;
                // console.log("hey "+gamePattern[index]);
                // console.log("hey "+userClickedPattern[index]);
                // console.log(no);

            } 
                    
        }
        // console.log(gamePattern);
        // console.log(userClickedPattern);
        // console.log(no);
        if(no==gamePattern.length){
            // console.log("Pass");
             userClickedPattern=[];
            //  console.log(userClickedPattern);
             no=0;
             setTimeout(nextSequence,100);
            // nextSequence();
        }
        else{
            // console.log("Fail");
            // alert("Fail refresh");
            restart();
        }
    }

$(document).keypress(function() {
    if(started==false){
        nextSequence();

    }
});