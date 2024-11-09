import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z, { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const useZodForm = (
  schema: ZodSchema,
  mutation: UseMutateFunction,
  defaultValues?: any
) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues },
  });

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = form;

  const onFormSubmit = handleSubmit(async (values) => {
    return mutation({ ...values });
  });

  return { form, register, watch, reset, onFormSubmit, errors };
};
