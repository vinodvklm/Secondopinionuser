import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  TouchableHighlight,
  TouchableNativeFeedback,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import { DynamicHeader } from '../../components/DynamicHeader';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Overlay, Button } from 'react-native-elements';
import { Default } from '../../components/Default';
// import RNPaypal from 'react-native-paypal-lib';
class PrePaymentScreen extends React.Component {
  componentDidMount = async () => {
    await this.props.GetModeOfCommunication();
  }
  showAlert = (title, message) => {
    // Alert.alert(
    //   title,
    //   message,
    //   [{text: 'OK', onPress: () => {
    //     // this.props.navigation.navigate('ConsultationHistoryScreen');
    //   console.log('OK Pressed/PrePaymentScreen');
    //   }}],
    //   {cancelable: false},
    // );
  };
  GetAmount = () => {
    var Amount = 0
    let modes = this.props.State.modesOfCommunication;
    let SelectedType = this.props.State.contactType;
    for (let index = 0; index < modes.length; index++) {
      const element = modes[index];
      if (element.communicationType == SelectedType) {

        Amount = element.amount
      }

    }
    console.log("Amount", Amount);
    return Amount;
  }

  BookConsultation = async data => {
    console.log("details", data);
    console.log('patientStatus', this.props.State.patientDependencyStatus);
    console.log('patientID', this.props.State.patientID);
    console.log('remarks', this.props.State.description);
    console.log('timeslotID', this.props.State.selectedTimeSlotID);
    var dataToSend = {
      PatientType: this.props.State.patientDependencyStatus,
      ReferenceID: this.props.State.selectedDependentId,
      DoctorAvailabilityDetailID: this.props.State.selectedTimeSlotID,
      Remarks: this.props.State.description,

      PaymentID: data.id,
      PaymentState: data.status,
      PaymentCreate_time: data.create_time,
      PaymentResponse_type: 'payment',
      PaymentAmount: this.GetAmount(),
      CurrencySymbol:this.props.State.CurrencySymbol
    };
    console.log(dataToSend);
    await this.props.BookConsultation(dataToSend);
  };

