function User(name) {
  this.name = name;
}

var count = 0;

module.exports = {
  create: function(name) {
    count += 1;
    return new User(name);
  },

  count: function() {
    return count;
  }
}
