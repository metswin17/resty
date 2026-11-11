
import { useState } from 'react';
import './Form.scss';

function Form({ handleApiCall }) {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      method,
      url,
      body: ['POST', 'PUT'].includes(method) ? body : null,
    };

    handleApiCall(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>URL: </span>
        <input
          name="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">GO!</button>
      </label>

      <div className="methods">
        {['GET', 'POST', 'PUT', 'DELETE'].map((option) => (
          <button
            key={option}
            type="button"
            className={method === option ? 'active' : ''}
            onClick={() => setMethod(option)}
            aria-pressed={method === option}
          >
            {option}
          </button>
        ))}
      </div>

      {['POST', 'PUT'].includes(method) && (
  <div className="request-body">
    <label htmlFor="request-body">JSON Request Body:</label>
    <textarea
      id="request-body"
      value={body}
      onChange={(e) => setBody(e.target.value)}
      placeholder='{"name": "Example"}'
      rows="6"
      cols="40"
    />
  </div>
)}

    </form>
  );
}

export default Form;
