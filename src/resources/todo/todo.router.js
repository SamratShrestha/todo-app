import { Router } from "express";

import {
  deleteTodo,
  getCreateTodo,
  getIndex,
  getUpdateTodo,
  postCreateTodo,
  putUpdateTodo,
} from "./todo.controllers";
import { validationResult } from "express-validator";
import { todoValidation } from "./todo.validation";

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.render("createupdate", {
      title: req.params.id ? "Update Todo" : "Create Todo",
      errors: errors.array(),
      ...req.body,
    });
  };
};

const router = Router();

router.route("/").get(getIndex);

router
  .route("/create")
  .get(getCreateTodo)
  .post(validate(todoValidation), postCreateTodo);

router
  .route("/update/:id")
  .get(getUpdateTodo)
  .post(validate(todoValidation), putUpdateTodo);

router.route("/delete/:id").get(deleteTodo);

export default router;
