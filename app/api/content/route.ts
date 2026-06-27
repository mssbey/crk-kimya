import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const CONTENT_PATH = join(process.cwd(), "content", "site-content.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "crk2024";

function getContent() {
  return JSON.parse(readFileSync(CONTENT_PATH, "utf-8"));
}

export async function GET() {
  try {
    return NextResponse.json(getContent());
  } catch {
    return NextResponse.json({ error: "İçerik okunamadı" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { password, content } = await req.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Hatalı şifre" }, { status: 401 });
    }

    writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2), "utf-8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Kayıt başarısız" }, { status: 500 });
  }
}
