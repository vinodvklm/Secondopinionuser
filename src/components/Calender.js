import React, {Component, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import TouchableScale from 'react-native-touchable-scale';

import moment from 'moment';
import { Default } from './Default';
const minDate = new Date();
const maxDate = new Date(2021, 9, 1);
var sundaysDisabled = [
  moment('17/06/2020', 'D/M/YYYY'),
  moment('27/06/2020', 'D/M/YYYY'),
  moment('14/06/2020', 'D/M/YYYY'),
];

//const Calendar = ({onDateChange}) =>
class Calendar extends React.Component {
  //const [currentView, setCurrentView] = useState('Calendar');
  state = {
    currentView: 'Calendar',
    availableDates: [],
    selectedTimeID: '',
    selectedDate: '',
    selectedTime:'',
  };
componentDidMount=()=>{
console.log("maxDate",this.state.maxDate);
var date = new Date(2021, 7, 13); //To get the Current Date
var month = new Date().getMonth() + 1; //To get the Current Month
var newMonth =month+3;
var year = new Date().getFullYear();
var maxDate= year+'-'+newMonth+'-'+'30';

console.log("month",new Date(moment(maxDate,'YYYY-M-DD').format('YYYY-MM-DD')));
this.setState({maxDate:moment(maxDate,'YYYY-M-DD').format('YYYY-MM-DD')})
}

GetUnAvailbeArr=()=>{
var UnavailableArr = [];
let array = this.props.State.doc_unavailableDates

for (let index = 0; index < array.length; index++) {
  const element = array[index].date;
  let UnavailableElement = moment(element,'D/M/YYYY')
  UnavailableArr=[...UnavailableArr,UnavailableElement]
}

  return  UnavailableArr;
}
  render() {
    console.log("maxDate",this.state.maxDate);
    console.log("Doc time slots:",this.props.State.doc_timeslots);
    return (
      <>
        {this.state.currentView == 'Calendar' ? (
          <CalendarPicker
            onDateChange={async date => {
              let Date = moment(date).format('DD-MM-YYYY');
              console.log(Date);
              await this.props.GetTimeSlots(
                Date,
                this.props.State.contactTypeID,
              );

              this.setState({currentView: 'Time', selectedDate: Date});
              //onDateChange(Date);
            }}
            // maxDate={new Date(this.state.maxDate)}
            minDate={minDate}
            disabledDatesTextStyle={{color: 'red'}}
            disabledDates={this.GetUnAvailbeArr()}//{this.props.State.doc_unavailableDates}
            //customDatesStyles={{color: 'green'}}
          />
        ) : (
          <View style={{flex: 1}}>
            <Text allowFontScaling={false} style={{alignSelf: 'center',fontFamily:Default.FontMedium,fontSize:14,marginBottom:10}}>
              Communication Type: {this.props.State.contactType}
            </Text>
            {
              this.props.State.doc_timeslots!=undefined && this.props.State.doc_timeslots.length!=0?
              <FlatList
              contentContainerStyle={{alignItems:'center',paddingHorizontal:10}}
              data={this.props.State.doc_timeslots}
              keyExtractor={item => item.doctorAvailabilityDetailID}
              numColumns={2}
              renderItem={({item}) => {
                if (item.communicationType == this.props.State.contactType) {
                  return (
                    <>
                      <TouchableScale
                      style={{
                        backgroundColor:
                          this.state.selectedTimeID ==
                          item.doctorAvailabilityDetailID
                            ? '#36BC5A'
                            : null,
                        borderWidth:
                          this.state.selectedTimeID ==
                          item.doctorAvailabilityDetailID
                            ? null
                            : 1,
                        borderColor: 'gray',
                        marginVertical: 10,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal:10,
                        paddingHorizontal:5,
                        paddingVertical:5
                      }}
                      onPress={async () => {
                        await this.props.AddSelectedTimeAndDate({
                          date: this.state.selectedDate,
                          timeID: item.doctorAvailabilityDetailID,
                          selectedTimeFrom:item.timeFrom,
                          selectedTimeTo:item.timeTo
                        });
                        this.setState({
                          selectedTimeID: item.doctorAvailabilityDetailID,
                        });
                      }}>
                      <Text allowFontScaling={false}
                      style={{fontSize:Default.FontMedium,fontSize:14}}>
                        {item.timeFrom} To {item.timeTo}
                      </Text>
                    </TouchableScale>
                    </>
                  );
                }
              }}
            />:
            
                    <Text allowFontScaling={false} style={{alignSelf: 'center',fontFamily:Default.FontMedium,fontSize:14}}>Time not available try after sometimes</Text>
            }
           
          </View>
        )}
      </>
    );
  }
}
//export default Calendar;
const mapStateToProps = state => {
  //console.log(state);
  return {State: state.Appoinment};
};
export default connect(
  mapStateToProps,
  actions,
)(Calendar);
