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
nunjucks-cli --path <fileOrFolder> [--data key=value ...] [--json '{"key":"value"}']
```

- `--path` or `-p`: Path to a template file or directory (required)
- `--data` or `-d`: Key-value pairs to use as template variables (can be repeated)
- `--json` or `-j`: JSON string with variables for the template

### Examples

Render a single file with key-value data:

```
nunjucks-cli --path template.njk --data name=John --data age=30
```

Render a file with JSON data:

```
nunjucks-cli --path template.njk --json '{"name":"Jane","age":25}'
```

Render all templates in a folder:

```
nunjucks-cli --path templates/ --data env=prod
```

## Development

- Run tests: `npm test`
- Run in dev mode: `npm run dev -- --path ...`

## License

MIT
