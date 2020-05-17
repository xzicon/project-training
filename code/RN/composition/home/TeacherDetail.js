import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, Image, Modal, ScrollView, AsyncStorage, ToastAndroid, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import Remark from '../userinfor/Remark';
import Skill from '../userinfor/Skill';

const { width } = Dimensions.get('window');
const s = width / 640;

export default class TeacherDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            data: [],
            flag: '1',
            uclass: '',
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
            })
        if (this.state.flag === '1') {
            this.person();
        }
        if (this.state.flag === '2') {
            this.remark();
        }
    }
    person = () => {
        fetch('http://116.62.14.0:8402/teacher/personal/' + this.props.tid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data, flag: '1' });
                console.log(res.data);
            })
    }
    remark = () => {
        fetch('http://116.62.14.0:8402/teacher/personal/' + this.props.tid)
        .then((res) => res.json())
        .then((res) => {
            this.setState({ data: res.data, flag: '2' });
            console.log(res.data);
        })
    }
    skill=()=>{
        fetch('http://116.62.14.0:8402/teacher/personal/' + this.props.tid)
        .then((res) => res.json())
        .then((res) => {
            this.setState({ data: res.data, flag: '3' });
            console.log(res.data);
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
            this.comment('高一');
        } else if (uclass === '高二') {
            this.setState({ uclass: '高二', color2: 'red', borderColor2: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' })
            this.comment('高二');
        } else if (uclass === '高三') {
            this.setState({ uclass: '高三', color3: 'red', borderColor3: 'red', color1: '#000', borderColor1: '#000', color2: '#000', borderColor2: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' })
            this.comment('高三');
        } else if (uclass === '初一') {
            this.setState({ uclass: '初一', color4: 'red', borderColor4: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color2: '#000', borderColor2: '#000', color5: '#000', borderColor5: '#000', color6: '#000', borderColor6: '#000' })
            this.comment('初一');
        } else if (uclass === '初二') {
            this.setState({ uclass: '初二', color5: 'red', borderColor5: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color2: '#000', borderColor2: '#000', color6: '#000', borderColor6: '#000' })
            this.comment('初二');
        } else if (uclass === '初三') {
            this.setState({ uclass: '初三', color6: 'red', borderColor6: 'red', color1: '#000', borderColor1: '#000', color3: '#000', borderColor3: '#000', color4: '#000', borderColor4: '#000', color5: '#000', borderColor5: '#000', color2: '#000', borderColor2: '#000' })
            this.comment('初三');
        }
    }
    comment = (gclass) => {
        var date = new Date();
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes();
        let data = {
            aid: this.props.aid,
            tid: this.props.tid,
            gclass: gclass,
            atitle: this.props.atitle,
            acontent: this.props.acontent,
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
                    Actions.home();
                    ToastAndroid.show('邀请点评成功', 100)
                } else {
                    ToastAndroid.show('邀请点评失败', 100)
                }

            })
    }
    render() {
        console.log(this.state.data.tyear+'-----');
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
            <View style={{ position: 'relative' }}>
                <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ left: 20 * s, }} onPress={() => Actions.pop()}>
                        <Icon name="left" color="#333" size={40 * s} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: '#333', fontSize: 34 * s, left: width * 0.38 }}>主页</Text>
                    </View>
                </View>
                <View style={{ height: 200 * s, backgroundColor: '#F5F5F5', justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={{ width: 100 * s, height: 100 * s, borderRadius: 50 * s }}
                            source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.data.timage }} />
                        <Text style={{ fontSize: 26 * s, marginTop: 20 * s }}>{this.state.data.tname}</Text>
                    </View>
                </View>
                {this.state.flag === '1' ?
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 70 * s, alignItems: 'center', backgroundColor: '#fff' }}>
                            <TouchableOpacity onPress={() => { this.person() }}>
                                <Text style={{ color: 'red', fontSize: 24 * s }}>简介</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.remark() }}>
                                <Text style={{ fontSize: 24 * s }}>点评</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.skill() }}>
                                <Text style={{ fontSize: 24 * s }}>技法</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ height: 730 * s }}>
                            <View style={{ width: width * 0.96, backgroundColor: '#fff', marginTop: 14 * s, marginLeft: 0.02 * width }}>
                                <TouchableOpacity style={{ width: '100%', height: 40 * s, marginTop: 20 * s, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 20 * s, backgroundColor: 'red', color: '#fff', width: width * 0.15, paddingLeft: 7 * s, paddingTop: 4 * s }}>基本资料</Text>
                                    <Text style={{ width: width * 0.04, borderTopRightRadius: 60 * s, borderBottomRightRadius: 60 * s, backgroundColor: 'red' }}></Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 10 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>所在地区</Text>
                                    <Text style={{ fontSize: 24 * s,width:'80%',textAlign:'right' }}>{this.state.data.tarea}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 10 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>老师学校</Text>
                                    <Text style={{ fontSize: 24 * s, width:'80%',textAlign:'right' }}>{this.state.data.tschool}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 10 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>所教年级</Text>
                                    <Text style={{ fontSize: 24 * s, width:'80%',textAlign:'right' }}>{this.state.data.tyear}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 10 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>教师性别</Text>
                                    <Text style={{ fontSize: 24 * s, width:'80%',textAlign:'right' }}>{this.state.data.tsex}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 10 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>教龄时间</Text>
                                    <Text style={{ fontSize: 24 * s, width:'80%',textAlign:'right' }}>{this.state.data.tage}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 10 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>中高考阅卷经验</Text>
                                    <Text style={{ fontSize: 24 * s, width:'80%',textAlign:'right' }}>{this.state.data.texperience}</Text>
                                </View>

                            </View>
                            <View style={{ width: width * 0.96, backgroundColor: '#fff', marginTop: 14 * s, marginLeft: 0.02 * width }}>
                                <TouchableOpacity style={{ width: '100%', height: 40 * s, marginTop: 20 * s, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 20* s, backgroundColor: 'red', color: '#fff', width: width * 0.15, paddingLeft: 7 * s, paddingTop: 4 * s }}>教学成就</Text>
                                    <Text style={{ width: width * 0.04, borderTopRightRadius: 60 * s, borderBottomRightRadius: 60 * s, backgroundColor: 'red' }}></Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 20 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>{this.state.data.tachievement}</Text>
                                </View>
                            </View>
                            <View style={{ width: width * 0.96, backgroundColor: '#fff', marginTop: 14 * s, marginLeft: 0.02 * width }}>
                                <TouchableOpacity style={{ width: '100%', height: 40 * s, marginTop: 20 * s, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 20* s, backgroundColor: 'red', color: '#fff', width: width * 0.15, paddingLeft: 7 * s, paddingTop: 4 * s }}>所获荣誉</Text>
                                    <Text style={{ width: width * 0.04, borderTopRightRadius: 60 * s, borderBottomRightRadius: 60 * s, backgroundColor: 'red' }}></Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 20 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>{this.state.data.tsuccess}</Text>
                                </View>
                            </View>
                            <View style={{ width: width * 0.96, backgroundColor: '#fff', marginTop: 14 * s, marginLeft: 0.02 * width }}>
                                <TouchableOpacity style={{ width: '100%', height: 40 * s, marginTop: 20 * s, flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 22 * s, backgroundColor: 'red', color: '#fff', width: width * 0.15, paddingLeft: 7 * s, paddingTop: 4 * s }}>教学特色</Text>
                                    <Text style={{ width: width * 0.04, borderTopRightRadius: 60 * s, borderBottomRightRadius: 60 * s, backgroundColor: 'red' }}></Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginBottom: 20 * s, marginTop: 20 * s, marginLeft: 20 * s }}>
                                    <Text style={{ fontSize: 24 * s }}>{this.state.data.ttrait}</Text>
                                </View>
                            </View>
                            <View style={{ height: 100 * s }}></View>
                        </ScrollView>
                    </View>
                    :
                    (this.state.flag === '2' ?
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 70 * s, alignItems: 'center', backgroundColor: '#fff' }}>
                            <TouchableOpacity onPress={() => { this.person() }}>
                                <Text style={{ fontSize: 24 * s }}>简介</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.remark() }}>
                                <Text style={{ color: 'red', fontSize: 24 * s }}>点评</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.skill() }}>
                                <Text style={{ fontSize: 24 * s }}>技法</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ height: 730 * s }}> 
                            <Remark  tid={this.props.tid}/>
                            {/* <View style={{ height: 100 * s }}></View> */}
                        </ScrollView>
                        
                    </View>
                    :
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', height: 70 * s, alignItems: 'center', backgroundColor: '#fff' }}>
                            <TouchableOpacity onPress={() => { this.person() }}>
                                <Text style={{ fontSize: 24 * s }}>简介</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.remark() }}>
                                <Text style={{  fontSize: 24 * s }}>点评</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.skill() }}>
                                <Text style={{ color: 'red',fontSize: 24 * s }}>技法</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{ height: 730 * s }}> 
                            <Skill  tid={this.props.tid}/>
                            {/* <View style={{ height: 100 * s }}></View> */}
                        </ScrollView>
                        
                    </View>
                    )
                    
                }
                <View style={{ position: 'absolute', bottom: 20 * s, paddingLeft: '50%' }}>
                    <Text onPress={() => this._uclass()} style={{ textAlign: 'center', fontSize: 24 * s, padding: 10 * s, backgroundColor: '#FFD700', width: 140 * s, borderRadius: 20 * s }}>邀请点评</Text>
                </View>
            </View>
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