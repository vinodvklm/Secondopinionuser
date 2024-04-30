import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  StatusBar,
  SafeAreaView,
  Keyboard, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Form from '../../components/Form';
// import {CustomButton} from '../../components/CustomButton';
import firebase from 'react-native-firebase';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

import { DotIndicator } from 'react-native-indicators';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast, { DURATION } from 'react-native-easy-toast';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Eye from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { Default } from '../../components/Default';
import CustomButton from '../../components/CButton';

///

class LoginScreen extends React.Component {
  state = {
    username: '',
    password: '',
    showIndicator: false,
    hidePassword:true
  };

  handleCallback(event) {
    console.log('callback received');
    console.log(event.nativeEvent.data); // "data sent from native"
  }

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
  };

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  };
  messageListener = async () => {
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body } = notification;
        this.showAlert(title, body);
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }

    this.messageListener = firebase.messaging().onMessage(message => {
      console.log(JSON.stringify(message));
    });
  };
  getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      //this.showAlert('Your Firebase Token is:', fcmToken);
    } else {
      this.showAlert('Failed', 'No token received');
    }
  };
  showAlert = (title, message) => {
    this.refs.toast.show(message);
  };
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('keyone');
      if (value !== null) {
        // We have data!!
        console.log('username is');
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
      console.log('username is not available');
    }
  };
  componentDidMount() {
    this.checkPermission();
    this.messageListener();

    //debugging
    // this.setState({username:"neeraj@mfluid.com",password:"test1234"})
  }
  UNSAFE_componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.props.State.showLoader = false;
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
  }
  keyboardDidShow = () => {
    this.props.ClearErrorMsg();
  };
  SignInServiceAction = async data => {
    this.props.SignIn(data);
    // this.props.navigation.navigate('MainFlow');
  };
  validateEmail = email => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase());
  };
  setPasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
}

  render() {
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#643A25"
          translucent={false}
        />
        <SafeAreaView style={{ flex: 0, backgroundColor: '#643A25' }} />
        <SafeAreaView style={styles.container}>
          {/* <View style={{paddingTop: 0, flex: 0.6, backgroundColor: 'white'}}> */}
          {/* <KeyboardAvoidingView
              enabled={true}
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
              style={styles.container}> */}
          <View style={{ marginTop: 0, flex: 0.4 }}>
            <View
              style={styles.linearGradient}>
              {/* <View style={{alignItems: 'center', paddingTop: 0, height: 300}}>
                <View
                  style={{
                    alignItems: 'center',
                    height: 180,
                    width: 180,
                    backgroundColor: 'white',
                    borderRadius: 100,
                    marginVertical: 40,
                  }}>
                  <Icon
                    style={styles.imageStyle}
                    name="redenvelopes"
                    size={80}
                    color="#2edccd"
                  />
                </View>
              </View> */}
              <Image
                style={{ width: 330, height: 200 }}
                source={require('../../../assets/logoL.png')} />
                {/* <Image
                style={{ width: 130, height: 130,marginTop:20 }}
                source={require('../../../assets/logo1.png')} /> */}
                {/* <Text allowFontScaling={false} style={{fontFamily:Default.FontBold,fontSize:30,color:'#643A25',marginTop:20}}>Sign In</Text> */}
            </View>
          </View>

          <KeyboardAvoidingView
            //keyboardVerticalOffset={100}
            enabled={true}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={{ flex: 0.2, backgroundColor: 'white' }}>
            <TextInput
              allowFontScaling={false}
              style={[styles.textInputStyle,{padding:10}]}
              keyboardType="default"
              returnKeyType="done"
              // maxLength={10}
              value={this.state.username}
              onChangeText={text => this.setState({ username: text })}
              letterSPacing={5}
              textAlign='left'
              //color="black"
              allowFontScaling={false}
              placeholder="Email"
              autoCapitalize="none"
              fontSize={15}
            />
{/* 
            <TextInput
              allowFontScaling={false}
              style={styles.textInputStyle}
              keyboardType="default"
              returnKeyType="done"
              // maxLength={10}
              value={this.state.password}
              onChangeText={text => this.setState({ password: text })}
              letterSPacing={5}
              textAlign='left'
              //color="black"
              placeholder="Password"
              allowFontScaling={false}
              autoCapitalize="none"
              secureTextEntry={true}
              fontSize={15}
            /> */}
            <View style={[styles.textInputStyle,{flexDirection:'row',justifyContent:'space-between',paddingRight:5}]}>
                  <TextInput
                    style={{fontFamily:Default.FontMedium,fontSize:14,padding: 10}}
                    keyboardType="default"
                    returnKeyType="done"
                    // maxLength={10}
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                    letterSPacing={5}
                    autoCapitalize={'none'}
                    textAlign="center"
                    
                    //color="black"
                    placeholder="Password"
                    allowFontScaling={false}
                    fontSize={15}
                    textAlign="left"
                    secureTextEntry={this.state.hidePassword}
                  />
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={this.setPasswordVisibility}>
                                {
                                    this.state.hidePassword ? <Eye name='eye' size={23} color='#000000' style={{ opacity: 0.5 }} /> : <Eye name='eye-slash' size={23} color='#000000' style={{ opacity: 0.5 }} />
                                }
                            </TouchableOpacity>
                        </View>
                  </View>
          </KeyboardAvoidingView>
          {/* <View style = {{backgroundColor:"#99ccff",height:0.5,marginHorizontal:50,borderRadius:14}}></View> */}
          <View style={{ paddingTop: 0, flex: 0.3 }}>

            <CustomButton title={'Sign In'}
              onPress={() => {
                // this.setState({ showIndicator: true });
                // setTimeout(() => {

                //   this.props.navigation.navigate('Dashboard');
                // }, 4000);
                Keyboard.dismiss();
                if (
                  this.state.username.length == 0 ||
                  this.state.password.length == 0
                ) {
                  this.showAlert('Message', 'Please fill all the fields');
                } else {
                  if (this.validateEmail(this.state.username) == false) {
                    this.showAlert(
                      'Message',
                      'Please enter a valid email address',
                    );

                    return;
                  }

                  let data = {
                    username: this.state.username,
                    password: this.state.password,
                  };

                  this.SignInServiceAction(data);
                }
              }} />

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ForgotPassword');
              }}>
              <Text
                allowFontScaling={false}
                style={{
                  marginHorizontal: 45,
                  marginTop: 10,
                  alignSelf: 'flex-end',
                  color: '#643A25',
                  fontFamily: Default.FontMedium,
                  fontSize: 14
                }}>
                Forgot password ?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('RegisterScreen');
              }}>
              <Text
                allowFontScaling={false}
                style={styles.signUpButtonStyle}>
                New user? SignUp here
              </Text>
            </TouchableOpacity>
            <Text
              allowFontScaling={false}
              style={{
                // alignSelf: 'center',
                textAlign: 'center',
                fontSize: 15,
                color: '#e74c3c',
                position: 'relative',
                // top: 100,
                marginTop: 30,
              }}>
              {this.props.State.errorMsg != '' ? this.props.State.errorMsg : ''}
            </Text>
          </View>
          {/* </KeyboardAvoidingView> */}

          <Toast
            ref="toast"
            position="center"
            fadeOutDuration={1000}
            opacity={0.7}
          />

          {this.props.State.showLoader == true ? (
            <DotIndicator
              color="#36BC5A"
              style={{ position: 'absolute', bottom: 30, alignSelf: 'center' }}
            />
          ) : null}
          {/* </KeyboardAvoidingView> */}
          {/* </View> */}
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInputStyle: {
    borderColor: '#99ccff',
    marginTop: 20,
    borderWidth: 0.3,
    marginHorizontal: 45,
    height: 45,
    borderRadius: 5,
    fontFamily: Default.FontMedium,
    fontSize: 14,
 
  },
  signinButtonStyle: {
    borderColor: 'black',
    marginTop: 20,
    height: 40,
    marginHorizontal: 45,
  },
  signUpButtonStyle: {
    marginTop: 40,
    height: 40,
    marginHorizontal: 45,
    color: '#36BC5A',
    fontFamily: Default.FontMedium,
    fontSize: 14
  },
  imageStyle: {
    alignSelf: 'center',
    marginTop: 50,
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:50
  },
});
LoginScreen.navigationOptions = {
  headerShown: false,
};

const mapStateToProps = state => {
  //console.log(state);
  return { State: state.SignIn };
};
export default connect(
  mapStateToProps,
  actions,
)(LoginScreen);
//export default LoginScreen;
