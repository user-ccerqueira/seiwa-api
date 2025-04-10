import fs from "fs";
import path from "path";
import moment from "moment";

export default class Log {
  static log(level: string, args: any[]): void {
    const filename = path.resolve(
      __dirname,
      `../../../storage/logs/${Log.getDate()}.log`
    );
    const log = args
      .map((a) => JSON.stringify(a)?.replace(/(^"|"$)/g, ""))
      .join(" ");
    fs.appendFile(
      filename,
      `[${level.toUpperCase()}][${moment().format(
        "YYYY-MM-DD HH:mm:ss"
      )}] ${log}\r\n`,
      (err) => {
        if (err) throw err;
      }
    );
  }

  static getDate() {
    return moment().format("YYYY-MM-DD");
  }

  static debug(...args: any[]): void {
    console.log.apply({}, args);
    Log.log.apply({}, ["debug", args]);
  }

  static info(...args: any[]): void {
    console.log.apply({}, args);
    Log.log.apply({}, ["info", args]);
  }

  static error(...args: any[]): void {
    console.log.apply({}, args);
    for (let i = 0; i < args.length; i++) {
      const log = args[i];
      if (log instanceof Error || (typeof log === "object" && "stack" in log)) {
        log.stack.split("\n").map((line) => {
          Log.log.apply({}, ["error", [line]]);
        });
      } else {
        Log.log.apply({}, ["error", [log]]);
      }
    }
  }
}
