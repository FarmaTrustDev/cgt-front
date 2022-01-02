<template>
  <div>
    <standardTable :columns="column" :api-service="PatientServices">
    </standardTable>
  </div>
</template>

<script>
import standardTable from '~/components/common/StandardTable'
import PatientServices from '~/services/API/PatientServices'
const column = [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
    width: '90%',
  },
  {
    title: 'Action',
    scopedSlots: { customRender: 'upsertDropdown' },
  },
]
export default {
  components: { standardTable },
  data() {
    return {
      column,
      PatientServices,
      data: [],
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'hospitalCollection',
      }),
      gotoLink: '/manufacturer/administration/collection/hospital',
    }
  },
  mounted() {},
  methods: {},
}
</script>
