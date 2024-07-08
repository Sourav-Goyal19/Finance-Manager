"use client";

import axios from "axios";
import { useUser } from "@/zustand/user";
import { useSession } from "next-auth/react";
import { useEffect, useCallback } from "react";

const FetchUser = () => {
  const { setUser } = useUser();
  const { data } = useSession();
  const email = data?.user?.email;

  const getUser = useCallback(async () => {
    if (!email) return;
    try {
      const res = await axios.get(`/api/users/get/${email}`);
      console.log(res.data);
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  }, [email, setUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return null;
};

export default FetchUser;
