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
    FlatList,
} from 'react-native';
import { DynamicHeader } from '../../components/DynamicHeader';
import { ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import { DotIndicator } from 'react-native-indicators';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import DependentListObject from '../../components/DependentListObject'


import CardView from 'react-native-rn-cardview'
import PaymentHistoryObject from '../../components/PaymentHistoryObject';
import { Default } from '../../components/Default';
const list = [
    {
        name: 'My Self',
        avatar_url:
            '../../../assets/user.png',
        subtitle: '21/11/2019',
        icon: 'av-timer'
    },
    {
        name: 'Brother',
        avatar_url:
            'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: '21/10/2019',
        icon: 'av-timer'
    },
];



class PaymentHistory extends React.Component {
    constructor() {
        super();
        this.state = {
            medicalReports: [{ item: "history record one", tag: "1" }, { item: "history record two", tag: "2" },
            ],
            onpressed: 'none',

        }
    }
    componentDidMount=()=>{
        this.props.PaymentHistory();
    }
    renderItem = ({ item }) => (
        // <TouchableOpacity onPress={() => {
        //    // this.props.navigation.navigate('DocumentDetails');


        // }}>
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <CardView
            
                    cardElevation={1}
                    maxCardElevation={1}
                    radius={6}
                    backgroundColor="white">
                    <View style={{ marginVertical: 15, marginHorizontal: 10 ,flex:1}}>
                        <PaymentHistoryObject title="Sample" item={item}/>
                    </View>
                </CardView>
            </View>
        // </TouchableOpacity>
    )
    keyExtractor = (item, index) => index.toString()
    state = { onpressed: 'none' };
    render() {
        return (
            <>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#643A25"
                    translucent={false}
                />
                <SafeAreaView style={{ flex: 0, backgroundColor: '#643A25' }} />
                <SafeAreaView style={styles.container}>

                    <DynamicHeader
                        text="Payment History"
                        ShouldDisplayLeftIcon={true}
                        leftIconImage="chevron-left"
                        onPressLeftIcon={() => {
                            this.props.navigation.navigate("Profile");
                        }}
                        ShouldDisplayRightIcon={false}
                        rightIconImage="add"
                        onPressRightIcon={() => {
                            this.props.navigation.navigate("Dashboard");
                        }}
                        HeaderColour="#643A25"
                    />
                    {
                        this.props.State.paymentHistory!=undefined&&this.props.State.paymentHistory.length!=0?
                        <View style={{ marginHorizontal: 10 }}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.props.State.paymentHistory}

                            renderItem={this.renderItem}

                        />

                    </View>:
                    this.props.State.errorMsg != '' ? (
                        <Text 
                        allowFontScaling={false}
                        style={{fontSize: 18, color: 'gray', alignSelf: 'center',fontFamily:Default.FontMedium,marginTop:40}}>
                          {this.props.State.errorMsg}
                        </Text>
                      ) : (
                        <Text 
                        allowFontScaling={false}
                        style={{fontSize: 18, color: 'gray', alignSelf: 'center',fontFamily:Default.FontMedium,marginTop:40}}>
                          Data not available
                        </Text>
                      )
                    }
                    {this.state.onpressed != 'none' ? (
                        <DotIndicator
                            style={{ alignSelf: 'center' }}
                            size={6}
                            color={'#36BC5A'}
                        />
                    ) : null}
                </SafeAreaView>
            </>
        );
    }
}
const styles = {
    container: {
        flex: 1,
    },
};
//export default NewConsultationScreen;
PaymentHistory.navigationOptions = {
    headerShown: false,
};
const mapStateToProps = state => {
    //console.log(state);
    return { State: state.DependentSignUp };
};
export default connect(
    mapStateToProps,
    actions,
)(PaymentHistory);
