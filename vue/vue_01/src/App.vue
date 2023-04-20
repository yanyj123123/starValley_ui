<template>
  <div>
    <!-- <h1>{{ message }}</h1> -->
    <!-- <element-view></element-view> -->
    <emp-view></emp-view>
  </div>
</template>
<script>
import EmpView from './views/tilias/EmpView.vue'
/* import ElementView from './views/element/view_01.vue' */
export default{
  components:{EmpView/* ElementView */},
  data:function(){
    return {
      message:"hello vue"
    }
  },
  methods:{
   
  }
}
</script>
<style>

</style>
