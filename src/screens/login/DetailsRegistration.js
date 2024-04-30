import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Keyboard,
  FlatList
} from 'react-native';
import Form from '../../components/Form';
// import { CustomButton } from '../../components/CustomButton';
import CustomButton from '../../components/CButton';
import firebase from 'react-native-firebase';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { DynamicHeader } from '../../components/DynamicHeader';
import DatePicker from 'react-native-datepicker';
//import SwitchSelector from "react-native-switch-selector";
import TileSelector from '../../components/TileSelector';
import ModalDropdown from 'react-native-modal-dropdown';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
const countryCode = ["+1", "+7", "+20", "+27", "+30", "+31", "+32", "+33", "+34", "+36", "+39", "+40",
  "+41", "+43", "+44", "+45", "+46", "+47", "+48", "+49", "+51", "+52", "+53", "+54", "+55", "+56", "+57",
  "+60", , "+61", "+62", "+58", "+63", "+64", "+65", "+66", "+81", "+82", "+84", "+86", "+90", "+91", "+92", "+93", "+94", "+95", "+98",
  "+212", "+213", "+216", "+218", "+220", "+221", "+222", "+223", "+224", "+225", "+227", "+228", "+245", "+226", "+229", "+230", "+231",
  "+232", "+233", "+234", "+235", "+236", "+237", "+238", "+239", "+240", "+241", "+242", "+244", "+248", "+249", "+250", "+251", "+252",
  "+253", "+254", "+255", "+256", "+257", "+258", "+260", "+261", "+262", "+263", "+264", "+265", "+266", "+267", "+268", "+269", "+290",
  "+291", "+297", "+298", "+299", "+350", "+351", "+352", "+353", "+355", "+356", "+357", "+358", "+359", "+370", "+371", "+373", "+372", "+374",
  "+375", "+376", "+377", "+378", "+380", "+381", "+382", "+385", "+386", "+387", "+389", "+420", "+421", "+423", "+500", "+501", "+502", "+503", "+504",
  "+506", "+505", "+507", "+508", "+509", "+590", "+591", "+592", "+593", "+595", "+597", "+598", "+670", "+672", "+673", "+674", "+675", "+676", "+677",
  "+678", "+679", "+680", "+681", "+682", "+683", "+685", "+686", "+687", "+688", "+689", "+690", "+691", "+692",
  "+850", "+852", "+853", "+855", "+856", "+870", "+880", "+886", "+960", "+961", "+962", "+963", "+964", "+965", "+966", "+967", "+968", "+971",
  "+972", "+973", "+974", "+975", "+976", "+977", "+992", "+993", "+994", "+995", "+996", "+998", "+1876",]
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast, { DURATION } from 'react-native-easy-toast';
import { Default } from '../../components/Default';
import { Touchable } from 'react-native';
import { TouchableNativeFeedback } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
const DataArray = require("../CountryCodes.json");
class DetailsRegistration extends React.Component {
  state = {
    userAge: '',
    userAddress: '',
    userGender: '',
    mobile_personal: '',
    mobile_Office: '',
    showIndicator: false,
    isDebugging: false,
    countryCode: '+1',
    toggleCountry: false,
    selectedCountry: 'India',
    selectedCode: '+91'
  };

  toggleCountry = () => {
    this.setState({
      toggleCountry: !this.state.toggleCountry
    })
  }

  mobilevalidate(text) {
    const reg = /^[0]?[789]\d{9}$/;
    if (reg.test(text) === false) {
      this.setState({
        mobilevalidate: false,
        telephone: text,
      });
      return true;
    } else {
      this.setState({
        mobilevalidate: true,
        telephone: text,
        message: '',
      });
      return true;
    }
  }

  showAlert = (title, message) => {
    // Alert.alert(
    //   title,
    //   message,
    //   [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    //   {cancelable: false},
    // );
    this.refs.toast.show(message);
  };

  SignUpServiceAction = async dataToSend => {
    this.props.SignUp(dataToSend);
    // this.props.NavigateToOTPScreen(dataToSend);
  };

