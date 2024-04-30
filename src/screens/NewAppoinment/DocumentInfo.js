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
  FlatList
} from 'react-native';
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
    selectedDate: 'select date',
    isTapable: true,
    description: '',
    selectedDocx: [],
  };

  showAlert = (title, message) => {
    this.refs.toast.show(message);
  };
  BookAppoinment = async () => {
    if (this.state.contactType == 'none') {
      this.showAlert('warning', 'please select the contact type');
    }
    // else if (this.state.description == '') {
    //   this.showAlert('warning', 'please add description');
    // } 
    else if (this.state.selectedDate == 'select date') {
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
      };
      await this.props.ClearMessage();
      await this.props.BookAppoinment(dataToAdd);
      this.props.ClearSelectedDocuments();
      this.props.QuestionnaireFilledStatus(false);
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
    console.log("Document Details:", this.props.navigation.state.params.item.documentPath);
    // let array =this.props.navigation.state.params.item.documentPath;
    // for (let index = 0; index < array.length; index++) {
    //   const element = array[index.documentType];
    //   console.log(element);
    // }
  };
  _renderItem = (item) => {
    <Text>jjjh</Text>
  }
  render() {
    console.log(this.props.State.isFilledQuestionnaire, "isFilledQuestionnaire/BookConsultation")
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
              text="Upload Document Info"
              ShouldDisplayLeftIcon={true}
              leftIconImage="chevron-left"
              onPressLeftIcon={async () => {
                await this.props.ClearSelectedDocuments();
                this.props.navigation.goBack();
              }}
              HeaderColour="#643A25"
            />
          </View>
          <View style={{ flex: 0.8, paddingHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <Text allowFontScaling={false}
                style={{ fontFamily: Default.FontSemiBold, fontSize: 16 }}>Document Name</Text>
              <Text allowFontScaling={false}
                style={{ fontFamily: Default.FontMedium, fontSize: 14 }}>{this.props.navigation.state.params.item.documentDetails.documentName}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
              <Text allowFontScaling={false}
                style={{ fontFamily: Default.FontSemiBold, fontSize: 16 }}>Report Upload Date</Text>
              <Text allowFontScaling={false}
                style={{ fontFamily: Default.FontMedium, fontSize: 14 }}>{this.props.navigation.state.params.item.documentDetails.reportDate}</Text>
            </View>
            <View style={{ marginVertical: 20 }}>
              <FlatList
                data={this.props.navigation.state.params.item.documentPath}
                renderItem={({ item }) => (
                  <>
                    {
                      item.documentType == ".dcm" ?
                        <Text allowFontScaling={false}
                          style={{ marginTop: 40, textAlign: 'center', fontSize: 14, fontFamily: Default.FontMedium }}>Unable to load DICOM file</Text> :
                        <View style={{ marginTop: 10 }}>
                          <Image
                            style={{ width: '100%', height: 450, backgroundColor: 'lightgray' }}
                            source={{ uri: item.uri }}
                          />
                        </View>
                    }
                  </>
                )}
              />
            </View>
            {/* {
              this.props.navigation.state.params.item.documentPath[0].documentType==".dcm"&&this.props.navigation.state.params.item.documentPath[0].documentType==".dcm"?
              <Text allowFontScaling={false}
              style={{marginTop:40,textAlign:'center',fontSize:14,fontFamily:Default.FontMedium}}>Unable to load DICOM file</Text>:
              <Image
             style={{width:'100%',height:'70%',marginTop:40,backgroundColor:'lightgray'}}
             source={{uri:this.props.navigation.state.params.item.documentPath[0].uri}}
            />
            } */}
          </View>
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
