import React, { Component } from 'react'
import {Accordion, NavBar,Flex } from 'antd-mobile';
export default class Classification extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.history.push('/classes');
    }
    shouCang = (e)=>{
        var imgObj = document.getElementById(e.target.id);
        var Flag=(imgObj.getAttribute("src",2)=="images/home/shoucang.png");
        imgObj.src=Flag?"images/home/shoucang2.png":"images/home/shoucang.png";
    }
    state = {
        item: ['1','2','3','4'],
        data: ['1','2']
    }
    componentDidMount() {
        this.setState({
            item: ['1','2','3','4'],
            data: ['1','2']
        })
    }
    onChange = (key) => {
        console.log(key);
    }
    render() {
        const vair = [
            {
                title:'莴笋',
                title2:[
                    {
                        title2:'莴笋炒山药',
                        img:'w1',
                        material:'主料：山药400克，莴笋半根。辅料：青椒，盐，料酒，鸡精，植物油。',
                        details:'做法：1、山药去皮洗净，切片，放清水中浸泡。2、莴笋去皮洗净，切片。3、青椒去蒂、去籽洗净，切片。4、葱、姜分别择洗干净，切片。5、锅内添清水，水沸后将山药片放入焯水，捞出沥干水分。6、炒锅放少许油，先爆香葱姜片，然后将山药片、莴笋片、青椒片一起倒入锅中。7、加盐、料酒、鸡精翻炒2分钟装盘即可。'
                    },
                    {
                        title2:'凉拌莴笋',
                        img:'w2',
                        material:'材料：莴笋，盐，白醋，味精，糖，香油',
                        details:'做法：1、将莴笋去皮，切细丝，加盐烧腌制一会。2、挤出水份后，加白醋，味精，糖，香油拌匀即可。'
                    }
                ],
                introduction:'莴笋中有一种乳白色浆液，具有安神镇静作用，且没有毒性，最适宜神经衰弱失眠者。使用时，把莴笋带皮切片煮熟喝汤，特别是睡前服用，更具有助眠功效。',
            },
            {
                title:'瑜伽',
                title2:[
                    {
                        title2:'蜥蜴式',
                        img:'y1',
                        material:'这个动作具有缓解身体疲劳，美化肩部线条的功效。',
                        details:'跪坐在床上，两条腿并拢，让胸腹部贴着腿，然后上身保持前倾，吸气，双臂向前滑动，呼气，把臀部翘起，并让胸部、下巴贴在床上。保持姿势10-15秒。'
                    },
                    {
                        title2:'双腿背部伸展式',
                        img:'y2',
                        material:'这个动作具有强健肾脏，活跃脊柱，改善消化的功效。',
                        details:'端坐于床上，伸直双腿，双脚并拢，双手抓脚趾，吸气，伸直脊柱，呼气，上半身向前伸展，胸腹部贴近双腿。正常呼吸，保持至少一分钟。'
                    }
                ],
                introduction:'人三分之一的时间是在床上度过的，但这三分之一的时间有的人在梦里遨游、有的人雷打不动、也有的人翻来覆去……不同的卧室环境对睡眠质量的影响也大有不同。',
            },
            {
                title:'睡前心情',
                title2:[
                    {
                        title2:'身心松驰，有益睡眠',
                        img:'q1',
                        material:'没有大的情绪波动更容易入睡。',
                        details:'睡前到户外散步一会儿，放松一下精神，上床前或洗个沐浴，或热水泡脚，然后就寝，对顺利入眠有百利而无一害。'
                    },
                    {
                        title2:'平常而自然的心态',
                        img:'q2',
                        material:'出现失眠不必过分担心，越是紧张，越是强行入睡，结果适得其反。',
                        details:'接纳自己目前的状态，调整自己的呼吸，让自己进入一个情绪放松的状态中，去享受当下，这样更有助于我们尽快入睡。'
                    }
                ],
                introduction:'人三分之一的时间是在床上度过的，但这三分之一的时间有的人在梦里遨游、有的人雷打不动、也有的人翻来覆去……不同的卧室环境对睡眠质量的影响也大有不同。',
            },
            {
                title:'卧室环境',
                title2:[
                    {
                        title2:'光线宜暗',
                        img:'w1',
                        material:'在明亮的光线下入睡，会导致人睡眠不安稳，浅睡期增多。',
                        details:'床铺最好设在室中幽暗的角落，保证在无光或柔和暗光下入眠，窗帘也已经以冷色调为佳。'
                    },
                    {
                        title2:'温、湿度适宜',
                        img:'w2',
                        material:'卧室要保证温、湿度相对稳定。',
                        details:'通常来说，室温一般以20℃为佳，湿度以60%左右为宜。'
                    }
                ],
                introduction:'人三分之一的时间是在床上度过的，但这三分之一的时间有的人在梦里遨游、有的人雷打不动、也有的人翻来覆去……不同的卧室环境对睡眠质量的影响也大有不同。',
            }
        ];
        return (
            <div>
            
            <div style={{backgroundColor:'#F5F5F5',color:'#000'}}>
                <NavBar
                    style={{backgroundColor:'#F5F5F5',color:'#000'}}
                    leftContent={[
                        <img src="images/home/fanhui.png" style={{marginRight: '16px'}}  onClick={this.handleClick} />
                    ]}
                    rightContent={[
                        <img src='images/home/shoucang.png' id="shoucang" onClick={this.shouCang} style={{marginRight: '16px'}} />,
                        // <img src='images/home/fenxiang.png' />
                    ]}
                >{vair[0].title}</NavBar>
                <div style={{margin:'10px 2% auto',fontSize:'15px',color:'#808080'}}>{vair[0].introduction}</div>
                <div style={{margin:'4px 2% auto',fontSize:'15px',color:'#808080',width:'96%'}}>
                {
                    this.state.data.map(data=>(
                        <Accordion defaultActiveKey="1" onChange={this.onChange}>
                            <Accordion.Panel header={vair[0].title2[data-1].title2} className="pad">
                                <img src={`images/home/${vair[0].title2[data-1].img}.png`} style={{width:'50%'}}/>
                                <div style={{width:'48%',float:'right',color:'#808080'}}>{vair[0].title2[data-1].material}</div>
                                <div style={{width:'100%',float:'left',color:'#808080'}}>
                                    {vair[0].title2[data-1].details}
                                </div>
                            </Accordion.Panel>
                        </Accordion>
                    ))
                }
                </div>
            </div>
            
            </div>
        )
    }
}
