"use client";
import FilterDropdown from "@/components/FilterDropdown";
import { Button } from "@/components/ui/button";
import { EMPTY } from "@/constants/general";
import { CATEGORY_ENUM, DIFFICULTY_ENUM } from "@/constants/questions";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center w-full justify-between">
      <div className="flex gap-4 items-center">
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
      <Button onClick={() => router.push("/question/add")}>
        Create New Question
      </Button>
    </div>
  );
};

export default QuestionPanel;
