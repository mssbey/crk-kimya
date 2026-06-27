import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  title: "CRK Kimya | Kimyasal Hammaddeler ve Endüstriyel Çözümler",
  description:
    "CRK Kimya, yüksek kaliteli kimyasal hammaddeler, petrokimya ürünleri ve endüstriyel çözümler ile üretim süreçlerinize değer katan güvenilir global kimya tedarikçisidir.",
  keywords:
    "kimyasal hammadde, endüstriyel kimyasal, petrokimya, su arıtma kimyasalı, kimya tedarikçisi, CRK Kimya",
  openGraph: {
    title: "CRK Kimya | Kimyanın Gücünü Endüstriye Taşıyoruz",
    description:
      "20+ yıllık tecrübe, 500+ mutlu müşteri, 1000+ ürün çeşidi. CRK Kimya ile güvenilir kimyasal tedarik.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        style={{
          fontFamily:
            "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
        className={inter.variable}
      >
        {children}
      </body>
    </html>
  );
}
