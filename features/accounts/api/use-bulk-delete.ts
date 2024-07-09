import { InferResponseType, InferRequestType } from "hono";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.accounts)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)["bulk-delete"]["$post"]
>["json"];

export const useBulkDelete = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      console.log(data);
      const response = await client.api.accounts["bulk-delete"].$post({
        json: data,
      });
      return response.json();
    },
    onSuccess: () => {
      toast.success("Account(s) deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete account(s)");
    },
  });
  return mutation;
};
