<template>
  <div class="fridge-tile">
    <div class="img"><fridge :color="storage.color" /></div>
    <div class="location">
      <a-icon type="environment" theme="filled" />{{ storage.location }}>
    </div>
    <div class="title">{{ storage.title }}</div>
  </div>
</template>
<script>
import fridge from '~/components/inventory/fridge'
export default {
  components: { fridge },
  props: {
    storage: { type: Object, default: () => ({}) },
    title: { type: String, default: 'Storage Suite 3, Germany - Cellfuse' },
    location: { type: String, default: 'Fridge Atara 001' },
    color: { type: String, default: '#1943AE' },
  },
  data() {
    return {}
  },
}
</script>
