import fs from 'fs';
import nunjucks from 'nunjucks';
import { renderFile } from './RenderFile';

describe('renderFile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders template with params and writes to file', () => {
    const fakeContent = 'Hello {{ name }}!';
    const renderedContent = 'Hello John!';
    jest.spyOn(fs, 'readFileSync').mockReturnValue(fakeContent);
    const writeSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => undefined);
    (jest.spyOn(nunjucks, 'renderString') as any).mockReturnValue(renderedContent);
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    renderFile({ files: { input: 'file.txt', output: 'file.txt' }, params: { name: 'John' } });

    expect(fs.readFileSync).toHaveBeenCalledWith('file.txt', 'utf-8');
    expect(nunjucks.renderString).toHaveBeenCalledWith(fakeContent, { name: 'John' });
    expect(fs.writeFileSync).toHaveBeenCalledWith('file.txt', renderedContent, 'utf-8');
    expect(logSpy).toHaveBeenCalledWith('Templated and replaced: file.txt');
  });
});
