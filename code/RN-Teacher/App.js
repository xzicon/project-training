/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect, useState } from 'react';
import {
	View,
	AsyncStorage, Dimensions, ToastAndroid, BackHandler, StyleSheet,
	Overlay
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Router, Scene, Tabs, Actions, Lightbox, Modal } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
// 引导页
import SwiperPage from './composition/common/SwiperPage';
// 教师版登录注册页面
import Login from './teacher/common/Login';
import Register from './teacher/common/Register';
import Setpwd from './teacher/common/Setpwd';
import Forgetpwd from './teacher/common/Forgetpwd';
import Modifypwd from './teacher/common/Modifypwd';
import Perfect from './teacher/common/Perfect';
// 我的
import Tset from './teacher/mine/Tset';
import TFeedback from './teacher/mine/TFeedback';
import Mcomment from './teacher/mine/Mcomment';
import Mine from './teacher/mine/Mine';
import Editor from './teacher/mine/Editor';
import Tquestion from './teacher/mine/Tquestion';
import Tmessage from './teacher/mine/Tmessage';
import Connection from './teacher/mine/Connection';
import Dianpinganli from './teacher/mine/Dianpinganli';
import Tidentify from './teacher/mine/Tidentify';
// 未点评
import Nessay from './teacher/no/Nessay';
import Nessaydetail from './teacher/no/Nessaydetail';
import AddComment from './teacher/no/AddComment'
//已点评
import Remark from './teacher/remark/Remark';
import Rarticle from './teacher/remark/Rarticle';

import DetailEssay from './composition/home/DetailEssay';


const { width, scale } = Dimensions.get('window');
const s = width / 640;
//不弹出警告提示
console.disableYellowBox = true;

const App = () => {
	let [isLogin, setlogin] = useState(false);
	let [isInstall, setInstatll] = useState(true);

	let init = () => {
    
		AsyncStorage.getItem('isInstall')
			.then(res => {
				if (res) {
					setInstatll(false);
				}
			})
		AsyncStorage.getItem('tid')
			.then(res => {
				let user = JSON.parse(res);
				console.log(user)

				if (!user) {
					SplashScreen.hide();
				}
				if (user) {
					setlogin(true);
					SplashScreen.hide();
				}
			})
	}
	useEffect(() => {
		init()
	}, [])
	let afterInstall = () => {
		setInstatll(false);
		console.log('after install')
	}
	if (isInstall) {
		return (
			<View style={{ flex: 1 }}>
				<SwiperPage afterInstall={afterInstall} />
			</View>
		)
	}
	return (
		<>
			<Router
				backAndroidHandler={() => {
				}}
			>
				<Overlay>
					<Modal key="modal" hideNavBar>
						{/* <Lightbox key='lightbox'> */}
						<Scene initial={isLogin} key="root">

							<Tabs
								key='tabbar'
								hideNavBar
								activeTintColor='#f23030'
								inactiveTintColor='#767676'
								tabBarStyle={{ backgroundColor: '#ffffff' }}
							>
								<Scene
									key='noessay'
									title="未点评"
									icon={
										({ focused }) => <Icon
											color={focused ? '#f23030' : '#767676'}
											name="file1"
											size={35 * s}
										/>
									}
								>
									<Scene hideNavBar key='nessay' component={Nessay} />
									<Scene hideNavBar hideTabBar key='nessaydetail' component={Nessaydetail} />
									<Scene hideNavBar hideTabBar key='addcomment' component={AddComment} />
								</Scene>
								
								<Scene key='checkPage'
									title='已点评'
									icon={
										({ focused }) => <Icon
											color={focused ? '#f23232' : '#666'}
											name="checkcircleo"
											size={35 * s}
										/>
									}
								>
									<Scene key='remark' hideNavBar component={Remark} />
									<Scene key='rarticle' component={Rarticle} hideTabBar hideNavBar />
								</Scene>
								<Scene
									key='minePage'
									title="个人中心"
									icon={
										({ focused }) => <Icon
											color={focused ? '#f23030' : '#767676'}
											name="user"
											size={35 * s}
										/>
									}
								>
									{/*  */}
									<Scene key='mine' hideNavBar component={Mine} />
									
									
									{/* 设置 */}
									<Scene key='tset' component={Tset} hideTabBar hideNavBar />
									<Scene key='tquestion' component={Tquestion} hideTabBar hideNavBar />
									<Scene key='tfeedback' component={TFeedback} hideTabBar hideNavBar />
									<Scene key='mcomment' component={Mcomment} hideTabBar hideNavBar />
									<Scene key='connection' component={Connection} hideTabBar hideNavBar />
									<Scene key='dianpinganli' component={Dianpinganli} hideTabBar hideNavBar />
									<Scene key='tidentify' component={Tidentify} hideTabBar hideNavBar />
									
									{/* 编辑个人资料 */}
									<Scene key='editor' component={Editor} hideTabBar hideNavBar />
									
									{/* 消息 */}
									
									<Scene key='tmessage' component={Tmessage} hideTabBar hideNavBar/>
									<Scene hideTabBar hideNavBar key='detailEssayUser' component={DetailEssay} />
								</Scene>
							</Tabs>
						</Scene>
						{/* </Lightbox> */}
						<Scene key='register' component={Register} />
						<Scene key='setpwd' component={Setpwd} />
						<Scene key='perfect' component={Perfect}/>
						<Scene key='forgetpwd' component={Forgetpwd} />
						<Scene key='Modifypwd' component={Modifypwd} />
						<Scene initial={!isLogin} key="login" component={Login} />
					</Modal>
				</Overlay>
			</Router>
		</>
	);
};

const styles = StyleSheet.create({

});

export default App;