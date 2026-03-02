import { useEffect, useMemo, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { getSectionById, sections } from "../content/navexaDocs";
import RightRail from "./RightRail";
import SearchPalette from "./SearchPalette";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DocsLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { slug } = useParams();

  const currentSection = getSectionById(slug || "overview");
  const showRail = Boolean(currentSection?.toc?.length) && currentSection?.id !== "overview";
  const visibleSections = useMemo(() => sections, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [slug]);

  useEffect(() => {
    // Ensure each docs route starts from the top instead of preserving scroll position.
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const main = document.getElementById("main-content");
    if (main) {
      main.scrollTop = 0;
    }
  }, [slug]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Topbar
        onOpenSidebar={() => setMobileSidebarOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <div className={`layout ${showRail ? "layout--rail" : ""}`}>
        <Sidebar
          sections={visibleSections}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          onOpenSearch={() => setSearchOpen(true)}
        />

        <div id="main-content">
          <Outlet />
        </div>

        {showRail ? <RightRail toc={currentSection.toc} /> : null}
      </div>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />

      <footer className="docs-footer">
        <p>Navexa Docs - Built for clear, grounded, student-friendly workflows.</p>
      </footer>
    </div>
  );
}
