<template>
  <a-skeleton :loading="loading">
    {{ loading }}
    <FormActionButton text="Add Sample" @click="addBags" />
    <Bag :bags="bags" :treatment="treatment" @fetchBags="fetchBags" />

    <a-modal
      :footer="false"
      :visible="showModal"
      title="Add Bag"
      :destroy-on-close="true"
      @cancel="handleModal(false)"
    >
      <BagForm :loading="loading" :treatment="treatment" @onCreate="onCreate" />
    </a-modal>
  </a-skeleton>
</template>
<script>
import BagForm from '~/components/treatment/collections/bag/create/Form'
import Bag from '~/components/treatment/collections/bag'
import TreatmentBagServices from '~/services/API/TreatmentBagServices'
import { COLLECTION_TYPE } from '~/services/Constant'
import { isEmpty } from '~/services/Utilities'
export default {
  components: { BagForm, Bag },
  props: { treatment: { required: true, type: Object } },
  data() {
    return {
      showModal: false,
      fetchIdFromParams: false,
      bags: [],
      COLLECTION_TYPE,
      loading: true,
    }
  },
  mounted() {
    this.fetchBags()
  },
  methods: {
    handleModal(show) {
      this.showModal = show
    },
    addBags() {
      this.handleModal(true)
    },
    isEmpty,
    fetchBags() {
      if (!isEmpty(this.treatment)) {
        this.loading = true
        TreatmentBagServices.getByTreatmentId(this.treatment.id, {
          type: COLLECTION_TYPE.hospital.id,
        })
          .then((response) => {
            this.bags = response.data
          })
          .finally((this.loading = false))
      }
    },
    onCreate(data) {
      this.handleModal(false)
      // this.fetchBags()
      this.bags = data.data
    },
  },
}
</script>
