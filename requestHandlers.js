var exec = require("child_process").exec;
var fs = require("fs");
var index = require("./index");
var querystring = require("querystring");
var store = require("./store");
var models = require("./Game/models");
var constants = require("./Game/constants");
var collisions = require("./Game/collisions");
var events = require("./Game/events");
function start(response) {
  console.log("Request handler 'start' was called.");
   
    response.writeHead(200, {"Content-Type": "text/plain"});
   // response.write(stdout);
   response.write("start");
    response.end();
  

}
function snake(response){
	console.log("Request handler 'upload' was called.");
	fs.readFile("./snake.html",function(error,content){
		if(error){
			response.writeHead(500);
			response.end();
		}
		else{
			response.writeHead(200,{"Content-Type":"text/html"});
			response.end(content, 'utf-8');
		}
	});

}

function pushScore(response,newscore,username){
	console.log("Request handler 'pushScore' called");
	store.appendScore(username,newscore);
	response.writeHead(200,{"Content-Type":"text/html"});
	response.end();

}
function upload(response) {
  console.log("Request handler 'upload' was called.");
   response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}
function allScores(response){
	console.log("Request handler 'allScores' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	var scoreDB = store.readFromDB();
	console.log(scoreDB);
	response.write(JSON.stringify(scoreDB));
	response.end();

	
}
var numReq= 0;
var numSnakes =0;
function numReqs(response){
		
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(numReq.toString());
	response.end();
		

}
function testM(response){
    numReq++;
        fs.readFile("./testM.html",function(error,content){
		if(error){
			response.writeHead(500);
			response.end();
		}
		else{
			response.writeHead(200,{"Content-Type":"text/html"});
			response.end(content, 'utf-8');
		}
	});
    
}
function login(response){
    numReq++;
        fs.readFile("./login.html",function(error,content){
		if(error){
			response.writeHead(500);
			response.end();
		}
		else{
			response.writeHead(200,{"Content-Type":"text/html"});
			response.end(content, 'utf-8');
		}
	});
    
}

var gameObjects = [];
	
function getSnakeScore(response,postData){
	var obj = JSON.parse(JSON.stringify(querystring.parse(postData)));

		response.writeHead(200,{"Content-Type":"text/html"});
	response.write(JSON.stringify(gameObjects[obj.num].score));
	
	response.end();
}
function getGameObjects(response){
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(JSON.stringify(gameObjects));
	//console.log(JSON.stringify(gameObjects));
	response.end();
}

   var GAME_SPEED = 100;
   var firstCall = true;
function snakeM(response){
		console.log("Request handler 'snakeM' was called.");
		
	fs.readFile("snakeM.html",function(error,content){
		if(error){
			response.writeHead(500);
			console.log(error);
			response.end();
		}
		else{
			generateFood();
			numSnakes++;
			response.writeHead(200,{"Content-Type":"text/html"});
			
			var snake = new models.Snake(numSnakes,1,constants.INIT_CORD_X*numSnakes,constants.INIT_CORD_Y*numSnakes);
			gameObjects[numSnakes] = snake;

			console.log(JSON.stringify(gameObjects));
			response.end(content, 'utf-8');
			if(firstCall){
				var updateStateID = setInterval(updateGameStates,GAME_SPEED);
				firstCall = false;
			}

			
		}
	});

}
function updateGameStates(){
	//console.log("entering updatingGameStates()");
	for(var index in gameObjects){
		try{


		if(gameObjects[index].entity.subClass=="Snake"){
			gameObjects[index] = events.updateSnake(gameObjects[index]);
		}
		
		}
		catch(e){
			console.log(e);
		}
	}

	collisions.collisionEngine(gameObjects);

}



var numFood = 0;
function generateFood(){
	var t_x=Math.floor(Math.random()*390);
  	var t_y=Math.floor(Math.random()*390);
  	numSnakes++;
  	var t_Food = new models.FoodSingle(numSnakes,t_x,t_y,10);
  	gameObjects[numSnakes] = t_Food;

}


function exitSnake(response,postData){
	console.log("Request handler 'exitSnake' was called.");
	var obj = JSON.parse(JSON.stringify(querystring.parse(postData)));
	try{
		gameObjects.splice(obj.num);
	}catch(e){
		console.log(e);
	}
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(JSON.stringify(gameObjects));
	response.end();	
}

function recieveSnakeState(response,postData){
	//console.log("Request handler 'recieveSnakeState' was called.");
	//console.log("recieved: "+postData);
	//console.log("querystring processing:"+JSON.stringify(querystring.parse(postData)));
	var obj = JSON.parse(JSON.stringify(querystring.parse(postData)));
	try{

//		console.log(JSON.stringify(gameObjects[obj.num]));
	
			gameObjects[obj.num].state = obj.state;
			//console.log(JSON.stringify(gameObjects[obj.num]));
	
	}catch(e){
		console.log(e);

	}

	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(JSON.stringify(gameObjects));
	response.end();	 
	


}
function numberOfSnakes(response,postData){
	console.log("Request handler 'numSnakes' was called.");
	response.writeHead(200,{"Content-Type":"text/html"});
	response.write(numSnakes.toString());
	response.end();
}
var numArray = new Array(0);

function testLengthen(response,postData){
	console.log("Request handler 'testLengthen' was called.");
	var obj = JSON.parse(JSON.stringify(querystring.parse(postData)));
	gameObjects[obj.num]=events.lengthenSnake(gameObjects[obj.num]);
	console.log(JSON.stringify(gameObjects));
	response.writeHead(200,{"Content-Type":"text/html"});
	response.end();
}

function recieveNum(response,postData){
	console.log("recieved: "+postData);
	console.log("querystring processing:"+JSON.stringify(querystring.parse(postData)));
    var obj = JSON.parse(JSON.stringify(querystring.parse(postData)));
    console.log(obj);
    numArray[obj.num] = obj.gold;    
    
    response.writeHead(200,{"Content-Type":"json"});
    response.write(JSON.stringify(numArray));
    response.end();
    
}
exports.exitSnake = exitSnake;
exports.login = login;
exports.testLengthen = testLengthen;
exports.getGameObjects = getGameObjects;
exports.recieveSnakeState = recieveSnakeState;
exports.numberOfSnakes = numberOfSnakes;
exports.snakeM = snakeM;
exports.recieveNum=recieveNum;
exports.testM = testM;
exports.pushScore = pushScore;
exports.snake = snake;
exports.start = start;
exports.upload = upload;
exports.allScores=allScores;
exports.numReqs = numReqs;