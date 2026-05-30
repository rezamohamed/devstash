"use client";

import { useState } from "react";
import { UserAvatar } from "@/components/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { DeleteAccountDialog } from "./DeleteAccountDialog";
import type { UserProfileStats } from "../data/profile";
import { format } from "date-fns";

interface ProfileViewProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
  };
  stats: UserProfileStats;
  hasPassword: boolean;
}

export function ProfileView({ user, stats, hasPassword }: ProfileViewProps) {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-main)" }}>
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-start gap-6 mb-10">
          <UserAvatar src={user.image} name={user.name ?? user.email} size="lg" />
          <div className="flex-1">
            <h1
              className="text-2xl font-bold mb-1"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              {user.name || "User"}
            </h1>
            <p
              className="text-sm"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}
            >
              {user.email}
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}
            >
              Member since {format(stats.createdAt, "MMMM yyyy")}
            </p>
          </div>
        </div>

        {/* Usage Stats */}
        <section className="mb-10">
          <h2
            className="text-lg font-semibold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            Usage Statistics
          </h2>
          <div
            className="grid grid-cols-2 gap-4 p-6 rounded-xl border"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
          >
            <div>
              <p
                className="text-3xl font-bold"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {stats.totalItems}
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}
              >
                Total Items
              </p>
            </div>
            <div>
              <p
                className="text-3xl font-bold"
                style={{
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {stats.totalCollections}
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}
              >
                Collections
              </p>
            </div>
          </div>
        </section>

        {/* Item Type Breakdown */}
        <section className="mb-10">
          <h2
            className="text-lg font-semibold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            Items by Type
          </h2>
          <div
            className="rounded-xl border p-4"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="flex flex-wrap gap-2">
              {stats.itemTypeBreakdown.map((type) => (
                <Badge
                  key={type.itemTypeId}
                  variant="outline"
                  className="px-3 py-1"
                  style={{
                    fontFamily: "var(--font-sans)",
                    borderColor: type.color,
                    color: type.color,
                  }}
                >
                  {type.name}: {type.count}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <Separator className="my-8" style={{ backgroundColor: "var(--border-color)" }} />

        {/* Account Actions */}
        <section>
          <h2
            className="text-lg font-semibold mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            Account Actions
          </h2>

          <div className="space-y-4">
            {/* Change Password — only for email/password users */}
            {hasPassword && (
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3
                      className="font-medium mb-1"
                      style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}
                    >
                      Change Password
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}
                    >
                      Update your account password
                    </p>
                  </div>
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="h-7 rounded-md border px-2.5 text-[0.8rem] font-semibold"
                    style={{
                      borderColor: "var(--border-color)",
                      backgroundColor: "var(--bg-sidebar)",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            )}

            {/* GitHub OAuth notice */}
            {!hasPassword && (
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "var(--border-color)" }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className="font-medium mb-1"
                      style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}
                    >
                      Signed in with GitHub
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}
                    >
                      Password management is handled through your GitHub account
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Account */}
            <div
              className="p-4 rounded-xl border"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "rgba(239, 68, 68, 0.3)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3
                    className="font-medium mb-1"
                    style={{ color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}
                  >
                    Delete Account
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-sans)" }}
                  >
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <button
                  onClick={() => setShowDeleteDialog(true)}
                  className="h-7 rounded-md px-2.5 text-[0.8rem] font-semibold text-white"
                  style={{
                    background: "rgba(239, 68, 68, 0.9)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modals */}
      {showChangePassword && <ChangePasswordForm onClose={() => setShowChangePassword(false)} />}
      {showDeleteDialog && <DeleteAccountDialog hasPassword={hasPassword} onClose={() => setShowDeleteDialog(false)} />}
    </div>
  );
}
