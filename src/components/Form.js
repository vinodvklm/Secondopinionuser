import React from 'react';
import {Text, View, TextInput} from 'react-native';
//import Icon from 'react-native-vector-icons/Entypo';

const Form = ({placeHolder, icon, ispassword = false}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 40,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3b4d54',
        borderRadius: 9,
      }}>
      {/* <Icon
        name={icon}
        size={30}
        style={{marginHorizontal: 10}}
        color="#3b4d54"
      /> */}
      <TextInput
        allowFontScaling={false}
        style={{
          flex: 1,
          marginRight: 10,
          height: 35,
          //backgroundColor: 'yellow',
          textAlign: 'center',
        }}
        // secureTextEntry={(type = 'password' ? true : false)}
        secureTextEntry={ispassword}
        placeholder={placeHolder}
        placeholderTextColor="#3b4d54"
      />
    </View>
  );
};
export default Form;
