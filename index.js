var server = require("./server");
var router = require("./router");

var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/snake"] = requestHandlers.snake;
handle["/score"] = requestHandlers.pushScore;
handle["/allscores"]=requestHandlers.allScores;
handle["/testM"] = requestHandlers.testM;
handle["/numReqs"]=requestHandlers.numReqs;
handle["/recieveNum"]=requestHandlers.recieveNum;
handle["/snakeM"] = requestHandlers.snakeM;
handle["/numSnakes"]=requestHandlers.numberOfSnakes;
handle["/recieveSnakeState"]=requestHandlers.recieveSnakeState;
handle["/getGameObjects"] = requestHandlers.getGameObjects;
handle["/testLengthen"] = requestHandlers.testLengthen;
handle["/login"] = requestHandlers.login;
handle["/exitSnake"] = requestHandlers.exitSnake;
server.start(router.route, handle);


