import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import TrackActionComponent from '../../components/TrackActionComponent';
import {DynamicHeader} from '../../components/DynamicHeader';
import {CustomButton} from '../../components/CustomButton';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import { Default } from '../../components/Default';
class ConsultationDetailsScreen extends React.Component {
  render() {
    console.log('histroy details is');

    console.log(this.props.State.historyDetails);
    var data=[];
    if (this.props.State.historyDetails!=undefined&&this.props.State.historyDetails.length!=0) {
      data=this.props.State.historyDetails;
    } else {
      data=null;
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
          <View style={{flex: 0.1}}>
            <DynamicHeader
              text="Consultation Details"
              HeaderColour="#643A25"
              ShouldDisplayRightIcon={false}
              ShouldDisplayLeftIcon={true}
              leftIconImage="chevron-left"
              onPressLeftIcon={() => this.props.navigation.pop()}
            />
          </View>
          <View style={{flex: 0.9}}>
            <View style={{flex: 1, marginTop: 30}}>
              {
                data!==null?
                <TrackActionComponent
                  DetailsArray={this.props.State.historyDetails}
                />: this.props.State.errMsg == '' ? 
                <Text
                allowFontScaling={false}
                  style={{fontSize: 18, color: 'gray', alignSelf: 'center',fontFamily:Default.FontMedium}}>
                  Details not available
                </Text>:
                 <Text
                 allowFontScaling={false}
                   style={{fontSize: 18, color: 'gray', alignSelf: 'center',fontFamily:Default.FontMedium}}>
                   {this.props.State.errMsg}
                 </Text>
              }
              {/* {this.props.State.errMsg == '' ? (
                <TrackActionComponent
                  DetailsArray={this.props.State.historyDetails}
                />
              ) : (
                <Text
                allowFontScaling={false}
                  style={{fontSize: 18, color: 'gray', alignSelf: 'center',fontFamily:Default.FontMedium}}>
                  {this.props.State.errMsg}
                </Text>)} */}
            </View>
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

//export default ConsultationDetailsScreen;
const mapStateToProps = state => {
  //console.log(state);
  return {State: state.History};
};
export default connect(
  mapStateToProps,
  actions,
)(ConsultationDetailsScreen);
