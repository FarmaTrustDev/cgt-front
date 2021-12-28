<template>
  <div>
    <a-spin :spinning="loading">
      <a-form :form="form" layout="horizontal" @submit="onSubmit">
        <Detail :entity="entity" v-if="isScheduled" />
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
      gotoLink: '/manufacturer/schedules',
      fetchIdFromParams: false,
      entity: {},
      isScheduled: true,
    }
  },
  mounted() {
    this.validateIsCreated()
  },
  methods: {
    validateIsCreated() {
      if (!isEmpty(this.treatment) && this.treatment.id) {
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
  },
}
</script>
