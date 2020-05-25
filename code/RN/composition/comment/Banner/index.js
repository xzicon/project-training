import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native'


const deviceWidth = Dimensions.get('window').width;

export default class ViewPager extends Component {

  constructor (props) {
    super(props)
    this.state = { selectedPage: 0 }
  }

  componentDidMount () {
    // banner个数大于1才会自动滚动
    // if (this.props.dataSource.length > 1) {
      // HeJian 此次的setTimeout必须加上
      // 为了实现循环滑动，实际上在index=-1位置上有最后一张banner
      // 此次是为了进入应用时自动滑动到第一张banner,如果不加
      // setTimeout则滑动会失效，显示的是-1位置的banner
      // 2017-11-17 生命周期里使用setTimeout必须clearTimeout yq
      this.timers = setTimeout(() => {
        this.showPage(0, false)
      }, 0)
      this.timer = setTimeout(() => {
        this.showPage(this.state.selectedPage + 1, true)
      }, 3000)
    // }
  }

  componentWillUnmount () {
     // 2017-11-17 生命周期里使用setTimeout必须clearTimeout  yq
    clearTimeout(this.timers)
    clearTimeout(this.timer)
  }

  handleScroll = (event) => {
    // banner个数大于1才会响应手势滑动
    let { dataSource } = this.props
    if (!dataSource || dataSource.length <= 1) {
      return
    }
    const offset = event.nativeEvent.contentOffset.x - deviceWidth
    if (offset % deviceWidth === 0) {
      let pageIndex = offset / deviceWidth
      if (pageIndex === -1) {
        pageIndex = this.props.dataSource.length - 1
        this.showPage(pageIndex, false)
      } else if (pageIndex === this.props.dataSource.length) {
        pageIndex = 0
        this.showPage(pageIndex, false)
      }

      // Update the page indicator according to pageIndex
      this.setState({ selectedPage: pageIndex })

      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.showPage(this.state.selectedPage + 1, true)
      }, 5000)
    }
  }

  showPage = (pageIndex, animated = false) => {
    const offset = pageIndex * deviceWidth + deviceWidth
    this._scrollView.scrollTo({ x: offset, y: 0, animated: animated })
  }

  renderFirstImage = () => {
    let length = this.props.dataSource.length
    if (length > 1) {
      return (
        this.renderPage(this.props.dataSource[length - 1], length - 1)
      )
    } else {
      return <View />
    }
  }

  renderLastImage = () => {
    let length = this.props.dataSource.length
    if (length > 1) {
      return (
        this.renderPage(this.props.dataSource[0], 0)
      )
    } else {
      return <View />
    }
  }

  onPagePressed = (data) => () => {
    // navigationhelper.navigate('Web', {url:data.url?data.url:''})
  }

  renderPage = (data, key) => {
    return (
      <TouchableHighlight
        key={key}
        onPress={this.onPagePressed(data)}>
        <Image
          resizeMode={'cover'}
          style={[styles.page]}
          source={{uri: data}} />
      </TouchableHighlight>
    )
  }

  renderIndicator = () => {
    if (this.props.dataSource.length > 0) {
      return (
        <View style={styles.pagerContainer}>
          {this.props.dataSource.map((img, index) => {
            return (
              <View key={index} style={styles.pager}>
                <View style={[
                  styles.pagerDot,
                  this.state.selectedPage === index
                    ? styles.pagerDotSelected : styles.pagerDotUnselected
                ]} />
              </View>
            )
          })}
        </View>
      )
    }
  }

  refScrollView = (scrollView) => { this._scrollView = scrollView }

  render () {
    return (
      <View
        onLayout={this.props.onLayoutTop}
        style={styles.wrapper}>
        <ScrollView
          style={styles.scrollView}
          ref={this.refScrollView}
          horizontal
          decelerationRate={0}
          pagingEnabled
          bounces={false}
          iosbounces={false}
          onLayout={this.onScrollEnable}
          showsHorizontalScrollIndicator={false}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}>
          {this.renderFirstImage()}
          {
            this.props.dataSource.map((data, index) => {
              return (
                this.renderPage(data, index)
              )
            })
          }
          {this.renderLastImage()}
        </ScrollView>
        {this.renderIndicator()}
      </View>
    )
  }

  onScrollEnable = (event) => {
    if (event && event.nativeEvent) {
      let range = {}
      range.key = 'banner'
      range.value = event.nativeEvent.layout
      if (this.props.onScrollEnable) {
        this.props.onScrollEnable(range)
      }
    }
  }

}

const styles = StyleSheet.create({
  wrapper:{
    // flex:1
  },
  scrollView: {
    // flex: 1,
    // backgroundColor: 'red'
  },
  page: {
    width: deviceWidth,
    height: deviceWidth * 200/ 375
  },
  pagerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  pager: {
    paddingLeft: 3,
    paddingRight: 3
  },
  pagerDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5
  },
  pagerDotSelected: {
    backgroundColor: 'white'
  },
  pagerDotUnselected: {
    backgroundColor: 'white',
    opacity: 0.4
  }
})
