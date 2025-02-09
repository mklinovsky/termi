import { describe, expect, test } from 'vitest';
import { Readable } from 'stream';
import { readFromStream } from './read-from-stream.ts';

describe('readFromStream', () => {
  test('reads data from stdin', async () => {
    const mockInput = 'Hey, it works!';
    const mockStdin = Readable.from([mockInput]);

    const result = await readFromStream(mockStdin as any);
    expect(result).toBe(mockInput);
  });
});
