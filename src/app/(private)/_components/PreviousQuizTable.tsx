"use client";

import DataTable from "@/components/DataTable";
import { DUMMYY_PREV_QUIZ } from "@/constants/dummy";
import { QUIZ_TITLE } from "@/constants/quiz";
import { useState } from "react";

const PreviousQuizTable = () => {
  const [questionIdx, setQuestionIdx] = useState(0);

  const currentQuestion = DUMMYY_PREV_QUIZ.questions[questionIdx];

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-2">
        Previous Quiz: {QUIZ_TITLE} {DUMMYY_PREV_QUIZ.name}
      </h2>
      <div className="flex items-center justify-between mb-2">
        <span className="text-muted-foreground">
          Question {questionIdx + 1} of {DUMMYY_PREV_QUIZ.questions.length}
        </span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded border bg-muted text-foreground disabled:opacity-50"
            onClick={() => setQuestionIdx((idx) => Math.max(0, idx - 1))}
            disabled={questionIdx === 0}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 rounded border bg-muted text-foreground disabled:opacity-50"
            onClick={() =>
              setQuestionIdx((idx) =>
                Math.min(DUMMYY_PREV_QUIZ.questions.length - 1, idx + 1)
              )
            }
            disabled={questionIdx === DUMMYY_PREV_QUIZ.questions.length - 1}
          >
            Next
          </button>
        </div>
      </div>
      <div className="mb-2">
        <div className="font-medium text-lg mb-1">
          {currentQuestion.question}
        </div>
        <div className="text-sm text-muted-foreground mb-1">
          <span className="mr-4">Category: {currentQuestion.category}</span>
          <span className="mr-4">Difficulty: {currentQuestion.difficulty}</span>
          <span>Timer: {currentQuestion.timer}s</span>
        </div>
        <div className="text-sm text-muted-foreground mb-1">
          <span className="mr-4">Score: {currentQuestion.score}</span>
          <span>Coins: {currentQuestion.coins}</span>
        </div>
      </div>
      <DataTable
        columns={[
          { label: "Option", accessor: "option" },
          { label: "Count", accessor: "count" },
          {
            label: "Is Answer",
            accessor: "isAnswer",
            render: (row) =>
              row.option === currentQuestion.answer ? (
                <span className="text-green-600 font-bold">✔</span>
              ) : null,
          },
        ]}
        data={currentQuestion.options.map((opt) => ({
          ...opt,
          isAnswer: opt.option === currentQuestion.answer,
        }))}
        pageSize={currentQuestion.options.length}
        total={currentQuestion.options.length}
      />
    </div>
  );
};

export default PreviousQuizTable;
