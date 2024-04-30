import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    ScrollView,
    TouchableHighlight,
    TouchableNativeFeedback,
    FlatList
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import { DynamicHeader } from '../../components/DynamicHeader';
import { CustomButton } from '../../components/CustomButton';
import datePicker from 'react-native-datepicker';
import DatePicker from 'react-native-datepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import TouchableScale from 'react-native-touchable-scale';
import Calender from '../../components/Calender';
import { Overlay, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;
const ContactTypeArr = [
    { id: '1', title: 'Email', icon: 'email' },
    { id: '2', title: 'Direct Call', icon: 'call' },
    { id: '3', title: 'Direct meet', icon: 'local-hospital' },
    { id: '4', title: 'Chat', icon: 'chat' },
];

import Toast, { DURATION } from 'react-native-easy-toast';
import { Default } from '../../components/Default';
import { Image } from 'react-native';
class BookConsultationScreen extends React.Component {
    state = {
        contactType: 'none',
        contactTypeID: '',
        date: '',
        currentDate: '',
        maxDate: '',
        overlay: false,
        selectedDate: 'select date',
        isTapable: true,
        description: '',
        selectedDocx: [],
    };

    componentDidMount = async () => {

    };

    render() {
        console.log(this.props.State.isFilledQuestionnaire, "isFilledQuestionnaire/BookConsultation")
        return (
            <>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#643A25"
                    translucent={false}
                />
                <SafeAreaView style={{ flex: 0, backgroundColor: '#643A25' }} />
                <SafeAreaView style={styles.container}>
                    <View style={{ flex: 0.1 }}>
                        <DynamicHeader
                            text="Appoinment Details"
                            ShouldDisplayLeftIcon={true}
                            leftIconImage="chevron-left"
                            onPressLeftIcon={async () => {
                                await this.props.ClearSelectedDocuments();
                                this.props.navigation.pop();
                            }}
                            HeaderColour="#643A25"
                        />
                    </View>
                    <View style={{ flex: 0.9 }}>
                        <View style={{ flex: .08, }}>
                            <Text allowFontScaling={false}
                                style={{ marginHorizontal: 20, fontFamily: Default.FontSemiBold, fontSize: 16 ,marginVertical:10}}>You have requested an appointment with :</Text>
                        </View>
                        <View style={{ width: '100%', flex:.93, marginHorizontal: 20, alignSelf: 'center', paddingHorizontal: 20, flexDirection: 'row' }}>
                            <View style={{ marginTop: 10, flex: .3, }}>
                                <Image 
                                source={require('../../../assets/photo.jpg')}
                                style={{ backgroundColor: 'lightgray', width: 70, height: 70, borderRadius: 50 }} />
                            </View>
                            <View style={{ marginTop: 10, flex: .7 }}>
                                <Text allowFontScaling={false} style={{ fontSize: 16, fontFamily: Default.FontSemiBold }}>Dr. Amit Bhandarkar</Text>
                                <Text allowFontScaling={false} style={{ fontSize: 16, fontFamily: Default.FontSemiBold, marginTop: 5 }}>Orthopedic Spine Surgeon</Text>
                                <Text allowFontScaling={false} style={{ fontSize: 14, fontFamily: Default.FontMedium, marginTop: 5 }}>M.B.B.S, M.S, M.D</Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </>
        );
    }
}
const styles = {
    container: {
        flex: 1,
    },
    overlay: {
        height: Dimensions.get('window').height / 2 + 20,
        width: Dimensions.get('window').width - 40,
        alignItems: 'center',
    },
};
//export default BookConsultationScreen;
const mapStateToProps = state => {
    //console.log(state);
    return { State: state.Appoinment };
};
export default connect(
    mapStateToProps,
    actions,
)(BookConsultationScreen);
