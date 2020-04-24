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
// 注册登录忘记密码
// import Forgetpwd from './composition/common/wly/Forgetpwd';
// import Modify from './composition/common/wly/Modify';
// 教师版登录注册页面
import Login from './teacher/common/Login';
import Register from './teacher/common/Register';
import Setpwd from './teacher/common/Setpwd';
import Forgetpwd from './teacher/common/Forgetpwd';
import Modifypwd from './teacher/common/Modifypwd';
import Perfect from './teacher/common/Perfect';
// 作文
import Home from './composition/home/Home';
import AddEssay from './composition/home/AddEssay';
import DetailEssay from './composition/home/DetailEssay';
import PersonHome from './composition/home/PersonHome';
import Search from './composition/home/Search';
import SearchList from './composition/home/SearchList';
// 素材
import Composition from './composition/composition/Composition';
import Source from './composition/composition/Source';
import Material from './composition/composition/Material';
import Popular from './composition/composition/Popular';
import Seleced from './composition/composition/Seleced';
// 微课
import Lesson from "./composition/Lesson/Lesson";
// 我的
import Userinfor from './composition/userinfor/Userinfor';
import Myset from './composition/userinfor/Myset';
import Question from './composition/userinfor/Question';
import Feedback from './composition/userinfor/Feedback';
import Collect from './composition/userinfor/Collect';
import Write from './composition/userinfor/Write';
import Marticle from './composition/userinfor/Marticle';
import Mnew from './composition/userinfor/Mnew';
import Praise from './composition/userinfor/Praise';
import Fensi from './composition/userinfor/Fensi';
import Ziliao from './composition/userinfor/Ziliao';
import Edit from './composition/userinfor/Edit';
import Follow from './composition/userinfor/Follow'
import Huozan from './composition/userinfor/Huozan';
import Message from './composition/userinfor/Message';

import Mcomment from './teacher/mine/Mcomment';
import Mine from './teacher/mine/Mine';
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
							{/* <Tabs
								key='tabbar'
								hideNavBar
								activeTintColor='#f23030'
								inactiveTintColor='#767676'
								tabBarStyle={{ backgroundColor: '#ffffff' }}
							>
								<Scene
									key='essayPage'
									title="作文"
									icon={
										({ focused }) => <Icon
											color={focused ? '#f23030' : '#767676'}
											name="home"
											size={35 * s}
										/>
									}
								>
									<Scene hideNavBar key='home' component={Home} />
									<Scene hideNavBar hideTabBar key='addEssay' component={AddEssay} />
									<Scene hideTabBar hideNavBar key='detailEssay' component={DetailEssay} />
									<Scene hideNavBar hideTabBar key='personHome' component={PersonHome} />
									<Scene hideNavBar hideTabBar key='search' component={Search} />
									<Scene hideTabBar hideNavBar key='searchlist' component={SearchList} />
									<Scene hideNavBar hideTabBar key='popular' component={Popular} />
								</Scene>
								<Scene
									key='materialPage'
									title="素材精选"
									icon={
										({ focused }) => <Icon
											color={focused ? '#f23030' : '#767676'}
											name="filetext1"
											size={35 * s}
										/>
									}
								>
									<Scene key="composition" hideNavBar component={Composition} />
									<Scene key="source" hideTabBar hideNavBar component={Source} />
									<Scene key="material" hideNavBar hideTabBar component={Material} />
									<Scene key="popular" hideNavBar hideTabBar component={Popular} />
									<Scene key="seleced" hideNavBar hideTabBar component={Seleced} />
									<Scene hideNavBar hideTabBar key='people' component={PersonHome} />
									<Scene hideTabBar hideNavBar key='detailEssaywrite' component={DetailEssay} />
									<Scene hideNavBar hideTabBar key='searchEssay' component={Search} />
									<Scene hideTabBar hideNavBar key='searchlist' component={SearchList} />
									<Scene hideNavBar hideTabBar key='addEssaywrite' component={AddEssay} />
								</Scene>
								<Scene key='lessonPage'
									title='课程'
									icon={
										({ focused }) => <Icon
											color={focused ? '#f23232' : '#666'}
											name="iconfontdesktop"
											size={35 * s}
										/>
									}
								>
									<Scene key='lesson' component={Lesson} />
								</Scene>
								<Scene
									key='userinforPage'
									title="个人中心"
									icon={
										({ focused }) => <Icon
											color={focused ? '#f23030' : '#767676'}
											name="user"
											size={35 * s}
										/>
									}
								>
									  
									
									<Scene key='userinfor' hideNavBar component={Userinfor} /> 
									<Scene hideNavBar hideTabBar key='personHome' component={PersonHome} />

									{/* 设置 
									<Scene key='myset' component={Myset} hideTabBar hideNavBar />
									<Scene key='question' component={Question} hideTabBar hideNavBar />
									<Scene key='tquestion' component={Tquestion} hideTabBar hideNavBar />
									<Scene key='feedback' component={Feedback} hideTabBar hideNavBar />
									<Scene key='mcomment' component={Mcomment} hideTabBar hideNavBar />
									<Scene key='connection' component={Connection} hideTabBar hideNavBar />
									<Scene key='dianpinganli' component={Dianpinganli} hideTabBar hideNavBar />
									{/* 收藏 
									<Scene key='collect' component={Collect} hideTabBar hideNavBar />
									<Scene key='write' component={Write} hideTabBar hideNavBar />
									<Scene key='marticle' component={Marticle} hideTabBar hideNavBar />
									<Scene key='mnew' component={Mnew} hideTabBar hideNavBar />
									<Scene key='praise' component={Praise} hideTabBar hideNavBar />
									<Scene key='edit' component={Edit} hideTabBar hideNavBar />
									<Scene hideTabBar hideNavBar key='detailEssay' component={DetailEssay} />
									{/* 关注 
									<Scene key='follow' component={Follow} hideNavBar hideTabBar />
									{/* 粉丝 
									<Scene key='fensi' component={Fensi} hideTabBar hideNavBar />
									{/* 编辑个人资料
									<Scene key='ziliao' component={Ziliao} hideTabBar hideNavBar />
									{/* 获赞
									<Scene key='huozan' component={Huozan} hideTabBar hideNavBar />
									{/* 消息
									<Scene key='message' component={Message} hideTabBar hideNavBar/>
									<Scene key='tmessage' component={Tmessage} hideTabBar hideNavBar/>
									<Scene hideTabBar hideNavBar key='detailEssayUser' component={DetailEssay} />
								</Scene>
							</Tabs> */}

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
									<Scene key='myset' component={Myset} hideTabBar hideNavBar />
									<Scene key='tquestion' component={Tquestion} hideTabBar hideNavBar />
									<Scene key='feedback' component={Feedback} hideTabBar hideNavBar />
									<Scene key='mcomment' component={Mcomment} hideTabBar hideNavBar />
									<Scene key='connection' component={Connection} hideTabBar hideNavBar />
									<Scene key='dianpinganli' component={Dianpinganli} hideTabBar hideNavBar />
									<Scene key='tidentify' component={Tidentify} hideTabBar hideNavBar />
									
									{/* 编辑个人资料 */}
									<Scene key='ziliao' component={Ziliao} hideTabBar hideNavBar />
									
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