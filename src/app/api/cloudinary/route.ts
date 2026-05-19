import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
  const folder = req.nextUrl.searchParams.get("folder");
  if (!folder) {
    return NextResponse.json({ error: "folder param is required" }, { status: 400 });
  }

  try {
    // cloudinary.api.resources funciona en TODOS los planes (incluyendo free)
    const result = await cloudinary.api.resources({
      type:        "upload",
      prefix:      folder + "/",   // e.g. "Imagenes/Proyecto 1/"
      max_results: 100,
    });

    const images = (
      result.resources as {
        secure_url: string;
        public_id:  string;
        width:      number;
        height:     number;
        format:     string;
      }[]
    )
      .filter((r) => !r.public_id.endsWith("/")) // excluir "carpetas vacías"
      .sort((a, b) => a.public_id.localeCompare(b.public_id))
      .map((r) => ({
        url:       r.secure_url,
        public_id: r.public_id,
        width:     r.width,
        height:    r.height,
        format:    r.format,
      }));

    return NextResponse.json({ images });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[cloudinary/route] error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
