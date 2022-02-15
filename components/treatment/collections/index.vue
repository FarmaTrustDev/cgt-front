<template>
  <a-skeleton :loading="loading">
    <FormActionButton
      v-if="!treatment.hospitalCollectionStatus"
      text="Add Sample"
      @click="addBags"
    />
    <Bag :bags="bags" :treatment="treatment" @fetchBags="fetchBags" />

    <a-button
      v-if="!treatment.hospitalCollectionStatus && bags.length > 0"
      class="w-100 mt-15"
      type="primary"
      @click="markHospitalCollectionComplete(bags)"
      >Complete Collection Process</a-button
    >
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
import notifications from '~/mixins/notifications'
import TreatmentServices from '~/services/API/TreatmentServices'
import { EVENT_FETCH_TREATMENT_DETAIL } from '~/services/Constant/Events'
export default {
  components: { BagForm, Bag },
  mixins: [notifications],
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
    markHospitalCollectionComplete(bags) {
      if (this.validateAllBagsCompleted(bags)) {
        TreatmentServices.markCompleteCollection(this.treatment.id).then(
          (response) => {
            this.$nuxt.$emit(
              EVENT_FETCH_TREATMENT_DETAIL,
              this.treatment.globalId
            )
          }
        )
      } else {
        this.error('Complete all the bags')
      }
    },
    validateAllBagsCompleted(bags) {
      if (!isEmpty(bags)) {
        for (let bag = 0; bag < bags.length; bag++) {
          if (!bags[bag].isCollectionCompleted) {
            // if any bag is inComplete

            return false
          }
        }
        return true
      }
      return false
    },
  },
}
</script>
