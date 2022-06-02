<template>
  <div class="tileCenter border p-15">
    <div class="heading">{{ heading }}</div>
    <slot name="center"></slot>
    <div class="footer">
      <a-icon type="environment" theme="filled" />{{ footer }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    heading: { type: String, default: 'Storage Suite 3, Germany - Cellfuse' },
    footer: { type: String, default: 'Storage Suite 3, Germany - Cellfuse' },
  },
}
</script>
<style lang="scss" scoped>
.tileCenter {
  min-height: 350px;
  padding-bottom: 25px;
  font-size: 14px;
  .footer {
    color: #7a7575;
    position: absolute;
    bottom: 15px;
  }
  .heading {
    padding: 15px 0 15px;
    color: #000;
  }
}
</style>
