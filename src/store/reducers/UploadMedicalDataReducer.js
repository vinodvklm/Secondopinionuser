initialState = {
  showLoader: false,
  codeIsError: false,
  errorMsg: '',
  UserName: '',
  token: '',
  documentPaths: [],
  documentsUploaded: [],
  showAlert: false,
  UserType: '',
  DependentFK: '',
  medicalDocumentsList: [],
  medicalDocumentSingleObject: null,
  documentPathsAfterDelete: [],
  dicomUploaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'storeDocumentData':
      return {
        ...state,
        errorMsg: '',
        showLoader: false,
        medicalDocumentSingleObject: action.payload,
      };
    case 'GetMedicalReportsSuccess':
      return {
        ...state,
        errorMsg: '',
        showLoader: false,
        medicalDocumentsList: action.payload,
      };
    case 'GetMedicalReportsFailed':
      return {
        ...state,
        errorMsg: action.payload,
        showLoader: false,
        medicalDocumentsList: [],
      };

    case 'DataUploadSuccess':
      console.log('doc uploaded ' + {...state.documentsUploaded});
      console.log('doc path ' + action.payload.path);
      if (state.documentPaths == null) {
        state.documentPaths = [];
      }
      if (state.documentsUploaded == null) {
        state.documentsUploaded = [];
      }
      //console.log("doc object " + action.payload.docUploaded)
      return {
        ...state,
        errorMsg: '',
        showLoader: false,
        documentPaths: [...state.documentPaths, action.payload.path],
        documentsUploaded: [
          ...state.documentsUploaded,
          action.payload.docUploaded,
        ],
      };
    case 'refreshDocumentPaths':
      return {
        ...state,
        errorMsg: '',
        showLoader: false,
        documentPaths: action.payload.documentPaths,
        documentsUploaded: action.payload.documentsUploaded,
      };
    case 'dataUploadFailed':
      return {
        ...state,
        errorMsg: action.payload,
        showLoader: false,
      };

    case 'DetailsUploadSuccess':
      //console.log(action.payload);
      return {
        ...state,
        errorMsg: '',
        showLoader: false,
        showAlert: true,
      };

    case 'DetailsUploadFailed':
      return {
        ...state,
        errorMsg: action.payload,
        showLoader: false,
      };
    case 'updateDocList':
      return {
        ...state,
        errorMsg: action.payload,
        showLoader: false,
        documentPaths: [],
        documentsUploaded: [],
      };
    case 'removeAttachmentSuccess':
      //console.log(action.payload);
      return {
        ...state,
        errorMsg: '',
        showLoader: false,
        showAlert: false,
        medicalDocumentSingleObject: action.payload,
      };
    case 'removeAttachmentFailed':
      return {
        ...state,
        errorMsg: action.payload,
        showLoader: false,
      };
    case 'DicomUploaded':
      return {...state, dicomUploaded: true};
    case 'clear_alert':
      return {...state, showAlert: false};
    case 'ShowLoader':
      return {...state, showLoader: true};
    case 'ClearErrorMsg':
      return {...state, errorMsg: '', showLoader: false};
    case 'add_errorMsg':
      return {...state, errorMsg: action.payload};
    case 'HideLoader':
      return {...state, showLoader: false};
    case 'add_token':
      return {...state, token: action.payload};
    default:
      return state;
  }
};
