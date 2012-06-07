var constants = require("./constants");
var Entity = function(id,arrayRect,c){
		this.posSet = arrayRect;
		this.ID = id;
		this.colorString = c;
		this.subClass = null;
	};
	var Snake = function(id,initLength,initX,initY){
		
		this.sSize = constants.SNAKE_SIZE;
		var temp = new Array(initLength);
		var tempRect = new Rect(initX, initY, constants.SNAKE_SIZE, constants.SNAKE_SIZE);
		for(var i=0; i< initLength; i++){
			temp[i] = new Rect(initX+i*constants.SNAKE_SIZE, initY, constants.SNAKE_SIZE, constants.SNAKE_SIZE);

		}
		this.state = null;
		this.entity = new Entity(id,temp,"rgb(107,142,35)");
		this.entity.subClass="Snake";
		this.score = 0;
	};
	var FoodSingle = function(id,x,y,size){
		var temp = new Array(1);
		temp[0] = new Rect(x,y,size,size);
		this.entity = new Entity(id,temp,"rgb(196,85,79)");
		this.entity.subClass="Food";

	};
	var Coord = function(x,y){
    	this.x=x;
    	this.y=y;
    };
    var Rect = function(x,y,w,h){
    	this.x =x;
    	this.y= y;
    	this.w=w;
    	this.h =h;
    };
exports.Entity = Entity;
exports.Snake = Snake;
exports.FoodSingle = FoodSingle;
exports.Coord = Coord;
exports.Rect = Rect;