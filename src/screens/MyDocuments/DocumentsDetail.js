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
  Image,ImageBackground
} from 'react-native';
import {WebView} from 'react-native-webview';
import {DynamicHeader} from '../../components/DynamicHeader';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

class DocumentsDetail extends React.Component {
  state = {uri: ''};
  onMessage(data) {
    //Prints out data that was passed.
    console.log(data);
  }
  componentDidMount() {
    const {state} = this.props.navigation;
    let uri = state.params.uri;
    if (uri) {
      this.setState({uri: uri});
    }
  }

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
              text="Document Details"
              ShouldDisplayLeftIcon={true}
              leftIconImage="chevron-left"
              onPressLeftIcon={() => {
                this.props.navigation.goBack();
              }}
              HeaderColour="#643A25"
            />
          </View>
          <View style={{flex: 0.9}}>
            <WebView
              ref={r => (this.webref = r)}
              source={{
                uri: this.state.uri,
              }}
              onMessage={m => this.onMessage(m)}
            />
            {/* <ImageBackground 
            style={{width:400,height:300,flex:1}}
            source={{
              uri: this.state.uri,
            }}/> */}
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

DocumentsDetail.navigationOptions = {
  headerShown: false,
};
//export default QuestionnaireScreen;
const mapStateToProps = state => {
  //console.log(state);
  return {State: state.SignIn};
};
export default connect(
  mapStateToProps,
  actions,
)(DocumentsDetail);
