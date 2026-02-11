type Input = string;

type ParseResult<A> =
  | { success: true; value: A; remaining: Input }
  | { success: false; error: string };

type Parser<A> = (input: Input) => ParseResult<A>;

export const str =
  (expected: string): Parser<string> =>
  (input: Input) => {
    if (input.startsWith(expected)) {
      return {
        success: true,
        value: expected,
        remaining: input.slice(expected.length),
      };
    }

    const received = input.slice(0, expected.length) || '<end of input>';
    return {
      success: false,
      error: `Expected "${expected}", but received "${received}"`,
    };
  };

export const run = <A>(parser: Parser<A>, input: Input): ParseResult<A> => {
  return parser(input);
};
