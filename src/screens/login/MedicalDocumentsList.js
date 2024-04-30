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
import {CustomButton} from '../../components/CustomButton';
import firebase from 'react-native-firebase';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {DynamicHeader} from '../../components/DynamicHeader';
import TileSelector from '../../components/TileSelector';
import DocumentList from '../../components/DocumentList';
import {NavigationEvents} from 'react-navigation';
import CardView from 'react-native-rn-cardview';
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
import {Overlay} from 'react-native-elements';
import {Loader} from '../../components/Loader';
import {ListItem} from 'react-native-elements';
import ImageView from 'react-native-image-viewing';
import { Default } from '../../components/Default';
class MedicalDocumentsList extends React.Component {
  constructor() {
    super();
    this.state = {
      medicalReports: [
        {documentName: 'history record one', reportDate: '1'},
        {documentName: 'history record two', reportDate: '2'},
      ],
      navigationFromDependentList: false,
      isTapable: true,
    };
  }

  showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{text: 'OK', onPress: () => console.log('OK Pressed/MedicalDoc')}],
      {cancelable: false},
    );
  };
  componentDidMount() {
    this.props.GetMedicalListItems();
    this.setState({
      navigationFromDependentList: this.props.navigation.getParam(
        'navigationFromDependentList',
        false,
      ),
    });

    //this.props.updateDocumentList();
    console.log('did mount called');
  }
  UNSAFE_componentWillMount() {
    this.props.ClearErrorMsg();
    this.props.ClearAlert();
    // this.GetMedicalListItems();
  }
  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        console.log(item);
        this.props.storeSingleDocumentObject(item);
        this.props.navigation.navigate('MedicalDocumentDetails');
      }}>
      <ListItem
        title={item.documentDetails.documentName}
        subtitle={item.documentDetails.reportDate}
        //badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: 0, } }}
        // leftAvatar={{ source: { uri: item.avatar_url } }}
        bottomDivider
        subtitleStyle={{color: 'gray', marginVertical: 10, fontSize: 12}}
        chevron
      />
    </TouchableOpacity>
  );
  keyExtractor = (item, index) => index.toString();
  GetMedicalListItems() {
    this.props.GetMedicalListItems(false, {});
    // this.props.GetMedicalListItems(this.state.navigationFromDependentList);
    console.log('will mount called');
  }
  render() {
    console.log('medical document list',JSON.stringify(this.props.State.medicalDocumentsList))
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#7ecaf3"
          translucent={false}
        />
        <NavigationEvents onDidFocus={() => this.GetMedicalListItems()} />

        <SafeAreaView style={{flex: 0, backgroundColor: '#7ecaf3'}} />
        <SafeAreaView style={styles.container}>
          <DynamicHeader
            text="Medical Details"
            ShouldDisplayLeftIcon={this.state.navigationFromDependentList}
            leftIconImage="chevron-left"
            onPressLeftIcon={() => {
              console.log('tapped');

              console.log("DocumentList",this.props.State.medicalDocumentsList);

              this.props.navigation.navigate('DependentList');
            }}
            ShouldDisplayRightIcon={true}
            rightIconImage="add"
            onPressRightIcon={() => {
              this.props.navigation.navigate('UploadMedicalDetails', {
                fromRegisterPage: false,
                registrationType: 'list',
              });
            }}
            HeaderColour="#7ecaf3"
          />
          <View style={{marginHorizontal: 10}}>

            {this.props.State.medicalDocumentsList!=undefined&&this.props.State.medicalDocumentsList.length!=0?
            
            <FlatList
              keyExtractor={this.keyExtractor}
                data={this.props.State.medicalDocumentsList}
                //data={this.state.medicalReports}
              renderItem={({item})=>{
                return(
                  <TouchableOpacity
                  onPress={() => {
                    console.log(item);
                    this.props.storeSingleDocumentObject(item);
                    this.props.navigation.navigate('MedicalDocumentDetails');
                  }}>
                  <ListItem
                    title={item.documentDetails?item.documentDetails.documentName:''}
                    subtitle={item.documentDetails?item.documentDetails.reportDate:''}
                    //badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: 0, } }}
                    // leftAvatar={{ source: { uri: item.avatar_url } }}
                    bottomDivider
                    subtitleStyle={{color: 'gray', marginVertical: 10, fontSize: 12}}
                    chevron
                  />
                </TouchableOpacity>
                )
              }}
            />:
            <Text allowFontScaling={false} style={{fontSize:17,alignSelf:'center',marginTop:20,fontFamily:Default.FontSemiBold}}>No Details Added</Text>}
          </View>

          {/* <FlatList
            data = {this.props.State.medicalDocumentsList}
            keyExtractor = {(item)=>{
              return item.tag;
            }}
            renderItem = {({item,index})=>{
              return (
                <View style = {{padding:10,marginHorizontal:5,backgroundColor:"lightgyar"}}>
                  <TouchableOpacity onPress = {()=>{
                    //this.props.navigation.navigate("HistoryDetails");
                  }}>
                <CardView cardElevation={8}
                          maxCardElevation={8}
                          radius={5}
                          backgroundColor={'white'}>
                    <View style={{padding:10,backgroundColor:"white"}}>

                         <DocumentList documentName={item.documentDetails.documentName} listData={item.documentPath}
                         
                         onTapAccessability = {()=>{
                             console.log("accessability pressed")
                         }}
                         />
                      
                    </View>
                    <View style = {{backgroundColor:"#99ccff",height:1}}></View>
                </CardView>
                </TouchableOpacity>
                </View>

              );
            }}
            
            /> */}
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
MedicalDocumentsList.navigationOptions = {
  headerShown: false,
};
//export default MedicalDocumentsList;
const mapStateToProps = state => {
  //console.log(state);
  // return {State: state.MedicalDataUpload};
  return {State: state.Appoinment};
};

export default connect(
  mapStateToProps,
  actions,
)(MedicalDocumentsList);
