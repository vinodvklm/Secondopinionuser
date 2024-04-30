import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Button,Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Default } from './Default';

//https://oblador.github.io/react-native-vector-icons/
const DynamicHeader = ({
  text,
  HeaderColour,
  onPressLeftIcon,
  onPressRightIcon,
  ShouldDisplayRightIcon = false,
  ShouldDisplayLeftIcon = false,
  leftIconImage,
  rightIconImage,
}) => {
  const {textStyle, viewStyle, imageStyle, imageStyle2} = styles;
  return (
    <View style={[viewStyle, {backgroundColor: `${HeaderColour}`, opacity: 1}]}>
      {ShouldDisplayLeftIcon ? (
        <TouchableOpacity onPress={onPressLeftIcon}>
          <Icon
            style={imageStyle}
            name={leftIconImage}
            size={25}
            color="white"
          />
        </TouchableOpacity>
      ) : (
        <Image style={{width: 10, height: 10}} />
      )}

      <Text allowFontScaling={false} style={textStyle}>
        {text}
      </Text>
      <View>
        {ShouldDisplayRightIcon ? (
          <TouchableOpacity onPress={onPressRightIcon}>
            {/* <Icon
              style={imageStyle}
              name={rightIconImage}
              size={25}
              color="white"
            /> */}
            <MaterialIcons size={27} style={imageStyle} name={rightIconImage} />
          </TouchableOpacity>
        ) : (
          <Image source={require('../../assets/spine.png')} style={styles.imageStyle2} />
        )}
      </View>
    </View>
  );
};
const styles = {
  textStyle: {
    fontSize: 22,
    marginTop: 15,
    color: 'white',
    paddingLeft: 20,
    top: -5,
    flex: 1,
    fontFamily:Default.FontBold
  },
  viewStyle: {
    height: 60,
    //marginTop: 18,
    //justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    //shadowColor: 'black',
    //shadowOffset: {width: 0, height: 2},
    //shadowOpacity: 0.2,
    elevation: 1,
    position: 'relative',
  },
  imageStyle: {
    height: 25,
    width: 25,
    margin: 10,
    color: 'white',
  },
  imageStyle2: {
    height: 23,
    width: 23,
    marginRight: 20,
    alignSelf: 'flex-end',
  },
  bluetoothIconStyle: {
    height: 32,
    width: 32,
    paddingRight: 10,
  },
};

export {DynamicHeader};
