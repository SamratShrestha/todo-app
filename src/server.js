import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import hbs from "hbs";
import morgan from "morgan";
import path from "path";

import config from "./config";
import routes from "./routes";
import { connect } from "./utils/db";

export const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/static", express.static(path.join(__dirname, "public")));

app.set("views");

app.set("views", path.join(__dirname, "../views"));

hbs.registerHelper("formatDate", function (options) {
  return new Date(options).toLocaleString();
});

hbs.registerHelper("formatDateRender", function (options) {
  console.log(options);
  let date = new Date(Date.now());
  if (options) {
    date = new Date(options);
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${formattedDate}T${formattedTime}`;
});

hbs.registerHelper("if_eql", function (a, b, opts) {
  if (a == b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

app.set("view engine", "hbs");

app.use("/", routes);

app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.render("error", {
    errors: {
      message: err.message,
    },
  });
});

export const start = async () => {
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`Server Running on http://localhost:${config.port}/`);
    });
  } catch (e) {
    console.log(e);
  }
};
