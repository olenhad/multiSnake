var fs = require("fs");
/*fs.writeFile('message.txt', 'Hello Node', function(err){
	if(err){
		console.log(err);
	}else {
		console.log("the file was saved");
	}

});*/
var scoreDB = {"Scores":[]};
function writetoDB(text){
	console.log("write to DB got "+text);
	fs.writeFile('scores.db',text, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("Db updated");
		}
	})
}
function readFromDB(){
	var retobj = null ;
	/*fs.readFile('scores.db', function(err, data){
		if(err){


			console.log("read error");
			return null;
		}
		else{

			retobj = JSON.parse(data)
			console.log(retobj);
				
			
		}

	})*/
	retobj = fs.readFileSync('scores.db');
	return JSON.parse(retobj);

	
}
function scoreModel(u,s){
	this.username = u;
	this.score = s;
}
function appendScore(username, score){
	scoreDB = readFromDB();
	console.log(scoreDB);
	var newScore = new scoreModel(username, score);

	scoreDB.Scores.push(newScore);
	writetoDB(JSON.stringify(scoreDB));
}



exports.appendScore = appendScore;
exports.readFromDB = readFromDB;

