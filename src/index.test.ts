import { str } from './index';

describe('parsers', () => {
  it('should parse strings', () => {
    expect(true).toBe(true);
    const parser = str('this string');

    expect(parser('this is not correct')).toThrow();
    expect(parser('this string')).toBe(true);
  });
});
