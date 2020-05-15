import React, { Component } from 'react'
import { View, Text, Dimensions, Image, FlatList, TouchableOpacity, AsyncStorage } from 'react-native'
import Icon1 from 'react-native-vector-icons/Feather';
import { Actions } from 'react-native-router-flux';
const { width, scale } = Dimensions.get('window');
const s = width / 640;

export default class Nessay extends Component {
    constructor() {
        super();
        this.state = ({
            data: [],
            tid: '',
            refreshing:false
        })
    }
    componentDidMount() {
        AsyncStorage.getItem('tid')
            .then((res) => {
                res === null ?
                    this.setState({ tid: '' })
                    :
                    this.setState({ tid: res },()=>{this.all()})
            })
    }
    componentWillReceiveProps(){
        if(this.props.refresh==1){
            this.all()
        }
    }
    all = () => {
        this.setState({
            refreshing:true
        },()=>{
        fetch('http://116.62.14.0:8402/grade/noteacher/' + this.state.tid)
            .then((res) => res.json())
            .then((res) => {
                console.log(res.data)
                this.setState({
                    data: res.data,
                    refreshing:false
                })
            })
        })
    }
    _renderFooter = () => (
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:50*s}}>
            <Text>
               到底了~
            </Text>
        </View>
    )
    render() {
        return (
            <View>
                {this.state.data.length !== 0 ?
                    <View>
                        <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#333', fontSize: 30 * s, }}>未点评</Text>
                        </View>
                        <FlatList
                            style={{ marginBottom: 180 * s }}
                            data={this.state.data}
                            numColumns={1}
                            refreshing = { this.state.refreshing }
                            onRefresh = {()=>{
                                this.all()
                            }}
                            ListFooterComponent={ this._renderFooter }
                            renderItem={({ item }) => (
                                item.isgrade === 0 ?
                                    <View style={{ backgroundColor: '#FFF', marginLeft: 10 * s, marginRight: 10 * s, marginTop: 10 * s, height: 250 * s, overflow: 'hidden', padding: 20 * s }}>
                                        <View style={{ width: '100%', height: 160 * s }}>
                                            <TouchableOpacity onPress={() => { Actions.nessaydetail({ gid: item.gid }) }}>
                                                <Text style={{ fontSize: 26 * s, fontWeight: 'bold', marginBottom: 10 * s }}>{item.atitle}</Text>
                                                <Text numberOfLines={3} style={{ fontSize: 20 * s }}>{item.acontent}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 18 * s, color: 'gray' }}>{item.uname}</Text>
                                            <Text style={{ fontSize: 18 * s, color: 'gray' }}>{item.invitetime}</Text>
                                        </View>
                                    </View> :
                                    <View></View>
                            )}
                        />
                    </View>
                    :
                    <View>
                        <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: '#333', fontSize: 30 * s, }}>未点评</Text>
                        </View>
                        <View style={{ width: width, marginTop: 20 * s, marginLeft: 20 * s }}>
                            <Text style={{ fontSize: 24 * s }}>你还没有收到点评邀请哦~</Text>
                        </View>
                    </View>}
            </View>
        )
    }
}