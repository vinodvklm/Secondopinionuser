import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  FlatList
} from 'react-native';
import TrackActionComponent from '../../components/TrackActionComponent';
import { DynamicHeader } from '../../components/DynamicHeader';
import { CustomButton } from '../../components/CustomButton';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Default } from '../../components/Default';
import { Divider } from 'react-native-elements';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TouchableScale from 'react-native-touchable-scale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationEvents } from 'react-navigation';
import Toast from 'react-native-simple-toast';
class ConsultationInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      userId:'',docNo:[]
    }}
//  componentDidMount (){
//     console.log("item", this.props.navigation.state.params.item.documentCount);
//     console.log("stateDocCount",this.props.State.documentCount);
//   console.log("doc",this.state.docNo);
//     var count =this.props.State.documentCount;
//    var array =this.state.docNo;
//    if (count) {
//     for (let index = 0; index <count ; index++) {
//       array.push(index)
//      }
//      console.log("array",array);
//      this.setState({
//        docNo:array
//      })
//    }
   
//   // this.addArray();

//   }
componentDidMount() {
  console.log("item", this.props.navigation.state.params.item);
    console.log("stateDocCount",this.props.State.documentCount);
  this._unsubscribe = this.props.navigation.addListener('didFocus', () => {
    // do something
    this.AddDocuments();
  });
}

AddDocuments(){
  console.log("doc",this.state.docNo);
      var count =this.props.State.documentCount;
     var array =[];
     if (count) {
      for (let index = 0; index <count ; index++) {
        array.push(index)
       }
       console.log("array",array);
       this.setState({
         docNo:array
       })
     }
}

