import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { CourseService } from "../services/Course";
import { IUserRequest } from "../interfaces/User";

const courseService = new CourseService();

export class CourseController {
  async getById(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const result = await courseService.getById(id);

      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при получении курсов" });
    }
  }

  async subscribed(req: IUserRequest, res: Response) {
    try {
      const courseId = parseInt(req.params.courseId);
      const user = req.user;

      if (user === undefined) {
        return res
          .status(401)
          .json({ message: "Не удалось получить пользователя" });
      }

      const result = await courseService.subscribed(user);

      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при получении курсов" });
    }
  }

  async isSubscribed(req: IUserRequest, res: Response) {
    try {
      const user = req.user;
      const courseId = parseInt(req.params.courseId);
      if (user === undefined) {
        return res
          .status(401)
          .json({ message: "Не удалось получить пользователя" });
      }

      const result = await courseService.isSubscribed(user, courseId);

      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при получении курсов" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const result = await courseService.getAll();

      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при получении курсов" });
    }
  }

  async subscribeToCourse(req: IUserRequest, res: Response) {
    try {
      const user = req.user;
      const subscribe = JSON.parse(req.body.subscribe);
      const courseId = parseInt(req.params.courseId);

      if (user === undefined) {
        return res
          .status(401)
          .json({ message: "Не удалось получить пользователя" });
      }

      const result = await courseService.subscribe(user, courseId, subscribe);

      if (result === "USER") {
        return res.status(400).json({ message: "Вы уже записаны" });
      }

      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка при получении курсов" });
    }
  }
}
