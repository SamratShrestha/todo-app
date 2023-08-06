import todoRouter from "../resources/todo/todo.router";

import { Router } from "express";
const router = Router();

router.use("/", todoRouter);

router.use(function (err, req, res, next) {
  return next(err);
});

export default router;
