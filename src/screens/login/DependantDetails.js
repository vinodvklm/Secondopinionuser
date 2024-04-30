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
} from 'react-native';
import Form from '../../components/Form';
import firebase from 'react-native-firebase';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {DynamicHeader} from '../../components/DynamicHeader';
import TileSelector from '../../components/TileSelector';
import CustomButton from '../../components/CButton';
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
import {TouchableOpacity} from 'react-native-gesture-handler';

import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import Toast, {DURATION} from 'react-native-easy-toast';
import {Overlay} from 'react-native-elements';
import { Default } from '../../components/Default';
class DependantDetails extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    middleName: '',
    relation: '',
    age: '',
    gender: '',
    isDebugging: false,
    showIndicator: false,
    navigationFromListPage: true,
    isTapable: true,
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
  componentDidMount() {
    //enable tis for debugging
    this.setState({isDebugging: false});

    this.setState({
      navigationFromListPage: this.props.navigation.getParam(
        'fromListPage',
        true,
      ),
      relation: this.props.navigation.getParam('relation', ''),
    });
  }
  DependencySignUpServiceAction = async dataToSend => {
     var isNavigationFromList = this.state.navigationFromListPage;

     var propsToSend = { data:dataToSend,isNavigationFromList:isNavigationFromList }

    this.props.DependentSignUp(propsToSend);
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
            text="Member Details"
            ShouldDisplayLeftIcon={
              this.state.navigationFromListPage == true ? true : false
            }
            leftIconImage="chevron-left"
            onPressLeftIcon={() => {
              console.log('tapped');
              this.props.navigation.navigate('DependentList');
            }}
            HeaderColour="#643A25"
          />
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <ScrollView>
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
                    placeholder="Middle Name"
                    allowFontScaling={false}
                    fontSize={15}
                    textAlign="left"
                  />
                  <TextInput
                    style={styles.textInputStyle}
                    keyboardType="default"
                    returnKeyType="done"
                    //maxLength={10}
                    value={this.state.middleName}
                    onChangeText={text => this.setState({middleName: text})}
                    letterSPacing={5}
                    textAlign="center"
                    //color="black"
                    placeholder="Last Name"
                    allowFontScaling={false}
                    fontSize={15}
                    textAlign="left"
                  />

                  {this.state.navigationFromListPage == true ? (
                    <TextInput
                      style={styles.textInputStyle}
                      keyboardType="default"
                      returnKeyType="done"
                      //maxLength={10}
                      value={this.state.relation}
                      onChangeText={text => this.setState({relation: text})}
                      letterSPacing={5}
                      textAlign="center"
                      //color="black"
                      allowFontScaling={false}
                      placeholder="Relation"
                      fontSize={15}
                      textAlign="left"
                    />
                  ) : null}

                  <TextInput
                    style={styles.textInputStyle}
                    keyboardType="default"
                    returnKeyType="done"
                    //maxLength={10}
                    value={this.state.age}
                    onChangeText={text => this.setState({age: text})}
                    letterSPacing={5}
                    textAlign="center"
                    //color="black"
                    placeholder="Age"
                    allowFontScaling={false}
                    fontSize={15}
                    textAlign="left"
                    keyboardType='numeric'
                  />
                  <View style={styles.dropdown}>
                    <TileSelector
                      title="Choose gender"
                      optionOne="Male"
                      optionTwo="Female"
                      onPress={item => {
                        console.log('pressed tile' + item);
                        this.setState({gender: item.tag});
                      }}
                      titleColor="gray"
                    />
                  </View>

                  {/* <View style = {{backgroundColor:"#99ccff",height:0.5,marginHorizontal:50,borderRadius:14}}></View> */}
                  {/* <View style={styles.signinButtonStyle}>
                    <Button
                      title={
                        this.state.navigationFromListPage == true
                          ? 'Save'
                          : 'Continue'
                      }
                      type="outline"
                      onPress={() => {
                        if (this.state.isDebugging == true) {
                          this.props.navigation.navigate(
                            'MedicalDocumentsList',
                          );
                        } else {
                          if (
                            this.state.firstName.length == 0 ||
                            this.state.lastName.length == 0 ||
                            this.state.age.length == 0 ||
                            // this.state.middleName.length == 0 ||
                            this.state.gender.length == 0
                          ) {
                            this.showAlert(
                              'Message',
                              'Please fill all the fields',
                            );

                            return;
                          }

                          if (this.state.navigationFromListPage == true) {
                            if (this.state.relation.length == 0) {
                              this.showAlert(
                                'Message',
                                'Please fill all the fields',
                              );

                              return;
                            }
                          }

                          var dataToStore = {
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            middleName: this.state.middleName,
                            age: this.state.age,
                            gender: this.state.gender == 1 ? 'M' : 'F',
                            relation: this.state.relation,
                          };

                          this.DependencySignUpServiceAction(dataToStore);

                          //console.log(this.props.State.RegistrationPageInitialData);

                          this.setState({
                            showIndicator: true,
                            isTapable: false,
                          });
                          // setTimeout(() => {
                          //   this.props.navigation.navigate(
                          //     'MedicalDocumentsList',
                          //   );
                          // }, 4000);
                        }
                      }}
                    />
                  </View> */}
                  <CustomButton title={this.state.navigationFromListPage == true
                          ? 'Save'
                          : 'Continue'}
                          onPress={() => {
                            if (this.state.isDebugging == true) {
                              this.props.navigation.navigate(
                                'MedicalDocumentsList',
                              );
                            } else {
                              if (
                                this.state.firstName.length == 0 ||
                                this.state.lastName.length == 0 ||
                                this.state.age.length == 0 ||
                                // this.state.middleName.length == 0 ||
                                this.state.gender.length == 0
                              ) {
                                this.showAlert(
                                  'Message',
                                  'Please fill all the fields',
                                );
    
                                return;
                              }
    
                              if (this.state.navigationFromListPage == true) {
                                if (this.state.relation.length == 0) {
                                  this.showAlert(
                                    'Message',
                                    'Please fill all the fields',
                                  );
    
                                  return;
                                }
                              }
    
                              var dataToStore = {
                                firstName: this.state.firstName,
                                lastName: this.state.lastName,
                                middleName: this.state.middleName,
                                age: this.state.age,
                                gender: this.state.gender == 1 ? 'M' : 'F',
                                relation: this.state.relation,
                              };
    
                              this.DependencySignUpServiceAction(dataToStore);
    
                              //console.log(this.props.State.RegistrationPageInitialData);
    
                              this.setState({
                                showIndicator: true,
                                isTapable: false,
                              });
                              // setTimeout(() => {
                              //   this.props.navigation.navigate(
                              //     'MedicalDocumentsList',
                              //   );
                              // }, 4000);
                            }
                          }}/>

                  <Toast
                    ref="toast"
                    position="center"
                    fadeOutDuration={1000}
                    opacity={0.7}
                  />
                  {this.state.navigationFromListPage == true ? null : (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate(
                          'DependencySelectionOne',
                        );
                      }}>
                      <Text 
                      allowFontScaling={false}
                      style={styles.signUpButtonStyle}>
                        Go back to previous page
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                {this.state.showIndicator == true ? (
                  <DotIndicator color="#36BC5A" />
                ) : null}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <Overlay
            isVisible={!this.state.isTapable}
            overlayStyle={{backgroundColor: 'transparent'}}>
            <View
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                backgroundColor: 'transparent',
              }}
            />
          </Overlay>
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  textInputStyle: {
    borderColor: '#36BC5A',
    marginTop: 25,
    borderWidth: 0.3,
    marginHorizontal: 35,
    height: 45,
    borderRadius: 5,
    paddingLeft: 5,
    fontFamily:Default.FontMedium,
    fontSize:14
  },
  signinButtonStyle: {
    borderColor: 'black',
    marginTop: 20,
    height: 40,
    marginHorizontal: 35,
  },
  signUpButtonStyle: {
    borderColor: 'blue',
    marginTop: 20,
    height: 40,
    marginHorizontal: 35,
    color: '#33adff',
    fontSize:14,
    fontFamily:Default.FontMedium
  },
  imageStyle: {
    alignSelf: 'center',
    marginTop: 40,
  },

  dropdown: {
    marginHorizontal: 35,
    marginTop:15
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
DependantDetails.navigationOptions = {
  headerShown: false,
};
//export default DependantDetails;
const mapStateToProps = state => {
  //console.log(state);
  return {State: state.DependentSignUp};
};

export default connect(
  mapStateToProps,
  actions,
)(DependantDetails);
