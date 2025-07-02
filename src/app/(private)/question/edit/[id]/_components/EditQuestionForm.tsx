"use client";

import { CATEGORY_ENUM, DIFFICULTY_ENUM } from "@/constants/questions";
import { useParams } from "next/navigation";
import QuestionForm from "../../../_components/QuestionForm";

const EditQuestionForm = () => {
  const { id } = useParams();

  return (
    <QuestionForm
      title="Edit Question"
      description="Update the fields and save your changes."
      buttonText="Update Question"
      defaultValues={{
        question: "What is the capital of France?",
        optionOne: "Paris",
        optionTwo: "London",
        optionThree: "Berlin",
        optionFour: "Madrid",
        answer: "Paris",
        timer: 30,
        score: 10,
        questionType: "multiple-choice",
        category: CATEGORY_ENUM[0],
        difficulty: DIFFICULTY_ENUM[0],
      }}
      id={id}
      successTitle="Question Updated!"
      successDescription="Your question has been updated."
      successButtonText="View Question"
      leaveButtonText="Return to Questions"
    />
  );
};

export default EditQuestionForm;
