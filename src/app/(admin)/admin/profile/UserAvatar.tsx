"use client";
import { useRef, useState, DragEvent } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";

interface UserAvatarProps {
  title?: string;
  src?: string;
  alt?: string;
  fallback?: string;
  size?: string;
  className?: string;
  fallbackLength?: 1 | 2;
  onImageUpload?: (file: File) => void;
}

const UserAvatar = ({
  title,
  src = "/profile.jpg",
  alt = "User",
  fallback,
  size = "size-20",
  className = "",
  fallbackLength = 1,
  onImageUpload,
}: UserAvatarProps) => {
  const [preview, setPreview] = useState<string | null>(src);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const generateFallback = () => {
    if (fallback) return fallback;
    if (!alt) return "U";

    const words = alt.trim().split(" ");
    if (fallbackLength === 2 && words.length >= 2) {
      return words[0][0]?.toUpperCase() + words[1][0]?.toUpperCase();
    }
    return words[0][0]?.toUpperCase() || "U";
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
      onImageUpload?.(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => setPreview(event.target?.result as string);
      reader.readAsDataURL(file);
      onImageUpload?.(file);
    }
  };

  const sizeMap: { [key: string]: string } = {
    "size-20": "w-20 h-20",
    "size-24": "w-24 h-24",
    "size-32": "w-32 h-32",
  };

  const avatarSize = sizeMap[size] || size;
  console.log(src, "This is the src");

  return (
    <section className="flex items-center gap-4 bg-white px-12 py-6 rounded-[12px]">
      <div
        className={`relative cursor-pointer rounded-full transition-all duration-200 ${
          isDragging ? "ring-4 ring-blue-400 ring-offset-2" : ""
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className={`${avatarSize} rounded-full overflow-hidden bg-gray-200`}
        >
          <Image
            src={src}
            alt={alt}
            width={80}
            height={80}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          title="Upload profile image"
          aria-label="Upload profile image"
          onChange={handleFileChange}
        />

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center rounded-full bg-black transition-opacity duration-200 ${
            isHovering || isDragging ? "opacity-60" : "opacity-0"
          }`}
        >
          <Upload className="w-6 h-6 text-white mb-1" />
          <p className="text-white text-xs font-medium">
            {isDragging ? "Drop image" : "Upload"}
          </p>
        </div>

        {/* Drag overlay indicator */}
        {isDragging && (
          <div className="absolute inset-0 rounded-full border-2 border-white border-dashed pointer-events-none flex items-center justify-center">
            <div className="text-white text-center text-sm font-semibold drop-shadow-lg">
              Drop your image here
            </div>
          </div>
        )}
      </div>

      <div>
        {title && <p className="font-semibold text-lg">{title}</p>}
        <p className="text-gray-500 text-sm">Admin</p>
      </div>
    </section>
  );
};

export default UserAvatar;
