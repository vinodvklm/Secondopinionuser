import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    Alert,
    ScrollView,
    SafeAreaView,
    StatusBar

} from 'react-native';
import Form from '../../components/Form';
import firebase from 'react-native-firebase';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { DynamicHeader } from '../../components/DynamicHeader'
import CustomButton from '../../components/CButton';
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Input } from 'react-native-elements';
import { Default } from '../../components/Default';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

class DependencySelectionOne extends React.Component {


    state = {
        relation: '',
        showIndicator: false,
        dependantValue: 0,
        isDebugging: false,
    };

    radio_props = [
        { label: 'For Myself', value: 0 },
        { label: 'For Others', value: 1 }
    ];



    showAlert = (title, message) => {
        Alert.alert(
            title,
            message,
            [{ text: 'OK', onPress: () => console.log('OK Pressed/DependencySection') }],
            { cancelable: false },
        );
    };
    componentDidMount() {
        //enable tis for debugging
        this.setState({ isDebugging: true });
    }
    render() {
        return (
            <>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#7ecaf3"
                    translucent={false}
                />
                <SafeAreaView style={{ flex: 0, backgroundColor: '#7ecaf3' }} />
                <KeyboardAvoidingView
                    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    enabled
                >
                    <SafeAreaView style={styles.container}>
                        <DynamicHeader
                            text="Document Upload"
                            ShouldDisplayLeftIcon={false}
                            leftIconImage="chevron-left"
                            onPressLeftIcon={() => {
                                console.log("tapped")

                            }}
                            HeaderColour="#7ecaf3"

                        />


                        <Text
                            allowFontScaling={false}
                            style={styles.otpMessageStyle}>
                            Please choose for whom you are going to upload medical documents for
              </Text>


                        <View style={styles.dropdown}>
                            <RadioForm
                                radio_props={this.radio_props}
                                initial={0}
                                formHorizontal={false}
                                labelHorizontal={true}
                                buttonColor={'#2196f3'}
                                animation={true}
                                onPress={(value) => {
                                    this.setState({ dependantValue: value });

                                }}
                            />

                        </View>

                        {this.state.dependantValue == 0 ? null :

                            <View>
                                <Text
                                    allowFontScaling={false}
                                    style={styles.dependantNameLabel}>
                                    Please enter the depenent relationship
                            </Text>

                                <Input
                                    containerStyle={{ marginHorizontal: 30, width: deviceWidth - 60, marginTop: 20 }}
                                    placeholder='Relationship'
                                    onChangeText={value => {

                                        this.setState({ relation: value });

                                    }}
                                    labelStyle={{ fontSize: 15, fontFamily: Default.FontMedium }}

                                />


                            </View>


                        }
                        <Button
                            style={styles.signinButtonStyle}
                            title="Continue"
                            type="outline"
                            onPress={() => {





                                this.setState({ showIndicator: true });
                                if (this.state.dependantValue == 0) {
                                    this.props.navigation.navigate('UploadMedicalDetails', { fromRegisterPage: true, registrationType: "user" });


                                } else {

                                    if (this.state.relation.length == 0) {
                                        this.showAlert('Message', 'Please fill the relationship field');

                                        return;
                                    }

                                    this.props.navigation.navigate("DependantDetails", { fromListPage: false, relation: this.state.relation });

                                }
                                //this.SignInServiceAction();
                            }}
                        />
                        <CustomButton title={Continue}
                            onPress={() => {
                                this.setState({ showIndicator: true });
                                if (this.state.dependantValue == 0) {
                                    this.props.navigation.navigate('UploadMedicalDetails', { fromRegisterPage: true, registrationType: "user" });
                                } else {
                                    if (this.state.relation.length == 0) {
                                        this.showAlert('Message', 'Please fill the relationship field');
                                        return;
                                    }
                                    this.props.navigation.navigate("DependantDetails", { fromListPage: false, relation: this.state.relation });
                                }
                            }} />
                    </SafeAreaView>
                </KeyboardAvoidingView>


            </>
        );
    }

}
const styles = StyleSheet.create({
    otpMessageStyle: {
        borderColor: '#2edccd',
        marginTop: 20,
        marginHorizontal: 30,
        color: 'darkgray',
        fontSize: 15,
        fontFamily: Default.FontSemiBold
    },
    dropdown: {
        marginHorizontal: 35,
        marginVertical: 30,
    },
    dependantNameLabel: {
        borderColor: '#2edccd',
        marginTop: 10,
        marginHorizontal: 30,
        color: 'darkgray',
        fontSize: 15,
        fontFamily: Default.FontSemiBold
    },
    signinButtonStyle: {
        borderColor: 'black',
        marginTop: 20,
        height: 40,
        marginHorizontal: 30,
    },
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});
DependencySelectionOne.navigationOptions = {
    headerShown: false,
};
export default DependencySelectionOne;
