import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string; // Image URL
  alt?: string; // User's full name
  fallback?: string; // Override fallback text (optional)
  size?: string; // Tailwind sizing (e.g., "h-10 w-10")
  className?: string; // Extra styling
  fallbackLength?: 1 | 2; // Control whether fallback is 1 or 2 letters
}

const UserAvatar = ({
  src = "/profile.jpg",
  alt = "User",
  fallback,
  size = "size-10",
  className = "",
  fallbackLength = 1,
}: UserAvatarProps) => {
  // If fallback not provided, generate it from `alt`
  const generateFallback = () => {
    if (fallback) return fallback;
    if (!alt) return "U";

    const words = alt.trim().split(" ");
    if (fallbackLength === 2 && words.length >= 2) {
      return words[0][0]?.toUpperCase() + words[1][0]?.toUpperCase();
    }
    return words[0][0]?.toUpperCase() || "U";
  };

  return (
    <Avatar className={`${size} ${className}`}>
      <AvatarImage src={src} alt={alt} className="rounded-full object-cover" />
      <AvatarFallback>{generateFallback()}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
