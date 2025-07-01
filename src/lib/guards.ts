import { DOT, EMPTY, ONE, SECOND, SPACE } from "../constants/general";

export const isNull = (data: unknown): data is null => data === null;

export const isUndefined = (data: unknown): data is undefined =>
  data === undefined;

export const isNone = (data: unknown) => isNull(data) || isUndefined(data);

export const isString = (data: unknown): data is string =>
  typeof data === "string";

export const isValidArray = <T>(data: unknown): data is T[] =>
  Array.isArray(data) && data.length > 0;

export const isValidString = (data: unknown): data is string =>
  isString(data) && data.trim().length > 0;

export const areValidStrings = (data: unknown): data is string[] =>
  isValidArray<string>(data) && data.every(isValidString);

export const isValidNumber = (data: unknown): data is number =>
  typeof data === "number" && Number.isFinite(data);

export const areValidNumbers = (data: unknown): data is number[] =>
  isValidArray<number>(data) && data.every(isValidNumber);

export const isValidDateString = (data: unknown): data is Date =>
  isString(data) && !isNaN(Date.parse(data));

export const areValidDateStrings = (data: unknown): data is Date[] =>
  isValidArray<string>(data) && data.every(isValidDateString);

export const isFutureDate = (date: unknown): date is Date => {
  if (!isValidDateString(date)) return false;
  return new Date(date).getTime() > Date.now();
};

export const isExpired = (time: unknown): boolean => {
  if (!isValidNumber(time)) return true;
  const currentTime = Date.now() / SECOND;
  return time < currentTime;
};

export const str = (...args: unknown[]): string =>
  args.filter((arg) => !isNone(arg)).join(EMPTY);

export const sentence = (...args: unknown[]): string =>
  args.filter((arg) => !isNone(arg)).join(SPACE);

export const getPosition = (position: number): string =>
  str(position + ONE, DOT);

export const getNumber = <T>(ret: T, val?: any) =>
  isValidNumber(val) ? val : ret;

export const getString = <T>(ret: T, val?: any) =>
  isValidString(val) ? val : ret;

export const toTitleCase = (input: string): string => {
  if (!isValidString(input)) return EMPTY;
  return input.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};
