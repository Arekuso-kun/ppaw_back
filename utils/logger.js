import winston from "winston";
import path from "path";
import fs from "fs";
import Transport from "winston-transport";
import { sendErrorEmail } from "./mail.js";

const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

class EmailTransport extends Transport {
  constructor(opts) {
    super(opts);
  }

  log(info, callback) {
    setImmediate(() => this.emit("logged", info));

    if (info.level === "error") {
      const message = info[Symbol.for("message")];
      sendErrorEmail("Server Error Occurred", message).catch((err) => {
        console.error("Failed to send error email:", err);
      });
    }

    callback();
  }
}

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level.toUpperCase()}: ${message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logDir, "error.log"), level: "error" }),
    new winston.transports.File({ filename: path.join(logDir, "combined.log") }),
    new EmailTransport(),
  ],
});

export default logger;
