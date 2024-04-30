import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Default } from './Default';
const ConsultationHistoryComponent = ({
  name,
  date,
  image,
  status,
  dependency,
  isDocxAvailabe,
  onPress,
  consultationStatusID,
  createOn
}) => {
  return (
    <View style={{ flex: 1, paddingVertical: 10, flexDirection: 'row', paddingHorizontal: 15 }}>
      <View style={{ flex: .2, or: 'pink', }}>
        {/* <Image source={require("../../assets/stethoscope.png")}
          style={{ height: 50, width: 50 }} /> */}
          <View style={{width:50,height:50,borderRadius:50,backgroundColor:'#71D68C',alignItems:'center',justifyContent:'center'}}>
          <Image source={require("../../assets/doctor.png")}
          style={{ height: 30, width: 30 }} />
          </View>
      </View>
      <View style={{ flex: .8 }}>
        <Text
          allowFontScaling={false}
          style={{ fontSize: 18, fontFamily: Default.FontSemiBold }}>
          {name}
        </Text>
        <Text
          allowFontScaling={false}
          style={{ fontSize: 15, color: 'gray', fontFamily: Default.FontMedium, marginTop: 2 }}>
          {dependency}
        </Text>
        <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name={"clockcircleo"} size={15} color={'#36BC5A'} />
          <Text
            allowFontScaling={false}
            style={{ fontSize: 14, color: 'gray', fontFamily: Default.FontMedium, marginLeft: 7 }}>
            {date}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 14,
              fontFamily: Default.FontMedium,
              color: status === 'Payment successfull' ?
                '#e68a00' : status === 'Appoinment Accepted ' ?
                  '#4d79ff' : status === 'Documents uploaded' ?
                    '#7ecaf3' : status === 'Consultation Ongoing ' ?
                      '#00b300' : status === 'Consultaion Completed' ?
                        '#00b300' : 'black'
            }}
          >
            {status}
          </Text>
           {
             consultationStatusID!==5&&consultationStatusID!==6?
             <TouchableOpacity
             onPress={onPress}
             style={{ paddingHorizontal: 15, height: 30, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#36BC5A'}}>
             <Text allowFontScaling={false}
               style={{ fontFamily: Default.FontSemiBold, fontSize: 14, color: 'white' }}>Add Details</Text>
           </TouchableOpacity>:
           null
           }
          </View>
      </View>
      {/* <View style={{  flexDirection: 'row', alignItems: 'center',flex:.6}}>
        <Image
          source={{ uri: image }}
          style={{ height: 80, width: 80, borderRadius: 40, margin: 15 }}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Text
            allowFontScaling={false}
            style={{ fontSize: 18, fontFamily:Default.FontSemiBold }}>
            {name}
          </Text>
          <Text
            allowFontScaling={false}
            style={{ fontSize: 15,  color: 'gray',fontFamily:Default.FontMedium,marginTop:2 }}>
            {dependency}
          </Text>
          <Text
            allowFontScaling={false}
            style={{ fontSize: 13,  color: 'gray',fontFamily:Default.FontMedium,marginTop:2  }}>
              Created On:{" "}
            {createOn}
          </Text>
           <Text
            allowFontScaling={false}
            style={{ fontSize: 13,  color: 'gray',fontFamily:Default.FontMedium,marginTop:2  }}>
              Consultation On:{" "}
            {date}
          </Text>
        </View>
      </View>
      <View style={{ marginVertical:5,flex:.1}}>
        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
          <Text
            allowFontScaling={false}
            style={{ fontSize: 13, fontFamily:Default.FontMedium  }}>
            Status :
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 13,
              fontFamily:Default.FontMedium ,
              //fontStyle: 'italic',
              // color:
              //   status == 'waiting for additional payment'
              //     ? '#ff704d'
              //     : status == 'consultation complete'
              //       ? '#00b300'
              //       : status == 'payment done'
              //         ? '#e68a00'
              //         : status == 'Appoinment Accepted'
              //           ? '#4d79ff'
              //           : 'black',
              color:status==='Payment successfull'?
              '#e68a00': status==='Appoinment Accepted '? 
              '#4d79ff': status==='Documents uploaded'? 
              '#7ecaf3':status==='Consultation Ongoing '?
              '#00b300':status==='Consultaion Completed'?
              '#00b300':'black'
            }}
            >{' '}
            {status}
          </Text>
        </View>

        {/* <View style={{  flexDirection: 'row', marginLeft: 20 }}>
          {isDocxAvailabe == true ? (
            <Text
              allowFontScaling={false}
              style={{ fontSize: 13, fontWeight: '500', color: '#ff704d' }}>
              document available
            </Text>
          ) : null}
        </View> */}
      {/* </View> */}
      {/* { */}
      {/* //    consultationStatusID!==5&&consultationStatusID!==6?
    //     <View style={{ alignItems: 'flex-end',flex:.3}}>
    //     <TouchableOpacity  */}
      {/* //     onPress={onPress}
    //     style={{ paddingHorizontal: 10, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#36BC5A', marginHorizontal: 20,  }}>
    //       <Text allowFontScaling={false} */}
      {/* //         style={{ fontFamily: Default.FontSemiBold, fontSize: 14, color: 'white' }}>Add Details</Text> */}
      {/* //     </TouchableOpacity> */}
      {/* //   </View>:null */}
      {/* //  } */}
    </View>
  );
};
export default ConsultationHistoryComponent;
