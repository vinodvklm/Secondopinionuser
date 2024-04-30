import loginReducer from './LoginReducer';
import registerReducer from './SignUpReducer';
import medicalUploadReducer from './UploadMedicalDataReducer';
import dependentSignupReducer from './AddDependentReducer';
import NewAppoinmentReducer from './NewAppoinmentReducer';
import HistoryReducer from './HistoryReducer';
import {combineReducers} from 'redux';
export default combineReducers({
  SignIn: loginReducer,
  SignUp: registerReducer,
  MedicalDataUpload: medicalUploadReducer,
  DependentSignUp: dependentSignupReducer,
  Appoinment: NewAppoinmentReducer,
  History: HistoryReducer,
});
