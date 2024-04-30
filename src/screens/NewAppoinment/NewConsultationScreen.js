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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DynamicHeader } from '../../components/DynamicHeader';
import { ListItem, Avatar } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import { DotIndicator } from 'react-native-indicators';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { Overlay } from 'react-native-elements';
import { Default } from '../../components/Default';
import Feather from 'react-native-vector-icons/Feather';
const list = [
  {
    name: 'John Wicks',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Myself',
    icon: 'person',
  },
  {
    name: 'Johnny',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Brother',
    icon: 'person',
  },
];
class NewConsultationScreen extends React.Component {
  state = { onpressed: 'none', isTapable: true };
  // UNSAFE_componentWillMount() {
  //   this.props.GetDependentList();
  // }

  setUserTypeValues = async value => {
    var UserType = value.UserType;
    var DependentFK = value.DependentFK;

    await AsyncStorage.setItem('UserType', UserType);
    await AsyncStorage.setItem('DependentFK', `${DependentFK}`);
    await this.props.ClearLoader()
    // this.setState({isTapable: true});
    this.props.navigation.navigate('BookConsultation');
  };
  componentDidMount() {
    this.props.GetDependentList();
    this.props.GetModeOfCommunication();
   
  }
  renderItem = ({ item }) => (
    <TouchableScale
      friction={90} //
      tension={100} // These props are passed to the parent component (here TouchableScale)
      activeScale={0.94} //
      onPress={() => {
        this.setState({ onpressed: item.firstName, isTapable: false });
        setTimeout(() => {
          this.props.SelectedForAppoinment({
            name: `${item.firstName} ${item.middleName} ${item.lastName}`,
            relation: `${item.relationship}`,
            id: `${item.userID}`
          });
          this.setState({ isTapable: true, onpressed: 'none' });

          var UserType = '';
          var UserID = '';
          if (item.isSelfDependent == true) {
            UserType = 'S';
            UserID = item.userID;
            console.log(UserID);
          } else {
            UserType = 'D';
            UserID = item.dependentID;
            console.log(UserID);
          }
          this.props.AddPatientDetails({
            ID: UserID,
            Status: UserType,
          });
          this.setUserTypeValues({
            UserType: UserType,
            DependentFK: item.dependentID,
          });
        }, 300);
      }}>
      <ListItem
        title={`${item.firstName} ${item.middleName} ${item.lastName}`}
        subtitle={`${item.relationship}`}
        containerStyle={{
          backgroundColor:
            item.firstName == this.state.onpressed ? '#8c8c8c' : null,
        }}
        leftAvatar={{
          source: {
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          },
        }}
        bottomDivider
        chevron
      />
    </TouchableScale>
  );
  keyExtractor = (item, index) => index.toString();

  render() {
    console.log('array is', this.props.State.DependentList)
    console.log("freeConsultationCount",this.props.State.freeConsultationCount);
    var data=[];
    var consultationCount=0
    if (this.props.State.DependentList != undefined && this.props.State.DependentList.length != 0) {
      data=this.props.State.DependentList;
      const array=data;
      for (let index = 0; index < array.length; index++) {
        const element = array[index].isSelfDependent;
        console.log(element);
        if (element==true) {
          console.log(array[index].freeBookingCount)
          // this.setState({
          //   consultationCount:array[index].freeBookingCount
            
          // })
          consultationCount=array[index].freeBookingCount;
          break;
        }
      }
    } else {
      data=null;
      console.log("DependentList is null");
    }
   
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
              text="Consultation"
              ShouldDisplayLeftIcon={true}
              leftIconImage="chevron-left"
              onPressLeftIcon={() => {
                this.props.navigation.navigate('Dashboard');
              }}
              HeaderColour="#643A25"
            />
          </View>
          {
            this.props.State.errorMsg === 'Network Error'?
            <View style={{ flex: 0.9}}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 16,
                fontFamily: Default.FontMedium,
                marginVertical: 10,
                textAlign:'center',
                marginTop:50
              }}>
              {this.props.State.errorMsg}
            </Text>
          </View>:
          <>
<View style={{ flex: 0.1 }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 18,
                fontFamily: Default.FontSemiBold,
                marginVertical: 10,
                marginLeft: 20,
              }}>
              Consultation for
            </Text>
          </View>
          <View style={{ flex: 0.8 }}>
            {
              data!=null ?
                <FlatList
                  keyExtractor={this.keyExtractor}
                  data={this.props.State.DependentList}
                  renderItem={({ item }) => (
                    <TouchableScale
                      friction={90} //
                      tension={100} // These props are passed to the parent component (here TouchableScale)
                      activeScale={0.94} //
                      onPress={() => {
                        this.setState({ onpressed: item.firstName, isTapable: false });
                        setTimeout(() => {
                          this.props.SelectedForAppoinment({
                            name: `${item.firstName} ${item.middleName} ${item.lastName}`,
                            relation: item.relationship,
                            id: item.userID
                          });
                          this.setState({ isTapable: true, onpressed: 'none' });

                          var UserType = '';
                          var UserID = '';
                          if (item.isSelfDependent == true) {
                            UserType = 'S';
                            UserID = item.userID;
                            console.log(UserID);
                          } else {
                            UserType = 'D';
                            UserID = item.dependentID;
                            console.log(UserID);
                          }
                          this.props.AddPatientDetails({
                            ID: UserID,
                            Status: UserType,
                          });
                          this.setUserTypeValues({
                            UserType: UserType,
                            DependentFK: item.dependentID,
                          });
                        }, 300);
                      }}>
                      <ListItem bottomDivider>
                        <Avatar rounded source={{
                          uri:
                            'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png',
                        }} />
                        <ListItem.Content>
                          <ListItem.Title allowFontScaling={false} style={{ fontSize: 16, fontFamily: Default.FontSemiBold }}>{`${item.firstName} ${item.middleName} ${item.lastName}`}</ListItem.Title>
                          <ListItem.Subtitle allowFontScaling={false} style={{ fontSize: 14, fontFamily: Default.FontMedium, marginTop: 5 }}>{`${item.relationship}`}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                      </ListItem>
                    </TouchableScale>
                  )}
                /> :
                this.props.State.errorMsg != '' ?
                  <Text allowFontScaling={false} style={{ fontFamily: Default.FontMedium, fontSize: 16, color: 'gray', alignSelf: 'center', marginTop: 20 }}>{this.props.State.errorMsg}</Text> :
                  <Text allowFontScaling={false} style={{ fontFamily: Default.FontMedium, fontSize: 16, color: 'gray', alignSelf: 'center', marginTop: 20 }}>Data not available try after sometimes</Text>
            }
            {
              data!=null&&consultationCount!=3?
              <View
              style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, bottom: 0 ,marginBottom:-10,flex:1}}>
              <Feather
                name={'info'}
                size={25}
                color="gray"
              />
              <Text allowFontScaling={false} style={{ fontFamily: Default.FontMedium, fontSize: 14, color: 'gray', marginHorizontal: 10 }}>You have 3 free consultation for either phone or video consult for 3 times. Over a 3 months of time.</Text>
            </View>:
            null
            }
            {this.state.onpressed != 'none' ? (
              <DotIndicator
                style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}
                size={6}
                color={'#36BC5A'}
              />
            ) : null}
          </View>
          </>

          }
          
          
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
          {/* {this.props.State.showLoader == true ? (
              <DotIndicator
              style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}
              size={6}
              color={'#36BC5A'}
            />
          ) : null} */}
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
  return { State: state.DependentSignUp };
};
export default connect(
  mapStateToProps,
  actions,
)(NewConsultationScreen);
