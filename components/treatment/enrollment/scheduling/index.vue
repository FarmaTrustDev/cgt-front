<template>
  <div>
    <a-spin :spinning="loading">
      <a-form :form="form" layout="horizontal" @submit="onSubmit">
        <Detail v-if="isScheduled" :entity="entity" />
        <span v-else>
          <Form :form="form" :treatment="treatment" />
        </span>
      </a-form>
    </a-spin>
  </div>
</template>
<script>
import Form from '~/components/treatment/enrollment/scheduling/Form'
import Detail from '~/components/treatment/enrollment/scheduling/Detail'
import withCrud from '~/mixins/with-crud'
import SchedulingServices from '~/services/API/SchedulingServices'
import { isEmpty } from '~/services/Utilities'

export default {
  components: { Form, Detail },
  mixins: [withCrud],
  props: {
    treatment: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, {
        name: 'TreatmentSchedulingForm',
      }),
      apiService: SchedulingServices,
      fetchIdFromParams: false,
      entity: {},
      isScheduled: false,
    }
  },
  mounted() {
    this.validateIsCreated()
  },
  methods: {
    validateIsCreated() {
      if (
        !isEmpty(this.treatment) &&
        this.treatment.id &&
        this.treatment.isSchedule
      ) {
        this.fetchScheduling(this.treatment.id)
      }
    },
    fetchScheduling(id) {
      SchedulingServices.getByTreatment(id).then((response) => {
        const entity = response.data
        if (!isEmpty(entity)) {
          this.isScheduled = true
          this.entity = entity
        }
      })
    },
    afterCreate(values) {
      this.gotoPatient()
    },
    afterUpdate(values) {
      this.gotoPatient()
    },
    gotoPatient() {
      this.goto('/hospital/patients')
    },
  },
}
</script>
