import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import Dash from 'react-native-dash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Actions = [
  {title: 'Appoinment accepted', id: '1', status: 'completed'},
  {title: 'Payment success', id: '3', status: 'completed'},
  {title: 'Consultation ongoing', id: '4', status: 'completed'},
  {title: 'Waiting for additional payment', id: '2', status: 'payment'},
  {title: 'Consultation Completed', id: '5', status: 'incomplete'},
];
const TrackActionComponent = ({DetailsArray}) => {
  return (
    <View style={{flex: 1,marginBottom:20}}>
      <FlatList
        bounces={false}
        data={DetailsArray}
        contentContainerStyle={{paddingBottom:20}}
        keyExtractor={(item, index) => item.id}
        renderItem={({item, index}) => (
          <View style={{alignItems: 'center'}}>
            {item.status != 'payment' ? (
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: 'white',
                  // backgroundColor:
                  //   item.status == 'completed'
                  //     ? '#56c596' //'#00802b'
                  //     : item.status == 'payment'
                  //     ? '#FFE3B3' //'#ffe0b3'
                  //     : '#ACB5A0',
                  height: 50,
                  width: Dimensions.get('window').width - 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,

                  elevation: 4,
                  flexDirection: 'row',
                  borderTopLeftRadius: 25,
                }}>
                <View
                  style={{
                    flex: 0.15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    //backgroundColor: 'gray',
                  }}>
                  {item.currentStatus !== false ? (
                    <MaterialIcons
                      name="radio-button-checked"
                      size={20}
                      color="#36BC5A"
                    />
                  ) : (
                    <MaterialIcons name="radio-button-unchecked" size={20} />
                  )}
                </View>
                <View style={{flex: 0.9}}>
                  <Text>{item.consultationStatus}</Text>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  backgroundColor:
                    item.status == 'completed'
                      ? '#00802b'
                      : item.status == 'payment'
                      ? '#ffe0b3'
                      : 'gray',
                  height: 50,
                  width: Dimensions.get('window').width - 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  //borderRadius: 10,
                  //borderWidth: 1,
                  //borderColor: 'gray',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,

                  elevation: 4,
                  flexDirection: 'row',
                  borderTopLeftRadius: 25,
                }}>
                <View
                  style={{
                    flex: 0.15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: 'gray',
                  }}>
                  <MaterialIcons name="radio-button-unchecked" size={20} />
                </View>
                <View style={{flex: 0.7}}>
                  <Text>{item.title}</Text>
                </View>
                <View
                  style={{
                    flex: 0.15,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialIcons name="keyboard-arrow-right" size={30} />
                </View>
              </TouchableOpacity>
            )}
            {index < DetailsArray.length - 1 ? (
              <View
                style={{
                  alignItems: 'flex-start',
                  width: Dimensions.get('window').width - 50,
                  // backgroundColor: 'yellow',
                  flexDirection: 'row'
                }}>
                <View
                  style={{
                    flex: 0.15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: 'blue',
                  }}>
                  <Dash
                    style={{
                      width: 1,
                      height: 50,
                      flexDirection: 'column',
                      // marginLeft: 20,
                    }}
                  />
                </View>
                <View style={{flex: 0.85}} />
                {/* <MaterialIcons name="arrow-drop-down" size={25} /> */}
              </View>
            ) : null}
          </View>
        )}
      />
    </View>
  );
};
export default TrackActionComponent;
