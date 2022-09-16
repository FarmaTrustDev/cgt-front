<template>
  <a-skeleton :loading="loading">
    <div v-if="enabled">
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
        :loading="loading"
        @click="markHospitalCollectionComplete(bags)"
        >Complete Collection Process
      </a-button>
      <a-modal
        :footer="false"
        :visible="showModal"
        title="Add Bag"
        :destroy-on-close="true"
        @cancel="handleModal(false)"
      >
        <BagForm
          :loading="loading"
          :treatment="treatment"
          @onCreate="onCreate"
        />
      </a-modal>
    </div>
    <a-alert
      v-else
      message="Manufacturer has not accepted the treatment request yet"
    ></a-alert>
    <a-modal
      :visible="visibleModal"
      ok-text="Ok"
      :footer="null"
      @cancel="handleOk()"
      @ok="handleOk()"
    >
      <center>
        <p class="cross-img">
          <span class="inner-mark">
          <span class="line-left line"></span>
          <span class="line-right line"></span>
        </span>
          <!-- <img
            :src="getImageUrl('Icons/cross-letter.jpg')"
            width="40%"
            height="40%"
          /> -->
        </p>
        <h3>Complete all steps before completing this sample.</h3>
        <footer>
          <a-button
            class="ant-btn ant-btn-primary"
            @click="handleOk()"
            style="padding: 5px 50px"
            ><b>Ok</b></a-button
          >
        </footer>
      </center>
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
import imagesHelper from '~/mixins/images-helper'
export default {
  components: { BagForm, Bag },
  mixins: [notifications, imagesHelper],
  props: {
    treatment: { required: true, type: Object },
    enabled: { required: true, type: Boolean, default: false },
  },
  data() {
    return {
      showModal: false,
      visibleModal: false,
      fetchIdFromParams: false,
      bags: [],
      COLLECTION_TYPE,
      loading: true,
      schedule: [],
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
    // for handle modal
    handleOk() {
      this.visibleModal = false
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
        this.visibleModal = true
        // this.error('Complete all the bags')
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
