import { AuthContext } from "@/context/AuthContext";
import { formHandler, FormHandlerResult } from "@/lib/formHandler";
import { useContext, useState } from "react";
import { z } from "zod";

export type UseAuthFormHandlerProps<TData, TResult> = {
  schema: z.ZodSchema<TData>;
  callback: (validatedData: TData) => Promise<TResult>;
  errorMessage?: string;
  onSuccess?: (result: TResult) => void;
  onError?: (error: string) => void;
};

export const useAuthFormHandler = <TData, TResult>({
  schema,
  callback,
  errorMessage,
  onSuccess,
  onError,
}: UseAuthFormHandlerProps<TData, TResult>) => {
  const { authDispatch, authState } = useContext(AuthContext);
  const [formError, setFormError] = useState<string | undefined>(undefined);

  const handleSubmit = async (
    data: TData
  ): Promise<FormHandlerResult<TResult>> => {
    // Clear previous errors
    setFormError(undefined);

    const result = await formHandler({
      data,
      schema,
      isLoading: authState.isLoading,
      dispatch: authDispatch,
      callback,
      errorMessage,
      onSuccess,
      onError: (error: string) => {
        setFormError(error);
        onError?.(error);
      },
    });

    return result;
  };

  return {
    handleSubmit,
    formError,
    setFormError,
    isLoading: authState.isLoading,
  };
};
