"use client";
import FilterDropdown from "@/components/FilterDropdown";
import { Button } from "@/components/ui/button";

type Props = {
  typeOptions: string[];
  categoryOptions: string[];
  difficultyOptions: string[];
  type: string;
  setType: (value: string | null) => void;
  category: string;
  setCategory: (value: string | null) => void;
  difficulty: string;
  setDifficulty: (value: string | null) => void;
};

const QuestionPanel = ({
  typeOptions,
  categoryOptions,
  difficultyOptions,
  type,
  setType,
  category,
  setCategory,
  difficulty,
  setDifficulty,
}: Props) => {
  const onReset = () => {
    setType("");
    setCategory("");
    setDifficulty("");
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center">
      <span className="font-semibold text-lg mr-4">Questions</span>
      <FilterDropdown
        label="Type"
        options={typeOptions}
        value={type}
        onChange={setType}
      />
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
      {(type || category || difficulty) && (
        <Button variant="destructive" onClick={onReset}>
          Reset Filters
        </Button>
      )}
    </div>
  );
};

export default QuestionPanel;
