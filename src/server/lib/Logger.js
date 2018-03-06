/**
 * Handles application logging
 * @module Logger
 */

import fs from "fs";
import util from "util";
import chalk from "chalk";
import { SERVER } from "../config";

//Options for logging write streams
let streamOpts = { flags: "a", encoding: "UTF-8" };

//Create the actual write streams for access and errors
let accessLogger = fs.createWriteStream(SERVER.APP_LOG, streamOpts);
let errorLogger = fs.createWriteStream(SERVER.ERROR_LOG, streamOpts);

/**
 * Enum for log levels.
 * @enum {number}
 * @memberof module:Logger
 */
const LogLevel = {
  SUPPRESS: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  DEBUG: 4
};

/**
 * Enum for log colors.
 * @enum {string}
 * @memberof module:Logger
 */
const LogColor = {
  SUPPRESS: "white",
  ERROR: "red",
  WARN: "magenta",
  INFO: "cyan",
  DEBUG: "yellow"
};

/**
 * Writes logs to streams
 * @memberof module.Logger
 * @prop {Stream} ACCESS - Stream for standard access logging
 * @prop {Stream} ERROR - Stream for error logging
 */

let Logger = {
  ACCESS: accessLogger,
  ERROR: errorLogger
};

/*
Loop through defined log levels, creating functions for each level that actually
write the log data.
 */

for (let level of Object.keys(LogLevel)) {
  if (LogLevel[level] > 0) {
    Logger[level.toLowerCase()] = function() {
      // Write log only if logging level in the config is above the threshold for the current
      // log level.
      if (LogLevel[SERVER.LOG_LEVEL] >= LogLevel[level]) {
        let logDate = new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, "");
        logDate = `[${logDate}]`;
        let logMessage = util.format.apply(util.format, arguments);
        // If the config is set up to log to a file, write all logs to file.
        if (SERVER.LOG_OUTPUT_TO_FILE) {
          let logTag = `[${level}]`;
          let log = `${logTag} ${logDate} ${logMessage}\n`;
          errorLogger.write(log);
        } else {
          // If the config log level is DEBUG, log directly to the console with colors.
          let errStack = new Error().stack;
          let stacklist = errStack.split("\n")[2].split("at ")[1];
          let regEx = /\(([^)]+)\)/;
          let parsedStack = regEx.exec(stacklist)
            ? regEx.exec(stacklist)[1]
            : stacklist;
          let stackParts = parsedStack.split(":");
          let file = stackParts[0];
          let line = stackParts[1];

          let logTag =
            chalk.blue("[") +
            chalk[LogColor[level]].bold(level) +
            chalk.blue("]");
          let log = "";
          if (level !== "INFO") {
            log = `${logTag}${logDate}[${file}:${line}] ${logMessage}`;
          } else {
            log = `${logTag}${logDate} ${logMessage}`;
          }
          console.log(log);
        }
      }
    };
  }
}

export default Logger;
