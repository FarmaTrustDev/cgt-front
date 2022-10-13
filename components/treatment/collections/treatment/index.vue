<template>
  <a-skeleton :loading="loading">
    <FormActionButton
      v-if="!treatment.hospitalCollectionStatus"
      text="Add Sample"
      @click="addBags"
    />
    <Bag
      v-if="treatment.manufacturerCollectionStatus"
      :bags="bags"
      :treatment="treatment"
      @fetchBags="fetchBag"
    />

    <a-button
      v-if="
        !treatment.treatmentCollectionStatus &&
        treatment.manufacturerCollectionStatus &&
        bags.length > 0
      "
      class="w-100 mt-15"
      type="primary"
      :loading="loading"
      @click="markTreatmentCollectionComplete(bags)"
      >Complete Collection Process
    </a-button>
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
import routeHelpers from '~/mixins/route-helpers'
export default {
  components: { Bag, BagForm },
  mixins: [notifications,routeHelpers],
  props: {
    treatment: { required: true, type: Object },
    showCompleteBtn: { required: false, type: String },
  },
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
          type: COLLECTION_TYPE.treatment.id,
        })
          .then((response) => {
            this.bags = response.data
          })
          .finally((this.loading = false))
      }
    },
    fetchBag(key)
    {
      this.fetchBags()
      this.activeTab = key
    },
    onCreate(data) {
      this.handleModal(false)
      // this.fetchBags()
      this.bags = data.data
    },
    markTreatmentCollectionComplete(bags) {
      if (this.validateAllBagsCompleted(bags)) {
        TreatmentServices.markTreatmentCollection(this.treatment.id).then(
          (response) => {
            this.$nuxt.$emit(
              EVENT_FETCH_TREATMENT_DETAIL,
              this.treatment.globalId
            )
          }
        )
        this.goto(`/hospital/patients/collection/${this.treatment.globalId}`, {
          treatment_id: this.treatment.globalId, view: 'after-care'
        })
        this.$emit('callback','after-care')
      }
    },
    completeAllBags(bags) {
      if (this.validateAllBagsCompleted(bags)) {
        this.$emit('completeAllBag', bags)
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
          // check each bag related collection should be mark completed or collected
          if (!isEmpty(bags[bag])) {
            const tabBag = bags[bag]
            const nonCollectedBags = tabBag.collection.filter((collection) => {
              return collection.isCollected === false
            })

            if (nonCollectedBags.length > 0) {
              return false
            }
          }
          // if (!bags[bag].isCollected) {
          //   return false
          // }
        }
        return true
      }
      return false
    },
  },
}
</script>
