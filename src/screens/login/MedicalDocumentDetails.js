import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Form from '../../components/Form';
import {CustomButton} from '../../components/CustomButton';
import firebase from 'react-native-firebase';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {DynamicHeader} from '../../components/DynamicHeader';
import CardView from 'react-native-rn-cardview';
import {Input} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import {Overlay} from 'react-native-elements';
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
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import ImageView from 'react-native-image-viewing';
import { Default } from '../../components/Default';

const images = [
  {
    uri: 'https://images.unsplash.com/photo-1571501679680-de32f1e7aad4',
  },
  {
    uri: 'https://images.unsplash.com/photo-1573273787173-0eb81a833b34',
  },
  {
    uri: 'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
  },
];

class MedicalDocumentDetails extends React.Component {
  UNSAFE_componentWillMount() {
    this.props.ClearErrorMsg();
    this.props.ClearAlert();

    this.props.State.showLoader = false;

    var medicalDocumentSingleObject = this.props.State
      .medicalDocumentSingleObject;

    this.setState({
      documentDataObject: medicalDocumentSingleObject,
      reportFromDate: this.props.State.medicalDocumentSingleObject
        .documentDetails.validFrom,
      reportToDate: this.props.State.medicalDocumentSingleObject.documentDetails
        .validTo,
    });
  }
  constructor() {
    super();
    this.state = {
      selectedTag: 0,
      dataList: [],
      //dataList: [],
      showIndicator: false,
      filePath: {},
      accesabilityCheck: 0,
      reportName: '',
      reportDate: '',
      reportFromDate: '',
      reportToDate: '',
      navigationFromRegistration: false,
      documentDataObject: null,
      showImageViewer: false,
    };
  }

  // More info on all the options is below in the API Reference... just some common use cases shown here

  accessability_radio_props = [
    {label: 'Can access always', value: 0},
    {label: 'Custom', value: 1},
  ];

