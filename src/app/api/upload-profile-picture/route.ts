import { NextRequest, NextResponse } from "next/server";

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
const UPLOAD_PRESET = "ml_default";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const fileFromForm = data.get("file") as Blob | null;

    if (!fileFromForm) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Ensure we have a File instance with a name, converting Blob if necessary
    let fileToUpload: File;
    if (fileFromForm instanceof File) {
      fileToUpload = fileFromForm;
    } else {
      fileToUpload = new File([fileFromForm], "file.jpg");
    }

    const formData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: result }, { status: 500 });
    }

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