// componentWillUnmount() {
//   this._unsubscribe.remove();
// }

  addArray=()=>{
    console.log("bhjj");
    let arr1=this.state.docNo;
    var arr2=this.props.State.selectedDocuments;
    if (this.props.State.selectedDocuments!=undefined&&this.props.State.selectedDocuments.length!=0) {
      for (let index = 0; index < arr2.length; index++) {
        const element = arr2[index];
        arr2.push(index)
      }
      console.log("addedarray",arr2);
    } else {
      console.log("null");
      // let produce = [...fruits, ...vegetables];
      // let arr3=[...fruits];
    }
  }
  BookAppoinment = async () => {
    // var dataToAdd = {
    //   contactType: this.state.contactType,
    //   contactTypeID: this.state.contactTypeID,
    //   description: this.state.description,
    //   // selectedDate: this.state.selectedDate,
    //   selectedDate:'04-07-2021'
    // };
    // await this.props.ClearMessage();
    // await this.props.BookAppoinment(dataToAdd);
    Toast.show('Changes updated successfully');
    setTimeout(() => {
      this.props.navigation.goBack();
    }, 2000);
    
    this.props.ClearSelectedDocuments();
    this.props.QuestionnaireFilledStatus(false);
  };

  _renderItem = ({item}) => {
    var iconName = item.type == 'image' ? 'jpgfile1' : 'pdffile1';

    return (
        <View
          style={{
            padding: 0,
            backgroundColor: '#a1d7f7',
            height: 60,
            width: 50,
            borderRadius: 7,
          }}>
          <Icon
            style={{alignSelf: 'center', marginTop: 10}}
            name={'file1'}
            size={25}
            color="white"
          />
        </View>
    );
  };
  render() {
    console.log('Document List Count',this.props.State.documentCount);
   console.log("ques",this.props.State.isFilledQuestionnaire);
    // if (this.props.State.selectedDocuments!=undefined&&this.props.State.selectedDocuments.length!=0) {
    //   count=this.state.docNo;
    //   console.log("length",count);
    //   for (let index = 0; index < count.length; index++) {
    //     const element = count[index]+this.props.State.selectedDocuments.length;
    //     console.log(element);
    //   }
      
    // }
    // else{
    //   console.log("wvdfrwjed");
    // }
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#643A25"
          translucent={false}
        />
         {/* <NavigationEvents
          onDidFocus={async () => {
            // await this.AddDocuments();
            console.log("hhhh");
          }}
        /> */}
        <SafeAreaView style={{ flex: 0, backgroundColor: '#643A25' }} />
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 0.1 }}>
            <DynamicHeader
              text="Additional Information"
              HeaderColour="#643A25"
              ShouldDisplayRightIcon={false}
              ShouldDisplayLeftIcon={true}
              leftIconImage="chevron-left"
              onPressLeftIcon={() => this.props.navigation.navigate('ConsultationHistory')}
            />
          </View>
          <View style={{ flex: 0.9, marginTop: 20 }}>
            <View style={{ flex: 1 }}>
              <Text
                allowFontScaling={false}
                style={{ fontSize: 16, marginLeft: 20, fontFamily: Default.FontSemiBold }}>
                Consultation for : {this.props.navigation.state.params.item.name}
              </Text>
              <View
                style={{

                  flexDirection: 'row',
                  marginTop: 30,
                  marginBottom: 20,
                  marginHorizontal: 20,
                  width: deviceWidth - 45,
                  justifyContent: 'space-between',
                }}>
                <View> 
                  <Text
                    allowFontScaling={false}
                    style={{ fontFamily: Default.FontSemiBold, fontSize: 15 ,left:-5}}>
                    {' '}
                    Add New Documents
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      // this.props.navigation.navigate('UploadMedicalDetails', {
                      //   fromRegisterPage: false,
                      //   registrationType: 'request',
                      // });
                      this.props.navigation.navigate('IndividualDocument',{item:this.props.navigation.state.params.item});
                      this.props.NavigationFrom(false);
                    }}>
                    <Icon
                      style={{}}
                      name="pluscircleo"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{borderTopWidth:1,borderTopColor:'lightgray',marginHorizontal:20,top:-5}}></View>
              {
                  // this.props.navigation.state.params.item.documentCount!=undefined&&this.props.navigation.state.params.item.documentCount!=0?
                  // this.props.State.selectedDocuments!=undefined&&this.props.State.selectedDocuments.length!=0?
                 this.state.docNo!=undefined&&this.state.docNo.length!=0?
                 <View style={{paddingHorizontal:25,marginBottom:10,marginTop:10}}>
                   <Text allowFontScaling={false} style={{fontFamily:Default.FontSemiBold,fontSize:15,left:-5,marginBottom:10}}>Uploaded Documents</Text>
                <FlatList
                showsHorizontalScrollIndicator={false}
                  data={this.state.docNo}
                  keyExtractor={item => {
                    return item.id;
                  }}
                  renderItem={this._renderItem}
                  horizontal={true}
                  ItemSeparatorComponent={() => <View style={{margin: 4}} />}
                />
              </View>:
              null
                }
              <View style={{ flex: 1 ,marginTop:10}}>
                <Text allowFontScaling={false}
                  style={{ fontSize: 16, marginLeft: 20, fontFamily: Default.FontSemiBold }}>Fill Questionnarire</Text>
                <View style={{ flex: 1, marginTop: 30, marginHorizontal: 20 }}>
                  
                  <TouchableOpacity 
                   onPress={async () => {
                    let userID = this.props.navigation.state.params.item.userID//await AsyncStorage.getItem('UserId');
                    this.props.navigation.navigate('Questionnaire', { Heading: "Fill Questionnaire", URL: `https://secondopinionweb.azurewebsites.net/#/questionnaire/${userID}/1/${this.props.navigation.state.params.item.patientID}` })
                  }
                  }
                  style={{ flexDirection: 'row', height: 60, justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, elevation: 3, backgroundColor: 'white', paddingHorizontal: 10,}}>
                    <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons
                      // name="checkbox-blank-circle-outline"
                      name={
                        this.props.navigation.state.params.item.isQuestionaireCompleted==true
                            ? 'check-circle':
                        this.props.State.isFilledQuestionnaire == true
                          ? 'check-circle'
                          : 'checkbox-blank-circle-outline'
                      }
                      color={
                        this.props.navigation.state.params.item.isQuestionaireCompleted==true
                        ? '#36BC5A':
                        this.props.State.isFilledQuestionnaire == true
                          ? '#36BC5A'
                          : 'gray'
                      }
                      size={20}
                    />
                      <Text
                        allowFontScaling={false}
                        style={{ fontSize: 15, fontFamily: Default.FontMedium, color: 'gray', marginLeft: 10 }}>
                        Fill Questionnaire
                    </Text>
                    </View>
                    <MaterialCommunityIcons name={'chevron-right'} color={'#36BC5A'} size={30} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                   onPress={async () => {
                    let userID = this.props.navigation.state.params.item.userID//await AsyncStorage.getItem('UserId');
                    this.props.navigation.navigate('Questionnaire', {
                       Heading: "Neck Disability Index",
                        URL: `https://secondopinionweb.azurewebsites.net/#/questionnaire/${userID}/2/${this.props.navigation.state.params.item.patientID}`,
                      patientId:this.props.navigation.state.params.item.patientID })
                  }
                  }
                  style={{ flexDirection: 'row', height: 60, justifyContent: 'space-between', alignItems: 'center', borderRadius: 10, elevation: 3, backgroundColor: 'white', paddingHorizontal: 10 ,marginTop:30 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <MaterialCommunityIcons
                        // name="checkbox-blank-circle-outline"
                        name={
                          this.props.navigation.state.params.item.isNDICompleted==true
                            ? 'check-circle':
                            this.props.State.isFilledNDI == true?
                            'check-circle'
                            : 'checkbox-blank-circle-outline'
                        }
                        color={
                          // this.props.State.isFilledQuestionnaire == true
                          //   ? '#36BC5A'
                          //   : 'gray'
                          this.props.navigation.state.params.item.isNDICompleted==true?
                          '#36BC5A':
                          this.props.State.isFilledNDI == true?
                          '#36BC5A'
                          :'gray'
                        }
                        size={20}
                      />
                      <Text
                        allowFontScaling={false}
                        style={{ fontSize: 15, fontFamily: Default.FontMedium, color: 'gray', marginLeft: 10 }}>
                        Neck Disability Index (NDI)
                      </Text>
                    </View>
                    <MaterialCommunityIcons name={'chevron-right'} color={'#36BC5A'} size={30} />
                  </TouchableOpacity>
                </View>
              </View>


              {/* <View style={{ flex: 1 ,marginBottom:-50}}>
                <TouchableOpacity
                  style={{
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
                    flex: .7,
                    elevation: 3,
                  }}
                onPress={async () => {
                  let userID = this.props.State.selectedDependentId//await AsyncStorage.getItem('UserId');
                  this.props.navigation.navigate('Questionnaire', { Heading: "Neck Diablity Index", URL: `https://secondopinionweb.azurewebsites.net/#/questionnaire/${userID}/2` })
                }
                }
                >
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
                    flex: .7,
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
                    this.props.navigation.navigate('Questionnaire', { Heading: "Fill Questionnaire", URL: `https://secondopinionweb.azurewebsites.net/#/questionnaire/${userID}/1` })
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
              <View style={{ height: 60 }}>
                {/* <TouchableOpacity */}
                <TouchableScale
                  friction={90} //
                  tension={100} // These props are passed to the parent component (here TouchableScale)
                  activeScale={0.94} //
                  style={{
                    flex: 1,
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
                    Submit
              </Text>
                </TouchableScale>
                {/* </TouchableOpacity> */}
              </View>
            </View>
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
};

//export default ConsultationDetailsScreen;
const mapStateToProps = state => {
  //console.log(state);
  return { State: state.Appoinment };
};
export default connect(
  mapStateToProps,
  actions,
)(ConsultationInfo);
