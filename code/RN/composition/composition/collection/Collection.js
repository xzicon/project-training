import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import AnimatedTabs from 'react-native-animated-tabs';
import { Scene, Actions, Tabs } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';

const getDeviceHeight = () => Dimensions.get('window').height;
const getDeviceWidth = () => Dimensions.get('window').width;
const getPanelWidth = () => getDeviceWidth() / 1.3;

const panelsCount = 4;

const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
let date = new Date();
let Y = date.getFullYear();
let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
let D1 = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
let D2 = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) - 1;
let D3 = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) - 2;
let D4 = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) - 3;
let D5 = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) - 4;
let D6 = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) - 5;
let D7 = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) - 6;
let groomdate1 = Y + '-' + M + '-' + D1;
let groomdate2 = Y + '-' + M + '-' + D2;
let groomdate3 = Y + '-' + M + '-' + D3;
let groomdate4 = Y + '-' + M + '-' + D4;
let groomdate5 = Y + '-' + M + '-' + D5;
let groomdate6 = Y + '-' + M + '-' + D6;
let groomdate7 = Y + '-' + M + '-' + D7;
console.log(groomdate1, groomdate2, groomdate3, groomdate4, groomdate5, groomdate6, groomdate7);

class AnimatedTabsExample extends Component {
    constructor() {
        super();
        this.state = {
            activePanel: 0,
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
                this.fetchf();
            })
    }
    fetchf = () => {
        fetch('http://116.62.14.0:8402/groom/all')
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    data: res.data,
                });
            })
    }
    render() {
        const animatedViewStyle = { flex: 1, marginTop: getDeviceHeight() / 4 };
        const imageStyle = { flex: 1, width: getPanelWidth() };
        const tabContentStyle = {
            height: getDeviceHeight() - getDeviceHeight() / 2,
            width: getPanelWidth()
        };

        return (
            // <View>
                
                <View style={animatedViewStyle}>
                    <View style={{ width: width, height: 90 * s, flexDirection: 'row', alignItems: 'center',marginTop:-215 }}>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Icon size={35 * s} style={{ color: '#000', marginLeft: 20 * s }} name='left' />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 26 * s, marginLeft: width * 0.34 ,marginTop:0}}>日更合集</Text>
                    </View>
                </View>
                    <AnimatedTabs
                        panelWidth={getPanelWidth()}
                        activePanel={this.state.activePanel}
                        onAnimateFinish={activePanel => this.setState({ activePanel })}
                    >

                        <FlatList
                            style={{ backgroundColor: '#fff', paddingBottom: 20 * s }}
                            data={this.state.data}
                            numColumns={1}
                            renderItem={({ item }) => (
                                item.groomdate === groomdate1 ?
                                    item.mimage === '' ?
                                        <View>
                                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', borderStyle: 'dashed', borderColor: 'gray', borderWidth: s, borderRadius: 14 * s }}>
                                                    <Text style={{ fontSize: 26 * s, margin: 10 * s, paddingTop: 20 * s }}>{item.mtitle}</Text>
                                                    <Text style={{ textAlign: 'right', fontSize: 18 * s, margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        :
                                        <View>
                                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', borderStyle: 'dashed', borderColor: 'gray', borderWidth: s, borderRadius: 14 * s }}>
                                                    <Image
                                                        style={{ width: "100%", height: 240 * s }}
                                                        source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                    />
                                                    <Text style={{ fontSize: 26 * s }}>{item.mtitle}</Text>
                                                    {/* <Text style={{ textAlign: 'right', fontSize: 18 * s, margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text> */}
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    : <View></View>
                            )}
                        />
                        {/* <Image style={imageStyle} source={require('../../../assets/composition/composition/composition.png')} resizeMode='stretch'/> */}
                        <FlatList
                            style={{ backgroundColor: '#fff', paddingBottom: 20 * s }}
                            data={this.state.data}
                            numColumns={1}
                            renderItem={({ item }) => (
                                item.groomdate === groomdate2 ?
                                    item.mimage === '' ?
                                        <View>
                                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', borderStyle: 'dashed', borderColor: 'gray', borderWidth: s, borderRadius: 14 * s }}>
                                                    <Text style={{ fontSize: 26 * s, margin: 10 * s, paddingTop: 20 * s }}>{item.mtitle}</Text>
                                                    <Text style={{ textAlign: 'right', fontSize: 18 * s, margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        :
                                        <View>
                                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', borderStyle: 'dashed', borderColor: 'gray', borderWidth: s, borderRadius: 14 * s }}>
                                                    <Image
                                                        style={{ width: "100%", height: 240 * s }}
                                                        source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                    />
                                                    <Text style={{ fontSize: 26 * s }}>{item.mtitle}</Text>
                                                    {/* <Text style={{ textAlign: 'right', fontSize: 18 * s, margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text> */}
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    : <View></View>
                            )}
                        />
                        <FlatList
                            style={{ backgroundColor: '#fff', paddingBottom: 20 * s }}
                            data={this.state.data}
                            numColumns={1}
                            renderItem={({ item }) => (
                                item.groomdate === groomdate3 ?
                                    item.mimage === '' ?
                                        <View>
                                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', borderStyle: 'dashed', borderColor: 'gray', borderWidth: s, borderRadius: 14 * s }}>
                                                    <Text style={{ fontSize: 26 * s, margin: 10 * s, paddingTop: 20 * s }}>{item.mtitle}</Text>
                                                    <Text style={{ textAlign: 'right', fontSize: 18 * s, margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        :
                                        <View>
                                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', borderStyle: 'dashed', borderColor: 'gray', borderWidth: s, borderRadius: 14 * s }}>
                                                    <Image
                                                        style={{ width: "100%", height: 240 * s }}
                                                        source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                    />
                                                    <Text style={{ fontSize: 26 * s }}>{item.mtitle}</Text>
                                                    {/* <Text style={{ textAlign: 'right', fontSize: 18 * s, margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text> */}
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    : <View></View>
                            )}
                        />
                        <FlatList
                            style={{ backgroundColor: '#fff', paddingBottom: 20 * s }}
                            data={this.state.data}
                            numColumns={1}
                            renderItem={({ item }) => (
                                item.groomdate === groomdate4 ?
                                    item.mimage === '' ?
                                        <View>
                                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', borderStyle: 'dashed', borderColor: 'gray', borderWidth: s, borderRadius: 14 * s }}>
                                                    <Text style={{ fontSize: 26 * s, margin: 10 * s, paddingTop: 20 * s }}>{item.mtitle}</Text>
                                                    <Text style={{ textAlign: 'right', fontSize: 18 * s, margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        :
                                        <View>
                                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', borderStyle: 'dashed', borderColor: 'gray', borderWidth: s, borderRadius: 14 * s }}>
                                                    <Image
                                                        style={{ width: "100%", height: 240 * s }}
                                                        source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                    />
                                                    <Text style={{ fontSize: 26 * s }}>{item.mtitle}</Text>
                                                    {/* <Text style={{ textAlign: 'right', fontSize: 18 * s, margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text> */}
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    : <View></View>
                            )}
                        />
                        <FlatList
                            style={{ backgroundColor: '#fff', paddingBottom: 20 * s }}
                            data={this.state.data}
                            numColumns={1}
                            renderItem={({ item }) => (
                                item.groomdate === groomdate5 ?
                                    item.mimage === '' ?
                                        <View>
                                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', borderStyle: 'dashed', borderColor: 'gray', borderWidth: s, borderRadius: 14 * s }}>
                                                    <Text style={{ fontSize: 26 * s, margin: 10 * s, paddingTop: 20 * s }}>{item.mtitle}</Text>
                                                    <Text style={{ textAlign: 'right', fontSize: 18 * s, margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        :
                                        <View>
                                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', borderStyle: 'dashed', borderColor: 'gray', borderWidth: s, borderRadius: 14 * s }}>
                                                    <Image
                                                        style={{ width: "100%", height: 240 * s }}
                                                        source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                    />
                                                    <Text style={{ fontSize: 26 * s }}>{item.mtitle}</Text>
                                                    {/* <Text style={{ textAlign: 'right', fontSize: 18 * s, margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text> */}
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    : <View></View>
                            )}
                        />
                        <FlatList
                            style={{ backgroundColor: '#fff', paddingBottom: 20 * s }}
                            data={this.state.data}
                            numColumns={1}
                            renderItem={({ item }) => (
                                item.groomdate === groomdate6 ?
                                    item.mimage === '' ?
                                        <View>
                                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', borderStyle: 'dashed', borderColor: 'gray', borderWidth: s, borderRadius: 14 * s }}>
                                                    <Text style={{ fontSize: 26 * s, margin: 10 * s, paddingTop: 20 * s }}>{item.mtitle}</Text>
                                                    <Text style={{ textAlign: 'right', fontSize: 18 * s, margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        :
                                        <View>
                                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', borderStyle: 'dashed', borderColor: 'gray', borderWidth: s, borderRadius: 14 * s }}>
                                                    <Image
                                                        style={{ width: "100%", height: 240 * s }}
                                                        source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                    />
                                                    <Text style={{ fontSize: 26 * s }}>{item.mtitle}</Text>
                                                    {/* <Text style={{ textAlign: 'right', fontSize: 18 * s, margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text> */}
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    : <View></View>
                            )}
                        />
                        <FlatList
                            style={{ backgroundColor: '#fff', paddingBottom: 20 * s }}
                            data={this.state.data}
                            numColumns={1}
                            renderItem={({ item }) => (
                                item.groomdate === groomdate7 ?
                                    item.mimage === '' ?
                                        <View>
                                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', borderStyle: 'dashed', borderColor: 'gray', borderWidth: s, borderRadius: 14 * s }}>
                                                    <Text style={{ fontSize: 26 * s, margin: 10 * s, paddingTop: 20 * s }}>{item.mtitle}</Text>
                                                    <Text style={{ textAlign: 'right', fontSize: 18 * s, margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        :
                                        <View>
                                            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 20 * s }}>
                                                <TouchableOpacity onPress={() => Actions.popular({ mid: item.mid })} style={{ padding: 10 * s, width: '90%', borderStyle: 'dashed', borderColor: 'gray', borderWidth: s, borderRadius: 14 * s }}>
                                                    <Image
                                                        style={{ width: "100%", height: 240 * s }}
                                                        source={{ uri: 'http://116.62.14.0:8402/images/' + item.mimage }}
                                                    />
                                                    <Text style={{ fontSize: 26 * s }}>{item.mtitle}</Text>
                                                    {/* <Text style={{ textAlign: 'right', fontSize: 18 * s, margin: 10 * s, color: 'gray' }}>{item.mlocal}</Text> */}
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    : <View></View>
                            )}
                        />
                    </AnimatedTabs>

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.text} onPress={() => this.goToPanel(-1)}>
                            <Text>Previous</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.text} onPress={() => this.goToPanel(1)}>
                            <Text>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View >
            // </View>
        );
    }

    goToPanel(direction) {
        const nextPanel = this.state.activePanel + direction;

        if (nextPanel >= 0 && nextPanel < panelsCount) {
            this.setState({ activePanel: nextPanel });
        }
    }
}

const styles = StyleSheet.create({
    text: {
        padding: 15,
        alignSelf: 'center'
    },
    buttons: {
        flexDirection: 'row'
    }
});

export default AnimatedTabsExample;
