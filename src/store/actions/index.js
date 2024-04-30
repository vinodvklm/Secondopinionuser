import axios from 'axios';
import {navigate} from '../../navigation/navigationRef';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
var my_acesscode = '';
const localURL = 'http://94-237-73-65.sg-sin1.upcloud.host:96/api/';
const productionURL = 'https://secondopinionweb.azurewebsites.net/api/';

const baseURL = productionURL;
const Server = axios.create({
  baseURL: baseURL,
});
///SIGN IN SERVICE
export const SignIn = loginData => {
  var dataToSend = {
    email: loginData.username,
    password: loginData.password,
  };
  console.log('login data' + loginData.username + loginData.password);
  return async dispatch => {
    try {
      dispatch({
        type: 'ShowLoader',
        payload: true,
      });
      console.log('signin service called');
      const response = await Server.post('Auth/user_Login', dataToSend);
      console.log(response.data);

      let dataObject = response.data;
      // console.log(dataObject);
      console.log(dataObject.data);

      if (dataObject.status === 1) {
        await AsyncStorage.setItem('token', dataObject.data.token);
        await AsyncStorage.setItem('username', dataObject.data.fullname);
        await AsyncStorage.setItem('UserId', dataObject.data.id);
        //dispatch({type: 'add_Code', payload: acessCode});

        console.log(dataObject.data.fullname);

        console.log('signin service success');
        dispatch({
          type: 'SignInSucess',
          payload: dataObject,
        });
        navigate('Dashboard');
      } else {
        dispatch({
          type: 'SignInFailed',
          payload: dataObject.message,
        });
      }
    } catch (err) {
      console.log(err);

      dispatch({
        type: 'SignInFailed',
        payload: err.message,
      });
    }
  };
};
///SIGN IN SERVICE
export const SignUp = dataReceived => {
  var dataToSend = {
    firstName: dataReceived.firstName,
    middleName: dataReceived.middleName,
    lastName: dataReceived.lastName,
    email: dataReceived.emailAddress,
    password: dataReceived.password,
    dob: '',
    age: dataReceived.age,
    gender: dataReceived.gender,
    mobileNumber: dataReceived.mobile_personal,
    OfficialNumber: dataReceived.mobile_office,
    WhatsAppNumber: dataReceived.mobile_personal,
    StreetName: '',
    CityName: '',
    Pincode: '',
    latitude: '',
    longitude: '',
    address: dataReceived.address,
    CountryCode:dataReceived.CountryCode
  };
  console.log('signup called');

  //console.log(dataToSend);

  return async dispatch => {
    try {
      dispatch({
        type: 'ShowLoader',
        payload: true,
      });
      const response = await Server.post('User/add_user', dataToSend);
      console.log('response received');
      console.log(response.data.message);
      //console.log(response);

      let responseData = response.data;

      if (responseData.status === 1) {
        await AsyncStorage.setItem('token', responseData.data.token);
        await AsyncStorage.setItem('username', responseData.data.fullname);
        await AsyncStorage.setItem('UserId', responseData.data.id);
        //dispatch({type: 'add_Code', payload: acessCode});

        dispatch({
          type: 'SignUpSucess',
          payload: responseData.data,
        });
        Toast.show('Successfully registered User')
        navigate('Dashboard');
      } else {
        dispatch({
          type: 'SignUpFailed',
          payload: responseData.message,
        });
      }
    } catch (err) {
      console.log(err);

      dispatch({
        type: 'SignUpFailed',
        payload: err.message,
      });
    }
  };
};
export const storeInitialRegistrationData = dataToSend => {
  return async dispatch => {
    try {
      dispatch({
        type: 'storeInitialData',
        payload: dataToSend,
      });
      navigate('DetailsRegistration');
    } catch (err) {
      console.log(err);
    }
  };
};
export const refreshDocumentPaths = dataToSend => {
  return async dispatch => {
    // var dataToSend = {documentPaths:documentUris,documentsUploaded:documentUploadedSample}

    try {
      dispatch({
        type: 'refreshDocumentPaths',
        payload: dataToSend,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const isUsernameAlreadyExist = dataReceived => {
  var username = dataReceived.emailAddress;
  console.log('is username already exist service called');
  console.log('username is ' + username);
  const qs = require('querystring');
  return async dispatch => {
    var UserID = await AsyncStorage.getItem('UserId');

    Server.get(`user/check_username_exist?Email=${username}`, {
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        console.log('response got sucesfully');

        let responseData = response.data;

        console.log(responseData);
        console.log(responseData.message);

        if (responseData.status === 1) {
          dispatch({
            type: 'usernameAlreadyExistTrue',
            payload: responseData.message,
          });
        } else {
          dispatch({
            type: 'usernameNotExistFalse',
            payload: dataReceived,
          });
          navigate('DetailsRegistration');
        }
      })
      .catch(error => {
        console.log('get my program error');
        console.log(error);
        dispatch({
          type: 'usernameNotExistServiceFailed',
          payload: error.message,
        });
      });
  };
};
///SIGN IN SERVICE
export const verifyOTP = dataToSend => {
  return async dispatch => {
    try {
      dispatch({
        type: 'ShowLoader',
        payload: true,
      });
      const response = await Server.post('/user_Login', {
        patientuniqueid: acessCode,
      });
      console.log(response.data);
      if (response.data.status === true) {
        my_acesscode = acessCode;
        await AsyncStorage.setItem('acessCode', acessCode);
        //dispatch({type: 'add_Code', payload: acessCode});

        dispatch({
          type: 'SignUpSucess',
          payload: response.data,
        });
        navigate('Dashboard');
      } else {
        dispatch({
          type: 'SignUpFailed',
          payload: response.data.msg,
        });
      }
    } catch (err) {
      console.log(err);

      dispatch({
        type: 'SignUpFailed',
        payload: err.message,
      });
    }
  };
};
///SIGN IN SERVICE
export const DependentSignUp = receivedData => {
  console.log('signup called');
  //console.log(dataToSend);

  var dataReceived = receivedData.data;
  var isNavigationFromList = receivedData.isNavigationFromList;

  console.log('received data ' + dataReceived);
  console.log('received flow bool  ' + isNavigationFromList);

  return async dispatch => {
    try {
      dispatch({
        type: 'ShowLoader',
        payload: true,
      });
      var UserID = await AsyncStorage.getItem('UserId');
      var dataToSend = {
        UserID: UserID,
        Relationship: dataReceived.relation,
        FirstName: dataReceived.firstName,
        MiddleName: dataReceived.middleName,
        LastName: dataReceived.lastName,
        Age: dataReceived.age,
        Gender: dataReceived.gender,
      };
      const response = await Server.post('User/add_dependent', dataToSend);
      console.log(response.data);

      let dataObject = response.data;

      if (dataObject.status === 1) {
        // await AsyncStorage.setItem('acessCode', acessCode);
        //dispatch({type: 'add_Code', payload: acessCode});
        dispatch({
          type: 'AddDependentSucess',
          payload: dataObject.data,
        });
        if (isNavigationFromList == true) {
          navigate('DependentList');
        } else {
          await AsyncStorage.setItem('UserType', 'Dependent');
          await AsyncStorage.setItem(
            'DependentFK',
            `${dataObject.dependentID}`,
          );

          navigate('UploadMedicalDetails', {
            fromRegisterPage: true,
            registrationType: 'user',
          });
        }
      } else {
        dispatch({
          type: 'AddDependentFailed',
          payload: dataObject.message,
        });
      }
    } catch (err) {
      console.log('error', err);

      dispatch({
        type: 'AddDependentFailed',
        payload: err.message,
      });
    }
  };
};

export const GetDependentList = () => {
  console.log(' Get dependent list service called');
  const qs = require('querystring');
  return async dispatch => {


    dispatch({
      type: 'ShowLoader',
      payload: true,
    });

    var UserID = await AsyncStorage.getItem('UserId');

    var dataToSend = {
      UserID: '2',
    };

    Server.get(`User/get_dependent?UserID=${UserID}`, {
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        console.log('response got sucesfully');

        dispatch({
          type: 'HideLoader',
          payload: false,
        });

        let responseData = response.data;

        console.log(responseData.dependentList);

        if (responseData.status === 1) {
          dispatch({
            type: 'GetDependentListSuccess',
            payload: responseData.dependentList,
          });
          
        } else {

          dispatch({
            type: 'HideLoader',
            payload: false,
          });
          dispatch({
            type: 'GetDependentListFailed',
            payload: responseData.message,
          });
        }
      })
      .catch(error => {
        dispatch({
          type: 'HideLoader',
          payload: false,
        });
        console.log('get my program error');
        console.log(error);
        dispatch({
          type: 'GetDependentListFailed',
          payload: error.message,
        });
      });
  };
};

//export const SignUp = dataReceived => {
export const uploadImage = (details, OS) => {
  //reportData: {reportName:this.state.reportName,reportDate:this.state.reportDate},
  // documentData: this.state.dataList,
  //var documentDataList = details.documentData;

  // var joined = this.state.dataList.concat({ type: "image", file: source, id: RandomNumber });

  console.log('document data upload initiated');

  return async dispatch => {
    try {
      console.log('this fileUri', details.file.uri);

      dispatch({
        type: 'ShowLoader',
        payload: true,
      });

      const UserID = await AsyncStorage.getItem('UserId');

      var filename = `${UserID}_${details.id}.jpg`;

      let uploadData = new FormData();
      if (OS == 'ios') {
        uploadData.append('UserID', UserID);
        // uploadData.append('UserID', "2");
        // uploadData.append('file', this.state.fileUri)
        uploadData.append('file', {
          uri: details.file.uri,
          name: filename,
          type: 'image/jpg',
        });
      } else {
        const mime = require('mime');

        let imageUri = details.file.uri;
        const newImageUri = imageUri;
        console.log('mime type is', mime.getType(newImageUri));
        console.log('new image uri', newImageUri);
        uploadData.append('UserID', UserID);
        uploadData.append('file', {
          uri: newImageUri,
          name: filename,
          type: mime.getType(newImageUri),
        });
      }

      axios({
        method: 'post',
        url:
          `${baseURL}DocumentUpload/upload_document`,
        data: uploadData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'cache-control': 'no-cache',
        },
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',
      })
        .then(function(response) {
          console.log('document uploaded');

          console.log('response', response.data.documentPath);

          if (response.data.status == '1') {
            var path = response.data.documentPath[0];

            //var pathObject = {uri:path.path};

            var RandomNumber = Math.floor(Math.random() * 100) + 1;
            var docUploaded = {
              type: 'image',
              file: details.file.uri,
              id: RandomNumber,
            };
            console.log('path is .....', path);

            var payloadData = {path: path, docUploaded: docUploaded};

            dispatch({
              type: 'DataUploadSuccess',
              payload: payloadData,
            });
          } else {
            dispatch({
              type: 'DataUploadFailed',
              payload: 'Document upload failed',
            });
          }
        })
        .catch(function(error) {
          console.log('uploadimage error', error);
          dispatch({
            type: 'DataUploadFailed',
            payload: error.message,
          });
        });
      // console.log("UpdatePhoto_response*******" + JSON.stringify(response));
    } catch (error) {
      console.log('response UpdatePhoto' + error);
      dispatch({
        type: 'DataUploadFailed',
        payload: error.message,
      });
    }
  };
};

export const UploadDocumentFile = details => {
  console.log('document data upload initiated');

  return async dispatch => {
    try {
      console.log('this fileUri', details.Uri);
      var File_extension = '';
      if (details.Type == 'application/pdf') {
        File_extension = 'pdf';
      } else if (details.Type == 'org.nema.dicom') {
        File_extension = 'dcm';
      }
      dispatch({
        type: 'ShowLoader',
        payload: true,
      });

      const UserID = await AsyncStorage.getItem('UserId');

      var filename = `${UserID}_${details.id}.${File_extension}`;

      let uploadData = new FormData();
      uploadData.append('UserID', UserID);
      // uploadData.append('UserID', "2");
      // uploadData.append('file', this.state.fileUri)
      uploadData.append('file', {
        uri: details.Uri,
        name: filename,
        type: details.Type,
      });

      axios({
        method: 'post',
        url:
          `${baseURL}DocumentUpload/upload_document`,
        data: uploadData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'cache-control': 'no-cache',
        },
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',
      })
        .then(function(response) {
          console.log('document uploaded');

          console.log('response', response.data.documentPath);

          if (response.data.status == '1') {
            var path = response.data.documentPath[0];

            //var pathObject = {uri:path.path};
            if (details.Type == 'org.nema.dicom') {
              uploadDicomFile();
            }

            var RandomNumber = Math.floor(Math.random() * 100) + 1;
            var docUploaded = {
              type: File_extension,
              file: details.Uri,
              id: RandomNumber,
            };
            console.log('path is .....', path);

            var payloadData = {path: path, docUploaded: docUploaded};

            dispatch({
              type: 'DataUploadSuccess',
              payload: payloadData,
            });
          } else {
            dispatch({
              type: 'DataUploadFailed',
              payload: 'Document upload failed',
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          dispatch({
            type: 'DataUploadFailed',
            payload: error.message,
          });
        });
      // console.log("UpdatePhoto_response*******" + JSON.stringify(response));
    } catch (error) {
      console.log('response UpdatePhoto' + error);
      dispatch({
        type: 'DataUploadFailed',
        payload: error.message,
      });
    }
  };
};
export const storeSingleDocumentObject = dataToSend => {
  return async dispatch => {
    try {
      dispatch({
        type: 'storeDocumentData',
        payload: dataToSend,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const GetMedicalListItems = (isnavigatedFromSignUp,userId) => {
  console.log(' Get medical list service called');
  console.log("userId",userId);
  console.log('navigated from signup=', isnavigatedFromSignUp);
  const qs = require('querystring');
  return async dispatch => {
    const UserID = await AsyncStorage.getItem('UserId');
    const UserType = await AsyncStorage.getItem('UserType');
    const DependentFK = await AsyncStorage.getItem('DependentFK');
    const token=await AsyncStorage.getItem('token');
    console.log("userid",UserID);
    console.log("token",token);
console.log(UserType,"USerType")
    var IsSelfDependent = true;
    var RefernceID = '';

    if (UserType == 'MySelf') {
      IsSelfDependent = true;
      RefernceID = UserID;
    } else {
      IsSelfDependent = false;
      RefernceID = userId;
    }

    console.log('IsSelfDependent' + IsSelfDependent);
    console.log('RefernceID' + RefernceID);

    const url = `DocumentUpload/get_medical_documents?IsSelfDependent=${IsSelfDependent}&RefernceID=${RefernceID}`;
    console.log('url  ' + url);
    Server.get(url, {
      headers: {'Content-Type': 'application/json'},
    })
      .then(response => {
        console.log('response got sucesfully get med details');
console.log(response.data);
        let responseData = response.data;
        console.log('response ',responseData);
        console.log('document list ' + responseData.medicalDocuments);

        if (responseData.status === 1) {
          dispatch({
                type: 'GetIndividualReportsSuccess',
                payload: responseData.medicalDocuments,
              });
          // if (isnavigatedFromSignUp == true) {
          //   dispatch({
          //     type: 'GetMedicalReportsSuccess',
          //     payload: responseData.medicalDocuments,
          //   });
          // } else {
          //   dispatch({
          //     type: 'GetIndividualReportsSuccess',
          //     payload: responseData.medicalDocuments,
          //   });
          // }
        } else {
          dispatch({
            type: 'GetMedicalReportsFailed',
            payload: responseData.message,
          });
        }
      })
      .catch(error => {
        console.log('get my program error');
        console.log(error);
        dispatch({
          type: 'GetMedicalReportsFailed',
          payload: error.message,
        });
      });
  };
};
export const removeAttachment = receivedData => {
  console.log('remove document called');

  //console.log(dataToSend);

  return async dispatch => {
    const UserID = await AsyncStorage.getItem('UserId');

    var dataToSend = {
      UserID: UserID,
      fileName: receivedData.fileName,
      userDocumentDetailID: receivedData.userDocumentDetailID,
    };
    console.log(dataToSend);
    try {
      dispatch({
        type: 'ShowLoader',
        payload: true,
      });
      const response = await Server.post(
        'DocumentUpload/remove_document',
        dataToSend,
      );
      console.log('response received');
      console.log(response.data.message);
      // console.log(response);

      let responseData = response.data;

      console.log(responseData);

      console.log('data is ..... ' + responseData.medicalDocuments[0]);

      let documentData = responseData.medicalDocuments[0];

      console.log(
        'data name is ..... ' + documentData.documentDetails.documentName,
      );
      console.log('data is two..... ' + documentData.documentPath);

      let dataToRefresh = {
        documentDetails: documentData.documentDetails,
        documentPath: documentData.documentPath,
      };

      if (responseData.status === 1) {
        dispatch({
          type: 'removeAttachmentSuccess',
          payload: responseData.data,
        });
        // navigate('OTPScreen');
      } else {
        dispatch({
          type: 'removeAttachmentFailed',
          payload: responseData.message,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: 'removeAttachmentFailed',
        payload: err.message,
      });
    }
  };
};
///SIGN IN SERVICE
export const uploadMdicalData = receivedData => {
  console.log('medical details upload called');
  console.log('recevd data', receivedData);
  var navigationFromRegister = receivedData.navigationFromRegister;
  var dataReceived = receivedData.data;

  var registrationType = receivedData.registrationType;
  console.log('registration type is...... ' + registrationType);

  return async dispatch => {
    if (receivedData) {
      
    } else {
      
    }
    // const UserID = await AsyncStorage.getItem('UserId');
    const UserType = await AsyncStorage.getItem('UserType');
    // const DependentFK = await AsyncStorage.getItem('DependentFK');

    console.log('medical details upload called');

    let dataToSend = {
      UserID: receivedData.userId,
      UserType: UserType,
      // DependentFK: DependentFK,
      DocumentName: dataReceived.DocumentName,
      ReportDate: dataReceived.ReportDate,
      DocumentAccess: dataReceived.DocumentAccess,
      ValidFrom: dataReceived.ValidFrom,
      ValidTo: dataReceived.ValidTo,
      documentPath: dataReceived.documentPath,
    };

    console.log(dataToSend);

    try {
      dispatch({
        type: 'ShowLoader',
        payload: true,
      });
      const response = await Server.post(
        'DocumentUpload/save_documents',
        dataToSend,
      );
      console.log("Upload medical records",response.data);
      if (response.data.status === 1) {
        dispatch({
          type: 'DetailsUploadSuccess',
          payload: response.data,
        });

        if (navigationFromRegister == true) {
          navigate('Dashboard');
        } else {
          if (registrationType == 'request') {
            navigate('IndividualDocument');
          } else {
            navigate('MedicalDocumentsList', {
              navigationFromDependentList: true,
            });
          }
        }
      } else {
        dispatch({
          type: 'DetailsUploadFailed',
          payload: response.data.msg,
        });
      }
    } catch (err) {
      console.log(err);

      dispatch({
        type: 'DetailsUploadFailed',
        payload: err.message,
      });
    }
  };
};
export const ClearErrorMsg = () => {
  return dispatch => {
    dispatch({
      type: 'clear_errorMsg',
      payload: null,
    });
  };
};
export const ClearLoader = () => {
  return dispatch => {
    dispatch({
      type: 'HideLoader',
      payload: false,
    });
  };
};
export const clear_timeslot = () => {
  return dispatch => {
    dispatch({
      type: 'clear_timeslot',
      payload: null,
    });
  };
};

export const ClearAlert = () => {
  return dispatch => {
    dispatch({
      type: 'clear_alert',
      payload: null,
    });
  };
};
export const updateDocumentList = () => {
  return dispatch => {
    dispatch({
      type: 'updateDocList',
      payload: null,
    });
  };
};
export const LogOut = () => {
  return async dispatch => {
    try {
      await AsyncStorage.removeItem('UserId');
      navigate('LoginFlow');
      return true;
    } catch (exception) {
      console.log('err', exception);
      return false;
    }
  };
};
export const SelectedForAppoinment = data => {
  return async dispatch => {
    await dispatch({
      type: 'AddselectedDependent',
      payload: data,
    });
  };
};
export const BookAppoinment = data => {
  return async dispatch => {
    await dispatch({
      type: 'BookAppoinment',
      payload: data,
    });
    // navigate('PrePayment');
  };
};

export const GetModeOfCommunication = () => {
  return async dispatch => {
    dispatch({
      type: 'ShowLoader',
      payload: true,
    });
    try {
      const response = await axios.get(
        `${baseURL}Patient/get_communication_types`,
      );
      console.log(response.data);
      dispatch({
        type: 'HideLoader',
        payload: false,
      });
      if (response.data.status == 1) {
        dispatch({
          type: 'add_modeofCommunications',
          payload: response.data.communicationTypeList,
        });
      }
    } catch (error) {
      dispatch({
        type: 'HideLoader',
        payload: false,
      });
      console.log('error', error);
    }
  };
};
export const BookConsultation = data => {
  console.log('BookConsultation service called')
  return async dispatch => {
    dispatch({
      type: 'add_message',
      payload: '',
    });
    try {
      const response = await Server.post('patient/add_appointment', data);
      console.log('BookConsultation service response is ',response.data)
 
      if (response.data.status == 1) {
        dispatch({
          type: 'add_message',
          payload: response.data.message,
        });
        // navigate('ConsultationHistory');
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'add_message',
        payload: error.message,
      });
    }
  };
};

export const GetUserInfo = () => {
  console.log('userinfo called');
  return async dispatch => {
    try {
      const UserID = await AsyncStorage.getItem('UserId');
      const response = await Server.get(
        `user/get_user_profile?UserID=${UserID}`,
      );

      console.log(response.data);
      if (response.data.status == 1) {
        dispatch({
          type: 'userInfo',
          payload: response.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const GetAvailableDates = TypeID => {
  console.log('type id',TypeID);
  return async dispatch => {

    dispatch({
      type: 'ShowLoader',
      payload: true,
    });

    dispatch({
      type: 'clear_date&time',
      payload: null,
    });
    try {
      const response = await Server.get(
        `booking/get_doctor_unavailable_date?CommunicationTypeID=${TypeID}`,
      );
      console.log(response.data);

    dispatch({
      type: 'HideLoader',
      payload: false,
    });
      if (response.data.status == 1) {
        dispatch({
          type: 'HideLoader',
          payload: false,
        });
        dispatch({
          type: 'add_Doc_Date',
          payload: response.data.unavailableDates,
        });
      }
    } catch (error) {

    dispatch({
      type: 'HideLoader',
      payload: false,
    });
    }
  };
};
export const AddContactType = type => {
  return dispatch => {
    dispatch({
      type: 'add_contact_type',
      payload: type,
    });
  };
};
export const GetTimeSlots = (date, TypeID) => {
  console.log("date:",date,",TypeID:",TypeID);
  return async dispatch => {
    try {
      const response = await Server.get(
        `booking/get_doctor_available_time?date=${date}&&CommunicationTypeID=${TypeID}`,
      );
console.log("url",response);
      console.log("Available time slots",response.data);
      if (response.data.status == 1) {
        dispatch({
          type: 'add_timeslot',
          payload: response.data.availableTimes,
        });
      }
    } catch (error) {
      console.log("TimeSlot error",error);
    }
  };
};
export const AddSelectedTimeAndDate = data => {
  return dispatch => {
    dispatch({
      type: 'add_selected D&T',
      payload: data,
    });
  };
};
export const cancelSelectedTimedate = () => {
  return dispatch => {
    dispatch({
      type: 'clear_date&time',
      payload: null,
    });
  };
};
export const AddPatientDetails = data => {
  return dispatch => {
    dispatch({
      type: 'add_patientID',
      payload: data,
    });
  };
};
export const ClearMessage = () => {
  return dispatch => {
    dispatch({
      type: 'clear_message',
      payload: null,
    });
  };
};

export const GetHistory = () => {
  return async dispatch => {
    dispatch({
      type: 'clear_error',
      payload: null,
    });
    try {
      const UserID = await AsyncStorage.getItem('UserId');
      const response = await Server.get(
        `Patient/get_consultation_details?UserID=${UserID}`,
      );
      console.log(response.data);
      if (response.data.status == 1) {
        dispatch({
          type: 'add_history',
          payload: response.data.consulationDetailsList,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'add_error',
        payload: 'Error occured try later',
      });
    }
  };
};

export const GetHistoryDetails = ID => {
  return async dispatch => {
    dispatch({
      type: 'clear_error',
      payload: null,
    });
    try {
      const response = await Server.get(
        `patient/get_consultation_history?PatientID=${ID}`,
      );
      console.log("Consultation history details",response.data);
      if (response.data.status == 1) {
        dispatch({
          type: 'add_historydetails',
          payload: response.data.consulationHistory.consultationStatusList,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'add_error',
        payload: 'Error occured try later',
      });
    }
  };
};
export const SelectDocumentsForConsultation = dataArr => {
  console.log("Selected Doc for consultation",dataArr);
  return dispatch => {
    dispatch({
      type: 'add_documentsSelected',
      payload: dataArr,
    });
  };
};
export const ClearSelectedDocuments = () => {
  return dispatch => {
    dispatch({
      type: 'add_documentsSelected',
      payload: [],
    });
  };
};
export const UploadDicomFile = (details, PropsToSend, OS) => {
  console.log('document data upload initiated');
  console.log('props to send', PropsToSend);
  return async dispatch => {
    try {
      console.log('this fileUri', details.Uri);
      const mime = require('mime');
      console.log('file type is ', mime.getType(details.Uri));
      var File_extension = '';
      if (details.Type == 'application/pdf') {
        File_extension = 'pdf';
      } else if (details.Type == 'org.nema.dicom') {
        File_extension = 'DCM';
      }

      dispatch({
        type: 'ShowLoader',
        payload: true,
      });

      const UserID = await AsyncStorage.getItem('UserId');

      var filename = `${UserID}_${details.id}.${File_extension}`;

      let uploadData = new FormData();
      uploadData.append('UserID', UserID);
      if (OS == 'ios') {
        uploadData.append('file', {
          uri: details.Uri,
          name: filename,
          type: details.Type,
        });
      } else {
        console.log('is android');
        var newUri = 'content://' + details.Uri;
        uploadData.append('file', {
          uri: newUri,
          name: filename,
          type: details.Type,
        });
      }

      axios({
        method: 'post',
        url:
          `${baseURL}DocumentUpload/upload_document`,
        data: uploadData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'cache-control': 'no-cache',
        },
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',
      })
        .then(function(response) {
          console.log('document uploaded');

          console.log('response', response.data.documentPath);

          if (response.data.status == '1') {
            var path = response.data.documentPath[0];

            //var pathObject = {uri:path.path};
            if (details.Type == 'org.nema.dicom') {
              //uploadDicomMedicalFile(PropsToSend);
            }

            var RandomNumber = Math.floor(Math.random() * 100) + 1;
            var docUploaded = {
              type: File_extension,
              file: details.Uri,
              id: RandomNumber,
            };
            console.log('path is .....', path);

            var payloadData = {path: path, docUploaded: docUploaded};

            dispatch({
              type: 'DataUploadSuccess',
              payload: payloadData,
            });
            let data = {
              DocumentAccess: PropsToSend.data.DocumentAccess,
              DocumentName: PropsToSend.data.DocumentName,
              ReportDate: PropsToSend.data.ReportDate,
              ValidFrom: PropsToSend.data.ValidFrom,
              ValidTo: PropsToSend.data.ValidTo,
              documentPath: [path],
            };
            let DataForUploading = {
              navigationFromRegister: PropsToSend.navigationFromRegister,
              registrationType: PropsToSend.registrationType,
              data: data,
            };
            return dispatch(uploadMdicalData(DataForUploading));
          } else {
            dispatch({
              type: 'DataUploadFailed',
              payload: 'Document upload failed',
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          dispatch({
            type: 'DataUploadFailed',
            payload: error.message,
          });
        });
      // console.log("UpdatePhoto_response*******" + JSON.stringify(response));
    } catch (error) {
      console.log('response UpdatePhoto' + error);
      dispatch({
        type: 'DataUploadFailed',
        payload: error.message,
      });
    }
  };
};
uploadDicomMedicalFile = dataReceived => {
  return async dispatch => {
    const UserID = await AsyncStorage.getItem('UserId');
    const UserType = await AsyncStorage.getItem('UserType');
    const DependentFK = await AsyncStorage.getItem('DependentFK');

    console.log('medical details upload called');

    let dataToSend = {
      UserID: UserID,
      UserType: UserType,
      DependentFK: DependentFK,
      DocumentName: dataReceived.DocumentName,
      ReportDate: dataReceived.ReportDate,
      DocumentAccess: dataReceived.DocumentAccess,
      ValidFrom: dataReceived.ValidFrom,
      ValidTo: dataReceived.ValidTo,
      documentPath: dataReceived.documentPath,
    };

    console.log(dataToSend);

    try {
      dispatch({
        type: 'ShowLoader',
        payload: true,
      });
      const response = await Server.post(
        'DocumentUpload/save_documents',
        dataToSend,
      );
      console.log(response.data);
      if (response.data.status === 1) {
        dispatch({
          type: 'DetailsUploadSuccess',
          payload: response.data,
        });

        if (navigationFromRegister == true) {
          navigate('Dashboard');
        } else {
          if (registrationType == 'request') {
            navigate('IndividualDocument');
          } else {
            navigate('MedicalDocumentsList', {
              navigationFromDependentList: true,
            });
          }
        }
      } else {
        dispatch({
          type: 'DetailsUploadFailed',
          payload: response.data.msg,
        });
      }
    } catch (err) {
      console.log(err);

      dispatch({
        type: 'DetailsUploadFailed',
        payload: err.message,
      });
    }
  };
  console.log('upload dicom function called');
};
export const QuestionnaireFilledStatus = status => {
  return dispatch => {
    dispatch({
      type: 'update_QnaaireStatus',
      payload: status,
    });
  };
};
export const NDIFilledStatus = status => {
  return dispatch => {
    dispatch({
      type: 'update_NDIStatus',
      payload: status,
    });
  };
};
export const GetMyConsultationDocuments = (UserId,PatientId) => {
  return async dispatch => {
    dispatch({
      type: 'clear_errorMsg',
      payload: '',
    });
    dispatch({
      type: 'ShowLoader',
      payload: null,
    });
    try {
      // const UserID = await AsyncStorage.getItem('UserId');
      const Response = await Server.get(
        `patient/get_my_consultation_documents?UserID=${UserId}&PatientID=${PatientId}`,
      );

      console.log('Response is \n\n\t', Response.data);

      if (Response.data.status == 1) {
        dispatch({
          type: 'DocumentDetails',
          payload: Response.data.medicalDocuments,
        });
        navigate("MedicalDocuments")
      } else {
        dispatch({
          type: 'add_errorMsg',
          payload: 'No documents From Doctor to Show',
        });
      }
    } catch (error) {
      dispatch({
        type: 'add_errorMsg',
        payload: error.message,
      });
    }
  };
};

export const NavigateToOTPScreen=(data)=>{
  return async dispatch=>{
     dispatch({type:'Add_SignupData',payload:data});
     navigate('OTPScreen');
  }
}

export const NavigationFrom=(isNavigationFromHome)=>{
  console.log('isNavigationFromHome',isNavigationFromHome);
  return async dispatch=>{
     dispatch({type:'isHome',payload:isNavigationFromHome});
     
  }
}

export const UploadPtientDocuments=(patientId,UserId,DocumentName,DocumentPath)=>{
  console.log(DocumentPath);
  return async dispatch=>{
    try {
      let dataToSend = {
        PatientID:patientId,
        UserID:UserId,
        DocumentName:DocumentName,
        DocumentPath:DocumentPath
      };
      const Response = await Server.post(
        'Patient/add_patient_doduments',
        dataToSend,
      );
      console.log('Patient/add_patient_doduments\n\n\t', Response.data);

      if (Response.data.status == 1) {
        Toast.show('Documents successfully')
      } else {
        // dispatch({
        //   type: 'add_errorMsg',
        //   payload: 'No documents From Doctor to Show',
        // });
      }
    } catch (error) {
      dispatch({
        type: 'add_errorMsg',
        payload: error.message,
      });
      console.log("Document selection error",error.message);
    }
  }
}

export const DocumentCount=(docCount,selectedDocCount)=>{
  console.log('AdocCount',docCount);
  console.log("AselectedDocCount",selectedDocCount);
  return async dispatch=>{
    const add=docCount+selectedDocCount;
    console.log("countDocumentCount",add);
     dispatch({type:'documentCount',payload:add});
     
  }
}

export const GetFreeConsultationCount = (UserID,ConsultationType) => {
  return async dispatch => {
    dispatch({
      type: 'clear_errorMsg',
      payload: '',
    });
    dispatch({
      type: 'ShowLoader',
      payload: null,
    });
    try {
      // const UserID = await AsyncStorage.getItem('UserId');
      const Response = await Server.get(
        `Patient/get_free_consultation_count?UserID=${UserID}&CommunicationTypeID=${ConsultationType}`,
      );

      console.log('get_free_consultation_count is \n\n\t', Response.data);

      if (Response.data.status == 1) {
        dispatch({
          type: 'freeConsultationCount',
          payload: Response.data.freeConsultationCount,
        });
        // navigate('PrePayment');
      } else {
        dispatch({
          type: 'add_errorMsg',
          payload: 'No documents From Doctor to Show',
        });
      }
    } catch (error) {
      dispatch({
        type: 'add_errorMsg',
        payload: error.message,
      });
    }
  };
};

export const UpdateFreeConsultationCount = (UserID,DoctorAvailabilityDetailID) => {
  return async dispatch => {
    dispatch({
      type: 'clear_errorMsg',
      payload: '',
    });
    dispatch({
      type: 'ShowLoader',
      payload: null,
    });
    try {
      let dataToSend = {
        UserID:UserID,
        DoctorAvailabilityDetailID:DoctorAvailabilityDetailID
      };
      const Response = await Server.post(
        'Patient/update_consultation_count',
        dataToSend,
      );

      console.log('Updateconsultation_count is \n\n\t', Response.data);

      if (Response.data.status == 1) {
        Toast.show(Response.data.message)
        navigate('ConsultationHistory');
        
      } else {
        Toast.show(Response.data.message);
        console.log("else");
      }
    } catch (error) {
      dispatch({
        type: 'add_errorMsg',
        payload: error.message,
      });
    }
  };
};

export const GetConsultationCompletedList = () => {
  return async dispatch => {
    dispatch({
      type: 'clear_errorMsg',
      payload: '',
    });
    dispatch({
      type: 'ShowLoader',
      payload: null,
    });
    try {
      const UserID = await AsyncStorage.getItem('UserId');
      const Response = await Server.get(
        `Patient/get_consultation_completed_list?UserID=${UserID}`,
      );

      console.log('get_consultation_completed_list is \n\n\t', Response.data.list);

      if (Response.data.status == 1) {
        dispatch({
          type: 'Completedlist',
          payload: Response.data.list,
        });
      } else {
        dispatch({
          type: 'add_errorMsg',
          payload: 'No documents From Doctor to Show',
        });
      }
    } catch (error) {
      dispatch({
        type: 'add_errorMsg',
        payload: error.message,
      });
    }
  };
};

export const PaymentHistory = () => {
  return async dispatch => {
    dispatch({
      type: 'clear_errorMsg',
      payload: '',
    });
    dispatch({
      type: 'ShowLoader',
      payload: null,
    });
    try {
      const UserID = await AsyncStorage.getItem('UserId');
      const Response = await Server.get(
        `Booking/get_payment_history?UserID=${UserID}`,
      );

      console.log('get_payment_history is \n\n\t', Response.data);

      if (Response.data.status == 1) {
        dispatch({
          type: 'paymentHistory',
          payload: Response.data.paymentHistoryList,
        });
      } else {
        dispatch({
          type: 'add_errorMsg',
          payload: 'No documents From Doctor to Show',
        });
      }
    } catch (error) {
      dispatch({
        type: 'add_errorMsg',
        payload: error.message,
      });
    }
  };
};

