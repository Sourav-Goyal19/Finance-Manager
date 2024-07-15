"use client";

import { useState } from "react";
import axios from "axios";
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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type variant = "signup" | "verify";

const AuthForm = () => {
  const [step, setStep] = useState<variant>("signup");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signupSchema = z.object({
    name: z.string().min(3).trim(),
    email: z.string().email().trim(),
    password: z
      .string()
      .min(6, "Password must contain at least 6 character(s)")
      .trim(),
  });

  const otpSchema = z.object({
    otp: z.string().length(6),
  });

  type SignupFormValues = z.infer<typeof signupSchema>;
  type OtpFormValues = z.infer<typeof otpSchema>;

  const signupForm = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const otpForm = useForm<OtpFormValues>({
    defaultValues: {
      otp: "",
    },
    resolver: zodResolver(otpSchema),
  });

  const onSignupSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/users/signup", data);
      toast.success(response.data.message);
      router.push("/sign-in");
      // setStep("verify");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Signup error:", error.response?.data.error);
        toast.error(error.response?.data.error || "An error occurred");
      } else {
        console.error("An unexpected error occurred:", error);
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onOtpSubmit: SubmitHandler<OtpFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/users/verifyotp", {
        email: signupForm.getValues("email"),
        otp: data.otp,
      });
      if (response.status === 200) {
        router.push("/sign-in");
        toast.success("OTP verified successfully");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("OTP verification error:", error.response?.data.error);
        toast.error(error.response?.data.error || "An error occurred");
      } else {
        console.error("An unexpected error occurred:", error);
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      const response = await axios.post("/api/users/resendotp", {
        email: signupForm.getValues("email"),
      });
      toast.success("New OTP sent. Please check your email.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("OTP resend error:", error.response?.data.error);
        toast.error(error.response?.data.error || "An error occurred");
      } else {
        console.error("An unexpected error occurred:", error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="border rounded-lg p-7 mt-5 max-w-[550px] mx-3 shadow-xl w-full">
      {step === "signup" ? (
        <>
          <Form {...signupForm}>
            <form
              onSubmit={signupForm.handleSubmit(onSignupSubmit)}
              className="space-y-5"
            >
              <FormField
                control={signupForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter Your Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
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
                control={signupForm.control}
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
                Sign Up
              </Button>
            </form>
          </Form>
          <div className="mt-4">
            <p className="text-center">
              Already Have An Account?{" "}
              <Link href={"/sign-in"} className="font-medium underline">
                Login Here
              </Link>
            </p>
          </div>
        </>
      ) : (
        <Form {...otpForm}>
          <form
            onSubmit={otpForm.handleSubmit(onOtpSubmit)}
            className="space-y-5"
          >
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter OTP"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              Verify OTP
            </Button>
            <Button
              disabled={isLoading}
              type="button"
              variant="outline"
              className="w-full"
              onClick={resendOtp}
            >
              Resend OTP
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default AuthForm;
