import fs from 'fs';
import path from 'path';

export const listFiles = ({ path: inputPath }: { path: string }): string[] => {
  const files: string[] = [];

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Path does not exist: ${inputPath}`);
  }

  const stat = fs.statSync(inputPath);

  if (stat.isFile()) {
    return [inputPath];
  }

  fs.readdirSync(inputPath).forEach(entry => {
    const fullPath = path.join(inputPath, entry);
    const entryStat = fs.statSync(fullPath);

    if (entryStat.isDirectory()) {
      files.push(...listFiles({ path: fullPath }));
    } else if (entryStat.isFile()) {
      files.push(fullPath);
    }
  });

  return files;
};
