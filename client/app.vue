<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <!-- <todo></todo> -->
    <!-- <router-link :to="{name: 'app'}">app</router-link> -->
    <router-link to="/app/123">app</router-link>
    <router-link to="/login">login</router-link>
    <!-- 如果路径为http://localhost:8000/login/exact
    to="/login"会只加上 active-link因为只匹配了部分路径
    <router-link to="/login">login</router-link>
    /login/exact 会加上exact-active-link active-link 两个class，因为是全部匹配
    <router-link to="/login/exact">login exact</router-link> -->
    <transition name="fade">
      <router-view />
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'
console.log(Header.__docs)
export default {
  components: {
    Header,
    Footer,
    Todo
  },
  mounted () {
    console.log(this.$route)
  }
  // updated () {
  //   console.log(this.$route)
  // }

}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>
