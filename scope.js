var name = "John Doe"
  , otherName = "Jane Doe"
;

console.log(name);
console.log(otherName);

function hello() {
  var name = "Mark Doe";
  console.log("local: ", name);
  console.log("global: ", this.name);
}

hello();


function user(name) {
  console.log(this);
  console.log("name: ", name);
}

var someUser = {id: 1};

user("John");
user.call(someUser, "Mary");
