import { notification } from 'antd';
import { history } from 'umi';

const getType = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1);
};

async function Error(realData, msg) {
  const { errors } = realData;
  if (getType(errors) === 'Array') {
    for (let i = 0, len = errors.length; i < len; i += 1) {
      notification.error({
        message: (msg ? `${msg}:` : '') + errors[i].message,
      });
    }
  } else if (errors && errors.message) {
    notification.error({
      message: (msg ? `${msg}:` : '') + errors.message,
    });
  }

  if (realData.code === 401) {
    // 登录过期，跳转至登录页
    notification.error({
      message: '登录过期，正跳转至登录页',
    });
    localStorage.clear();
    setTimeout(() => {
      // window.location.href = '/user/login';
      history.push('/user/login');
    }, 2000);
  }
}

export default Error;
