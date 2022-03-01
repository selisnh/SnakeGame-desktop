//Game constants and variables
let inputDirection = {x: 0, y:0};
let foodSound= new Audio('music/food.mp3');
let moveSound= new Audio('music/move.mp3');
let gameOverSound= new Audio('music/gameover.mp3');
let speed=3;
let score=0;
let lastPaintTime=0;
let snakeArray=[
    {x:13, y: 15}
]
food={x:6, y:6};

//Game Functions
function main(currentTime){
    window.requestAnimationFrame(main);
    //console.log(currentTime);
    if((currentTime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=currentTime;
    gameEngine();    
}
function ifCollided(snake){
    // If it bumps into itself
    for(let i=1; i< snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If it bumps to the border
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
}

function gameEngine(){
    //updating the snake array
    if(ifCollided(snakeArray)){
        gameOverSound.play();
        inputDirection={x:0, y:0};
        alert("Game over!☹️ Press any key to play again");
        snakeArray=[{x:13, y:15}];
        score=0;
    }

    //if food is eaten, incrementing score and regenerate the food
    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
        foodSound.play();
        score +=1;
        scoreBox.innerHTML = "SCORE: "+ score;
        snakeArray.unshift({x: snakeArray[0].x + inputDirection.x,
                            y: snakeArray[0].y + inputDirection.y});
        let a=2;
        let b=16;
        food = {x: Math.round(a+(b-a)* Math.random()),
                y:Math.round(a+(b-a)* Math.random()) }
    }

    //moving the snake
    for(let i=snakeArray.length-2; i>=0; i--){
        //const element = array[i];
        snakeArray[i+1] = {...snakeArray[i]};
    }
    snakeArray[0].x += inputDirection.x;
    snakeArray[0].y += inputDirection.y;


    //displaying the snake and food
    //displaying the snake
    board.innerHTML="";
    snakeArray.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


//main
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDirection = {x:0, y:1}//starts the game
    moveSound.play();
    switch(e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x = 0 ;
            inputDirection.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDirection.x = 0;
            inputDirection.y= 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x = -1;
            inputDirection.y= 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x = 1 ;
            inputDirection.y= 0;
            break;
        default:
            break;
    }
});
