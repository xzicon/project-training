/**
 * Created by jackson on 2018/08/13.
 * 富文本
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Dimensions
} from 'react-native';
const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;
const defaultMinHeight = 100
//模块声名并导出
export default class RichTextView extends Component {
    //属性声名
    static propTypes = {
        style:PropTypes.object,
        inputStyle:PropTypes.any,
        maxLength:PropTypes.number, // 限制文字长度
        placeholder:PropTypes.string,  // 占位文字
        minHeight:PropTypes.number,   // 最小高度
        showCount:PropTypes.bool,
        onChangeText:PropTypes.func,//获取编辑的文本
    };

    //默认属性
    static defaultProps = {
        maxLength: 100,
        showCount: true,
        minHeight: defaultMinHeight
    };

    //构造函数
    constructor(props) {
        super(props);
        //状态机变量声明
        this.state = {
            text: '',
        };
    }

    //渲染
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.inputViewStyle,this.props.style,{minHeight:this.props.minHeight}]}>
                    <TextInput
                        style={[styles.inputTextStyle,this.props.inputStyle,{minHeight:this.props.minHeight}]}
                        placeholder={this.props.placeholder ? this.props.placeholder :'请输入'}
                        multiline={true}
                        paddingVertical={0}
                        selectionColor = {'#b2b2b2'}
                        textAlignVertical={'top'}
                        placeholderTextColor={'#b2b2b2'}
                        underlineColorAndroid={'transparent'}
                        maxLength={this.props.maxLength}
                        defaultValue = {this.state.text}
                        onChangeText={
                                (text) => {
                                    this.props.onChangeText(text)
                                    this.setState({
                                        text: text
                                    })
                                }
                        }
                    />
                    {
                        this.props.showCount ?
                            <Text style={{position: 'absolute', bottom: 5, right: 10, fontSize: 14}}>
                                {this.state.text.length}/{this.props.maxLength}
                            </Text>
                            :
                            null
                    }
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    inputViewStyle: {
        width:ScreenWidth,
        minHeight: defaultMinHeight,
    },
    inputTextStyle: {
        fontSize: 14,
        color: '#666666',
        width: '100%',
        minHeight: defaultMinHeight,
        // padding: 10,
        paddingBottom: 30,
        paddingTop: 10
    }
});