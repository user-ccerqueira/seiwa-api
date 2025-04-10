import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import session from "express-session";
import express from "express";
import router from "./routes";
import responses from "./tools/middlewares/responses";
import errorHandler from "./tools/middlewares/errorHandler";
import bodyParser from "body-parser";
import {
  BearerStrategy,
  JWTStrategy,
  LocalStrategy,
  LoginStrategy,
} from "./tools/middlewares/passport";
import passport from "passport";
import cors from "cors";
import { HttpLogger } from "./tools/helpers/http.logger";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app: express.Application = express();
import correlator from "express-correlation-id";
import morgan from "morgan";
morgan.token("body", (req) => {
  try {
    return req.body ? JSON.stringify(req.body) : "";
  } catch (error) {
    console.log("ERRO BODY POST");
  }
});

const httpLogger = new HttpLogger();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "seiwa-api-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    },
    logErrors: true, // Habilitar logs de erros
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
passport.use(BearerStrategy());
passport.use(JWTStrategy());
passport.use(LocalStrategy());
passport.use(LoginStrategy());
app.use(responses);
app.use(correlator());

const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const routes = router(passport);
app.use(httpLogger.sucessHandler());
app.use(httpLogger.errorHandler());
app.use(httpLogger.requestHandler());

app.use("/auth", routes.AuthRoutes);
app.use("/medical", routes.MedicalRoutes);
app.use("/report", routes.DashboardsRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app
  .listen(port, async () => {
    console.log(`Server running on port: ${port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });

export default app;
