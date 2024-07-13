"use client";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetAccount = (id: string, email: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["account", { id }],
    queryFn: async () => {
      const res = await client.api[":email"].accounts[":id"].$get({
        param: {
          email,
          id,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch account");
      }
      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
