import request from '../request';
import Error from '../Error';
import { baseUrl } from '../apiConfig';

async function fetchApi(data,  msg = "错误") {
  //console.log(`${baseUrl}`);
  const realData = await request(`${baseUrl}`, {
    method: 'POST',
    responseType: 'json',
    data,
  });
  //console.log(realData);
  return realData;
  if (realData?.code !== 200) {
    Error(realData, msg);
    return;
  }
  // eslint-disable-next-line consistent-return
  return realData;
}

export default fetchApi;
