import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function password(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@&!?$*()+=";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function passwordHash(password: string): Promise<string> {
  const saltRounds = 10;
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
}

export function verifyToken(roles) {
  return (req, res, next) => {
    try {
      const token = req.user.apiKey;
      if (typeof token !== "undefined") {
        const decoded = jwt.decode(token, "seiwa");
        if (decoded.roles.some((r) => roles.indexOf(r) >= 0)) {
          return next();
        }
        res.sendStatus(403);
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      res.sendStatus(403);
    }
  };
}

export function comparePassword(
  passwordText: string,
  hash: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    bcrypt.compare(passwordText, hash, function (err, res) {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

export function generateToken(payload: any): string {
  const iss = 'accounts.seiwa.com.br';
  const aut = 'seiwa.com.br';
  const sub = String(payload.userId);
  return jwt.sign({ ...payload }, 'GFx-WKSWYuDLEFU*gM=yF?p#4g_nqt4e=qS', {
    algorithm: 'HS256',
    expiresIn: '1h',
    issuer: iss,
    subject: sub,
    audience: aut
  });
}

export function sleep(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function truncate(object, name) {
  try {
    const _ = require("lodash");
    return _.cloneDeepWith(object, (x, key) => {
      if (typeof x === "string" && name.includes(key)) {
        return `*****`;
      }
      if (typeof x === "string" && x.length > 100 && key !== "accessToken") {
        return x.substring(0, 50) + "...";
      }
    });
  } catch (error) {
    return object;
  }
}
