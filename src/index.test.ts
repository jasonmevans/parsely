import { run, sequenceOf, str } from './';

describe('str', () => {
  it('should match a string', () => {
    const parser = str('Hello world!');

    expect(run(parser, 'Hello world!')).toMatchObject({
      success: true,
      value: 'Hello world!',
      remaining: '',
      original: 'Hello world!',
    });

    expect(run(parser, 'Goodbye world!')).toMatchObject({
      success: false,
      error: expect.stringContaining(`"Goodbye worl"`),
      original: 'Goodbye world!',
    });

    expect(run(parser, '')).toMatchObject({
      success: false,
      error: expect.stringContaining(`"<end of input>"`),
      original: '',
    });
  });
});

describe('sequenceOf', () => {
  it('should process a sequence of parsers', () => {
    const parser = sequenceOf([str('Hello'), str(' '), str('world!')]);

    expect(run(parser, 'Hello world!')).toMatchObject({
      success: true,
      value: ['Hello', ' ', 'world!'],
      remaining: '',
      original: 'Hello world!',
    });
  });
});
