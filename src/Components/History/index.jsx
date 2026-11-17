
function History({ history, onSelect }) {
  return (
    <section>
      <h2>Request History</h2>

      {history.length === 0 ? (
        <p>No requests in history yet.</p>
      ) : (
        <ul>
          {history.map((entry, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => onSelect(entry)}
              >
                {entry.method} - {entry.url}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default History;
