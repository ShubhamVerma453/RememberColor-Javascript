var colorArr = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var userClick = [];
var level = 0;
var reqPress = 0;
var flag = true;

// start game when user click any btn
$("body").on("keydown", function(){
    if(flag){                       // if user click any btn in between game then don't restart
        flag=false;
        gameStart();
        
    }
});

//start the game by flushing all the previous stored values
function gameStart(){
    reqPress = 0;      
    userClick = [];
    nextSeq();

}

//randomaly select a color and append it to previouly sequence
function nextSeq() {
    level++;
    // console.log(level+" "+reqPress);
    // console.log("nextSeq");
    var randomNum = Math.floor(Math.random()*4);
    var color = colorArr[randomNum];
    gamePattern.push(color);
    // console.log("gamePattern  "+gamePattern);

    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
    
    $("h1").text("Level "+level);
};

// record what user clicked
$(".box").on("click", function(){   
    var x = $(this).attr("id");
    userClick.push(x);
    animatePress(x);
    reqPress++;
    // console.log(level+" "+reqPress);
    if(reqPress == level){              // when total required btn pressed then check the sequence
        // console.log("userPatt  "+userClick)
        checkAns();
        reqPress = 0;               // reset the requiredPress so we can count in for next iteration
    }
});

//check whether userSeq and Game sequence matches if not then reset the game
function checkAns() {
    // console.log("checkAns");
    for(var i=0; i<gamePattern.length; i++){   
        if(gamePattern[i] != userClick[i]){ 
            // console.log("game fail");
            gameReset();
            return;
        }
    }
    userClick = [];
    setTimeout(function(){      // if squence is matched the go for next iteration
        nextSeq();
    }, 1000);
}

function animatePress(color){
    $("#"+color).addClass("disappear");
    setTimeout(function(){
        $("#"+color).removeClass("disappear");
    }, 100);
}

// reset the game and flush all previously stored values
function gameReset(){
    gamePattern = [];
    userClick = [];
    level = 0;
    reqPress = 0;
    flag = true;
    $("body").addClass("reset");
    setTimeout(function(){
        $("body").removeClass("reset");
    }, 100);
    $("h1").text("Press any key to start the game");
}