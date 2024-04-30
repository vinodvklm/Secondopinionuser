import React, { Component } from 'react';
import { View, Button, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
import { Input } from 'react-native-elements';
class EditableDocumentList extends Component {
    constructor() {
        super();
        this.state = {
            selectedTag: 0,
            dataList: [{ type: "image", file: "", id: 33 }, { type: "pdf", file: "", id: 34 }, { type: "image", file: "", id: 44 }],

        }
    }

    _renderItem = ({ item }) => {
        return (
            <View
                style={{
                    padding: 10,
                    backgroundColor: 'lightgray',
                    height: 100,
                    width: 50
                }}>
                <Text>{item.key}</Text>
            </View>
        );
    };

    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.containerStyle}>
                    <Input
                        containerStyle={{}}
                        placeholder='Document Name'
                        onChangeText={value => {

                        }}
                        labelStyle={{ fontWeight: '200', fontSize: 15 }}

                    />

                    <FlatList
                        data={this.state.dataList}
                        renderItem={this._renderItem}
                        horizontal={true}
                        ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
                    />





                </View>

            </View>
        );
    }
}
const styles = {
    containerStyle: {

        height: 100

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

export default EditableDocumentList;
