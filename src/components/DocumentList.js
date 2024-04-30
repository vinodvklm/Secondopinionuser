import React, { Component } from 'react';
import { View, Button, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/AntDesign';
class DocumentList extends Component {
    constructor() {
        super();
        this.state = {
            selectedTag: 0,
            //dataList:[{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }],

        }
    }

    _renderItem = ({ item }) => {

        var iconName = item.type == "image" ? "jpgfile1" : "pdffile1"

        return (


            <View 
                style={{
                    padding: 0,
                    backgroundColor: '#a1d7f7',
                    height: 100,
                    width: 50,
                    borderRadius: 7
                }}>
                <Icon
                    style={{ alignSelf: "center", marginTop: 10 }}
                    name={iconName}
                    size={25}
                    color="white"
                />
            </View>
        );
    };

    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.containerStyle}>
                    <Text style = {{marginVertical:20,fontWeight:"600"}}>{this.props.documentName}</Text>


                   
                    <FlatList
                                
                                data={this.props.listData}
                                keyExtractor={(item) => {
                                    return item.documentPath;

                                }}
                                renderItem={this._renderItem}
                                horizontal={true}
                                ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
                            />





                </View>
                <View style = {{flexDirection:'row',height:40,top:20,width:deviceWidth-60,backgroundColor:"clear",marginVertical:10}}> 
                

                <View style = {{flexDirection: 'row', alignContent:'space-between'}}> 
                <View >
                <Text style = {{marginRight:5,top:5,color:"gray"}}>Accessability    </Text>
                    </View>
                    <TouchableOpacity onPress = {()=>{

                        this.props.onTapAccessability();

                    }}>
              <Icon
               style = {{marginLeft:5}}
                name="eye"
                size={25}
                color="#5cd65c"
              />
              </TouchableOpacity>
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

export default DocumentList;
