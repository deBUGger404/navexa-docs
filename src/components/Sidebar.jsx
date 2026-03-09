import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Search, X } from "../lib/icons";
import { NavLink, useLocation } from "react-router-dom";
import { groupOrder, groupSections } from "../content/navexaDocs";

function SidebarContent({ sections, onOpenSearch, onNavigate }) {
  const grouped = useMemo(() => groupSections(sections), [sections]);
  const location = useLocation();
  const [collapsed, setCollapsed] = useState({});

  return (
    <>
      <button className="sidebar-search-trigger" type="button" onClick={onOpenSearch}>
        <Search size={15} aria-hidden="true" />
        Search docs
        <span>⌘ K</span>
      </button>

      <nav className="sidebar-groups" aria-label="Documentation sections">
        {groupOrder.map((groupName) => {
          const entries = grouped.get(groupName) || [];
          if (!entries.length) return null;

          return (
            <section className="sidebar-group" key={groupName}>
              <div className="sidebar-group-title">{groupName}</div>

              <div className="sidebar-links">
                {entries
                  .filter((section) => !section.navParentId)
                  .map((section) => {
                    const children = entries.filter((item) => item.navParentId === section.id);
                    const hasChildren = children.length > 0;
                    const parentPath = `/docs/${section.id}`;
                    const activeChild = children.some(
                      (child) => location.pathname === `/docs/${child.id}`
                    );
                    const expanded = collapsed[section.id] ?? false;

                    if (!hasChildren) {
                      return (
                        <NavLink
                          key={section.id}
                          to={parentPath}
                          className={({ isActive }) => (isActive ? "active" : "")}
                          onClick={onNavigate}
                        >
                          <span>{section.title}</span>
                        </NavLink>
                      );
                    }

                    return (
                      <div
                        key={section.id}
                        className={`sidebar-parent ${activeChild ? "is-active-group" : ""}`}
                      >
                        <button
                          type="button"
                          className={`sidebar-parent-row ${
                            location.pathname === parentPath || activeChild ? "is-active" : ""
                          }`}
                          aria-label={
                            expanded
                              ? `Collapse ${section.title} subsections`
                              : `Expand ${section.title} subsections`
                          }
                          aria-expanded={expanded}
                          onClick={() =>
                            setCollapsed((prev) => ({
                              ...prev,
                              [section.id]: !expanded
                            }))
                          }
                        >
                          <span className="sidebar-parent-label">{section.title}</span>
                          <span className="sidebar-parent-chevron" aria-hidden="true">
                            {expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                          </span>
                        </button>

                        {expanded ? (
                          <div className="sidebar-subtree">
                            {children.map((child) => (
                              <NavLink
                                key={child.id}
                                to={`/docs/${child.id}`}
                                className={({ isActive }) => (isActive ? "active" : "")}
                                onClick={onNavigate}
                              >
                                <span>{child.title}</span>
                              </NavLink>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
              </div>
            </section>
          );
        })}
      </nav>
    </>
  );
}

export default function Sidebar({
  sections,
  mobileOpen,
  onCloseMobile,
  onOpenSearch
}) {
  return (
    <>
      <div
        className={`sidebar-backdrop ${mobileOpen ? "is-open" : ""}`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside className={`sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="sidebar-mobile-head">
          <strong>Documentation</strong>
          <button type="button" onClick={onCloseMobile} aria-label="Close navigation">
            <X size={15} aria-hidden="true" />
          </button>
        </div>

        <SidebarContent
          sections={sections}
          onOpenSearch={onOpenSearch}
          onNavigate={onCloseMobile}
        />
      </aside>
    </>
  );
}
