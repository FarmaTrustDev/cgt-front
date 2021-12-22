<template>
  <div>
    <a-alert
      v-if="screenings <= 0"
      type="info"
      message="No Screenings available"
    ></a-alert>
    <!-- <a-list v-else item-layout="horizontal" :data-source="screenings">
      <a-list-item slot="renderItem" slot-scope="item"
        >{{ item.name }}
        <a slot="actions">
          <a-dropdown>
            <a-icon type="more" />
            <a-menu slot="overlay">
              <a-menu-item key="1"> <a-icon type="edit" />Edit </a-menu-item>
              <a-menu-item key="2">
                <a-icon type="delete" />Delete
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a>
      </a-list-item>
    </a-list> -->
    <a-table
      :columns="columns"
      :row-key="(record) => record.globalId"
      :data-source="screenings"
      :pagination="false"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="name" slot-scope="name">
        {{ name }}
      </template>
    </a-table>
  </div>
</template>
<script>
const data = []
const columns = [
  {
    title: 'Detail',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Action',
    dataIndex: 'gender',
    scopedSlots: { customRender: 'action' },
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
    scopedSlots: { customRender: 'notes' },
  },
]
export default {
  props: {
    screenings: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      data,
      columns,
    }
  },
  mounted() {},
  methods: {},
}
</script>
