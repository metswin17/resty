
import { useReducer, useEffect } from 'react';
import axios from 'axios';

import { reducer, initialState } from './reducer';

import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import History from './Components/History';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data, requestParams, displayRequest, loading, history } = state;

const callApi = (params) => {
  dispatch({
    type: 'SET_REQUEST',
    payload: { ...params },
  });
};

const handleHistorySelect = (entry) => {
  dispatch({
    type: 'SHOW_HISTORY',
    payload: {
      request: {
        method: entry.method,
        url: entry.url,
        body: entry.body,
      },
      data: entry.data,
    },
  });
};

  useEffect(() => {
    if (!requestParams.url || !requestParams.method) {
      return;
    }
  
    const controller = new AbortController();
  
    const fetchData = async () => {
      dispatch({
        type: 'FETCH_START',
      });
  
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
  
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: {
            request: requestParams,
            data: {
              headers: response.headers.toJSON(),
              results: response.data,
            },
          },
        });
  
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
  
        dispatch({
          type: 'FETCH_ERROR',
          payload: error.message,
        });
  
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
      <div>Request Method: {displayRequest.method}</div>
      <div>URL: {displayRequest.url}</div>
      <Form handleApiCall={callApi} />

<History
history={history}
onSelect={handleHistorySelect}
/>

<Results data={data} loading={loading} />

<Footer />
    </>
  );
}

export default App;
