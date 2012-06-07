var app = require('express').createServer();
var io = require("socket.io").listen(app);
var models = require("./Game/models");
var constants = require("./Game/constants");
var collisions = require("./Game/collisions");
var events = require("./Game/events");
var fs = require("fs");
app.listen(3000);
var gameObjects = [];
var numSnakes =0;
var GAME_SPEED = 50;
var firstCall = true;
app.get('/',function(req,response){
	    fs.readFile('./snakeS.html', function(error, content) {
        if (error) {
            response.writeHead(500);
            response.end();
        }
        else {
        		generateFood();
				numSnakes++;
				var snake = new models.Snake(numSnakes,1,constants.INIT_CORD_X*numSnakes,constants.INIT_CORD_Y*numSnakes);
				gameObjects[numSnakes] = snake;
				
				console.log(JSON.stringify(gameObjects));
				
				if(firstCall){
					var updateStateID = setInterval(updateGameStates,GAME_SPEED);
					firstCall = false;
				}
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(content, 'utf-8');
        }
    });


});
io.sockets.on('connection',function(socket){
	socket.emit('gameObjects',gameObjects);
	socket.on('recieveState',function(data){
			try{

//		console.log(JSON.stringify(gameObjects[obj.num]));
	
			gameObjects[data.num].state = data.state;
			//console.log(JSON.stringify(gameObjects[data.num]));
			socket.emit('gameObjects',gameObjects);
	
	}catch(e){
		console.log(e);

	}
	});
});
app.get('/numSnakes',function(req,res){
	res.writeHead(200,{"Content-Type":"text/html"});
	res.write(numSnakes.toString());
	res.end();
});

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