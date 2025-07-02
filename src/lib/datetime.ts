import { COLON, DASH, EMPTY } from "@/constants/general";
import { str } from "./guards";

const isValidDate = (data: unknown): data is Date =>
  data instanceof Date && !isNaN(data.getTime());

const isValidDateString = (data: unknown): data is Date =>
  typeof data === "string" && !isNaN(Date.parse(data));

export const isFutureDate = (date: unknown): date is Date => {
  if (!isValidDateString(date)) return false;

  return new Date(date) > new Date();
};

export const getDateOnly = (dateInput?: null | string | Date): string => {
  let date: Date;

  // Check if the input is already a Date object or a valid date string
  if (isValidDate(dateInput)) {
    date = dateInput;
  } else if (isValidDateString(dateInput)) {
    date = new Date(dateInput);
  } else {
    return EMPTY;
  }

  // Extract the year, month, and day, and format them as YYYY-MM-DD
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return str(year, DASH, month, DASH, day);
};

export const getHourAndMinutes = (dateInput?: null | string | Date): string => {
  let date: Date;

  // Check if the input is already a Date object or a valid date string
  if (isValidDate(dateInput)) {
    date = dateInput;
  } else if (isValidDateString(dateInput)) {
    date = new Date(dateInput);
  } else {
    return EMPTY;
  }

  // Extract hours and minutes and format them in HH:mm
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return str(hours, COLON, minutes);
};
