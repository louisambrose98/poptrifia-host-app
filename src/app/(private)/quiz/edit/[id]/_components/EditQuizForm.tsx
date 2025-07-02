"use client";
import { QUIZ_STATUS_ENUM } from "@/constants/quiz";
import { useParams } from "next/navigation";
import QuizForm from "../../../_components/QuizForm";

const EditQuizForm = () => {
  const { id } = useParams();

  return (
    <QuizForm
      title="Edit Quiz"
      description="Update the fields and save your changes."
      buttonText="Update Quiz"
      defaultValues={{
        name: "General Knowledge Quiz",
        room: "Room 101",
        winner: "Alice",
        numPlayers: 10,
        numQuestions: 15,
        animation: 2,
        duration: 30,
        status: QUIZ_STATUS_ENUM[0],
        quizDate: "2024-06-01",
        startTime: "10:00",
        endTime: "10:30",
      }}
      id={id}
      successTitle="Quiz Updated!"
      successDescription="Your quiz has been updated."
      successButtonText="View Quiz"
      leaveButtonText="Return to Quizzes"
    />
  );
};

export default EditQuizForm;
