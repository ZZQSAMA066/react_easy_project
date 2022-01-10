import { messagePrompt } from '@/utils/messagePrompt';
import { allTests, deleteTest, addCompany, editCompany } from '@/services/table-zhangsan';

const Model = {
  namespace: 'zhangsan',
  state: {
    testList: [],
  },
  effects: {
    *allTests({ payload }, { call, put }) {
      const response = yield call(allTests, payload);
      //console.log(payload);
      //console.log(response.data.allCompanies);
      yield put({
        type: 'saveTests',
        payload: {
          data: response.data.allCompanies,
          //data: response.data.allTests,
        },
      });
    },
    //异步发送api数据删除指令
    *deleteTest({ payload }, { call, put }) {
      const response = yield call(deleteTest, payload);
      //console.log(payload);
      //console.log(response.data.deleteTest);
      if (response) {
        yield put({
          type: 'delTest',
          payload: {
            id: payload.id,
          },
        });
      } else {
        messagePrompt.error({
          message: '删除失败',
        });
      }
    },
    //异步发送api修改数据
    *addCompany({ payload }, { call, put }){
      const response = yield call(addCompany, payload);
      //console.log(response);
      if(response){
        yield put({
          type:'addcom',
          payload:{
            data:response.data.addCompany
          },
        });
      } else {
        messagePrompt.error({
          message: '添加失败',
        });
      }
    },
    *editCompany({ payload }, { call, put }){
      const response = yield call(editCompany, payload);
      //console.log(payload);
      yield put({
        type: 'editcom',
        payload: {
          data: response.data.editCompany,
          modify:payload.modify
        },
      });
    }
  },
  reducers: {
    saveTests(state, { payload }) {
      return {
        ...state,
        testList: payload.data,
      };
    },
    delTest(state, { payload }) {
      //console.log(state);
      const { testList } = state;
      const result = testList.filter((item) => payload.id !== item.id);
      console.log(result);
      return {
        ...state,
        testList: result,
      };
    },
    addcom(state, { payload }) {
      
      const { testList } = state;
      const result = testList;
      result.push(payload.data)
      //console.log(state);
      return{
        ...state,
        testList: [...result],
      }
    },
    editcom(state, { payload }){
      const { testList } = state;
      const result = testList;
      for(let i=0;i<result.length;i++){
        if(result[i].name===payload.modify){
          result[i]=payload.data;
        }
      }
      //console.log(result);
      return{
        ...state,
        testList: [...result],
      }
    },
    searchcom(state, { payload }){
      //console.log(payload.search);
      const { testList } = state;
      const result = testList;
      //console.log(result[0].name);
      const search=[];
      for(let i=0;i<result.length;i++){
        if(result[i].name===payload.search){
          search.push(result[i]);
        }
      }
      return{
        ...state,
        testList: [...search],
      }
    }
  },
};
export default Model;
