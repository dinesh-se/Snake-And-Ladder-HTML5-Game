
'use strict';

var row = 10;
var col = 10;
var boxNo = 100;
var player;
var board = document.getElementById('boardContainer');
board.innerHTML = '';
var boardObj = [];
for(var x =0; x<row*col; x++) {
	boardObj.push({
        number: x,
        snakeHead: false,
        snakeTail: 0,
        ladderHead: false,
        ladderTail: 0
    });
}

//list of snakes and ladders in the board
boardObj[3].ladderHead = true;
boardObj[3].ladderTail = 13;

boardObj[8].ladderHead = true;
boardObj[8].ladderTail = 30;

boardObj[19].ladderHead = true;
boardObj[19].ladderTail = 37;

boardObj[27].ladderHead = true;
boardObj[27].ladderTail = 83;

boardObj[39].ladderHead = true;
boardObj[39].ladderTail = 58;

boardObj[50].ladderHead = true;
boardObj[50].ladderTail = 66;

boardObj[62].ladderHead = true;
boardObj[62].ladderTail = 80;

boardObj[70].ladderHead = true;
boardObj[70].ladderTail = 90;

boardObj[16].snakeHead = true;
boardObj[16].snakeTail = 6;

boardObj[53].snakeHead = true;
boardObj[53].snakeTail = 33;

boardObj[63].snakeHead = true;
boardObj[63].snakeTail = 59;

boardObj[86].snakeHead = true;
boardObj[86].snakeTail = 23;

boardObj[92].snakeHead = true;
boardObj[92].snakeTail = 72;

boardObj[94].snakeHead = true;
boardObj[94].snakeTail = 74;

boardObj[98].snakeHead = true;
boardObj[98].snakeTail = 77;

for(var i = 0; i < row; i++) {
	if(i%2 !== 0) {
		for(var j = 9; j >= 0; j--) {
			if(boardObj[(boxNo-j-1)].snakeHead) {
				board.innerHTML += "<div class='box snake' id=box"+ (boxNo-j) +">"+ (boxNo-j) +"<p class='little-text'>Snake: Go to "+ boardObj[(boxNo-j-1)].snakeTail +"</p></div>";
			}
			else if(boardObj[(boxNo-j-1)].ladderHead) {
				board.innerHTML += "<div class='box ladder' id=box"+ (boxNo-j) +">"+ (boxNo-j) +"<p class='little-text'>Ladder: Go to "+ boardObj[(boxNo-j-1)].ladderTail +"</p></div>"
			}
			else {
				board.innerHTML += "<div class='box' id=box"+ (boxNo-j) +">"+ (boxNo-j) +"</div>";
			}
		}
	}
	else {
		for(var k = 0; k < col; k++) {
			if(boardObj[(boxNo-k-1)].snakeHead) {
				board.innerHTML += "<div class='box snake' id=box"+ (boxNo-k) +">"+ (boxNo-k) +"<p class='little-text'>Snake: Go to "+ boardObj[(boxNo-k-1)].snakeTail +"</p></div>";
			}
			else if(boardObj[(boxNo-k-1)].ladderHead) {
				board.innerHTML += "<div class='box ladder' id=box"+ (boxNo-k) +">"+ (boxNo-k) +"<p class='little-text'>Ladder: Go to "+ boardObj[(boxNo-k-1)].ladderTail +"</p></div>";
			}
			else {
				board.innerHTML += "<div class='box' id=box"+ (boxNo-k) +">"+ (boxNo-k) +"</div>";
			}
		}
	}
	boxNo -= 10;
	board.innerHTML += '<br/>';
}

// function to generate random number from 1 to 6
function random(){
	return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}

//function to display the players on board
function displayPlayer(playerNo, boxNo) {
	if(playerNo === 0){
		var el1 = document.querySelector(".one.on-board");
		if(el1) {
			el1.parentNode.removeChild(el1);
		}
		document.getElementById('box'+boxNo).innerHTML += "<div class='player one on-board'></div>";
	}
	else {
		var el2 = document.querySelector(".two.on-board");
		if(el2) {
			el2.parentNode.removeChild(el2);
		}
		document.getElementById('box'+boxNo).innerHTML += "<div class='player two on-board'></div>";
	}
}

//function to check the players postion for win, snake slide or ladder hike
function positionCheck(playerNo) {
	if(player[playerNo].position >= 100) {
		alert('Player'+(playerNo+1)+' win');
		location.reload();
	}
	if(boardObj[player[playerNo].position - 1].snakeHead) {
		player[playerNo].position = boardObj[player[playerNo].position - 1].snakeTail;
	}
	if(boardObj[player[playerNo].position - 1].ladderHead) {
		player[playerNo].position = boardObj[player[playerNo].position - 1].ladderTail;
	}
	displayPlayer(playerNo, player[playerNo].position);
}

//function takes care of enabling and disabling play buttons, store the state of the game, move the postions of the player
function move(playerNo) {
	if(!playerNo){
		document.getElementById('play0').setAttribute('disabled', 'disabled');
		document.getElementById('play1').removeAttribute('disabled');
	}
	else {
		document.getElementById('play1').setAttribute('disabled', 'disabled');
		document.getElementById('play0').removeAttribute('disabled');
	}
	var dice;
	dice = random();
	player[playerNo].position += dice;
	positionCheck(playerNo);
	localStorage.setItem('playerPositions', JSON.stringify(player));
}

//resets the game
function reset() {
	localStorage.removeItem('playerPositions');
	location.reload();
}

//retrieve the saved state of the game when reopening the game
function savedState() {
	player = JSON.parse(localStorage.getItem('playerPositions')) || [{position: 0},{position: 0}];
	if(player[0].position && player[1].position) {
		displayPlayer(0, player[0].position);
		displayPlayer(1, player[1].position);
	}
}
savedState();