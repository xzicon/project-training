
import React, { Component } from 'react'
import {Text,View,ScrollView, ScrollViewBase} from "react-native"
import { List } from '@ant-design/react-native';
const Item = List.Item;
const Brief = Item.Brief;

export default class Dianpinganli extends Component {
	render() {
		return (
			<ScrollView>
			<View>
				<View style={{width:'100%',height:60,backgroundColor:'white',justifyContent: 'center',alignItems: 'center',borderBottomWidth:2.5,borderBottomColor:'#CCC'}}>
					<Text style={{fontSize:20}}>
						点评案例
					</Text>
				</View>
				<View style={{width:'100%',height:160,backgroundColor:'white',borderBottomWidth:1.5,borderBottomColor:'#CCC'}}>
					<Text style={{textAlign:"justify",fontSize:25}} selectable={true}>搬凳子</Text>
					<Text style={{textAlign:"justify",lineHeight:25,fontSize:15}} numberOfLines={4}>新生入学仪式结束后，所有同学要把凳子从操场搬回教室。 当时场面很混乱，你碰我一下，我挤你一下，像下饺子似的。从操场到教学楼的这段平地，我拖着凳子走还挺轻松。可是搬凳子上楼时，由于我个子不高，力气不大，凳子背儿还挡住我的视线，所以搬得很吃力，抓凳子的双手被膈得像粗粗红红的胡萝卜。搬到二楼时，我几乎不想搬了，天呀，谁来救救我呀！我不禁在心里呼唤.....</Text>
					<Text style={{lineHeight:20,textAlign:'justify'}}>罗丝 | 三年级                                                                                              2020/4/19</Text>
				</View>
				<View style={{width:'100%',height:160,backgroundColor:'white',borderBottomWidth:0.5,borderBottomColor:'#CCC'}}>
					<Text style={{textAlign:"justify",fontSize:25}} selectable={true}>最熟悉的人</Text>
					<Text style={{textAlign:"justify",lineHeight:25,fontSize:15}} numberOfLines={4}>我最熟悉的一个人就是我妈妈了。妈妈中等的身材，乌黑的短头发。一张常常挂着微笑的脸上长着一双明亮的眼睛.妈妈从小就教育我做人要诚实，不占别人的小便宜。就在前不久，我就遇到了这类的事，让我刻骨铭心。那天中午，我上完补习班回家，就被火辣辣的阳光照射着。我边走边用广告纸不停地扇着，可是汗珠还是止不住的滚落下来。这时我发现妈妈在楼下买菜，就连忙跑过去对妈妈说：“妈妈!今天天气太热了，我都要被烧着了，我想买个冰棍吃。”妈妈对我说：“走，我带你去买些冰棍。”说着便拿起了钱包。</Text>
					<Text style={{lineHeight:20,textAlign:'justify'}}>海螺 | 三年级                                                                                              2020/4/19</Text>

				</View><View style={{width:'100%',height:160,backgroundColor:'white',borderBottomWidth:0.5,borderBottomColor:'#CCC'}}>
					<Text style={{textAlign:"justify",fontSize:25}} selectable={true}>她最美</Text>
					<Text style={{textAlign:"justify",lineHeight:25,fontSize:15}} numberOfLines={4}>在我心中，有一位这样的人，没有母亲那么长时间接触，却一直在成长的道路上帮助我们，那人就是胡老师您。每天课间，当我们在外面玩得不亦乐乎时，您却在办公室里批作业、备课。您从没向那么多的本子低头，批完已是筋疲力尽，可您哪有时间休息，马上就要上课了，又拿起资料，开始备课。</Text>
					<Text style={{lineHeight:20,textAlign:'justify'}}>自由 | 五年级                                                                                              2020/4/19</Text>
				</View><View style={{width:'100%',height:160,backgroundColor:'white',borderBottomWidth:0.5,borderBottomColor:'#CCC'}}>
					<Text style={{textAlign:"justify",fontSize:25}} selectable={true}>这样的人让我敬佩</Text>
					<Text style={{textAlign:"justify",lineHeight:25,fontSize:15}} numberOfLines={4}>在生活中有许多不一样的人，他们的风格和待人处事方式都各不相同。不过那种乐于助人，富有爱心的人是最值得我尊敬的。就好比我的同学小明。一头乌黑的短发下有一双炯炯有神的眼睛，那对灵敏的耳朵总是给予他求救的信号。他长得不高，坐在第一排。他是成绩平平，但却十分刻苦努力，也喜欢帮助他人</Text>
					<Text style={{lineHeight:20,textAlign:'justify'}}>钉钉 | 三年级                                                                                              2020/4/19</Text>

				</View><View style={{width:'100%',height:160,backgroundColor:'white',borderBottomWidth:0.5,borderBottomColor:'#CCC'}}>
					<Text style={{textAlign:"justify",fontSize:25}} selectable={true}>美丽的遇见</Text>
					<Text style={{textAlign:"justify",lineHeight:25,fontSize:15}} numberOfLines={4}>人的一生中有许多次遇见，它们如梦境，它们如画作，它们如诗歌。它们是心灵中令人感慨的永恒，每一次的遇见打动着你我的心，绽放出那美丽。随着时代的更替，年龄的增长，牙牙学语的我变成了孜孜不倦的初中生，可谓是“逝者如斯夫，不舍昼夜”啊！</Text>
					<Text style={{lineHeight:20,textAlign:'justify'}}>阳阳 | 三年级                                                                                              2020/4/19</Text>
				</View>
			</View>
			</ScrollView>
		)
	}
}
