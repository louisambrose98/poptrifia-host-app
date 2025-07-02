import { CATEGORY_ENUM, DIFFICULTY_ENUM } from "@/constants/questions";
import QuestionForm from "../_components/QuestionForm";

export default function AddQuestionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <QuestionForm
        title="Add New Question"
        description="Fill out the form to add a new question."
        buttonText="Create Question"
        defaultValues={{
          question: "",
          optionOne: "",
          optionTwo: "",
          optionThree: "",
          optionFour: "",
          answer: "",
          timer: 30,
          score: 10,
          questionType: "multiple-choice",
          category: CATEGORY_ENUM[0],
          difficulty: DIFFICULTY_ENUM[0],
        }}
        successTitle="Question Created!"
        successDescription="Your new question has been added."
        successButtonText="Create Another"
        leaveButtonText="Return to Questions"
      />
    </div>
  );
}
