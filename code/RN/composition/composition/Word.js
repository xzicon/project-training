import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
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
    }
    Change2 = () => {
        console.log(1);
        this.setState({
            onecolor: '#000',
            oneborderBottomColor: '#fff',
            twocolor: 'red',
            twoborderBottomColor: '#ffdf41',
            flag: '2',
            updatec: false,
            updatea: false,
        })
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
            })
    }
    _word = () => {
        return (
            <Tword updatea={this.state.updatea} updatec={this.state.updatec} flag={this.state.flag} mid={this.props.mid} />
        )
    }
    render() {
        if (this.props.lp === '1') {
            return (
                <View>
                    {this._word()}
                </View>
            )
        } else {
            return (
                <View>
                    {this.state.data.length !== 0 ? this.state.data.map(item => (
                        <View style={{ flexDirection: 'column' }}>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.SelectableBackground()}
                            onPressOut={() => this.reply_modal(item)}
                        >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '18%', paddingTop: 15 * s, justifyContent: 'center', flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => { Actions.personHome({ uid: item.uid }) }}
                                    >
                                        <Image style={{ width: 60 * s, height: 60 * s, borderRadius: 60 * s, margin: 10 / scale }}
                                            source={{ uri: 'http://116.62.14.0:8402/images/' + item.uimage }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ paddingTop: 20 / scale, paddingRight: 20 / scale, width: '82%' }}>
                                    <View>
                                        <Text style={{ fontSize: 20 * s }}>{item.uname}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 18 * s, color: '#666666' }}>{item.mctime}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ marginTop: 20 / scale, marginRight: 20 / scale,paddingBottom: 20 / scale, fontSize: 20 * s, borderBottomWidth: 0.5*s, borderBottomColor: '#F0F0F0' }}>{item.mccontent}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                        </View>
                    )) : <View style={{ margin: 20*s}}>
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
        marginLeft: width*0.05
    },
    twolabel: {
        borderBottomWidth: 2*s,
        fontSize: 24*s,
        marginLeft: width*0.05
    },
    content: {
        marginLeft: 120 * s,
        marginRight: 20 * s,
    }
})