"use client";
import FilterDropdown from "@/components/FilterDropdown";
import { Button } from "@/components/ui/button";

type Props = {
  categoryOptions: string[];
  difficultyOptions: string[];
  category: string;
  setCategory: (value: string | null) => void;
  difficulty: string;
  setDifficulty: (value: string | null) => void;
};

const QuestionPanel = ({
  categoryOptions,
  difficultyOptions,
  category,
  setCategory,
  difficulty,
  setDifficulty,
}: Props) => {
  const onReset = () => {
    setCategory("");
    setDifficulty("");
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center">
      <span className="font-semibold text-lg mr-4">Questions</span>
      <FilterDropdown
        label="Category"
        options={categoryOptions}
        value={category}
        onChange={setCategory}
      />
      <FilterDropdown
        label="Difficulty"
        options={difficultyOptions}
        value={difficulty}
        onChange={setDifficulty}
      />
      {(category || difficulty) && (
        <Button variant="destructive" onClick={onReset}>
          Reset Filters
        </Button>
      )}
    </div>
  );
};

export default QuestionPanel;
