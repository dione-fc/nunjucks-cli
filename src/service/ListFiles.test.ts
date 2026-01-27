import fs from 'fs';
import path from 'path';
import { listFiles } from './ListFiles';

describe('listFiles', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('throws if path does not exist', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(() => listFiles({ input: 'notfound', output: 'out' })).toThrow('Path does not exist: notfound');
  });

  it('returns single file if path is a file', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'statSync').mockReturnValue({ isFile: () => true, isDirectory: () => false } as any);
    expect(listFiles({ input: 'file.txt', output: 'out.txt' })).toEqual([
      { input: 'file.txt', output: 'out.txt' }
    ]);
  });

  it('returns all files in a directory (non-recursive)', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'statSync').mockImplementation((p: any) => {
      if (p === 'dir') return { isFile: () => false, isDirectory: () => true } as any;
      return { isFile: () => true, isDirectory: () => false } as any;
    });
    (jest.spyOn(fs, 'readdirSync') as unknown as jest.Mock).mockImplementation(() => ['a.txt', 'b.txt']);
    expect(listFiles({ input: 'dir', output: 'out' })).toEqual([
      { input: path.join('dir', 'a.txt'), output: path.join('out', 'a.txt') },
      { input: path.join('dir', 'b.txt'), output: path.join('out', 'b.txt') },
    ]);
  });

  it('returns files recursively in subdirectories', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'statSync').mockImplementation((p: any) => {
      if (p === 'root') return { isFile: () => false, isDirectory: () => true } as any;
      if (p === path.join('root', 'sub')) return { isFile: () => false, isDirectory: () => true } as any;
      return { isFile: () => true, isDirectory: () => false } as any;
    });
    (jest.spyOn(fs, 'readdirSync') as unknown as jest.Mock).mockImplementation((p: any) => {
      if (p === 'root') return ['file1.txt', 'sub'];
      if (p === path.join('root', 'sub')) return ['file2.txt'];
      return [];
    });
    expect(listFiles({ input: 'root', output: 'out' })).toEqual([
      { input: path.join('root', 'file1.txt'), output: path.join('out', 'file1.txt') },
      { input: path.join('root', 'sub', 'file2.txt'), output: path.join('out', 'sub', 'file2.txt') },
    ]);
  });
});
