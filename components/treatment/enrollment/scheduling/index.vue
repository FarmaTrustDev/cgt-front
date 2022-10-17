<template>
  <div>
    <a-spin :spinning="loading">
      <a-form :form="form" layout="horizontal" @submit="onSubmit">
          <Form v-if="!isScheduled" :form="form" :treatment="treatment" :rejection="rejection" />
        <Detail v-else  :entity="entity" />
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
    rejection: {
      type: Array,
      default: () => [],
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
      loading: false
    }
  },
  mounted() {
    this.validateIsCreated()
  },
  methods: {
    validateIsCreated() {
      this.loading = true
      if (
        !isEmpty(this.treatment) &&
        this.treatment.id &&
        this.treatment.isSchedule
      ) {
        this.fetchScheduling(this.treatment.id)
      } else {
       // this.checkCreated()
      }
      this.loading = false
    },
    afterFetch() {
      if (this.treatment.isSchedule) {
        this.fetchScheduling(this.treatment.id)
      }

      // this.validateIsCreated()
    },
    fetchScheduling(id) {
      SchedulingServices.getByTreatment(id).then((response) => {
        const entity = response.data
        if (!isEmpty(entity)) {
          this.entity = entity
          this.isScheduled = true
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
