import React, { useState } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Text, Modal, Image
} from 'react-native';
import { Default } from '../components/Default';
const Button = ({ title, onPress,opacity=1 }) => {
    return (
        <TouchableOpacity style={{
            marginHorizontal: 45, borderColor: '#36BC5A', borderWidth: 1, height: 40, marginTop: 40, borderRadius: 5,
            alignItems: 'center', justifyContent: 'center',flexDirection:'row'
        }}
            onPress={onPress}>
            <Text
                allowFontScaling={false}
                style={{ fontFamily: Default.FontSemiBold, fontSize: 16, color: '#36BC5A' }}>{title}</Text>
               <Image
                style={{ width: 20, height: 20,marginLeft:10,opacity:opacity}}
                source={require('../../assets/spine.png')} />
        </TouchableOpacity>
    )
}
export default Button;