<template>
  <div>
    <a-spin :spinning="loading">
      <a-form :form="form" layout="horizontal" @submit="onSubmit">
        <Form :form="form" :treatment="treatment" />
      </a-form>
      <a-list :data-source="datasource" item-layout="horizontal" :bordered="false">
        <template #renderItem="{ notes, createdAt }">
          <a-list-item style="margin-left:2%; margin-right:2%;">
            <div><h3 style="font-weight:bold">{{ notes }}</h3></div>
            <div><h3 style="font-style:italic">{{createdAt}}</h3></div>
          </a-list-item>
      </template>
      </a-list>
      <!-- <a-table
        :columns="columns"
        :data-source="datasource"
        class="rounded-table"
        :pagination="{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50', '100'],
        }"
      >
      </a-table> -->
    </a-spin>
  </div>
</template>
<script>
import Form from '~/components/treatment/enrollment/afterCare/Form'
import withCrud from '~/mixins/with-crud'
import AfterCareServices from '~/services/API/AfterCareServices'
import { isEmpty } from '~/services/Utilities'
const columns = [
  {
    title: 'Notes',
    dataIndex: 'notes',
    key: 'notes',
  },
  {
    title: 'DateTime',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
]
export default {
  components: { Form },
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
        name: 'AfterCareForm',
      }),
      datasource: [],
      columns,
      apiService: AfterCareServices,
      fetchIdFromParams: false,
      entity: {},
      isScheduled: false,
    }
  },
  mounted() {
    this.validateIsCreated()
    this.fetch()
  },
  methods: {
    fetch() {
      AfterCareServices.getById(this.treatment.id)
        .then((response) => {
          this.datasource = response.data
        })
        .finally(() => (this.loading = false))
    },
    validateIsCreated() {
      if (
        !isEmpty(this.treatment) &&
        this.treatment.id &&
        this.treatment.isSchedule
      ) {
        this.fetchAfterCare(this.treatment.id)
      }
    },
    fetchAfterCare(id) {
      AfterCareServices.getByTreatment(id).then((response) => {
        const entity = response.data
        if (!isEmpty(entity)) {
          this.entity = entity
          this.isScheduled = true
        }
      })
    },
    afterCreate(values) {
      this.fetch()
      this.form.resetFields()
      // this.gotoPatient()
    },
    afterUpdate(values) {
      this.fetch()
      this.form.resetFields()
      // this.gotoPatient()
    },
    gotoPatient() {
      this.goto('/hospital/patients/collection/')
    },
  },
}
</script>
