export const str = (s: string) => (targetString: string) => {
  if (targetString.startsWith(s)) {
    return s;
  }

  throw new Error('error');
};
