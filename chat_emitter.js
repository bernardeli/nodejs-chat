var net = require("net")
  , emitter = new process.EventEmitter()
  , onlineUsers = 0
  , usedNicks = []
  , commands = require("./commands")
;

process.on("uncaughtException", function(error) {
  console.log("error: ", error);
});

net.createServer(function(socket) {
  emitter.on("online_users", function(count){
    socket.write("server> there are " + count + " connected at this time.\n");
  });

  emitter.on("changed_nick", function(oldNick, newNick) {
    socket.write("server> " + oldNick + " is known as " + newNick + "\n");
  });

  emitter.on("message", function(message, sender){
    socket.write(sender.nick + "> " + message.toString());
  });

  emitter.on("me", function(nick, message) {
    socket.write("** " + nick + " " + message + "\n");
  });

  emitter.on("memory_usage", function(mem) {
    socket.write("** this node.js process is consuming " + mem);
  });

  socket.on("data", function(buffer){
    var message = buffer.toString().trim()
      , matches
      , command
    ;

    matches = message.match(/^\/(.*)(?: (.*?))?$/);

    if (matches) {
      command = commands[matches[1]];
      if (command) {
        return command(emitter, socket, matches[2]);
      }
    }

    emitter.emit("message", buffer, socket);
  });

  socket.on("connect", function(){
    console.log("= a new user has connected");
    onlineUsers += 1;
    socket.nick = "user" + onlineUsers;
    emitter.emit("online_users", onlineUsers);
  });

  socket.on("close", function(){
    onlineUsers -= 1;
    console.log("= an user has disconnected");
  });

}).listen(1234);

console.log("server started");
