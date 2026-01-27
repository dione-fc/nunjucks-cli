import fs from 'fs';
import nunjucks from 'nunjucks';

export const renderFile = (filePath: string, params: object): void => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const rendered = nunjucks.renderString(content, params);
  fs.writeFileSync(filePath, rendered, 'utf-8');
  console.log(`Templated and replaced: ${filePath}`);
}