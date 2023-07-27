import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  auto_quality: "auto",
});

export async function POST(req: Request) {
  const { path } = await req.json();

  if (!path) {
    return NextResponse.json(
      { message: "Image path is required" },
      { status: 400 }
    );
  }

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: "Recipes",
      transformation: [
        {
          width: 1000,
          height: 752,
          crop: "scale",
          quality: 90,
        },
      ],
    };

    const result = await cloudinary.uploader.upload(path, options);

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
