<template>
  <div>{{ shipment }}</div>
</template>

<script>
export default {
  props: {
    shipment: {
      default: () => {},
      require: true,
      type: Object,
    },
  },
  data() {
    return {}
  },
}
</script>
