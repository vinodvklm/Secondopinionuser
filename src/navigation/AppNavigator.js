import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/login/LoginScreen';
import ResolveAuthScreen from '../screens/login/ResolveAuthScreen';
import DependencyHome from '../screens/AppoinmentHistory/DependencyHome';
import ConsultationHistoryScreen from '../screens/AppoinmentHistory/ConsultationHistoryScreen';
import ConsultationDetailsScreen from '../screens/AppoinmentHistory/ConsultationDetailsScreen';
//import RequestPermissionScreen from '../screens/RequestPermissionScreen';
//import SignUp from '../SignUp';
//import SignIn from '../SignIn';
//import Initializing from '../Initializing';
import RegisterScreen from '../screens/login/RegisterScreen';
import DetailsRegistration from '../screens/login/DetailsRegistration';
import BookConsultationScreen from '../screens/NewAppoinment/BookConsultationScreen';
import QuestionnaireScreen from '../screens/NewAppoinment/QuestionnaireScreen';
import PrePaymentScreen from '../screens/NewAppoinment/PrePaymentScreen';
import NewConsultationScreen from '../screens/NewAppoinment/NewConsultationScreen';
import Dashboard from '../screens/dashboard/Dashboard';
import OTPScreen from '../screens/login/OTPScreen';
import DependencySelectionOne from '../screens/login/DependencySelectionOne';
import DependantDetails from '../screens/login/DependantDetails';
import UploadMedicalDetails from '../screens/login/UploadMedicalDetails';
//import UploadMedicalDetails2 from '../screens/login/UploadMedicalDetails';
import MedicalDocumentsList from '../screens/login/MedicalDocumentsList';
import DependencyList from '../screens/DependencyCircle/DependencyList';
import ProfileScreen from '../screens/dashboard/ProfileScreen';

import MyDocuments from '../screens/MyDocuments/MyDocuments';
import DocumentDetails from '../screens/MyDocuments/DocumentsDetail';
import PaymentHistory from '../screens/PaymentScreens/PaymentHistory';

import ForgotPassword from '../screens/login/ForgotPassword';
import DocumentInfo from '../screens/NewAppoinment/DocumentInfo';
import MedicalDocumentDetails from '../screens/login/MedicalDocumentDetails';
import IndividualDocumentsList from '../screens/NewAppoinment/IndividualDocumentsList';
import PaymentWebview from '../screens/NewAppoinment/PaymentWebview';
import ConsultationInfo from '../screens/AppoinmentHistory/AdditionalConsultationInfo';
import DoctorAppointmentDetails from '../screens/NewAppoinment/DoctorAppoinmentDetails';
import MedicalDocuments from '../screens/MyDocuments/MedicalDocuments';
import Privacy from '../screens/Privacypolicy';
const loginFlow = createStackNavigator(
  {
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen },
    DetailsRegistration: { screen: DetailsRegistration },
    OTPScreen: { screen: OTPScreen },
    DependencySelectionOne: { screen: DependencySelectionOne },
    DependantDetails: { screen: DependantDetails },
    // UploadMedicalDetails: {screen: UploadMedicalDetails},
    MedicalDocumentsList: { screen: MedicalDocumentsList },
    OTPScreen: { screen: OTPScreen },
    DependencySelectionOne: { screen: DependencySelectionOne },
    DependantDetails: { screen: DependantDetails },
    UploadMedicalDetails: { screen: UploadMedicalDetails },
    //UploadMedicalDetails: {screen: UploadMedicalDetails2},
    ForgotPassword: { screen: ForgotPassword },
  Privacy:{screen:Privacy}
  },
  {
    initialRouteName: 'LoginScreen',
  },
);
// const newAppoinmentFlow = createSwitchNavigator({
//   NewAppoinment: {screen: NewConsultationScreen},
//   BookConsultation: {screen: BookConsultationScreen},
//   Questionnaire: {screen: QuestionnaireScreen},
//   PrePayment: {screen: PrePaymentScreen},
// });
// const dependentCircle = createSwitchNavigator({
//   DependentList: {screen: DependencyList},
//   DependantDetails: {screen: DependantDetails},
//   UploadMedicalDetails: {screen: UploadMedicalDetails},
//   MedicalDocumentsList: {screen: MedicalDocumentsList},
// });

// const historyFlow = createStackNavigator(
//   {
//     ConsultationHistory: {screen: ConsultationHistoryScreen},
//     ConsultationDetails: {screen: ConsultationDetailsScreen},
//     // DependencyCircle: {screen: DependencyHome},
//   },
//   {
//     //initialRouteName: 'DependencyCircle',
//     defaultNavigationOptions: {header: null},
//   },
// );

const mainFlow = createStackNavigator(
  {
    Dashboard: { screen: Dashboard },
    MyDocuments: { screen: MyDocuments },
    Profile: { screen: ProfileScreen },

    ///new appoinment flow
    NewAppoinment: { screen: NewConsultationScreen },
    BookConsultation: { screen: BookConsultationScreen },
    PaymentWebview: { screen: PaymentWebview },
    Questionnaire: { screen: QuestionnaireScreen },

    PrePayment: { screen: PrePaymentScreen },
    IndividualDocument: { screen: IndividualDocumentsList },
    DoctorAppointmentDetails: { screen: DoctorAppointmentDetails },
    //dependent circle
    DependentList: { screen: DependencyList },
    DependantDetails: { screen: DependantDetails },
    // UploadMedicalDetails: {screen: UploadMedicalDetails},
    UploadMedicalDetails: { screen: UploadMedicalDetails },
    MedicalDocumentsList: { screen: MedicalDocumentsList },
    MedicalDocumentDetails: { screen: MedicalDocumentDetails },
    //documents flow
    MyDocuments: { screen: MyDocuments },
    DocumentDetails: { screen: DocumentDetails },
    PaymentHistory: { screen: PaymentHistory },
    DocumentInfo: { screen: DocumentInfo },
    MedicalDocuments:{screen:MedicalDocuments},
    //history
    ConsultationHistory: { screen: ConsultationHistoryScreen },
    ConsultationDetails: { screen: ConsultationDetailsScreen },
    ConsultationInfo: { screen: ConsultationInfo }
  },
  {
    //initialRouteName: 'DependencyCircle',
    defaultNavigationOptions: { header: null },
  },
);
// const documents = createStackNavigator({
//   MyDocuments: {screen: MyDocuments},
//   DocumentDetails: {screen: DocumentDetails},
//   PaymentHistory: {screen: PaymentHistory},
//   Paypal: {screen: Paypal},
// });
const App = createSwitchNavigator({
  ResolveScreen: ResolveAuthScreen,
  //NewAppoinment: newAppoinmentFlow,
  //HistoryFlow: historyFlow,
  LoginFlow: loginFlow,
  //DependentListFlow: dependentCircle,
  //MyDocuments: documents,
  MainFlow: mainFlow,
});

export default createAppContainer(App);
