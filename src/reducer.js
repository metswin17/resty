
export const initialState = {
  data: null,
  requestParams: {},
  displayRequest: {},
  loading: false,
  history: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case 'SET_REQUEST':
  return {
    ...state,
    requestParams: action.payload,
    displayRequest: action.payload,
  };

    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        data: null,
      };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        history: [
          ...state.history,
          {
            ...action.payload.request,
            data: action.payload.data,
          },
        ],
      };

    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        data: { error: action.payload },
      };

      case 'SHOW_HISTORY':
        return {
          ...state,
          loading: false,
          displayRequest: action.payload.request,
          data: action.payload.data,
        };

    default:
      return state;
  }
}
