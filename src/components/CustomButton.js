import React from 'react';
import {Text, TouchableOpacity, Dimensions} from 'react-native';

const CustomButton = ({onPress, title, bgColor, fontColor, bottomPadding}) => {
  const {buttonStyle, textStyle} = styles;
  let deviceWidth = Dimensions.get('window').width;
  let deviceHeight = Dimensions.get('window').height;
  let buttonWidth = deviceWidth - 80;
  return (
    <TouchableOpacity
      style={[
        buttonStyle,
        {
          backgroundColor: `${bgColor}`,
          // bottom: bottomPadding,
          width: buttonWidth,
        },
      ]}
      onPress={onPress}>
      <Text
        allowFontScaling={false}
        style={[textStyle, {color: `${fontColor}`}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    alignSelf: 'center',
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    position: 'absolute',
    // width: 250,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    // color: '#4335D1',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 10,
  },
};

export {CustomButton};
