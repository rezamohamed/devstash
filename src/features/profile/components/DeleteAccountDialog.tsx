"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface DeleteAccountDialogProps {
  hasPassword: boolean;
  onClose: () => void;
}

export function DeleteAccountDialog({ hasPassword, onClose }: DeleteAccountDialogProps) {
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isConfirmValid =
    !hasPassword || (password.length >= 8 && confirmText === "DELETE");

  const handleDelete = async () => {
    if (!isConfirmValid) return;

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/profile/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hasPassword ? { password } : {}),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to delete account");
      }

      window.location.href = "/sign-in?deleted=true";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete account");
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md p-6 rounded-xl border shadow-lg"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "rgba(239, 68, 68, 0.3)",
        }}
      >
        <h2
          className="text-xl font-bold mb-2"
          style={{ color: "#ef4444", fontFamily: "var(--font-display)" }}
        >
          Delete Account
        </h2>
        <p
          className="mb-4 text-sm"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}
        >
          This action cannot be undone. All your data will be permanently deleted.
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

        {hasPassword && (
          <div className="mb-4 space-y-3">
            <div>
              <label
                htmlFor="delete-password"
                className="block mb-1.5 text-sm"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  color: "var(--text-secondary)",
                }}
              >
                Enter your password to confirm
              </label>
              <Input
                id="delete-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
              />
            </div>
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="delete-confirm"
            className="block mb-1.5 text-sm"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              color: "var(--text-secondary)",
            }}
          >
            Type <span style={{ fontWeight: 700, color: "#ef4444" }}>DELETE</span> to confirm
          </label>
          <Input
            id="delete-confirm"
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="DELETE"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-9 rounded-lg border text-sm font-semibold"
            style={{
              borderColor: "var(--border-color)",
              backgroundColor: "var(--bg-sidebar)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-sans)",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={!isConfirmValid || loading}
            className="flex-1 h-9 rounded-lg text-white text-sm font-semibold"
            style={{
              background: "rgba(239, 68, 68, 0.9)",
              fontFamily: "var(--font-sans)",
              opacity: !isConfirmValid || loading ? 0.5 : 1,
              cursor: !isConfirmValid || loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
