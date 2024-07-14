import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api)[":email"]["categories"][":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api)[":email"]["categories"][":id"]["$patch"]
>["json"];

export const useEditCategory = (id: string, email: string) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api[":email"].categories[":id"].$patch({
        param: {
          id,
          email,
        },
        json,
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || response.statusText;
        throw new Error(errorMessage);
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["category", { id }] });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Failed to update category");
    },
  });
};