  componentDidMount() {
    //enable tis for debugging
    this.setState({ isDebugging: false });
    // this.setState({
    //   userAge: '29',
    //   userAddress: 'address sample',
    //   userGender: 'M',
    //   mobile_personal: '9744420784',
    //   mobile_Office: '9744420784',
    // })
  }
  UNSAFE_componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
  }
  keyboardDidShow = () => {
    this.props.ClearErrorMsg();
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#000",
          alignSelf: 'center',
          width: '100%',
          margin: 5
        }}
      />
    );
  };
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
        <DynamicHeader
              text="Registration"
              ShouldDisplayLeftIcon={false}
              leftIconImage="chevron-left"
              onPressLeftIcon={() => {
                console.log('tapped');
              }}
              // HeaderColour="#7ecaf3"
              HeaderColour="#643A25"
            />
          <KeyboardAvoidingView
            enabled
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={20} // adjust the value here if you need more padding
            style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
              {/* <View style={{paddingTop: 10, flex: 1}}> */}
              <View style={{ flex: 1, paddingTop: 10}}>
                <View style={{marginTop:20}}>
                  <TextInput
                    style={styles.textInputStyle}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    maxLength={3}
                    value={this.state.userAge}
                    onChangeText={text => { text < 150 ? this.setState({ userAge: text }) : null }}
                    letterSPacing={5}
                    textAlign="center"
                    //color="black"
                    allowFontScaling={false}
                    placeholder="Age"
                    fontSize={15}
                    textAlign="left"
                  />
                  <View style={styles.dropdown}>
                    <TileSelector
                      title="Choose Gender"
                      optionOne="Male"
                      optionTwo="Female"
                      onPress={item => {
                        console.log('pressed tile' + item);
                        this.setState({ userGender: item.tag });
                      }}
                    />
                  </View>

                  <TextInput
                    style={styles.textInputStyle}
                    keyboardType="default"
                    returnKeyType="done"
                    // maxLength={10}
                    value={this.state.userAddress}
                    onChangeText={text => this.setState({ userAddress: text })}
                    letterSPacing={5}
                    textAlign="center"
                    //color="black"
                    allowFontScaling={false}
                    placeholder="Address"
                    fontSize={15}
                    textAlign="left"
                  />
                  <TouchableOpacity
                    onPress={() => this.toggleCountry()}
                    style={[styles.textInputStyle, { marginTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                    <Text allowFontScaling={false}
                      style={{ fontFamily: Default.FontMedium, fontSize: 15, }}>{this.state.selectedCountry}</Text>
                    <Icon name={"caretdown"} size={20} color={'#36BC5A'} style={{ marginRight: 5 }} />
                  </TouchableOpacity>
                  {
                    this.state.toggleCountry == true ?
                      <View style={{
                        borderColor: '#36BC5A',
                        borderRadius: 5,
                        marginHorizontal: 35,
                        height: 200,
                        borderLeftWidth: 0.3,
                        marginTop: 10,
                        borderWidth: .3,
                        paddingLeft: 5,
                      }}>
                        <FlatList
                          // showsVerticalScrollIndicator={false}
                          contentContainerStyle={{ paddingRight: 5, marginTop: 5 }}
                          keyExtractor={(item, index) => index}
                          data={DataArray.countries}
                          scrollEnabled={true}
                          nestedScrollEnabled={true}
                          renderItem={({ item, index }) => (
                            <TouchableScale style={{ margin: 10 }}
                              onPress={() => {
                                this.setState({
                                  selectedCountry: item.name,
                                  selectedCode: item.code,
                                  toggleCountry: false
                                });
                              }}>
                              <Text allowFontScaling={false}
                                style={{ fontFamily: Default.FontMedium, fontSize: 15 }}>{item.name}</Text>
                            </TouchableScale>
                          )}
                        // ItemSeparatorComponent={this.renderSeparator}  
                        />
                      </View> :
                      null
                  }
                  <Text allowFontScaling={false} style={{ fontFamily: Default.FontMedium, fontSize: 15, marginLeft: 30, marginVertical: 25 }}> Contact Number</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 35,marginBottom:30 }}>
                    {/* <ModalDropdown
                      defaultValue={'+91'} style={{ width: '14%', height: '100%', alignItems: 'center', borderColor: '#99ccff', borderWidth: 0.3, borderRadius: 5, }}
                      allowFontScaling={false}
                      textStyle={{ fontSize: 15, alignSelf: 'center', marginTop: "45%" }}
                      onSelect={(selected, option) => { console.log(option), this.setState({ countryCode: option }) }}
                      options={countryCode}
                      dropdownStyle={{ marginTop: 10, width: '10%', alignItems: 'center', borderColor: '#99ccff', borderWidth: 0.3, marginLeft: -12 }} /> */}
                    <View style={{ width: '14%', alignItems: 'center', borderColor: '#36BC5A', borderWidth: 0.3, height: 45, borderRadius: 5, justifyContent: 'center', alignSelf: 'center' }}>
                      <Text allowFontScaling={false}
                        style={{ fontFamily: Default.FontMedium, fontSize: 15,textAlign:'center' }}>{this.state.selectedCode}</Text>
                    </View>
                    <TextInput
                      style={{
                        borderColor: '#36BC5A',
                        borderWidth: 0.3,
                        width: '84%',
                        height: 45,
                        marginLeft: 4,
                        borderRadius: 5,
                        paddingHorizontal: 5
                      }}
                      keyboardType="numeric"
                      returnKeyType="done"
                      //maxLength={10}
                      value={this.state.mobile_personal}
                      onChangeText={text =>
                        this.setState({ mobile_personal: text })
                      }

                      letterSPacing={5}
                      textAlign="center"
                      //color="black"
                      allowFontScaling={false}
                      placeholder="  Mobile"
                      fontSize={15}
                      textAlign="left"
                      maxLength={10}
                    />

                  </View>

                  {/* <TextInput
                    style={styles.textInputStyle}
                    keyboardType="numeric"
                    returnKeyType="done"
                    // maxLength={10}
                    value={this.state.mobile_Office}
                    onChangeText={text => this.setState({mobile_Office: text})}
                    letterSPacing={5}
                    textAlign="center"
                    //color="black"
                    allowFontScaling={false}
                    placeholder="Office"
                    fontSize={15}
                    textAlign="left"
                  /> */}
                </View>
                <CustomButton
                  title={"Continue"}
                  onPress={() => {
                    if (this.state.isDebugging == true) {
                      this.props.navigation.navigate('OTPScreen');
                    } else {
                      if (
                        this.state.userAge.length == 0 ||
                        this.state.mobile_personal.length == 0 ||
                        this.state.userGender.length == 0
                        //this.state.userAddress.length == 0 ||this.state.mobile_Office.length == 0 ||
                      ) {
                        this.showAlert('Message', 'Please fill all the fields');

                        return;
                      }

                      if (
                        this.mobilevalidate(this.state.mobile_personal) == false
                      ) {
                        this.showAlert(
                          'Message',
                          'Please enter a valid mobile number',
                        );

                        return;
                      }
                      // if (this.mobilevalidate(this.state.mobile_Office) == false) {
                      //   this.showAlert(
                      //     'Message',
                      //     'Please enter a valid mobile number',
                      //   );

                      //   return;
                      // }

                      var dataFromPreviousPage = this.props.State
                        .RegistrationPageInitialData;

                      var dataToStore = {
                        firstName: dataFromPreviousPage.firstName,
                        lastName: dataFromPreviousPage.lastName,
                        middleName: dataFromPreviousPage.middleName,
                        emailAddress: dataFromPreviousPage.emailAddress,
                        password: dataFromPreviousPage.password,
                        confirmPassword: dataFromPreviousPage.confirmPassword,
                        age: this.state.userAge,
                        address: this.state.userAddress,
                        mobile_personal: `${this.state.countryCode}${this.state.mobile_personal}`,
                        mobile_office: this.state.mobile_Office,
                        gender: this.state.userGender == 1 ? 'M' : 'F',
                        CountryCode:this.state.selectedCode
                      };

                      this.SignUpServiceAction(dataToStore);

                      //console.log(this.props.State.RegistrationPageInitialData);

                      this.setState({ showIndicator: true });
                      // setTimeout(() => {
                      //   //this.props.navigation.navigate('OTPScreen');
                      // }, 4000);
                    }
                  }} />
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('LoginScreen');
                  }}>
                  <Text style={styles.signUpButtonStyle}>Go back to Signin page</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </KeyboardAvoidingView>

          {/* <View style={[styles.signinButtonStyle]}>
            <CustomButton
              title={"Continue"}
              onPress={() => {
                if (this.state.isDebugging == true) {
                  this.props.navigation.navigate('OTPScreen');
                } else {
                  if (
                    this.state.userAge.length == 0 ||
                    this.state.mobile_personal.length == 0 ||
                    this.state.userGender.length == 0
                    //this.state.userAddress.length == 0 ||this.state.mobile_Office.length == 0 ||
                  ) {
                    this.showAlert('Message', 'Please fill all the fields');

                    return;
                  }

                  if (
                    this.mobilevalidate(this.state.mobile_personal) == false
                  ) {
                    this.showAlert(
                      'Message',
                      'Please enter a valid mobile number',
                    );

                    return;
                  }
                  // if (this.mobilevalidate(this.state.mobile_Office) == false) {
                  //   this.showAlert(
                  //     'Message',
                  //     'Please enter a valid mobile number',
                  //   );

                  //   return;
                  // }

                  var dataFromPreviousPage = this.props.State
                    .RegistrationPageInitialData;

                  var dataToStore = {
                    firstName: dataFromPreviousPage.firstName,
                    lastName: dataFromPreviousPage.lastName,
                    middleName: dataFromPreviousPage.middleName,
                    emailAddress: dataFromPreviousPage.emailAddress,
                    password: dataFromPreviousPage.password,
                    confirmPassword: dataFromPreviousPage.confirmPassword,
                    age: this.state.userAge,
                    address: this.state.userAddress,
                    mobile_personal: `${this.state.countryCode}${this.state.mobile_personal}`,
                    mobile_office: this.state.mobile_Office,
                    gender: this.state.userGender == 1 ? 'M' : 'F',
                  };

                  this.SignUpServiceAction(dataToStore);

                  //console.log(this.props.State.RegistrationPageInitialData);

                  this.setState({ showIndicator: true });
                  // setTimeout(() => {
                  //   //this.props.navigation.navigate('OTPScreen');
                  // }, 4000);
                }
              }} />
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('RegisterScreen');
            }}>
            <Text style={styles.signUpButtonStyle}>Go back to signin page</Text>
          </TouchableOpacity> */}
          <Toast
            ref="toast"
            position="center"
            fadeOutDuration={1000}
            opacity={0.7}
          />
          {this.props.State.errorMsg != '' ? (
            <Text
              allowFontScaling={false}
              style={{ alignSelf: 'center', fontSize: 15, color: '#e74c3c' }}>
              {this.props.State.errorMsg}
            </Text>
          ) : null}
          {this.props.State.showLoader == true ? (
            <DotIndicator color="#36BC5A" />
          ) : null}
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  textInputStyle: {
    borderColor: '#36BC5A',
    borderWidth: 0.3,
    marginHorizontal: 35,
    height: 45,
    borderRadius: 5,
    paddingLeft: 5,
    marginTop: 10

  },
  signinButtonStyle: {
    borderColor: 'black',
    height: 40,
    marginHorizontal: 35,
    marginBottom: 40,
    marginTop: 30,
  },
  signUpButtonStyle: {
    borderColor: 'blue',
    marginTop: 20,
    height: 40,
    marginHorizontal: 35,
    color: '#643A25',
  },
  imageStyle: {
    alignSelf: 'center',
    marginTop: 40,
  },
  dropdown: {
    marginHorizontal: 35,
    marginTop: 20
  },
  dropdownText: {
    marginHorizontal: 35,
    marginVertical: 5,
  },
  textStyleButton: {
    marginTop: 10,
    marginHorizontal: 20,
    fontWeight: '800',
    marginBottom: 10,
    alignSelf: 'center',
  },
  textButtonContainer: {
    marginHorizontal: 35,
    marginTop: 20,
    borderWidth: 1.0,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
DetailsRegistration.navigationOptions = {
  headerShown: false,
};

const mapStateToProps = state => {
  //console.log(state);
  return { State: state.SignUp };
};
export default connect(
  mapStateToProps,
  actions,
)(DetailsRegistration);
//export default DetailsRegistration;
