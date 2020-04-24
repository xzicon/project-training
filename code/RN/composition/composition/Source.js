import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Dimensions, NavigationBar, ToastAndroid, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { width, scale, height } = Dimensions.get('window');
const s = width / 640;

export default class Source extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            flag: '1',
        }

    }
    componentDidMount() {
        fetch('http://116.62.14.0:8402/material/mtab/sucai')
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data });
                console.log(res.data);
            })
    }
    Change1 = () => {
        fetch('http://116.62.14.0:8402/material/mtab/sucai')
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data, flag: '1' });
                console.log(res.data);
            })
    }
    Change2 = () => {
        fetch('http://116.62.14.0:8402/material/mtab/fanwen')
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data, flag: '2' });
                console.log(res.data);
            })
    }
    Change3 = () => {
        fetch('http://116.62.14.0:8402/material/mtab/jifa')
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data, flag: '3' });
                console.log(res.data);
            })
    }
    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Icon onPress={() => { Actions.pop() }} name="left" color="#000" style={{ marginLeft: 30 }} size={40 * s} />
                    <Text style={{ color: '#000', marginLeft: width * 0.32, fontSize: 35 * s }}>分类</Text>
                </View>
                {this.state.flag === '1' ?
                    <View>
                        <View style={styles.source}>
                            <TouchableOpacity>
                                <Text onPress={() => { this.Change1() }} style={{ color: 'red', borderBottomColor: 'red', borderBottomWidth: 4 * s, marginLeft: 30 * s, fontSize: 26* s }}>素材</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text onPress={() => { this.Change2() }} style={{ color: '#000', marginLeft: 30 * s, fontSize: 26 * s }}>范文</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text onPress={() => { this.Change3() }} style={{ color: '#000', marginLeft: 30 * s, fontSize: 26 * s }}>技法</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <FlatList
                                style={{ backgroundColor: '#fff' }}
                                data={this.state.data}
                                numColumns={3}
                                renderItem={({ item }) => (
                                    <View style={styles.container1}>
                                        <TouchableOpacity onPress={() => { Actions.material({ msid: item.msid, msname: item.msname }) }}>
                                            <Text style={{ color: '#000', fontSize: 24 * s }}>{item.msname}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </View>
                    </View> :
                    (this.state.flag === '2' ?
                        <View>
                            <View style={styles.source}>
                                <TouchableOpacity>
                                    <Text onPress={() => { this.Change1() }} style={{ color: '#000', marginLeft: 30 * s, fontSize: 26 * s }}>素材</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text onPress={() => { this.Change2() }} style={{ color: 'red', borderBottomColor: 'red', borderBottomWidth: 4 * s, marginLeft: 30 * s, fontSize: 26 * s }}>范文</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text onPress={() => { this.Change3() }} style={{ color: '#000', marginLeft: 30 * s, fontSize: 26 * s }}>技法</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <FlatList
                                    style={{ backgroundColor: '#fff' }}
                                    data={this.state.data}
                                    numColumns={3}
                                    renderItem={({ item }) => (
                                        <View style={styles.container1}>
                                            <TouchableOpacity onPress={() => { Actions.material({ msid: item.msid, msname: item.msname }) }}>
                                                <Text style={{ color: '#000', fontSize: 24 * s }}>{item.msname}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
                        </View> :
                        <View>
                            <View style={styles.source}>
                                <TouchableOpacity>
                                    <Text onPress={() => { this.Change1() }} style={{ color: '#000', marginLeft: 30 * s, fontSize: 26 * s }}>素材</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text onPress={() => { this.Change2() }} style={{ color: '#000', marginLeft: 30 * s, fontSize: 26 * s }}>范文</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text onPress={() => { this.Change3() }} style={{ color: 'red', borderBottomColor: 'red', borderBottomWidth: 4 * s, marginLeft: 30 * s, fontSize: 26 * s }}>技法</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <FlatList
                                    style={{ backgroundColor: '#fff' }}
                                    data={this.state.data}
                                    numColumns={3}
                                    renderItem={({ item }) => (
                                        <View style={styles.container1}>
                                            <TouchableOpacity onPress={() => { Actions.material({ msid: item.msid, msname: item.msname }) }}>
                                                <Text style={{ color: '#000', fontSize: 24 * s }}>{item.msname}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
                        </View>
                    )
                }
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
    },
    source: {
        width: width,
        height: 70 * s,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10 * s,
        marginBottom: 10 * s
    },
    container1: {
        width: width * 0.2,
        backgroundColor: '#fff',
        marginTop: 20 * s,
        marginBottom: 10 * s,
        marginLeft: 60 * s,
        paddingTop: 4 * s,
        paddingBottom: 4 * s,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 2 * s,
        borderRadius: 10 * s
    }
})