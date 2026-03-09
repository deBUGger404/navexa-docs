import { CheckCircle2, X } from "../lib/icons";

function renderHead(head) {
  if (head && typeof head === "object" && !Array.isArray(head)) {
    if (head.kind === "profile_header") {
      return (
        <span className={`table-head-profile table-head-profile--${head.tone || "default"}`}>
          <strong>{head.text}</strong>
          {head.caption ? <span>{head.caption}</span> : null}
        </span>
      );
    }
  }

  return head;
}

function renderCell(cell) {
  if (cell && typeof cell === "object" && !Array.isArray(cell)) {
    if (cell.kind === "bool") {
      const value = Boolean(cell.value);
      const label = cell.label || (value ? "On" : "Off");
      return (
        <span
          className={`table-cell-bool ${value ? "table-cell-bool--true" : "table-cell-bool--false"}`}
          aria-label={label}
        >
          {value ? <CheckCircle2 size={15} aria-hidden="true" /> : <X size={15} aria-hidden="true" />}
          <span>{label}</span>
        </span>
      );
    }

    if (cell.kind === "code") {
      return <code className="table-cell-code">{cell.text}</code>;
    }
  }

  return cell;
}

function getCellKind(cell) {
  if (cell && typeof cell === "object" && !Array.isArray(cell) && typeof cell.kind === "string") {
    return cell.kind;
  }
  return "text";
}

export default function DocTable({ table }) {
  if (!table?.headers?.length || !table?.rows?.length) return null;
  const variant = table.variant || "default";

  return (
    <div className="table-wrap" data-variant={variant}>
      <table>
        <thead>
          <tr>
            {table.headers.map((head) => (
              <th key={typeof head === "string" ? head : `${head.kind}-${head.text}`}>{renderHead(head)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, idx) => (
            <tr key={`row-${idx}`}>
              {row.map((cell, i) => (
                <td key={`cell-${idx}-${i}`} data-cell-kind={getCellKind(cell)}>
                  {renderCell(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
