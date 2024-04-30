initialState = {
  DependentList: [],
  showLoader: false,
  codeIsError: false,
  errorMsg: '',
  UserName: '',
  token: '',
  DocumentList: [],
  DocumentDetails: [],
  DocumentDetails: [],
  freeConsultationCount: 0,
  paymentHistory: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'clearDependentSignup':
      return {
        ...state,
        errorMsg: '',
      };
    case 'AddDependentSucess':
      //console.log(action.payload);
      return {
        ...state,
        errorMsg: '',
        showLoader: false,
      };

    case 'AddDependentFailed':
      return {
        ...state,
        errorMsg: action.payload,
        showLoader: false,
      };
    case 'GetDependentListSuccess':
      //console.log(action.payload);
      return {
        ...state,
        errorMsg: '',
        showLoader: false,
        DependentList: action.payload,
      };

    case 'GetDependentListFailed':
      return {
        ...state,
        errorMsg: action.payload,
        showLoader: false,
        DependentList: [],
      };

    case 'ShowLoader':
      return { ...state, showLoader: true };
    case 'clear_errorMsg':
      return { ...state, errorMsg: '' };
    case 'add_errorMsg':
      return { ...state, errorMsg: action.payload };
    case 'HideLoader':
      return { ...state, showLoader: false };
    case 'add_token':
      return { ...state, token: action.payload };
    case 'add_DocList':
      return { ...state, DocumentList: action.payload };
    case 'Completedlist':
      return { ...state, Completedlist: action.payload };
    case 'DocumentDetails':
      return { ...state, DocumentDetails: action.payload };
    case 'freeConsultationCount':
      return { ...state, freeConsultationCount: action.payload };
      case 'paymentHistory':
      return { ...state, paymentHistory: action.payload };
    default:
      return state;
  }
};
