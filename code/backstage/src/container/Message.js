import React, { Component } from 'react'

export default class Message extends Component {
    render() {
        return (
            <div style={{width:'100%',height:'600px',margin:'30px 30px'}}>
                <table cellspacing="0" style={{width:'100%',height:'40px'}}>
                    <tbody>
                        <tr>
                            <td className="box">
                                <input type="checkbox"/>
                            </td>
                            <td className="type">【认证消息】</td>
                            <td>您有一封教师身份待认证通知</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}