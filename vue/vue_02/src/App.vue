<template>
  <div>
    <!-- <h1>{{ message }}</h1> -->
    <!-- <element-view></element-view> -->
    <!-- <emp-view></emp-view> -->
    <router-view></router-view>
  </div>
</template>
<script>
/* import RoleView from './views/stayValley/EmpView.vue' */
/* import ElementView from './views/element/view_01.vue' */
export default{
  components:{/* RoleView *//* ElementView */},
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
