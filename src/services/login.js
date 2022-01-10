import fetchApi from '@/api/service/config';
import formatTime from '@/utils/timeFormat';
import { message } from 'antd';

export const toLogin = async (params) => {
  const result = await fetchApi({
    username: params.username,
    password: params.password
  }, "login")
  console.log(result)
  return result
}

export const toAllData = async (params) => {
  const result = await fetchApi({}, "data/check_all")
  console.log(result)
  if ((result + "") !== "{}") {
    const allData = {};
    let tempTime = [];
    tempTime = result?.time.map((n) => {
      return formatTime(n);
    })
    allData.guanzhao = result?.guanzhao.map((gn, gdex) => {
      return {
        item: gn[0],
        time: tempTime[gdex]
      }
    })

    allData.shidu = result?.shidu.map((gn, gdex) => {
      return {
        item: gn[0],
        time: tempTime[gdex]
      }
    })

    allData.wendu = result?.wendu.map((gn, gdex) => {
      return {
        item: gn[0],
        time: tempTime[gdex]
      }
    })

    allData.zhiliang = result?.zhiliang.map((gn, gdex) => {
      return {
        item: gn[0],
        time: tempTime[gdex]
      }
    })
    const allDataKeys = Object.keys(allData);
    allDataKeys.map((n) => {
      allData[n] = allData[n]?.filter((nn) => {
        return nn.item ? true : false
      })
    })
    return allData
  }
}

export const fzAll = async()=>{
  const result = await fetchApi({}, "data/check_all_threshold")
  console.log(result)
  return result
}

export const updatewd = async(params)=>{
  const result = await fetchApi({
    wfazhigao:params[0],
    wfazhidi:params[1]
  }, "data/update_temp")
  if(result?.result === 1) message.success("温度阈值更新成功！")
  else message.error("温度阈值更新失败！")
  return result
}

export const updatesd = async(params)=>{
  const result = await fetchApi({
    sfazhigao:params[0],
    sfazhidi:params[1]
  }, "data/update_hum")
  if(result?.result === 1) message.success("湿度阈值更新成功！")
  else message.error("湿度阈值更新失败！")
  return result
}

export const updategz = async(params)=>{
  const result = await fetchApi({
    gfazhigao:params[0],
    gfazhidi:params[1]
  }, "data/update_lux")
  if(result?.result === 1) message.success("光照阈值更新成功！")
  else message.error("光照阈值更新失败！")
  return result
}