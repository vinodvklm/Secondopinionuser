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
import {DynamicHeader} from '../../components/DynamicHeader';
import {ListItem} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import {DotIndicator} from 'react-native-indicators';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import DependentListObject from '../../components/DependentListObject';

import CardView from 'react-native-rn-cardview';
import { Default } from '../../components/Default';
const list = [
  {
    name: 'My Self',
    avatar_url: '../../../assets/user.png',
    subtitle: '21/11/2019',
    icon: 'av-timer',
  },
  {
    name: 'Brother',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: '21/10/2019',
    icon: 'av-timer',
  },
];

class MyDocuments extends React.Component {
  constructor() {
    super();
    this.state = {
      medicalReports: [
        {item: 'history record one', tag: '1'},
        {item: 'history record two', tag: '2'},
      ],
      onpressed: 'none',
    };
  }
  componentDidMount() {
    // this.props.GetMyConsultationDocuments();
    this.props.GetConsultationCompletedList();
  }
  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        console.log(item.documentPath[0]);
        if (item.documentPath[0].uri) {
          this.props.navigation.navigate('DocumentDetails', {
            uri: item.documentPath[0].uri,
            
          });

        }
      }}
      >
        <ListItem bottomDivider>
    <ListItem.Content>
      <ListItem.Title allowFontScaling={false} style={{fontFamily:Default.FontSemiBold,fontSize:16,color: 'gray'}}>{item.documentDetails.name}</ListItem.Title>
      <ListItem.Subtitle style={{color: 'gray', marginVertical: 10, fontSize: 14,fontFamily:Default.FontMedium}}>{item.documentDetails.uploadedDate}</ListItem.Subtitle>
    </ListItem.Content>
    <ListItem.Chevron />
  </ListItem>
      {/* <ListItem
        title={item.documentDetails.relationship}
        subtitle={item.documentDetails.uploadedDate}
        //badge={{ value: 3, textStyle: { color: 'orange' }, containerStyle: { marginTop: 0, } }}
        // leftAvatar={{ source: { uri: item.avatar_url } }}
        bottomDivider
        subtitleStyle={{color: 'gray', marginVertical: 10, fontSize: 12}}
        chevron
      /> */}
    </TouchableOpacity>
  );
  keyExtractor = (item, index) => index.toString();
  state = {onpressed: 'none'};
  render() {
    console.log("list",this.props.State.DocumentDetails);
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#643A25"
          translucent={false}
        />
        <SafeAreaView style={{flex: 0, backgroundColor: '#643A25'}} />
        <SafeAreaView style={styles.container}>
          <DynamicHeader
            text="Medical Reports"
            ShouldDisplayLeftIcon={true}
            leftIconImage="chevron-left"
            onPressLeftIcon={() => {
              this.props.navigation.pop();
              //this.props.navigation.navigate("Dashboard");
            }}
            ShouldDisplayRightIcon={false}
            rightIconImage="add"
            onPressRightIcon={() => {
              this.props.navigation.navigate('Dashboard');
            }}
            HeaderColour="#643A25"
          />

          {this.props.State.errorMsg == '' ? (
            <>
              {/* <Text
                allowFontScaling={false}
                style={{
                  fontSize: 18,
                  marginLeft: 25,
                  color: 'gray',
                  marginVertical: 30,
                  fontFamily:Default.FontSemiBold
                }}>
                My documents
              </Text> */}
              <View style={{marginHorizontal: 10}}>
                {
                  this.props.State.DocumentDetails!=undefined&&this.props.State.DocumentDetails.length!=0?
                  <FlatList
                  keyExtractor={this.keyExtractor}
                  data={this.props.State.DocumentDetails}
                  renderItem={this.renderItem}
                />
              :
              null
              }
              </View>
            </>
          ) : (
            <>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 16,
                  // marginLeft: 25,
                  alignSelf: 'center',
                  color: 'gray',
                  marginVertical: 30,
fontFamily:Default.FontMedium
                }}>
                {this.props.State.errorMsg}
              </Text>
            </>
          )}

          {this.state.onpressed != 'none' ? (
            <DotIndicator
              style={{alignSelf: 'center'}}
              size={6}
              color={'#36BC5A'}
            />
          ) : null}
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
MyDocuments.navigationOptions = {
  headerShown: false,
};
const mapStateToProps = state => {
  //console.log(state);
  return {State: state.DependentSignUp};
};
export default connect(
  mapStateToProps,
  actions,
)(MyDocuments);
