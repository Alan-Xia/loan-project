<template>
  <div class="button">
    <button @click="event"
    :style="{
      backgroundColor:bgcolor?bgcolor: '#11C4C4',
      padding: padding,
      color: color,
      borderRadius: border
    }" class="btn">
      {{title}}
    </button>
  </div>
</template>

<script>
  export default {
    props: ['title', 'bgcolor', 'padding','border', 'color','action'],
    methods: {
      event () {
        this.$emit('getFunAction', this.action)
      }
    }
  }
</script>

<style lang="scss" scoped>
.button{
  width: 100%;
  text-align: center;
  .btn{
    text-align: center;
    cursor: pointer;
  }
}
</style>