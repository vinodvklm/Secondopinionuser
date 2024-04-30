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

} from 'react-native';
const { width, height } = Dimensions.get('window');
import { DotIndicator } from 'react-native-indicators';
import { ListItem } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import { DynamicHeader } from '../../components/DynamicHeader';
import { CustomButton } from '../../components/CustomButton';
import datePicker from 'react-native-datepicker';
import DatePicker from 'react-native-datepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import TouchableScale from 'react-native-touchable-scale';
import Calender from '../../components/Calender';
import { Overlay, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
const ContactTypeArr = [
  { id: '1', title: 'Email', icon: 'email' },
  { id: '2', title: 'Direct Call', icon: 'call' },
  { id: '3', title: 'Direct meet', icon: 'local-hospital' },
  { id: '4', title: 'Chat', icon: 'chat' },
];
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast, { DURATION } from 'react-native-easy-toast';
import { Default } from '../../components/Default';
import { Image } from 'react-native';
class BookConsultationScreen extends React.Component {
  state = {
    contactType: 'none',
    contactTypeID: '',
    date: '',
    currentDate: '',
    maxDate: '',
    overlay: false,
    selectedDate: 'Select Date',
    isTapable: true,
    description: '',
    selectedDocx: [],
    CurrencySymbol:''
  };

 componentWillUnmount(){

  this.props.ClearLoader()
   this.props.clear_timeslot()
   
    
  }

  showAlert = (title, message) => {
    this.refs.toast.show(message);
  };
  BookAppoinment = async () => {


    console.log('selected date ', this.state.selectedDate)

    if (this.state.contactType == 'none') {
      this.showAlert('warning', 'please select the contact type');
    }
    // else if (this.state.description == '') {
    //   this.showAlert('warning', 'please add description');
    // } 
    else if (this.state.selectedDate == 'Select Date') {
      this.showAlert('warning', 'please select the date');
    }
    // else if (this.props.State.isFilledQuestionnaire == false) {
    //   this.showAlert('warning', 'please fill the questionnaire');
    // }
    // else if (this.props.State.isFilledNDI == false) {
    //   this.showAlert('warning', 'please fill the NDI');
    // }
    else {
      var dataToAdd = {
        contactType: this.state.contactType,
        contactTypeID: this.state.contactTypeID,
        description: this.state.description,
        selectedDate: this.state.selectedDate,
        CurrencySymbol:this.state.CurrencySymbol
      };
      await this.props.ClearMessage();
      console.log("data to send",dataToAdd);
      await this.props.BookAppoinment(dataToAdd);
      
      if (this.props.State.selectedDependentRelation=="MySelf") {
        console.log("selectedDependentId",this.props.State.selectedDependentId);
        await this.props.GetFreeConsultationCount(this.props.State.selectedDependentId,this.state.contactTypeID);
        this.props.navigation.navigate("PrePayment");
      }else{
        console.log("consultation for dependent");
        this.props.navigation.navigate("PrePayment");
      }
      this.props.ClearSelectedDocuments();
      this.props.QuestionnaireFilledStatus(false);
      console.log(this.props.State.selectedDependentRelation);
    }

    // var dataToAdd = {
    //   contactType: this.state.contactType,
    //   contactTypeID: this.state.contactTypeID,
    //   description: this.state.description,
    //   // selectedDate: this.state.selectedDate,
    //   selectedDate:'04-07-2021'
    // };
    // await this.props.ClearMessage();
    // await this.props.BookAppoinment(dataToAdd);
    // this.props.ClearSelectedDocuments();
    // this.props.QuestionnaireFilledStatus(false);
  };
  componentDidMount = async () => {

    setTimeout(
      function() {
          this.props.ClearLoader()
      }
      .bind(this),
      1000
    );

    await  this.props.ClearLoader()
    await this.props.clear_timeslot()
    await this.props.GetModeOfCommunication();
    this.setState({
      contactType: this.props.State.modesOfCommunication[0].communicationType,
      contactTypeID: this.props.State.modesOfCommunication[0]
        .communicationTypeID,
      selectedDocx: this.props.State.selectedDocuments,
      // CurrencySymbol:this.props.State.modesOfCommunication[0].symbol

    });
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var nextYear = new Date().getFullYear() + 1;
    that.setState({
      //Setting the value of the date time
      currentDate:
        // date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
        year + '-' + month + '-' + date,
      maxDate: nextYear + '-' + month + '-' + date,
    });
  };

  render() {
    console.log(this.props.State.modesOfCommunication[0], "isFilledQuestionnaire/BookConsultation")
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#643A25"
          translucent={false}
        />
        <SafeAreaView style={{ flex: 0, backgroundColor: '#643A25' }} />
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 0.1 }}>
            <DynamicHeader
              text="Book Consultation"
              ShouldDisplayLeftIcon={true}
              leftIconImage="chevron-left"
              onPressLeftIcon={async () => {
                await this.props.ClearSelectedDocuments();
                this.props.navigation.navigate('NewAppoinment');
              }}
              HeaderColour="#643A25"
            />
          </View>
          <View style={{ flex: 0.8 }}>
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  marginTop: 10,
                  marginBottom: 10
                }}>
                 <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    marginHorizontal: 25,
                    fontFamily: Default.FontSemiBold
                  }}>
                  Choose Consultation Type
                </Text>
                <FlatList
                  data={this.props.State.modesOfCommunication}
                  keyExtractor={item => item.communicationTypeID}
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={false}
                  renderItem={({ item, index }) => {
                    return (
                      //       <TouchableOpacity
                      //         onPress={() =>
                      //           this.setState({
                      //             contactTypeID: item.communicationTypeID,
                      //             contactType: item.communicationType,
                      //           })
                      //         }
                      //         style={{
                      //           height: 30,
                      //           backgroundColor:
                      //             item.communicationTypeID == this.state.contactTypeID
                      //               ? '#3ae374'
                      //               : 'white',
                      //           marginHorizontal: 5,
                      //           marginVertical: 10,
                      //           alignItems: 'center',
                      //           justifyContent: 'center',
                      //           borderRadius: 5,
                      //           borderWidth:
                      //             item.communicationTypeID == this.state.contactTypeID
                      //               ? null
                      //               : 0.5,
                      //           borderColor:
                      //             item.communicationTypeID == this.state.contactTypeID
                      //               ? null
                      //               : '#d1d8e0',
                      //         }}>
                      //         <Text
                      //           allowFontScaling={false}
                      //           style={{ marginHorizontal: 10, fontFamily: Default.FontMedium }}>
                      //           {item.communicationType}
                      //         </Text>
                      //         {/* <Text style={{marginHorizontal: 10}}>
                      //           {item.communicationType}
                      //         </Text> */}
                      //  </TouchableOpacity>
                      <TouchableOpacity 
                      onPress={() =>{

                        this.setState({
                          contactTypeID: item.communicationTypeID,
                          contactType: item.communicationType,
                          CurrencySymbol:item.symbol,
                          selectedDate:'Select Date'

                        })
                        this.props.clear_timeslot()
                      }
                                  
                                }
                      style={{ width: '100%', marginTop: 20, flex: 1, flexDirection: 'row',paddingHorizontal:25,paddingVertical:10,
                      backgroundColor:
                                  item.communicationTypeID == this.state.contactTypeID
                                    ? 'lightgray'
                                    : null }}>
                        <View style={{ flex: .17 }}>
                          <View style={{ width: 35, height: 35, borderRadius: 35, borderWidth: 1, borderColor: '#36BC5A', alignItems: 'center', justifyContent: 'center' }}>

                            {
                              item.communicationType == 'Voice Call' ?
                                <FontAwesome name={"phone"} size={20} color={"#36BC5A"} /> :
                                item.communicationType == 'Video Call' ?
                                  <FontAwesome name={"video-camera"} size={20} color={"#36BC5A"} /> :
                                  <View style={{ width: 20, height: 20, borderRadius: 20, backgroundColor: '#36BC5A' }}></View>
                            }
                          </View>
                        </View>
                        <View style={{ flex: .83 }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text
                              allowFontScaling={false}
                              style={{ fontFamily: Default.FontSemiBold, fontSize: 15 }}>{item.communicationType} -</Text>
                            <Text
                              allowFontScaling={false}
                              style={{ fontFamily: Default.FontSemiBold, fontSize: 15, marginLeft: 4, color: '#36BC5A' }}>{item.symbol}{" "}{item.amount}</Text>
                          </View>
                          <Text style={{fontFamily:Default.FontMedium,fontSize:14,marginTop:8}}>Duration - {item.duration} Minitues</Text>
                          {
                            item.communicationType == 'Voice Call' ?
                              <Text
                                allowFontScaling={false}
                                style={{ fontSize: 14, fontFamily: Default.FontMedium, marginTop: 8 }}>You can make an appointment with your doctor anytime and anywhere.</Text> :
                              item.communicationType == 'Video Call' ?
                                <Text
                                  allowFontScaling={false}
                                  style={{ fontSize: 14, fontFamily: Default.FontMedium, marginTop: 8 }}>Get full consultation with your doctor using new technology.</Text> : null
                          }

                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <View style={{ flex: 1, 
                    marginLeft: 25,
                    marginTop: 20,}}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    fontFamily: Default.FontSemiBold
                  }}>
                  Choose Consultation Date
                </Text>
                <View
                  style={{
                    alignSelf: 'flex-start',
                    marginVertical: 20,
                    marginLeft: 5,
                  }}>
                  {/* <DatePicker
                    useNAtiveDriver={true}
                    style={{width: 200}}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    minDate={this.state.currentDate} //
                    maxDate={this.state.maxDate} //"
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
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={date => {
                      this.setState({date: date});
                    }}
                  /> */}
                  <TouchableScale
                    onPress={async () => {
                      console.log("Contact type id: ", this.state.contactTypeID);
                      await this.props.GetAvailableDates(
                        this.state.contactTypeID,
                      );
                      //////

                      await this.props.AddContactType({
                        type: this.state.contactType,
                        id: this.state.contactTypeID,
                      });
                      this.setState({ overlay: true });
                    }}>
                    <View>
                      <View
                        style={{
                          height: 40,
                          width: 130,
                          borderWidth: 0.5,
                          borderColor: 'gray',
                          alignItems: 'center',
                          borderRadius:5,flexDirection:'row',
                          justifyContent:'space-between',
                          paddingHorizontal:10
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={{ color: 'gray' }}>
                          {this.state.selectedDate}
                        </Text>
                        <FontAwesome name={"calendar-o"} size={20} color={"#36BC5A"} />
                      </View>
                    </View>
                  </TouchableScale>
                </View>
              </View>

              {this.props.State.selectedTimeFrom == '' || this.props.State.selectedTimeFrom == undefined ? null : 
              <View style={{ flex: 1, 
                    marginLeft: 25,
                    marginTop: 20,}}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    fontFamily: Default.FontSemiBold
                  }}>
                  Selected Consultation Time Slot
                </Text>

                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    fontFamily: Default.Fontregular,
                    marginTop:15
                  }}>
                  {this.props.State.selectedTimeFrom} to  {this.props.State.selectedTimeTo}
                </Text>

                </View>
                }
              {/* <View style={{width:'100%',height:50,backgroundColor:'pink',marginHorizontal:20,alignSelf:'center'}}>
<Image style={{width:50,height:50,borderRadius:10,backgroundColor:'red'}}/>
              </View> */}
              {/* <View style={{ flex: 1, height: 100 }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: this.props.State.isFilledNDI == true ? '#bfbfbf' : 'white',
                    //alignItems: 'center',
                    //justifyContent: 'center',
                    margin: 20,
                    // height: 45,
                    flexDirection: 'row',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                  }}
                  onPress={async () => {
                    let userID = this.props.State.selectedDependentId//await AsyncStorage.getItem('UserId');
                    this.props.navigation.navigate('Questionnaire', { Heading: "Neck Diablity Index (NDI)", URL: `https://secondopinionweb.azurewebsites.net/questionnaire/${userID}/2` })
                  }
                  }>
                  <View
                    style={{
                      flex: 0.6,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{ fontSize: 15, fontFamily: Default.FontMedium, color: 'gray' }}>
                      Neck Disablity Index (NDI)
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.4,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <MaterialCommunityIcons
                      // name="checkbox-blank-circle-outline"
                      name={
                        this.props.State.isFilledNDI == true
                          ? 'check-circle'
                          : 'checkbox-blank-circle-outline'
                      }
                      color={
                        this.props.State.isFilledQuestionnaire == true
                          ? '#55efc4'
                          : 'gray'
                      }
                      size={20}
                    />
                  </View>
                </TouchableOpacity>
              </View> */}
              {/* <View style={{ flex: 1, height: 100 }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: this.props.State.isFilledQuestionnaire == true ? '#bfbfbf' : 'white',
                    //alignItems: 'center',
                    //justifyContent: 'center',
                    margin: 20,
                    // height: 45,
                    flexDirection: 'row',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                  }}
                  onPress={async () => {
                    // let userID = await AsyncStorage.getItem('UserId');
                    console.log('qtn pressed')
                    let userID = this.props.State.selectedDependentId
                    this.props.navigation.navigate('Questionnaire', { Heading: "Fill Questionnaire", URL: `https://secondopinionweb.azurewebsites.net/questionnaire/${userID}/1` })
                  }
                  }>
                  <View
                    style={{
                      flex: 0.6,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      allowFontScaling={false}
                      style={{ fontSize: 15, fontFamily: Default.FontMedium, color: 'gray' }}>
                      Fill Questionnaire
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.4,
                      alignItems: 'center',
                      justifyContent: 'center',

                    }}>
                    <MaterialCommunityIcons
                      // name="checkbox-blank-circle-outline"
                      name={
                        this.props.State.isFilledQuestionnaire == true
                          ? 'check-circle'
                          : 'checkbox-blank-circle-outline'
                      }
                      color={
                        this.props.State.isFilledQuestionnaire == true
                          ? '#55efc4'
                          : 'gray'
                      }
                      size={20}
                    />
                  </View>
                </TouchableOpacity>
              </View> */}
            </ScrollView>
          </View>
          <View style={{ flex: 0.1 }}>
            {/* <TouchableOpacity */}
            <TouchableScale
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.94} //
              style={{
                height:60,
               
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#36BC5A',
                //height: 80,
              }}
              onPress={() => {
                this.BookAppoinment();
              }}>
              <Text
                allowFontScaling={false}
                style={{ color: 'white', fontSize: 20, fontFamily: Default.FontSemiBold }}>
                Book Appoinment
              </Text>
            </TouchableScale>
            {/* </TouchableOpacity> */}
          </View>
          <Toast
            ref="toast"
            position="center"
            fadeOutDuration={1000}
            opacity={0.7}
          />

          <Overlay isVisible={this.state.overlay}>
            <View style={styles.overlay}>
              <View style={{ flexDirection: 'row', marginBottom: 25 }}>
                <View style={{ flex: 0.2, alignItems: 'flex-start' }}>
                  <TouchableScale
                    style={{ alignSelf: 'flex-start' }}
                    onPress={async () => {
                      await this.props.cancelSelectedTimedate(),
                        this.setState({
                          overlay: false,
                          selectedDate: 'Select Date',
                        });
                    }}>
                    <MaterialCommunityIcons
                      name="close-circle-outline"
                      color="#eb4d4b"
                      size={25}
                    />
                  </TouchableScale>
                </View>
                <View style={{ flex: 0.6, alignItems: 'center' }}>
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: 18, fontFamily: Default.FontBold }}>
                    Choose date
                  </Text>
                </View>
                <View style={{ flex: 0.2 }}>
                  {this.props.State.selectedDate != '' &&
                    this.props.State.selectedTimeSlotID != '' ? (
                      <TouchableScale
                        style={{ alignSelf: 'flex-end' }}
                        onPress={async () =>
                          this.setState({
                            overlay: false,
                            selectedDate: this.props.State.selectedDate,
                          })
                        }>
                        <Text
                          allowFontScaling={false}
                          style={{ color: '#36BC5A', fontWeight: '800' }}>
                          OK
                      </Text>
                      </TouchableScale>
                    ) : null}
                </View>
              </View>
              <Calender
                onDateChange={date => this.setState({ selectedDate: date })}
              />
            </View>
          </Overlay>
          <Overlay
            isVisible={!this.state.isTapable}
            overlayStyle={{ backgroundColor: 'transparent' }}>
            <View
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                backgroundColor: 'transparent',
              }}
            />
          </Overlay>
          {this.props.State.showLoader == true ? (
             <DotIndicator
             style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}
             size={6}
             color={'#36BC5A'}></DotIndicator>
          ) : null}
        </SafeAreaView>
      </>
    );
  }
}
const styles = {
  container: {
    flex: 1,
  },
  overlay: {
    height: Dimensions.get('window').height / 2 + 20,
    width: Dimensions.get('window').width - 40,
    alignItems: 'center',
  },
};
//export default BookConsultationScreen;
const mapStateToProps = state => {
  //console.log(state);
  return { State: state.Appoinment };
};
export default connect(
  mapStateToProps,
  actions,
)(BookConsultationScreen);
