<template>
  <div>
    <a-alert
      v-if="screenings <= 0"
      type="info"
      message="No Screenings available"
    ></a-alert>

    <a-table
      :columns="columns"
      :row-key="(record) => record.globalId"
      :data-source="screenings"
      :pagination="false"
      :loading="loading"
      class="square-table"
    >
      <template slot="name" slot-scope="name">
        {{ name }}
      </template>
      <template slot="action" slot-scope="name, row">
        <!-- {{ row }} -->
        <a-form-item>
          <a-switch
            v-decorator="[
              `screenings[id-${row.id}][isCheck]`,
              {
                rules: [
                  {
                    required: true,
                    message: 'Check is required!',
                  },
                ],
                valuePropName: 'checked',
              },
            ]"
            size="large"
            checked-children="Yes"
            un-checked-children="No"
          />
        </a-form-item>
      </template>
      <template slot="notes" slot-scope="name, row">
        <a-form-item>
          <a-input
            v-decorator="[
              `screenings[id-${row.id}][notes]`,
              {
                initialValue: null,
              },
            ]"
            placeholder="Note:"
          />
          <a-input
            v-decorator="[
              `screenings[id-${row.id}][screeningId]`,
              {
                initialValue: row.id,
              },
            ]"
            type="hidden"
          />
          <a-input
            v-decorator="[
              `screenings[id-${row.id}][categoryId]`,
              {
                initialValue: row.categoryId,
              },
            ]"
            type="hidden"
          />
          <a-input
            v-decorator="[
              `screenings[id-${row.id}][name]`,
              {
                initialValue: row.name,
              },
            ]"
            type="hidden"
          />
           <a-input
            v-decorator="[
              `screenings[id-${row.id}][manufacturer_id]`,
              {
                initialValue: row.manufacturerId,
              },
            ]"
            type="hidden"
          />
        </a-form-item>
      </template>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: 'Detail',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' },
    width: '40%',
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
      loading: false,
      columns,
    }
  },
  mounted() {},
  methods: {},
}
</script>
