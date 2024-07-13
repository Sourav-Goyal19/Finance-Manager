"use client";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetCategory = (id: string, email: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["category", { id }],
    queryFn: async () => {
      const res = await client.api[":email"].categories[":id"].$get({
        param: {
          email,
          id,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch category");
      }
      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
