import { createWorkspace } from "@/actions/workspace";
import { useMutationData } from "@/hooks/useMutationData";
import { useZodForm } from "@/hooks/useZodForm";
import { workspaceSchema } from "@/components/forms/workspace-form/schema";

export const useCreateWorkspace = () => {
  const { mutate, isPending } = useMutationData(
    ["create-workspace"],
    (data: { name: string }) => createWorkspace(data.name),
    "user-workspaces"
  );

  const { errors, onFormSubmit, register } = useZodForm(
    workspaceSchema,
    mutate
  );

  return { errors, onFormSubmit, register, isPending };
};
