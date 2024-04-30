initialState = {
  consultationHistory: [],
  historyDetails: [],
  errMsg: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'add_history':
      return {...state, consultationHistory: action.payload};
    case 'add_historydetails':
      return {...state, historyDetails: action.payload};
    case 'add_error':
      return {...state, errMsg: action.payload};
    case 'clear_error':
      return {...state, errMsg: ''};
    default:
      return state;
  }
};