  render() {
    const { freeConsultationCount } = this.props.State;
    var freeCount = 0
    if (freeConsultationCount != undefined) {
      freeCount = freeConsultationCount
      console.log(freeCount);
    }
    console.log("freeConsultationCount prepayment screen", freeConsultationCount);
    this.props.State.Message != ''
      ? this.showAlert('Alert', this.props.State.Message)
      : null;
    console.log("modes", this.props.State.modesOfCommunication);
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#643A25"
          translucent={false}
        />
        <SafeAreaView style={{ flex: 0, backgroundColor: '#643A25' }} />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 0.1 }}>
            {
             freeCount !== 3 &&this.props.State.patientDependencyStatus!=="D" && freeCount !== 0?
                <DynamicHeader
                  text="Consultation Details"
                  ShouldDisplayLeftIcon={true}
                  leftIconImage="chevron-left"
                  onPressLeftIcon={() => {
                    this.props.navigation.goBack();
                  }}
                  HeaderColour="#643A25"
                /> :
                <DynamicHeader
                  text="Payment"
                  ShouldDisplayLeftIcon={true}
                  leftIconImage="chevron-left"
                  onPressLeftIcon={() => {
                    this.props.navigation.goBack();
                  }}
                  HeaderColour="#643A25"
                />
            }


          </View>
          <View style={{ flex: 0.07 }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 16,
                fontFamily: Default.FontSemiBold,
                marginVertical: 15,
                marginLeft: 25,
              }}>
              You have requested an appointment with :
            </Text>
          </View>
          <View style={{
            flex: 0.83,
            marginHorizontal: 25,
          }}>
            <View style={{ width: '100%', alignSelf: 'center', flexDirection: 'row', marginBottom: 15, marginTop: 5 }}>
              <View style={{ marginTop: 10, flex: .3, justifyContent: 'center' }}>
                <Image
                  source={require('../../../assets/photo.jpg')}
                  style={{ backgroundColor: 'lightgray', width: 70, height: 70, borderRadius: 50 }} />
              </View>
              <View style={{ marginTop: 10, flex: .7, justifyContent: 'center' }}>
                <Text allowFontScaling={false} style={{ fontSize: 16, fontFamily: Default.FontSemiBold }}>Dr. Amit Bhandarkar</Text>
                <Text allowFontScaling={false} style={{ fontSize: 16, fontFamily: Default.FontMedium, marginTop: 5 }}>Orthopedic Spine Surgeon</Text>
                <Text allowFontScaling={false} style={{ fontSize: 14, fontFamily: Default.FontMedium, marginTop: 5 }}>M.B.B.S, M.S, M.D</Text>
              </View>
            </View>
            {/* <LinearGradient
              colors={['#643A25', '#643A25', '#643A25']}
              style={{height: 250}}>
              <DynamicHeader
                text="Payment"
                ShouldDisplayLeftIcon={true}
                leftIconImage="chevron-left"
                onPressLeftIcon={() => {
                  //console.log('tapped');
                  this.props.navigation.navigate('BookConsultation');
                }}
              />
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
               <Image
                style={{ width: 169, height: 140 }}
                source={require('../../../assets/logo.png')} />
              </View>
            </LinearGradient> */}
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 16,
                //color: 'gray',
                alignSelf: 'flex-start',
                marginTop: 20,
                fontFamily: Default.FontSemiBold
              }}>
              Basic Payment details
            </Text>
            {/* <View
              style={{
                height: 35,
                marginHorizontal: 40,
                marginVertical: 5,
                flexDirection: 'row',
                marginTop: 30,
                borderBottomWidth: 0.25,
                borderBottomColor: '#ced6e0', //'#95afc0',
              }}>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Text allowFontScaling={false} style={{color: '#535c68'}}>
                  Booking ID
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <Text allowFontScaling={false} style={{color: '#535c68'}}>
                  1245689878
                </Text>
              </View>
            </View> */}

            <View
              style={{
                marginTop: 30,
                height: 35,
                marginVertical: 5,
                flexDirection: 'row',
                borderBottomWidth: 0.25,
                borderBottomColor: '#ced6e0'
              }}>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text allowFontScaling={false} style={{ color: '#535c68', fontFamily: Default.FontMedium, fontSize: 14 }}>
                  Name
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text allowFontScaling={false} style={{ color: '#535c68', fontFamily: Default.FontMedium, fontSize: 14 }}>
                  {this.props.State.selectedDependent}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 35,
                marginVertical: 5,
                flexDirection: 'row',
                borderBottomWidth: 0.25,
                borderBottomColor: '#ced6e0',
              }}>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text allowFontScaling={false} style={{ color: '#535c68', fontFamily: Default.FontMedium, fontSize: 14 }}>
                  Date
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text allowFontScaling={false} style={{ color: '#535c68', fontFamily: Default.FontMedium, fontSize: 14 }}>
                  {this.props.State.selectedDate}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 35,
                marginVertical: 5,
                flexDirection: 'row',
                borderBottomWidth: 0.25,
                borderBottomColor: '#ced6e0',
              }}>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text allowFontScaling={false} style={{ color: '#535c68', fontFamily: Default.FontMedium, fontSize: 14 }}>
                  Time
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text allowFontScaling={false} style={{ color: '#535c68', fontFamily: Default.FontMedium, fontSize: 14 }}>
                  {this.props.State.selectedTimeFrom} - {this.props.State.selectedTimeTo}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 35,
                marginVertical: 5,
                flexDirection: 'row',
                borderBottomWidth: 0.25,
                borderBottomColor: '#ced6e0',
              }}>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text allowFontScaling={false} style={{ color: '#535c68', fontFamily: Default.FontMedium, fontSize: 14 }}>
                  Consultation Type
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text allowFontScaling={false} style={{ color: '#535c68', fontFamily: Default.FontMedium, fontSize: 14 }}>
                  {this.props.State.contactType}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 35,
                marginVertical: 5,
                flexDirection: 'row',
                borderBottomWidth: 0.25,
                borderBottomColor: '#ced6e0',
              }}>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text allowFontScaling={false} style={{ color: '#535c68', fontFamily: Default.FontMedium, fontSize: 14 }}>
                  Consultation Amount
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Text
                  allowFontScaling={false}
                  style={{ color: '#535c68', fontFamily: Default.FontMedium, fontSize: 14 }}>
                  $ {this.GetAmount()}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 0.1 }}>
            {
               freeCount !==3&& this.props.State.patientDependencyStatus!=="D"&& freeCount !== 0?
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#36BC5A',
                    //height: 80,
                  }}
                  onPress={() =>{ this.props.UpdateFreeConsultationCount(this.props.State.selectedDependentId, this.props.State.selectedTimeSlotID)}}
                >
                  <Text allowFontScaling={false} style={{ color: 'white', fontSize: 18, fontFamily: Default.FontSemiBold }}>
                    Book Appointment
              </Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                  style={{
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#36BC5A',
                    //height: 80,
                  }}
                  onPress={() => {
                    this.props.navigation.navigate('PaymentWebview', {
                      amount: this.GetAmount(), component: {

                        passProps: {

                          BookAprovedPayment: this.BookConsultation
                        }
                      }
                    })
                    // RNPaypal.paymentRequest({
                    //   clientId:
                    //     'AWnuagGj31UCpRvgklv3zLqopfbw2x5elH6IO3EQv9KMJyd3DD9ltv--EuXxTWH1siXfH76EwgdmhjF0',//LIVE:-  'AWojKE0gpx5Z0RxtqTI8a96rNhzoX5CbH1908XmTMhJpQneWF-808mxC9lKqgtupXkcIN_BvCSYWMsJ9',
                    //   environment: RNPaypal.ENVIRONMENT.NO_NETWORK, //SANDBOX //PRODUCTION //NO_NETWORK
                    //   intent: RNPaypal.INTENT.SALE,
                    //   price: 60,
                    //   currency: 'USD',
                    //   description: `Android testing`,
                    //   acceptCreditCards: true,
                    // })
                    //   .then(response => {
                    //     console.log(response);

                    //     var status = response.response.state;
                    //     if (status == 'approved') {
                    //       this.BookConsultation(response.response);
                    //     } else {
                    //       this.showAlert('Message', status);
                    //     }
                    //   })
                    //   .catch(err => {
                    //     console.log(err.message);
                    //     console.log('error message');
                    //     console.log('error message');

                    //     this.showAlert('Message', err.message);
                    //   });
                  }}>
                  <Text allowFontScaling={false} style={{ color: 'white', fontSize: 18, fontFamily: Default.FontSemiBold }}>
                    Proceed and Pay
              </Text>
                </TouchableOpacity>
            }

          </View>
          <Overlay isVisible={this.props.State.Message == '' ? false : true}
          overlayStyle={{borderRadius:10}}>
            <View style={styles.overlay}>
              <Text
                allowFontScaling={false}
                style={{ fontSize: 18, fontFamily: Default.FontSemiBold }}>
                Message
              </Text>
              <Text
                allowFontScaling={false}
                style={{ fontSize: 14, marginVertical: 20, fontFamily: Default.FontMedium }}>
                {this.props.State.Message}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'gray',
                  width: Dimensions.get('window').width - 80,
                  justifyContent: 'space-between',
                  position: 'absolute',
                  bottom: 0,
                }}>
                {/* <Button
                  title="Logout"
                  type="outline"
                  containerStyle={{flex: 1}}
                  onPress={() => this.logoutAction()}
                  titleStyle={{fontSize: 15}}
                /> */}
                <Button
                  title="OK"
                  type="outline"
                  buttonStyle={{borderColor:'#36BC5A'}}
                  containerStyle={{ flex: 1 }}
                  onPress={() => {
                    this.props.ClearMessage(),
                      // this.props.navigation.navigate('Dashboard');
                      this.props.navigation.navigate('ConsultationHistory');
                  }}
                  
                  titleStyle={{ fontSize: 15,fontFamily: Default.FontSemiBold,color:'#36BC5A'  }}
                />
              </View>
            </View>
          </Overlay>
        </SafeAreaView>
      </>
    );
  }
}
const styles = {
  overlay: {
    height: Dimensions.get('window').height / 4 - 50,
    width: Dimensions.get('window').width - 80,
    alignItems: 'center',
    borderRadius:10
  },
};
// export default PrePaymentScreen;
const mapStateToProps = state => {
  //console.log(state);
  return { State: state.Appoinment };
};
export default connect(
  mapStateToProps,
  actions,
)(PrePaymentScreen);
