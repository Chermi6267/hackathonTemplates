import { IGenerateToken } from "../interfaces/Token";
import prisma from "./prismaClient";

export class CourseRepository {
  async getById(id: string) {
    try {
      const result = await prisma.course.findMany({
        where: { id: parseInt(id) },
        select: {
          courseUsers: true,
          name: true,
          id: true,
          description: true,
          icon: true,
          price: true,
        },
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async isSubscribed(userId: number, courseId: number) {
    try {
      const existingSubscription = await prisma.courseUser.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });

      if (existingSubscription) {
        return true;
      }

      return false;
    } catch (error) {
      throw error;
    }
  }

  async subscribed(userId: number) {
    try {
      const courses = await prisma.course.findMany({
        where: {
          courseUsers: {
            some: {
              userId: userId,
            },
          },
        },
      });
      return courses;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const result = await prisma.course.findMany();

      return result;
    } catch (error) {
      throw error;
    }
  }

  async subscribe(userId: number, courseId: number, mode: boolean) {
    try {
      const existingSubscription = await prisma.courseUser.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });

      if (mode) {
        if (existingSubscription) {
          return "USER";
        }

        const result = await prisma.courseUser.create({
          data: {
            userId,
            courseId,
          },
        });

        return result;
      } else {
        if (!existingSubscription) {
          return "NO_SUBSCRIPTION";
        }

        await prisma.courseUser.delete({
          where: {
            userId_courseId: {
              userId,
              courseId,
            },
          },
        });

        return "UNSUBSCRIBED";
      }
    } catch (error) {
      throw error;
    }
  }
}
