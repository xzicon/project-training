import React, { Component, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, FlatList, AsyncStorage, Dimensions, ScrollView, Modal, ToastAndroid, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
const s = width / 640;

export default class HaveMarticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            data: [],
            data1: [],
            uclass: '',
            flag: '1',
            uclassplay: false,
            color1: '#000',
            borderColor1: '#000',
            color2: '#000',
            borderColor2: '#000',
            color3: '#000',
            borderColor3: '#000',
            color4: '#000',
            borderColor4: '#000',
            color5: '#000',
            borderColor5: '#000',
            color6: '#000',
            borderColor6: '#000',
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res })
                this.getarticle();
            })
    }
    getarticle = () => {
        console.log(this.props.aid);
        fetch('http://116.62.14.0:8402/article/xiangqing/' + this.props.aid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data, data1: res.data[0] });
                console.log(res.data);
            })
    }
    comment = (aid, atitle, acontent, gclass) => {
        var date = new Date();
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes();
        let data = {
            aid: aid,
            tid: this.props.tid,
            gclass: gclass,
            atitle: atitle,
            acontent: acontent,
            invitetime: Y + M + D + h + m,
            uid: this.state.uid
        }
        fetch('http://116.62.14.0:8402/grade/invite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((res) => {
                console.log(res.data)
                if (res.status == 0) {
                    this.setState({ uclassplay: false })
                    this.getarticle();
                    Actions.lesson();
                    ToastAndroid.show('邀请点评成功', 100)
                } else {
                    ToastAndroid.show('邀请点评失败', 100)
                }

            })
    }
    _uclass = () => {
        this.setState({ uclassplay: true })
    }
    _uclass_false = () => {
        this.setState({ uclassplay: false })
    }
    _uclass_update = (uclass) => {
        if (uclass === '高一') {
            this.setState({ uclass: '高一', color1: 'red', borderColor1: 'red', color2: '#000', borderColor2: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' })
            this.comment(this.state.data1.aid, this.state.data1.atitle, this.state.data1.acontent, '高一');
        } else if (uclass === '高二') {
            this.setState({ uclass: '高二', color2: 'red', borderColor2: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' })
            this.comment(this.state.data1.aid, this.state.data1.atitle, this.state.data1.acontent, '高二');
        } else if (uclass === '高三') {
            this.setState({ uclass: '高三', color3: 'red', borderColor3: 'red', color1: '#000', borderColor1: '#000', color2: '#000', borderColor2: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' })
            this.comment(this.state.data1.aid, this.state.data1.atitle, this.state.data1.acontent, '高三');
        } else if (uclass === '初一') {
            this.setState({ uclass: '初一', color4: 'red', borderColor4: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color2: '#000', borderColor2: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' })
            this.comment(this.state.data1.aid, this.state.data1.atitle, this.state.data1.acontent, '初一');
        } else if (uclass === '初二') {
            this.setState({ uclass: '初二', color5: 'red', borderColor5: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color2: '#000', borderColor2: '#000', color6: '#000', borderColor6: '#000' })
            this.comment(this.state.data1.aid, this.state.data1.atitle, this.state.data1.acontent, '初二');
        } else if (uclass === '初三') {
            this.setState({ uclass: '初三', color6: 'red', borderColor6: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color2: '#000', borderColor2: '#000' })
            this.comment(this.state.data1.aid, this.state.data1.atitle, this.state.data1.acontent, '初三');
        }
    }
    render() {
        return (
            <View>
                <Modal
                    animationType='silde'
                    onRequestClose={this._uclass_false}//安卓必须设置
                    transparent={true}
                    visible={this.state.uclassplay}
                    autoFocus={true}
                >
                    <TouchableOpacity style={styles.cover}
                        onPress={this._uclass_false}>
                    </TouchableOpacity>
                    <View style={{ width: width * 0.9, top: 100 * s, left: width * 0.05, backgroundColor: '#fff' }}>
                        <View style={styles.header}>
                            <Text style={styles.fon}>请选择年级</Text>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.cbox}>高中:</Text>
                            <View style={styles.zbox}>
                                <View><Text onPress={() => { this._uclass_update('高一') }} style={[styles.box, { borderColor: this.state.borderColor1, color: this.state.color1 }]}>高一</Text></View>
                                <View><Text onPress={() => { this._uclass_update('高二') }} style={[styles.box, { borderColor: this.state.borderColor2, color: this.state.color2 }]}>高二</Text></View>
                                <View><Text onPress={() => { this._uclass_update('高三') }} style={[styles.box, { borderColor: this.state.borderColor3, color: this.state.color3 }]}>高三</Text></View>
                            </View>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.cbox}>初中:</Text>
                            <View style={styles.zbox}>
                                <View><Text onPress={() => { this._uclass_update('初一') }} style={[styles.box, { borderColor: this.state.borderColor4, color: this.state.color4 }]}>初一</Text></View>
                                <View><Text onPress={() => { this._uclass_update('初二') }} style={[styles.box, { borderColor: this.state.borderColor5, color: this.state.color5 }]}>初二</Text></View>
                                <View><Text onPress={() => { this._uclass_update('初三') }} style={[styles.box, { borderColor: this.state.borderColor6, color: this.state.color6 }]}>初三</Text></View>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* {
                    this.state.data.map(data => */}
                        <View>
                            <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity style={{ left: 20 * s, }} onPress={() => Actions.pop()}>
                                    <Icon name="left" color="#333" size={40 * s} />
                                </TouchableOpacity>
                                <View>
                                    <Text style={{ color: '#333', fontSize: 34 * s, left: width * 0.4 }}>{this.state.data1.atitle}</Text>
                                </View>
                            </View>
                            <ScrollView>
                                <View style={{ width: width * 0.96, backgroundColor: 'white', marginTop: 10 * s, marginBottom: 190 * s, marginLeft: 0.02 * width, position: 'relative' }}>
                                    <View style={{ width: '100%', marginTop: '1%', paddingLeft: '3%', }}><Text style={{ fontSize: 18 * s, color: 'gray' }} >{this.state.data1.utime}</Text></View>
                                    <View style={{ width: '100%', marginTop: '1%', paddingLeft: '3%', alignItems: 'center', }}><Text style={{ fontSize: 30 * s, color: '#333', textAlignVertical: 'center' }} >{this.state.data1.atitle}</Text></View>
                                    <View style={{ width: '100%', marginTop: '2%', paddingLeft: '3%', paddingRight: '3%', }}><Text style={{ fontSize: 24 * s, color: '#333' }} >{this.state.data1.acontent}</Text></View>
                                    <View style={{ width: '100%', marginTop: '2%', paddingLeft: '3%', }}><Text style={{ fontSize: 18 * s, color: '#333' }} >{this.state.data1.atag}</Text></View>
                                    <View style={{ width: '100%', marginTop: '6%', marginBottom: '2%' }}>
                                        {/* <TouchableOpacity onPress={() => this.comment(data.aid, data.atitle, data.acontent )} style={{ position: 'absolute', right: '5%', bottom: '5%', }}  > */}
                                        <TouchableOpacity onPress={() => this._uclass()} style={{ position: 'absolute', right: '5%', bottom: '5%', }}  >
                                            <View style={{ width: 100 * s, borderColor: 'red', borderWidth: s, alignItems: 'center', }}>
                                                <Text style={{ color: '#000', fontSize: 18 * s, padding: '10%', }}>邀请点评</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    {/* )
                } */}
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
        borderBottomColor: 'gray',
        borderBottomWidth: s,
        width: '100%',
        padding: 20 * s
    },
    fon: {
        width: '100%',
        fontSize: 24 * s,
        textAlign: 'center'
    },
    container: {
        padding: 40 * s,
        justifyContent: 'center',
    },
    cbox: {
        fontSize: 24 * s
    },
    zbox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    box: {
        fontSize: 20 * s,
        borderWidth: s,
        borderRadius: 10 * s,
        paddingTop: 20 * s,
        paddingBottom: 20 * s,
        paddingLeft: 40 * s,
        paddingRight: 40 * s,
        marginTop: 20 * s
    },
    cover: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
})