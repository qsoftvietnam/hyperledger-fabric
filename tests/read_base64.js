var fs = require("fs");

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString("base64");
}

// convert image to base64 encoded string
var file = process.argv[2];
var base64str = base64_encode(file);
console.log(base64str);
