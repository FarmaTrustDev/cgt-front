<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <LookupsTreatmentType :active="true" @onChange="onTreatmentSelect" />
      <a-alert v-if="message" type="info" :message="translation.Selecthe_8_476">
      </a-alert>
      <a-skeleton :loading="loading">
        <span v-if="categories">
          <CategoryTabs :categories="categories" />
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
      :visible="showMessage"
      ok-text="Ok"
      :footer="null"
      @cancel="handleOk()"
      @ok="handleOk()"
    >
      <center>
        <p>
          <img
            :src="getImageUrl('Icons/cross-letter.jpg')"
            width="50%"
            height="50%"
          />
        </p>
        <h3><p>Please accept the new screening questions from manufacturer</p></h3>
        <footer>
          <a-button class="ant-btn ant-btn-primary" @click="handleOk()"
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

export default {
  components: { CategoryTabs },
  mixins: [notifications, routeHelpers, nullHelper,imagesHelper],
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
      showMessage:false,
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
          this.create(values)
        } else {
          this.confirm(
            'Complete the patient screenings first!'
          )
          this.loading = false
        }
        this.loading = false
      })
    },
    onTreatmentSelect(treatmentTypeId) {
      this.loading = true
      ScreeningCategoryServices.getByTreatmentTypeId(treatmentTypeId)
        .then((response) => {
          for(const dt in response.data){
            if(response.data[dt].screeningTemplateHospitalStatus===false){
              this.showMessage=true
            }
          }
          if(this.showMessage===false){
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
      this.showMessage = false
    },
  },
}
</script>
