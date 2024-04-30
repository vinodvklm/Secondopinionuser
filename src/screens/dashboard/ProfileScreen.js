import React, {Component, useContext, useEffect} from 'react';
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
} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import LinearGradient from 'react-native-linear-gradient';
import {DynamicHeader} from '../../components/DynamicHeader';
import {Avatar} from 'react-native-elements';
import ListItemComponent from '../../components/ListItemComponent';
import { Default } from '../../components/Default';
class ProfileScreen extends React.Component {
  render() {
    var name='Name';
    console.log("name",this.props.State);
    if (this.props.State.UserName!=undefined) {
      name=this.props.State.UserName.match(/\b(\w)/g).join('');
    } else {
      name=name.match(/\b(\w)/g).join('');
    }
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#643A25"
          translucent={false}
        />
        <SafeAreaView style={{flex: 0, backgroundColor: '#643A25'}} />
        <SafeAreaView style={styles.container}>
          <View style={{flex: 0.3}}>
            <LinearGradient
              colors={['#643A25', '#643A25', '#643A25']}
              style={{height: 150}}>
              <DynamicHeader
                //text="Payment"
                ShouldDisplayLeftIcon={true}
                leftIconImage="chevron-left"
                onPressLeftIcon={() => {
                  //console.log('tapped');
                  this.props.navigation.pop();
                }}
              />
              <View
                style={{
                  alignSelf: 'flex-end',
                  marginHorizontal: 20,
                  flexDirection: 'column',
                  //borderWidth: 1,
                  bottom: 10,
                  right: 10,
                  position: 'absolute',
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    alignSelf: 'flex-end',
                    color: 'white',
                    fontSize: 18,
                    fontFamily:Default.FontSemiBold
                  }}>
                  {this.props.State.UserName}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    alignSelf: 'flex-end',
                    color: 'white',
                    fontSize: 15,
                    fontFamily:Default.FontMedium
                  }}>
                  {this.props.State.mobileNumber}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{
                    alignSelf: 'flex-end',
                    color: 'white',
                    fontSize: 13,
                    fontFamily:Default.FontMedium
                  }}>
                  {this.props.State.email}
                </Text>
              </View>
            </LinearGradient>
            <Avatar
              rounded
              title={name}
              titleStyle={{fontSize: 30, fontWeight: '500'}}
              size={100}
              containerStyle={{
                borderWidth: 4,
                borderColor: 'white',
                position: 'absolute',
                alignSelf: 'flex-start',
                //alignItems: 'flex-end',
                // justifyContent: 'flex-end',
                marginTop: 100,
                marginLeft: 30,
                backgroundColor: '#bfbfbf',
              }}
            />
          </View>
          <View style={{flex: 0.1, marginTop: 25}}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 15,
                marginLeft: 20,
                fontFamily:Default.FontMedium
              }}>
              Address
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 13,
                marginTop: 20,
                marginLeft: 20,
                color: 'gray',
                fontFamily:Default.FontMedium
              }}>
              {this.props.State.address}
            </Text>
          </View>
          <View style={{flex: 0.4}}>
            <ListItemComponent
              title="Documents"
              onPress={() => this.props.navigation.navigate('MyDocuments')}
            />
            <ListItemComponent
              title="Payment History"
              onPress={() => this.props.navigation.navigate('PaymentHistory')}
            />
            <ListItemComponent
              title="Dependency Circle"
              onPress={() => this.props.navigation.navigate('DependentList')}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
ProfileScreen.navigationOptions = {
  headerShown: false,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const mapStateToProps = state => {
  //console.log(state);
  return {State: state.SignIn};
};
export default connect(
  mapStateToProps,
  actions,
)(ProfileScreen);
