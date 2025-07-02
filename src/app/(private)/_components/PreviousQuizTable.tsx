"use client";

import BadgeLabel from "@/components/BadgeLabel";
import ItemBadge from "@/components/ItemBadge";
import QuestionOption from "@/components/QuestionOption";
import { DASHBOARD_PREV_QUIZ } from "@/constants/dashboard";
import { DUMMYY_PREV_QUIZ } from "@/constants/dummy";
import { useState } from "react";
import PanelPrevNext from "./PanelPrevNext";
import TableTitle from "./TableTitle";

const PreviousQuizTable = () => {
  const [questionIdx, setQuestionIdx] = useState(0);

  const currentQuestion = DUMMYY_PREV_QUIZ.questions[questionIdx];
  const { title } = DASHBOARD_PREV_QUIZ;

  const handlePrevious = () => {
    setQuestionIdx((idx) => Math.max(0, idx - 1));
  };

  const handleNext = () => {
    setQuestionIdx((idx) =>
      Math.min(DUMMYY_PREV_QUIZ.questions.length - 1, idx + 1)
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <TableTitle title={title} />
      <div className="bg-card rounded-xl shadow p-6 mb-6 border">
        <div className="font-semibold text-lg sm:text-xl mb-2 text-primary">
          {currentQuestion.question}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
          <ItemBadge type="category" value={currentQuestion.category} />
          <ItemBadge type="difficulty" value={currentQuestion.difficulty} />
          <BadgeLabel label="Timer" value={currentQuestion.timer} />
          <BadgeLabel label="Score" value={currentQuestion.score} />
          <BadgeLabel label="Coins" value={currentQuestion.coins} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {currentQuestion.options.map((opt, idx) => (
            <QuestionOption
              key={idx}
              isCorrect={opt.option === currentQuestion.answer}
              value={opt.option}
            />
          ))}
        </div>

        <hr className="my-4" />

        <PanelPrevNext
          total={DUMMYY_PREV_QUIZ.questions.length}
          current={questionIdx}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default PreviousQuizTable;
