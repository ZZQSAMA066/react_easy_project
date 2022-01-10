import { notification, message } from 'antd';

const successDefaultObj = {
  message: '成功',
  duration: 1,
};
const errorDefaultObj = {
  message: '错误',
  duration: 2,
};
message.config({
  top: 65,
  duration: 3,
  maxCount: 2,
});
const messagePrompt = {
  success: (messageObj = successDefaultObj) => {
    message.success(messageObj.message || '成功', messageObj.duration || 2);
  },
  error: (messageObj = errorDefaultObj) => {
    notification.error({
      message: messageObj.message || '错误',
      duration: messageObj.duration || 2,
    });
  },
};

export { messagePrompt };
