import {RectButton} from 'react-native-gesture-handler';
import {act} from 'react-test-renderer';

initialState = {
  showLoader: false,
  codeIsError: false,
  errorMsg: '',
  UserName: '',
  token: '',
  acessCode: '',
  RequiredNotification: false,
  selectedDependent: '',
  selectedDependentRelation: '',
  selectedDependentId:'',
  contactType: '',
  contactTypeID: '',
  description: '',
  selectedDate: '',
  isFilledQuestionnaire: false,
  isFilledNDI: false,
  modesOfCommunication: [],
  doc_unavailableDates: [],
  doc_timeslots: [],
  selectedDate: '',
  selectedTimeSlotID: '',
  patientID: '',
  patientDependencyStatus: '',
  Message: '',
  medicalDocumentsList: [],
  selectedDocuments: [],
  isHome:false,
  selectedTimeFrom:'',
  selectedTimeTo:'',
  documentCount:0,
  freeConsultationCount:0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'clear_message':
      return {...state, Message: ''};
    case 'add_message':
      return {...state, Message: action.payload};
    case 'add_patientID':
      return {
        ...state,
        patientID: action.payload.ID,
        patientDependencyStatus: action.payload.Status,
        showLoader:false
      };
    case 'clear_date&time':
      return {
        ...state,
        selectedDate: '',
        selectedTimeSlotID: '',
      };
    case 'add_selected D&T':
      return {
        ...state,
        selectedDate: action.payload.date,
        selectedTimeSlotID: action.payload.timeID,
        selectedTimeFrom:action.payload.selectedTimeFrom,
        selectedTimeTo:action.payload.selectedTimeTo
      };
      case 'clear_timeslot':
        return {
          ...state,
          selectedTimeSlotID: '',
          selectedTimeFrom:'',
          selectedTimeTo:''
        };
    case 'add_timeslot':
      return {
        ...state,
        doc_timeslots: action.payload,
      };
    case 'add_contact_type':
      return {
        ...state,
        contactType: action.payload.type,
        contactTypeID: action.payload.id,
      };
    case 'add_Doc_Date':
      return {
        ...state,
        doc_unavailableDates: action.payload,
        showLoader:false
      };
    case 'AddselectedDependent':
      return {
        ...state,
        selectedDependent: action.payload.name,
        selectedDependentRelation: action.payload.relation,
        selectedDependentId:action.payload.id,
        
      };
    case 'BookAppoinment':
      return {
        ...state,
        contactType: action.payload.contactType,
        contactTypeID: action.payload.contactTypeID,
        description: action.payload.description,
        selectedDate: action.payload.selectedDate,
        CurrencySymbol:action.payload.CurrencySymbol
      };
    case 'GetIndividualReportsSuccess':
      return {
        ...state,
        errorMsg: '',
        showLoader: false,
        medicalDocumentsList: action.payload,
      };
    case 'add_documentsSelected':
      return {
        ...state,
        selectedDocuments: action.payload,
      };
    case 'RequiredNotification':
      return {
        ...state,
        RequiredNotification: action.payload,
      };
    case 'add_modeofCommunications':
      return {
        ...state,
        modesOfCommunication: action.payload,
        selectedDocuments: [],
      };
    case 'clearSignin':
      return {
        initialState,
      };
    case 'add_Code':
      return {
        ...state,
        acessCode: action.payload,
      };
    case 'SignInSucess':
      //console.log(action.payload);
      return {
        ...state,
        // errorMsg: 'Signed in successfully',
        errorMsg: '',
        showLoader: false,
      };

    case 'SignInFailed':
      return {
        ...state,
        errorMsg: action.payload,

        showLoader: false,
      };
    case 'update_QnaaireStatus':
      return {...state, isFilledQuestionnaire: action.payload};
      case 'update_NDIStatus':
        return {...state, isFilledNDI: action.payload};
    case 'ShowLoader':
      return {...state, showLoader: true};
    case 'clear_errorMsg':
      return {...state, errorMsg: ''};
    case 'add_errorMsg':
      return {...state, errorMsg: action.payload};
    case 'HideLoader':
      return {...state, showLoader: false};
    case 'add_token':
      return {...state, token: action.payload};
      case 'isHome':
      return {...state, isHome: action.payload};
      case 'documentCount':
      return {...state, documentCount: action.payload};
      case 'freeConsultationCount':
        return {...state, freeConsultationCount: action.payload};
    default:
      return state;
  }
};
