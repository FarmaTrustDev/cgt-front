<template>
  <div>
    <!-- <a-spin :spinning="loading"> -->
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <FormFields :is-created="isCreated" :patient="patient" />
      <a-form-item class="pr-2 mt-15">
        <FormActionButton
          :is-created="isCreated"
          :loading="loading"
          :text="translation.SavePatie_4_665"
        />
        <!-- <a-button type="primary" html-type="submit">Submit</a-button> -->
      </a-form-item>
    </a-form>
    <a-modal
      :visible="visibleModal"
      ok-text="OK"
      :footer="null"
      class="error-model"
      @cancel="handleOk()"
      @ok="handleOk()"
    >
      <center>
        <p style="margin: 0">
          <img
            :src="getImageUrl('Icons/cross-letter.jpg')"
            width="40%"
            height="40%"
          />
        </p>
        <h3>{{translation.Thereare_10_522}}</h3>
        <!-- <p>There are some errors in your submission. Please correct them.</p> -->
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
    <!-- </a-spin> -->
  </div>
</template>
<script>
import FormFields from '~/components/patient/enrollment/FormFields'
import notifications from '~/mixins/notifications'
import PatientServices from '~/services/API/PatientServices'
import TreatmentServices from '~/services/API/TreatmentServices'
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import imagesHelper from '~/mixins/images-helper'
export default {
  components: { FormFields },
  mixins: [notifications, routeHelpers, nullHelper, imagesHelper],
  data() {
    return {
      loading: false,
      successResponse: '',
      visibleModal: false,
      formLayout: 'vertical',
      patient: {},
      entityId: null,
      isCreated: false,
      treatmentData: {},
      form: this.$form.createForm(this, {
        name: 'patientEnrollment',
      }),
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.checkCreated()
  },
  updated() {},
  methods: {
    checkCreated() {
      const patientId = this.$route.params.id

      if (this.isGuid(patientId)) {
        this.entityId = patientId

        this.fetch(patientId)
      }
    },
    fetch(id) {
      this.loading = true
      PatientServices.getById(id)
        .then((response) => {
          this.patient = response.data
          this.isCreated = true
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.upsert(values)
        } else {
          this.visibleModal = true
          this.loading = false
        }
      })
    },
    handleOk() {
      this.visibleModal = false
    },
    upsert(values) {
      this.loading = true
      if (this.isCreated) {
        return this.update(values)
      }
      return this.create(values)
    },
    update(values) {
      PatientServices.update(this.entityId, values)
        .then((response) => {
          this.success(response.message)
          // this.goto(`/hospital/patients/${response.data.globalId}?view=Consent`)
          this.$emit('getNextTab', 'Consent')
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
    create(values) {
      PatientServices.create(values)
        .then((response) => {
          if (response.data.globalId != null) {
            const formData = new FormData()
            formData.append('patientId', response.data.globalId)
            TreatmentServices.create(formData)
              .then((res) => {
                this.sendData(res.data.globalId)
                this.goto(
                  `/hospital/patients/${response.data.globalId}?view=Consent`,
                  { treatmentId: res.data.globalId }
                )
              })
              .catch(this.error)
              .finally(() => (this.loading = false))
          }
          this.success(response.message)

          this.$emit('getNextTab', 'Consent')
        })
        .catch(this.error)
        .finally(() => (this.loading = false))
    },
    sendData(data) {
      this.$emit('getTreatment', data)
    },
  },
}
</script>
