import { run, str } from './';

describe('str', () => {
  it('should match a string', () => {
    const parser = str('Hello world!');

    expect(run(parser, 'Hello world!')).toMatchObject({
      success: true,
      value: 'Hello world!',
      remaining: '',
    });

    expect(run(parser, 'Goodbye world!')).toMatchObject({
      success: false,
      error: expect.stringContaining(`"Goodbye worl"`),
    });

    expect(run(parser, '')).toMatchObject({
      success: false,
      error: expect.stringContaining(`"<end of input>"`),
    });
  });
});
