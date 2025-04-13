

//gameCanvas is selected
const gameCanvas = document.getElementById("gameCanvas");
//make a 2d area in selected canvas
const ctx = gameCanvas.getContext('2d');

//this function shows and refreshs canvas
let clearCanvas = () => {
    ctx.fillStyle = '#58B19F'
    ctx.strokeStyle = 'white'

    ctx.fillRect(0 , 0 , gameCanvas.width , gameCanvas.height)
    ctx.strokeRect(0,0 ,gameCanvas.width, gameCanvas.height)
}

//our snake whit 5 parts
let snake = [
    { x : 150 , y : 150 },
    { x : 140 , y : 150 },
    { x : 130 , y : 150 },
    { x : 120 , y : 150 },
    { x : 110 , y : 150 },
    //these x and y are like a point on a canvas 
    //x = 0 and y = 0 mean left top
    //x = 300 and y = 300 mean right bottom

]

//snake maker
let drawSnake = () => snake.forEach(drawSnakePart)
let drawSnakePart = snakePart => {   
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black'

    ctx.fillRect(snakePart.x , snakePart.y , 10 , 10);
    ctx.strokeRect(snakePart.x , snakePart.y , 10 , 10);
}

//this line helps to move only once in each 100ms
let changingDirection = false;

//default x and y for direction
let dx = 10;
let dy = 0;

//default score
let score = 0

//head of snake is moved by one of those 4 buttons
let advanceSnake = () => {
    const head = { x : snake[0].x + dx , y : snake[0].y + dy} 

    snake.unshift(head);
    if (head.x === foodX && head.y=== foodY) {
        score += 1

        document.querySelector("#score").innerHTML = score
        createFood()
        return
    }
    snake.pop()
//the snake has 5 parts when it moves new part will add(unshift) as a head and its last part will be deleted (pop) 
}

//the event which is active after clicking on 4 special buttons on keybord
document.addEventListener('keydown' , changeDirection)
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if(changingDirection) return;
    else changingDirection = true;

    const keyPressed = event.keyCode;
    if(keyPressed === LEFT_KEY && dx !== 10) {
        dx = -10;
        dy = 0;
    }

    if(keyPressed === RIGHT_KEY && dx !== -10) {
        dx = 10;
        dy = 0
    }

    if(keyPressed === UP_KEY && dy !== 10) {
        dx = 0;
        dy = -10;
    }

    if(keyPressed === DOWN_KEY && dy !== -10) {
        dx= 0;
        dy = 10;
    }
}

//it is a random number maker
let randomNumber = (max , min) => Math.round((Math.random() * (max - min) + min) / 10) * 10

//default foodX and foodY for createFood
let foodX;
let foodY;
// it makes a food which food will never drops on snake
let createFood = () => {
    foodX = randomNumber(0,gameCanvas.width - 10);
    foodY = randomNumber(0,gameCanvas.height - 10);
    snake.forEach(snakePart => {
        if(snakePart.x === foodX && snakePart.y === foodY) {
            createFood()
        }
    })
}
let drawFood = () => {
    ctx.fillStyle = '#3B3B98';
    ctx.strokeStyle = '#182C61'

    ctx.fillRect(foodX , foodY , 10 , 10)
    ctx.strokeRect(foodX , foodY , 10 , 10)
}

createFood()

//game will end if you to wall
    function endGame() {
        for (let i = 1; i < snake.length; i++) {//از یک شروع میشه چون صفر سر ماره و باگ میخوره
             if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) return true;
        }
        
        const hitLeftWall = snake[0].x < 0;
        const hitRightWall = snake[0].x > gameCanvas.width - 10;
        const hitTopWall = snake[0].y < 0;
        const hitBottomWall = snake[0].y > gameCanvas.height - 10;
        
        return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
    }

//Invoker
main();
function main() {
    //end game
    if(endGame()) return
    // start game
    setTimeout(() => {
        changingDirection = false;
        clearCanvas()
        drawFood()
        advanceSnake()	
        drawSnake()

        main();
    }, 100);
}
