initialState = {
  showLoader: false,
  codeIsError: false,
  errorMsg: '',
  UserName: '',
  token: '',
  RegistrationPageInitialData: null,
  signupData:{},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'clearSignin':
      return {
        ...state,
        errorMsg: '',
      };
    case 'storeInitialData':
      return {
        ...state,
        RegistrationPageInitialData: action.payload,
      };
      case 'usernameAlreadyExistTrue':
        //console.log(action.payload);
        return {
          ...state,
          // errorMsg: 'Signed in successfully',
          errorMsg: action.payload,
          showLoader: false,
        };
        case 'usernameNotExistFalse':
        //console.log(action.payload);
        return {
          ...state,
          // errorMsg: 'Signed in successfully',
          errorMsg: '',
          showLoader: false,
          RegistrationPageInitialData: action.payload,
        };
        case 'usernameNotExistServiceFailed':
        //console.log(action.payload);
        return {
          ...state,
          // errorMsg: 'Signed in successfully',
          errorMsg: action.payload,
          showLoader: false,
        };
    case 'SignUpSucess':
      //console.log(action.payload);
      return {
        ...state,
        errorMsg: '',
        showLoader: false,
      };

    case 'SignUpFailed':
      return {
        ...state,
        errorMsg: action.payload,
        showLoader: false,
      };
    case 'OTPVerificationFailed':
      return {
        ...state,
        errorMsg: action.payload,
        showLoader: false,
      };
    case 'OTPVerificationSuccess':
      //console.log(action.payload);
      return {
        ...state,
        errorMsg: '',
        showLoader: false,
      };

    case 'ShowLoader':
      return {...state, showLoader: true};
      case 'Add_SignupData':
      return {...state, signupData: action.payload};
    case 'clear_errorMsg':
      return {...state, errorMsg: ''};
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
