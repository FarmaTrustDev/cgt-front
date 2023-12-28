<template>
  <div>
    <a-skeleton :rows="10" :loading="loading">
      <Bag :bags="bags" :treatment="treatment" @fetchBags="fetchBag" />
      <!-- {{ treatment.manufacturerCollectionStatus }} -->
      <div v-if="(treatment.isHold !== true) | (treatment.isCancel !== true)">
        <a-button
          v-if="!treatment[`${showCompleteBtn}`] && bags.length > 0"
          class="w-100 mt-15"
          type="primary"
          :loading="loading"
          @click="completeAllBags(bags)"
          >Complete Collection Process
        </a-button>
      </div>
      <a-modal 
      :visible="visibleSignature"
      :footer="null"
      @cancel="handleOk()"
      @ok="handleOk()"
    >
    <Signature @handleSignatureOk="handleSignatureOk" @handleSignatureCancel="handleSignatureCancel"/>
    </a-modal>
      <a-modal
        :visible="visibleModal"
        ok-text="Ok"
        :footer="null"
        
      >
        <center>
          <p class="cross-img">
            <span class="inner-mark">
              <span class="line-left line"></span>
              <span class="line-right line"></span>
            </span>
          </p>
          <h3>Complete all steps before completing this sample.</h3>
          <footer>
            <!-- @Mehdi please optimize the code  -->
            <a-button
              class="ant-btn ant-btn-primary error-ok-btn"
              @click="handleOk()"
              ><b>Ok</b></a-button
            >
            <!-- @Mehdi please optimize the code  -->
          </footer>
        </center>
      </a-modal>
    </a-skeleton>
  </div>
</template>
<script>
import Bag from '~/components/treatment/collections/bag'
import TreatmentBagServices from '~/services/API/TreatmentBagServices'
import { COLLECTION_TYPE } from '~/services/Constant'
import { isEmpty } from '~/services/Utilities'
import notifications from '~/mixins/notifications'
import imagesHelper from '~/mixins/images-helper'

export default {
  components: { Bag },
  mixins: [notifications, imagesHelper],
  props: {
    treatment: { required: true, type: Object },
    showCompleteBtn: { required: true, type: String },
  },
  data() {
    return {
      showModal: false,
      visibleSignature: false,
      fetchIdFromParams: false,
      visibleModal: false,
      bags: [],
      COLLECTION_TYPE,
      loading: false,
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
        // this.loading = true
        TreatmentBagServices.getByTreatmentId(this.treatment.id, {
          type: COLLECTION_TYPE.manufacturer.id,
        })
          .then((response) => {
            this.bags = response.data
          })
          .finally(() => {
            // this.loading = false
          })
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
    completeAllBags(bags) {
      if (this.validateAllBagsCompleted(bags)) {
        this.visibleSignature = true
      } else {
        this.visibleModal = true
        // this.error('Complete all the bags')
      }
    },
    upsert()
    {
      this.$emit('completeAllBag', this.bags)
    },
    handleOk() {
      this.handleSignatureCancel()
    },
    handleSignatureOk() {
      this.visibleSignature = false
      this.upsert()
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
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
