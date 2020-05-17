import React, { Component } from 'react'
import {
    Text, View, StyleSheet, TextInput, Dimensions,
    TouchableOpacity, FlatList, Image, Modal
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/Feather';
import { Actions } from 'react-native-router-flux';
const { width, scale } = Dimensions.get('window');
const s = width / 640;

export default class SearchList extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            search_data: [],
            search_material_data: [],
            search_exam_data: [],
            com: false,
            value: this.props.search,
            editable: false,
            clear: true,
            tab: 1
        })
    }
    componentDidMount() {
        setTimeout(() => {
            if (this.state.tab===1) {
                this._search();
            }
        }, 20)
    }
    _search = () => {
        let data = { search: this.state.value };
        fetch('http://116.62.14.0:8402/search/article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((res) => {
                if (res.status == 0) {
                    this.setState({
                        search_data: res.data,
                        com: true
                    })
                } else {
                    console.log(res.data)
                }
                console.log(res);
                console.log(res.data)
            })
    }
    _search_material = () => {
        let data = { search: this.state.value };
        fetch('http://116.62.14.0:8402/search/material', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((res) => {
                console.log(res);
                if (res.status == 0) {
                    this.setState({
                        search_material_data: res.data,
                        com: true
                    })
                } else {
                    console.log(res.data)
                }
                console.log(res.data)
            })
    }
    _search_exam = () => {
        let data = { search: this.state.value };
        fetch('http://116.62.14.0:8402/search/true', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((res) => {
                console.log(res);
                if (res.status == 0) {
                    this.setState({
                        search_exam_data: res.data,
                        com: true
                    })
                } else {
                    console.log(res.data)
                }
                console.log(res.data)
            })
    }
    inputSearch = (search) => {
        this.setState({ value: search });
        if (search !== '') {
            this.setState({
                clear: true
            })
            if(this.state.tab === 1){
                this._search();
            }if(this.state.tab === 2){
                this._search_material();
            }if(this.state.tab === 3){
                this._search_exam();
            }
        } else {
            this.setState({
                clear: false
            })
        }
    }
    _clear = () => {
        this.setState({
            clear: false,
            value: ''
        })
    }
    _change1 = () => {
        this.setState({tab: 1})
        this._search()
    }
    _change2 = () => {
        this.setState({tab: 2})
        this._search_material()
    }
    _change3 = () => {
        this.setState({tab: 3})
        this._search_exam()
    }
    render() {
        console.log(this.state.tab);
        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: '#FFF', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', height: 90 * s }}>
                    <View style={{
                        width: '80%',
                        height: 60 * s,
                        padding: 0,
                        paddingLeft: 15 * s,
                        borderRadius: 30 * s,
                        backgroundColor: '#F5F5F5',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon name='search1' size={30 * s} />
                        <TouchableOpacity

                            style={{ width: '80%' }}>
                            {/* {this.state.editable? */}
                            <TextInput
                                placeholder="请输入要搜索的内容"
                                style={{ padding: 0, paddingLeft: 10 * s }}
                                value={this.state.value}
                                returnKeyType="search"//设置键盘样式
                                onSubmitEditing={this._search}
                                underlineColorAndroid="transparent"
                                onChangeText={this.inputSearch}
                            />
                        </TouchableOpacity>
                        {
                            this.state.clear ?
                                <TouchableOpacity onPress={this._clear}>
                                    <Icon name='close' size={35 * s} color='#666666' />
                                </TouchableOpacity>
                                :
                                <Text></Text>
                        }
                    </View>
                    <TouchableOpacity
                        onPress={() => { Actions.pop() }}>
                        <Text>取消</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {
                        this.state.tab === 1 ?
                            this.state.search_data.length === 0 ?
                                <View>
                                    <View style={{ height: 80 * s, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <Text onPress={this._change1} style={{ color: 'red', fontSize: 24 * s }}>作文</Text>
                                        <Text onPress={this._change2} style={{ fontSize: 24 * s }}>素材</Text>
                                        <Text onPress={this._change3} style={{ fontSize: 24 * s }}>真题</Text>
                                    </View>
                                    <View style={{ width: width, marginTop: 100 * s }}>
                                        <Text style={{ textAlign: 'center' }}>没有找到相关内容，换个词试试吧</Text>
                                    </View>
                                </View>
                                :
                                <View>
                                    <View style={{ height: 80 * s, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                        <Text onPress={this._change1} style={{ color: 'red', fontSize: 24 * s }}>作文</Text>
                                        <Text onPress={this._change2} style={{ fontSize: 24 * s }}>素材</Text>
                                        <Text onPress={this._change3} style={{ fontSize: 24 * s }}>真题</Text>
                                    </View>
                                    <FlatList
                                        style={{ paddingTop: 10 * s, paddingBottom: 10 * s }}
                                        data={this.state.search_data}
                                        numColumns={1}
                                        renderItem={({ item }) => (
                                            <View style={{
                                                backgroundColor: '#FFF', marginLeft: 20 * s, marginRight: 20 * s, marginTop: 10 * s, marginBottom: 10 * s,
                                                borderRadius: 10 * s, overflow: 'hidden', padding: 20 * s
                                            }}>
                                                {/* 点击头像个人主页 */}
                                                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <TouchableOpacity style={{ marginRight: 20 * s }} onPress={() => { Actions.personHome({ uid: item.uid }) }}>
                                                        <Image style={{ width: 30, height: 30 }}
                                                            source={{ uri: 'http://116.62.14.0:8402/images/' + item.uimage }} />
                                                    </TouchableOpacity>
                                                    <View>
                                                        <Text>{item.uname}</Text>
                                                        <Text>{item.utime}</Text>
                                                    </View>
                                                </View> */}
                                                {/* 点击详情页 */}
                                                {/* <View style={{width:'100%',height:180*s}}> */}
                                                <TouchableOpacity style={{}} onPress={() => { Actions.detailEssay({ aid: item.aid }) }}>
                                                    <View style={{ alignItems: 'center', margin: 20 * s }}>
                                                        <Text style={{ fontSize: 26 * s, }}>{item.atitle}</Text>
                                                    </View>
                                                    <Text numberOfLines={3}>{item.acontent}</Text>
                                                    {/* 查看全文未设置好样式 */}
                                                    {/* <TouchableOpacity onPress={()=>Actions.detailEssay({aid:item.aid})}><Text>全文</Text></TouchableOpacity> */}
                                                </TouchableOpacity>
                                                {/* </View> */}
                                                {/* 点击素材 */}
                                                {/* 接口未获取素材标题 */}
                                                {/* 目前改成标签 */}
                                                <View style={{ marginTop: 25 * s, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Text style={{ color: '#4682B4' }}>{item.atag}</Text>
                                                    <Icon1 name='more-vertical' size={35 * s} />
                                                </View>
                                            </View>
                                        )}
                                    />
                                </View>
                            : this.state.tab === 2 ?
                                this.state.search_material_data.length === 0 ?
                                    <View>
                                        <View style={{ height: 80 * s, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <Text onPress={this._change1} style={{ fontSize: 24 * s }}>作文</Text>
                                            <Text onPress={this._change2} style={{ color: 'red', fontSize: 24 * s }}>素材</Text>
                                            <Text onPress={this._change3} style={{ fontSize: 24 * s }}>真题</Text>
                                        </View>
                                        <View style={{ width: width, marginTop: 100 * s }}>
                                            <Text style={{ textAlign: 'center' }}>没有找到相关内容，换个词试试吧</Text>
                                        </View>
                                    </View>
                                    :
                                    <View>
                                        <View style={{ height: 80 * s, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <Text onPress={this._change1} style={{ fontSize: 24 * s }}>作文</Text>
                                            <Text onPress={this._change2} style={{ color: 'red', fontSize: 24 * s }}>素材</Text>
                                            <Text onPress={this._change3} style={{ fontSize: 24 * s }}>真题</Text>
                                        </View>
                                        <FlatList
                                            style={{ paddingTop: 10 * s, paddingBottom: 10 * s }}
                                            data={this.state.search_material_data}
                                            numColumns={1}
                                            renderItem={({ item }) => (
                                                <View style={{
                                                    backgroundColor: '#FFF', marginLeft: 20 * s, marginRight: 20 * s, marginTop: 10 * s, marginBottom: 10 * s,
                                                    borderRadius: 10 * s, overflow: 'hidden', padding: 20 * s
                                                }}>
                                                    {/* 点击头像个人主页 */}

                                                    {/* 点击详情页 */}
                                                    {/* <View style={{width:'100%',height:180*s}}> */}
                                                    <TouchableOpacity style={{}} onPress={() => { Actions.popular({ mid: item.mid }) }}>
                                                        <View style={{ alignItems: 'center', margin: 20 * s }}>
                                                            <Text style={{ fontSize: 26 * s, }}>{item.mtitle}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        />
                                    </View>
                                :
                                this.state.search_exam_data.length === 0 ?
                                    <View>
                                        <View style={{ height: 80 * s, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <Text onPress={this._change1} style={{ fontSize: 24 * s }}>作文</Text>
                                            <Text onPress={this._change2} style={{ fontSize: 24 * s }}>素材</Text>
                                            <Text onPress={this._change3} style={{ color: 'red', fontSize: 24 * s }}>真题</Text>
                                        </View>
                                        <View style={{ width: width, marginTop: 100 * s }}>
                                            <Text style={{ textAlign: 'center' }}>没有找到相关内容，换个词试试吧</Text>
                                        </View>
                                    </View>
                                    :
                                    <View>
                                        <View style={{ height: 80 * s, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                            <Text onPress={this._change1} style={{ fontSize: 24 * s }}>作文</Text>
                                            <Text onPress={this._change2} style={{ fontSize: 24 * s }}>素材</Text>
                                            <Text onPress={this._change3} style={{ color: 'red', fontSize: 24 * s }}>真题</Text>
                                        </View>
                                        <FlatList
                                            style={{ paddingTop: 10 * s, paddingBottom: 10 * s }}
                                            data={this.state.search_exam_data}
                                            numColumns={1}
                                            renderItem={({ item }) => (
                                                <View style={{
                                                    backgroundColor: '#FFF', marginLeft: 20 * s, marginRight: 20 * s, marginTop: 10 * s, marginBottom: 10 * s,
                                                    borderRadius: 10 * s, overflow: 'hidden', padding: 20 * s
                                                }}>
                                                    {/* 点击头像个人主页 */}

                                                    {/* 点击详情页 */}
                                                    {/* <View style={{width:'100%',height:180*s}}> */}
                                                    <TouchableOpacity style={{}} onPress={() => { Actions.popular({ mid: item.mid }) }}>
                                                        <View style={{ alignItems: 'center', margin: 20 * s }}>
                                                            <Text style={{ fontSize: 26 * s, }}>{item.truetitle}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        />
                                    </View>
                    }

                </View>

            </View>
        )
    }
}
