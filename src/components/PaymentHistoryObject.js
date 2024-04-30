import React, { Component } from 'react';
import { View, Button, FlatList, Text, Dimensions, TouchableOpacity } from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/Feather';
import { Default } from './Default';
class PaymentHistoryObject extends Component {
  constructor() {
    super();
    this.state = {
      selectedTag: 0,

    }
  }
  render() {

    return (
      <View style={{ flex: 1,flexDirection:'row' }}>
          <View style={{flex:.1}}>
            <Icon
              style={{ marginTop: 10 ,}}
              name="file-text"
              size={25}
              color="#36BC5A"
            />
          </View>
          <View style={{ marginTop: 10 ,flex:.7}}>
            <Text style={{fontFamily:Default.FontSemiBold,fontSize:16}}>{this.props.item.name}</Text>
            <Text style={{ marginTop: 5 ,fontFamily:Default.FontMedium,fontSize:15}}>{this.props.item.paymentStatus}</Text>
            <Text style={{ marginTop: 5, fontSize: 14, color: "gray",fontFamily:Default.FontMedium,fontSize:14 }}>On {this.props.item.createdOn}</Text>
          </View>
          <View style={{flex:.2,alignItems:'flex-end',justifyContent:'center'}}>
          <Text style={{ marginTop: 5,fontFamily:Default.FontSemiBold,fontSize:15,color:"#36BC5A" }}>{this.props.item.currencySymbol} {this.props.item.totalAmount}</Text>
          </View>
      </View>
    );
  }
}
const styles = {
  containerStyle: {


    flexDirection: 'row',


  },
  selectorContainer: {
    width: deviceWidth - 50,

    // borderWidth: 1,
    margin: 0,
    flexDirection: 'row',
    // backgroundColor:'red' ,
    justifyContent: 'space-around',




  },
  selectionObject: {
    height: 40,
    width: (deviceWidth - 50 - 40) / 2,
    marginHorizontal: 5,
    marginVertical: 20,
    alignItems: 'center'



  },
  textStyle: {
    color: 'white',
    justifyContent: 'space-around',
  }

};

export default PaymentHistoryObject;
