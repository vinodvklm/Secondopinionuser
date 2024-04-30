initialState = {
  showLoader: false,
  codeIsError: false,
  errorMsg: '',
  UserName: '',
  address: '',
  imageURL: '',
  mobileNumber: '',
  email: '',
  token: '',
  acessCode: '',
  RequiredNotification: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RequiredNotification':
      return {
        ...state,
        RequiredNotification: action.payload,
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
    case 'userInfo':
      return {
        ...state,
        UserName: action.payload.name,
        address: action.payload.address,
        imageURL: action.payload.imageURL,
        mobileNumber: action.payload.mobileNumber,
        email: action.payload.email,
        age: action.payload.age,
      };
    case 'SignInFailed':
      return {
        ...state,
        errorMsg: action.payload,

        showLoader: false,
      };
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
    default:
      return state;
  }
};
