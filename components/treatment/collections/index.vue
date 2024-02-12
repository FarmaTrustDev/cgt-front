<template>
  <a-skeleton :loading="loading">
    <div v-if="enabled" class="sample-shipping-detail">
      <h1 class="heading" style="display: inline-block">
       <b> Treatment Details</b>
      </h1>
      <FormActionButton
        v-if="!treatment.hospitalCollectionStatus"
        :text="translation.AddSampl_2_770"
        @click="addBags"
        style="float: right;"
      />

      <Bag :bags="bags" :treatment="treatment" @fetchBags="fetchBags" />

      <a-button
        v-if="!treatment.hospitalCollectionStatus && bags.length > 0"
        class="w-100 mt-15"
        type="primary"
        :loading="loading"
        @click="markHospitalCollectionComplete(bags)"
        >{{translation.ComplColle_3_985}}
      </a-button>
      <a-modal 
      :visible="visibleSignature"
      :footer="null"
      @cancel="handleOk()"
      @ok="handleOk()"
      >
        <Signature @handleSignatureOk="handleSignatureOk" @handleSignatureCancel="handleSignatureCancel"/>
      </a-modal>
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
      :message="translation.Manufhas_8_988"
    ></a-alert>
    <a-modal
      :visible="visibleModal"
      :ok-text="translation.Ok_1_663"
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
        <h3>{{translation.Complall_7_986}}</h3>
        <footer>
          <a-button
            class="ant-btn ant-btn-primary"
            @click="handleModelOk()"
            style="padding: 5px 50px"
            ><b>{{translation.Ok_1_663}}</b></a-button
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
import Signature from '~/components/signature'
import TreatmentServices from '~/services/API/TreatmentServices'
import { EVENT_FETCH_TREATMENT_DETAIL } from '~/services/Constant/Events'
import imagesHelper from '~/mixins/images-helper'
import routeHelpers from '~/mixins/route-helpers'
import SchedulingServices from '~/services/API/SchedulingServices'
import ShipmentServices from '~/services/API/ShipmentServices'
export default {
  components: { BagForm, Bag, Signature },
  mixins: [notifications, imagesHelper, routeHelpers],
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
      schId:0,
      bagData:[],
      treatTN:'',
      currentDateTime:null,
      visibleSignature:false,
    }
  },
  computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
  mounted() {
    this.fetchBags()
    this.fetchSchedul()
    this.getTreatData()
    this.getCurrentDateTime()
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
    fetchSchedul()
    {
      SchedulingServices.getByTreatment(this.treatment.id).then((response=>{
        this.schId=response.data.id
      }))

    },
    onCreate(data) {
      this.handleModal(false)
      // this.fetchBags()
      this.bags = data.data
    },
    getCurrentDateTime() {
      this.currentDateTime = new Date();
    },
    // for handle modal
    handleOk() {
      this.handleSignatureCancel()
    },
    handleModelOk() {
      this.visibleModal = false
    },
    getTreatData(){
      TreatmentServices.getById(this.treatment.globalId).then((response)=>{
        this.treatTN = response.data.treatmentTypeName
      })
    },
    markHospitalCollectionComplete(bags) {
      if (this.validateAllBagsCompleted(bags)) {
        this.bagData=bags
        this.visibleSignature = true
        // console.log(bags)
        /* TreatmentServices.markCompleteCollection(this.treatment.id).then(
          (response) => {
            this.$nuxt.$emit(
              EVENT_FETCH_TREATMENT_DETAIL,
              this.treatment.globalId
            )
            this.goto('/hospital/patients')
            this.success('Collection step has been completed')
          }
        ) */
      } else {
        this.visibleModal = true
        // this.error('Complete all the bags')
      }
    },
    collection(){
        TreatmentServices.markCompleteCollection(this.treatment.id).then(
          (response) => {
            this.$nuxt.$emit(
              EVENT_FETCH_TREATMENT_DETAIL,
              this.treatment.globalId
            )
            if(this.treatTN === 'IVF/ICSI'){
              const dat={accepted:true,isLogistic:true}
              SchedulingServices.markScheduleRequest(this.schId, dat).then(
              (response) => {
                const dat = {LogisticUserName:'Steph',origin:'clinic',pickupAt:this.currentDateTime,senderName:'Christy Walter'}
                ShipmentServices.pickupCreate(this.schId,dat)
                  .then((response) => {
                    const dt = {ReceiverName:'Steph',ReceivingNote:'Test',deliveryAt:this.currentDateTime}
                    ShipmentServices.deliveryCreate(this.schId, dt)
                      .then((response) => {
                        this.success('Submitted successfully')
                        this.$emit('onCreate', response)
                      })

                    this.goto('/hospital/patients')
                    this.success('Collection step has been completed')
                  })
                
              }
            )
          }else{
            this.goto('/hospital/patients')
            this.success('Collection step has been completed')
          }
          }
        )
    },
    handleSignatureOk() {
      this.visibleSignature = false
      this.collection()
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
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
