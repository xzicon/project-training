import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Icon1 from 'react-native-vector-icons/Feather';

const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
// 练笔组件
export default class Tword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            new: 0,
            updatea:this.props.updatea
        }

    }
    componentDidMount() {
        console.log(this.props.mid);
        console.log(this.props.flag);
        if (this.state.new === 0) {
            this.hot()
        }
    }
    componentWillReceiveProps(){
        if(this.state.updatea){
            this.setState({
                new:1,
                updatea:false
            },()=>{
                this.new()
            })
            
        }
    }
    change_new = () => {
        if (this.state.new === 1) {
            fetch('http://116.62.14.0:8402/material/xiangqing/lianbi/' + this.props.mid)
                .then((res) => res.json())
                .then((res) => {
                    this.setState({
                        data: res.data,
                        new: 0
                    })
                })
        } else {
            fetch('http://116.62.14.0:8402/material/xiangqing/lianbi/new/' + this.props.mid)
                .then((res) => res.json())
                .then((res) => {
                    this.setState({
                        data: res.data,
                        new: 1
                    })
                })
        }
    }
    hot = () => {
        fetch('http://116.62.14.0:8402/material/xiangqing/lianbi/' + this.props.mid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data });
                //console.log(res.data);
                console.log(1);
            })
    }
    new = () => {
        fetch('http://116.62.14.0:8402/material/xiangqing/lianbi/new/' + this.props.mid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data });
                //console.log(res.data);
                console.log(1);
            })
    }
    render() {
        console.log(this.state.new);
        return (
            <View>
                {this.state.data.length !== 0 && this.state.new === 0 ?
                    <View>
                        <View style={{flexDirection:'row',justifyContent:'flex-end',paddingRight:20*s}}>
                        <TouchableOpacity onPress={this.change_new} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ width: 30 * s, height: 30 * s }} source={require('../../assets/composition/composition/sort2.png')} />
                            <Text style={{ color: '#5482b4', fontSize: 20 * s }}>按热度</Text>
                        </TouchableOpacity>
                        </View>
                        {this.state.data.map(data => (
                            <View style={{ width: width }}>
                                <View style={styles.box}>
                                    <View style={styles.header}>
                                        <TouchableOpacity onPress={() => Actions.people({ uid: data.uid })}>
                                            <Image
                                                source={{ uri: 'http://116.62.14.0:8402/images/' + data.uimage }}
                                                style={{ width: 60 * s, height: 60 * s, borderRadius: 60 * s }}
                                            />
                                        </TouchableOpacity>
                                        <View style={styles.theader}>
                                            <Text style={{ fontSize: 20 * s }}>{data.uname}</Text>
                                            <Text style={{ fontSize: 18 * s, color: 'gray' }}>{data.utime}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.content}>
                                        <Text style={{ fontSize: 30 * s, textAlign: 'center' }}>{data.atitle}</Text>
                                        <Text onPress={() => Actions.detailEssaywrite({ aid: data.aid })} style={styles.container}>{data.acontent}</Text>
                                        <View style={{ marginLeft: '5%', marginRight: '2%', marginTop: 20 * s, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ color: '#4682B4', marginTop: 10 * s }}>{data.atag}</Text>
                                            <Icon1 name='more-vertical' size={35 * s} />
                                        </View>
                                    </View>
                                </View>
                            </View>))}
                    </View>
                    : (this.state.data.length !== 0 && this.state.new === 1 ?
                        <View>
                            <View style={{flexDirection:'row',justifyContent:'flex-end',paddingRight:20*s}}>
                        <TouchableOpacity onPress={this.change_new} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ width: 30 * s, height: 30 * s }} source={require('../../assets/composition/composition/sort.png')} />
                            <Text style={{ color: '#5482b4', fontSize: 20 * s }}>按时间</Text>
                        </TouchableOpacity>
                        </View>
                            {this.state.data.map(data => (
                                <View style={{ width: width }}>
                                    <View style={styles.box}>
                                        <View style={styles.header}>
                                            <TouchableOpacity onPress={() => Actions.people({ uid: data.uid })}>
                                                <Image
                                                    source={{ uri: 'http://116.62.14.0:8402/images/' + data.uimage }}
                                                    style={{ width: 60 * s, height: 60 * s, borderRadius: 60 * s }}
                                                />
                                            </TouchableOpacity>
                                            <View style={styles.theader}>
                                                <Text style={{ fontSize: 20 * s }}>{data.uname}</Text>
                                                <Text style={{ fontSize: 18 * s, color: 'gray' }}>{data.utime}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.content}>
                                            <Text style={{ fontSize: 30 * s, textAlign: 'center' }}>{data.atitle}</Text>
                                            <Text onPress={() => Actions.detailEssaywrite({ aid: data.aid })} style={styles.container}>{data.acontent}</Text>
                                            <View style={{ marginLeft: '5%', marginRight: '2%', marginTop: 20 * s, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ color: '#4682B4', marginTop: 10 * s }}>{data.atag}</Text>
                                                <Icon1 name='more-vertical' size={35 * s} />
                                            </View>
                                        </View>
                                    </View>
                                </View>))}
                        </View>
                        :
                        <View style={{ margin: 20 * s, flex: 1 }}>
                            <Text>当前还没有练笔哦~快来试试吧</Text>
                        </View>)}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    box: {
        width: width * 0.9,
        marginLeft: width * 0.05,
        height: 320 * s,
        marginTop: 10 * s,
        marginBottom: 10 * s,
        borderRadius: 10*s,
        backgroundColor: '#fff', 
        borderColor: 'gray',
        borderWidth: s
    },
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
    container: {
        paddingLeft: '5%',
        width: '96%',
        height: 100 * s,
        overflow: 'hidden',
        marginTop: 16 * s,
        fontSize: 20 * s
    }
})