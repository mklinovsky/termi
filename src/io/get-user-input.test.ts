import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getUserInput } from './get-user-input.ts';

describe('getUserInput', () => {
  let rl: { question: any };

  beforeEach(() => {
    rl = {
      question: vi.fn(),
    };
  });

  it('should resolve with user input', async () => {
    const input = 'test input';
    rl.question.mockImplementation((_, callback) => callback(input));
    const result = await getUserInput(rl);
    expect(result).toBe(input);
  });

  it('should resolve with undefined if no input is provided', async () => {
    rl.question.mockImplementation((_, callback) => callback(undefined));
    const result = await getUserInput(rl);
    expect(result).toBeUndefined();
  });
});

