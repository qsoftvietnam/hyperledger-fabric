var fs = require("fs");
var file = process.argv[2];
let data = fs.readFileSync(file);

var content = Buffer.from(data)
  .toString()
  .replace(/(\r\n|\n|\r)/gm, "\\n");
console.log(content);
