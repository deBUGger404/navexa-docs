import { ArrowLeft, ArrowRight } from "../lib/icons";
import { Link } from "react-router-dom";

export default function BottomPager({ previous, next, visible }) {
  return (
    <div className={`floating-pager ${visible ? "is-visible" : ""}`} aria-hidden={!visible}>
      <nav className="floating-pager-nav" aria-label="Page navigation">
        {previous ? (
          <Link className="floating-pager-link" to={`/docs/${previous.id}`}>
            <span className="floating-pager-icon" aria-hidden="true">
              <ArrowLeft size={15} />
            </span>
            <div>
              <span className="floating-pager-label">Previous</span>
              <strong>{previous.title}</strong>
            </div>
          </Link>
        ) : (
          <div className="floating-pager-link is-disabled" aria-disabled="true">
            <span className="floating-pager-icon" aria-hidden="true">
              <ArrowLeft size={15} />
            </span>
            <div>
              <span className="floating-pager-label">Previous</span>
              <strong>Start of docs</strong>
            </div>
          </div>
        )}

        {next ? (
          <Link className="floating-pager-link" to={`/docs/${next.id}`}>
            <div>
              <span className="floating-pager-label">Next</span>
              <strong>{next.title}</strong>
            </div>
            <span className="floating-pager-icon" aria-hidden="true">
              <ArrowRight size={15} />
            </span>
          </Link>
        ) : (
          <div className="floating-pager-link is-disabled" aria-disabled="true">
            <div>
              <span className="floating-pager-label">Next</span>
              <strong>End of docs</strong>
            </div>
            <span className="floating-pager-icon" aria-hidden="true">
              <ArrowRight size={15} />
            </span>
          </div>
        )}
      </nav>
    </div>
  );
}
