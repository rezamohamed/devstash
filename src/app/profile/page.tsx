import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ProfileView } from "@/features/profile/components/ProfileView";
import { getUserStats, hasPasswordAccount } from "@/features/profile/data/profile";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const [stats, passwordAccount] = await Promise.all([
    getUserStats(session.user.id),
    hasPasswordAccount(session.user.id),
  ]);

  return (
    <ProfileView
      user={{
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image ?? null,
      }}
      stats={stats}
      hasPassword={passwordAccount}
    />
  );
}
