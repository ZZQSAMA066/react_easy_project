import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Space, message, Tabs } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, SelectLang } from 'umi';
import Footer from '@/components/Footer';
import styles from './login.less';
import { toLogin} from '@/services/login';
import { history } from 'umi';

const stuData = [
  'id',
  'userId',
  'studentNumber',
  'name',
  'school',
  'academy',
  'major',
  'clazz',
  'phoneNumber',
];
const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const intl = useIntl();

 

  const handleSubmit = async (values) => {
   console.log(values)
   const result = await toLogin(values);
   result.id ? history.push("/mainView") : message.error("账号或密码错误！");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <span className={styles.title}>环境监测系统</span>
            </Link>
          </div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            style={{
              marginTop: '50px',
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.submit',
                  defaultMessage: '登录',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values);
            }}
          >
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '用户名: admin or user',
                })}
                rules={[
                  {
                    required: true,
                    message: '请输入账户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '密码: ant.design',
                })}
                rules={[
                  {
                    required: true,
                    message: '请输入密码!',
                  },
                ]}
              />
            </>
          </ProForm>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
