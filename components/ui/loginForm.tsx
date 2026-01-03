"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useLogin";

interface LoginFormProps {
  heading?: string;
  signupUrl?: string;
}

const LoginForm = ({
  heading = "Sign in to your account",
  signupUrl = "/signup",
}: LoginFormProps) => {
  const router = useRouter();
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginMutation.mutateAsync({
        email,
        password,
      });

      /**
       * ✅ If API returns success
       * (adjust condition based on your backend response)
       */
      if (res?.user || res?.success) {
        toast.success("Logged in successfully 🎉", {
          description: "Redirecting to your profile",
        });

        router.push("/profile");
      } else {
        toast.error("Login failed", {
          description: "Invalid email or password",
        });
      }
    } catch (err: any) {
      toast.error("Authentication failed", {
        description: err?.message || "Please check your credentials",
      });
    }
  };

  return (
    <div className="rounded-2xl border bg-background p-8 shadow-xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">ServeCity</h1>
        <p className="mt-2 text-sm text-muted-foreground">{heading}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-5">
        <Input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>

        {/* Divider */}
        <div className="relative flex items-center">
          <span className="w-full border-t" />
          <span className="absolute left-1/2 -translate-x-1/2 bg-background px-3 text-xs text-muted-foreground">
            OR
          </span>
        </div>

        <Button variant="outline" type="button" className="w-full gap-2">
          <FcGoogle className="size-5" />
          Continue with Google
        </Button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don’t have an account?{" "}
        <a
          href={signupUrl}
          className="font-medium text-primary hover:underline"
        >
          Sign up
        </a>
      </p>
    </div>
  );
};

export { LoginForm };
