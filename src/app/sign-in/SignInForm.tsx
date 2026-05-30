"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: (ctx) => {
          if (ctx.error.status === 403) {
            setError("Please verify your email address before signing in. Check your inbox for the verification link.");
          } else {
            setError(ctx.error.message ?? "Sign in failed");
          }
          setLoading(false);
        },
        onSuccess: () => {
          window.location.href = "/";
        },
      }
    );
  };

  const handleGitHubSignIn = async () => {
    setError("");
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--bg-main)" }}
    >
      <div
        className="w-full max-w-md p-8 rounded-xl border"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-color)",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "var(--accent-gradient)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "20px",
                fontWeight: 800,
                color: "white",
              }}
            >
              D
            </span>
          </div>
        </div>

        <h1
          className="text-center mb-2"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "24px",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          Welcome back
        </h1>
        <p
          className="text-center mb-8"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            color: "var(--text-muted)",
          }}
        >
          Sign in to your DevStash account
        </p>

        {error && (
          <div
            className="mb-4 p-3 rounded-lg border text-sm"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              borderColor: "rgba(239, 68, 68, 0.3)",
              color: "#ef4444",
              fontFamily: "var(--font-sans)",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-1.5 text-sm"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                color: "var(--text-secondary)",
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-10 px-3 rounded-lg border text-sm"
              style={{
                backgroundColor: "var(--bg-sidebar)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
              }}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1.5 text-sm"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                color: "var(--text-secondary)",
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-10 px-3 rounded-lg border text-sm"
              style={{
                backgroundColor: "var(--bg-sidebar)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 rounded-lg text-white text-sm font-semibold"
            style={{
              background: "var(--accent-gradient)",
              fontFamily: "var(--font-sans)",
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div
          className="flex items-center gap-4 my-6"
          style={{ color: "var(--text-muted)" }}
        >
          <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-color)" }} />
          <span
            className="text-xs"
            style={{ fontFamily: "var(--font-sans)", color: "var(--text-muted)" }}
          >
            or
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "var(--border-color)" }} />
        </div>

        <button
          type="button"
          onClick={handleGitHubSignIn}
          className="w-full h-10 rounded-lg border text-sm font-semibold flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--bg-sidebar)",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-sans)",
          }}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          Sign in with GitHub
        </button>

        <p
          className="text-center mt-6 text-sm"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--text-muted)",
          }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            style={{
              color: "var(--text-primary)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
