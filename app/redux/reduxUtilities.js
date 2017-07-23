import { fromJS } from 'immutable';

export const createDefaultReducer = (config = {}) => {
  config = Object.assign({}, {
    action: {},
    actionTypes: {},
    initialState: {},
    onFailureMessageKey: 'SERVICE__ERROR__DEFAULT_FAILURE',
    state: {}
  }, config);

  const { action, actionTypes } = config;
  const state = fromJS(config.state);
  const initialState = fromJS(config.initialState);

  switch (action.type) {
    case actionTypes.reset:
      return initialState;
      break;

    case actionTypes.loading:
      return state.merge({
        isLoading: true,
        payload: action.payload,
        error: null,
        data: null
      });
      break;

    case actionTypes.success:
      return state.merge({
        isLoading: false,
        error: null,
        data: action.data
      });
      break;

    case actionTypes.failure:
      return state.merge({
        isLoading: false,
        error: action.error,
        data: null
      });
      break;

    default:
      return state;
      break;
  }
};
