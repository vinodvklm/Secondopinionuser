import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,Platform,BackHandler,Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Feather';
import {DynamicHeader} from '../../components/DynamicHeader';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import {stringify} from 'querystring';
import {DotIndicator} from 'react-native-indicators';
const INJECTED_JS = `
const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); 
  window.onscroll = function() {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        scrollTop: document.documentElement.scrollTop || document.body.scrollTop
      }),     
    )
  };
 
`
class PaymentWebview extends React.Component {
  state = {userID: '0', loading: true,url:'',heading:'',amount:''};
constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
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
      this.setState({amount:params.amount})
      this.ReactNativeWebView.reload();
    }
    console.log("params",params)
  };
  UNSAFE_componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
    // this.props.navigation.goBack(null);
Alert.alert("Message","Do you want to exit from payment?",
[
    {
      text: 'Exit',
      onPress: () => this.props.navigation.pop(),
    },
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel'
    },
    
  ],
  { cancelable: false })
    return true;
}
  render() {
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#643A25"
          translucent={false}
        />
        <SafeAreaView style={{flex: 0, backgroundColor: '#7ecaf3'}} />
        <SafeAreaView style={styles.container}>
          {/* <View style={{flex: 0.1}}>
            <DynamicHeader
              text={this.state.heading}
              ShouldDisplayLeftIcon={true}
              leftIconImage="chevron-left"
              onPressLeftIcon={() => {
                this.props.navigation.navigate('BookConsultation');
              }}
              HeaderColour="#7ecaf3"
            />
          </View> */}
          <View style={{flex: 1}}>
           
           <TouchableOpacity style={{width:50,height:50,position:'absolute',top:15,left:15,backgroundColor:'rgba(10, 10, 10,0.9)',zIndex: 999,borderRadius:7}} onPress={()=>{this.handleBackButtonClick()}}>
           <Icon
            style={{height: 25,
                width: 25,
                margin: 10,
                color: 'white',}}
            name={'chevron-left'}
            size={25}
            color="white"
          />
           </TouchableOpacity>
           
           {
         
           
           <WebView
             useWebKit={true}
           javaScriptEnabled={true}
              ref={r => (this.ReactNativeWebView = r)}
              onLoad={() => this.hideSpinner()}
              source={{
                uri: `https://secondopinionweb.azurewebsites.net/#/paypal_/USD/${this.state.amount}`,
              }}
              injectedJavaScript={INJECTED_JS}
              // onNavigationStateChange={event => console.log(event)}
              onMessage={async event => {
                console.log("callback",event);
                let data = JSON.parse(event.nativeEvent.data)
                 console.log('response'), console.log(JSON.stringify(data));
                //  if(data.status=='APPROVED'){
                //   //  this.props.navigation.pop();
                //   this.props.navigation.state.params.component.passProps.BookAprovedPayment(data);
                //  }
                if(this.state.heading=='Fill Questionnaire'){
                  this.props.QuestionnaireFilledStatus(true);
                }else{
                  this.props.NDIFilledStatus(true);
                }
                // this.props.navigation.pop();
                if (data.status=='COMPLETED') {
                  this.props.navigation.goBack();
                  this.props.navigation.state.params.component.passProps.BookAprovedPayment(data);
                } else {
                  console.log("payment faliure");
                }
              }}
             
            />
         
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
)(PaymentWebview);
