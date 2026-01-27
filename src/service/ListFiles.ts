import fs from 'fs';
import path from 'path';

export const listFiles = ({ input, output }: { input: string, output: string }): { input: string, output: string }[] => {
  const files: { input: string, output: string }[] = [];

  if (!fs.existsSync(input)) {
    throw new Error(`Path does not exist: ${input}`);
  }

  const stat = fs.statSync(input);

  if (stat.isFile()) {
    return [{ input: input, output }];
  }

  fs.readdirSync(input).forEach(entry => {
    const fullPath = path.join(input, entry);
    const entryStat = fs.statSync(fullPath);

    if (entryStat.isDirectory()) {
      files.push(...listFiles({ input: fullPath, output: path.join(output, entry) }));
    } else if (entryStat.isFile()) {
      files.push({ input: fullPath, output: path.join(output, entry) });
    }
  });

  return files;
};
