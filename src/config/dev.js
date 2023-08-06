import "dotenv/config";
export const config = {
  dbUrl: process.env.DATABASE_URL || "mongodb://localhost:27017/todo-app",
  env: process.env.ENV,
};
