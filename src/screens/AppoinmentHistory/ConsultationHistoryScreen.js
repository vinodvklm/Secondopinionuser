import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import {DynamicHeader} from '../../components/DynamicHeader';

import ConsultationHistoryComponent from '../../components/ConsultationHistoryComponent';
import { Default } from '../../components/Default';
const historyArr = [
  {
    id: '1',
    name: 'John Wickx',
    date: '21/11/2019',
    dependency: 'myself',
    image:
      'https://image.shutterstock.com/image-vector/medicine-logo-260nw-715548160.jpg',
    status: 'payment done',
    isDocumentAvailable: true,
  },
  {
    id: '2',
    name: 'Jhonny',
    date: '21/11/2019',
    dependency: 'brother',
    image:
      'https://image.shutterstock.com/image-vector/medicine-logo-260nw-715548160.jpg',
    status: 'waiting for additional payment',
    isDocumentAvailable: false,
  },
  {
    id: '3',
    name: 'Patient1',
    date: '21/11/2019',
    dependency: 'father',
    image:
      'https://image.shutterstock.com/image-vector/medicine-logo-260nw-715548160.jpg',
    status: 'consultation ongoing',
    isDocumentAvailable: false,
  },
  {
    id: '4',
    name: 'Patient2',
    date: '21/11/2019',
    dependency: 'friend',
    image:
      'https://image.shutterstock.com/image-vector/medicine-logo-260nw-715548160.jpg',
    status: 'consultation complete',
    isDocumentAvailable: true,
  },
];
class ConsultationHistoryScreen extends React.Component {
  componentDidMount() {
    this.props.GetHistory();
    this.props.NDIFilledStatus(false);
    this.props.QuestionnaireFilledStatus(false);
    this._unsubscribe = this.props.navigation.addListener('didFocus', () => {
      // do something
      this.props.GetHistory();
      this.props.NDIFilledStatus(false);
      this.props.QuestionnaireFilledStatus(false);
    });
  }
  render() {
    console.log('array is');
    console.log(this.props.State.consultationHistory);
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
              text="Consultation History"
              HeaderColour="#643A25"
              ShouldDisplayLeftIcon={true}
              leftIconImage="chevron-left"
              onPressLeftIcon={() =>
                this.props.navigation.navigate('Dashboard')
              }
            />
          </View>
          <View style={{flex: 0.9}}>
            {this.props.State.consultationHistory != undefined&&this.props.State.consultationHistory.length != 0 ? (
              <FlatList
                data={this.props.State.consultationHistory}
                // inverted={true}
                keyExtractor={item => item.consultationOn}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{
                      marginHorizontal: 10,
                      backgroundColor: 'white',
                      marginVertical: 10,
                      /// borderWidth: 0.25,
                      // borderRadius: 5,
                      // borderColor: '#002966',
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,
                      borderRadius:10,

                      elevation: 3,
                    }}
                    onPress={async () => {
                      await this.props.GetHistoryDetails(item.patientID);
                      this.props.navigation.navigate('ConsultationDetails');
                    }}>
                    <ConsultationHistoryComponent
                      name={item.name}
                      dependency={item.relationship}
                      date={item.consultationOn}
                      createOn={item.createdOn}
                      image="https://image.shutterstock.com/image-vector/medicine-logo-260nw-715548160.jpg"
                      status={item.consultationStatus}
                      isDocxAvailabe={item.documentAvailable}
                      consultationStatusID={item.consultationStatusID}
                      onPress={() => {
                        this.props.navigation.navigate('ConsultationInfo',{
                          item
                        });
                        this.props.DocumentCount(item.documentCount,0);
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
            ) : this.props.State.errMsg != '' ? (
              <Text 
              allowFontScaling={false}
              style={{fontSize: 18, color: 'gray', alignSelf: 'center',fontFamily:Default.FontMedium,marginTop:40}}>
                {this.props.State.errMsg}
              </Text>
            ) : (
              <Text 
              allowFontScaling={false}
              style={{fontSize: 18, color: 'gray', alignSelf: 'center',fontFamily:Default.FontMedium,marginTop:40}}>
               Data not available
              </Text>
            )}
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
//export default ConsultationHistoryScreen;
const mapStateToProps = state => {
  //console.log(state);
  return {State: state.History};
};
export default connect(
  mapStateToProps,
  actions,
)(ConsultationHistoryScreen);
