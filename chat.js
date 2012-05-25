var net = require("net")
  , sockets = []
;

net.createServer(function(socket) {
  sockets.push(socket);

  socket.on("connect", function(){
    console.log("= a new user has connected");
    sockets.forEach(function(s){
      s.write("server> there are " + sockets.length + " connected at this time\n");
    });

    //socket.pipe(socket); echo message!
  });

  socket.on("close", function(){
    console.log("= an user has disconnected");
    sockets.splice(sockets.indexOf(socket), 1);
  });

}).listen(1234);

console.log("server started");
