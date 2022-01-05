<template>
  <div>
    <FormActionButton text="Add Sample" @click="addBags" />
    <a-modal
      :footer="false"
      :visible="showModal"
      title="Add Bag"
      @cancel="handleModal(false)"
    >
      <BagForm :treatment="treatment" />
    </a-modal>
  </div>
</template>
<script>
import BagForm from '~/components/treatment/collections/bag/Form'

export default {
  components: { BagForm },
  props: { treatment: { required: true, type: Object } },
  data() {
    return {
      showModal: false,
      fetchIdFromParams: false,
    }
  },
  methods: {
    handleModal(show) {
      this.showModal = show
    },
    addBags() {
      this.handleModal(true)
    },
  },
}
</script>
