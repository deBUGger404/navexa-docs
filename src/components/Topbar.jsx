import { Menu, Search } from "../lib/icons";
import { Link } from "react-router-dom";

export default function Topbar({ onOpenSidebar, onOpenSearch }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="topbar-mobile-btn"
          onClick={onOpenSidebar}
          aria-label="Open navigation"
        >
          <Menu size={17} aria-hidden="true" />
        </button>
        <Link className="topbar-brand" to="/docs/overview">
          Navexa Developers
        </Link>
      </div>

      <div className="topbar-actions">
        <button type="button" className="topbar-search-btn" onClick={onOpenSearch}>
          <span className="search-left">
            <Search size={15} aria-hidden="true" />
            <span>Search</span>
          </span>

          <span className="kbd-hint">Ctrl K/ ⌘ K</span>
        </button>
        <a
          className="pypi-btn"
          href="https://pypi.org/project/navexa"
          target="_blank"
          rel="noreferrer"
        >
          PyPI ↗
        </a>
        <a
          className="pypi-btn"
          href="https://myrakesh.web.app/"
          target="_blank"
          rel="noreferrer"
        >
          Portfolio ↗
        </a>
        <a
          className="dashboard-btn"
          href="https://github.com/deBUGger404/navexa"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </div>
    </header>
  );
}
