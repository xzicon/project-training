import React, { Component } from 'react'

export default class AddRec extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    
    render() {
        return (
            <div className='add_material'>
                <textarea id='title' type='text' placeholder='素材标题' style={{width:'490px',height:'22px',paddingLeft:'10px'}}></textarea> 
                <input id='local' type='text' placeholder='素材出处'/>
                <textarea id='analyse' type='text' placeholder='素材分析'></textarea>    
                <textarea id='content' type='text' placeholder='素材内容' ></textarea>   
                <div className='upload-container'>
                    <input type="file" name="image" className='upload-input' style={{width:'60px'}}/>
                    <button type="primary" className='upload-button'>上传图片</button>
                    <button className='delete-button' style={{marginLeft:'20px'}}>删除图片</button>
                    <div style={{width:'214px',height:'142px',border:'1px solid gray'}}>
                    {/* {
                        this.state.location==='' ? <p></p> : ( type === 'mp4' ? 
                            <video src={`http://116.62.14.0:8402/images/`} id="myPlayer" poster='' controls playsInline webkit-playsinline style={{width:'100%'}}>
                            </video> : 
                            <img src={`http://116.62.14.0:8402/images/`} alt='主题图片' style={{width:'212.6px',height:'115px'}}/>
                        )
                    } */}
                    </div>
                </div>
                <div style={{width:'200px',height:'120px',float:'left',padding:'100px 0 0 40px'}}>
                    <button style={{width:'65px',height:'35px'}} >提交</button>
                    <button style={{width:'65px',height:'35px',marginLeft:'50px'}} >取消</button>
                </div> 
            </div>
        )
    }
}
