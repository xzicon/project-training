import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux';

const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
// 练笔组件
export default class Tword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }

    }
    componentDidMount() {
        console.log(this.props.mid);
        console.log(this.props.flag);
        if (this.props.flag === '1') {
            this.hot()
        } else {
            this.new()
        }
    }
    hot=()=>{
        fetch('http://116.62.14.0:8402/material/xiangqing/lianbi/' + this.props.mid)
                .then((res) => res.json())
                .then((res) => {
                    this.setState({ data: res.data });
                    //console.log(res.data);
                    console.log(1);
                })
    }
    new=()=>{
        fetch('http://116.62.14.0:8402/material/xiangqing/lianbi/new/' + this.props.mid)
                .then((res) => res.json())
                .then((res) => {
                    this.setState({ data: res.data });
                    //console.log(res.data);
                    console.log(1);
                })
    }
    render() {
        console.log(this.state.data.uid + 'q');
        return (
            <View>
                {this.state.data.length !== 0 ? this.state.data.map(data => (
                    <View style={{ backgroundColor: '#f5f1e8', height: 400 * s, marginTop: 10*s, marginBottom: 10*s, flex: 1 }}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => Actions.people({uid: data.uid})}>
                                <Image
                                    source={{ uri: 'http://116.62.14.0:8402/images/' + data.uimage }}
                                    style={{ width: 60*s, height: 60*s, borderRadius: 60*s }}
                                />
                            </TouchableOpacity>
                            <View style={styles.theader}>
                                <Text style={{ fontSize: 24*s }}>{data.uname}</Text>
                                <Text style={{ fontSize: 20*s, color: 'gray' }}>{data.utime}</Text>
                            </View>
                        </View>
                        <View style={styles.content}>
                            <Text style={{ fontSize: 30*s, textAlign: 'center' }}>{data.atitle}</Text>
                            <Text onPress={() => Actions.detailEssaywrite({ aid: data.aid })} style={styles.container}>{data.acontent}</Text>
                            <Text style={{ textAlign: 'right', marginRight: 10 * s, color: 'gray' }}>{data.atag}</Text>
                        </View>
                    </View>
                )) : <View style={{ backgroundColor: '#f5f1e8', marginTop: 10*s, marginBottom: 10*s, flex: 1 }}>
                        <Text>当前还没有练笔哦~快来试试吧</Text>
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
    container: {
        width: width * 0.96,
        marginLeft: width * 0.02,
        height: 220 * s,
        overflow: 'hidden',
        marginTop: 16 * s,
        fontSize: 20 *s 
    }
})