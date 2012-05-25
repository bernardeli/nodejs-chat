var commands = {};

module.exports = commands;

commands.nick = function(emmiter, socket, query) {
  emmiter.emit("changed_nick", socket.nick, query);
  socket.nick = query;
};

commands.me = function(emitter, socket, query) {
  emitter.emit("me", socket.nick, query);
};

commands.mem = function(emitter) {
  memorySize = process.memoryUsage().rss / (1024 * 1024).toFixed(2);
  emitter.emit("memory_usage", memorySize);
};
