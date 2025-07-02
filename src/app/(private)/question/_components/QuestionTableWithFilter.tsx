"use client";
import { DUMMY_QUESTIONS } from "@/constants/dummy";
import { getString } from "@/lib/guards";
import { useMemo, useState } from "react";
import QuestionPanel from "./QuestionPanel";
import QuestionTable from "./QuestionTable";

const QuestionTableWithFilter = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    return DUMMY_QUESTIONS.filter(
      (q) =>
        (!category || q.category === category) &&
        (!difficulty || q.difficulty === difficulty)
    );
  }, [category, difficulty]);

  return (
    <div className="p-6">
      <QuestionPanel
        category={getString(category)}
        setCategory={setCategory}
        difficulty={getString(difficulty)}
        setDifficulty={setDifficulty}
      />

      <QuestionTable data={filteredData} />
    </div>
  );
};

export default QuestionTableWithFilter;
