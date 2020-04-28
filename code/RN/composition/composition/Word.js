import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Tword from './Tword';

const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
// 评论组件
export default class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onecolor: 'red',
            oneborderBottomColor: '#ffdf41',
            twocolor: '#000',
            twoborderBottomColor: '#fff',
            flag: '1',
            data: [],
        }
    }
    Change1 = () => {
        console.log(1);
        this.setState({
            onecolor: 'red',
            oneborderBottomColor: '#ffdf41',
            twocolor: '#000',
            twoborderBottomColor: '#fff',
            flag: '1'
        })
        this.fetchp();
    }
    Change2 = () => {
        console.log(1);
        this.setState({
            onecolor: '#000',
            oneborderBottomColor: '#fff',
            twocolor: 'red',
            twoborderBottomColor: '#ffdf41',
            flag: '2'
        })
        this.fetchp();

    }
    componentDidMount() {
        this.fetchp();
    }
    componentWillReceiveProps(){
        if(this.props.updatec){
            this.fetchp()
        }
    }
    fetchp=()=>{
        fetch('http://116.62.14.0:8402/material/xiangqing/pinglun/' + this.props.mid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ 
                    data: res.data 
                });
                // console.log(res.data);
            })
    }
    render() {
        if (this.props.lp === '1') {
            return (
                <View>
                    <View style={styles.lsource}>
                        <TouchableOpacity onPress={() => { this.Change1() }}>
                            <Text style={[styles.onelabel, { color: this.state.onecolor }, { borderBottomColor: this.state.oneborderBottomColor }]}>最热</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.Change2() }}>
                            <Text style={[styles.twolabel, { color: this.state.twocolor }, { borderBottomColor: this.state.twoborderBottomColor }]}>最新</Text>
                        </TouchableOpacity>
                    </View>
                    <Tword flag={this.state.flag} mid={this.props.mid} />
                </View>
            )
        } else {
            return (
                <View>
                    {this.state.data.length !== 0 ? this.state.data.map(data => (
                        <View style={{ backgroundColor: '#cfc5bb', marginTop: 10*s, marginBottom: 10*s, flex: 1 }}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => Actions.people({uid: data.uid})}>
                                    <Image
                                        source={{ uri: 'http://116.62.14.0:8402/images/' + data.uimage }}
                                        style={{ width: 60*s, height: 60*s, borderRadius: 60*s }}
                                    />
                                </TouchableOpacity>
                                <View style={styles.theader}>
                                    <Text style={{ fontSize: 24*s }}>{data.uname}</Text>
                                    <Text style={{ fontSize: 20*s, color: 'gray' }}>{data.mctime}</Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <Text style={{fontSize: 24*s}}>{data.mccontent}</Text>
                            </View>
                        </View>
                    )) : <View style={{ backgroundColor: '#cfc5bb', marginTop: 10*s, marginBottom: 10*s, flex: 1 }}>
                            <Text>当前还没有评论哦~  </Text>
                        </View>}
                </View>
            )
        }
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
    lsource: {
        width: width,
        height: 60 * s,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        width: width * 0.96,
        marginLeft: width * 0.02,
        height: 240 * s,
        overflow: 'hidden',
        marginTop: 10 * s
    },
    onelabel: {
        borderBottomWidth: 2*s,
        fontSize: 24*s,
        marginLeft: 20 * s
    },
    twolabel: {
        borderBottomWidth: 2*s,
        fontSize: 24*s,
        marginLeft: 20 * s
    },
    content: {
        marginLeft: 120 * s,
        marginRight: 20 * s,
    }
})