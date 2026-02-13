import { num, run, sequenceOf, str } from './';

describe('str', () => {
  it('should match a string', () => {
    const parser = str('Hello world!');

    expect(run(parser, 'Hello world!')).toMatchObject({
      success: true,
      value: 'Hello world!',
      remaining: '',
      original: 'Hello world!',
    });

    expect(run(parser, 'Goodbye world!')).toMatchInlineSnapshot(`
     {
       "error": "Expected "Hello world!", but received "Goodbye worl"",
       "original": "Goodbye world!",
       "success": false,
     }
    `);

    expect(run(parser, '')).toMatchInlineSnapshot(`
     {
       "error": "Expected "Hello world!", but received "<end of input>"",
       "original": "",
       "success": false,
     }
    `);
  });
});

describe('num', () => {
  it('should match a number', () => {
    const parser = num(12);

    expect(run(parser, '12')).toMatchObject({
      success: true,
      value: 12,
      remaining: '',
      original: '12',
    });

    expect(run(parser, '130')).toMatchInlineSnapshot(`
     {
       "error": "Expected "12", but received "13"",
       "original": "130",
       "success": false,
     }
    `);

    expect(run(parser, '')).toMatchInlineSnapshot(`
     {
       "error": "Expected "12", but received "<end of input>"",
       "original": "",
       "success": false,
     }
    `);
  });
});

describe('sequenceOf', () => {
  it('should process a sequence of parsers', () => {
    const parser = sequenceOf([str('Hello '), num(4), str(' world!')]);

    expect(run(parser, 'Hello 4 world!')).toMatchObject({
      success: true,
      value: ['Hello ', 4, ' world!'],
      remaining: '',
      original: 'Hello 4 world!',
    });

    expect(run(parser, 'Hello 5 world!')).toMatchInlineSnapshot(`
     {
       "error": "Expected "4", but received "5"",
       "original": "5 world!",
       "success": false,
     }
    `);
  });
});
