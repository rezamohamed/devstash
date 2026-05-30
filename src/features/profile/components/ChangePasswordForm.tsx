"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

interface ChangePasswordFormProps {
  onClose: () => void;
}

export function ChangePasswordForm({ onClose }: ChangePasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to change password");
        setLoading(false);
        return;
      }

      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Sheet open onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Change Password</SheetTitle>
          <SheetDescription>
            Enter your current password and choose a new password.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div
              className="p-3 rounded-lg border text-sm"
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

          <div>
            <label
              htmlFor="current-password"
              className="block mb-1.5 text-sm"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                color: "var(--text-secondary)",
              }}
            >
              Current Password
            </label>
            <Input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label
              htmlFor="new-password"
              className="block mb-1.5 text-sm"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                color: "var(--text-secondary)",
              }}
            >
              New Password
            </label>
            <Input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              placeholder="Enter new password (min 8 characters)"
            />
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block mb-1.5 text-sm"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                color: "var(--text-secondary)",
              }}
            >
              Confirm New Password
            </label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              placeholder="Confirm new password"
            />
          </div>

          <div className="flex gap-3 pt-4">
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
              type="submit"
              disabled={loading}
              className="flex-1 h-9 rounded-lg text-white text-sm font-semibold"
              style={{
                background: "var(--accent-gradient)",
                fontFamily: "var(--font-sans)",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
