"use client";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetAccounts = (id: string, email: string) => {
  const query = useQuery({
    queryKey: ["account", { id }],
    queryFn: async () => {
      const res = await client.api.accounts[":id"].$get({
        query: {
          email,
        },
        param: {
          id,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch account");
      }
      const { data } = await res.json();
      console.log(data);
      return data;
    },
  });
  return query;
};
