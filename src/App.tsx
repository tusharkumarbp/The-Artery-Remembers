import { useEffect, useRef, useState } from "react";
import Hero from "@/sections/Hero";
import Library from "@/sections/Library";
import ConsoleSection from "@/sections/ConsoleSection";
import ClocksMap from "@/sections/ClocksMap";
import LedgerSection from "@/sections/LedgerSection";
import Footer from "@/sections/Footer";
import DocPage from "@/components/DocPage";
import Teleprompter from "@/components/Teleprompter";
import { MotionProvider } from "@/hooks/useMotion";
import { parseHash, DOC_ROUTES, type Route } from "@/lib/routing";
import { longChapters } from "@/data/longTalk";

function Shell() {
  const [route, setRoute] = useState<Route>(() => parseHash(window.location.hash));
  const savedScroll = useRef(0);
  const prevRoute = useRef<Route>(route);

  useEffect(() => {
    const onHash = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // scroll management: entering a page view goes to top; leaving restores position
  useEffect(() => {
    const wasOverlay = prevRoute.current.doc !== null || prevRoute.current.chapter !== null;
    const isOverlay = route.doc !== null || route.chapter !== null;
    if (!wasOverlay && isOverlay) {
      savedScroll.current = window.scrollY;
      window.scrollTo(0, 0);
    } else if (wasOverlay && !isOverlay) {
      requestAnimationFrame(() => window.scrollTo(0, savedScroll.current));
    } else if (isOverlay && route.doc !== prevRoute.current.doc) {
      window.scrollTo(0, 0);
    }
    if (route.scrollTo) {
      document.getElementById(route.scrollTo)?.scrollIntoView({ behavior: "smooth" });
    }
    prevRoute.current = route;
  }, [route]);

  const openDoc = (id: string) => {
    const hash = DOC_ROUTES[id];
    if (hash) window.location.hash = hash;
  };

  const chapter = route.chapter ? (longChapters.find((c) => c.n === route.chapter) ?? null) : null;

  return (
    <div className="min-h-screen bg-[#0a2021] text-[#f3f6f1]">
      {route.doc ? (
        <DocPage docId={route.doc} />
      ) : (
        <>
          <Hero onOpenDoc={openDoc} />
          <Library />
          <ConsoleSection />
          <ClocksMap />
          <LedgerSection />
          <Footer />
        </>
      )}
      {chapter && (
        <Teleprompter chapter={chapter} onClose={() => (window.location.hash = "")} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <MotionProvider>
      <Shell />
    </MotionProvider>
  );
}
