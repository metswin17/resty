import { JsonView, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import './Results.scss';

function Results({ data, loading }) {
  if (loading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (!data) {
    return <section />;
  }

  return (
    <section>
      {data.error ? (
        <>
          <h3>Request Error</h3>
          <p role="alert">{data.error}</p>
        </>
      ) : (
        <>
          <h3>Response Headers</h3>
          <JsonView
            data={data.headers}
            style={defaultStyles}
          />

          <h3>Response Results</h3>
          <JsonView
            data={data.results}
            style={defaultStyles}
          />
        </>
      )}
    </section>
  );
}

export default Results;