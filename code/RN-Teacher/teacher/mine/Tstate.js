import React, { Component } from 'react';

import { View, Text, FlatList, Dimensions, TouchableOpacity, ScrollView, Image, TextInput, StyleSheet, Keyboard, AsyncStorage, ToastAndroid, Modal, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import Picker from 'react-native-picker';
const _Picker = null;
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;

export default class Tstate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            tid: '',
            state:'',
            modal_state: false,
            modify: '',
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
    modify_state = (modity) => {
            this.setState({
                modal_state: true,
                modify3: this.state.data.state == 0 ? '休息' : '在线',
                modify3_update: modity,
                istt: true
            })
        
    }
    modify_state_close = () => {
        this.setState({
            modal_state: false
        })
    }
    modify_state_update = (modify) => {
        let data = {
            tid: this.state.tid,
            state: modify,
        }
        console.log(data);
        fetch('http://116.62.14.0:8402/teacher/modify/state', {
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
                    this.modify_state_close();
                } else {
                    ToastAndroid.show('修改失败', 100)
                }

            })
    }
    render() {
        return (
            <View>
                <Modal
                    style={styles.container}
                    animationType='silde'
                    onRequestClose={this.modify_state_close}
                    transparent={true}
                    visible={this.state.modal_state}
                    autoFocus={true}
                >
                    <TouchableOpacity style={styles.cover1}
                        onPress={() => { this.modify_state_close() }}
                    >
                    </TouchableOpacity>
                    <View style={{ height: 200 * s, width: '80%', backgroundColor: '#FFF', position: 'absolute', top: width * 0.5, bottom: 0, right: 0, left: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: width * 0.1, marginRight: width * 0.1 }}>
                        
                                <View>
                                    
                                        <TouchableOpacity onPress={() => { this.modify_state_update(1, this.state.modify3_update) }}>
                                            <Text style={{ color: this.state.modify3 == '在线' ? 'red' : '#000', fontSize: 24 * s }}>在线</Text>

                                        </TouchableOpacity>
                                        
                                    
                                        <TouchableOpacity onPress={() => { this.modify_state_update(0, this.state.modify3_update) }}>
                                            <Text style={{ color: this.state.modify3 == '休息' ? 'red' : '#000', fontSize: 24 * s }}>休息</Text>

                                        </TouchableOpacity>
                                        
                                </View>
                                
                        

                    </View>

                </Modal>
                
                <View style={{ width: width, height: 90 * s, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ left: 20 * s, }} onPress={() => this.back()}>
                        <Icon name="left" color="#333" size={40 * s} />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ color: '#333', fontSize: 30 * s, left: width * 0.3 }}>状态切换</Text>
                    </View>
                </View>
                <View style={{marginTop:'2%'}}>
                    <TouchableOpacity onPress={() => { this.modify_state() }} style={{ width: width, height: 90 * s, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 0.02 * width, marginBottom: 15 / scale }}>
                        <Text style={{ width: '20%', fontSize: 26 * s, paddingLeft: '5%' }}>状态：</Text>
                        <View style={{ width: '15%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 26 * s, }}>{this.state.data.state == 0 ? '休息' : '在线'}</Text>
                            <Icon size={30 * s} name="right" color="#d8d8d8" style={{}} />
                        </View>

                    </TouchableOpacity>
                </View>
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cover1: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
})
