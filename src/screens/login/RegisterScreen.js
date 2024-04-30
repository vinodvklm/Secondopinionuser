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
import Form from '../../components/Form';
import Ionicons from 'react-native-vector-icons/Ionicons'
// import {CustomButton} from '../../components/CustomButton';
import firebase from 'react-native-firebase';
import {Button,Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import Eye from 'react-native-vector-icons/FontAwesome';
import {DynamicHeader} from '../../components/DynamicHeader';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import CustomButton from '../../components/CButton';
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
import { Default } from '../../components/Default';
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
            text="Registration"
            ShouldDisplayLeftIcon={false}
            leftIconImage="chevron-left"
            onPressLeftIcon={() => {
              console.log('tapped');
            }}
            HeaderColour="#643A25"
          />
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={20}
            enabled={true}
            style={{flex:1}}>
            <ScrollView style={{backgroundColor: 'white'}}>
            
              <View style={{paddingTop: 10, flex: 1}}>
                <View style={{marginTop: 10}}>
                  <TextInput
                    style={styles.textInputStyle}
                    keyboardType="default"
                    returnKeyType="done"
                    //maxLength={10}
                    value={this.state.firstName}
                    onChangeText={text => this.setState({firstName: text})}
                    letterSPacing={5}
                    textAlign="center"
                    //color="black"
                    allowFontScaling={false}
                    placeholder="First Name"
                    fontSize={15}
                    textAlign="left"
                  />
                  {/* <TextInput
                    style={styles.textInputStyle}
                    keyboardType="default"
                    returnKeyType="done"
                    // maxLength={10}
                    value={this.state.middleName}
                    onChangeText={text => this.setState({middleName: text})}
                    letterSPacing={5}
                    textAlign="center"
                    //color="black"
                    placeholder="Middle Name"
                    allowFontScaling={false}
                    fontSize={15}
                    textAlign="left"
                  /> */}

                  <TextInput
                    style={styles.textInputStyle}
                    keyboardType="default"
                    returnKeyType="done"
                    //maxLength={10}
                    value={this.state.lastName}
                    onChangeText={text => this.setState({lastName: text})}
                    letterSPacing={5}
                    textAlign="center"
                    //color="black"
                    placeholder="Last Name"
                    allowFontScaling={false}
                    fontSize={15}
                    textAlign="left"
                  />

                  <TextInput
                    style={styles.textInputStyle}
                    keyboardType="default"
                    returnKeyType="done"
                    // maxLength={10}
                    value={this.state.emailAddress}
                    onChangeText={text => this.setState({emailAddress: text})}
                    letterSPacing={5}
                    textAlign="center"
                    //color="black"
                    placeholder="Email"
                    allowFontScaling={false}
                    fontSize={15}
                    textAlign="left"
                  />
                  <View style={[styles.textInputStyle,{flexDirection:'row',justifyContent:'space-between',paddingRight:10}]}>
                  <TextInput
                    style={{fontFamily:Default.FontMedium,fontSize:14}}
                    keyboardType="default"
                    returnKeyType="done"
                    // maxLength={10}
                    value={this.state.password}
                    onChangeText={text => this.setState({password: text})}
                    letterSPacing={5}
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
                  <View style={[styles.textInputStyle,{flexDirection:'row',justifyContent:'space-between',paddingRight:10,marginBottom:30}]}>
                  <TextInput
                    style={{fontFamily:Default.FontMedium,fontSize:14}}
                    keyboardType="default"
                    returnKeyType="done"
                    // maxLength={10}
                    value={this.state.confirmPassword}
                    onChangeText={text =>
                      this.setState({confirmPassword: text})
                    }
                    letterSPacing={5}
                    textAlign="center"
                    //color="black"
                    placeholder="Confirm Password"
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
                  
                  <View
              style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 35}}>
              <TouchableOpacity 
              onPress={()=>{this.setState({selected:!this.state.selected})}}>
              <Ionicons
                name={this.state.selected==true?'checkbox-sharp': 'checkbox-outline'}
                size={25}
                color= {this.state.selected==true?
                  "#36BC5A":  "gray"}
              />
              </TouchableOpacity>
              <Text allowFontScaling={false} style={{ fontFamily: Default.FontMedium, fontSize: 14, color: 'gray',marginLeft:5}}>I have agree to the</Text>
              <TouchableOpacity style={{}}
              // onPress={()=>{this.setState({isVisible:!this.state.isVisible})}}
              onPress={()=>this.props.navigation.navigate("Privacy")}
              >
              <Text allowFontScaling={false} style={{ fontFamily: Default.FontMedium, fontSize: 14, color: 'red',  }}> terms of service</Text>
              </TouchableOpacity>
             <View style={{justifyContent:'center',flexDirection:'row',width:'90%'}}>
              
             
             </View>
                  </View>
                  {/* <View style = {{backgroundColor:"#99ccff",height:0.5,marginHorizontal:50,borderRadius:14}}></View> */}
                  <CustomButton title={'Continue'}
                  onPress={() => {
                    if (this.state.isDebugging == true) {
                      setTimeout(() => {
                        this.props.navigation.navigate(
                          'DetailsRegistration',
                        );
                      }, 2000);
                    } else {
                      if (
                        this.state.firstName.length == 0 ||
                        this.state.lastName.length == 0 ||
                        // this.state.middleName.length == 0 ||
                        this.state.emailAddress.length == 0 ||
                        this.state.password.length == 0 ||
                        this.state.confirmPassword.length == 0
                      ) {
                        this.showAlert(
                          'Message',
                          'Please fill all the fields',
                        );
                      } else {
                        if (
                          this.validateEmail(this.state.emailAddress) ==
                          false
                        ) 
                        {
                          this.showAlert(
                            'Message',
                            'Please enter a valid email address',
                          );

                          return;
                        }

                        if (this.state.password.length < 6) {
                          this.showAlert(
                            'Message',
                            'Password must be greater than 6 characters',
                          );

                          return;
                        }

                        if (
                          this.state.password != this.state.confirmPassword
                        ) {
                          this.showAlert(
                            'Message',
                            'Password and confirm password are not matching',
                          );

                          return;
                        }
                        if (this.state.selected==false) {
                          this.showAlert(
                            'Message',
                            'Please allow terms of service',
                          );

                          return;
                        }
                        var dataToStore = {
                          firstName: this.state.firstName,
                          lastName: this.state.lastName,
                          middleName: this.state.middleName,
                          emailAddress: this.state.emailAddress,
                          password: this.state.password,
                          confirmPassword: this.state.confirmPassword,
                        };

                        this.isUserNameAlreadyExistServiceCall(dataToStore);
                        this.setState({
                          isTapable: false,
                          showIndicator: true,
                        });
                        // setTimeout(() => {
                        //   this.props.navigation.navigate(
                        //     'DetailsRegistration',
                        //   );
                        // }, 2000);
                      }
                    }
                  }}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('LoginScreen');
                    }}>
                    <Text 
                    allowFontScaling={false}
                    style={styles.signUpButtonStyle}>
                      Go back to Signin page
                    </Text>
                  </TouchableOpacity>
                </View>
                <Toast
                  ref="toast"
                  position="center"
                  fadeOutDuration={1000}
                  opacity={0.7}
                />
                {this.props.State.errorMsg != '' ? (
                  <Text
                    allowFontScaling={false}
                    style={{
                      alignSelf: 'center',
                      fontSize: 15,
                      color: '#e74c3c',
                    }}>
                    {this.props.State.errorMsg}
                  </Text>
                ) : null}
                {this.props.State.showLoader == true ? (
                  <DotIndicator color="#36BC5A" />
                ) : null}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
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
