import { QUIZ_STATUS_ENUM } from "@/constants/quiz";
import QuizForm from "../_components/QuizForm";

export default function AddQuizPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <QuizForm
        title="Add New Quiz"
        description="Fill out the form to add a new quiz."
        buttonText="Create Quiz"
        defaultValues={{
          name: "",
          room: "",
          numQuestions: 1,
          duration: 10,
          animation: 1,
          quizDate: "",
          status: QUIZ_STATUS_ENUM[0],
          startTime: "",
          endTime: "",
          winner: "",
          numPlayers: undefined,
        }}
        successTitle="Quiz Created!"
        successDescription="Your new quiz has been added."
        successButtonText="Create Another"
        leaveButtonText="Return to Quizzes"
      />
    </div>
  );
}
