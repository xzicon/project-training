import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, Dimensions, AsyncStorage, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux'

const { width, scale } = Dimensions.get('window');
const s = width / 640;

export default class Huozan extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            uid: '',
            data: [],
        })
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res })
                    fetch('http://116.62.14.0:8402/login/likes/'+this.state.uid)
                    .then((res)=>res.json())
                    .then((res)=>{
                        this.setState({data:res.data});
                        console.log(res.data);
                    })
            })
    }

    render() {
        return (
            <View>
                <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Icon size={35 * s} style={{ color: '#000', marginLeft: 20 * s }} name='left' />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 26 * s, marginLeft: width * 0.36 }}>获赞</Text>
                    </View>
                </View>
                {this.state.data.length !== 0 ? this.state.data.map(data => (
                    <ScrollView>
                        <View style={{width:0.96*width, marginLeft:0.02*width, backgroundColor: '#fff', marginTop: 10*s, marginBottom: 10*s}}>
                            <View style={{flexDirection:'row',margin:10*s}}>
                                <TouchableOpacity onPress={() => Actions.personHome({uid: data.uid})}>
                                    <Image
                                        source={{ uri: 'http://116.62.14.0:8402/images/' + data.uimage }}
                                        style={{ width: 60*s, height: 60*s, borderRadius: 60*s }}
                                    />
                                </TouchableOpacity>
                                <View>
                                    <Text style={{ fontSize: 24*s, margin: 14* s }}>{data.uname}</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 18*s, marginLeft: 14* s }}>点赞了这篇文章</Text>
                            <View style={{backgroundColor:'#EDEDED', margin: 10*s}}>
                                <Text onPress={() => Actions.detailEssayUser({ aid: data.aid })} style={{fontSize: 24*s,margin:10*s,textAlign:'center'}}>{data.atitle}</Text>
                                <Text onPress={() => Actions.detailEssayUser({ aid: data.aid })} style={{fontSize: 20*s,margin:10*s, height: 100*s}}>{data.acontent}</Text>
                            </View>
                        </View>
                    </ScrollView>
                    )) : <View style={{margin: 10*s, flex: 1 }}>
                            <Text>当前还没有收到赞哦~  </Text>
                        </View>}
                </View>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20 * s,
        marginBottom: 10 * s,
        marginTop: 10 * s
    },
    theader: {
        marginLeft: 40 * s
    },
    content: {
        marginLeft: 120 * s,
        marginRight: 20 * s,
    }
})