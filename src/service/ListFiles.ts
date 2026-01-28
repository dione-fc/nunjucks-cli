import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

export const listFiles = async ({ input, output }: { input: string, output: string }): Promise<{ input: string, output: string }[]> => {

  if (!fs.existsSync(input)) {
    throw new Error(`Path does not exist: ${input}`);
  }

  const stat = fs.statSync(input);
  const isDirectory = stat.isDirectory();
  const results = await glob(isDirectory ? `${input}/**/*` : input, {
    ignore: {
      childrenIgnored: p => ['node_modules', '.git'].includes(p.name),
    },
    nodir: true,
    absolute: true,
  });

  return results.map(filePath => {
    const outputPath = isDirectory ? path.join(output, path.relative(input, filePath)) : path.join(output, path.basename(filePath));
    return {
      input: filePath,
      output: outputPath,
    };
  });
};
