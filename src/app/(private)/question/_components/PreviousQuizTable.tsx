"use client";

import DataTable from "@/components/DataTable";
import { useState } from "react";

const PREV_QUIZ = {
  name: "Quiz #17",
  date: "2025-07-01T20:00:27.838Z",
  players: 2,
  questions: [
    {
      id: "3d5ae5c8-6a5a-408b-aed0-38b938c908d0",
      question: "In which city is 'The Scream' by Edvard Munch housed?",
      options: [
        {
          option: "Oslo",
          count: 1,
        },
        {
          option: "Helsinki",
          count: 1,
        },
        {
          option: "Stockholm",
          count: 0,
        },
        {
          option: "Copenhagen",
          count: 0,
        },
        {
          option: "No Answer",
          count: 0,
        },
      ],
      answer: "Oslo",
      timer: 10,
      score: 1,
      coins: 3,
      category: "ART",
      difficulty: "EASY",
      totalCount: 2,
    },
    {
      id: "28784aa2-b730-40eb-85f4-2244f0994ad4",
      question: "In which culture does 'Rosh Hashanah' mark the new year?",
      options: [
        {
          option: "Hindu",
          count: 1,
        },
        {
          option: "No Answer",
          count: 1,
        },
        {
          option: "Jewish",
          count: 0,
        },
        {
          option: "Buddhist",
          count: 0,
        },
        {
          option: "Islamic",
          count: 0,
        },
      ],
      answer: "Jewish",
      timer: 10,
      score: 1,
      coins: 3,
      category: "CULTURES",
      difficulty: "EASY",
      totalCount: 2,
    },
    {
      id: "caa4e5b2-d63e-4a4d-8da5-4f2a2e6f5197",
      question: "What alphabet is used in Russia?",
      options: [
        {
          option: "Cyrillic",
          count: 2,
        },
        {
          option: "Latin",
          count: 0,
        },
        {
          option: "Greek",
          count: 0,
        },
        {
          option: "Arabic",
          count: 0,
        },
        {
          option: "No Answer",
          count: 0,
        },
      ],
      answer: "Cyrillic",
      timer: 10,
      score: 1,
      coins: 3,
      category: "LANGUAGE",
      difficulty: "EASY",
      totalCount: 2,
    },
    {
      id: "fbd428d0-3375-4461-926e-cb227ad44a9f",
      question: "What type of hat is known for having a wide brim?",
      options: [
        {
          option: "Sombrero",
          count: 1,
        },
        {
          option: "Beret",
          count: 1,
        },
        {
          option: "Beanie",
          count: 0,
        },
        {
          option: "Fedora",
          count: 0,
        },
        {
          option: "No Answer",
          count: 0,
        },
      ],
      answer: "Sombrero",
      timer: 12,
      score: 2,
      coins: 5,
      category: "FASHION",
      difficulty: "MEDIUM",
      totalCount: 2,
    },
    {
      id: "c4be5e58-3754-412f-bdfa-86e91d2a1fc3",
      question: "Which Asian city is known as 'The Lion City'?",
      options: [
        {
          option: "Singapore",
          count: 1,
        },
        {
          option: "Jakarta",
          count: 1,
        },
        {
          option: "Bangkok",
          count: 0,
        },
        {
          option: "Kuala Lumpur",
          count: 0,
        },
        {
          option: "No Answer",
          count: 0,
        },
      ],
      answer: "Singapore",
      timer: 12,
      score: 2,
      coins: 5,
      category: "GEOGRAPHY",
      difficulty: "MEDIUM",
      totalCount: 2,
    },
    {
      id: "7fec3bca-dcdf-4b30-9a7a-1673ff7a4fd4",
      question: "Which conflict is referred to as 'The War to End All Wars'?",
      options: [
        {
          option: "World War I",
          count: 1,
        },
        {
          option: "Napoleonic Wars",
          count: 1,
        },
        {
          option: "Crimean War",
          count: 0,
        },
        {
          option: "Franco-Prussian War",
          count: 0,
        },
        {
          option: "No Answer",
          count: 0,
        },
      ],
      answer: "World War I",
      timer: 12,
      score: 2,
      coins: 5,
      category: "HISTORY",
      difficulty: "MEDIUM",
      totalCount: 2,
    },
    {
      id: "b3fc31b9-d7f2-4a84-9f15-55b28a100727",
      question: "Which mammal is known for laying eggs?",
      options: [
        {
          option: "Platypus",
          count: 1,
        },
        {
          option: "Bat",
          count: 1,
        },
        {
          option: "Dolphin",
          count: 0,
        },
        {
          option: "Kangaroo",
          count: 0,
        },
        {
          option: "No Answer",
          count: 0,
        },
      ],
      answer: "Platypus",
      timer: 12,
      score: 2,
      coins: 5,
      category: "ANIMALS",
      difficulty: "MEDIUM",
      totalCount: 2,
    },
    {
      id: "ee435377-8663-4d19-8042-6eef6ea9b4cf",
      question: "With which genre is 'Sun Ra Arkestra' associated?",
      options: [
        {
          option: "Country",
          count: 1,
        },
        {
          option: "Classical",
          count: 1,
        },
        {
          option: "Jazz",
          count: 0,
        },
        {
          option: "EDM",
          count: 0,
        },
        {
          option: "No Answer",
          count: 0,
        },
      ],
      answer: "Jazz",
      timer: 12,
      score: 2,
      coins: 5,
      category: "MUSIC",
      difficulty: "MEDIUM",
      totalCount: 2,
    },
    {
      id: "69b89969-910d-40b4-abbc-49db8f83b154",
      question: "In which novel is the town of Macondo set?",
      options: [
        {
          option: "One Hundred Years of Solitude",
          count: 2,
        },
        {
          option: "The Grapes of Wrath",
          count: 0,
        },
        {
          option: "Beloved",
          count: 0,
        },
        {
          option: "Things Fall Apart",
          count: 0,
        },
        {
          option: "No Answer",
          count: 0,
        },
      ],
      answer: "One Hundred Years of Solitude",
      timer: 15,
      score: 3,
      coins: 8,
      category: "LITERATURE",
      difficulty: "HARD",
      totalCount: 2,
    },
    {
      id: "e6ff0b6a-ad61-4f89-b754-ee9032b33fb2",
      question:
        "Who is the main villain in Season 2 of 'Buffy the Vampire Slayer'?",
      options: [
        {
          option: "The Master",
          count: 1,
        },
        {
          option: "Spike",
          count: 1,
        },
        {
          option: "Angelus",
          count: 0,
        },
        {
          option: "Drusilla",
          count: 0,
        },
        {
          option: "No Answer",
          count: 0,
        },
      ],
      answer: "Angelus",
      timer: 15,
      score: 3,
      coins: 8,
      category: "TELEVISION",
      difficulty: "HARD",
      totalCount: 2,
    },
  ],
};

const PreviousQuizTable = () => {
  const [questionIdx, setQuestionIdx] = useState(0);

  const currentQuestion = PREV_QUIZ.questions[questionIdx];

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-2">
        Previous Quiz: {PREV_QUIZ.name}
      </h2>
      <div className="flex items-center justify-between mb-2">
        <span className="text-muted-foreground">
          Question {questionIdx + 1} of {PREV_QUIZ.questions.length}
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
                Math.min(PREV_QUIZ.questions.length - 1, idx + 1)
              )
            }
            disabled={questionIdx === PREV_QUIZ.questions.length - 1}
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
