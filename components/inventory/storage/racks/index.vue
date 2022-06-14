<template>
  <div class="text-center">
    <div class="racks">
      <span v-for="(rack, index) in data" :key="index">
        <rack
          :portions="rack.portions"
          :counter="index + 1"
          @getRackPortion="getRackPortion"
        />
      </span>
    </div>
  </div>
</template>

<script>
import rack from '~/components/inventory/storage/racks/rack'
export default {
  components: { rack },
  props: { data: { type: Array, default: () => [{}] } },
  methods: {
    getRackPortion(portion) {
      this.$emit('getRackPortion', portion)
    },
  },
}
</script>
<style lang="scss" scoped>
.racks {
  width: 100%;
  max-width: 320px;
  margin: auto;
}
</style>
