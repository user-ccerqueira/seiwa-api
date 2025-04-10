import express, { Router } from "express";
import { AUTH_LOGIN } from "../constants/events";
import { UserEmitter } from "../events";
import User from "../models/user";
import { generateToken, truncate } from "../tools/helpers";
import moment from "moment";
import Log from '../tools/log';

export default (passport): Router => {
  const Router = express.Router();

  Router.post(
    "/login",
    passport.authenticate("basic", { session: false }),
    async (req, res) => {
      try {
        const user = req.user as User;

        user.apiKey = generateToken({
          userId: user.id,
        });
        user.apiKeyDate = moment()
          .add(process.env.PASSWORD_EXPIRES_IN || 60, "d")
          .toDate();
        user.save();
        UserEmitter.emit(AUTH_LOGIN, { userId: user.id });

        return res.success(
          truncate(
            {
              user,
              accessToken: user.apiKey,
            },
            ["password"]
          )
        );
      } catch (err) {
        Log.error(err);
        res.error(err);
        return;
      }
    }
  );

  return Router;
};
