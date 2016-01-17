
'use strict';

var player = [];
var boardObj = [];

function generateBoard() {
	var row = 10;
	var col = 10;
	var boxNo = 100;
	var board = document.getElementById('boardContainer');
	board.innerHTML = '';
	var snakes = [16, 6, 53, 33, 63, 59, 86, 23, 92, 72, 94, 74, 98, 77];
	var ladders = [3, 13, 8, 30, 19, 37, 27, 87, 39, 58, 50, 66, 62, 80, 70, 90];
	var snakeObj = [];
	var ladderObj = [];
	for(var y = 0; y < snakes.length; ++y) {
		snakeObj.push({
			head: snakes[y],
			tail: snakes[++y]
		})
	}
	for(var z = 0; z < ladders.length; ++z) {
		ladderObj.push({
			head: ladders[z],
			tail: ladders[++z]
		})
	}
	for(var x =0, a = 0, b = 0; x<row*col; x++) {
		boardObj.push({
	        number: x,
	        snakeHead: false,
	        snakeTail: 0,
	        ladderHead: false,
	        ladderTail: 0
	    });
	    if(snakeObj[a] && x === snakeObj[a].head) {
	    	boardObj[x].snakeHead = true;
	    	boardObj[x].snakeTail = snakeObj[a].tail;
	    	a++;
	    }
	    if (ladderObj[b] && x === ladderObj[b].head) {
	    	boardObj[x].ladderHead = true;
	    	boardObj[x].ladderTail = ladderObj[b].tail;
	    	b++;
	    }
	}

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
}

// function to generate random number from 1 to 6
function random(){
	return Math.floor(Math.random() * (6)) + 1;
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
		document.querySelector(".player1").innerHTML = "";
	}
	else {
		document.getElementById('play1').setAttribute('disabled', 'disabled');
		document.getElementById('play0').removeAttribute('disabled');
		document.querySelector(".player0").innerHTML = "";
	}
	var dice;
	dice = random();
	document.querySelector(".player"+playerNo).innerHTML = dice;
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
generateBoard();
savedState();