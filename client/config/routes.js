import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id',
    // 配置了props为true，在页面直接生命就可以调用了
    // 如 props: ['id'],

    props: true,
    // props: {
    //   id:'456'
    // }
    component: Todo,
    name: 'app'
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
    // meta: {
    //   title: 'this is app',
    //   description: 'asdfsd'
    // },
    // 子路由
  },
  {
    path: '/login',
    component: Login
  }
  // ,
  // {
  //   path: '/login/exact',
  //   component: Login
  // }
]
