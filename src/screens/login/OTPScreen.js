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
  Image
} from 'react-native';
// import Form from '../../components/Form';
// import {CustomButton} from '../../components/CustomButton';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

import {DotIndicator} from 'react-native-indicators';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomButton from '../../components/CButton';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import LinearGradient from 'react-native-linear-gradient';
import { Default } from '../../components/Default';
import Toast, { DURATION } from 'react-native-easy-toast';
class OTPScreen extends React.Component {
  state = {
    otp: '',
    password: '',
    showIndicator: false,
    isDebugging: false,
  };

  createTwoButtonAlert = () =>
    Alert.alert(
      'Verification Success',
      'Please upload your medical reports for further consultation',
      [
        {
          text: 'Skip',
          onPress: () => {
            this.props.navigation.navigate('Dashboard');
          },
          style: 'cancel',
        },
        {
          text: 'Upload',
          onPress: () => {
            this.props.navigation.navigate('DependencySelectionOne');
          },
        },
      ],
      {cancelable: false},
    );

  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };
  componentDidMount() {
    this.setState({isDebugging: true});
  }
  SignInServiceAction = async () => {
    this.props.SignIn('AA0071');
  };

  render() {
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#2edccd"
          translucent={false}
        />
        <SafeAreaView style={{flex: 0, backgroundColor: '#2edccd'}} />
        <SafeAreaView style={styles.container}>
          {/* <View style={{ paddingTop: 0, flex: 1, backgroundColor: 'white' }}> */}
          {/* <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
              style={styles.container}> */}
          <View style={{marginTop: 0, flex: 0.5}}>
            <LinearGradient
              colors={['#2edccd', '#58d3e1', '#76ccef']}
              style={styles.linearGradient}>
              <View style={{alignItems: 'center', paddingTop: 0, height: 300}}>
                <View
                  style={{
                    alignItems: 'center',
                    height: 200,
                    width: 200,
                    backgroundColor: 'white',
                    borderRadius: 100,
                    marginVertical: 40,
                    justifyContent:'center'
                  }}>
                 <Image
                style={{ width: 150, height: 150,tintColor:'#76ccef',alignSelf:'center',marginRight:15,marginBottom:20 }}
                source={require('../../../assets/logo.png')} />
                </View>
              </View>
            </LinearGradient>
          </View>
          <KeyboardAvoidingView
            keyboardVerticalOffset={80}
            behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
            style={{flex: 0.2, backgroundColor: 'white'}}>
            <Text 
            allowFontScaling={false}
            style={styles.otpMessageStyle}>
              Please enter the one time password sent to your email
            </Text>

            <TextInput
              style={styles.textInputStyle}
              keyboardType="default"
              returnKeyType="done"
              // maxLength={10}
              value={this.state.otp}
              onChangeText={text => this.setState({otp: text})}
              letterSPacing={5}
              textAlign="center"
              //color="black"
              allowFontScaling={false}
              placeholder="OTP"
              fontSize={15}
            />
          </KeyboardAvoidingView>
          {/* <View style = {{backgroundColor:"#99ccff",height:0.5,marginHorizontal:50,borderRadius:14}}></View> */}
          <View style={{flex: 0.3}}>
            {/* <View style={styles.signinButtonStyle}>
              <Button
                title="Verify Mobile"
                type="outline"
                onPress={() => {
                  if (this.state.isDebugging == true) {
                    this.createTwoButtonAlert();
                  } else {
                    this.setState({showIndicator: true});
                    setTimeout(() => {
                      this.setState({showIndicator: false});

                      this.createTwoButtonAlert();
                      // this.props.navigation.navigate('Dashboard');
                    }, 4000);
                    //this.SignInServiceAction();
                  }
                }}
              />
            </View> */}
            <CustomButton title={'Verify'}
            onPress={() => {
              // if (this.state.isDebugging == true) {
              //   this.createTwoButtonAlert();
              // } else {
              //   this.setState({showIndicator: true});
              //   setTimeout(() => {
              //     this.setState({showIndicator: false});
              //     this.createTwoButtonAlert();
              //   }, 4000);
              // }
if(this.state.otp!=''){
if(this.state.otp==69095){
  let dataToSend=this.props.State.signupData;
  this.props.SignUp(dataToSend);
}else{
  this.refs.toast.show('Please enter a valid OTP');
}

}else{
  this.refs.toast.show('Please enter a valid OTP');
}
            }}/>
          </View>
          <Toast
            ref="toast"
            position="center"
            fadeOutDuration={1000}
            opacity={0.7}
          />
          {/* </View> */}
          {this.props.State.showLoader == true ? (
            <DotIndicator style={{position:"absolute",bottom:80,alignSelf:'center'}} color="#36BC5A" />
          ) : null}

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
    fontSize:14,
    fontFamily:Default.FontMedium
  },
  signinButtonStyle: {
    borderColor: 'black',
    marginTop: 20,
    height: 40,
    marginHorizontal: 45,
  },
  signUpButtonStyle: {
    borderColor: 'blue',
    marginTop: 20,
    height: 40,
    marginHorizontal: 45,
    color: '#33adff',
  },
  otpMessageStyle: {
    borderColor: '#2edccd',
    marginTop: 20,
    height: 40,
    marginHorizontal: 45,
    color: '#2edccd',
    fontFamily:Default.FontSemiBold,
    fontSize:15,
    textAlign:'center'
  },
  imageStyle: {
    alignSelf: 'center',
    marginTop: 55,
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});
OTPScreen.navigationOptions = {
  headerShown: false,
};

const mapStateToProps = state => {
  //console.log(state);
  return {State: state.SignUp};
};
export default connect(
  mapStateToProps,
  actions,
)(OTPScreen);
//export default LoginScreen;
