
import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

function App() {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});
  const [loading, setLoading] = useState(false);

  const callApi = (params) => {
    setRequestParams({ ...params });
  }; 

  useEffect(() => {
    if (!requestParams.url || !requestParams.method) {
      return;
    }
  
    const controller = new AbortController();
  
    const fetchData = async () => {
      setLoading(true);
      setData(null);
  
      try {

        const requestBody = requestParams.body
  ? JSON.parse(requestParams.body)
  : undefined;

        const response = await axios({
          url: requestParams.url,
          method: requestParams.method,
          data: requestBody,
          signal: controller.signal,
        });
  
        setData({
          headers: response.headers.toJSON(),
          results: response.data,
        });
  
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
  
        setData({
          error: error.message,
        });
  
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
  
    fetchData();
  
    return () => {
      controller.abort();
    };
  }, [requestParams]);

  return (
    <>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={data} loading={loading} />
      <Footer />
    </>
  );
}

export default App;
