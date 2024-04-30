import React, { Component } from 'react';
import { View, Button, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/AntDesign';
class DependentListObject extends Component {
    constructor() {
        super();
        this.state = {
            selectedTag: 0,
            dataList:[{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }],

        }
    }

    
    render() {

        return (
            <View style={{ flex: 1 }}>
               
                <View style = {{flexDirection:'row',height:40,top:20,width:deviceWidth-60,justifyContent:'space-between',backgroundColor:"clear",marginVertical:10}}> 
                <View>
                <Text style = {{marginLeft:0,top:5,color:"gray"}}>Can accessible always</Text>
                </View>

                <View > 
              <Icon
               style = {{marginRight:5}}
                name="eye"
                size={25}
                color="#5cd65c"
              />
              </View>

                </View>

            </View>
        );
    }
}
const styles = {
    containerStyle: {

        height: 100,
     

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
    },
    container: {
        backgroundColor: 'gray',
        flex: 1,
    },

};

export default DependentListObject;
