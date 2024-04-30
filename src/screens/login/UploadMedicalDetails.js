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
  Platform,
  NativeModules,
  NativeEventEmitter,
  PermissionsAndroid
} from 'react-native';
import Form from '../../components/Form';
// import {CustomButton} from '../../components/CustomButton';
import CustomButton from '../../components/CButton';
import firebase from 'react-native-firebase';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {DynamicHeader} from '../../components/DynamicHeader';
import CardView from 'react-native-rn-cardview';
import DatePicker from 'react-native-datepicker';
import {Overlay,Input} from 'react-native-elements';
var nativeDocumentPicker = NativeModules.BridgeClass; //NativeModules.DocumentPicker;
var FileUploadOverLay = NativeModules.FileUploadOverLay;
import {DotIndicator} from 'react-native-indicators';
import {TouchableOpacity} from 'react-native-gesture-handler';
let deviceWidth = Dimensions.get('window').width;
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import ImageView from 'react-native-image-viewing';
import { Default } from '../../components/Default';

class UploadMedicalDetails extends React.Component {
  UNSAFE_componentWillMount() {
    this.props.State.showAlert = false;

    this.props.ClearErrorMsg();
    this.props.ClearAlert();

    this.props.State.showLoader = false;

    console.log('documents added ..... ' + this.props.State.documentPaths);
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
      navigationRegistrationType: '',
      showImageViewer: false,
      DetailType: '', //image,gallary,file,dicom
      alertAndroid: false,
      UserType:'',
      showDicom:false
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
        {
          text: 'From Drive',
          onPress: () => {
            this.selectOneFile();
          },
        },
        {
          text: 'Choose Dicomfile',
          onPress: () => {
            this.selectDicomFile();
          },
        },
      ],
      {cancelable: false},
    );

  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{text: 'OK', onPress: () => console.log('OK Pressed/UploadMedDetails')}],
      {cancelable: false},
    );
  };
  async componentDidMount() {
    this.props.updateDocumentList();
    const UserType=await AsyncStorage.getItem('UserType')
console.log("UploadDoc",this.props.navigation.state.params.userId);
    this.setState({
      navigationFromRegistration: this.props.navigation.getParam(
        'fromRegisterPage',
        false,
      ),
      navigationRegistrationType: this.props.navigation.getParam(
        'registrationType',
        'request',
      ),

    });
  }

  UploadDetailsAction = () => {
    switch (this.state.DetailType) {
      case 'image':
        console.log('document type camera');

        break;
      case 'gallary':
        console.log('document type gallary');
        break;
      case 'file':
        console.log('document type file');
        break;
      case 'dicom':
        console.log('document type dicom');
        break;
      default:
        break;
    }
  };
  async selectOneFile() {
    this.setState({alertAndroid: false});
    //Opening Document Picker for selection of one file
    this.setState({DetailType: 'file'});
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.allFiles],
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
      var RandomNumber = Math.floor(Math.random() * 100) + 1;
      //Setting the state to show single file attributes
      // this.setState({singleFile: res});
      let DataToSend = {Type: res.type, Uri: res.uri, id: RandomNumber};
      this.props.UploadDocumentFile(DataToSend);
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
  async selectDicomFile() {
    this.setState({alertAndroid: false});
    this.setState({DetailType: 'dicom'});
    Platform.OS == 'ios'
      ? await nativeDocumentPicker
          .launchNativeDocumentPicker('12412414')
          .then(result => {
            console.log('show', result);
          })
      : FileUploadOverLay.toggle(true);
  }
  showGallery() {
    this.setState({alertAndroid: false});
    this.setState({DetailType: 'image'});
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
    launchImageLibrary(options, response => {
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
        console.log('image file source is \t', source);
        // console.log(this.props.State.documentPaths);
        // console.log(this.props.State.documentsUploaded)
        let OS = '';
        {
          Platform.OS == 'android' ? (OS = 'android') : (OS = 'ios');
        }
        this.uploadImageServiceCall(imageData, OS);
      }
    });
  }

  showCamera() {
    console.log('show camera called');
    this.setState({alertAndroid: false});
    this.setState({DetailType: 'image'});
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
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;

        console.log('imagepicker response', response);
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
        let OS = '';
        {
          Platform.OS == 'android' ? (OS = 'android') : (OS = 'ios');
        }
        console.log('imageData is',imageData)
        this.uploadImageServiceCall(imageData, OS);
      }
    });
  }

  uploadImageServiceCall = async data => {
    this.props.uploadImage(data);
  };


  uploadDocumentServiceCall = async data => {
    console.log("received data",data);
    console.log(
      'navigationFromRegistration   ' + this.state.navigationFromRegistration,
    );
    console.log(
      'navigation registration type   ' + this.state.navigationRegistrationType,
    );
    var propsToSend = {
      navigationFromRegister: this.state.navigationFromRegistration,
      data: data,
      registrationType: this.state.navigationRegistrationType,
      userId:this.props.navigation.state.params.userId
    };
    this.props.uploadMdicalData(propsToSend);
    // this.props.navigation.navigate('MainFlow');
  };

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.showCamera();
        console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  toggleDicom = () => {
    this.setState({showDicom:false})
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
            text="Upload Document"
            ShouldDisplayLeftIcon={
              this.state.navigationFromRegistration == true ? false : true
            }
            leftIconImage="chevron-left"
            onPressLeftIcon={() => {
              console.log('tapped');
              this.props.navigation.pop();
              // if (this.state.navigationRegistrationType == 'request') {
              //   this.props.navigation.navigate('BookConsultation');
              // } else {
              //   this.props.navigation.navigate('MedicalDocumentsList', {
              //     navigationFromDependentList: true,
              //   });
              // }
            }}
            ShouldDisplayRightIcon={false}
            rightIconImage="cloud-upload"
            onPressRightIcon={() => {
              this.props.ClearErrorMsg();
              console.log(this.props.State.documentPaths);
              console.log(this.props.State.documentsUploaded);
              console.log(this.props.State.showLoader);

              if (
                this.state.reportName.length == 0 ||
                this.state.reportDate.length == 0
              ) {
                this.showAlert('Message', 'Please fill the required details');
                return;
              } else {
                var data = {
                  DocumentName: this.state.reportName,
                  ReportDate: this.state.reportDate,
                  DocumentAccess: this.state.accesabilityCheck == 0 ? 'A' : 'C',
                  ValidFrom: this.state.reportFromDate
                    ? this.state.reportFromDate
                    : '',
                  ValidTo: this.state.reportToDate
                    ? this.state.reportToDate
                    : '',
                  documentPath:
                    this.props.State.documentPaths == null
                      ? []
                      : this.props.State.documentPaths,
                };
                console.log('drive data to upload', data);
                this.uploadDocumentServiceCall(data);
              }
            }}
            HeaderColour="#643A25"
          />
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            enabled>
            <View style={{paddingTop: 20, paddingHorizontal: 25}}>
              <Input
              allowFontScaling={false}
                containerStyle={{}}
                placeholder="Document Name"
                onChangeText={value => {
                  this.setState({reportName: value});
                }}
                labelStyle={{fontFamily:Default.FontMedium, fontSize: 14}}
              />
            </View>
            <View style={{paddingTop: 10, paddingHorizontal: 30}}>
              <DatePicker
                style={{width: 200}}
                date={this.state.reportDate} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="Report Date"
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
                  this.setState({reportDate: date});
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 30,
                marginHorizontal: 30,
                width: deviceWidth - 60,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text 
                allowFontScaling={false}
                style={{fontFamily:Default.FontSemiBold,fontSize:15}}> Upload Documents</Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    // this.selectOneFile()

                    //this.showGallery();

                    {
                      Platform.OS == 'ios'
                        ? this.showAlertToChooseDocumentPicker()
                        : this.setState({alertAndroid: true});
                    }
                  }}>
                  <Icon style={{}} name="pluscircleo" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            {this.state.dataList.length == 0 ? null : (
              <View style={styles.containerStyleContainer}>
                <FlatList
                  data={this.props.State.documentsUploaded}
                  keyExtractor={item => {
                    return item.id;
                  }}
                  renderItem={this._renderItem}
                  horizontal={true}
                  ItemSeparatorComponent={() => <View style={{margin: 4}} />}
                />
              </View>
            )}
            <TouchableOpacity 
            onPress={()=>{this.setState({showDicom:!this.state.showDicom})}}
            style={{flexDirection:'row',alignItems:'center',marginTop:25,marginLeft:30}}>
            <Feather
            name={'info'}
            size={25}
            color="gray"
          />
          <Text allowFontScaling={false} style={{fontFamily:Default.FontMedium,fontSize:14,color:'gray',marginLeft:10}}>What is a DICOM file?</Text>
            </TouchableOpacity>
            <View style={styles.dropdownAccessability}>
              <Text allowFontScaling={false}
              style={{color: '#36BC5A',fontFamily:Default.FontSemiBold,fontSize:15}}> Set Document Accessibility</Text>
            </View>

            <View style={styles.dropdown}>
              <RadioForm
                radio_props={this.accessability_radio_props}
                initial={0}
                formHorizontal={false}
                labelHorizontal={true}
                buttonColor={'#36BC5A'}
                selectedButtonColor={'#36BC5A'}
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
                    placeholder="From Date"
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
                    placeholder="To Date"
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
                style={{alignSelf: 'center', fontSize: 15, color: '#e74c3c',fontFamily:Default.FontMedium}}>
                {this.props.State.errorMsg}
              </Text>
            ) : null}

            <ImageView
              images={this.props.State.documentPaths}
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
                        console.log(this.props.State.documentPaths);
                        // console.log(this.state.documentDataObject.documentPath);
                        // var objectToDelete = this.state.documentDataObject.documentPath[value.imageIndex];
                        // console.log(objectToDelete);
                        // this.deleteAttachment(objectToDelete);

                        var documentUris = this.props.State.documentPaths;
                        documentUris.splice(value.imageIndex, 1);
                        console.log(documentUris);

                        var documentUploadedSample = this.props.State
                          .documentsUploaded;
                        documentUploadedSample.splice(value.imageIndex, 1);
                        console.log(documentUploadedSample);

                        //refreshDocumentPaths
                        var dataToSend = {
                          documentPaths: documentUris,
                          documentsUploaded: documentUploadedSample,
                        };
                        this.props.refreshDocumentPaths(dataToSend);
                        this.setState({documentPathsAfterDelete: documentUris});
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
          <View style={{bottom:0,position:'absolute',marginBottom:40,alignSelf:'center',flex:1,width:'100%'}}>
          <CustomButton title="Upload Details"
          onPress={async () => {
            this.props.ClearErrorMsg();
            console.log(this.props.State.documentPaths);
            console.log(this.props.State.documentsUploaded);
            console.log("loader",this.props.State.showLoader);

            console.log(
              'navigationFromRegistration   ' +
                this.state.navigationFromRegistration,
            );
            console.log(
              'navigation registration type   ' +
                this.state.navigationRegistrationType,
            );

            if (
              this.state.reportName.length == 0 ||
              this.state.reportDate.length == 0
            ) {
              this.showAlert('Message', 'Please fill the required details');
              return;
            } else {
              var data = {
                DocumentName: this.state.reportName,
                ReportDate: this.state.reportDate,
                DocumentAccess:
                  this.state.accesabilityCheck == 0 ? 'A' : 'C',
                ValidFrom: this.state.reportFromDate
                  ? this.state.reportFromDate
                  : '',
                ValidTo: this.state.reportToDate
                  ? this.state.reportToDate
                  : '',
                documentPath:
                  this.props.State.documentPaths == null
                    ? []
                    : this.props.State.documentPaths,
              };
              if (this.state.DetailType == 'dicom') {
                let Uri = '';
                console.log('is dicom');
                if (Platform.OS == 'ios') {
                  await nativeDocumentPicker
                    .getSavedDocumentPath('12412414')
                    .then(result => {
                      console.log('show', result);
                      Uri = result.value;
                    });
                  console.log('Uri', Uri);

                  var RandomNumber = Math.floor(Math.random() * 100) + 1;
                  let DataToSend = {
                    Type: 'org.nema.dicom',
                    Uri: Uri,
                    id: RandomNumber,
                  };
                  var propsToSend = {
                    navigationFromRegister: this.state
                      .navigationFromRegistration,
                    data: data,
                    registrationType: this.state.navigationRegistrationType,
                  };
                  await this.props.UploadDicomFile(
                    DataToSend,
                    propsToSend,
                    'ios',
                  );
                } else {
                  var filelocation = FileUploadOverLay.getfilepath(
                    token => {
                      console.log('Result ', token);
                      Uri = token;
                    },
                  );
                  setTimeout(() => {
                    var RandomNumber = Math.floor(Math.random() * 100) + 1;
                    let DataToSend = {
                      Type: 'org.nema.dicom',
                      Uri: Uri,
                      id: RandomNumber,
                    };
                    var propsToSend = {
                      navigationFromRegister: this.state
                        .navigationFromRegistration,
                      data: data,
                      registrationType: this.state
                        .navigationRegistrationType,
                    };
                    this.props.UploadDicomFile(
                      DataToSend,
                      propsToSend,
                      'android',
                    );
                  }, 500);
                }

                //await this.uploadDocumentServiceCall(data);
              } else {
                this.uploadDocumentServiceCall(data);
              }

              //this.UploadDetailsAction();
            }
          }}
          />
          </View>
          <Overlay isVisible={this.state.alertAndroid}>
            <Text
              allowFontScaling={false}
              style={{fontSize: 20, fontFamily:Default.FontBold}}>
              Message
            </Text>
            <Text
              allowFontScaling={false}
              style={{fontSize: 15, fontFamily:Default.FontMedium}}>
              Choose from where you want to import documents
            </Text>
            <Button
              title="Take Picture"
              type="clear"
              onPress={() => {
                this.requestCameraPermission();
              }}
            />
            <Button
              title="From Gallary"
              type="clear"
              onPress={() => {
                this.showGallery();
              }}
            />
            <Button
              title="From Cloud"
              type="clear"
              onPress={() => {
                this.selectOneFile();
              }}
            />
            <Button
              title="Upload Dicomfile"
              type="clear"
              onPress={() => {
                //this.selectDicomFile();
                this.selectOneFile();
              }}
            />
            <Button
              title="Dismiss"
              type="clear"
              onPress={() => {
                this.setState({alertAndroid: false});
              }}
            />
          </Overlay>
          <Overlay isVisible={this.state.showDicom}
          onBackdropPress={this.toggleDicom}
          overlayStyle={{marginHorizontal:25,paddingVertical:10}}>
         <View style={{paddingHorizontal:15}}>
         <Text
              allowFontScaling={false}
              style={{fontSize: 17, fontFamily:Default.FontBold,alignSelf:'center'}}>
              What is a DICOM file?
            </Text>
            <Text
              allowFontScaling={false}
              style={{fontSize: 14, fontFamily:Default.FontMedium,textAlign:'justify'}}>
              A DICOM file is an image saved in the Digital Imaging and Communications in Medicine (DICOM) format. It contains an image from a medical scan, such as an ultrasound or MRI. DICOM files may also include identification 
              data for patients to link the image to a specific individual.
            </Text>
            {/* <TouchableOpacity 
            style={{  marginTop:10,alignItems:'center',justifyContent:'center',height:40,borderRadius:5,borderColor:'#2196f3',borderWidth:1}}>
{/* <Text  allowFontScaling={false}
              style={{fontSize: 14, fontFamily:Default.FontSemiBold,color:'#2196f3'}}>Close</Text> */}
            {/* </TouchableOpacity>  */}
            <Button
            containerStyle={{marginTop:10}}
              title="Dismiss"
              type="outline"
              onPress={() => {
                this.toggleDicom()
              }}
            />
         </View>
          </Overlay>
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
    // marginTop: 20,
    height: 40,
    marginHorizontal: 35,
    width: deviceWidth - 70,
    justifyContent: 'center',
    //alignItems: 'center',
    position: 'absolute',
    bottom: 20,
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
    fontFamily:Default.FontSemiBold,
    marginHorizontal: 30,
    color: 'darkgray',
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
UploadMedicalDetails.navigationOptions = {
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
)(UploadMedicalDetails);
