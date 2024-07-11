import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api)[":email"]["transactions"]["bulk-create"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api)[":email"]["transactions"]["bulk-create"]["$post"]
>["json"];

export const useBulkCreateTransactions = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api[":email"].transactions[
        "bulk-create"
      ].$post({
        json,
        param: {
          email,
        },
      });
      return response.json();
    },
    onSuccess: () => {
      toast.success("Transactions created successfully");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create transactions");
    },
  });
};
