import fs from "fs/promises";
import path from "path";

export class FileRepository {
  async saveFile(filePath: string, buffer: Buffer) {
    try {
      const directory = path.dirname(filePath);

      await fs.mkdir(directory, { recursive: true });

      await fs.writeFile(filePath, buffer);

      return filePath;
    } catch (error) {
      throw new Error(`File Repository: ${error}`);
    }
  }

  async getIMG(image: string) {
    try {
      const imagePath = path.join("public", image);

      await fs.access(imagePath, fs.constants.F_OK);

      const data = await fs.readFile(imagePath);

      return data;
    } catch (error) {
      throw new Error("FILE NOT FOUND");
    }
  }

  async deleteImage(image: string) {
    try {
      const imagePath = path.join("./server", image);

      await fs.rm(imagePath);

      return;
    } catch (error) {
      throw new Error(`File Repository: ${error}`);
    }
  }
}
