import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ScrollProgress } from "@/components/ScrollProgress";
import { MouseGlow } from "@/components/MouseGlow";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <MouseGlow />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
