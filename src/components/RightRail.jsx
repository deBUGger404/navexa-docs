import { useEffect, useMemo, useState } from "react";

export default function RightRail({ toc }) {
  const items = useMemo(() => (Array.isArray(toc) ? toc : []), [toc]);
  const [activeId, setActiveId] = useState(items[0]?.id || "");

  useEffect(() => {
    if (!items.length) return undefined;

    let ticking = false;

    const getTopOffset = () => {
      const rootStyle = window.getComputedStyle(document.documentElement);
      const topbarHeight = parseInt(rootStyle.getPropertyValue("--topbar-height"), 10);
      return (Number.isFinite(topbarHeight) ? topbarHeight : 68) + 16;
    };

    const getTrackedNodes = () =>
      items
        .map((item) => ({ id: item.id, node: document.getElementById(item.id) }))
        .filter((entry) => Boolean(entry.node));

    const updateActive = () => {
      const tracked = getTrackedNodes();
      if (!tracked.length) {
        ticking = false;
        return;
      }

      const marker = getTopOffset();
      let current = tracked[0].id;

      for (const entry of tracked) {
        const top = entry.node.getBoundingClientRect().top;
        if (top - marker <= 0) {
          current = entry.id;
        } else {
          break;
        }
      }

      const nearPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (nearPageBottom) {
        current = tracked[tracked.length - 1].id;
      }

      setActiveId((prev) => (prev === current ? prev : current));
      ticking = false;
    };

    const scheduleUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, [items]);

  if (!items.length) return null;

  return (
    <aside className="right-rail" aria-label="On this page">
      <div className="right-rail-inner">
        <h3>On this page</h3>
        <nav className="rail-links">
          {items.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={activeId === item.id ? "active" : ""}>
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
