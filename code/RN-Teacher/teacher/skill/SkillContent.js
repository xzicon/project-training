import React, { Component } from 'react'
import { Text, View ,Dimensions,StyleSheet, ScrollView, ToastAndroid} from 'react-native'
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import RichEditor from '../rich/components/richWebView/RichEditor';
import RichToolbar from '../rich/components/richWebView/RichToolbar';
import {STATUS_BAR_HEIGHT,ScreenHeight} from '../rich/assets/css/common';
import RichText from '../rich/components/richWebView/RichText';
const { width } = Dimensions.get('window');
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
export default class SkillContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tid: this.props.tid,
            richcontent:'',
        }
    }
    /**
     *
     *上传图片
     * @returns
     * @memberof Editor
     */
    _onPressAddImage() {
        return new Promise((resolve, reject) => {
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
                const file={uri: response.uri, type: response.type, name: response.fileName};
                formData.append('image', file);
                console.log(file);
                this.setState({
                    imageUrl: source.uri,
                }, () => {
                    fetch('http://116.62.14.0:8402/upload', {
                        method: 'POST',
                        // mode:"cors",          
                        body: formData
                    }).then(res=>res.json())
                    .then(res=>{
                    console.log(res.status);
                    console.log(res.data);
                    this.setState({
                        aimage:res.data
                    })
                    resolve('http://116.62.14.0:8402/images/'+res.data);
                    })
                });
            }
            
        })
    })
    }

    cccc(){
        console.log(this.richText.state.richcontent);
        if(this.richText.state.richcontent==''){
            ToastAndroid.show('请保存',100)
        }else{
            var date = new Date();
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());

            const data = {
                tid:this.props.tid,
                skilltitle:this.props.skilltitle,
                skilllevel:this.props.skilllevel,
                skilltype:this.props.skilltype,
                skilltrue:this.props.skilltrue,
                skillcontent:this.richText.state.richcontent,
                skilltime:Y + M + D + h + m,
                skillimage:this.props.skillimage

            }
            fetch('http://116.62.14.0:8402/skill/addskill',{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then((res) => {
                console.log(res.status);
                if(res.status==0){
                    ToastAndroid.show('发布成功',100);
                    Actions.addsuccess({skilltitle:this.props.skilltitle})
                }else{
                    console.log(res.data);
                }
            })

        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{height:90*s,alignItems:'center',backgroundColor:'#F0F0F0',flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',height:55*s,borderRadius:30*s,width:120*s}}><Text onPress={()=>{Actions.pop()}}>上一步</Text></View>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{width:'30%'}}>标题：{this.props.skilltitle}</Text>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'red',height:55*s,color:'#FFF',borderRadius:15*s,width:100*s,margin:10*s}}><Text style={{color:'#FFF',fontSize:17*s}} onPress={()=>{this.cccc()}}>发布技法</Text></View>
                </View>
                <ScrollView>
                    <RichEditor
                    initialContentHTML={`<font color="#666666">请输入技法内容~</font>`}
                    height={ScreenHeight-200*s}
                    ref={ref => this.richText = ref}
                    editorInitializedCallback={()=>{
                        this.richText.focusContentEditor();
                    }}
                    />
                </ScrollView>
                <RichText
                    getEditor={() => this.richText}
                />
                <RichToolbar
                    getEditor={() => this.richText}
                    onPressAddImage={() => this._onPressAddImage()}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})