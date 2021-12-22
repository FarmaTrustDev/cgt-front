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
    >
      <template slot="name" slot-scope="name">
        {{ name }}
      </template>
      <template slot="action" slot-scope="name, row">
        <!-- {{ row }} -->
        <a-form-item>
          <a-switch
            v-decorator="[
              `screening['id-'${row.id}][active]`,
              {
                rules: [
                  {
                    required: true,
                    message: 'Please select your Organization Type!',
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
              `screening['id-'${row.id}][notes]`,
              {
                initialValue: null,
              },
            ]"
            placeholder="input notes text"
          />
          <a-input
            v-decorator="[
              `screening['id-'${row.id}][id]`,
              {
                initialValue: row.id,
              },
            ]"
            type="hidden"
          />
          <a-input
            v-decorator="[
              `screening['id-'${row.id}][categoryId]`,
              {
                initialValue: row.categoryId,
              },
            ]"
            type="hidden"
          />
          <a-input
            v-decorator="[
              `screening['id-'${row.id}][name]`,
              {
                initialValue: row.name,
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
