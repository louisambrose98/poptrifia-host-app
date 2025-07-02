"use client";

import FormButton from "@/components/FormButton";
import FormCard from "@/components/FormCard";
import { FormInput } from "@/components/FormInput";
import { FormSelect } from "@/components/FormSelect";
import { FormWrapper } from "@/components/FormWrapper";
import { Button } from "@/components/ui/button";
import { CATEGORY_ENUM, DIFFICULTY_ENUM } from "@/constants/questions";
import { useAuthFormHandler } from "@/hooks/useAuthFormHandler";
import { isValidString } from "@/lib/guards";
import { QuestionFormSchema } from "@/schema";
import { QuestionFormData } from "@/schema/question";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  title: string;
  description: string;
  buttonText: string;
  defaultValues: QuestionFormData;
  id?: string | string[];
  successTitle: string;
  successDescription: string;
  successButtonText: string;
  leaveButtonText: string;
};

const QuestionForm = ({
  title,
  description,
  buttonText,
  defaultValues,
  id,
  successTitle,
  successDescription,
  successButtonText,
  leaveButtonText,
}: Props) => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues,
  });

  const { handleSubmit, formError, isLoading } = useAuthFormHandler({
    schema: QuestionFormSchema,
    callback: async (validatedData) => {
      return { success: true, answer: validatedData.answer };
    },
    errorMessage: "error",
    onSuccess: () => {
      setIsSuccess(true);
    },
  });

  const onSubmit = async (values: QuestionFormData) => {
    const result = await handleSubmit(values);

    if (result.success) {
      console.log("Email confirmation successful:", result.data);
    }
  };

  const resetForm = () => {
    form.reset();
    setIsSuccess(false);
  };

  const goBack = () => {
    router.push("/question");
  };

  const navToQuestionId = (id: string) => {
    router.push(`/question/${id}`);
  };

  const successButtonOnClick = () => {
    return isValidString(id) ? navToQuestionId(id) : resetForm();
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <FormCard
          title={successTitle}
          description={successDescription}
          showSubmitButton={false}
        >
          <div className="flex gap-4 mt-4">
            <Button onClick={successButtonOnClick}>{successButtonText}</Button>
            <Button variant="secondary" onClick={goBack}>
              {leaveButtonText}
            </Button>
          </div>
        </FormCard>
      </div>
    );
  }

  return (
    <FormCard title={title} description={description} error={formError}>
      <FormWrapper form={form} onSubmit={onSubmit}>
        <div className="space-y-4">
          <FormInput
            name="question"
            placeholder="Question text"
            type={"text"}
          />
          <FormInput name="optionOne" placeholder="Option One" type={"text"} />
          <FormInput name="optionTwo" placeholder="Option Two" type={"text"} />
          <FormInput
            name="optionThree"
            placeholder="Option Three"
            type={"text"}
          />
          <FormInput
            name="optionFour"
            placeholder="Option Four"
            type={"text"}
          />
          <FormInput name="answer" placeholder="Answer" type={"text"} />
          <FormInput name="timer" type="number" placeholder="Timer (seconds)" />
          <FormInput name="score" type="number" placeholder="Score" />

          <FormSelect
            name="questionType"
            label="Question Type"
            options={[
              { value: "multiple-choice", label: "Multiple Choice" },
              // Add more types as needed
            ]}
          />

          <FormSelect
            name="category"
            label="Category"
            options={CATEGORY_ENUM.map((cat) => ({
              value: cat,
              label: cat.replace(/_/g, " "),
            }))}
          />

          <FormSelect
            name="difficulty"
            label="Difficulty"
            options={DIFFICULTY_ENUM.map((diff) => ({
              value: diff,
              label: diff,
            }))}
          />

          <FormButton isLoading={isLoading} buttonText={buttonText} />
        </div>
      </FormWrapper>
    </FormCard>
  );
};

export default QuestionForm;
