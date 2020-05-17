import React, { Component } from 'react'
import { Text, View, AsyncStorage, TouchableOpacity, StyleSheet, Dimensions, Modal, FlatList, Image } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';

const { width, scale, height } = Dimensions.get('window');
const s = width / 640;

export default class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            uid: '',
            sou: false,
            material_data: [],
            msid: undefined,
            msname: '',
            flag: 1,
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('uid')
            .then((res) => {
                res === null ?
                    this.setState({ uid: '' })
                    :
                    this.setState({ uid: res })
                if (this.props.title === '句段') {
                    fetch('http://116.62.14.0:8402/material/mtab/sucai')
                        .then((res) => res.json())
                        .then((res) => {
                            this.setState({ data: res.data, msid: res.data[0].msid, msname: res.data[0].msname });
                            this.material(this.state.msid, this.state.msname, 1);
                        })
                } else if (this.props.title === '人物') {
                    fetch('http://116.62.14.0:8402/material/mtab/renwu')
                        .then((res) => res.json())
                        .then((res) => {
                            this.setState({ data: res.data, msid: res.data[0].msid, msname: res.data[0].msname });
                            this.material(this.state.msid, this.state.msname, 1);
                        })
                } else if (this.props.title === '时事') {
                    fetch('http://116.62.14.0:8402/material/mtab/shishi')
                        .then((res) => res.json())
                        .then((res) => {
                            this.setState({ data: res.data, msid: res.data[0].msid, msname: res.data[0].msname });
                            this.material(this.state.msid, this.state.msname, 1);
                        })
                } else {
                    fetch('http://116.62.14.0:8402/material/mtab/mingzhuyingshi')
                        .then((res) => res.json())
                        .then((res) => {
                            this.setState({ data: res.data, msid: res.data[0].msid, msname: res.data[0].msname });
                            this.material(this.state.msid, this.state.msname, 1);
                        })
                }
            })

    }
    source = () => {
        fetch('http://116.62.14.0:8402/material/mtab/sucai')
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data });
            })
    }
    _source = () => {
        fetch('http://116.62.14.0:8402/material/mtab/sucai')
            .then((res) => res.json())
            .then((res) => {
                this.setState({ sou: true, data: res.data });
            })
    }
    _source_false = () => {
        this.setState({
            sou: false,
        })
    }
    material = (msid, msname, flag) => {
        if (flag === 1) {
            fetch('http://116.62.14.0:8402/material/zuire/' + msid)
                .then((res) => res.json())
                .then((res) => {
                    this.setState({ material_data: res.data, msid: res.data[0].msid, msname: msname, flag: flag });
                })
        } else {
            fetch('http://116.62.14.0:8402/material/zuixin/' + msid)
                .then((res) => res.json())
                .then((res) => {
                    this.setState({ material_data: res.data, msid: res.data[0].msid, msname: msname, flag: flag });
                })
        }
    }
    render() {
        console.log(this.state.material_data);
        return (
            this.props.title === '句段' ?
                (this.state.data.length !== 0 && this.state.flag === 1 ?
                    <View>
                        <Modal
                            animationType='silde'
                            onRequestClose={this._source_false}//安卓必须设置
                            transparent={true}
                            visible={this.state.sou}
                            autoFocus={true}
                        >
                            <TouchableOpacity style={styles.cover}
                                onPress={this._source_false}>
                            </TouchableOpacity>
                            <View style={{ width: '60%', height: '100%', backgroundColor: '#fff', position: 'absolute', top: 0, right: 0 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 * s, borderBottomWidth: s, borderBottomColor: 'gray' }}>
                                    <View>
                                        <Text style={{ fontSize: 26 * s }}>主题分类</Text>
                                    </View>
                                    <Icon onPress={() => this._source_false()} name="close" color="#000" size={40 * s} />
                                </View>
                                <FlatList
                                    data={this.state.data}
                                    numColumns={3}
                                    renderItem={({ item }) => (
                                        <View>
                                            <TouchableOpacity onPress={() => { this.material(item.msid, item.msname, 1) }} style={styles.container1}>
                                                <Text style={{ color: '#000', fontSize: 20 * s }}>{item.msname}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
                        </Modal>
                        <View style={styles.header}>
                            <Icon onPress={() => { Actions.pop() }} name="left" color="#000" size={35 * s} />
                            <View><Text style={{ color: '#000', fontSize: 30 * s }}>{this.props.title}素材</Text></View>
                            <Icon onPress={() => this._source()} name="bars" color="#000" size={40 * s} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 14 * s, backgroundColor: '#fff', marginTop: 10 * s, borderBottomColor: 'gray', borderBottomWidth: s }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ width: 26 * s, height: 26 * s, marginTop: 5 * s, marginLeft: 10 * s }} source={require('../../assets/composition/composition/ziyuan.png')} />
                                <View><Text style={{ fontSize: 24 * s }}>{this.state.msname}</Text></View>
                            </View>
                            <TouchableOpacity onPress={() => { this.material(this.state.msid, this.state.msname, 0) }} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ width: 30 * s, height: 30 * s }} source={require('../../assets/composition/composition/sort2.png')} />
                                <Text style={{ color: '#5482b4', fontSize: 20 * s }}>按热度</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingBottom: 320 * s }}>
                            <FlatList
                                style={{ backgroundColor: '#fff' }}
                                data={this.state.material_data}
                                numColumns={1}
                                renderItem={({ item }) => (
                                    item.mimage === '' ?
                                        <View>
                                            <View style={styles.container}>
                                                <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                    <Text style={{ fontSize: 26 * s, padding: 20 * s }}>{item.mtitle}</Text>
                                                    <Text style={{ fontSize: 18 * s, color: 'gray', padding: 20 * s, textAlign: 'right' }}>{item.mlocal}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        : (item.mimage.split('.')[1] === 'mp4' ?
                                            <View style={styles.container}>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                                    <Video
                                                        source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                        ref={(ref) => {
                                                            this.video = ref
                                                        }}
                                                        style={{ width: width, height: 350 * s }}
                                                        rate={this.state.rate}
                                                        paused={this.state.paused}
                                                        volume={this.state.volume}
                                                        muted={this.state.muted}
                                                        repeat={false}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                                    <Text style={{ fontSize: 26 * s, margin: 10 * s }}>{item.mtitle}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            <View style={styles.container}>
                                                <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                    <Image
                                                        style={{ width: width - 40 * s, height: 280 * s, margin: 20 * s }}
                                                        source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                    />
                                                    <Text style={{ fontSize: 26 * s, marginBottom: 20 * s, marginLeft: 20 * s, marginRight: 20 * s }}>{item.mtitle}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                            />
                        </View>
                    </View>
                    : (this.state.data.length !== 0 && this.state.flag === 0 ?
                        <View>
                            <Modal
                                animationType='silde'
                                onRequestClose={this._source_false}//安卓必须设置
                                transparent={true}
                                visible={this.state.sou}
                                autoFocus={true}
                            >
                                <TouchableOpacity style={styles.cover}
                                    onPress={this._source_false}>
                                </TouchableOpacity>
                                <View style={{ width: '60%', height: '100%', backgroundColor: '#fff', position: 'absolute', top: 0, right: 0 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 * s, borderBottomWidth: s, borderBottomColor: 'gray' }}>
                                        <View>
                                            <Text style={{ fontSize: 26 * s }}>主题分类</Text>
                                        </View>
                                        <Icon onPress={() => this._source_false()} name="close" color="#000" size={40 * s} />
                                    </View>
                                    <FlatList
                                        data={this.state.data}
                                        numColumns={3}
                                        renderItem={({ item }) => (
                                            <View>
                                                <TouchableOpacity onPress={() => { this.material(item.msid, item.msname, 1) }} style={styles.container1}>
                                                    <Text style={{ color: '#000', fontSize: 20 * s }}>{item.msname}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    />
                                </View>
                            </Modal>
                            <View style={styles.header}>
                                <Icon onPress={() => { Actions.pop() }} name="left" color="#000" size={35 * s} />
                                <View><Text style={{ color: '#000', fontSize: 30 * s }}>{this.props.title}素材</Text></View>
                                <Icon onPress={() => this._source()} name="bars" color="#000" size={40 * s} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 14 * s, backgroundColor: '#fff', marginTop: 10 * s, borderBottomColor: 'gray', borderBottomWidth: s }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ width: 26 * s, height: 26 * s, marginTop: 5 * s, marginLeft: 10 * s }} source={require('../../assets/composition/composition/ziyuan.png')} />
                                    <View><Text style={{ fontSize: 24 * s }}>{this.state.msname}</Text></View>
                                </View>
                                <TouchableOpacity onPress={() => { this.material(this.state.msid, this.state.msname, 1) }} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ width: 30 * s, height: 30 * s }} source={require('../../assets/composition/composition/sort.png')} />
                                    <Text style={{ color: '#5482b4', fontSize: 20 * s }}>按时间</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ paddingBottom: 320 * s }}>
                                <FlatList
                                    style={{ backgroundColor: '#fff' }}
                                    data={this.state.material_data}
                                    numColumns={1}
                                    renderItem={({ item }) => (
                                        item.mimage === '' ?
                                            <View>
                                                <View style={styles.container}>
                                                    <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                        <Text style={{ fontSize: 26 * s, padding: 20 * s }}>{item.mtitle}</Text>
                                                        <Text style={{ fontSize: 18 * s, color: 'gray', padding: 20 * s, textAlign: 'right' }}>{item.mlocal}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            : (item.mimage.split('.')[1] === 'mp4' ?
                                                <View style={styles.container}>
                                                    <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                                        <Video
                                                            source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                            ref={(ref) => {
                                                                this.video = ref
                                                            }}
                                                            style={{ width: width, height: 350 * s, }}
                                                            rate={this.state.rate}
                                                            paused={this.state.paused}
                                                            volume={this.state.volume}
                                                            muted={this.state.muted}
                                                            repeat={false}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                                        <Text style={{ fontSize: 26 * s, margin: 10 * s }}>{item.mtitle}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <View style={styles.container}>
                                                    <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                        <Image
                                                            style={{ width: width - 40 * s, height: 280 * s, margin: 20 * s }}
                                                            source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                        />
                                                        <Text style={{ fontSize: 26 * s, marginBottom: 20 * s, marginLeft: 20 * s, marginRight: 20 * s }}>{item.mtitle}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                />
                            </View>
                        </View>
                        : (this.state.material_data.length !== 0 && this.state.flag === 1 ?
                            <View>
                                <Modal
                                    animationType='silde'
                                    onRequestClose={this._source_false}//安卓必须设置
                                    transparent={true}
                                    visible={this.state.sou}
                                    autoFocus={true}
                                >
                                    <TouchableOpacity style={styles.cover}
                                        onPress={this._source_false}>
                                    </TouchableOpacity>
                                    <View style={{ width: '60%', height: '100%', backgroundColor: '#fff', position: 'absolute', top: 0, right: 0 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 * s, borderBottomWidth: s, borderBottomColor: 'gray' }}>
                                            <View>
                                                <Text style={{ fontSize: 26 * s }}>主题分类</Text>
                                            </View>
                                            <Icon onPress={() => this._source_false()} name="close" color="#000" size={40 * s} />
                                        </View>
                                        <FlatList
                                            data={this.state.data}
                                            numColumns={3}
                                            renderItem={({ item }) => (
                                                <View>
                                                    <TouchableOpacity onPress={() => { this.material(item.msid, item.msname, 1) }} style={styles.container1}>
                                                        <Text style={{ color: '#000', fontSize: 20 * s }}>{item.msname}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        />
                                    </View>
                                </Modal>
                                <View style={styles.header}>
                                    <Icon onPress={() => { Actions.pop() }} name="left" color="#000" size={35 * s} />
                                    <View><Text style={{ color: '#000', fontSize: 30 * s }}>{this.props.title}素材</Text></View>
                                    <Icon onPress={() => this._source()} name="bars" color="#000" size={40 * s} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 14 * s, backgroundColor: '#fff', marginTop: 10 * s, borderBottomColor: 'gray', borderBottomWidth: s }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image style={{ width: 26 * s, height: 26 * s, marginTop: 5 * s, marginLeft: 10 * s }} source={require('../../assets/composition/composition/ziyuan.png')} />
                                        <View><Text style={{ fontSize: 24 * s }}>{this.state.msname}</Text></View>
                                    </View>
                                    <TouchableOpacity onPress={() => { this.material(this.state.msid, this.state.msname, 1) }} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image style={{ width: 30 * s, height: 30 * s }} source={require('../../assets/composition/composition/sort.png')} />
                                        <Text style={{ color: '#5482b4', fontSize: 20 * s }}>按时间</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ paddingBottom: 320 * s }}>
                                    <FlatList
                                        style={{ backgroundColor: '#fff' }}
                                        data={this.state.material_data}
                                        numColumns={1}
                                        renderItem={({ item }) => (
                                            item.mimage === '' ?
                                                <View>
                                                    <View style={styles.container}>
                                                        <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                            <Text style={{ fontSize: 26 * s, padding: 20 * s }}>{item.mtitle}</Text>
                                                            <Text style={{ fontSize: 18 * s, color: 'gray', padding: 20 * s, textAlign: 'right' }}>{item.mlocal}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                : (item.mimage.split('.')[1] === 'mp4' ?
                                                    <View style={styles.container}>
                                                        <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                                            <Video
                                                                source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                                ref={(ref) => {
                                                                    this.video = ref
                                                                }}
                                                                style={{ width: width, height: 350 * s, }}
                                                                rate={this.state.rate}
                                                                paused={this.state.paused}
                                                                volume={this.state.volume}
                                                                muted={this.state.muted}
                                                                repeat={false}
                                                            />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                                            <Text style={{ fontSize: 26 * s, margin: 10 * s }}>{item.mtitle}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    :
                                                    <View style={styles.container}>
                                                        <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                            <Image
                                                                style={{ width: width - 40 * s, height: 280 * s, margin: 20 * s }}
                                                                source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                            />
                                                            <Text style={{ fontSize: 26 * s, marginBottom: 20 * s, marginLeft: 20 * s, marginRight: 20 * s }}>{item.mtitle}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                ))}
                                    />
                                </View>
                            </View>
                            : (this.state.material_data.length !== 0 && this.state.flag === 0 ?
                                <View>
                                    <Modal
                                        animationType='silde'
                                        onRequestClose={this._source_false}//安卓必须设置
                                        transparent={true}
                                        visible={this.state.sou}
                                        autoFocus={true}
                                    >
                                        <TouchableOpacity style={styles.cover}
                                            onPress={this._source_false}>
                                        </TouchableOpacity>
                                        <View style={{ width: '60%', height: '100%', backgroundColor: '#fff', position: 'absolute', top: 0, right: 0 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 * s, borderBottomWidth: s, borderBottomColor: 'gray' }}>
                                                <View>
                                                    <Text style={{ fontSize: 26 * s }}>主题分类</Text>
                                                </View>
                                                <Icon onPress={() => this._source_false()} name="close" color="#000" size={40 * s} />
                                            </View>
                                            <FlatList
                                                data={this.state.data}
                                                numColumns={3}
                                                renderItem={({ item }) => (
                                                    <View>
                                                        <TouchableOpacity onPress={() => { this.material(item.msid, item.msname, 1) }} style={styles.container1}>
                                                            <Text style={{ color: '#000', fontSize: 20 * s }}>{item.msname}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            />
                                        </View>
                                    </Modal>
                                    <View style={styles.header}>
                                        <Icon onPress={() => { Actions.pop() }} name="left" color="#000" size={35 * s} />
                                        <View><Text style={{ color: '#000', fontSize: 30 * s }}>{this.props.title}素材</Text></View>
                                        <Icon onPress={() => this._source()} name="bars" color="#000" size={40 * s} />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 14 * s, backgroundColor: '#fff', marginTop: 10 * s, borderBottomColor: 'gray', borderBottomWidth: s }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={{ width: 26 * s, height: 26 * s, marginTop: 5 * s, marginLeft: 10 * s }} source={require('../../assets/composition/composition/ziyuan.png')} />
                                            <View><Text style={{ fontSize: 24 * s }}>{this.state.msname}</Text></View>
                                        </View>
                                        <TouchableOpacity onPress={() => { this.material(this.state.msid, this.state.msname, 1) }} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image style={{ width: 30 * s, height: 30 * s }} source={require('../../assets/composition/composition/sort.png')} />
                                            <Text style={{ color: '#5482b4', fontSize: 20 * s }}>按时间</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ paddingBottom: 320 * s }}>
                                        <FlatList
                                            style={{ backgroundColor: '#fff' }}
                                            data={this.state.material_data}
                                            numColumns={1}
                                            renderItem={({ item }) => (
                                                item.mimage === '' ?
                                                    <View>
                                                        <View style={styles.container}>
                                                            <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                                <Text style={{ fontSize: 26 * s, padding: 20 * s }}>{item.mtitle}</Text>
                                                                <Text style={{ fontSize: 18 * s, color: 'gray', padding: 20 * s, textAlign: 'right' }}>{item.mlocal}</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    : (item.mimage.split('.')[1] === 'mp4' ?
                                                        <View style={styles.container}>
                                                            <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                                                <Video
                                                                    source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                                    ref={(ref) => {
                                                                        this.video = ref
                                                                    }}
                                                                    style={{ width: width, height: 350 * s, }}
                                                                    rate={this.state.rate}
                                                                    paused={this.state.paused}
                                                                    volume={this.state.volume}
                                                                    muted={this.state.muted}
                                                                    repeat={false}
                                                                />
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                                                <Text style={{ fontSize: 26 * s, margin: 10 * s }}>{item.mtitle}</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        :
                                                        <View style={styles.container}>
                                                            <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                                <Image
                                                                    style={{ width: width - 40 * s, height: 280 * s, margin: 20 * s }}
                                                                    source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                                />
                                                                <Text style={{ fontSize: 26 * s, marginBottom: 20 * s, marginLeft: 20 * s, marginRight: 20 * s }}>{item.mtitle}</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    ))}
                                        />
                                    </View>
                                </View>
                                :
                                <View>
                                    <Modal
                                        animationType='silde'
                                        onRequestClose={this._source_false}//安卓必须设置
                                        transparent={true}
                                        visible={this.state.sou}
                                        autoFocus={true}
                                    >
                                        <TouchableOpacity style={styles.cover}
                                            onPress={this._source_false}>
                                        </TouchableOpacity>
                                        <View style={{ width: '60%', height: '100%', backgroundColor: '#fff', position: 'absolute', top: 0, right: 0 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 * s, borderBottomWidth: s, borderBottomColor: 'gray' }}>
                                                <View>
                                                    <Text style={{ fontSize: 26 * s }}>主题分类</Text>
                                                </View>
                                                <Icon onPress={() => this._source_false()} name="close" color="#000" size={40 * s} />
                                            </View>
                                            <FlatList
                                                data={this.state.data}
                                                numColumns={3}
                                                renderItem={({ item }) => (
                                                    <View>
                                                        <TouchableOpacity onPress={() => { this.material(item.msid, item.msname, 1) }} style={styles.container1}>
                                                            <Text style={{ color: '#000', fontSize: 20 * s }}>{item.msname}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            />
                                        </View>
                                    </Modal>
                                    <View style={styles.header}>
                                        <Icon onPress={() => { Actions.pop() }} name="left" color="#000" size={35 * s} />
                                        <View><Text style={{ color: '#000', fontSize: 30 * s }}>{this.props.title}素材</Text></View>
                                        <Icon onPress={() => this._source()} name="bars" color="#000" size={40 * s} />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 14 * s, backgroundColor: '#fff', marginTop: 10 * s, borderBottomColor: 'gray', borderBottomWidth: s }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image style={{ width: 26 * s, height: 26 * s, marginTop: 5 * s, marginLeft: 10 * s }} source={require('../../assets/composition/composition/ziyuan.png')} />
                                            <View><Text style={{ fontSize: 24 * s }}>{this.state.msname}</Text></View>
                                        </View>
                                        <TouchableOpacity onPress={() => { this.material(this.state.msid, this.state.msname, 0) }} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image style={{ width: 30 * s, height: 30 * s }} source={require('../../assets/composition/composition/sort2.png')} />
                                            <Text style={{ color: '#5482b4', fontSize: 20 * s }}>按热度</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginTop: 10 * s, marginBottom: 10 * s, flex: 1 }}>
                                        <Text>当前还没有素材</Text>
                                    </View>
                                </View>))))
                : (this.props.title === '时事' ?
                    <View>
                        <Modal
                            animationType='silde'
                            onRequestClose={this._source_false}//安卓必须设置
                            transparent={true}
                            visible={this.state.sou}
                            autoFocus={true}
                        >
                            <TouchableOpacity style={styles.cover}
                                onPress={this._source_false}>
                            </TouchableOpacity>
                            <View style={{ width: '60%', height: '100%', backgroundColor: '#fff', position: 'absolute', top: 0, right: 0 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 * s, borderBottomWidth: s, borderBottomColor: 'gray' }}>
                                    <View>
                                        <Text style={{ fontSize: 26 * s }}>主题分类</Text>
                                    </View>
                                    <Icon onPress={() => this._source_false()} name="close" color="#000" size={40 * s} />
                                </View>
                                <FlatList
                                    data={this.state.data}
                                    numColumns={3}
                                    renderItem={({ item }) => (
                                        <View>
                                            <TouchableOpacity onPress={() => { this.material(item.msid, item.msname, 1) }} style={styles.container1}>
                                                <Text style={{ color: '#000', fontSize: 20 * s }}>{item.msname}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
                        </Modal>
                        <View style={styles.header2}>
                            <Icon onPress={() => { Actions.pop() }} name="left" color="#000" size={35 * s} />
                            <View><Text style={{ color: '#000', fontSize: 30 * s }}>{this.props.title}素材</Text></View>
                        </View>
                        <View style={{ paddingBottom: 180 * s }}>
                            <FlatList
                                style={{ backgroundColor: '#fff' }}
                                data={this.state.material_data}
                                numColumns={1}
                                renderItem={({ item }) => (
                                    item.mimage === '' ?
                                        <View>
                                            <View style={styles.container}>
                                                <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                    <Text style={{ fontSize: 26 * s, padding: 20 * s }}>{item.mtitle}</Text>
                                                    <Text style={{ fontSize: 18 * s, color: 'gray', padding: 20 * s }}>{item.mlocal}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        :
                                        <View style={styles.container}>
                                            <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                <Image
                                                    style={{ width: width - 40 * s, height: 280 * s, margin: 20 * s }}
                                                    source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                />
                                                <Text style={{ fontSize: 26 * s, marginBottom: 20 * s, marginLeft: 20 * s, marginRight: 20 * s }}>{item.mtitle}</Text>
                                            </TouchableOpacity>
                                        </View>
                                )}
                            />
                        </View>
                    </View>
                    : (this.props.title === '人物' ?
                        <View>
                            <Modal
                                animationType='silde'
                                onRequestClose={this._source_false}//安卓必须设置
                                transparent={true}
                                visible={this.state.sou}
                                autoFocus={true}
                            >
                                <TouchableOpacity style={styles.cover}
                                    onPress={this._source_false}>
                                </TouchableOpacity>
                                <View style={{ width: '60%', height: '100%', backgroundColor: '#fff', position: 'absolute', top: 0, right: 0 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 * s, borderBottomWidth: s, borderBottomColor: 'gray' }}>
                                        <View>
                                            <Text style={{ fontSize: 26 * s }}>主题分类</Text>
                                        </View>
                                        <Icon onPress={() => this._source_false()} name="close" color="#000" size={40 * s} />
                                    </View>
                                    <FlatList
                                        data={this.state.data}
                                        numColumns={3}
                                        renderItem={({ item }) => (
                                            <View>
                                                <TouchableOpacity onPress={() => { this.material(item.msid, item.msname, 1) }} style={styles.container1}>
                                                    <Text style={{ color: '#000', fontSize: 20 * s }}>{item.msname}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    />
                                </View>
                            </Modal>
                            <View style={styles.header2}>
                                <Icon onPress={() => { Actions.pop() }} name="left" color="#000" size={35 * s} />
                                <View><Text style={{ color: '#000', fontSize: 30 * s }}>{this.props.title}素材</Text></View>
                            </View>
                            <View style={{ paddingBottom: 180 * s }}>
                                <FlatList
                                    style={{ backgroundColor: '#fff' }}
                                    data={this.state.material_data}
                                    numColumns={1}
                                    renderItem={({ item }) => (
                                        item.mimage === '' ?
                                            <View>
                                                <View style={{
                                                    width: width,
                                                    borderBottomColor: '#f5f4f9',
                                                    borderBottomWidth: 10 * s,
                                                    height: 200 * s
                                                }}>
                                                    <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                        <Text style={{ fontSize: 26 * s, padding: 20 * s }}>{item.mtitle}</Text>
                                                        <Text style={{ fontSize: 18 * s, color: 'gray', padding: 20 * s }}>{item.mlocal}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            :
                                            <View style={{
                                                width: width,
                                                borderBottomColor: '#f5f4f9',
                                                borderBottomWidth: 10 * s,
                                                height: 200 * s,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between', padding: 20 * s
                                            }}>
                                                <View style={{ width: '65%', overflow: 'hidden' }}>
                                                    <Text onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }} style={{ fontSize: 26 * s, height: 30 * s, marginTop: 26 * s }}>{item.mtitle}</Text>
                                                    <Text style={{ fontSize: 18 * s, color: 'gray', paddingTop: 40 * s }}>{item.mlocal}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }} style={{ width: '30%' }}>
                                                    <Image
                                                        style={{ width: '100%', height: 150 * s }}
                                                        source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                    )}
                                />
                            </View>
                        </View>
                        :
                        <View>
                            <Modal
                                animationType='silde'
                                onRequestClose={this._source_false}//安卓必须设置
                                transparent={true}
                                visible={this.state.sou}
                                autoFocus={true}
                            >
                                <TouchableOpacity style={styles.cover}
                                    onPress={this._source_false}>
                                </TouchableOpacity>
                                <View style={{ width: '60%', height: '100%', backgroundColor: '#fff', position: 'absolute', top: 0, right: 0 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 * s, borderBottomWidth: s, borderBottomColor: 'gray' }}>
                                        <View>
                                            <Text style={{ fontSize: 26 * s }}>主题分类</Text>
                                        </View>
                                        <Icon onPress={() => this._source_false()} name="close" color="#000" size={40 * s} />
                                    </View>
                                    <FlatList
                                        data={this.state.data}
                                        numColumns={3}
                                        renderItem={({ item }) => (
                                            <View>
                                                <TouchableOpacity onPress={() => { this.material(item.msid, item.msname, 1) }} style={styles.container1}>
                                                    <Text style={{ color: '#000', fontSize: 20 * s }}>{item.msname}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    />
                                </View>
                            </Modal>
                            <View style={{
                                backgroundColor: '#fff',
                                height: 90 * s,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingLeft: 40 * s,
                                paddingRight: '36%',
                                marginBottom: 10 * s
                            }}>
                                <Icon onPress={() => { Actions.pop() }} name="left" color="#000" size={35 * s} />
                                <View><Text style={{ color: '#000', fontSize: 30 * s }}>{this.props.title}素材</Text></View>
                            </View>
                            <View style={{ paddingBottom: 180 * s }}>
                                <FlatList
                                    style={{ backgroundColor: '#fff' }}
                                    data={this.state.material_data}
                                    numColumns={1}
                                    renderItem={({ item }) => (
                                        item.mimage === '' ?
                                            <View>
                                                <View style={styles.container}>
                                                    <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                        <Text style={{ fontSize: 26 * s, padding: 20 * s }}>{item.mtitle}</Text>
                                                        <Text style={{ fontSize: 18 * s, color: 'gray', padding: 20 * s }}>{item.mlocal}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            : (item.mimage.split('.')[1] === 'mp4' ?
                                                <View style={styles.container}>
                                                    <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                                        <Video
                                                            source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                            ref={(ref) => {
                                                                this.video = ref
                                                            }}
                                                            style={{ width: width, height: 350 * s, }}
                                                            rate={this.state.rate}
                                                            paused={this.state.paused}
                                                            volume={this.state.volume}
                                                            muted={this.state.muted}
                                                            repeat={false}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid, mtab: item.mtab })}>
                                                        <Text style={{ fontSize: 26 * s, margin: 10 * s }}>{item.mtitle}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <View style={styles.container}>
                                                    <TouchableOpacity onPress={() => { Actions.popular({ mid: item.mid, mtab: item.mtab }) }}>
                                                        <Image
                                                            style={{ width: width - 40 * s, height: 240 * s, margin: 20 * s }}
                                                            source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                        />
                                                        <Text style={{ fontSize: 26 * s, marginLeft: 20 * s, marginRight: 20 * s, marginBottom: 20 * s }}>{item.mtitle}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                />
                            </View>
                        </View>))
        )
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        height: 90 * s,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 40 * s,
        paddingRight: 40 * s,
    },
    cover: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    container1: {
        width: 80 * s,
        backgroundColor: '#fff',
        marginTop: 20 * s,
        marginBottom: 10 * s,
        marginLeft: 36 * s,
        paddingTop: 4 * s,
        paddingBottom: 4 * s,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 2 * s,
        borderRadius: 10 * s
    },
    container: {
        width: width,
        borderBottomColor: '#f5f4f9',
        borderBottomWidth: 10 * s,
    },
    header2: {
        backgroundColor: '#fff',
        height: 90 * s,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 40 * s,
        paddingRight: '40%',
        marginBottom: 10 * s
    },
})