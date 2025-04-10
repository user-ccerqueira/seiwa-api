/* eslint-disable @typescript-eslint/no-empty-function */
import morgan from "morgan";

export class HttpLogger {
  constructor() {}

  private readonly responseStream = {
    write: (morganMessage) => {
      console.log(morganMessage);
    },
  };

  private readonly responseStreamError = {
    write: (morganMessage) => {
      console.log(morganMessage);
    },
  };

  private readonly requestStream = {
    write: (morganMessage) => {
      const splited = morganMessage.split("~");
      try {
        splited[1] = JSON.parse(splited[1]);
      } catch (error) {
        console.log("Não é objeto");
      }
      console.log(splited[0], splited[1]);
    },
  };

  requestHandler() {
    return morgan("REQUEST - :method :url parameters ~ :body", {
      skip: (req, res) => {
        return req.url.includes("/teste");
      },
      stream: this.requestStream,
      immediate: true,
    });
  }

  sucessHandler() {
    return morgan("RESPONSE [:status] on :response-time ms - :method :url", {
      skip: (req, res) => {
        return res.statusCode >= 400;
      },
      stream: this.responseStream,
    });
  }

  errorHandler() {
    return morgan(`RESPONSE [:status] on :response-time ms - :method :url`, {
      skip: (req, res) => res.statusCode < 400,
      stream: this.responseStreamError,
    });
  }
}
