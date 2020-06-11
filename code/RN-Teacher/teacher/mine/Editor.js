import React, { Component } from 'react';

import { View, Text, FlatList, Dimensions, TouchableOpacity, ScrollView, Image, TextInput, StyleSheet, Keyboard, AsyncStorage, ToastAndroid, Modal, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import Picker from 'react-native-picker';
const _Picker = null;
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;

const options = {
    title: '请选择',
    cancelButtonTitle: "取消",
    takePhotoButtonTitle: "拍照",
    chooseFromLibraryButtonTitle: "选择相册",
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const area = [
    {
        "name": "北京",
        "city": [
            {
                "name": "北京",
                "area": [
                    "东城区",
                    "西城区",
                    "崇文区",
                    "宣武区",
                    "朝阳区",
                    "丰台区",
                    "石景山区",
                    "海淀区",
                ]
            }
        ]
    },
    {
        "name": "天津",
        "city": [
            {
                "name": "天津",
                "area": [
                    "和平区",
                    "河东区",
                    "河西区",
                    "南开区",
                    "河北区",
                    "红桥区",
                    "塘沽区",
                    "汉沽区",
                ]
            }
        ]
    },
    {
        "name": "河北",
        "city": [
            {
                "name": "石家庄",
                "area": [
                    "长安区",
                    "桥东区",
                    "桥西区",
                    "新华区",
                    "井陉矿区",
                    "裕华区",
                    "井陉县",
                    "正定县",
                ]
            },
            {
                "name": "沧州",
                "area": [
                    "新华区",
                    "运河区",
                    "肃宁县",
                    "任丘市",
                    "黄骅市",
                    "河间市",
                ]
            },
            {
                "name": "邯郸",
                "area": [
                    "邯山区",
                    "丛台区",
                    "复兴区",
                    "峰峰矿区",
                    "邯郸县",
                    "临漳县",
                    "成安县",
                ]
            },
            {
                "name": "保定",
                "area": [
                    "新市区",
                    "北市区",
                    "南市区",
                    "满城县",
                    "清苑县",
                    "涞水县",
                ]
            },
        ]
    },
];

export default class Editor extends Component {
    static navigationOptions = {
        title: '',
    };
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            tid: '',
            imageUrl: '',
            modal_tsex: false,
            modal_tname: false,
            modify: '',
            modal_tarea: false,
            data0: [],
            value: [],
            pickerValue: [],
            modal_tage: false,
            userCity: '',
            companyAreaArray: [],
            userage: undefined,
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('tid')
            .then((res) => {
                res === null ?
                    this.setState({ tid: '' })
                    :
                    this.setState({ tid: res })
                this.mine();
                console.log(this.state.data)
            });
    }
    mine = () => {
        fetch('http://116.62.14.0:8402/teacher/personal/' + this.state.tid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    data: res.data,

                });
                console.log(res.data);
            })
    }
    back=()=>{
        // Actions.popTo('mine');
        // setTimeout(()=> {
        //     Actions.refresh({refresh:1})
        // },100);
        Actions.pop(this.props.refresh());
    }
    // 修改头像
    takephoto = (e) => {
        var formData = new FormData();
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.error) {
                console.log('Error:', response.error);
            } else if (response.customButton) {
                console.log('custom:', response.customButton);
            } else {
                const source = { uri: response.uri };
                const file = { uri: response.uri, type: response.type, name: response.fileName };
                formData.append('image', file);
                this.setState({
                    imageUrl: source.uri,
                }, () => {
                    fetch('http://116.62.14.0:8402/upload', {
                        method: 'POST',
                        body: formData
                    }).then(res => res.json())
                        .then(res => {
                            console.log(res.status);
                            console.log(res.data);
                            let data = {
                                tid: this.state.data.tid,
                                timage: res.data
                            }
                            fetch('http://116.62.14.0:8402/teacher/modify/timage', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data)
                            }).then(res => res.json())
                                .then(res => {
                                    console.log(res);
                                    if (res.status == 0) {
                                        console.log('修改成功');
                                        this.mine();
                                    } else {
                                        console.log('修改失败')
                                    }

                                })

                        })
                });
            }
        });
    }
    // 修改姓名、学校、教学特色、个人荣誉、教学成就
    modify_name = (modity) => {
        if (modity == 'name') {
            this.setState({
                modal_t: 't' + modity,
                modal_tname: true,
                modify: this.state.data.tname,
                modal_tname_title: '修改姓名',
                modal_tname_height: false
            })
        } else if (modity == 'school') {
            this.setState({
                modal_t: 't' + modity,
                modal_tname: true,
                modify: this.state.data.tschool,
                modal_tname_title: '修改学校',
                modal_tname_height: false
            })
        } else if (modity == 'achievement') {
            this.setState({
                modal_t: 't' + modity,
                modal_tname: true,
                modify: this.state.data.tachievement,
                modal_tname_title: '教学成就',
                modal_tname_height: true
            })
        } else if (modity == 'success') {
            this.setState({
                modal_t: 't' + modity,
                modal_tname: true,
                modify: this.state.data.tsuccess,
                modal_tname_title: '个人荣誉',
                modal_tname_height: true
            })
        } else if (modity == 'trait') {
            this.setState({
                modal_t: 't' + modity,
                modal_tname: true,
                modify: this.state.data.ttrait,
                modal_tname_title: '教学特色',
                modal_tname_height: true
            })
        } else {
            this.setState({
                modal_tname: true,
                modify: '',
                modal_tname_title: ''
            })
        }

    }
    modify_name_close = () => {
        this.setState({
            modal_tname: false
        })
    }
    modify_name_submit = (modal_t, modify) => {
        let data = {
            tid: this.state.tid,
            tname: modify,
            tschool: modify,
            tachievement: modify,
            tsuccess: modify,
            ttrait: modify
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/teacher/modify/' + modal_t, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((res) => {
                console.log(res)
                if (res.status == 0) {
                    console.log('修改成功')
                    this.mine();
                    this.modify_name_close();
                } else {
                    ToastAndroid.show('修改失败', 100)
                }

            })

    }
    // 修改性别/年级、阅卷经验
    modify_tsex = (modity) => {
        if (modity == 'tsex') {
            this.setState({
                modal_tsex: true,
                modify3: this.state.data.tsex == 0 ? '女' : '男',
                modify3_update: modity,
                istt: true
            })
        } else if (modity == 'texperience') {
            this.setState({
                modal_tsex: true,
                modify3: this.state.data.texperience == 0 ? '无' : '有',
                modify3_update: modity,
                istt: true
            })
        } else {
            this.setState({
                modal_tsex: true,
                modify3: this.state.data.tyear,
                modify3_update: modity,
                istt: false
            })
        }
    }
    modify_tsex_close = () => {
        this.setState({
            modal_tsex: false
        })
    }
    modify_tsex_update = (modify, modal_t) => {
        let data = {
            tid: this.state.tid,
            tsex: modify,
            texperience: modify,
            tyear: modify + ''
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/teacher/modify/' + modal_t, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((res) => {
                console.log(res)
                if (res.status == 0) {
                    console.log('修改成功')
                    this.mine();
                    this.modify_tsex_close();
                } else {
                    ToastAndroid.show('修改失败', 100)
                }

            })
    }
    // 修改区域(省市)
    modify_tarea = () => {
        this.setState({
            modal_tarea: true
        })
    }
    modify_tarea_false = () => {
        this.setState({
            modal_tarea: false
        })
    }
    _createAreaData = () => {
        let data = [];
        let len = area.length;
        console.log(area.length);
        for (let i = 0; i < len; i++) {
            let city = [];
            for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
                let _city = {};
                _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
                city.push(_city);
            }

            let _data = {};
            _data[area[i]['name']] = city;
            data.push(_data);
        }
        return data;
    }
    _companyAreaClickAction = () => {
        Keyboard.dismiss();
        this.setState({ isShowMengCeng: true })
        Picker.init({
            pickerData: this._createAreaData(),
            selectedValue: this.state.companyAreaArray,
            pickerConfirmBtnText: '确认',
            pickerCancelBtnText: '取消',
            pickerBg: [245, 245, 245, 1],
            pickerTitleText: '选择城市',
            onPickerConfirm: data => {
                this.setState({
                    companyAreaArray: data,
                    userCity: data.join('-'),
                    isShowMengCeng: false,
                })
                this.modify_tarea_update(this.state.userCity);
            },
            onPickerCancel: data => {
                this.setState({ isShowMengCeng: false })
            },
        });
        Picker.show();
    }
    onChangedCity(text) {
        this.setState({ userCity: text })
    }
    modify_tarea_update = (tarea) => {
        let data = {
            tid: this.state.tid,
            tarea: tarea
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/teacher/modify/tarea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((res) => {
                console.log(res)
                if (res.status == 0) {
                    console.log('修改成功')
                    this.mine();
                } else {
                    ToastAndroid.show('修改失败', 100)
                }

            })
    }
    // 教龄
    _createAgeData = () => {
        let data = [];
        for (let i = 0; i < 10; i++) {
            data.push(i);
        }
        return data;
    }

    _companyAgeClickAction = () => {
        Keyboard.dismiss();
        this.setState({ isShowMengCeng: true })
        Picker.init({
            pickerData: this._createAgeData(),
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerTitleText: '请选择教龄时长',
            pickerBg: [245, 245, 245, 1],
            onPickerConfirm: data => {
                this.setState({
                    userCity: data,
                    isShowMengCeng: false,
                })
                this.modify_tage_update(this.state.userCity.toString());
            },
            onPickerCancel: data => {
                this.setState({ isShowMengCeng: false })
            },
        });
        Picker.show();
    }
    modify_tage_update = (tage) => {
        let data = {
            tid: this.state.tid,
            tage: tage
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/teacher/modify/tage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then((res) => {
                console.log(res)
                if (res.status == 0) {
                    console.log('修改成功')
                    this.mine();
                } else {
                    ToastAndroid.show('修改失败', 100)
                }

            })
    }
    render() {
        console.log(this.state.data);
        return (
            <View>
                {/* 修改姓名、学校、教学特色、个人荣誉、教学成就 */}
                <Modal
                    style={styles.container}
                    animationType='silde'
                    onRequestClose={this.modify_name_close}
                    transparent={false}
                    visible={this.state.modal_tname}
                    autoFocus={true}
                >
                    <View style={styles.cover}
                    >
                    </View>
                    <View style={{ height: 90 * s, backgroundColor: '#fff', position: 'absolute', top: 0, right: 0, left: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 * s }}>
                        <TouchableOpacity onPress={() => { this.modify_name_close() }}>
                            <Icon name="left" color="#333" size={30 * s} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 26 * s }}>{this.state.modal_tname_title}</Text>
                        <View>{this.state.modal_tname_height ?
                            <View></View> :
                            <TouchableOpacity onPress={() => { this.modify_name_submit(this.state.modal_t, this.state.modify) }}><Text style={{ fontSize: 26 * s }}>修改</Text></TouchableOpacity>
                        }</View>
                    </View>
                    {
                        this.state.modal_tname_height ?
                            <View>
                                <View style={{ height: 500 * s, backgroundColor: '#fff', position: 'absolute', top: 110 * s, right: 0, left: 0, flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <TextInput
                                        value={this.state.modify}
                                        autoFocus={true}
                                        multiline={this.state.modal_tname_height}
                                        style={{ width: '100%', backgroundColor: '#F5F5F5', borderRadius: 10 * s }}
                                        //  minHeight={} 
                                        placeholder={'请输入'}
                                        placeholderTextColor='gray'
                                        autoFocus={true}
                                        maxLength={200}
                                        textAlignVertical={'top'}
                                        onChangeText={(modify) => {
                                            this.setState({
                                                modify: modify
                                            })
                                        }}

                                    />
                                </View>
                                <TouchableOpacity onPress={() => { this.modify_name_submit(this.state.modal_t, this.state.modify) }}
                                    style={{ height: 60 * s, width: '80%', backgroundColor: '#FFF', position: 'absolute', top: 620 * s, right: '10%', left: '10%', flexDirection: 'row', justifyContent: 'space-around' }}
                                >
                                    <Text style={{ fontSize: 24 * s, lineHeight: 60 * s }}>提交</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View>
                                <View style={{ height: 90 * s, backgroundColor: '#fff', position: 'absolute', top: 110 * s, right: 0, left: 0, flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <TextInput
                                        value={this.state.modify}
                                        autoFocus={true}
                                        multiline={this.state.modal_tname_height}
                                        style={{ width: '100%', backgroundColor: '#F5F5F5', borderRadius: 10 * s }}
                                        //  minHeight={} 
                                        placeholder={'请输入'}
                                        placeholderTextColor='gray'
                                        autoFocus={true}
                                        textAlignVertical={'top'}
                                        onChangeText={(modify) => {
                                            this.setState({
                                                modify: modify
                                            })
                                        }}

                                    />
                                </View>
                            </View>
                    }
                </Modal>
                {/* 年级、性别、阅卷经验 */}
                <Modal
                    style={styles.container}
                    animationType='silde'
                    onRequestClose={this.modify_tsex_close}
                    transparent={true}
                    visible={this.state.modal_tsex}
                    autoFocus={true}
                >
                    <TouchableOpacity style={styles.cover1}
                        onPress={() => { this.modify_tsex_close() }}
                    >
                    </TouchableOpacity>
                    <View style={{ height: this.state.istt ? 200 * s : 500 * s, width: '80%', backgroundColor: '#FFF', position: 'absolute', top: width * 0.5, bottom: 0, right: 0, left: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: width * 0.1, marginRight: width * 0.1 }}>
                        {
                            this.state.istt ?
                                <View>
                                    {this.state.modify3_update == 'tsex' ?
                                        <TouchableOpacity onPress={() => { this.modify_tsex_update(1, this.state.modify3_update) }}>
                                            <Text style={{ color: this.state.modify3 == '男' ? 'red' : '#000', fontSize: 24 * s }}>男</Text>

                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => { this.modify_tsex_update(1, this.state.modify3_update) }}>
                                            <Text style={{ color: this.state.modify3 == '有' ? 'red' : '#000', fontSize: 24 * s }}>有</Text>
                                        </TouchableOpacity>
                                    }
                                    {this.state.modify3_update == 'tsex' ?
                                        <TouchableOpacity onPress={() => { this.modify_tsex_update(0, this.state.modify3_update) }}>
                                            <Text style={{ color: this.state.modify3 == '女' ? 'red' : '#000', fontSize: 24 * s }}>女</Text>

                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => { this.modify_tsex_update(0, this.state.modify3_update) }}>
                                            <Text style={{ color: this.state.modify3 == '无' ? 'red' : '#000', fontSize: 24 * s }}>无</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                                :
                                <View>
                                    <Text style={{ fontSize: 30 * s, borderBottomColor: 'gray' }}>请选择年级</Text>
                                    <View>
                                        <Text style={{ fontSize: 26 * s, marginTop: 30 * s }}>高中：</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 10 * s }}>
                                            <TouchableOpacity onPress={() => { this.modify_tsex_update('高一', this.state.modify3_update) }}><Text style={{ color: this.state.modify3 == '高一' ? 'red' : '#000', fontSize: 24 * s, borderColor: this.state.modify3 == '高一' ? 'red' : '#000', borderWidth: s, padding: 6 * s }}>高一</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={() => { this.modify_tsex_update('高二', this.state.modify3_update) }}><Text style={{ color: this.state.modify3 == '高二' ? 'red' : '#000', fontSize: 24 * s, borderColor: this.state.modify3 == '高二' ? 'red' : '#000', borderWidth: s, padding: 6 * s, marginLeft: 16 * s }}>高二</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={() => { this.modify_tsex_update('高三', this.state.modify3_update) }}><Text style={{ color: this.state.modify3 == '高三' ? 'red' : '#000', fontSize: 24 * s, borderColor: this.state.modify3 == '高三' ? 'red' : '#000', borderWidth: s, padding: 6 * s, marginLeft: 16 * s }}>高三</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 26 * s, marginTop: 20 * s }}>初中：</Text>
                                        <View style={{ flexDirection: 'row', marginTop: 10 * s }}>
                                            <TouchableOpacity onPress={() => { this.modify_tsex_update('初一', this.state.modify3_update) }}><Text style={{ color: this.state.modify3 == '初一' ? 'red' : '#000', fontSize: 24 * s, borderColor: this.state.modify3 == '初一' ? 'red' : '#000', borderWidth: s, padding: 6 * s }}>初一</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={() => { this.modify_tsex_update('初二', this.state.modify3_update) }}><Text style={{ color: this.state.modify3 == '初二' ? 'red' : '#000', fontSize: 24 * s, borderColor: this.state.modify3 == '初二' ? 'red' : '#000', borderWidth: s, padding: 6 * s, marginLeft: 16 * s }}>初二</Text></TouchableOpacity>
                                            <TouchableOpacity onPress={() => { this.modify_tsex_update('初三', this.state.modify3_update) }}><Text style={{ color: this.state.modify3 == '初三' ? 'red' : '#000', fontSize: 24 * s, borderColor: this.state.modify3 == '初三' ? 'red' : '#000', borderWidth: s, padding: 6 * s, marginLeft: 16 * s }}>初三</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                        }

                    </View>

                </Modal>
                <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ left: 20 * s, }} onPress={()=>{this.back()}}>
                        <Icon name="left" color="#333" size={35 * s} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: '#333', fontSize: 30 * s, left: width * 0.34 }}>基本信息</Text>
                    </View>
                </View>
                <View style={{ width: width, marginTop: 15 / scale, height: height - 90 * s - 50 / scale }}>
                    <ScrollView>
                        <TouchableOpacity
                            onPress={() => { this.takephoto() }}
                            style={{ width: width, height: 90 * s, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', borderBottomWidth: 2 * s, borderBottomColor: '#d8d8d8', padding: 0.02 * width }}>
                            <Text style={{ width: '20%', fontSize: 26 * s, paddingLeft: '5%' }}>头像：</Text>
                            <View style={{ width: '15%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 5 }}>
                                <Image
                                    source={{ uri: 'http://116.62.14.0:8402/images/' + this.state.data.timage }}
                                    style={{ width: 50 * s, height: 50 * s, borderRadius: 70 * s, }}
                                />
                                <Icon size={30 * s} name="right" color="#d8d8d8" style={{}} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { this.modify_name('name') }} style={{ width: width, height: 90 * s, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 0.02 * width, borderBottomColor: '#d8d8d8', borderBottomWidth: s }}>
                            <Text style={{ width: '20%', fontSize: 26 * s, paddingLeft: '5%' }}>姓名：</Text>
                            <View style={{ width: '55%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 5, overflow: 'hidden', }}>
                                <Text style={{ fontSize: 26 * s, overflow: 'hidden', marginRight: 5, }}>{this.state.data.tname}</Text>
                                <Icon size={30 * s} name="right" color="#d8d8d8" style={{}} />
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.modify_tsex('tsex') }} style={{ width: width, height: 90 * s, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 0.02 * width, marginBottom: 15 / scale }}>
                            <Text style={{ width: '20%', fontSize: 26 * s, paddingLeft: '5%' }}>性别：</Text>
                            <View style={{ width: '12%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 26 * s, }}>{this.state.data.tsex == 0 ? '女' : '男'}</Text>
                                <Icon size={30 * s} name="right" color="#d8d8d8" style={{}} />
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { this.modify_name('school') }}
                            style={{ width: width, height: 90 * s, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 0.02 * width, borderBottomColor: '#d8d8d8', borderBottomWidth: s }}>
                            <Text style={{ width: '20%', fontSize: 26 * s, paddingLeft: '5%' }}>学校：</Text>
                            <View style={{ width: '55%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 5, overflow: 'hidden', }}>
                                <Text style={{ fontSize: 26 * s, overflow: 'hidden', marginRight: 5, }}>{this.state.data.tschool}</Text>
                                <Icon size={30 * s} name="right" color="#d8d8d8" style={{}} />
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { this.modify_tsex('tyear') }}
                            style={{ width: width, height: 90 * s, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 0.02 * width, borderBottomColor: '#d8d8d8', borderBottomWidth: 2 * s }}>
                            <Text style={{ width: '20%', fontSize: 26 * s, paddingLeft: '5%' }}>年级：</Text>
                            <View style={{ width: '55%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 5, overflow: 'hidden', }}>
                                <Text style={{ fontSize: 26 * s, overflow: 'hidden', marginRight: 5, }}>{this.state.data.tyear}</Text>
                                <Icon size={30 * s} name="right" color="#d8d8d8" style={{}} />
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: width, height: 90 * s, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 0.02 * width, marginBottom: 15 / scale, position: 'relative' }} onPress={() => { this._companyAreaClickAction() }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <Text style={{ width: '20%', fontSize: 26 * s, paddingLeft: '5%' }}>区域：</Text>
                                <View style={{ width: '55%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 5, overflow: 'hidden', }}>
                                    <Text style={{ fontSize: 26 * s, overflow: 'hidden', marginRight: 5, }}>{this.state.data.tarea}</Text>
                                    <Icon size={30 * s} name="right" color="#d8d8d8" style={{}} />
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: width, height: 90 * s, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 0.02 * width, borderBottomColor: '#d8d8d8', borderBottomWidth: 2 * s }} onPress={() => { this._companyAgeClickAction() }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                                <Text style={{ width: '20%', fontSize: 26 * s, paddingLeft: '5%' }}>教龄：</Text>
                                <View style={{ width: '55%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 5, overflow: 'hidden', }}>
                                    <Text style={{ fontSize: 26 * s, overflow: 'hidden', marginRight: 5, }}>{this.state.data.tage}年</Text>
                                    <Icon size={30 * s} name="right" color="#d8d8d8" style={{}} />
                                </View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { this.modify_tsex('texperience') }}
                            style={{ width: width, height: 90 * s, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 0.02 * width, borderBottomColor: '#d8d8d8', borderBottomWidth: 2 * s }}>
                            <View><Text style={{ fontSize: 26 * s, paddingLeft: '5%' }}>中高考阅卷经验：</Text></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 5, overflow: 'hidden', }}>
                                <Text style={{ fontSize: 26 * s, overflow: 'hidden', marginRight: 5, }}>{this.state.data.texperience == 1 ? '有' : '无'}</Text>
                                <Icon size={30 * s} name="right" color="#d8d8d8" style={{}} />
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.modify_name('achievement') }}
                            style={{ width: width, height: 90 * s, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 0.02 * width, borderBottomColor: '#d8d8d8', borderBottomWidth: 2 * s }}>
                            <View><Text style={{ fontSize: 26 * s, paddingLeft: '5%' }}>教学成就：</Text></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 5, overflow: 'hidden', }}>
                                <Text style={{ fontSize: 26 * s, overflow: 'hidden', marginRight: 5, }}>{this.state.data.tachievement == null || this.state.data.tachievement == '' ? '未填写' : this.state.data.tachievement}</Text>
                                <Icon size={30 * s} name="right" color="#d8d8d8" style={{}} />
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.modify_name('success') }}
                            style={{ width: width, height: 90 * s, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 0.02 * width, borderBottomColor: '#d8d8d8', borderBottomWidth: 2 * s }}>
                            <View><Text style={{ fontSize: 26 * s, paddingLeft: '5%' }}>个人荣誉：</Text></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 5, overflow: 'hidden', }}>
                                <Text style={{ fontSize: 26 * s, overflow: 'hidden', marginRight: 5, }}>{this.state.data.tsuccess == null || this.state.data.tsuccess == '' ? '未填写' : this.state.data.tsuccess}</Text>
                                <Icon size={30 * s} name="right" color="#d8d8d8" style={{}} />
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { this.modify_name('trait') }}
                            style={{ width: width, height: 90 * s, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 0.02 * width, marginBottom: 15 / scale }}>
                            <View><Text style={{ fontSize: 26 * s, paddingLeft: '5%' }}>教学特色：</Text></View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 5, overflow: 'hidden', }}>
                                <Text style={{ fontSize: 26 * s, overflow: 'hidden', marginRight: 5, }}>{this.state.data.ttrait == null || this.state.data.ttrait == '' ? '未填写' : this.state.data.ttrait}</Text>
                                <Icon size={30 * s} name="right" color="#d8d8d8" style={{}} />
                            </View>

                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        width: 260,
        marginLeft: 10
    },
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cover: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#F0F0F0'
    },
    cover1: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
})