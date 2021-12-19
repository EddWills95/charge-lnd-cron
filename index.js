const fs = require("fs");
const cron = require("node-cron");
require("dotenv").config();
const ChargeRunner = require("./charge-runner");
const Logger = require("./logger");

const watchedFile = `${process.env.CRON_LOCATION}/crondata.txt`;

const basicCron = "*/1 * * * *";

let cronJob;

// Create file if doesn't exist
fs.writeFile(watchedFile, basicCron, { overwrite: false }, function (err) {
  if (err) {
    Logger.log("[Error]: Error writing/finding initial file");
    throw err;
  }

  Logger.log(`[Watch]: Watching for file changes on ${watchedFile}`);

  fs.watch(watchedFile, (event, filename) => {
    if (filename) {
      const cronRaw = fs.readFileSync(watchedFile);
      const cronData = cronRaw.toString();

      if (cronJob) {
        Logger.log("[CRON]: Stopping old job");
        cronJob.stop();
      }

      Logger.log(`[CRON]: Scheduling new cron, ${cronData}`);
      cronJob = cron.schedule(cronData, () => {
        Logger.log("[CRON]: Running job ");
        try {
          ChargeRunner.run();
        } catch (err) {
          Logger.log(`[Error]: ${err}`);
        }
      });
    }
  });
});

process.on("SIGTERM", () => {
  Logger.writeOut();
  process.exit();
});
