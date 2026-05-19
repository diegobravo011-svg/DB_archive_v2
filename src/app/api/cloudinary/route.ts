import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key:     process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
  const folder = req.nextUrl.searchParams.get("folder");
  if (!folder) {
    return NextResponse.json({ error: "folder param is required" }, { status: 400 });
  }

  try {
    // Usamos search API para obtener todos los recursos de la carpeta
    const result = await cloudinary.search
      .expression(`folder:"${folder}"`)
      .sort_by("public_id", "asc")
      .max_results(100)
      .execute();

    const images = (result.resources as { secure_url: string; public_id: string }[]).map(
      (r) => ({
        url:       r.secure_url,
        public_id: r.public_id,
      })
    );

    return NextResponse.json({ images });
  } catch (err) {
    console.error("[cloudinary/route] error:", err);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
