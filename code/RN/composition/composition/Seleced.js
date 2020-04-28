import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity,AsyncStorage, StyleSheet, Dimensions, NavigationBar, ToastAndroid, FlatList, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
// import {CheckBox} from 'react-native-elements';
import CheckBox from 'react-native-check-box'

const { width, scale, height } = Dimensions.get('window');
const s = width / 640;

export default class Seleced extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            value:[],
            name: [],
            borderColor: '#000',
        }
    } 
    componentDidMount(){
        AsyncStorage.getItem('uid')
        .then((res)=>{
            res===null?
            this.setState({uid:''})
            :
            this.setState({uid:res})
            this._usort();
        })
        
    }
    _usort=()=>{
        fetch('http://116.62.14.0:8402/material/mtab/sucai')
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({data:res.data});
            console.log(res.data);
        })
    }
    fetchBiaoqian = (e)=>{
        let data = {
            uid:this.state.uid,
            msid1:this.state.value[0],
            msid2:this.state.value[1],
            msid3:this.state.value[2],
            msid4:this.state.value[3],
            msid5:this.state.value[4]
        }
        console.log(data);
        data.msid1 !==undefined && data.msid2 !==undefined && data.msid3 !==undefined && data.msid4 !==undefined && data.msid5 !==undefined ?
        fetch('http://116.62.14.0:8402/usort/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            switch (data.status) {
                case "0":{
                    console.log(data.data);
                    console.log('成功');
                    ToastAndroid.show('修改成功',200);
                    Actions.composition();
                    break;
                }
                default:{
                    console.log(data.data);
                    console.log('失败');
                    break;
                }
            }
        }):ToastAndroid.show('你还没有选择标签，请进行选择',200);
    }
    handleChange(msid,msname) {
        console.log(msid);
            let item = msid;
            let items = this.state.value.slice();
            let index = items.indexOf(item);
            index === -1 ? items.push(item) : items.splice(index, 1);
            let item1 = msname;
            let items1 = this.state.name.slice();
            let index1 = items1.indexOf(item1);
            index1 === -1 ? items1.push(item1) : items1.splice(index1, 1);
            this.setState({
                value: items,
                name: items1
            })
            console.log(this.state.value);
    }
    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Icon onPress={() => { Actions.pop() }} name="chevron-thin-left" color="#000" style={{ marginLeft: 30 }} size={22 * s} />
                    <Text style={{ color: '#000', marginLeft: width * 0.34, marginRight: width * 0.24, fontSize: 18 }}>修改标签</Text>
                    <TouchableOpacity onPress={(e)=>{this.fetchBiaoqian(e)}} style={{ borderColor: 'red', borderWidth: 1, padding: 2 * s, borderRadius: 10, paddingLeft: 10 * s, paddingRight: 10 * s }}>
                        <Text style={{ color: 'red', fontSize: 18 }}>保存</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={{marginLeft: 10 * s}}>
                        <Text>我选择的标签</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.container1}>
                            <Text>{this.state.name[0]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.container1}>
                            <Text>{this.state.name[1]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.container1}>
                            <Text>{this.state.name[2]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.container1}>
                            <Text>{this.state.name[3]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.container1}>
                            <Text>{this.state.name[4]}</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        style={{ backgroundColor: '#fff' }}
                        data={this.state.data}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <View style={[styles.container, { borderColor: this.state.borderColor }]}>
                                <TouchableOpacity onPress={()=>{this.handleChange(item.msid,item.msname)}}>
                                {/* <CheckBox 
                                    //isChecked={this.state.check}
                                    OnCheckChangd={this.handleChange}
                                >{item.msname}</CheckBox> */}
                                    <Text>{item.msname}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        height: 60 * s,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    container: {
        width: width * 0.2,
        backgroundColor: '#fff',
        marginTop: 20*s,
        marginBottom: 10*s,
        marginLeft: 60*s,
        paddingTop: 4,
        paddingBottom: 4,
        justifyContent: 'center',
        alignItems: 'center',
        //borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10
    },
    container1: {
        width: width * 0.1,
        marginTop: 20*s,
        marginBottom: 10*s,
        marginLeft: 54*s,
        paddingTop: 4,
        paddingBottom: 4,
        justifyContent: 'center',
        alignItems: 'center',
        //borderColor: '#000',
        borderRadius: 10
    }
})