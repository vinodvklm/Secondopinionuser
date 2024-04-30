import React, { Component, useContext, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Modal,
  WebView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Default } from '../../components/Default';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { DynamicHeader } from '../../components/DynamicHeader';
import Icon from 'react-native-vector-icons/AntDesign';
import CardView from 'react-native-rn-cardview';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
import LinearGradient from 'react-native-linear-gradient';
import TouchableScale from 'react-native-touchable-scale';
import { Overlay, Button } from 'react-native-elements';
import axios from 'axios';
const { width, height } = Dimensions.get('window');
import { auth } from 'react-native-firebase';
import { Image } from 'react-native';

class Dashboard extends Component {
  constructor() {
    super();
    this.axios = axios;
    this.state = {
      dashboardItems: [
        {
          title: 'New Appointment',
          index: 1,
          color: '#e74c3c',
          textColor: 'white',
          bottomLineColor: '#e74c3c',
          fontSize: 16,
          fontFamily: Default.FontMedium,
          backgroundColor: 'rgba(54,63,124,.9)',
          height: 200,
        },
        {
          title: 'Booking History',
          index: 2,
          color: '#27ae60',
          textColor: 'white',
          bottomLineColor: '#27ae60',
          fontSize: 16,
          fontFamily: Default.FontMedium,
          // backgroundColor:'#457b9d',
          backgroundColor: 'rgba(17,181,161,0.7)',
          height: 170,

        },
        {
          title: 'Dependent Circle',
          index: 3,
          color: '#ecf0f1',
          textColor: 'gray',
          bottomLineColor: '#cccccc',
          fontSize: 16,
          fontFamily: Default.FontMedium,
          // backgroundColor:'#52b69a',
          backgroundColor: 'rgba(163,164,169,0.8)',
          height: 170,
        },
        {
          title: 'My Documents',
          index: 4,
          color: '#ecf0f1',
          textColor: 'gray',
          bottomLineColor: '#cccccc',
          fontSize: 16,
          fontFamily: Default.FontMedium,
          // backgroundColor:'#1d4e89',
          backgroundColor: 'rgba(246,168,51,0.8)',
          height: 200,
        },
      ],
      userName: '',
      overLay: false,
    };
    //BookService
  }
  UNSAFE_componentWillMount() {
    // const name = AsyncStorage.getItem('username');
    // if (name !== null) {
    //   // We have data!!
    //   console.log(name);
    //   //this.setState({userName:name})
    // }
    //this.props.DependentSignUp();
    this._retrieveData();
    this.props.GetUserInfo();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        // We have data!!
        console.log('username is');
        console.log(value);
        this.setState({ userName: value });
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  logoutAction = () => {
    this.setState({ overLay: false });
    this.props.LogOut();
    //this.props.navigation.navigate('LoginScreen');
  };

  render() {
    console.log("navigation from home",this.props.Dependent.isHome);
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#643A25"
          translucent={false}
        />
        {/* <SafeAreaView style={{ flex: 0, backgroundColor: '#2edccd' }} /> */}
        <SafeAreaView style={{ flex: 0, backgroundColor: '#643A25' }} />
        <SafeAreaView style={styles.container}>
          {/* <View style={{backgroundColor: 'white', flex: 1}}>
            <LinearGradient
              colors={['#2edccd', '#58d3e1', '#76ccef']}
              style={styles.linearGradient}>
              <View style={{alignItems: 'center', height: 200}}>
                <View
                  style={{
                    flexDirection: 'row',
                    top: 20,
                    width: deviceWidth,
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      //this.props.navigation.navigate('LoginScreen');
                      this.setState({overLay: true});
                    }}>
                    <View>
                      <Icon
                        style={{marginLeft: 15}}
                        name="logout"
                        size={25}
                        color="white"
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Profile');
                    }}>
                    <View>
                      <Icon
                        style={{marginRight: 10}}
                        name="user"
                        size={28}
                        color="white"
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <Text
                allowFontScaling={false}
                  style={{
                    marginTop: 100,
                    fontWeight: '300',
                    color: 'white',
                    fontSize: 27,
                    fontFamily:Default.FontBold
                  }}>
                  {this.state.userName}
                </Text>
              </View>
            </LinearGradient>

            <FlatList
              style={{paddingHorizontal: 10, paddingTop: 10}}
              data={this.state.dashboardItems}
              keyExtractor={object => {
                return object.index;
              }}
              columnWrapperStyle={styles.row}
              numColumns={2}
              scrollEnabled={false}
              renderItem={({item, index}) => {
                return (
                  // <TouchableOpacity
                  <TouchableScale
                    friction={90} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.94} //
                    onPress={() => {
                      switch (index) {
                        case 0:
                          // this.props.navigation.navigate('BookService');
                          this.props.navigation.navigate('NewAppoinment');

                          break;
                        case 1:
                          this.props.navigation.navigate('ConsultationHistory');

                          break;
                        case 2:
                          this.props.navigation.navigate('DependentList');

                          break;

                        case 3:
                          this.props.navigation.navigate('MyDocuments');
                          // this.props.navigation.navigate('PaymentHistory');
                          //this.props.navigation.navigate('Paypal');

                          break;

                        default:
                          break;
                      }
                    }}>
                    <View style={styles.listItemtwo}>
                      <CardView
                        cardElevation={1}
                        maxCardElevation={1}
                        radius={0}
                        backgroundColor={item.color}>
                        <View
                          style={{
                            padding: 10,
                            height: 120,
                            alignItems: 'center',
                          }}>
                          <Text
                          allowFontScaling={false}
                            style={{
                              paddingTop: 42,
                              fontWeight: '300',
                              color: item.textColor,
                              fontSize: item.fontSize,
                              fontFamily:item.fontFamily,
                              textAlign:'center'
                            }}>
                            {item.title}
                          </Text>
                        </View>
                        <View
                          style={{
                            backgroundColor: item.bottomLineColor,
                            height: 4,
                          }}
                        />
                      </CardView>
                    </View>

                    {/* </TouchableOpacity> */}
          {/* </TouchableScale>
                );
              }}
            /> */}
          {/* </View>  */}
          <View style={{ flex: 1 }}>
            <LinearGradient
              // colors={['#2edccd', '#58d3e1', '#76ccef']}
              // colors={['#36bc5a', '#52CB73', '#A1F7AF']}
              colors={['#643A25','#643A25']}
              style={{ height: 140 }}>
              <View style={{ flexDirection: 'row', flex: 1, paddingHorizontal: 20, marginTop: 15 }}>
                <Text allowFontScaling={false} style={{ fontFamily: Default.FontBold, fontSize: 24, color: 'white', flex: .8 }}>{this.state.userName}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: .2 }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Profile');
                    }}>
                    <Icon
                      name="user"
                      size={25}
                      color="white"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      //this.props.navigation.navigate('LoginScreen');
                      this.setState({ overLay: true });
                    }}>
                    <Icon
                      name="logout"
                      size={22}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
            <View style={{ zIndex: 1, top: -40, borderTopRightRadius: 50, borderTopLeftRadius: 50, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 25, height: '100%' }}>
              <View style={{ flexDirection: 'row', flex: .65 }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <TouchableOpacity
                    // onPress={() => this.props.navigation.navigate('ConsultationInfo')}
                    onPress={() => this.props.navigation.navigate('NewAppoinment')}
                    style={{ flex: .55, backgroundColor: 'green', marginVertical: 7, marginHorizontal: 7, backgroundColor: 'rgba(34,87,122,0.8)', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: 70, height: 70, borderRadius: 70, backgroundColor: 'rgba(34,87,122,.5)', alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={require('../../../assets/consulting.png')} style={{ width: 40, height: 40 }} />
                    </View>
                    <Text style={{ marginTop: 10, fontSize: 18, fontFamily: Default.FontSemiBold, color: 'white', paddingHorizontal: 10, textAlign: 'center' }}>New Consult Request</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('DependentList');
                      this.props.NavigationFrom(true);
                    }}
                    style={{ flex: .45, flexDirection: 'column', marginHorizontal: 7, marginVertical: 7, backgroundColor: 'rgba(163,164,169,.5)', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: 70, height: 70, borderRadius: 70, backgroundColor: 'rgba(163,164,169,.5)', alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={require('../../../assets/dependent.png')} style={{ width: 40, height: 40 }} />
                    </View>
                    <Text style={{ marginTop: 10, fontSize: 18, fontFamily: Default.FontSemiBold, color: 'white', paddingHorizontal: 10, textAlign: 'center' }}>Me & Family</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('ConsultationHistory')}
                    style={{ flex: .45,  marginVertical: 7, marginHorizontal: 7, backgroundColor: 'rgba(17,181,161,0.7)', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: 70, height: 70, borderRadius: 70, backgroundColor: 'rgba(17,181,161,1)', alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={require('../../../assets/history.png')} style={{ width: 40, height: 40 }} />
                    </View>
                    <Text style={{ marginTop: 10, fontSize: 18, fontFamily: Default.FontSemiBold, color: 'white', paddingHorizontal: 10, textAlign: 'center' }}>Booking History</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('MyDocuments')}
                    style={{ flex: .55, backgroundColor: 'gray', flexDirection: 'column', marginHorizontal: 7, marginVertical: 7, backgroundColor: 'rgba(246,168,51,0.8)', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: 70, height: 70, borderRadius: 70, backgroundColor: 'rgba(246,168,51,1)', alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={require('../../../assets/myrecords.png')} style={{ width: 40, height: 40 }} />
                    </View>
                    <Text style={{ marginTop: 10, fontSize: 18, fontFamily: Default.FontSemiBold, color: 'white', paddingHorizontal: 10, textAlign: 'center' }}>Doctor Feedback</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={{ position: 'absolute', bottom: 0, width: '100%', paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center', flexDirection: 'row', backgroundColor: '#e8e8e8', alignSelf: 'center', zIndex: 999, opacity: .8 }}>
            <Image source={require('../../../assets/photo.jpg')} style={{ height: 50, width: 50, borderRadius: 70 }} />
            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
              <Text allowFontScaling={false} style={{ fontSize: 14, fontFamily: Default.FontSemiBold }}>Dr. Amit Bhandarkar</Text>
              <Text allowFontScaling={false} style={{ fontSize: 14, fontFamily: Default.FontMedium }}>Orthopedic Spine Surgeon</Text>
            </View>
          </View>
          <Overlay isVisible={this.state.overLay}
          overlayStyle={{borderRadius:10}}>
            <View style={styles.overlay}>
              <Text
                allowFontScaling={false}
                style={{ fontSize: 18, fontFamily: Default.Title }}>
                Warning!
              </Text>
              <Text
                allowFontScaling={false}
                style={{ fontSize: 14, fontFamily: Default.FontMedium, marginVertical: 20 }}>
                Do you want to logout?
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
                <Button
                  title="Logout"
                  type="outline"
                  buttonStyle={{borderColor:'#36BC5A',marginRight:5}}
                  containerStyle={{ flex: 1,}}
                  onPress={() => this.logoutAction()}
                  titleStyle={{ fontSize: 15, fontFamily: Default.FontSemiBold,color:'#36BC5A' }}
                />
                <Button
                  title="Cancel"
                  type="outline"
                  buttonStyle={{borderColor:'#36BC5A',marginLeft:5}}
                  containerStyle={{ flex: 1 }}
                  onPress={() => this.setState({ overLay: false })}
                  titleStyle={{ fontSize: 15, fontFamily: Default.FontSemiBold ,color:'#36BC5A'}}
                />
              </View>
            </View>
          </Overlay>
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  overlay: {
    height: Dimensions.get('window').height / 4 - 50,
    width: Dimensions.get('window').width - 80,
    alignItems: 'center',
  },
  listItem: {
    flex: 1,
    height: 50,
    borderWidth: 0.2,
    marginHorizontal: 45,
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 8,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between'
  },
  listItemtwo: {
    width: (deviceWidth - 55) / 2,
    maxWidth: deviceWidth / 2,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 0,
    marginTop: 10,
    marginHorizontal: 10,
  },
});
Dashboard.navigationOptions = {
  headerShown: false,
};
//export default Dashboard;
const mapStateToProps = state => {
  //console.log(state);
  return { 
    State: state.SignIn,
    Dependent: state.Appoinment};
};
export default connect(
  mapStateToProps,
  actions,
)(Dashboard);
