import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Keyboard,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
// import {CustomButton} from '../../components/CustomButton';
import firebase from 'react-native-firebase';
import {Button,Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import Eye from 'react-native-vector-icons/FontAwesome';
import {DynamicHeader} from '../components/DynamicHeader';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import CustomButton from '../components/CButton';
import {WebView} from 'react-native-webview';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import Toast, {DURATION} from 'react-native-easy-toast';
import { Default } from '../components/Default';
class RegisterScreen extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    middleName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    showIndicator: false,
    isDebugging: false,
    isTapable: true,
    hidePassword: true,
    isVisible:false,
    loading:true,
    selected:false
  };

  showAlert = (title, message) => {
    // Alert.alert(
    //   title,
    //   message,
    //   [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    //   {cancelable: false},
    // );
    this.refs.toast.show(message);
  };
  UNSAFE_componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.props.State.errorMsg = '';
  }
  isUserNameAlreadyExistServiceCall = async dataToSend => {
    this.props.isUsernameAlreadyExist(dataToSend);
  };
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
  }
  keyboardDidShow = () => {
    this.props.ClearErrorMsg();
  };
  componentDidMount() {
    //enable tis for debugging
    this.setState({isDebugging: false});
    // this.setState({
    //   firstName: 'neeraj',
    //   lastName: 'p',
    //   middleName: 'k',
    //   emailAddress: 'neeraj@mfluid.com',
    //   password: 'test1234',
    //   confirmPassword: 'test1234'
    // })

    this.props.State.showLoader = false;
  }
  validateEmail = email => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase());
  };

  setPasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
}

hideSpinner = () => {
  this.setState({loading: false});
};
  render() {
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#643A25"
          translucent={false}
        />
        <SafeAreaView style={{flex: 0, backgroundColor: '#643A25'}} />
        <SafeAreaView style={styles.container}>
        <DynamicHeader
                  text="Privacy & Policy"
                  ShouldDisplayLeftIcon={true}
                  leftIconImage="chevron-left"
                  onPressLeftIcon={() => {
                    this.props.navigation.goBack();
                  }}
                  HeaderColour="#643A25"
                /> 
          <View style={{flex:1}}>
          <WebView 
               useWebKit={true}
               javaScriptEnabled={true}
               onLoad={() => this.hideSpinner()}
              source={{ uri: 'https://onlinespinecare.com/privacy-policy/' }} />
               {this.state.loading == true ? (
              <DotIndicator
                color="#36BC5A"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  top: 0,
                  left: 0,
                  right: 0,
                  alignSelf: 'center',
                }}
              />
            ) : null}
          </View>
          <Overlay
            isVisible={this.state.isVisible}
            overlayStyle={{backgroundColor: 'transparent'}}>
            <View
              style={{
                height: Dimensions.get('window').height-300,
                width: Dimensions.get('window').width-100,
                backgroundColor: 'white',
              }}
            >
              <TouchableOpacity style={{alignSelf:'flex-end',margin:10}}
              onPress={()=>{this.setState({isVisible:false})}}>
              <Ionicons name={"close-circle"} color={"red"} size={20}
              />
              </TouchableOpacity>
              <WebView 
               useWebKit={true}
               javaScriptEnabled={true}
               onLoad={() => this.hideSpinner()}
              source={{ uri: 'https://onlinespinecare.com/privacy-policy/' }} />
               {this.state.loading == true ? (
              <DotIndicator
                color="#36BC5A"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  top: 0,
                  left: 0,
                  right: 0,
                  alignSelf: 'center',
                }}
              />
            ) : null}
              </View>
          </Overlay>
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  textInputStyle: {
    borderColor: '#36BC5A',
    marginTop: 30,
    borderWidth: 0.3,
    marginHorizontal: 35,
    height: 45,
    borderRadius: 5,
    paddingLeft: 5,
    fontSize:14,
    fontFamily:Default.FontMedium
  },
  signinButtonStyle: {
    borderColor: 'black',
    marginTop: 20,
    height: 40,
    marginHorizontal: 35,
  },
  signUpButtonStyle: {
    marginTop: 25,
    height: 40,
    marginHorizontal: 35,
    color: '#643A25',
    fontFamily:Default.FontMedium,
    fontSize:14
  },
  imageStyle: {
    alignSelf: 'center',
    marginTop: 40,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
RegisterScreen.navigationOptions = {
  headerShown: false,
};

const mapStateToProps = state => {
  //console.log(state);
  return {State: state.SignUp};
};

export default connect(
  mapStateToProps,
  actions,
)(RegisterScreen);
//export default RegisterScreen;
