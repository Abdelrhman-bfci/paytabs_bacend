<template>
<div>
<p v-for="item in $store.getters['courses/count']">{{item.header}} {{item.answer}} {{item.count}}</p>



<p>jknlj</p>
</div>
</template>
<script>



export default {
    data() {

    },
    mounted(){
      this.$store.dispatch("courses/count")

    },


}
</script>
