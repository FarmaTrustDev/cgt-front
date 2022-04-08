<template>
  <a-skeleton :loading="loading">
    <Bag :bags="bags" :treatment="treatment" @fetchBags="fetchBags" />

    <a-button
      v-if="!treatment[`${showCompleteBtn}`] && bags.length > 0"
      class="w-100 mt-15"
      type="primary"
      @click="completeAllBags(bags)"
      >Complete Collection Process
    </a-button>
  </a-skeleton>
</template>
<script>
import Bag from '~/components/treatment/collections/bag'
import TreatmentBagServices from '~/services/API/TreatmentBagServices'
import { COLLECTION_TYPE } from '~/services/Constant'
import { isEmpty } from '~/services/Utilities'
import notifications from '~/mixins/notifications'

export default {
  components: { Bag },
  mixins: [notifications],
  props: {
    treatment: { required: true, type: Object },
    showCompleteBtn: { required: true, type: String },
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
          type: COLLECTION_TYPE.manufacturer.id,
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
