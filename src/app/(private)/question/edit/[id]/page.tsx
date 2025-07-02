"use client";
import FormCard from "@/components/FormCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORY_ENUM, DIFFICULTY_ENUM } from "@/constants/questions";
import { QuestionFormData, QuestionFormSchema } from "@/schema";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

// Mock fetch function (replace with real data fetching logic)
const mockQuestion = {
  id: "1",
  question: "What is the capital of France?",
  optionOne: "Paris",
  optionTwo: "London",
  optionThree: "Berlin",
  optionFour: "Madrid",
  answer: "Paris",
  timer: 30,
  score: 10,
  questionType: "multiple-choice",
  category: "Geography",
  difficulty: "Easy",
};

export default function EditQuestionPage() {
  const router = useRouter();
  const { id } = useParams();
  // TODO: Fetch question by id
  const [form, setForm] = useState<QuestionFormData>({
    question: mockQuestion.question,
    optionOne: mockQuestion.optionOne,
    optionTwo: mockQuestion.optionTwo,
    optionThree: mockQuestion.optionThree,
    optionFour: mockQuestion.optionFour,
    answer: mockQuestion.answer,
    timer: mockQuestion.timer,
    score: mockQuestion.score,
    questionType: mockQuestion.questionType,
    category: mockQuestion.category,
    difficulty: mockQuestion.difficulty,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === "number" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = QuestionFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    // TODO: Update logic
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <FormCard
          title="Question Updated!"
          description="Your question has been updated."
          showSubmitButton={false}
        >
          <div className="flex gap-4 mt-4">
            <Button onClick={() => router.push(`/question/${id}`)}>
              View Question
            </Button>
            <Button
              variant="secondary"
              onClick={() => router.push("/question")}
            >
              Return to Questions
            </Button>
          </div>
        </FormCard>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <form onSubmit={handleSubmit} className="w-full flex justify-center">
        <FormCard
          title="Edit Question"
          description="Update the fields and save your changes."
          showSubmitButton={true}
          submitText="Update Question"
          onSubmit={handleSubmit}
          error={Object.values(errors)[0]}
        >
          <Input
            name="question"
            placeholder="Question text"
            value={form.question}
            onChange={handleChange}
            required
          />
          {errors.question && (
            <div className="text-red-500 text-xs">{errors.question}</div>
          )}
          <Input
            name="optionOne"
            placeholder="Option One"
            value={form.optionOne}
            onChange={handleChange}
            required
          />
          {errors.optionOne && (
            <div className="text-red-500 text-xs">{errors.optionOne}</div>
          )}
          <Input
            name="optionTwo"
            placeholder="Option Two"
            value={form.optionTwo}
            onChange={handleChange}
            required
          />
          {errors.optionTwo && (
            <div className="text-red-500 text-xs">{errors.optionTwo}</div>
          )}
          <Input
            name="optionThree"
            placeholder="Option Three"
            value={form.optionThree}
            onChange={handleChange}
            required
          />
          {errors.optionThree && (
            <div className="text-red-500 text-xs">{errors.optionThree}</div>
          )}
          <Input
            name="optionFour"
            placeholder="Option Four"
            value={form.optionFour}
            onChange={handleChange}
            required
          />
          {errors.optionFour && (
            <div className="text-red-500 text-xs">{errors.optionFour}</div>
          )}
          <Input
            name="answer"
            placeholder="Answer (must match one of the options)"
            value={form.answer}
            onChange={handleChange}
            required
          />
          {errors.answer && (
            <div className="text-red-500 text-xs">{errors.answer}</div>
          )}
          <Input
            name="timer"
            type="number"
            placeholder="Timer (seconds)"
            value={form.timer}
            onChange={handleChange}
            required
            min={1}
          />
          {errors.timer && (
            <div className="text-red-500 text-xs">{errors.timer}</div>
          )}
          <Input
            name="score"
            type="number"
            placeholder="Score"
            value={form.score}
            onChange={handleChange}
            required
            min={1}
          />
          {errors.score && (
            <div className="text-red-500 text-xs">{errors.score}</div>
          )}
          <select
            name="questionType"
            value={form.questionType}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="multiple-choice">Multiple Choice</option>
            {/* Add more types as needed */}
          </select>
          {errors.questionType && (
            <div className="text-red-500 text-xs">{errors.questionType}</div>
          )}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            {CATEGORY_ENUM.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <div className="text-red-500 text-xs">{errors.category}</div>
          )}
          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            {DIFFICULTY_ENUM.map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
          {errors.difficulty && (
            <div className="text-red-500 text-xs">{errors.difficulty}</div>
          )}
        </FormCard>
      </form>
    </div>
  );
}
