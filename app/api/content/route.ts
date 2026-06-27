import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const CONTENT_PATH = join(process.cwd(), "content", "site-content.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "crk2024";

export async function GET() {
  try {
    if (!existsSync(CONTENT_PATH)) {
      return NextResponse.json(
        { error: `Dosya bulunamadı: ${CONTENT_PATH}` },
        { status: 500 }
      );
    }
    const raw = readFileSync(CONTENT_PATH, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[content GET]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password, content } = body;

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Hatalı şifre" }, { status: 401 });
    }

    if (!content || typeof content !== "object") {
      return NextResponse.json({ error: "Geçersiz içerik" }, { status: 400 });
    }

    const json = JSON.stringify(content, null, 2);
    writeFileSync(CONTENT_PATH, json, "utf-8");
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[content POST]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
