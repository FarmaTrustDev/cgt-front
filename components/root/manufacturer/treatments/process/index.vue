<template>
  <div>
    <manufactureCollection :treatment="treatment" />
  </div>
</template>
<script>
import manufactureCollection from '~/components/treatment/collections/manufacturer/index'
export default {
  components: { manufactureCollection },
  props: {
    treatment: { type: Object, required: true },
  },
}
</script>
