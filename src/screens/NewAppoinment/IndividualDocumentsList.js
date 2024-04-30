import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Form from '../../components/Form';
import { CustomButton } from '../../components/CustomButton';
import firebase from 'react-native-firebase';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DynamicHeader } from '../../components/DynamicHeader';
import TileSelector from '../../components/TileSelector';
import DocumentList from '../../components/DocumentList';
import { NavigationEvents } from 'react-navigation';
import CardView from 'react-native-rn-cardview';
import TouchableScale from 'react-native-touchable-scale';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Overlay } from 'react-native-elements';
import { Loader } from '../../components/Loader';
import { ListItem } from 'react-native-elements';
import ImageView from 'react-native-image-viewing';
import { lessThan } from 'react-native-reanimated';
import { Default } from '../../components/Default';
class IndividualDocumentsList extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedmedicalReports: [],
      selectedIndexes: [],
      isTapable: true,
      medicalReports: [
        { documentName: 'history record one', reportDate: '1', documentDetails: { userDocumentID: 1, documentName: 'history record one', reportDate: '1', } },
        { documentName: 'history record two', reportDate: '2', documentDetails: { userDocumentID: 2, documentName: 'history record two', reportDate: '2', } },
      ],
      UserId: '', UserType: '', count: 0
    };
  }

  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress: () => console.log('OK Pressed/IndividualDocumentList') }],
      { cancelable: false },
    );
  };

  excratDocuments = (NewArr) => {
    // console.log("fuikygnk");
    // const array=NewArr;

    // console.log("earray",array);
    // for (let index = 0; index < array.length; index++) {
    //   const element = array[index];
    //   console.log("element",element);
    //   const  item=this.props.State.medicalDocumentsList;
    //   console.log("items",item);
    //   for (let index = 0; index < item.length; index++) {
    //     const element1 = item[item.documentDetails.userDocumentID];
    //     if (element == element1) {
    //       console.log(element);

    //     }else{
    //       console.log("not matching");
    //     }
    //   }

    // }

  }

  HandleReportSelection = item => {
    console.log(item.documentDetails);
    const Arr = this.state.selectedmedicalReports;
    console.log("array", Arr);
    var IsAlreadyIncluded = false;
    for (let index = 0; index < Arr.length; index++) {
      const element = Arr[index];
      if (element == item.documentDetails.userDocumentID) {
        IsAlreadyIncluded = true;
        break;
      }
    }
    if (IsAlreadyIncluded == true) {
      console.log('already included');
      let NewArr = Arr.filter(x => x != item.documentDetails.userDocumentID);
      console.log("new", NewArr);
      this.setState({ selectedmedicalReports: NewArr });
    } else {
      console.log('not included');
      let NewArr = [...Arr, item.documentDetails.userDocumentID];
      console.log("selected doc", NewArr);
      this.setState({ selectedmedicalReports: NewArr });
      // this.excratDocuments(NewArr);
    }
  };

  async componentDidMount() {
    console.log("individualDocUpdate", this.props.navigation.state.params.item);
    var Type = '';
    if (this.props.navigation.state.params.item.isSelfDependent == true) {
      Type = 'MySelf';

    } else {
      Type = 'Dependent';
    }
    await AsyncStorage.setItem('UserType', Type);
    this.setState({
      UserId: this.props.navigation.state.params.item.userID
    });
    console.log("user", Type);

  }

  UNSAFE_componentWillMount() {
    this.props.ClearErrorMsg();
    this.props.ClearAlert();
    this.props.GetMedicalListItems();
  }

  keyExtractor = (item, index) => index.toString();
  GetMedicalListItems() {
    this.props.GetMedicalListItems(false, this.props.navigation.state.params.item.userID);
    console.log('will mount called');
  }
  AddDocumentObject = (Item) => {
    console.log("path", Item.documentPath[0].userDocumentDetailID);
    let item = Item.documentPath[0]
    console.log("item", item);
    let array = this.state.selectedmedicalReports;
    if (array.length == 0) {
      this.setState({
        selectedmedicalReports: [item]
      })
    } else {
      let objectPresent = false;
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.userDocumentDetailID == item.userDocumentDetailID) {
          objectPresent = true
          break;
        }
      }
      if (objectPresent == true) {
        console.log("Removing object", item);
        let NewArr = array.filter(x => x.userDocumentDetailID != item.userDocumentDetailID);
        this.setState({
          selectedmedicalReports: NewArr
        })
        console.log("New array", NewArr);
      } else {
        console.log("adding object", item);
        let newArray = [...this.state.selectedmedicalReports, item]
        this.setState({
          selectedmedicalReports: newArray
        })
      }
    }
    console.log("Array updated", this.state.selectedmedicalReports);
  }

  isOccourObject = (Item) => {
    let objectPresent = false;
    let item = Item.documentPath[0];
    let array = this.state.selectedmedicalReports;
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (element.userDocumentDetailID == item.userDocumentDetailID) {
        objectPresent = true
        break;
      }
    }
    return objectPresent;
  }
  render() {
    console.log("medicalDocumentsList", this.props.State.medicalDocumentsList);
    var docCount = 0;
    var selectedDocCount = 0
    if (this.props.State.documentCount != undefined) {
      docCount = parseInt(this.props.State.documentCount)
      selectedDocCount = parseInt(this.state.selectedmedicalReports.length)
      console.log("docCount", this.state.selectedmedicalReports.length);
      console.log("parseInt", docCount);
    }
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#643A25"
          translucent={false}
        />
        <NavigationEvents onDidFocus={() => this.GetMedicalListItems()} />

        <SafeAreaView style={{ flex: 0, backgroundColor: '#643A25' }} />
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 0.1 }}>
            <DynamicHeader
              text="Medical Details"
              // ShouldDisplayLeftIcon={this.state.navigationFromDependentList}
              ShouldDisplayLeftIcon={true}
              leftIconImage="chevron-left"
              onPressLeftIcon={() => {
                console.log('tapped');

                // console.log(this.props.State.medicalDocumentsList);

                this.props.navigation.pop();
              }}
              ShouldDisplayRightIcon={true}
              rightIconImage="add"
              onPressRightIcon={() => {
                this.props.navigation.navigate('UploadMedicalDetails', {
                  fromRegisterPage: false,
                  registrationType: 'request',
                  userId: this.state.UserId
                });
              }}
              HeaderColour="#643A25"
            />
          </View>
{
this.props.State.medicalDocumentsList != undefined&&this.props.State.medicalDocumentsList.length!=0?
<View style={{ marginHorizontal: 20, flex: 0.8 }}>
<FlatList
  keyExtractor={this.keyExtractor}
  showsVerticalScrollIndicator={false}
  data={this.props.State.medicalDocumentsList}
  //data={this.state.medicalReports}
  renderItem={this.renderItem}
  renderItem={({ item, index }) => {
    return (
      <>
        {
          this.props.State.isHome == false ?
            // <View

            //   style={{
            //     backgroundColor: this.isOccourObject(item) == true ?
            //       '#e6e6e6'
            //       : 'white',
            //   }}
            // //  style={{
            // //    backgroundColor: this.state.selectedmedicalReports.includes(
            // //      item.documentDetails.userDocumentID,
            // //    )
            // //      ? '#e6e6e6'
            // //      : 'white',
            // //  }}
            // >
            //   <View
            //     style={{
            //       height: 80,
            //       flex: 1,
            //       flexDirection: 'row',
            //       borderBottomColor: '#a6a6a6',
            //       borderBottomWidth: 0.5,
            //     }}>
            //     <View
            //       style={{
            //         flex: 0.7,
            //         flexDirection: 'column',

            //         justifyContent: 'center',
            //       }}>
            //       <Text
            //         allowFontScaling={false}
            //         style={{
            //           marginLeft: 20,
            //           fontSize: 16,
            //           color: '#404040',
            //           fontFamily: Default.FontSemiBold
            //         }}>
            //         {item.documentDetails.documentName}
            //       </Text>
            //       <Text
            //         allowFontScaling={false}
            //         style={{
            //           marginLeft: 20,
            //           fontSize: 14,
            //           color: 'gray',
            //           fontFamily: Default.FontSemiBold
            //         }}>
            //         {item.documentDetails.reportDate}
            //       </Text>
            //     </View>
            //     <View
            //       style={{
            //         flex: 0.3,
            //         alignItems: 'center',
            //         justifyContent:"center",flexDirection:'row'
            //       }}>
            //         <TouchableScale
            //          onPress={()=>{this.props.navigation.navigate('DocumentInfo',{item}),console.log(item);}}>
            //         <Icon
            //         name="eye"
            //         size={23}
            //         color={'#cccc'
            //         }
            //         style={{marginRight:30}}
            //       />
            //         </TouchableScale>
            //       <TouchableScale
            //        onPress={() => {
            //         //console.log(item);
            //         //  this.props.storeSingleDocumentObject(item);
            //         //  this.HandleReportSelection(item);
            //         this.AddDocumentObject(item);
            //       }}>
            //       <Icon
            //         name="check-circle"
            //         size={20}
            //         color={
            //           this.isOccourObject(item) == true
            //             ? '#36BC5A'
            //             : '#cccc'
            //         }
            //       />
            //       </TouchableScale>
            //     </View>
            //   </View>
            // </View> 
            <View
              style={{
                width: '100%', alignSelf: 'center', marginVertical: 13, flexDirection: 'row', flex: 1, borderWidth: 1, borderRadius: 7
                , borderColor: '#36BC5A', paddingHorizontal: 10, paddingVertical: 10,
                backgroundColor: this.isOccourObject(item) == true ?
                  '#d0f1d9'
                  : 'white',
              }}>
              <View style={{ flex: .1, justifyContent: 'center', }}>
                <Icon name={'file-text'} size={25} color={"#36BC5A"} />
              </View>
              <View style={{ flex: .7 }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    color: '#404040',
                    fontFamily: Default.FontSemiBold
                  }}>
                  {item.documentDetails.documentName}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    color: 'gray',
                    fontFamily: Default.FontSemiBold
                  }}>
                  {item.documentDetails.reportDate}
                </Text>
              </View>
              <View style={{ flex: .2, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <TouchableScale
                  onPress={() => { this.props.navigation.navigate('DocumentInfo', { item }), console.log(item); }}>
                  <Icon
                    name="eye"
                    size={23}
                    color={'#cccc'
                    }
                  />
                </TouchableScale>
                <TouchableScale
                  onPress={() => {
                    //console.log(item);
                    //  this.props.storeSingleDocumentObject(item);
                    //  this.HandleReportSelection(item);
                    this.AddDocumentObject(item);
                  }}>
                  <Icon
                    name="check-circle"
                    size={23}
                    color={
                      this.isOccourObject(item) == true
                        ? '#36BC5A'
                        : '#cccc'
                    }
                  />
                </TouchableScale>
              </View>
            </View>
            :
            //     <TouchableOpacity
            //     onPress={()=>{this.props.navigation.navigate('DocumentInfo',{item}),console.log(item);}}
            //       // onPress={() => {
            //       //   //console.log(item);
            //       //   this.props.storeSingleDocumentObject(item);
            //       //   this.HandleReportSelection(item);
            //       // }}
            //       style={{
            //         backgroundColor: this.isOccourObject(item) == true ? '#e6e6e6'
            //           : 'white',
            //       }}
            //     >
            //       <View
            //         style={{
            //           height: 80,
            //           flex: 1,
            //           flexDirection: 'row',
            //           borderBottomColor: '#a6a6a6',
            //           borderBottomWidth: 0.5,
            //         }}>
            //         <View
            //           style={{
            //             flex: 0.8,
            //             flexDirection: 'column',

            //             justifyContent: 'center',
            //           }}>
            //           <Text
            //             allowFontScaling={false}
            //             style={{
            //               marginLeft: 20,
            //               fontSize: 16,
            //               color: '#404040',
            //               fontFamily: Default.FontSemiBold
            //             }}>
            //             {item.documentDetails.documentName}
            //           </Text>
            //           <Text
            //             allowFontScaling={false}
            //             style={{
            //               marginLeft: 20,
            //               fontSize: 14,
            //               color: 'gray',
            //               fontFamily: Default.FontSemiBold
            //             }}>
            //             {item.documentDetails.reportDate}
            //           </Text>
            //         </View>
            //         <View
            //   style={{
            //     flex: 0.2,
            //     alignItems: 'center',
            //     justifyContent: 'center'
            //   }}>
            //   <Icon
            //     name="eye"
            //     size={20}
            //     color={
            //       this.state.selectedmedicalReports.includes(
            //         item.documentDetails.userDocumentID,
            //       )
            //         ? '#00aced'
            //         : '#cccc'
            //     }
            //   />
            // </View>
            //       </View>
            //     </TouchableOpacity>
            <TouchableOpacity
              onPress={() => { this.props.navigation.navigate('DocumentInfo', { item }), console.log(item); }}
              //       // onPress={() => {
              //       //   //console.log(item);
              //       //   this.props.storeSingleDocumentObject(item);
              //       //   this.HandleReportSelection(item);
              //       // }}
              style={{ width: '100%', alignSelf: 'center', marginVertical: 13, flexDirection: 'row', flex: 1, borderWidth: 1, borderRadius: 7, borderColor: '#36BC5A', paddingHorizontal: 10, paddingVertical: 10 }}>
              <View style={{ flex: .1, justifyContent: 'center' }}>
                <Icon name={'file-text'} size={25} color={"#36BC5A"} />
              </View>
              <View style={{ flex: .8 }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    color: '#404040',
                    fontFamily: Default.FontSemiBold
                  }}>
                  {item.documentDetails.documentName}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    color: 'gray',
                    fontFamily: Default.FontSemiBold
                  }}>
                  {item.documentDetails.reportDate}
                </Text>
              </View>
              <View style={{ flex: .1, alignItems: 'flex-end', justifyContent: 'center' }}>
                <Icon
                  name="eye"
                  size={20}
                  color={
                    this.state.selectedmedicalReports.includes(
                      item.documentDetails.userDocumentID,
                    )
                      ? '#00aced'
                      : '#cccc'
                  }
                />
              </View>
            </TouchableOpacity>
        }
      </>
    );
  }}
