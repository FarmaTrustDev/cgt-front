<template>
  <div class="rack" :class="active ? 'active' : ''"></div>
</template>

<script>
export default {
  props: { active: { type: Boolean } },
}
</script>

<style lang="scss" scoped>
.rack {
  background-color: #fa6363;
  max-width: 120px;
  width: 100%;
  height: 26px;
}
</style>
