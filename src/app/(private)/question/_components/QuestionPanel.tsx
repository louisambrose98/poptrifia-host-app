"use client";
import FilterDropdown from "@/components/FilterDropdown";
import { Button } from "@/components/ui/button";
import { EMPTY } from "@/constants/general";
import { CATEGORY_ENUM, DIFFICULTY_ENUM } from "@/constants/questions";

type Props = {
  category: string;
  setCategory: (value: string | null) => void;
  difficulty: string;
  setDifficulty: (value: string | null) => void;
};

const QuestionPanel = ({
  category,
  setCategory,
  difficulty,
  setDifficulty,
}: Props) => {
  const onReset = () => {
    setCategory(EMPTY);
    setDifficulty(EMPTY);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center">
      <span className="font-semibold text-lg mr-4">Questions</span>
      <FilterDropdown
        label="Category"
        options={CATEGORY_ENUM}
        value={category}
        onChange={setCategory}
      />
      <FilterDropdown
        label="Difficulty"
        options={DIFFICULTY_ENUM}
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