/>
</View>:
this.props.State.errorMsg != '' ? (
  <Text 
  allowFontScaling={false}
  style={{fontSize: 18, color: 'gray', alignSelf: 'center',fontFamily:Default.FontMedium,marginTop:40}}>
    {this.props.State.errorMsg}
  </Text>
) : (
  <Text 
  allowFontScaling={false}
  style={{fontSize: 18, color: 'gray', alignSelf: 'center',fontFamily:Default.FontMedium,marginTop:40}}>
  Upload documents
  </Text>
)
}
          <View style={{ flex: 0.1 }}>
            {this.state.selectedmedicalReports.length != 0 ? (
              <TouchableScale
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.94} //
                style={{
                  marginVertical: 5,
                  backgroundColor: '#36BC5A',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={async () => {
                  //   await this.props.SelectDocumentsForConsultation(
                  //     this.state.selectedmedicalReports,
                  //   ),
                  //     this.props.navigation.pop();
                  // }}
                  await this.props.SelectDocumentsForConsultation(
                    this.state.selectedmedicalReports,
                  );
                  await this.props.UploadPtientDocuments(this.props.navigation.state.params.item.patientID,
                    this.props.navigation.state.params.item.userID,
                    this.props.navigation.state.params.item.patientID,
                    this.state.selectedmedicalReports);
                  this.props.DocumentCount(docCount, selectedDocCount);
                  this.props.navigation.pop();
                  console.log("On button click", this.state.selectedmedicalReports);
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: 20,
                    fontFamily: Default.FontSemiBold
                  }}>
                  Select
                </Text>
              </TouchableScale>
            ) : null}
          </View>
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
    marginHorizontal: 35,
    marginVertical: 10,
    height: 100,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
IndividualDocumentsList.navigationOptions = {
  headerShown: false,
};
//export default MedicalDocumentsList;
const mapStateToProps = state => {
  //console.log(state);
  return { State: state.Appoinment };
};

export default connect(
  mapStateToProps,
  actions,
)(IndividualDocumentsList);
