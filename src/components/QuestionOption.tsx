import { sentence } from "@/lib/guards";

type Props = {
  value: string | number;
  isCorrect: boolean;
};

export const QuestionOption = ({ value, isCorrect }: Props) => {
  const baseStyle = "border-2 rounded-xl p-2";
  const correct = "bg-green-100 text-green-800 border-green-200";
  const incorrect = "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <div className={sentence(baseStyle, isCorrect ? correct : incorrect)}>
      {value}
    </div>
  );
};

export default QuestionOption;
