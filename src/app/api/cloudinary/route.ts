import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

/** Configura Cloudinary en runtime (no en module init) para evitar errores con Turbopack */
function getCloudinary() {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return cloudinary;
}

// IDs de demo que Cloudinary incluye por defecto — los excluimos
const DEMO_PREFIXES = ["samples/", "cld-sample", "main-sample", "sample"];

type CloudinaryResource = {
  secure_url: string;
  public_id:  string;
  width:      number;
  height:     number;
  format:     string;
};

/** Trae todos los recursos de una carpeta dinámica con paginación */
async function fetchByAssetFolder(folder: string): Promise<CloudinaryResource[]> {
  const cld = getCloudinary();
  const all: CloudinaryResource[] = [];
  let nextCursor: string | undefined;

  do {
    const result = await cld.api.resources_by_asset_folder(folder, {
      max_results: 500,
      ...(nextCursor ? { next_cursor: nextCursor } : {}),
    });
    all.push(...(result.resources as CloudinaryResource[]));
    nextCursor = result.next_cursor;
  } while (nextCursor);

  return all;
}

/** Trae todos los recursos de la raíz (sin carpeta asignada) con paginación */
async function fetchRootResources(): Promise<CloudinaryResource[]> {
  const cld = getCloudinary();
  const all: CloudinaryResource[] = [];
  let nextCursor: string | undefined;

  do {
    const result = await cld.api.resources({
      type: "upload",
      max_results: 500,
      ...(nextCursor ? { next_cursor: nextCursor } : {}),
    });
    all.push(...(result.resources as CloudinaryResource[]));
    nextCursor = result.next_cursor;
  } while (nextCursor);

  return all.filter((r) => {
    if (r.public_id.endsWith("/")) return false;
    if (DEMO_PREFIXES.some((p) => r.public_id === p || r.public_id.startsWith(p))) return false;
    if (r.public_id.includes("/")) return false;
    return true;
  });
}

export async function GET(req: NextRequest) {
  const folder = req.nextUrl.searchParams.get("folder");
  if (!folder) {
    return NextResponse.json({ error: "folder param is required" }, { status: 400 });
  }

  try {
    let resources: CloudinaryResource[];

    if (folder === "root") {
      resources = await fetchRootResources();
    } else {
      // Usa resources_by_asset_folder para cuentas con Dynamic Folders
      resources = await fetchByAssetFolder(folder);
    }

    const images = resources
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
