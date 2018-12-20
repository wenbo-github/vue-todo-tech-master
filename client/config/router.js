import Router from 'vue-router'

import routes from './routes'

// const router = new Router({
//   routes
// })
export default () => {
  return new Router({
    routes,
    mode: 'history',
    // 默认跳转的路由变成http://localhost:8000/base/app 整个路径的基路径
    // base: '/base/'
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',

    // 保存滚动条滚动的位置savePosition
    scrollBehavior (to, from, savePosition) {
      // 如果有滚动行为
      if (savePosition) {
        // 就返回到滚动的位置
        return savePosition
      } else {
        // 如果没有就回到 0,0顶部
        return {x: 0, y: 0}
      }
    }

    // parseQuery (query) {
    // 基本用不到，传递的参数用的
    // },
    // stringifyQuery (obj) {

    // }
    // 在不支持这样的路由的时候，路由直接转化为哈希的这种形式
    // true是直接vue帮着转化
    // false是不用自动转化 但是如果浏览器不支持 单页面应用会变成多页应用很耗时所以一般就设置true
    // fallback: true
  })
}
