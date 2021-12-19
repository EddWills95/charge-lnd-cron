const { spawn } = require("child_process");
const Logger = require("./logger");

const ChargeRunner = {
  run: () => {
    Logger.log("[Python]: Running python script");
    const python = spawn("python", [
      "./test.py",
      //   "./charge-lnd",
      //   "--lnddir",
      //   process.env.LNDDIR,
      //   "--grpc",
      //   process.env.GRPC,
      //   "-c",
      //   process.env.CONFIG_LOCATION,
    ]);

    python.stdout.on("data", (data) => {
      dataToSend = data.toString();
      Logger.log("[Python]: " + dataToSend);
    });

    python.stderr.on("data", (err) => console.log(err));

    python.on("close", (code) => {
      Logger.log("[Python]: Finished running script");
    });
  },
};

module.exports = ChargeRunner;
