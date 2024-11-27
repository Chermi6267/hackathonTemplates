import nodemailer from "nodemailer";
import { configDotenv } from "dotenv";
import path = require("path");

configDotenv({ path: path.resolve(__dirname, "..", ".env") });

const transporter = nodemailer.createTransport({
  service: process.env.SMPT_SERVICE,
  auth: {
    user: process.env.SMPT_USER,
    pass: process.env.SMPT_PASS,
  },
});

export class MailService {
  async sendMail(email: string, name: string) {
    const mailOptions = {
      from: process.env.SMPT_USER,
      to: email,
      subject: "ЭКСКУРСИЯ",
      text: `Здравствуйте, ${name}! Вы успешно записались на экскурсию. Ждем вас в 15:00`,
    };

    transporter.sendMail(mailOptions, (err) => {
      console.error(err);
    });

    return "ok";
  }
}
