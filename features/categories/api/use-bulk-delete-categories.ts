import { InferResponseType, InferRequestType } from "hono";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api)[":email"]["categories"]["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api)[":email"]["categories"]["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteCategories = (email: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await client.api[":email"]["categories"][
        "bulk-delete"
      ].$post({
        json: data,
        param: {
          email,
        },
      });
      return response.json();
    },
    onSuccess: () => {
      toast.success("Categories deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete categories");
    },
  });
  return mutation;
};
