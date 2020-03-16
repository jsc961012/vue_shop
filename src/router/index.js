import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Reports from '../components/goods/reports.vue'
import Params from '../components/goods/params.vue'
import GoodList from '../components/goods/List.vue'
import Add from '../components/goods/add.vue'
import Order from '../components/order/order.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Cate },
      { path: '/reports', component: Reports },
      { path: '/params', component: Params },
      { path: '/goods', component: GoodList },
      { path: '/goods/add', component: Add },
      { path: '/orders', component: Order }
    ]
  }
]

const router = new VueRouter({
  routes
})

// ����·�ɵ�������
router.beforeEach((to, from, next) => {
  // to��Ҫ���ʵ�·��
  // from������ĸ�·����ת����
  // next��һ��������ʾ����
  // next()����next('/login')ǿ����ת

  if (to.path === '/login') return next()
  // ��ȡtoken
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
