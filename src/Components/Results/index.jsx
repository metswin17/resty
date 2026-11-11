
import './Results.scss';

function Results({ data, loading }) {
  return (
    <section>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <pre>
          {data ? JSON.stringify(data, null, 2) : null}
        </pre>
      )}
    </section>
  );
}

export default Results;
