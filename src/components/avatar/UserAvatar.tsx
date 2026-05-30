function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

export function UserAvatar({ src, name, size = "md" }: UserAvatarProps) {
  const sizeClass = sizeClasses[size];

  if (src) {
    return (
      <img
        src={src}
        alt={name ?? "Avatar"}
        className={`rounded-full object-cover ${sizeClass}`}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-muted flex items-center justify-center ${sizeClass}`}
      style={{ fontFamily: "var(--font-sans)", fontWeight: 700 }}
    >
      {getInitials(name)}
    </div>
  );
}