  _renderItem = ({item}) => {
    var iconName = item.type == 'image' ? 'jpgfile1' : 'pdffile1';

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({showImageViewer: true});
        }}>
        <View
          style={{
            padding: 0,
            backgroundColor: '#a1d7f7',
            height: 100,
            width: 50,
            borderRadius: 7,
          }}>
          <Icon
            style={{alignSelf: 'center', marginTop: 10}}
            name={iconName}
            size={25}
            color="white"
          />
        </View>
      </TouchableOpacity>
    );
  };

  showAlertToChooseDocumentPicker = () =>
    Alert.alert(
      'Message',
      'Choose from where you want to import documents',
      [
        {
          text: 'Dismiss',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Take Picture',
          onPress: () => {
            this.showCamera();
          },
        },
        {
          text: 'From Gallery',
          onPress: () => {
            this.showGallery();
          },
        },
        // {
        //     text: "From Drive", onPress: () => {
        //         this.selectOneFile();

        //     }
        // }
      ],
      {cancelable: false},
    );

  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{text: 'OK', onPress: () => this.props.ClearAlert()}],
      {cancelable: false},
    );
  };
  componentDidMount() {
    this.props.updateDocumentList();
    //this.props.State.documentPaths = [];
    //this.props.State.documentsUploaded = [];
    this.setState({
      navigationFromRegistration: this.props.navigation.getParam(
        'fromRegisterPage',
        false,
      ),
    });
  }

  async selectOneFile() {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      //Setting the state to show single file attributes
      // this.setState({ singleFile: res });
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        // alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        // alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }
  showGallery() {
    var options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        var RandomNumber = Math.floor(Math.random() * 100) + 1;
        var imageData = {type: 'image', file: source, id: RandomNumber};
        var joined = this.state.dataList.concat({
          type: 'image',
          file: source,
          id: RandomNumber,
        });
        this.setState({
          filePath: source,
          dataList: joined,
        });
        // console.log(this.props.State.documentPaths);
        // console.log(this.props.State.documentsUploaded)
        this.uploadImageServiceCall(imageData);
      }
    });
  }
  showCamera() {
    var options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        var RandomNumber = Math.floor(Math.random() * 100) + 1;
        var imageData = {type: 'image', file: source, id: RandomNumber};
        var joined = this.state.dataList.concat({
          type: 'image',
          file: source,
          id: RandomNumber,
        });
        this.setState({
          filePath: source,
          dataList: joined,
        });
        this.uploadImageServiceCall(imageData);
      }
    });
  }

  uploadImageServiceCall = async data => {
    this.props.uploadImage(data);
    // this.props.navigation.navigate('MainFlow');
  };

  uploadDocumentServiceCall = async data => {
    console.log(
      'navigationFromRegistration   ' + this.state.navigationFromRegistration,
    );
    var propsToSend = {
      navigationFromRegister: this.state.navigationFromRegistration,
      data: data,
    };
    this.props.uploadMdicalData(propsToSend);
    // this.props.navigation.navigate('MainFlow');
  };
  deleteAttachment = async dataToSend => {
    var dataToSend = {
      fileName: dataToSend.uri,
      userDocumentDetailID: dataToSend.userDocumentDetailID,
    };
    this.props.removeAttachment(dataToSend);
  };

  render() {
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#7ecaf3"
          translucent={false}
        />
        <SafeAreaView style={{flex: 0, backgroundColor: '#7ecaf3'}} />
        <SafeAreaView style={styles.container}>
          <DynamicHeader
            text="Document Details"
            ShouldDisplayLeftIcon={true}
            leftIconImage="chevron-left"
            onPressLeftIcon={() => {
              console.log('tapped');

              this.props.navigation.navigate('MedicalDocumentsList', {
                navigationFromDependentList: true,
              });
            }}
            ShouldDisplayRightIcon={false}
            rightIconImage="cloud-upload"
            onPressRightIcon={() => {
              //this.setState({showImageViewer:true});
              console.log(
                this.props.State.medicalDocumentSingleObject.documentPath,
              );
            }}
            HeaderColour="#7ecaf3"
          />
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            enabled>
            <View style={{paddingTop: 20, paddingHorizontal: 25}}>
              <Text
              allowFontScaling={false}
                style={{
                  marginHorizontal: 5,
                  fontSize: 18,
                  color: 'gray',
                  fontFamily:Default.FontSemiBold
                }}>
                {
                  this.props.State.medicalDocumentSingleObject.documentDetails
                    .documentName
                }
              </Text>
            </View>
            <View style={{paddingTop: 10, paddingHorizontal: 25}}>
              <Text
              allowFontScaling={false}
                style={{
                  marginHorizontal: 5,
                  fontSize: 14,
                  color: 'lightgray',
                  marginBottom: 10,
                  fontFamily:Default.FontMedium
                }}>
                Uploaded on
              </Text>
              <Text 
              allowFontScaling={false}
              style={{marginHorizontal: 5, fontSize: 18, color: 'gray',fontFamily:Default.FontMedium}}>
                {
                  this.props.State.medicalDocumentSingleObject.documentDetails
                    .reportDate
                }
              </Text>
            </View>
            <View style={{paddingTop: 20, paddingHorizontal: 25}}>
              <Text 
              allowFontScaling={false}
              style={{marginHorizontal: 5, fontSize: 18, color: 'gray',fontFamily:Default.FontMedium}}>
                Documents
              </Text>
            </View>
            {this.props.State.medicalDocumentSingleObject.documentPath.length ==
            0 ? null : (
              <View style={styles.containerStyleContainer}>
                <FlatList
                  data={
                    this.props.State.medicalDocumentSingleObject.documentPath
                  }
                  keyExtractor={item => {
                    return item.id;
                  }}
                  extraData={this.state.selectedTag}
                  renderItem={this._renderItem}
                  horizontal={true}
                  ItemSeparatorComponent={() => <View style={{margin: 4}} />}
                />
              </View>
            )}

            <View style={styles.dropdownAccessability}>
              <Text 
              allowFontScaling={false}
              style={{color: '#2196f3',fontFamily:Default.FontMedium,fontSize:18}}> Document Accessibility</Text>
            </View>

            <View style={styles.dropdown}>
              <RadioForm
                radio_props={this.accessability_radio_props}
                initial={
                  this.props.State.medicalDocumentSingleObject.documentDetails
                    .documentAccess == 'Custom'
                    ? 1
                    : 0
                }
                formHorizontal={false}
                labelHorizontal={true}
                buttonColor={'#2196f3'}
                animation={true}
                onPress={value => {
                  this.setState({accesabilityCheck: value});
                }}
              />
            </View>

            {this.state.accesabilityCheck == 0 ? null : (
              <View>
                <Text 
                allowFontScaling={false}
                style={styles.dependantNameLabel}>
                  Please mention the accessibility duration
                </Text>

                <View style={{paddingTop: 10, paddingHorizontal: 30}}>
                  <DatePicker
                    style={{width: 200}}
                    date={this.state.reportFromDate} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder={
                      this.props.State.medicalDocumentSingleObject
                        .documentDetails.validFrom == ''
                        ? 'From Date'
                        : this.props.State.medicalDocumentSingleObject
                            .documentDetails.validFrom
                    }
                    format="DD-MM-YYYY"
                    // minDate="01-01-2016"
                    // maxDate="01-01-2019"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 36,
                      },
                    }}
                    onDateChange={date => {
                      this.setState({reportFromDate: date});
                    }}
                  />
                </View>
                <View style={{paddingTop: 10, paddingHorizontal: 30}}>
                  <DatePicker
                    style={{width: 200}}
                    date={this.state.reportToDate} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder={
                      this.props.State.medicalDocumentSingleObject
                        .documentDetails.validTo == ''
                        ? 'To Date'
                        : this.props.State.medicalDocumentSingleObject
                            .documentDetails.validTo
                    }
                    format="DD-MM-YYYY"
                    // minDate="01-01-2016"
                    // maxDate="01-01-2019"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                      },
                      dateInput: {
                        marginLeft: 36,
                      },
                    }}
                    onDateChange={date => {
                      this.setState({reportToDate: date});
                    }}
                  />
                </View>
              </View>
            )}

            {this.props.State.showLoader == true ? (
              <Overlay
                isVisible={!this.state.isTapable}
                overlayStyle={{backgroundColor: 'transparent'}}>
                <View
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                    backgroundColor: 'transparent',
                  }}>
                  <DotIndicator color="#36BC5A" />
                </View>
              </Overlay>
            ) : null}

            {this.props.State.showAlert == true
              ? this.showAlert('Message', 'Successfully uploaded data')
              : null}

            {this.props.State.errorMsg != '' ? (
              <Text
                allowFontScaling={false}
                style={{alignSelf: 'center', fontSize: 16, color: '#e74c3c',fontFamily:Default.FontMedium}}>
                {this.props.State.errorMsg}
              </Text>
            ) : null}

            <ImageView
              images={this.props.State.medicalDocumentSingleObject.documentPath}
              imageIndex={0}
              visible={this.state.showImageViewer}
              onRequestClose={() => this.setState({showImageViewer: false})}
              HeaderComponent={value => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      top: 20,
                      width: deviceWidth,
                      justifyContent: 'space-between',
                      height: 50,
                      backgroundColor: 'white',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({showImageViewer: false});
                        console.log(value);
                        console.log(
                          this.props.State.medicalDocumentSingleObject
                            .documentPath,
                        );
                        var objectToDelete = this.props.State
                          .medicalDocumentSingleObject.documentPath[
                          value.imageIndex
                        ];
                        console.log(objectToDelete);
                        this.deleteAttachment(objectToDelete);

                        setTimeout(() => {
                          this.setState({selectedTag: 2});
                        }, 2000);
                      }}>
                      <View>
                        <Icon
                          style={{marginLeft: 15, marginTop: 10}}
                          name="delete"
                          size={25}
                          color="gray"
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({showImageViewer: false});
                      }}>
                      <View>
                        <Icon
                          style={{marginRight: 10, marginTop: 10}}
                          name="close"
                          size={25}
                          color="gray"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  textInputStyle: {
    borderColor: '#99ccff',
    marginTop: 20,
    borderWidth: 0.3,
    marginHorizontal: 35,
    height: 45,
    borderRadius: 5,
    paddingLeft: 5,
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
  },
  imageStyle: {
    alignSelf: 'center',
    marginTop: 40,
  },

  dropdown: {
    marginHorizontal: 30,
    marginTop: 20,
  },
  dropdownAccessability: {
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 0,
  },
  containerStyleContainer: {
    height: 50,
    marginHorizontal: 30,
    marginTop: 25,
  },
  dependantNameLabel: {
    borderColor: '#2edccd',
    marginTop: 20,

    marginHorizontal: 30,
    color: 'darkgray',
    fontSize: 15,
    fontFamily:Default.FontSemiBold
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
MedicalDocumentDetails.navigationOptions = {
  headerShown: false,
};
//export default UploadMedicalDetails;

const mapStateToProps = state => {
  //console.log(state);
  return {State: state.MedicalDataUpload};
};

export default connect(
  mapStateToProps,
  actions,
)(MedicalDocumentDetails);
