"use client";

import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsGoogle } from "react-icons/bs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

const AuthForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        console.error("Sign-in error:", result.error);
        toast.error("Invalid Credentials");
      } else {
        toast.success("Login Successfully");
        router.push("/");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = () => {
    setIsLoading(true);
    try {
      signIn("google", {
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-7 mt-5 max-w-[550px] mx-3 shadow-xl w-full">
      <Button
        onClick={signInWithGoogle}
        disabled={isLoading}
        className="w-full flex gap-2 items-center text-base"
        variant={"outline"}
      >
        <BsGoogle /> Google
      </Button>
      <div className="relative mt-6 mb-4">
        <div className="absolute border top-3 w-full"></div>
        <div className="relative flex items-center justify-center">
          <p className="bg-white text-gray-900/75 px-2">Or Continue With</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter Your Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="password"
                    placeholder="Enter Your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            Sign In
          </Button>
        </form>
      </Form>
      <div className="mt-4">
        <p className="text-center">
          New Here?{" "}
          <Link href={"/sign-up"} className="font-medium underline">
            Create An Account
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
