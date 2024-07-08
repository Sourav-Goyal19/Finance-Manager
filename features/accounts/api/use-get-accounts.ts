"use client";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetAccounts = (userId: string) => {
  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const res = await client.api.accounts[":userId"].$get({
        param: {
          userId,
        },
      });

      console.log(res);

      if (!res.ok) {
        throw new Error("Failed to fetch accounts");
      }
      const { data } = await res.json();
      console.log(data);
      return data;
    },
  });
  return query;
};
