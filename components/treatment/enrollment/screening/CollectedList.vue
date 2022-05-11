<template>
  <span>
    <a-tabs>
      <a-tab-pane
        v-for="category in categories"
        :key="category.id"
        :tab="category.name"
      >
        <standardTable
          :columns="column"
          :dump-data="category.screenings"
          :should-fetch="false"
          :show-pagination="false"
        />
      </a-tab-pane> </a-tabs
  ></span>
</template>
<script>
import standardTable from '~/components/common/StandardTable'
const column = [
  {
    title: 'Details',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
    key: 'notes',
  },
  {
    title: 'Actions',
    dataIndex: 'isCheck',
    key: 'isCheck',
    scopedSlots: { customRender: 'check' },
  },
]
export default {
  components: { standardTable },
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      column,
    }
  },
}
</script>
