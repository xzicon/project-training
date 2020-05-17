import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    BackHandler,
    Dimensions,
    Image,
    Modal
} from 'react-native';
import Video from 'react-native-video';
const { width, scale, height } = Dimensions.get('window');
const s = width / 640;
export default class VideoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rate: 1,
            volume: 0.6,
            muted: false,
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            play: false,
            volumeplay: false
        }
    }
    static navigationOptions = {
        header: null
    };
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
    onBackAndroid = () => {
        this.props.navigation.goBack();
        return true;
    };
    onLoad = (data) => {
        this.setState({ duration: data.duration });
        console.log(data.duration + "xxx");
    };
    onProgress = (data) => {
        this.setState({ currentTime: data.currentTime });
        console.log(data.currentTime + "hhh");
    };
    onEnd = () => {
        this.setState({ paused: true })
        this.video.seek(0)
    };
    onAudioBecomingNoisy = () => {
        this.setState({ paused: true })
    };
    onAudioFocusChanged = (event) => {
        this.setState({ paused: !event.hasAudioFocus })
    };
    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    };
    _play = () => {
        this.setState({ play: true });
    }
    _play_false = () => {
        this.setState({ play: false })
    }
    ratePlay = (rate) => {
        if(rate === 1){
            this.setState({rate: 1.5})
        }else if(rate === 1.5){
            this.setState({rate: 2})
        }else if(rate === 2){
            this.setState({rate: 0.75})
        }else if(rate === 0.75){
            this.setState({rate: 0.5})
        }else if(rate === 0.5){
            this.setState({rate: 1})
        }
    }
    volumePlay1 = (volume) => {
        if(volume >= 0 && volume < 1){
            this.setState({volume: volume+0.1})
        }else{
            this.setState({volume: 1})
        }
    }
    volumePlay2 = (volume) => {
        if(volume > 0 && volume <= 1) {
            this.setState({volume: volume-0.1})
        }else{
            this.setState({volume: 0})
        }
    }
    _volume = () => {
        this.setState({ volumeplay: true });
    }
    _volume_false = () => {
        this.setState({ volumeplay: false })
    }
    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        return (
            <View style={styles.container}>
                <Modal
                    animationType='silde'
                    onRequestClose={this._volume_false}//安卓必须设置
                    transparent={true}
                    visible={this.state.volumeplay}
                    autoFocus={true}
                >
                    <TouchableOpacity style={styles.cover}
                        onPress={this._volume_false}>
                    </TouchableOpacity>
                    <View style={{ position: 'absolute', top: 250 * s, right: 60 * s }}>
                        <TouchableOpacity onPress={() => { this.volumePlay1(this.state.volume) }} style={{paddingTop: 10*s }}>
                            <Image source={require('../../assets/composition/composition/jia.png')} style={{ width: 24 * s, height: 24 * s }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.volumePlay2(this.state.volume) }} style={{paddingTop: 10*s }}>
                            <Image source={require('../../assets/composition/composition/jian.png')} style={{ width: 24 * s, height: 24 * s}} />
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    animationType='silde'
                    onRequestClose={this._play_false}//安卓必须设置
                    transparent={true}
                    visible={this.state.play}
                    autoFocus={true}
                >
                    <TouchableOpacity style={styles.cover}
                        onPress={this._play_false}>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', position: 'absolute', top: 314 * s, left: 30 * s, right: 30 * s, justifyContent: 'space-between' }}>
                        <View>
                            {this.state.paused ? 
                            <TouchableOpacity onPress={() => this.setState({ paused: !this.state.paused })}>
                                <Image source={require('../../assets/composition/composition/zanting.png')} style={{ width: 26 * s, height: 26 * s }} />
                            </TouchableOpacity>:
                            <TouchableOpacity onPress={() => this.setState({ paused: !this.state.paused })}>
                                <Image source={require('../../assets/composition/composition/bofang.png')} style={{ width: 26 * s, height: 26 * s }} />
                            </TouchableOpacity>}
                        </View>
                        <View style={styles.controls}>
                            <View style={styles.generalControls}></View>
                            <View style={styles.trackingControls}>
                                <View style={styles.progress}>
                                    <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
                                    <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => { this.ratePlay(this.state.rate) }}>
                            <Text style={styles.controlOption}>
                                {this.state.rate}x
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._volume()} style={{ top: -4 * s }}>
                            <Text style={{color:'#fff'}}>
                                <Image source={require('../../assets/composition/composition/yinliang.png')} />
                                {this.state.volume * 100}%
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <TouchableOpacity
                    style={styles.fullScreen}
                    onPress={() => this._play()}
                >
                    <Video
                        ref={(ref) => {
                            this.video = ref
                        }}
                        /* For ExoPlayer */
                        source={{ uri: 'http://116.62.14.0:8402/images/1576652999706.mp4' }}
                        style={styles.fullScreen}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        resizeMode={this.state.resizeMode}
                        onLoad={this.onLoad}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                        onAudioFocusChanged={this.onAudioFocusChanged}
                        repeat={false}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fullScreen: {
        height: 350 * s,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    controls: {
        backgroundColor: 'transparent',
        width: '70%',
        top: -10 * s
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 10 * s,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 10 * s,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingTop: 10,
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        fontSize: 26 * s,
        color: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 22 * s,
        color: 'white',
    },
    cover: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },
});