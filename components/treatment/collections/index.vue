<template>
  <div>
    <FormActionButton text="Add Sample" @click="addBags" />
    <Bag :bags="bags" :treatment="treatment" />

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
    }
  },
  mounted() {
    this.fetchOnMount()
  },
  methods: {
    handleModal(show) {
      this.showModal = show
    },
    addBags() {
      this.handleModal(true)
    },
    isEmpty,
    fetchOnMount() {
      if (!isEmpty(this.treatment)) {
        TreatmentBagServices.getByTreatmentId(this.treatment.id, {
          type: COLLECTION_TYPE.hospital.id,
        }).then((response) => {
          this.bags = response.data
        })
      }
    },
  },
}
</script>
