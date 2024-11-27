import { IGenerateToken } from "../interfaces/Token";
import { CourseRepository } from "../repositories/Course";
import { MailService } from "./Mail";

const courseRepository = new CourseRepository();
const mailService = new MailService();

interface CourseWithUserCount {
  id: number;
  name: string;
  description: string;
  icon: string;
  courseUsers: { userId: number; courseId: number }[];
  countOfUsers: number;
}

export class CourseService {
  async getById(id: string): Promise<CourseWithUserCount> {
    try {
      const result = await courseRepository.getById(id);
      const course = result[0];

      return {
        ...course,
        countOfUsers: course.courseUsers.length,
      };
    } catch (error) {
      throw error;
    }
  }

  async isSubscribed(user: IGenerateToken, courseId: number) {
    try {
      const result = await courseRepository.isSubscribed(user.id, courseId);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async subscribed(user: IGenerateToken) {
    try {
      const result = await courseRepository.subscribed(user.id);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const result = await courseRepository.getAll();

      return result;
    } catch (error) {
      throw error;
    }
  }

  async subscribe(user: IGenerateToken, courseId: number, mode: boolean) {
    try {
      const result = await courseRepository
        .subscribe(user.id, courseId, mode)
        .then(async (res) => {
          if (mode) {
            const mail = await mailService.sendMail(
              user.email,
              user.name || ""
            );
          }
          return res;
        });

      return result;
    } catch (error) {
      throw error;
    }
  }
}
