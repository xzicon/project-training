import React, { Component } from 'react'
import { Text, View, AsyncStorage, TextInput, ToastAndroid, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native'
import RichTextView from './RichTextView'
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
const { width, scale ,height} = Dimensions.get('window');
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

export default class AddEssay extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      uid: '',
      atitle: '',
      atag: '',
      inputValue: '',
      utime: '',
      aimage: '',
      imageUrl: '',
      flag: '1',
      mid:this.props.mid
    })
  }
  componentDidMount() {
    AsyncStorage.getItem('uid')
      .then((res) => {
        res === null ?
          this.setState({ uid: '' })
          :
          this.setState({ uid: res })
      })
     
  }
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
            const file={uri: response.uri, type: response.type, name: response.fileName};
            formData.append('image', file);
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
                
                })
            });
        }
    });
  }

  add = () => {
    if (this.state.inputValue === '') {
      ToastAndroid.show('请输入作文内容', 100)
    } else if (this.state.inputValue.length >= 2500) {
      ToastAndroid.show('作文内容字数超出限制', 100)
    }
    else {
      const data={
        atitle: this.state.atitle,
        atag: this.state.atag,
        acontent: this.state.inputValue,
        uid: this.state.uid,
        aimage: this.state.aimage,
        mid: this.state.mid
      }
      this.setState({
        atitle:'',
        inputValue:'',
        aimage:'',
        imageUrl: '',
      },()=>{
        Actions.teacher1({atitle: data.atitle,
          atag: data.atag,
          acontent: data.acontent,
          uid: data.uid,
          aimage: data.aimage,
          mid: data.mid});
      }
      )}
      
      
  }

  atitle = (atitle) => {
    if (atitle.length >= 25) {
      ToastAndroid.show('标题超出字数限制', 10)
    } else {
      this.setState({ atitle: atitle })
    }
  }

  back = ()=>{
    this.setState({
      atitle:'',
      inputValue:'',
      aimage:'',
      imageUrl: '',
    },()=>{Actions.pop()})
    
  }
  render() {
    return (
      <View style={{ flex: 1 ,backgroundColor:'#FFF'}}>
        <View style={{ height: 80 * s, marginBottom: 5, padding:15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff' }}>
          <View style={{
            width: 60, height: 50 * s,
            
            justifyContent: 'center', alignItems: 'center',
          }}>
            <TouchableOpacity onPress={()=>this.back()}>
              <Image 
              style={{width:30*s,height:30*s}}
              source={require('../../assets/composition/add/x.png')}/>
            </TouchableOpacity>
          </View>
          <View style={{ width: '60%' }}></View>
          <View style={{
            width: 60, height: 50 * s,
            borderWidth: 1, borderColor: 'red', borderRadius: 15 * s,
            justifyContent: 'center', alignItems: 'center'
          }}>
            <TouchableOpacity
              onPress={()=>{this.add()}}>
              <Text>下一步</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TextInput
          style={{ width:'98%',marginLeft:'1%',backgroundColor: '#FFF', padding: 10,fontSize:26*s  }}
          placeholder="输入作文标题~"
          placeholderTextColor="gray"
          onChangeText={this.atitle}
          maxLength={50}
          value={this.state.atitle}
        />
       
        <View style={{width:'98%',marginTop:'0.5%',marginLeft:'1%',}}>
          <ScrollView>
            <RichTextView
              style={{ height:300, backgroundColor: '#FFF', marginBottom: 0, paddingBottom: 0 }}
              inputStyle={{ padding: 10 ,fontSize:25*s}}
              placeholder="在此输入作文内容"
              value={this.state.inputValue}
              minHeight={300}
              maxLength={2500}
              onChangeText={(inputValue) => {
                this.setState({ inputValue: inputValue })
              }}
              showCount={true} // 展示剩余文字, 默认为true
            />
          </ScrollView>
        </View>
        <View style={{width:'98%',marginLeft:'1%',
          marginTop:'0.5%',
          paddingLeft:'3%',paddingRight:'3%',
          alignItems: 'center', flexDirection: 'row', backgroundColor: '#FFF',
          borderTopWidth:1/scale,borderBottomWidth:1/scale,
          borderColor:'#F0F0F0',
          height:90*s
        }}>
          <Text style={{ padding: 5 }}>#</Text>
          <TextInput placeholder="标签" placeholderTextColor="#5a6d95"
            style={{fontSize:20*s,color:'#5a6d95'}}
            onChangeText={(atag) => {
              this.setState({ atag: '#' + atag })
            }}
          />
        </View>
        <View style={{width:'98%',marginLeft:'1%',
          marginTop:'0.5%',
          paddingLeft:'3%',paddingRight:'3%',
          alignItems: 'center', flexDirection: 'row', backgroundColor: '#FFF',
          borderTopWidth:1/scale,borderBottomWidth:1/scale,
          borderColor:'#F0F0F0',
          height:90*s,
          justifyContent:'space-between'
        }}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image 
                style={{width:30*s,height:30*s,marginRight:10*s}}
                source={require('../../assets/composition/add/sucai.png')}/>
            <Text>参与素材话题</Text>
          </View>
          <Icon name='right' size={28*s} color={'#666'}/>
        </View>
        <View style={{width:'98%',height:240*s,marginTop:'0.5%',marginLeft:'1%',backgroundColor:'#fff'}}>
          {this.state.aimage===''?
            <TouchableOpacity onPress={() => { this.takephoto() }}>
                <Image style={{width:200*s,height:200*s,margin:'4%'}} source={require('../../assets/composition/essay/pic.png')}/>
            </TouchableOpacity>
            :
            <Image style={{ width: 200*s, height:200*s,margin:'4%'}}
            source={{uri:'http://116.62.14.0:8402/images/'+this.state.aimage}}
            />
          }
        </View>
        
      </View>
    )
  }
}
 