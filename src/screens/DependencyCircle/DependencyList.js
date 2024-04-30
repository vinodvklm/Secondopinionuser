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
  FlatList,Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DynamicHeader} from '../../components/DynamicHeader';
import {ListItem,Avatar} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import {DotIndicator} from 'react-native-indicators';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import {Overlay} from 'react-native-elements';
import DependentListObject from '../../components/DependentListObject';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
import {NavigationEvents} from 'react-navigation';
import CardView from 'react-native-rn-cardview';
import Feather from 'react-native-vector-icons/Feather';
import { Default } from '../../components/Default';
const list = [
  {
    name: 'John Wicks',
    avatar_url: '../../../assets/user.png',
    subtitle: 'Myself',
    icon: 'av-timer',
  },
  {
    name: 'Johnny',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Brother',
    icon: 'av-timer',
  },
];

class DependencyList extends React.Component {
  constructor() {
    super();
    this.state = {
      medicalReports: [
        {item: 'history record one', tag: '1'},
        {item: 'history record two', tag: '2'},
      ],
      onpressed: 'none',
      isTapable: true,
    };
  }

  UNSAFE_componentWillMount() {
    this.getDependentServiceCall();
    
  }
  componentDidMount() {}

  getDependentServiceCall() {
    this.props.GetDependentList();
  }
  setUserTypeValues=async(value)=>{
    console.log('value',value);
    var UserType = value.UserType;
    var DependentFK = value.DependentFK;

    await AsyncStorage.setItem('UserType', UserType);
    await AsyncStorage.setItem('DependentFK', `${DependentFK}`);
    this.setState({isTapable: true});
        // this.props.navigation.navigate('MedicalDocumentsList', {
        //   navigationFromDependentList: true,
        // });
        this.props.navigation.navigate('IndividualDocument');

  }
  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        console.log(item);
        // var UserType = ""
        // if(item.isSelfDependent == true){
        //   UserType = "MySelf";
        // }else{
        //   UserType = "Dependent";
        // }
        // this.setUserTypeValues({UserType:UserType,DependentFK:item.userID});
        this.props.navigation.navigate('IndividualDocument',{item});

      }}>
      <ListItem bottomDivider>
   <Avatar rounded source={{
    uri:
      'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png',
  }} />
    {/* <Avatar source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}} /> */}
    <ListItem.Content>
      <ListItem.Title allowFontScaling={false} style={{fontSize:16,fontFamily:Default.FontSemiBold}}>{`${item.firstName} ${item.middleName} ${item.lastName}`}</ListItem.Title>
      <ListItem.Subtitle allowFontScaling={false} style={{fontSize:14,fontFamily:Default.FontMedium,marginTop:5}}>{item.relationship}</ListItem.Subtitle>
    </ListItem.Content>
    <ListItem.Chevron />
  </ListItem>
    </TouchableOpacity>
  );
  keyExtractor = (item, index) => index.toString();
  state = {onpressed: 'none'};
  render() {
    console.log("dependent data",this.props.State.DependentList);
    var Length=0;
    
    if (this.props.State.DependentList!=undefined&&this.props.State.DependentList.length!=0) {
      console.log("length",this.props.State.DependentList.length);
      Length=this.props.State.DependentList.length;
    } else {
      console.log("something went wrong");
    }
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#643A25"
          translucent={false}
        />
        <NavigationEvents
          onDidFocus={() =>
            this.getDependentServiceCall()
          }
        />


        <SafeAreaView style={{flex: 0, backgroundColor: '#643A25'}} />
        <SafeAreaView style={styles.container}>
          {
            Length===3?
<DynamicHeader
            text="Family Members"
            ShouldDisplayLeftIcon={true}
            leftIconImage="chevron-left"
            onPressLeftIcon={() => {
              this.props.navigation.pop();
              // this.props.navigation.navigate('Dashboard');
            }}
            HeaderColour="#643A25"
          />:
          <DynamicHeader
            text="Family Members"
            ShouldDisplayLeftIcon={true}
            leftIconImage="chevron-left"
            onPressLeftIcon={() => {
              this.props.navigation.pop();
              // this.props.navigation.navigate('Dashboard');
            }}
            ShouldDisplayRightIcon={true}
            rightIconImage="add"
            onPressRightIcon={() => {
              this.props.navigation.navigate('DependantDetails', {
                fromListPage: true,
              });
              console.log(this.props.State.DependentList);
              // this.getDependentServiceCall();
            }}
            HeaderColour="#643A25"
          />
          }
          

          {/* <Text
            allowFontScaling={false}
            style={{
              fontSize: 16,
              fontWeight: '600',
              marginLeft: 25,
              color: 'gray',
              marginVertical: 20,
            }}>
            My dependent circle
          </Text> */}
          <View style={{marginHorizontal: 10, marginTop:10,flex:.9}}>
           {
             this.props.State.DependentList!=undefined&&this.props.State.DependentList.length!=0?
              <FlatList
              keyExtractor={this.keyExtractor}
              data={this.props.State.DependentList}
              renderItem={this.renderItem}
            />:this.props.State.errorMsg!=''?
            <Text allowFontScaling={false} style={{fontFamily:Default.FontMedium,fontSize:16,color:'gray',alignSelf:'center',marginTop:20}}>{this.props.State.errorMsg}</Text>:
            <Text allowFontScaling={false} style={{fontFamily:Default.FontMedium,fontSize:16,color:'gray',alignSelf:'center',marginTop:20}}>Add family members</Text>
           }
          </View>
          <View 
            style={{flexDirection:'row',alignItems:'center',paddingHorizontal:25,bottom:0}}>
            <Feather
            name={'info'}
            size={25}
            color="gray"
          />
          <Text allowFontScaling={false} style={{fontFamily:Default.FontMedium,fontSize:14,color:'gray',marginLeft:10}}>Only three family members can be added by a member.</Text>
            </View>
          {this.state.onpressed != 'none' ? (
            <DotIndicator
              style={{alignSelf: 'center'}}
              size={6}
              color={'#36BC5A'}
            />
          ) : null}
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
const styles = {
  container: {
    flex: 1,
  },
};
//export default NewConsultationScreen;

const mapStateToProps = state => {
  //console.log(state);
  return {State: state.DependentSignUp};
};
export default connect(
  mapStateToProps,
  actions,
)(DependencyList);
