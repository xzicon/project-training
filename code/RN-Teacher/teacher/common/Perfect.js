import React, { Component } from 'react'
import { Text, View ,TextInput,StyleSheet, TouchableOpacity, Dimensions,Modal} from 'react-native'
import { PickerView ,Card, WhiteSpace, WingBlank} from '@ant-design/react-native';

const {width,scale} = Dimensions.get('window');
const s = width / 640;

const tsex_select = [
    [
      {
        label: '男',
        value: 1,
      },
      {
        label: '女',
        value: 0,
      },
    ],
  ];
export default class Perfect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tid:this.props.tid,
            tsex: undefined,
            modal_tsex:false,
            card:false
        };
        this.onChange = value => {
            this.setState({
                tsex:value
            });
        };
      }
    _card=()=>{
        this.setState({
            card:true
        })
    }
    _card_false=()=>{
        this.setState({
            card:false
        })
    }
    _tsex=()=>{
        this.setState({
            modal_tsex:true
        })
    }
    _tsex_false=()=>{
        this.setState({
            modal_tsex:false
        })
    }
    _tsex_change=()=>{
        let data = {
            tsex:Number(this.state.tsex),
            tid:this.state.tid
        }
        fetch('http://116.62.14.0:8402/teacher/modify/tsex',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.status)
            switch(data.status){
                case "0":{
                    this.setState({
                        modal_tsex:false
                    })
                    break;
                }
                case "-2":{
                    ToastAndroid.show("tid错了",100);
                    break;
                }
                default:{
                    break;
                }
            }
        })
        
    }
    tnamehandle=(text)=>{
        this.setState({tname:text})
    }
    render() {
        return (
            <View>
                <Text>完善个人资料</Text>
                <Text>跳过</Text>
                <TextInput placeholder='请输入姓名' placeholderTextColor="gray"
                    style={styles.input}
                    onChangeText={this.tnamehandle}
                />
                <TouchableOpacity>
                    <Text>设置头像</Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={this._tsex}>
                    <Text>性别</Text>
                    <Text>{this.state.tsex}</Text>
                </TouchableOpacity> 
                <Modal
                    style={styles.container}
                    animationType='silde'
                    onRequestClose={this._tsex_false}//安卓必须设置
                    transparent={true}
                    visible={this.state.modal_tsex}
                >
                    <TouchableOpacity style={styles.cover} 
                    onPress={this._tsex_false}>
                    </TouchableOpacity>
                    <View style={{backgroundColor:'#FFF',position:'absolute',bottom:0,right:0,left:0,flexDirection:'row',padding:20*s,justifyContent:'space-around'}}>
                        <View style={{width:'90%'}}>
                            <TouchableOpacity onPress={this._tsex_change}><Text>确认</Text></TouchableOpacity>
                            <PickerView
                                onChange={this.onChange}
                                value={this.state.tsex}
                                data={tsex_select}
                                cascade={false}
                            />
                        </View>
                        
                    </View>
                </Modal>
                <TouchableOpacity onPress={this._card}><Text>card</Text></TouchableOpacity>
                <Modal
                    style={styles.container}
                    animationType='silde'
                    onRequestClose={this._card_false}//安卓必须设置
                    transparent={true}
                    visible={this.state.card}
                >
                    <TouchableOpacity style={styles.cover} 
                    onPress={this._card_false}>
                    </TouchableOpacity>
                    {/* <View style={{backgroundColor:'#FFF',position:'absolute',bottom:0,right:0,left:0,flexDirection:'row',justifyContent:'space-around'}}> */}
                        {/* <WingBlank size="lg">
                            <Card>
                                <Card.Header
                                title="This is title"
                                thumbStyle={{ width: 30, height: 30 }}
                                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                                extra="this is extra"
                                />
                                <Card.Body>
                                <View style={{ height: 42 }}>
                                    <Text style={{ marginLeft: 16 }}>Card Content</Text>
                                </View>
                                </Card.Body>
                                <Card.Footer
                                content="footer content"
                                extra="footer extra content"
                                />
                            </Card>
                        </WingBlank> */}
                        {/* <WhiteSpace size="lg" />
                            <Card full>
                            <Card.Header
                                title="Full Column"
                                thumbStyle={{ width: 30, height: 30 }}
                                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                                extra="this is extra"
                            />
                            <Card.Body>
                                <View style={{ height: 42 }}>
                                <Text style={{ marginLeft: 16 }}>Card Content</Text>
                                </View>
                            </Card.Body>
                            <Card.Footer content="footer content" extra="footer extra content" />
                            </Card> */}
                        
                    {/* </View> */}
                </Modal>
                <TouchableOpacity>
                    <Text>下一步</Text>
                </TouchableOpacity> 
            </View>
        )
    }
}
const styles = StyleSheet.create({
    input:{
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        width:260,
        marginLeft:10
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },
})
