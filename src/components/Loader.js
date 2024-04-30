import React, {Component} from 'react';
import {View, Button, FlatList,Text,Dimensions,TouchableOpacity} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
import {Overlay} from 'react-native-elements';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';
class Loader extends Component {
    constructor() {
      super();
      this.state = {
        selectedTag:0,
        isTapable:true
      
     }
    }
      render(){

      return (
          <View style ={{flex:1}}>
            <Overlay
            isVisible={!this.state.isTapable}
            overlayStyle={{backgroundColor: 'transparent'}}>
            <View
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                backgroundColor: 'lightgray',
                
              }}
            > <DotIndicator color="#36BC5A" /></View>
          </Overlay>
            
   
        </View>
      );
    }
    }
    const styles = {
      containerStyle: {
      
          height:70
 
      },
      selectorContainer:{
        width: deviceWidth-50,
        
       // borderWidth: 1,
        margin: 0,
        flexDirection: 'row',
       // backgroundColor:'red' ,
        justifyContent:'space-around',
       
        
      
       
      },
      selectionObject:{
          height: 40,
          width:(deviceWidth-50-40)/2,
          marginHorizontal:5,
          marginVertical:20,
          alignItems:'center'

          
          
      },
      textStyle:{
        color:'white',
        justifyContent:'space-around',
      }
      
    };
    
    export default Loader;
    