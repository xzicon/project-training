import React, {Component} from 'react';
import {
    Image,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Button,
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Lesson0 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                // {
                //     "id": "0",
                //     select: false
                // },
                // {
                //     "id": "1",
                //     select: false
                // },
                // {
                //     "id": "2",
                //     select: false
                // },
                // {
                //     "id": "3",
                //     select: false
                // },
                // {
                //     "id": "4",
                //     select: false
                // },
                // {
                //     "id": "5",
                //     select: false
                // }
            ],//数据源
            selectItem: [],
            selectmsid: [],
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
            this._uid_usort();
        })
        
    }
    _uid_usort=()=>{
        
        fetch('http://116.62.14.0:8402/usort/msid/'+this.state.uid)
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res.data)
            // const sel =[];
            // res.data.forEach((item,index) => {
            //         sel[index]=item.msid
                
            // })
            
            // this.setState({
            //     uid_usort:res.data,
            //     selectItem:sel
            // })

        })
    }
    _usort=()=>{
        fetch('http://116.62.14.0:8402/usort/usort/'+this.state.uid)
        .then((res)=>res.json())
        .then((res)=>{
            // this.setState({usort:res.data});
            console.log(res.data[0]);
            let us = res.data;
            for(var i = 0;i<us.length;i++){
                if(us[i].check==null){
                    us[i].select=false
                }else{
                    us[i].select=true
                }
                
                us[i].id=i
            }
            // us.forEach((item,index) => {
            //     item[index].select=false
            //     if(index==0){
            //         console.log(item[index])
            //     }
            // })
            console.log(us[0]);
            this.setState({
                data:us
            })
            console.log(this.state.data[0])
        })
    }
    _selectItemPress(item) {
            if (item.select) {
                this.state.selectItem.splice(this.state.selectItem.findIndex(function (x) {
                    return x === item.msid;
                }), 1);
                console.log('取消');
                this.state.data[item.id].select = !item.select;
            } else {
                if(this.state.selectItem.length>=5){
                    alert('最多选择5个标签')
                }else{
                    console.log('选中');
                    this.state.selectItem.push(item.msid);
                    this.state.data[item.id].select = !item.select;
                }
            }
            this.setState({data: this.state.data})
    }

    _submitPress() {
        
        alert(`选中了${JSON.stringify(this.state.selectItem)}`);
        // let data = {
        //     uid:this.state.uid,
        //     msid:this.state.selectItem[0]
        // };
        // fetch('http://116.62.14.0:8402/usort/checked', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(res=>res.json())
        // .then(data=>{
        //     console.log(data);
        //     switch (data.status) {
        //         case "0":{
        //             console.log(data.data);
        //             console.log('成功');
        //             ToastAndroid.show('修改成功',200);
        //             // Actions.composition();
        //             break;
        //         }
        //         default:{
        //             console.log(data.data);
        //             console.log('失败');
        //             break;
        //         }
        //     }
        // })
    }


    render() {
        return (
            <View>
                {/* <TouchableOpacity onPress={()=>Actions.pic()}>
                    <Text>放大图片页面</Text>
                </TouchableOpacity> */}
            <FlatList
                keyExtractor={item => item.msid}
                data={this.state.data}
                extraData={this.state} //这里是关键，如果不设置点击就不会马上改变状态，而需要拖动列表才会改变
                ListHeaderComponent={({item}) => {
                    return (<Button title={"确定"} onPress={() => this._submitPress()}/>)
                }}
                renderItem={({item}) => {
                    return (
                        <View style={styles.standaloneRowFront}>

                            <TouchableOpacity
                                onPress={() => this._selectItemPress(item)}>
                                <View style={styles.row}>
                                    {item.select ?
                                        <Image source={require('../assets/composition/composition/checked.png')}
                                               style={styles.imgCheckIcon}/>
                                        :
                                        <Image source={require('../assets/composition/composition/check.png')}
                                               style={styles.imgCheckIcon}/>
                                    }
                                    
                                    <Text>{item.msname}</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    )
                }}
            />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    standaloneRowFront: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 70,
        marginBottom: 5
    },
    imgCheckIcon: {
        width: 24,
        height: 24,
        lineHeight: 24,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
});