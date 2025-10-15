"use client";

import { useRef, useState, DragEvent } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import adminService from "@/services/adminService";
import { useUserStore } from "@/store/userStore";

interface UserAvatarProps {
  userId: string;
  loading: boolean; // overall component loading
  title?: string;
  src?: string;
  alt?: string;
  fallback?: string;
  size?: string;
  className?: string;
  fallbackLength?: 1 | 2;
}

type ApiResponseType = {
  error?: string;
  statusCode?: string;
};

const UserAvatar = ({
  userId,
  loading,
  title,
  src = "/profile.jpg",
  alt = "User",

  size = "size-20",
}: UserAvatarProps) => {
  const [preview, setPreview] = useState<string | null>(src);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { setUser, user } = useUserStore();

  // const handleUpload = async (file: File) => {
  //   setUploading(true);
  //   const formData = new FormData();
  //   formData.append("file", file);

  //   try {
  //     const res = await fetch("/api/upload-profile-picture", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await res.json();

  //     if (data.url) {
  //       const response = (await adminService.editUserProfilePicture(
  //         userId,
  //         data.url
  //       )) as ApiResponseType;

  //       if (response.error || response.statusCode) {
  //         throw new Error("Failed to update profile picture");
  //       }

  //       // Update global user state
  //       if (user) {
  //         setUser({ ...user, profilePicture: data.url });
  //       }
  //       setPreview(data.url);
  //     } else {
  //       console.error("Cloudinary upload failed", data);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    // keep reference to old image
    const oldImageUrl = user?.profilePicture;

    try {
      const res = await fetch("/api/upload-profile-picture", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        const response = (await adminService.editUserProfilePicture(
          userId,
          data.url
        )) as ApiResponseType;

        if (response.error || response.statusCode) {
          throw new Error("Failed to update profile picture");
        }

        // Update global user state
        if (user) {
          setUser({ ...user, profilePicture: data.url });
        }

        setPreview(data.url);
        console.log(oldImageUrl, "This is the old Image");

        // 🔇 silently delete the old image in the background
        if (oldImageUrl && oldImageUrl.includes("cloudinary.com")) {
          fetch("/api/delete-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: oldImageUrl }),
          });
        }
      } else {
        console.error("Cloudinary upload failed", data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
      handleUpload(file);
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
      handleUpload(file);
    }
  };

  const sizeMap: { [key: string]: string } = {
    "size-20": "w-20 h-20",
    "size-24": "w-24 h-24",
    "size-32": "w-32 h-32",
  };

  const avatarSize = sizeMap[size] || size;

  // If the whole component is loading
  if (loading) {
    return (
      <section className="flex items-center gap-4 bg-white px-12 py-6 rounded-[12px]">
        <Skeleton className={`${avatarSize} rounded-full`} />
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-16" />
        </div>
      </section>
    );
  }

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
          className={`${avatarSize} rounded-full overflow-hidden bg-gray-200 relative`}
        >
          {uploading ? (
            <Skeleton className="w-full h-full rounded-full" />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={80}
              height={80}
              className="w-full h-full object-cover"
              unoptimized
            />
          )}
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
