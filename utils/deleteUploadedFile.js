import fs from "fs";
import path from "path";

export const deleteUploadedFile = async (
  filePaths,
  baseDir = process.cwd()
) => {
  if (!filePaths) return;

  const files = Array.isArray(filePaths) ? filePaths : [filePaths];

  files.forEach((relativePath) => {
    const absolutePath = path.join(baseDir, relativePath.replace(/^\/+/, "")); // remove leading slash
    try {
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
        console.log(`Deleted file: ${absolutePath}`);
      } else {
        console.warn(`File not found: ${absolutePath}`);
      }
    } catch (err) {
      console.error(`Error deleting file ${absolutePath}:`, err);
    }
  });
};
