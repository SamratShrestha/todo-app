import { Schema, model } from "mongoose";

const schemaTimeStamps = {
  timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
};

const todoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    status: {
      type: String,
      enum: ["notstarted", "inprogress", "completed"],
      default: "notstarted",
    },
  },
  schemaTimeStamps
);

export const Todo = model("Todo", todoSchema);
