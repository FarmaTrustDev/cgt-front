<template>
  <div class="capsule primary-capsule default-border-radius">
    <span class="title">{{ title }} </span>
    <span class="description">{{ description }}</span>
    <a-icon type="right" />
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss" scoped>
.capsule {
  font-size: 28px;
  padding: 15px 25px;
  margin-right: 10px;
}
</style>
