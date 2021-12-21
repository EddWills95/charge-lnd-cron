var fs = require("fs");
var os = require("os");
var log_file = fs.createWriteStream(process.env.LOG_LOCATION, { flags: "a" });

const generateTimeStamp = () => {
  const date = new Date();
  return `${date.toISOString()} `;
};

const Logger = {
  log: (data) => {
    console.log(data);
    log_file.write(generateTimeStamp() + data + os.EOL);
  },
  writeOut: () => {
    log_file.writeOut();
  },
};

module.exports = Logger;
