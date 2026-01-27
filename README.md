# nunjucks-cli

A command-line interface for rendering Nunjucks templates with data from key-value pairs or JSON.

## Installation

Clone this repository and run:

```
npm install
npm run build
npm link
```

This will make the `nunjucks-cli` command available globally.

## Usage

```
nunjucks-cli --input <fileOrFolder> [--output <outputFolder>] [--data key=value ...] [--json '{"key":"value"}']
```

- `--input` or `-i`: Path to a template file or directory (required)
- `--output` or `-o`: Output folder for the rendered template (defaults to input path if not provided)
- `--data` or `-d`: Key-value pairs to use as template variables (can be repeated)
- `--json` or `-j`: JSON string with variables for the template

### Examples

nunjucks-cli --path template.njk --data name=John --data age=30
nunjucks-cli --path template.njk --json '{"name":"Jane","age":25}'

Render a single file with key-value data:

```
nunjucks-cli --input template.njk --data name=John --data age=30
```

Render a file with JSON data:

```
nunjucks-cli --input template.njk --json '{"name":"Jane","age":25}'
```

nunjucks-cli --path templates/ --data env=prod

Render all templates in a folder:

```
nunjucks-cli --input templates/ --output output/ --data env=prod
```

If you omit `--output`, the rendered files will be written alongside the input files.

## Development

- Run tests: `npm test`
- Run in dev mode: `npm run dev -- --path ...`

## License

MIT
