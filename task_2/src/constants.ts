export const endpoints = {
  convert(inVal: string, outVal: string, amount?: string): string {
    if (amount) {
      return `/pair/${inVal}/${outVal}/${amount}`;
    }
    return `/pair/${inVal}/${outVal}`;
  },
  codes: "/codes",
};
