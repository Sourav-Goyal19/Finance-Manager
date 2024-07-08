"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./button";
import { useEffect, useRef, useState } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UserAvatar = () => {
  const a = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const logoutbtnref = useRef<HTMLButtonElement>(null);
  const user = a.data?.user;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        logoutbtnref.current &&
        !logoutbtnref.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.documentElement.addEventListener("click", handleClickOutside);
    return () => {
      document.documentElement.removeEventListener("click", handleClickOutside);
    };
  }, [logoutbtnref, setIsOpen]);

  return (
    <div className="relative flex w-36 flex-col">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant={"outline"}
        className="transition truncate focus-visible:bg-white"
      >
        {user?.name}
      </Button>
      {isOpen && (
        <Button
          onClick={() => {
            signOut();
            toast.success("Logged out successfully");
            router.push("/sign-in");
          }}
          ref={logoutbtnref}
          className="absolute top-12 inset-x-0 text-black"
          variant={"secondary"}
        >
          <LogOut className="size-4" />
          Logout
        </Button>
      )}
    </div>
  );
};

export default UserAvatar;
