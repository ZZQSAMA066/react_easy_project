import { extend } from 'umi-request';
import { notification } from 'antd'

const request = extend({
  maxCache: 10,
  timeout: 15000,
  // prefix: baseURL,
});

request.interceptors.response.use(async (res, opt) => {
  //console.log(opt);
  if (opt.responseType !== 'blob') {
    //console.log(res);
    const data = await res.clone().json();
    

    const { errors = [] } = data;
    //console.log(errors);
    if (errors.length > 0) {
      errors.map((n) => {
        notification.error({
          description: n.message,
        });
        return n;
      });
      return false;
    }
  }
  return res;
});


export default request;
