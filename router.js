function route(handle, pathname, response, postData) {
 // console.log("About to route a request for " + pathname);
  var scoreRegex = /^\/score=([0-9]+)&username=(.+)$/;
  var match = pathname.match(scoreRegex)

  if(match){
  	console.log(pathname);
  	console.log("score = "+match[1]);
  	var newscore = match[1];
    console.log(match[2]);
    var username = match[2];
  	handle["/score"](response,newscore,username);
  }
  else if (typeof handle[pathname] === 'function') {
    handle[pathname](response,postData);
  } else {
    console.log("No request handler found for " + pathname);
  }
}

exports.route = route;