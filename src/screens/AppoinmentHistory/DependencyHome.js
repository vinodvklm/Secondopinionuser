import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {DynamicHeader} from '../../components/DynamicHeader';
import {CustomButton} from '../../components/CustomButton';
import {TagSelect} from 'react-native-tag-select';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import { Default } from '../../components/Default';
const ScreenWidth = Dimensions.get('window').width;
const RelastionArray = [
  'Father',
  'Mother',
  'Son',
  'Daughter',
  'GrandParents',
  'Wife',
  'Brother',
  'Sister',
  'Friend',
];
class DependencyHome extends React.Component {
  state = {ConsultationFor: 'null', currentItemOntag: 'Father'};
  ConsultationButtonClicked = tag => {
    switch (tag) {
      case 'Myself':
        this.setState({ConsultationFor: 'M'});
        break;
      case 'Others':
        this.setState({ConsultationFor: 'O'});
        break;
      default:
        break;
    }
  };
  componentDidUpdate(prevProps, prevState, prevContext) {
    if (prevProps !== this.props) {
      const value = {};

      this.props.value.forEach(val => {
        value[val[[this.props.keyAttr]] || val] = val;
      });

      this.setState({value});
    }
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex: 0.1}}>
          <DynamicHeader
            text="Dependency Circle"
            HeaderColour="#33adff"
            ShouldDisplayRightIcon={true}
          />
        </View>
        <View style={{flex: 0.4}}>
          <View style={{flex: 1}}>
            <Text
              allowFontScaling={false}
              style={{fontSize: 16, marginLeft: 20, marginTop: 20,fontFamily:Default.FontSemiBold}}>
              Consultation for :
            </Text>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{
                backgroundColor:
                  this.state.ConsultationFor == 'M' ? '#b3b3b3' : null,
                height: 45,
                alignSelf: 'center',
                width: ScreenWidth - 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderColor:
                  this.state.ConsultationFor != 'M' ? '#b3b3b3' : null,
                borderWidth: this.state.ConsultationFor != 'M' ? 1 : null,
                shadowColor: '#595959',
                shadowOffset: {
                  width: 0,
                  height: 9,
                },
                shadowOpacity: 0.48,
                shadowRadius: 11.95,

                elevation: 18,
              }}
              onPress={() => this.ConsultationButtonClicked('Myself')}>
              <Text allowFontScaling={false} style={{fontFamily:Default.FontMedium,fontSize:14}}>Myself</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{
                backgroundColor:
                  this.state.ConsultationFor == 'O' ? '#b3b3b3' : null,
                height: 45,
                alignSelf: 'center',
                width: ScreenWidth - 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                borderColor:
                  this.state.ConsultationFor != 'O' ? '#b3b3b3' : null,
                borderWidth: this.state.ConsultationFor != 'O' ? 1 : null,
                shadowColor: '#595959',
                shadowOffset: {
                  width: 0,
                  height: 9,
                },
                shadowOpacity: 0.48,
                shadowRadius: 11.95,

                elevation: 18,
              }}
              onPress={() => this.ConsultationButtonClicked('Others')}>
              <Text allowFontScaling={false} style={{fontFamily:Default.FontMedium,fontSize:14}}>Others</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 0.4}}>
          {this.state.ConsultationFor == 'O' ? (
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text allowFontScaling={false} style={{fontFamily:Default.FontMedium,fontSize:14}}>
                Please enter the dependent relationship
              </Text>
              <TagSelect
                //data={Object.keys(this.props.State.additionalParams)}
                value={[this.state.currentItemOntag]}
                data={RelastionArray}
                max={1}
                ref={tag => {
                  this.tag = tag;
                }}
                onItemPress={tag => {
                  console.log(tag);
                  this.setState({currentItemOntag: tag});
                }}
                containerStyle={{justifyContent: 'center', marginTop: 30}}
                itemStyle={{
                  //backgroundColor: 'white',
                  borderColor: 'gray',
                  borderWidth: 0.5,
                }}
                itemLabelStyle={{color: '#104a54', fontSize: 10,fontFamily:Default.FontMedium}}
                itemStyleSelected={{
                  backgroundColor: '#b3b3b3',
                  borderColor: 'gray',
                  borderWidth: 0.5,
                }}
                itemLabelStyleSelected={{
                  color: '#104a54',
                  fontSize: 10,
                  fontFamily:Default.FontMedium
                }}
              />
            </View>
          ) : null}
        </View>
        <View style={{flex: 0.1}}>
          <CustomButton
            title="Continue"
            bgColor="#cce6ff"
            fontColor="#001a00"
          />
        </View>
      </SafeAreaView>
    );
  }
}
// onPress, title, bgColor, fontColor, bottomPadding
const styles = {
  container: {
    flex: 1,
    //backgroundColor: 'gray',
  },
};
//export default DependencyHome;
const mapStateToProps = state => {
  //console.log(state);
  return {State: state.SignIn};
};
export default connect(
  mapStateToProps,
  actions,
)(DependencyHome);
