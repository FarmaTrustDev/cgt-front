<template>
  <div>
    <!-- {{ collections }} -->
    <a-table :columns="columns" :data-source="collections"></a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: 'Details',
    dataIndex: 'name',
  },
  {
    title: 'Checked',
    dataIndex: 'name',
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
  },
  {
    title: 'Action',
    dataIndex: 'name',
  },
]
export default {
  props: { collections: { required: true, type: Array } },
  data() {
    return { columns }
  },
}
</script>
