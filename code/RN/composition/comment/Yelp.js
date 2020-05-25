import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Image, FlatList, ScrollView, AsyncStorage, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
const s = width / 640;
export default class Yelp extends Component {
    render() {
        return (
            <View>
                <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', borderBottomColor:'gray',borderBottomWidth:1 }}>
                    <TouchableOpacity style={{ left: 20 * s, }} onPress={() => Actions.pop()}>
                        <Icon name="left" color="#333" size={35 * s} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: '#333', fontSize: 30 * s, left: width * 0.34 }}>邀请方式</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around',padding: 60*s, backgroundColor:'#fff'}}>
                    <View>
                    <TouchableOpacity onPress={()=>{Actions.havewrite({tid:this.props.tid})}}>
                        <Image source={require('../../assets/composition/mine/write0.png')} style={{marginLeft: 16*s}}/>
                        <Text style={{fontSize: 24*s, marginTop:10*s,}}>已写文章</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>{Actions.addEssay1({tid:this.props.tid})}}>
                    <Image source={require('../../assets/composition/mine/write.png')} style={{marginLeft: 16*s}}/>
                        <Text style={{fontSize: 24*s, marginTop:10*s,}}>上传文章</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginTop:20*s,backgroundColor:'#fff',padding: 20*s}}>
                    <Text style={{fontSize: 26*s, marginTop: 20*s, marginBottom:40*s}}>注意事项</Text>
                    <Text style={{fontSize: 24*s, marginBottom: 10*s}}>1.符合题意，不得出现无关内容。</Text>
                    <Text style={{fontSize: 24*s, marginBottom: 10*s}}>2.语言流畅，正确使用标点。</Text>
                    <Text style={{fontSize: 24*s, marginBottom: 10*s}}>3.自行写作，不得抄袭。</Text>
                </View>
            </View>
        )
    }
}
