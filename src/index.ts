type Input = string;

type ParseResult<A> =
  | {
      success: true;
      value: A;
      remaining: Input;
      original: Input;
    }
  | {
      success: false;
      original: Input;
      error: string;
    };

type Parser<A> = (input: Input) => ParseResult<A>;

export const str =
  (expected: string): Parser<string> =>
  (input: Input) => {
    if (input.startsWith(expected)) {
      return {
        success: true,
        value: expected,
        remaining: input.slice(expected.length),
        original: input,
      };
    }

    const received = input.slice(0, expected.length) || '<end of input>';
    return {
      success: false,
      error: `Expected "${expected}", but received "${received}"`,
      original: input,
    };
  };

export const num =
  (expected: number): Parser<number> =>
  (input: Input) => {
    const expectedStr = expected.toString();
    if (input.startsWith(expectedStr)) {
      return {
        success: true,
        value: expected,
        remaining: input.slice(expectedStr.length),
        original: input,
      };
    }

    const received = input.slice(0, expectedStr.length) || '<end of input>';
    return {
      success: false,
      error: `Expected "${expectedStr}", but received "${received}"`,
      original: input,
    };
  };

export const run = <A>(parser: Parser<A>, input: Input): ParseResult<A> => {
  return parser(input);
};

type InferParserTuple<T extends Parser<any>[]> = {
  [K in keyof T]: T[K] extends Parser<infer A> ? A : never;
};

export const sequenceOf =
  <P extends [Parser<any>, ...Parser<any>[]]>(
    parsers: P
  ): Parser<InferParserTuple<P>> =>
  (input: Input) => {
    let remaining = input;
    const values = [];

    for (const parser of parsers) {
      const result = parser(remaining);

      if (!result.success) {
        return result;
      }

      values.push(result.value);
      remaining = result.remaining;
    }

    return {
      success: true,
      value: values as InferParserTuple<P>,
      remaining,
      original: input,
    };
  };
