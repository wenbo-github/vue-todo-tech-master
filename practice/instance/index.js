import Vue from 'vue'

new Vue({
  el: '#root',
  template: '<div>this is content</div>'
})
const app = new Vue({
  template: '<div>this is content</div>',
  data: {
    text: 'text'
  }
})
app.$mount('#root')
app.text ='text1'
