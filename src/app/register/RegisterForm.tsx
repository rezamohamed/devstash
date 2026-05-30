"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Registration failed");
        setLoading(false);
        return;
      }

      router.push("/sign-in?registered=true");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
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
          Create your account
        </h1>
        <p
          className="text-center mb-8"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            color: "var(--text-muted)",
          }}
        >
          Start organizing your developer knowledge
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
              htmlFor="name"
              className="block mb-1.5 text-sm"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                color: "var(--text-secondary)",
              }}
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full h-10 px-3 rounded-lg border text-sm"
              style={{
                backgroundColor: "var(--bg-sidebar)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
              }}
              placeholder="Your name"
            />
          </div>

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
              minLength={8}
              className="w-full h-10 px-3 rounded-lg border text-sm"
              style={{
                backgroundColor: "var(--bg-sidebar)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
              }}
              placeholder="Min. 8 characters"
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
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p
          className="text-center mt-6 text-sm"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--text-muted)",
          }}
        >
          Already have an account?{" "}
          <Link
            href="/sign-in"
            style={{
              color: "var(--text-primary)",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
