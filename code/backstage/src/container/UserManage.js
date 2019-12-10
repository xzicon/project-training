import React, { Component } from 'react'
import { Table } from 'antd';

const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: '邮箱',
      dataIndex: 'age',
      key: 'age',
    },
    {
        title: '简介',
        dataIndex: 'address',
        key: 'address',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <button style={{width:'50px',height:'25px'}}>编辑</button>
          <button style={{width:'50px',height:'25px'}}>删除</button>
        </span>
      ),
    }
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }
  ];  

export default class UserManage extends Component {
  constructor(){
    super();
    this.state={
      
    }
  }
    render() {
        return (
            <div>
                <Table columns={columns} dataSource={data} style={{margin:'50px 30px'}}/>
            </div>
        )
    }
}
