import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Table, Input} from 'antd';
import { messagePrompt } from '@/utils/messagePrompt';
import { Modal, Button, Select, Form} from 'antd';

const { Option } = Select;

const TableList = ({ dispatch, zhangsan }) => {
  const { testList } = zhangsan;

  useEffect(() => {
    // let modify=document.getElementById("modify");
    // modify.style.display="none";
    const getTests = () => {
      dispatch({
        type: 'zhangsan/allTests',
        payload: {
          origin: '430709',
        },
      });
    };
    getTests();
  }, [dispatch]);

  const [list, setList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [prevalue,setprevalue] = useState({});
  const [nowvalue,setnowvalue] = useState('');
  const [addvalue,setaddvalue] = useState('');
  const [searchvalue,setsearchvalue] = useState('');
  const [currency, setCurrency] = useState('公司类型');
  

  // 生成key, setState list
  useEffect(() => {
    let count = 1;
    const temp = [];
    for (const item of testList) {
      //console.log(item);
      temp.push({
        ...item,
        key: `${item.name}${count}`,
        //key: `${item.title}${count}`,
      });
      count += 1;
    }
    //console.log(temp);
    setList(temp);
  }, [testList]);

  const onDelete = (item) => {
    //console.log(item);
    dispatch({
      type: 'zhangsan/deleteTest',
      payload: {
        id: item.id,
      },
    });
  };

  const onAdd = () =>{
    console.log(addvalue,currency);
    if(addvalue==''||currency=='公司类型'){
      messagePrompt.error({
        message: '请输入完整信息',
      });
      return;
    }
    dispatch({
      type:'zhangsan/addCompany',
      payload:{
        name: addvalue,
        industry: currency
      },
    });
    setaddvalue('');
    setCurrency('公司类型');
  }

  const onModify = () => {
    dispatch({
      type:'zhangsan/editCompany',
      payload:{
        name: nowvalue,
        industry: prevalue.industry,
        modify:prevalue.name
      },
    });
    setprevalue('');
    setnowvalue("");
    //console.log(nowvalue);
    setIsModalVisible(false);
  }

  const suerModify = (item) =>{
    //console.log(item);
    setprevalue(item);
    setIsModalVisible(true);
  }

  const handleCancel = () =>{
    setnowvalue(" ");
    setIsModalVisible(false);
  }

  const changevalue=(e)=>{
      setnowvalue(e.target.value);
    }

  const onCurrencyChange = (newCurrency)=>{
    //console.log(newCurrency);
    setCurrency(newCurrency);
  }

  const onAddvalueChange = (e)=>{
    setaddvalue(e.target.value);
  }

  const onSearchvalueChange = (e) =>{
    setsearchvalue(e.target.value);
  }

  const search = ()=>{
    dispatch({
      type:'zhangsan/searchcom',
      payload:{
        search:searchvalue
      },
    });
  }

  const nosearch = ()=>{
    setsearchvalue("");
    dispatch({
      type: 'zhangsan/allTests',
      payload: {
        origin: '430709',
      },
    });
  }

  const columns = [
    { title: '公司名称', dataIndex: 'name', key: 'key' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (item) => <a onClick={() => onDelete(item)}>delete</a>,
    },
    {
      title:'配置',
      dataIndex: '',
      key: 'x',
      //render: (item) => <a onClick={() => onAdd()}>add</a>,
      render: (item) => <a onClick={() => suerModify(item)}>modify</a>,
    }

    
  ];

  return (
    <>
    <Form.Item label="公司名称">
      <Input
        type="text"
        style={{ width: 200 }}
        onChange={onAddvalueChange}
        value={addvalue}
      />
      <Select
        value={currency}
        style={{ width: 180, margin: '0 8px' }}
        onChange={onCurrencyChange}
      >
        <Option value="IT">IT</Option>
        <Option value="Manufacturing">Manufacturing</Option>
        <Option value="Medicine">Medicine</Option>
        <Option value="Media">Media</Option>
      </Select>
      <Button type="primary" onClick={() => onAdd()}>
          Add
      </Button>
    </Form.Item>
    {/* <Input.Group>
    公司名称：
      <input id="name" placeholder="请输入"/>
    公司类型：
      <input id="industry" placeholder="请输入" />
      <button type="primary" onClick={() => onAdd()}>add</button>
    </Input.Group> */}
    {/* <Input.Group>
    <div id="modify">原公司名称：
      <input id="pre" placeholder="请输入"/>
      更改名称：
      <input id="now" placeholder="请输入"/>
      <button type="primary" onClick={() => onModify()}>sure</button>
      <button type="cancel" onClick={() => noModify()}>cancel</button>
    </div>
    </Input.Group> */}
    <Modal title="修改对话框" visible={isModalVisible} footer={null} onCancel={handleCancel}>
    <Form>
        <Form.Item label="公司原名称">
          <Input value={prevalue.name} placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="公司新名称">
          <Input value={nowvalue} onChange={changevalue} placeholder="input placeholder" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => onModify()}>Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
    <Form.Item label="公司名称">
      <Input
        type="text"
        style={{ width: 200, margin: '0 8px'}}
        onChange={onSearchvalueChange}
        value={searchvalue}
      />
      <Button type="primary" onClick={() => search()}>
          Search
      </Button>
      <Button 
        type="primary" 
        onClick={() => nosearch()}
        style={{margin: '0 8px'}}>
          Cancel
      </Button>
    </Form.Item>
      <Table columns={columns} dataSource={list} />,
    </>
  );
};

export default connect(({ zhangsan }) => ({
  zhangsan,
}))(TableList);
