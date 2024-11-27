import { Router } from "express";
export const courseRouter = Router();
import { CourseController } from "../controllers/Course";
import { check } from "express-validator";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const courseController = new CourseController();

courseRouter.get("/byId/:id", courseController.getById);

courseRouter.get("/", courseController.getAll);

courseRouter.get(
  "/isSubscribed/:courseId",
  isAuthenticated,
  courseController.isSubscribed
);

courseRouter.get("/subscribed", isAuthenticated, courseController.subscribed);

courseRouter.post(
  "/subscribe/:courseId",
  isAuthenticated,
  [
    check("subscribe", "Что нужно сделать: subscribe: true - да, false - нет ")
      .notEmpty()
      .isBoolean(),
  ],
  courseController.subscribeToCourse
);
