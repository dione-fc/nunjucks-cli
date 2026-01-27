import fs from 'fs';
import nunjucks from 'nunjucks';
import path from 'path';

export const renderFile = ({ files, params }: { files: { input: string, output: string }, params: object }): void => {
    const content = fs.readFileSync(files.input, 'utf-8');
    const rendered = nunjucks.renderString(content, params);
    fs.mkdirSync(path.dirname(files.output), { recursive: true });
    fs.writeFileSync(files.output, rendered, 'utf-8');
    console.log(`Templated and replaced: ${files.output}`);
}