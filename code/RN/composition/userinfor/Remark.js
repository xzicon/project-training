import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Image, FlatList, ScrollView, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
const s = width / 640;

export default class Remark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            data: []
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res })
                    this.remark();
            })
    }
    remark = () => {
        fetch('http://116.62.14.0:8402/grade/teacher/'+this.props.tid)
            .then((res) => res.json())
            .then((res) => {
                console.log(res.data[0])
                this.setState({
                    data: res.data,
                })
            })
    }
    render() {
        return (
            <View>
                <FlatList
                    style={{ marginBottom: 300 * s }}
                    data={this.state.data}
                    numColumns={1}
                    renderItem={({ item }) => (
                        item.isgrade === 1 ?
                        
                        <View style={{ backgroundColor: '#FFF', marginLeft: 10 * s, marginRight: 10 * s, marginTop: 10 * s, height: 250 * s, overflow: 'hidden', padding: 20 * s }}>
                            <View style={{ width: '100%', height: 160 * s}}>
                                <TouchableOpacity onPress={()=>{Actions.detailEssay({aid:item.aid})}}>
                                    <Text style={{ fontSize: 26 * s, fontWeight: 'bold', marginBottom:10*s }}>{item.atitle}</Text>
                                    <Text numberOfLines={3} style={{fontSize: 20 * s}}>{item.acontent}</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={{fontSize: 18 * s, color:'gray'}}>{item.uname}</Text>
                                <Text style={{fontSize: 18 * s, color:'gray'}}>{item.invitetime}</Text>
                            </View>
                        </View>:
                        <View></View>
                    )}
                />
            </View>
        )
    }
}
