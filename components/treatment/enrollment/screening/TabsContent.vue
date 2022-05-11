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
                rules: [],
                valuePropName: 'checked',
              },
            ]"
            :data-rowId="row.id"
            size="large"
            checked-children="Yes"
            un-checked-children="No"
            @change="(value) => handleCheck(value, row.id)"
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
                rules: [
                  {
                    required: !notesRequired[row.id],
                    message: 'Please input your Notes',
                  },
                ],
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
      notesRequired: {},
      filledData:0,
    }
  },
  mounted() {},
  methods: {
    handleCheck(value, rowId) {
      const notesRequired = this.notesRequired
      notesRequired[rowId] = value
      this.notesRequired = notesRequired
      if(value===true){
        this.filledData=this.filledData+1
      }else{
        this.filledData=this.filledData-1
      }
      if(this.filledData<0){
        this.filledData=0
      }
      this.sendData(this.filledData)
    },
    sendData(totVals){
      // alert(totVals)
      this.$emit('getFilledDatas',totVals);
    }
  },
}
</script>
