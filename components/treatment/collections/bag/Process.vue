<template>
  <div>
    <a-form :form="form" layout="horizontal">
      <a-table
        :columns="columns"
        :row-key="(record) => record.id"
        :data-source="collections"
        :pagination="false"
        :loading="loading"
        class="square-table"
      >
        <template slot="collected" slot-scope="name, row">
          <!-- {{ row }} -->
          <a-form-item>
            <a-switch
              v-decorator="[
                `collection[id-${row.id}][collect]`,
                {
                  initialValue: false,
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
                `collection[id-${row.id}][notes]`,
                {
                  initialValue: null,
                },
              ]"
              placeholder="Note:"
            />
            <a-input
              v-decorator="[
                `collection[id-${row.id}][id]`,
                {
                  initialValue: row.id,
                },
              ]"
              type="hidden"
            />
          </a-form-item>
        </template>
        <template slot="action" slot-scope="name, row">
          <a-button
            shape="round"
            icon="sync"
            @click="handleCollectionSubmit(row)"
          />
        </template>
      </a-table>
    </a-form>
  </div>
</template>
<script>
const columns = [
  {
    title: 'Details',
    dataIndex: 'name',
    width: '50%',
  },
  {
    title: 'Checked',
    dataIndex: 'collected',
    scopedSlots: { customRender: 'collected' },
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
    scopedSlots: { customRender: 'notes' },
  },
  {
    title: 'Action',
    scopedSlots: { customRender: 'action' },
  },
]
export default {
  props: { collections: { required: true, type: Array } },
  data() {
    return {
      columns,
      loading: false,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'bagCollectionProcess',
      }),
    }
  },
  methods: {
    handleCollectionSubmit(row) {
      const fields = this.form.getFieldsValue()
      console.log(row, fields)
    },
  },
}
</script>
