"use client";

import FormButton from "@/components/FormButton";
import FormCard from "@/components/FormCard";
import { FormInput } from "@/components/FormInput";
import { FormSelect } from "@/components/FormSelect";
import { FormWrapper } from "@/components/FormWrapper";
import { Button } from "@/components/ui/button";
import { QUIZ_STATUS_ENUM } from "@/constants/quiz";
import { useAuthFormHandler } from "@/hooks/useAuthFormHandler";
import { isValidString } from "@/lib/guards";
import { QuizFormSchema } from "@/schema";
import { QuizFormData } from "@/schema/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  title: string;
  description: string;
  buttonText: string;
  defaultValues: QuizFormData;
  id?: string | string[];
  successTitle: string;
  successDescription: string;
  successButtonText: string;
  leaveButtonText: string;
};

const QuizForm = ({
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

  const form = useForm<QuizFormData>({
    resolver: zodResolver(QuizFormSchema),
    defaultValues,
  });

  const { handleSubmit, formError, isLoading } = useAuthFormHandler({
    schema: QuizFormSchema,
    callback: async (validatedData) => {
      return { success: true, room: validatedData.room };
    },
    errorMessage: "error",
    onSuccess: () => {
      setIsSuccess(true);
    },
  });

  const onSubmit = async (values: QuizFormData) => {
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
    router.push("/quiz");
  };

  const navToQuizId = (id: string) => {
    router.push(`/quiz/${id}`);
  };

  const successButtonOnClick = () => {
    return isValidString(id) ? navToQuizId(id) : resetForm();
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
          <FormInput name="name" placeholder="Quiz Name" type="text" />
          <FormInput name="room" placeholder="Room" type="text" />
          <FormInput
            name="numQuestions"
            placeholder="Number of Questions"
            type="number"
          />
          <FormInput
            name="duration"
            placeholder="Duration (minutes)"
            type="number"
          />
          <FormInput name="animation" placeholder="Animation" type="number" />
          <FormInput name="quizDate" placeholder="Quiz Date" type="date" />
          <FormInput name="startTime" placeholder="Start Time" type="time" />
          <FormInput name="endTime" placeholder="End Time" type="time" />
          <FormInput
            name="winner"
            placeholder="Winner (optional)"
            type="text"
          />
          <FormInput
            name="numPlayers"
            placeholder="Number of Players (optional)"
            type="number"
          />

          <FormSelect
            name="status"
            label="Status"
            options={QUIZ_STATUS_ENUM.map((status) => ({
              value: status,
              label: status,
            }))}
          />

          <FormButton isLoading={isLoading} buttonText={buttonText} />
        </div>
      </FormWrapper>
    </FormCard>
  );
};

export default QuizForm;
