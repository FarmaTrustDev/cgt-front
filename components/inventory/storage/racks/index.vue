<template>
  <div class="text-center">
    <div class="racks"><rack v-for="rack in data" :key="rack.id" /></div>
  </div>
</template>

<script>
import rack from '~/components/inventory/storage/racks/rack'
export default {
  components: { rack },
  props: { data: { type: Array, default: () => [{}] } },
}
</script>
<style lang="scss" scoped>
.racks {
  width: 100%;
  max-width: 200px;
  margin: auto;
}
</style>
