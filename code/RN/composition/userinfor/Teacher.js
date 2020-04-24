import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Image, FlatList, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
const s = width / 640;

export default class Teacher extends Component {
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
                fetch('http://116.62.14.0:8402/teacher/choicelist')
                    .then((res) => res.json())
                    .then((res) => {
                        this.setState({ data: res.data });
                        console.log(res.data);
                    })
            })
    }
    render() {
        return (
            <View>
                <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ left: 20 * s, }} onPress={() => Actions.pop()}>
                        <Icon name="left" color="#333" size={40 * s} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: '#333', fontSize: 34 * s, left: width * 0.34 }}>名师推荐</Text>
                    </View>
                    <View>
                        <Text onPress={() => { Actions.home() }} style={{ color: 'red', fontSize: 34 * s, marginLeft: 360 * s }}>跳过</Text>
                    </View>
                </View>
                <FlatList
                    data={this.state.data}
                    numColumns={1}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { Actions.teacherdetail({tid:item.tid}) }} style={{ flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: s, width: width, height: 100 * s, alignItems: 'center' }}>
                            <View style={{ marginLeft: 30 * s }}>
                                <Image
                                    source={item.timage}
                                    style={{ width: 70 * s, height: 70 * s, borderRadius: 70 * s }}
                                />
                            </View>
                            <View style={{ marginLeft: 30 * s }}>
                                <Text style={{ fontSize: 24 * s }}>{item.tname}<Text style={{ color: 'orange', fontSize: 18 * s }}>&nbsp;&nbsp;{item.age}/{item.tyear}</Text></Text>
                                <Text style={{ color: 'gray' }}>{item.tschool}</Text>
                            </View>
                            {/* <View style={{ marginLeft: 200 * s }}>
                                <Text style={{ width: 50 * s, backgroundColor: 'red', color: '#fff', textAlign: 'center', borderRadius: 6 * s }}>{item.flag}</Text>
                            </View> */}
                        </TouchableOpacity>
                    )} />
            </View>
        )
    }
}
