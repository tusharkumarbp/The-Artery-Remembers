/**
 * Hash-addressable routes — every long object gets its own URL, shareable
 * and restorable, without a server (static-preview safe):
 *
 *   #/story            The Artery Remembers — main ten-minute version
 *   #/story/long       The Artery Remembers — long version, four chapters
 *   #/story/long/II    …straight to a chapter film + script roll
 *   #/thesis           The Stethoscope of the Mind
 *   #/ledger           The Launch Ledger — Entry 001
 *   #/runtime          CodexOS Reasoning Trace (scrolls to the console)
 */

export interface Route {
  doc: string | null;
  chapter: string | null;
  scrollTo: string | null;
}

export const DOC_ROUTES: Record<string, string> = {
  "artery-main": "#/story",
  "artery-long": "#/story/long",
  stethoscope: "#/thesis",
  "ledger-001": "#/ledger",
};

export function parseHash(hash: string): Route {
  const h = hash.replace(/^#/, "");
  if (h.startsWith("/story/long/")) {
    const ch = h.split("/")[3];
    return { doc: null, chapter: ["I", "II", "III", "IV"].includes(ch) ? ch : null, scrollTo: null };
  }
  switch (h) {
    case "/story":
      return { doc: "artery-main", chapter: null, scrollTo: null };
    case "/story/long":
      return { doc: "artery-long", chapter: null, scrollTo: null };
    case "/thesis":
      return { doc: "stethoscope", chapter: null, scrollTo: null };
    case "/ledger":
      return { doc: "ledger-001", chapter: null, scrollTo: null };
    case "/runtime":
      return { doc: null, chapter: null, scrollTo: "console" };
    default:
      return { doc: null, chapter: null, scrollTo: null };
  }
}
