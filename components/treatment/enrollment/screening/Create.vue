<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <LookupsTreatmentType class="slots-main" :active="true" @onChange="onTreatmentSelect" />
      <a-alert v-if="message" type="info" :message="translation.Selecthe_8_476">
      </a-alert>
      <a-skeleton :loading="loading">
        <span v-if="categories">
          <CategoryTabs :form="form" :categories="categories" />
          <!-- <a-button type="primary" class="w-100 btn-complete-category">Complete screening results for {CATEGORYNAME} group</a-button> -->
          <FormActionButton
            :text="translation.SaveScree_4_468"
            :disabled="isCreated"
            :loading="loading"
            class="mt-15"
          />
        </span>
      </a-skeleton>
    </a-form>
    <a-modal 
      :visible="visibleSignature"
      :footer="null"
      @cancel="handleOk()"
      @ok="handleOk()"
    >
    <Signature @handleSignatureOk="handleSignatureOk" @handleSignatureCancel="handleSignatureCancel"/>
    </a-modal>
    <a-modal
      :visible="showMessage"
      :ok-text="translation.Ok_1_663"
      :footer="null"
      
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
        <h3>{{ translation.Pleasaccep_8_567 }}</h3>
        <footer>
          <a-button
            class="ant-btn ant-btn-primary"
            style="padding: 5px 50px"
            @click="handleOkErrorShow()"
            >Ok</a-button
          >
        </footer>
      </center>
    </a-modal>
  </div>
</template>
<script>
// import TreatmentServices from '~/services/API/TreatmentServices'
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import notifications from '~/mixins/notifications'
import ScreeningCategoryServices from '~/services/API/ScreeningCategoryServices'
import TreatmentScreeningServices from '~/services/API/TreatmentScreeningServices'
import CategoryTabs from '~/components/treatment/enrollment/screening/Tabs'
import imagesHelper from '~/mixins/images-helper'
import Signature from '~/components/signature'

export default {
  components: { CategoryTabs, Signature },
  mixins: [notifications, routeHelpers, nullHelper, imagesHelper],
  props: {
    treatment: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      patientId: null,
      message: 'true',
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'patientEnrollment',
      }),
      loading: false,
      categories: null,
      isCreated: false,
      showMessage: false,
      screeningData:{},
      visibleSignature:false,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {},
  methods: {
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          values.screeningStatus = true
          this.screeningData=values
          this.visibleSignature=true
          // this.create(values)
        } else {
          this.confirm('Complete the patient screenings first!')
          this.loading = false
        }
      })
    },
    handleSignatureOk() {
      this.visibleSignature = false
      this.create(this.screeningData)
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
    },
    onTreatmentSelect(treatmentTypeId) {
      this.loading = true
      ScreeningCategoryServices.getByTreatmentTypeId(treatmentTypeId)
        .then((response) => {
          for (const dt in response.data) {
            if (response.data[dt].screeningTemplateHospitalStatus === false) {
              this.showMessage = true
            }
          }
          if (this.showMessage === false) {
            this.categories = response.data
            this.message = false
          }
        })
        .finally(() => (this.loading = false))
        .catch(this.error, (this.categories = null), (this.message = 'true'))
    },
    create(values) {
      TreatmentScreeningServices.create({
        treatmentId: this.treatment.globalId,
        ...values,
      })
        .then((response) => {
          this.success(response.message)
          this.$emit('getTreatment', response.data)
          this.$emit('getNextTab', 'Scheduling')
          this.isCreated = true
        })
        .catch(this.error)
    },
    handleOk() {
      this.handleSignatureCancel()
    },
    handleOkErrorShow() {
      this.showMessage = false
    },
  },
}
</script>
