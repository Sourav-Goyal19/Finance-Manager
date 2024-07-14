import { InferResponseType, InferRequestType } from "hono";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api)[":email"]["accounts"]["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api)[":email"]["accounts"]["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteAccounts = (email: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await client.api[":email"]["accounts"][
        "bulk-delete"
      ].$post({
        json: data,
        param: {
          email,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || response.statusText;
        throw new Error(errorMessage);
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Account(s) deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete account(s)");
    },
  });
  return mutation;
};
