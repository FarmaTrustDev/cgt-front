<template>
  <div>
    <a-alert
      v-if="screenings <= 0"
      type="info"
      :message="translation.NoScree_3_475"
    ></a-alert>

    <a-table
      v-else
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
            :checked-children="translation.yes_1_654"
            :un-checked-children="translation.no_1_656"
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
            placeholder="Note"
            @blur="(e) => handleInput(row.id, e)"
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
export default {
  props: {
    screenings: {
      type: Array,
      required: true,
      default: () => [],
    },
    form: {
      required: true,
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      columns: [
        {
          title: `${this.$store.getters.getTranslation.Detai_1_346}`,
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
          width: '40%',
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          dataIndex: 'gender',
          scopedSlots: { customRender: 'action' },
        },
        {
          title: `${this.$store.getters.getTranslation.Notes_1_350}`,
          dataIndex: 'notes',
          scopedSlots: { customRender: 'notes' },
        },
      ],
      notesRequired: {},
      filledData: 0,
      noteItem: [],
      checkValidationList: [],
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.filledData = 0
  },
  methods: {
    pushListArray(value, rowId) {
      const notesValue = this.form.getFieldValue(
        `screenings[id-${rowId}][notes]`
      )

      const checkListValidation = this.checkValidationList
      checkListValidation[rowId] = {
        value,
        notes: notesValue,
        id: rowId,
      }

      this.checkValidationList = checkListValidation
      this.sendData(this.checkValidationList)
    },

    handleCheck(value, rowId) {
      this.pushListArray(value, rowId)
    },
    handleInput(rowId, e) {
      this.pushListArray(e.target.value, rowId)
    },
    sendData(totVals) {
      this.$emit('getFilledDatas', totVals)
    },
  },
}
</script>
