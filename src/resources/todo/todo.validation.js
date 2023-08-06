import { body } from "express-validator";

export const todoValidation = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 chars long"),
  body("description")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 chars long"),
  body("dueDate")
    .isAfter()
    .withMessage("Date must be greater than the current date"),
];
