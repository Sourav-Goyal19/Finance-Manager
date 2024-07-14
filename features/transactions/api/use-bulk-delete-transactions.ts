import { toast } from "sonner";
import { client } from "@/lib/hono";
import { InferResponseType, InferRequestType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  (typeof client.api)[":email"]["transactions"]["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api)[":email"]["transactions"]["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteTransactions = (email: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await client.api[":email"]["transactions"][
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
      toast.success("Transaction(s) deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete transaction(s)");
    },
  });
  return mutation;
};
