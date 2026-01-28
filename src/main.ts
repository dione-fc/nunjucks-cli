#! /usr/bin/env node
import { listFiles } from './service/ListFiles';
import { parseArgs } from 'util';
import { renderFile } from './service/RenderFile';

const options = {
  input: { type: 'string', short: 'i', description: 'Path to file or folder to template', required: true },
  output: { type: 'string', short: 'o', description: 'Output folder for the rendered template' },
  data: { type: 'string', short: 'd', multiple: true, description: 'Data to use for templating' },
  json: { type: 'string', short: 'j', description: 'JSON string to use for templating' },
  help: { type: 'boolean', short: 'h', description: 'Show help' }
} as const;

const helpText = `nunjucks-cli - A command-line interface for rendering Nunjucks templates

Usage:
  nunjucks-cli --path <fileOrFolder> [--data key=value ...] [--json '{"key":"value"}']

Options:
  --input, -i   Path to file or folder to template (required)
  --output, -o  Output folder for the rendered template
  --data, -d    Data to use for templating (can be repeated, e.g. --data key=value)
  --json        JSON string to use for templating
  --help, -h    Show this help message
`;

async function main(): Promise<void> {
  const params: Record<string, any> = {};
  const { values } = parseArgs({ options });
  const { input, output, data, json, help } = values;

  if (help) {
    console.log(helpText);
    process.exit(0);
  }

  if (!input) {
    console.error('Error: Path is required');
    process.exit(1);
  }

  if (!data && !json) {
    console.error('Error: Either data or json must be provided');
    process.exit(1);
  }

  data?.forEach((pair: string) => {
    const [key, value] = pair.split('=');
    if (key && value !== undefined) {
      params[key] = value;
    }
  });

  if (json) {
    Object.assign(params, JSON.parse(json));
  }

  const files = await listFiles({ input, output: output ?? input });
  files.forEach(file => renderFile({ files: file, params }));
}

main();
