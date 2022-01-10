export default [
  {
    name: 'list.table-list',
    layout:false,
    path: '/mainView',
    component: './card',
  },
  {
    name: 'list.table-list',
    layout: false,
    icon: 'table',
    path: '/charts',
    component: './picture',
    hideInMenu: 'true',
  },
  {
    path:'/TableList',
    name:'list',
    icon:'table',
    component:'./TableList',
  },

  {
    component: './404',
  },
];
