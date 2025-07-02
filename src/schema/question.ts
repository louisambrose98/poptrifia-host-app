import { z } from "zod";
// Placeholder validators, replace with actual implementations if available
const schemaString = (label: string) =>
  z.string().min(1, { message: `${label} is required` });
const schemaNumber = (label: string) =>
  z.number({ invalid_type_error: `${label} must be a number` });
const getMatchMsg = (msg: string, path: string) => ({
  message: msg,
  path: [path],
});
const getSchemaMsg = (label: string) => ({
  match: `${label} must match one of the options`,
  unique: `${label} options must be unique`,
});
const xx = { INPUT_ANSWER_ID: "answer", INPUT_OPTION_ONE_ID: "optionOne" };
const question = "Question";
const optionOne = "Option One";
const optionTwo = "Option Two";
const optionThree = "Option Three";
const optionFour = "Option Four";
const answer = { label: "Answer" };
const timer = "Timer";
const score = "Score";
const questionType = "Question Type";
const category = "Category";
const difficulty = "Difficulty";

export const QuestionFormSchema = z
  .object({
    question: schemaString(question),
    optionOne: schemaString(optionOne),
    optionTwo: schemaString(optionTwo),
    optionThree: schemaString(optionThree),
    optionFour: schemaString(optionFour),
    answer: schemaString(answer.label),
    timer: schemaNumber(timer),
    score: schemaNumber(score),
    questionType: schemaString(questionType),
    category: schemaString(category),
    difficulty: schemaString(difficulty),
  })
  .refine((data) => {
    const { optionOne, optionTwo, optionThree, optionFour } = data;
    const options = [optionOne, optionTwo, optionThree, optionFour];
    return options.includes(data.answer);
  }, getMatchMsg(getSchemaMsg(answer.label).match, xx.INPUT_ANSWER_ID))
  .refine((data) => {
    const { optionOne, optionTwo, optionThree, optionFour } = data;
    const options = [optionOne, optionTwo, optionThree, optionFour];
    const uniqueOptions = new Set(options);
    return uniqueOptions.size === options.length;
  }, getMatchMsg(getSchemaMsg(optionOne).unique, xx.INPUT_OPTION_ONE_ID));

export type QuestionFormData = z.infer<typeof QuestionFormSchema>;
