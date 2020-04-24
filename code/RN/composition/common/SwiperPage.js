import React, { Component } from 'react'
import { Text,View,StyleSheet,TouchableOpacity,Image,AsyncStorage} from 'react-native'
import Swiper from 'react-native-swiper';
export default class SwiperPage extends Component {
    start=()=>{
        AsyncStorage.setItem('isInstall','true',()=>{
            console.log('store end');
            this.props.afterInstall();
        });
        
    };
    render() {
        return (
                // <Swiper style={styles.wrapper} showsButtons={true}>
                //     <View style={styles.slide1}>
                //         <Text style={styles.text}>Hello Swiper</Text>
                //     </View>
                //     <View style={styles.slide2}>
                //         <Text style={styles.text}>Beautiful</Text>
                //     </View>
                //     <View style={styles.slide3}>
                //         <Text style={styles.text}>And simple</Text>
                //     </View>
                // </Swiper>
            // <View>
                <Swiper style={styles.wrapper} showsButtons={false}>
                    <View style={styles.slide1}>
                    <Image style={styles.img} source={require('../../assets/bg5.jpg')} />
                    </View>
                    <View style={styles.slide1}>
                    <Image style={styles.img} source={require('../../assets/bg6.jpg')} />
                    </View>
                    <View style={styles.slide1}>
                    <Image style={styles.img} source={require('../../assets/bg7.jpg')} />
                    <TouchableOpacity onPress={this.start} style={styles.start}>
                        <Text style={{color: '#fff'}}>开始体验</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
            // </View>
        )
    }
}
const styles = StyleSheet.create({
    img:{
        width: '100%',
        height: '100%'
    },
    slide1: {
      flex: 1,
      height: '100%',
      alignItems: 'center',
    },
    start: {
      bottom: 150,
      width: 120,
      height: 40,
      // textAlignVertical: 'center',文本垂直居中
      backgroundColor: 'red',
      borderRadius: 20,
      alignItems:'center',
      justifyContent:'center'
    },
  });
// const styles = StyleSheet.create({
//     wrapper: {},
//     slide1: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#9DD6EB'
//     },
//     slide2: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#97CAE5'
//     },
//     slide3: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#92BBD9'
//     },
//     text: {
//       color: '#fff',
//       fontSize: 30,
//       fontWeight: 'bold'
//     }
//   })