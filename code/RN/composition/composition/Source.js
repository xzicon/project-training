import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Image, ToastAndroid, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
const content = [
    {
        title: '句段',
        content1: '/积累经典短句',
        content2: '/表达深刻主题',
        img: require('../../assets/composition/composition/duanju.png')
    },
    {
        title: '时事',
        content1: '/解读海内外时事热点',
        content2: '/丰富议论文论据',
        img: require('../../assets/composition/composition/shishi.png')
    },
    {
        title: '人物',
        content1: '/解读各领域优秀人物',
        content2: '/丰富议论文依据',
        img: require('../../assets/composition/composition/renwu.png')
    },
    {
        title: '名著影视',
        content1: '/解读文学、影视经典',
        content2: '/拓展视野',
        img: require('../../assets/composition/composition/yingshi.png')
    },
];
export default class Source extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    componentDidMount() {

    }
    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Icon onPress={() => { Actions.pop() }} name="left" color="#000" style={{ marginLeft: 30 }} size={35 * s} />
                    <Text style={{ color: '#000', marginLeft: width * 0.28, fontSize: 30 * s }}>素材分类</Text>
                </View>
                <View>
                    <FlatList
                        style={styles.container}
                        data={content}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={()=>{Actions.container({title: item.title})}} style={styles.box}>
                            <Text style={{fontSize: 36*s}}>{item.title}</Text>
                            <Text style={{color:'gray', marginTop: 10*s}}>{item.content1}</Text>
                            <Text style={{color:'gray'}}>{item.content2}</Text>
                            <TouchableOpacity style={{marginLeft: '66%', marginTop: 20*s}}><Image source={item.img} /></TouchableOpacity>
                        </TouchableOpacity>
                        )}/>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        height: 90 * s,
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        width: width,
    },
    box: {
        width: '40%',
        backgroundColor:'#fff',
        marginTop: 30*s,
        marginLeft: '6.5%',
        padding: 20*s,
        borderRadius: 14*s
    }
})