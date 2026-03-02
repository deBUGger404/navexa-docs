export default function DocTable({ table }) {
  if (!table?.headers?.length || !table?.rows?.length) return null;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {table.headers.map((head) => (
              <th key={head}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, idx) => (
            <tr key={`row-${idx}`}>
              {row.map((cell, i) => (
                <td key={`cell-${idx}-${i}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
