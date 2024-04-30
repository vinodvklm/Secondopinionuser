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
} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DynamicHeader} from '../../components/DynamicHeader';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import {stringify} from 'querystring';
import {DotIndicator} from 'react-native-indicators';
class QuestionnaireScreen extends React.Component {
  state = {userID: '0', loading: true,url:'',heading:''};
  hideSpinner = () => {
    this.setState({loading: false});
  };
  onMessage(data) {
    //Prints out data that was passed.
    console.log(data);
  }
  componentDidMount = async () => {
    let userID = await AsyncStorage.getItem('UserId');
    this.setState({userID: userID});
    console.log('id is',this.state.userID);
    let params=this.props.navigation.state.params;
    if(params){
      this.setState({url:params.URL,heading:params.Heading})
      this.ReactNativeWebView.reload();
    }
    console.log("params",params)
  };

  render() {
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#643A25"
          translucent={false}
        />
        <SafeAreaView style={{flex: 0, backgroundColor: '#643A25'}} />
        <SafeAreaView style={styles.container}>
          <View style={{flex: 0.1}}>
            <DynamicHeader
              text={this.state.heading}
              ShouldDisplayLeftIcon={true}
              leftIconImage="chevron-left"
              onPressLeftIcon={() => {
                this.props.navigation.goBack();
              }}
              HeaderColour="#643A25"
            />
          </View>
          <View style={{flex: 0.9}}>
           {
          //  Platform.OS=='android'?
           
           <WebView
             useWebKit={true}
           javaScriptEnabled={true}
              ref={r => (this.ReactNativeWebView = r)}
              onLoad={() => this.hideSpinner()}
              source={{
                uri: `${this.state.url}`,
              }}
              //onMessage={() => console.log('onmessage called')}
              // injectedJavaScript={`(function(){document.getElementById('crtl_3').value = 'test@test.com';} ());`}
              injectedJavaScript={`
              document.getElementById('crtl_3').autocomplete = 'on';
              const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); 
              document.getElementById('crtl_3').value = 'test@test';`}
              onMessage={event => {
                console.log('response'), console.log(event.nativeEvent);
                if(this.state.heading=='Fill Questionnaire'){
                  console.log('quntr messge recived')
                  this.props.QuestionnaireFilledStatus(true);
                }else{
                  this.props.NDIFilledStatus(true);
                }
                this.props.navigation.pop();
              }}
              //FormSaveSaveButtonCallBack={this.onMessage}
            />
          // :
          // <WKWebView
          //  onProgress={(progress) => console.log(progress)}
          //  useWebKit={true}
          //  javaScriptEnabled={true}
          //     ref={r => (this.ReactNativeWebView = r)}
          //     onLoad={() => this.hideSpinner()}
          //     source={{
          //       uri: `${this.state.url}`,
          //     }}
          //     //onMessage={() => console.log('onmessage called')}
          //     // injectedJavaScript={`(function(){document.getElementById('crtl_3').value = 'test@test.com';} ());`}
          //     injectedJavaScript={`
          //     document.getElementById('crtl_3').autocomplete = 'on';
          //     const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); 
          //     document.getElementById('crtl_3').value = 'test@test';`}
          //     onMessage={event => {
          //       console.log('response'), console.log(event.nativeEvent);
          //       if(this.state.heading=='Fill Questionnaire'){
          //         this.props.QuestionnaireFilledStatus(true);
          //       }else{
          //         this.props.NDIFilledStatus(true);
          //       }
                
          //       this.props.navigation.pop();
          //     }}
          //  />
          }
            {this.state.loading == true ? (
              <DotIndicator
                color="#36BC5A"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  top: 0,
                  left: 0,
                  right: 0,
                  alignSelf: 'center',
                }}
              />
            ) : null}
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
//export default QuestionnaireScreen;
const mapStateToProps = state => {
  //console.log(state);
  return {State: state.SignIn};
};
export default connect(
  mapStateToProps,
  actions,
)(QuestionnaireScreen);
