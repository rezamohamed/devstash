import { prisma } from "@/lib/prisma";
import type { User } from "@/features/users/types/user";

export async function getUser(userId: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return null;

  return {
    id: user.id,
    email: user.email || "",
    name: user.name,
    image: user.image,
    isPro: user.isPro,
  };
}

export async function getFirstUser(): Promise<User | null> {
  const user = await prisma.user.findFirst({
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!user) return null;

  return {
    id: user.id,
    email: user.email || "",
    name: user.name,
    image: user.image,
    isPro: user.isPro,
  };
}
