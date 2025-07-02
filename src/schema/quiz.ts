import { z } from "zod";
// Placeholder validators, replace with actual implementations if available
const schemaString = (label: string) =>
  z.string().min(1, { message: `${label} is required` });
const schemaNumber = (label: string) =>
  z.number({ invalid_type_error: `${label} must be a number` });
const schemaDate = (label: string) =>
  z.string().min(1, { message: `${label} is required` }); // Use string for date input, adapt as needed
const schemaTime = (label: string) =>
  z.string().min(1, { message: `${label} is required` }); // Use string for time input, adapt as needed
const xx = {
  INPUT_QUIZ_DATE_LABEL: "Quiz Date",
  INPUT_START_TIME_LABEL: "Start Time",
  INPUT_END_TIME_LABEL: "End Time",
};
const name = "Quiz Name";
const room = "Room";
const numQuestions = "Number of Questions";
const duration = "Duration";
const animation = "Animation";
const status = "Status";

export const QuizFormSchema = z.object({
  name: schemaString(name),
  room: schemaString(room),
  numQuestions: schemaNumber(numQuestions),
  duration: schemaNumber(duration),
  animation: schemaNumber(animation),
  quizDate: schemaDate(xx.INPUT_QUIZ_DATE_LABEL),
  status: schemaString(status),
  startTime: schemaTime(xx.INPUT_START_TIME_LABEL),
  endTime: schemaTime(xx.INPUT_END_TIME_LABEL),
  winner: z.string().optional(),
  numPlayers: z.coerce.number().optional(),
});

export type QuizFormData = z.infer<typeof QuizFormSchema>;
