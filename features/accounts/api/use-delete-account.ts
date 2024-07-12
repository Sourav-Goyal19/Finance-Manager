import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api)[":email"]["accounts"][":id"]["$delete"]
>;

export const useDeleteAccount = (id: string, email: string) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api[":email"].accounts[":id"].$delete({
        param: {
          id,
          email,
        },
      });
      return response.json();
    },
    onSuccess: () => {
      toast.success("Account deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["account", { id }] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to delete account");
    },
  });
};
