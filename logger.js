var fs = require("fs");
var log_file = fs.createWriteStream(process.env.LOG_LOCATION, { flags: "a" });

const generateTimeStamp = () => {
  const date = new Date();
  return `${date.toLocaleDateString()}::${date.toLocaleTimeString()} `;
};

const Logger = {
  log: (data) => {
    console.log(data);
    log_file.write(generateTimeStamp() + data + "\n");
  },
  writeOut: () => {
    log_file.writeOut();
  },
};

module.exports = Logger;
