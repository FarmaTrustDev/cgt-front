<template>
  <div>
    <a-card v-if="!isEmpty(scheduling)" :bordered="false" class="logistic-pick-detail mb-25 no-shadow" >
      <div class="card-head grey-card border">
      <th>QrUrl</th>
      <th>Puid</th>
    </div>
      <tr v-for="(bag, index) in scheduling.treatmentBag" :key="index" class="header-body grey-card border mt-5">
        <td><img :src="getImageUrl(bag.qrUrl)" width="65px" /></td>
        <td>{{bag.puid}}</td>
      </tr>
    </a-card>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <a-row>
        <a-col :span="12">
          <a-form-item
            :label="translation['Handlby:_2_384']"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <!-- :placeholder="translation['Handlby:_2_384']" -->
            <a-input
              v-decorator="[
                'senderName',
                {
                  rules: [{ required: true, message: 'Please input handled by' }],
                },
              ]"
              placeholder="Handled by"
            /> </a-form-item
        ></a-col>
        <a-col :span="12">
          <a-form-item
            :label="translation['Colleby:_2_390']"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <!-- :placeholder="translation['Colleby:_2_390']" -->
            <a-input
              v-decorator="[
                'LogisticUserName',
                {
                  rules: [
                    { required: true, message: 'Please input collected by' },
                  ],
                },
              ]"
              placeholder="Collected by"
            /> </a-form-item
        ></a-col>

        <a-col :span="24">
          <a-form-item
            :label="translation['PickuDate:_2_386']"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-date-picker
              v-decorator="[
                'pickupAt',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please select your pickup date',
                    },
                  ],
                },
              ]"
              :format="STANDARD_UK_DATE_FORMAT"
              :disabled-date="disabledDate"
              style="width: 100%"
              size="large"
              :show-time="{ defaultValue: _getTodayMoment() }"
            >
            </a-date-picker> </a-form-item
        ></a-col>

        <a-col :span="24">
          <a-form-item
            :label="translation.PickuLocat_2_792"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-textarea
              v-decorator="[
                'origin',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input pickup location',
                    },
                  ],
                },
              ]"
              :placeholder="translation.PickuLocat_2_792"
            /> </a-form-item
        ></a-col>
        <a-col :span="24">
          <a-form-item>
          <FormActionButton
            :loading="loading"
            :custom-text="translation['Save&_3_453']"
        />
        </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <a-modal 
      :visible="visibleSignature"
      :footer="null"
      >
        <Signature @handleSignatureOk="handleSignatureOk" @handleSignatureCancel="handleSignatureCancel"/>
    </a-modal>
  </div>
</template>
<script>
import {
  _getTodayMoment,
  _disabledPreviousDate,
  // _disablePrevDateFromYesterday
} from '~/services/Helpers/MomentHelpers'
import { STANDARD_UK_DATE_FORMAT } from '~/services/Constant/DateTime'
import ShipmentServices from '~/services/API/ShipmentServices'
import notifications from '~/mixins/notifications'
import imagesHelper from '~/mixins/images-helper'
import Signature from '~/components/signature'
import { isEmpty } from '~/services/Utilities'
export default {
  components: { Signature },
  mixins: [notifications, imagesHelper],
  props: {
    scheduling: {
      default: () => {},
      require: true,
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this, {
        name: 'pickupShipment',
      }),
      formLayout: 'vertical',
      STANDARD_UK_DATE_FORMAT,
      visibleSignature:false,
      pickUpData:{},
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted(){
    if(!isEmpty(this.scheduling))
    {
      console.log('scheduling data of form',this.scheduling)
    }
  },
  methods: {
    isEmpty,
    disabledDate: _disabledPreviousDate,
    onSubmit(e) {
      e.preventDefault()
      this.loading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          this.pickUpData=values
          this.visibleSignature = true
          /* ShipmentServices.pickupCreate(this.scheduling.id, values)
            .then((response) => {
              this.success('Submitted successfully')
              this.$emit('onCreate', response)
            })
            .catch(this.error) */
        }
        else{
          this.loading = false
        }
      })
    },
    handleSignatureOk() {
      this.visibleSignature = false
      this.pickUp()
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
    },
    pickUp(){
      ShipmentServices.pickupCreate(this.scheduling.id, this.pickUpData)
        .then((response) => {
          this.success('Submitted successfully')
          this.$emit('onCreate', response)
        })
        .catch(this.error)
    },
    _getTodayMoment,
  },
}
</script>
