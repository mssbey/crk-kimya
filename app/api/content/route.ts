import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const CONTENT_PATH = join(process.cwd(), "content", "site-content.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "crk2024";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = "mssbey";
const GITHUB_REPO = "crk-kimya";
const GITHUB_BRANCH = "master";
const GITHUB_FILE = "content/site-content.json";

const ON_VERCEL = !!process.env.VERCEL;

export async function GET() {
  try {
    if (!existsSync(CONTENT_PATH)) {
      return NextResponse.json({ error: `Dosya bulunamadı: ${CONTENT_PATH}` }, { status: 500 });
    }
    return NextResponse.json(JSON.parse(readFileSync(CONTENT_PATH, "utf-8")));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[content GET]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

async function saveViaGitHub(json: string) {
  if (!GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN Vercel ortam değişkenine eklenmemiş. Vercel → Settings → Environment Variables kısmına ekleyin.");
  }

  const apiBase = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };

  const getRes = await fetch(apiBase, { headers });
  if (!getRes.ok) {
    const body = await getRes.text();
    throw new Error(`GitHub dosyası alınamadı (${getRes.status}): ${body}`);
  }
  const { sha } = await getRes.json();

  const putRes = await fetch(apiBase, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: "admin: içerik güncellendi",
      content: Buffer.from(json).toString("base64"),
      sha,
      branch: GITHUB_BRANCH,
    }),
  });

  if (!putRes.ok) {
    const body = await putRes.text();
    throw new Error(`GitHub güncellenemedi (${putRes.status}): ${body}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { password, content } = await req.json();

    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Hatalı şifre" }, { status: 401 });
    }
    if (!content || typeof content !== "object") {
      return NextResponse.json({ error: "Geçersiz içerik" }, { status: 400 });
    }

    const json = JSON.stringify(content, null, 2);

    if (ON_VERCEL) {
      // Vercel: filesystem read-only, GitHub API kullan
      await saveViaGitHub(json);
      return NextResponse.json({ ok: true, mode: "github" });
    } else {
      // Lokal geliştirme: direkt dosyaya yaz
      writeFileSync(CONTENT_PATH, json, "utf-8");
      return NextResponse.json({ ok: true, mode: "local" });
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[content POST]", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
