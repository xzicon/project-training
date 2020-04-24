import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Dimensions, NavigationBar, ToastAndroid, FlatList, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';

const { width, scale, height } = Dimensions.get('window');
const s = width / 640;

export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('http://116.62.14.0:8402/article/zuixin/' + this.props.aid)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ data: res.data });
                console.log(res.data);
            })
    }
    render() {
        return (
            <View>
                {this.state.data.length !== 0 ?
                    <FlatList
                        data={this.state.data}
                        numColumns={1}
                        renderItem={({ item }) => (
                            <View style={{ backgroundColor: '#cfc5bb', marginTop: 10, marginBottom: 10, flex: 1 }}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => Actions.people({uid:item.uid})}>
                                    <Image
                                        source={{ uri: 'http://116.62.14.0:8402/images/' + item.uimage }}
                                        style={{ width: 50, height: 50, borderRadius: 50 }}
                                    />
                                </TouchableOpacity>
                                <View style={styles.theader}>
                                    <Text style={{ fontSize: 18 }}>{item.uname}</Text>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>{item.actime}</Text>
                                </View>
                            </View>
                            <View style={styles.content}>
                                <Text style={{fontSize: 16}}>{item.accontent}</Text>
                            </View>
                        </View>
                        )}
                    /> : <View style={{ backgroundColor: '#cfc5bb', marginTop: 10, marginBottom: 10, flex: 1 }}>
                        <Text>目前还没有人评论哦~  </Text>
                    </View>}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20 * s,
        marginBottom: 10 * s,
        marginTop: 10 * s
    },
    theader: {
        marginLeft: 40 * s
    },
    content: {
        marginLeft: 20 * s,
        marginRight: 20 * s,
    }
})