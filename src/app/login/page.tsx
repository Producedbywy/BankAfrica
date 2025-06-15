"use client";

import { useState, useEffect, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

// Isolated suspense wrapper for searchParams reading
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const registered = searchParams.get("registered");
    const emailParam = searchParams.get("email");

    if (registered && emailParam) {
      setSuccess("Account created successfully! Please sign in.");
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const emailInput = formData.get("email") as string;
    const passwordInput = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email: emailInput,
        password: passwordInput,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid email or password";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const demoEmail = "demo@lumo.finance";
    const demoPassword = "demo123";
    setEmail(demoEmail);

    setTimeout(async () => {
      try {
        const result = await signIn("credentials", {
          email: demoEmail,
          password: demoPassword,
          redirect: false,
        });

        if (result?.error) {
          throw new Error(result.error);
        }

        router.push("/");
        router.refresh();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Invalid email or password";
        setError(message);
      }
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-lumo-cream/80">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 bg-lumo-navy/50 border-lumo-teal/20 text-white placeholder:text-lumo-cream/50"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-lumo-cream/80">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1 bg-lumo-navy/50 border-lumo-teal/20 text-white placeholder:text-lumo-cream/50"
          placeholder="Enter your password"
        />
      </div>

      {success && (
        <div className="text-sm text-lumo-teal bg-lumo-teal/10 border border-lumo-teal/20 p-3 rounded-md flex items-center">
          ✅ {success}
        </div>
      )}

      {error && (
        <div className="text-sm text-lumo-orange bg-lumo-orange/10 border border-lumo-orange/20 p-3 rounded-md flex items-center">
          ⚠️ {error}
        </div>
      )}

      <Button type="submit" className="w-full bg-lumo-orange text-white hover:bg-lumo-yellow hover:text-lumo-navy transition-all" disabled={loading}>
        {loading ? "Signing in..." : "Sign in securely"}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full border-lumo-teal text-lumo-teal hover:bg-lumo-teal hover:text-white"
        onClick={handleDemoLogin}
      >
        Try Demo Account
      </Button>

      <div className="text-center text-sm mt-4">
        <span className="text-lumo-cream/60">Don&apos;t have an account?</span>{" "}
        <Link href="/register" className="text-lumo-teal hover:text-lumo-yellow transition-colors">
          Create one
        </Link>
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navigation />
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white font-serif mb-2">Digital Banking for Africa</h1>
          <p className="text-lumo-cream/80">Seamless, secure, and accessible financial services for everyone</p>
        </div>

        <Card className="w-full max-w-md border-0 bg-lumo-midnight/90 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-white">Welcome back</CardTitle>
            <p className="text-sm text-lumo-cream/80 text-center">
              Enter your details to access your secure banking
            </p>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading form…</div>}>
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

