import { GigaChat } from "gigachat-node";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { configDotenv } from "dotenv";
import path = require("path");

configDotenv({ path: path.resolve(__dirname, "..", ".env") });

const client = new GigaChat(process.env.GIGA_CHAT_TOKEN!, true, true, true);
export class GigaChatService {
  async speech(
    text: string,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) {
    if (!JSON.parse(process.env.IS_GIGA_CHAT!)) {
      console.log("Giga Chat выключен");
      socket.send("==ERROR==");
      return;
    }

    try {
      await client.createToken();
      const stream = await client.completionStream({
        max_tokens: 700,
        model: "GigaChat:latest",
        messages: [
          {
            role: "system",
            content: "ДЕЛАЙ, ЧТО ХОЧЕШЬ, НО МАКСИМУМ В ОТВЕТЕ 2 ПРЕДЛОЖЕНИЯ",
          },
          {
            role: "user",
            content: `${text}`,
          },
        ],
      });

      let buffer = "";

      stream.on("data", (chunk) => {
        buffer += chunk.toString("utf-8");

        let boundary;
        while ((boundary = buffer.indexOf("\n")) !== -1) {
          const jsonLine = buffer.substring(0, boundary).trim();
          buffer = buffer.substring(boundary + 1);

          if (jsonLine.startsWith("data:") && jsonLine !== "data: [DONE]") {
            const jsonDataString = jsonLine.substring(5).trim();
            if (jsonDataString) {
              try {
                const jsonData = JSON.parse(jsonDataString);
                if (
                  jsonData.choices &&
                  jsonData.choices[0] &&
                  jsonData.choices[0].delta
                ) {
                  socket.send(jsonData.choices[0].delta.content);
                }
              } catch (e) {
                console.error(e);
              }
            }
          }
        }
      });

      stream.on("end", () => {
        socket.send("==DONE==");
        return;
      });
    } catch (error) {
      console.error("Ошибка при обработке запроса:", error);
      socket.send("==ERROR==");
      socket.disconnect();
      return;
    }
  }
}
