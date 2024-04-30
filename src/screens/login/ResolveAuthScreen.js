import React, { useEffect } from 'react';
import { ImageBackground, SafeAreaView, Platform, View, Image, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ResolveAuthScreen = ({ navigation }) => {
  setUserTypeValues = async () => {
    await AsyncStorage.setItem('UserType', "MySelf");
    await AsyncStorage.setItem('DependentFK', "");

  }
  checkIsSignedIn = async () => {
    this.setUserTypeValues();
    const userLoggedIn = await AsyncStorage.getItem('UserId');
    if (!userLoggedIn) {
      Platform.OS=='ios'?
      navigation.navigate('LoginFlow'):
      setTimeout(() => {
        navigation.navigate('LoginFlow')
      }, 2000);
    } else {
      Platform.OS=='ios'?
      navigation.navigate('MainFlow'):
      setTimeout(() => {
        navigation.navigate('MainFlow');
      }, 2000);
    }
  };
  useEffect(() => {
    checkIsSignedIn();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <ImageBackground style={{ flex: 1 }} source={require('../../../assets/LaunchBackgrnd.png')} /> */}
      {/* <LinearGradient
              colors={['#fff', '#fff', '#fff']}
              style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <View style={{marginBottom:30}} >
                <Image 
                style={{width:100,height:'100%'}}
                source={require('../../../assets/sp_android.png')}/>
                <Text 
                allowFontScaling={false}
                style={{fontSize:35,fontWeight:'bold',color:'#FFF',marginTop:40}}>Second Opinion</Text>
              </View>
            </LinearGradient> */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ImageBackground
          style={{ height: '100%', width: '100%' }}
          source={require('../../../assets/sp_android.png')}
        ></ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default ResolveAuthScreen;
