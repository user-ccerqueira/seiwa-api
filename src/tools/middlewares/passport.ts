import { BasicStrategy } from "passport-http";
import PassaportHttpBearer from "passport-http-bearer";
import PassportLocal from "passport-local";
import PassaportJwt from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { Op, where as Wh, fn, col } from "sequelize";
import { AUTH_LOGIN_ATTEMPT } from "../../constants/events";
import { User } from "../../models";
import ActionsRepository from "../../repositories/actions.repository";
import { comparePassword, generateToken } from "../helpers";

export const BearerStrategy = () => {
  return new PassaportHttpBearer.Strategy(async (token, done) => {
    if (!token.length) return done(null, false);
    const user = await User.findOne({
      where: {
        apiKey: token,
        apiKeyDate: {
          [Op.gte]: new Date(),
        },
      },
    });
    if (!user)
      return done(null, false, {
        message: "Invalid or expired login",
        scope: "*",
      });
    return done(null, user, { scope: "*" });
  });
};

export const LocalStrategy = (): PassportLocal.Strategy => {
  return new PassportLocal.Strategy(function (username, password, done) {
    User.findOne({ where: { login: username } })
      .then(async (user) => {
        if (!user) {
          return done(null, false, { message: "Login ou senha incorreta." });
        }
        if (!(await comparePassword(password, user.password))) {
          await ActionsRepository.create(AUTH_LOGIN_ATTEMPT, user.id);
          return done(null, false, { message: "Login ou senha incorreta." });
        }
        return done(null, user);
      })
      .catch((err) => done(err));
  });
};

export const JWTStrategy = (): PassaportJwt.Strategy => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "GFx-WKSWYuDLEFU*gM=yF?p#4g_nqt4e=qS",
    issuer: "accounts.seiwa.com.br",
    audience: "seiwa.com.br",
  };
  return new PassaportJwt.Strategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({
        where: { id: jwt_payload.sub as number },
      });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  });
};

const basicAuth = async (username, password, done) => {
  const user = await User.findOne({
    where: { login: Wh(fn("LOWER", col("User.login")), "LIKE", username) },
  });
  if (!user) {
    return done(null, false);
  }
  if (!(await comparePassword(password, user.password))) {
    await ActionsRepository.create(AUTH_LOGIN_ATTEMPT, user.id);
    return done(null, false, { message: "Login ou senha incorreta." });
  }
  return done(null, user, { scope: "*" });
};

export const LoginStrategy = (): BasicStrategy => {
  return new BasicStrategy((username, password, done) => {
    basicAuth(username, password, done);
  });
};
