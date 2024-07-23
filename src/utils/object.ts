/* eslint-disable @typescript-eslint/no-explicit-any */
export const isObjectEmpty = (obj: Record<string, any>): boolean => {
  if (!obj || !Object.keys(obj)?.length) return true;

  for (const key in obj) {
    if (obj[key]) {
      return false;
    }
  }

  return true;
};
