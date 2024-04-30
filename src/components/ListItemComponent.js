import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ListItemComponent = ({title, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        alignSelf: 'center',
        backgroundColor: '#f2f2f2',
        //   item.status == 'completed'
        //     ? '#00802b'
        //     : item.status == 'payment'
        //     ? '#ffe0b3'
        //     : 'gray',
        height: 60,
        width: Dimensions.get('window').width - 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,

        elevation: 2,
        flexDirection: 'row',
        // borderTopLeftRadius: 25,
        borderWidth:1,
        borderRadius:5,
        borderColor:'#36BC5A'
      }}
      onPress={onPress}>
      <View style={{flex: 0.95}}>
        <Text allowFontScaling={false} style={{marginLeft: 10, fontSize: 14}}>
          {title}
        </Text>
      </View>
      <View
        style={{
          flex: 0.15,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MaterialIcons name="keyboard-arrow-right" size={30} color="gray" />
      </View>
    </TouchableOpacity>
  );
};
export default ListItemComponent;
