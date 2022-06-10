<template>
  <div>
    <a-row :gutter="80" class="flex-child-container">
      <a-col v-for="consume in consumables" :key="consume.heading" :span="6">
        <card :data="consume" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import card from '~/components/root/inventory/consumables/Card'
const color = {
  blue: '#2359e8',
  red: '#ff0909',
  yellow: '#ffbf00',
}
export default {
  components: { card },
  data() {
    return {
      consumables: [
        {
          threshold: 46,
          heading: '5ml EDTA blood collection tube (minimum order 500)',
          color: color.red,
        },
        {
          threshold: 50,
          heading: ' 10ml SST blood collection tubes (minimum order 500)',
          color: color.red,
        },
        {
          threshold: 90,
          heading: ' Vacutainer holder (minimum order 500) ',
          color: color.blue,
        },
        {
          threshold: 46,
          heading: ' 21g Eclipse blood collection needle (minimum order 500)',
          color: '#2359e8',
        },
        {
          threshold: 46,
          heading: ' alcohol skin swabs',
          color: '#ff0909',
        },
        {
          threshold: 50,
          heading: 'cotton wool balls',
          color: '#ff0909',
        },
        {
          threshold: 90,
          heading: 'disposable tourniquet',
          color: '#2359e8',
        },
        {
          threshold: 46,
          heading: 'small Band-Aid plasters',
          color: '#2359e8',
        },

        {
          threshold: 46,
          heading: ' leakproof tamper-proof sample bag (approx. 6” x 10”) ',
          color: '#ff0909',
        },
        {
          threshold: 50,
          heading: 'absorbent pad',
          color: '#ff0909',
        },
        {
          threshold: 90,
          heading: ' Consumables 123 ',
          color: '#2359e8',
        },
        {
          threshold: 46,
          heading: 'Consumables 648',
          color: '#2359e8',
        },
        {
          threshold: 46,
          heading: 'Consumables 648 ',
          color: '#2359e8',
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.flex-child-container {
  display: flex;
  flex-flow: wrap;
}
</style>
