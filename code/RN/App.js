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
	Overlay,
	Image
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Router, Scene, Tabs, Actions, Lightbox, Modal } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
// 引导页
import SwiperPage from './composition/common/SwiperPage';
// 注册登录忘记密码
import Register from './composition/common/Register';
import Forgetpwd from './composition/common/wly/Forgetpwd';
import Login from './composition/common/Login';
import Modify from './composition/common/wly/Modify';
// 作文
import Home from './composition/home/Home';
import AddEssay from './composition/home/AddEssay';
import DetailEssay from './composition/home/DetailEssay';
import PersonHome from './composition/home/PersonHome';
import Search from './composition/home/Search';
import SearchList from './composition/home/SearchList';
import Favorite from './composition/home/Favorite';
import ADDTeacher from './composition/home/Teacher';
import ADDTeacherDetail from './composition/home/TeacherDetail';
import Reply from './composition/home/Reply';
import Materiallist from './composition/home/Materiallist';

// 素材
import Composition from './composition/composition/Composition'; // 素材
import Source from './composition/composition/Source'; // 素材分类
import Container from './composition/composition/Container'; // 素材分类详情
import Material from './composition/composition/Material';
import Popular from './composition/composition/Popular'; // 素材详情
import Seleced from './composition/composition/Seleced';
import Rarticle from './composition/home/Rarticle';
import Skill from './composition/composition/skills/Skill'; // 技法
import SkillDetail from './composition/composition/skills/SkillDetail'; // 技法详情
import PaperDetail from './composition/composition/realpapers/PaperDetail'; // 真题详情
import Realpaper from './composition/composition/realpapers/Realpaper'; // 真题
import Collection from './composition/composition/collection/Collection'; // 合集
import ADDTeacher1 from './composition/composition/Teacher';
import AddEassy2 from './composition/composition/AddEssay';
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
import Teacherme from './composition/userinfor/Teacher';
import TeacherDetailme from './composition/home/TeacherDetail';
import Qiandao from './composition/userinfor/Qiandao';
import Biangeng from './composition/userinfor/Biangeng';
// 点评
import TeacherDetail from './composition/comment/TeacherDetail';
import Teacher0 from './composition/comment/Teacher';
import Yelp from './composition/comment/Yelp';
import AddEassy1 from './composition/comment/AddEassy';
import HaveWrite from './composition/comment/HaveWrite';
import HaveMarticle from './composition/comment/HaveMarticle';
import AddORC from './composition/comment/AddORC';
import Materiallist1 from './composition/comment/Materiallist';
import Xiai from './composition/userinfor/Xiai';
import TeacherSelect from './composition/comment/TeacherSelect';
import Qiandaojilu from './composition/userinfor/Qiandaojilu';

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
		AsyncStorage.getItem('uid')
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
									<Scene hideTabBar hideNavBar key='favorite' component={Favorite}/>
									<Scene hideTabBar hideNavBar key='reply' component={Reply}/>
									<Scene hideTabBar hideNavBar key='rarticle' component={Rarticle} />
									<Scene key="material" hideNavBar hideTabBar component={Material} />
									<Scene key="popular" hideNavBar hideTabBar component={Popular} />
									<Scene key="container" hideTabBar hideNavBar component={Container} />
									<Scene hideTabBar hideNavBar key='detailEssaywrite' component={DetailEssay} />
									<Scene key='paperDetail' hideTabBar hideNavBar component={PaperDetail}/>
									{/* 老师点评 */}
									<Scene hideTabBar hideNavBar key='teacher1' component={ADDTeacher} />
									<Scene hideTabBar hideNavBar key='teacherdetail1' component={ADDTeacherDetail} />
									<Scene hideNavBar hideTabBar key='paperdetail' component={PaperDetail} />
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
									<Scene hideTabBar hideNavBar key='favorite' component={Favorite}/>
									<Scene key="source" hideTabBar hideNavBar component={Source} />
									<Scene key="container" hideTabBar hideNavBar component={Container} />
									<Scene key="material" hideNavBar hideTabBar component={Material} />
									<Scene key="popular" hideNavBar hideTabBar component={Popular} />
									<Scene key="seleced" hideNavBar hideTabBar component={Seleced} />
									<Scene hideNavBar hideTabBar key='people' component={PersonHome} />
									<Scene hideTabBar hideNavBar key='detailEssaywrite' component={DetailEssay} />
									<Scene hideNavBar hideTabBar key='searchEssay' component={Search} />
									<Scene hideTabBar hideNavBar key='searchlist' component={SearchList} />
									<Scene hideNavBar hideTabBar key='addEssaywrite' component={AddEassy2} />
									{/* 技法 */}
									<Scene hideNavBar hideTabBar key='skill1' component={Skill} />
									<Scene hideNavBar hideTabBar key='skilldetail' component={SkillDetail} />
									{/* 真题 */}
									<Scene hideNavBar hideTabBar key='paperdetail' component={PaperDetail} />
									<Scene hideNavBar hideTabBar key='realpaper' component={Realpaper} />

									<Scene hideTabBar hideNavBar key='teacherdetail' component={TeacherDetail} />
									<Scene hideTabBar hideNavBar key='teacher11' component={ADDTeacher1} />
									<Scene hideTabBar hideNavBar key='yelp' component={Yelp} />

									{/* 合集 */}
									<Scene hideNavBar hideTabBar key='collection' component={Collection}/>
								</Scene>
								<Scene
								key='addEssayPage'
								title=" "
								icon={
									({ focused }) => 
									<View style={{width:100*s,height:100*s,borderRadius:50*s,backgroundColor:'#FFF',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
										<Image style={{width:90*s,height:90*s}} source={require('./assets/composition/essay/add.png')} />
									</View>	
								}
								>
									<Scene  hideNavBar hideTabBar key='addEssay' component={AddEssay} />
									<Scene hideTabBar hideNavBar key='teacherdetail' component={ADDTeacherDetail} />
									<Scene hideTabBar hideNavBar key='rarticle' component={Rarticle} />
									<Scene hideNavBar hideTabBar key='skilldetail' component={SkillDetail} />
									<Scene hideNavBar hideTabBar key='materiallist' component={Materiallist}/>
								</Scene>
								<Scene
								key='LessonPage'
								title="点评"
								icon={
									({ focused }) => <Icon
										color={focused ? '#f23030' : '#767676'}
										name="edit"
										size={35 * s}
									/>
								}
								>
									<Scene hideNavBar key='lesson' component={Teacher0} />
									<Scene hideTabBar hideNavBar key='teacherdetail' component={TeacherDetail} />
									<Scene hideTabBar hideNavBar key='detailEssay' component={DetailEssay} />
									<Scene hideNavBar hideTabBar key='skilldetail' component={SkillDetail} />
									<Scene hideTabBar hideNavBar key='yelp' component={Yelp} />
									<Scene hideNavBar hideTabBar key='addEssay1' component={AddEassy1} />
									<Scene hideNavBar hideTabBar key='havewrite' component={HaveWrite} />
									<Scene key='havemarticle' component={HaveMarticle} hideTabBar hideNavBar />
									<Scene key='edit' component={Edit} hideTabBar hideNavBar />
									<Scene hideTabBar hideNavBar key='rarticle' component={Rarticle} />
									<Scene hideNavBar hideTabBar key='addORC' component={AddORC}/>
									<Scene hideNavBar hideTabBar key='materiallist' component={Materiallist1}/>
									<Scene hideTabBar hideNavBar key='teacher11' component={ADDTeacher1} />
									<Scene hideTabBar hideNavBar key='teacher' component={TeacherSelect} />


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
									{/*  */}
									<Scene key='userinfor' hideNavBar component={Userinfor} />
									<Scene hideNavBar hideTabBar key='personHome' component={PersonHome} />

									{/* 设置 */}
									<Scene key='myset' component={Myset} hideTabBar hideNavBar />
									<Scene key='question' component={Question} hideTabBar hideNavBar />
									<Scene key='feedback' component={Feedback} hideTabBar hideNavBar />
									{/* 收藏 */}
									<Scene key='collect' component={Collect} hideTabBar hideNavBar />
									<Scene key='write' component={Write} hideTabBar hideNavBar />
									<Scene key='marticle' component={Marticle} hideTabBar hideNavBar />
									<Scene key='mnew' component={Mnew} hideTabBar hideNavBar />
									<Scene key='praise' component={Praise} hideTabBar hideNavBar />
									<Scene key='edit' component={Edit} hideTabBar hideNavBar />
									<Scene hideTabBar hideNavBar key='detailEssay' component={DetailEssay} />
									<Scene hideNavBar hideTabBar key='popular' component={Popular} />
									{/* 关注 */}
									<Scene key='follow' component={Follow} hideNavBar hideTabBar />
									{/* 粉丝 */}
									<Scene key='fensi' component={Fensi} hideTabBar hideNavBar />
									{/* 编辑个人资料 */}
									<Scene key='ziliao' component={Ziliao} hideTabBar hideNavBar />
									{/* 获赞 */}
									<Scene key='huozan' component={Huozan} hideTabBar hideNavBar />
									{/* 消息 */}
									<Scene key='message' component={Message} hideTabBar hideNavBar/>
									<Scene hideTabBar hideNavBar key='favorite' component={Favorite}/>
									<Scene hideTabBar hideNavBar key='teacher' component={Teacherme} />
									<Scene hideTabBar hideNavBar key='teacherdetail' component={TeacherDetail} />
									<Scene hideTabBar hideNavBar key='detailEssay' component={DetailEssay} />
									<Scene hideNavBar hideTabBar key='skilldetail' component={SkillDetail} />
									<Scene hideTabBar hideNavBar key='rarticle' component={Rarticle} />
									<Scene hideTabBar hideNavBar key='yelp' component={Yelp} />
									<Scene hideNavBar hideTabBar key='paperdetail' component={PaperDetail} />
									<Scene hideNavBar hideTabBar key='qiandao' component={Qiandao}/>
									<Scene hideNavBar hideTabBar key='biangeng' component={Biangeng}/>
									<Scene hideNavBar hideTabBar key='xiai' component={Xiai}/>
									<Scene hideNavBar hideTabBar key='qiandaojilu' component={Qiandaojilu}/>
								</Scene>
							</Tabs>
						</Scene>
						{/* </Lightbox> */}
						<Scene key='register' component={Register} />
						<Scene key='forgetpwd' component={Forgetpwd} />
						<Scene key='modify' component={Modify} />
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