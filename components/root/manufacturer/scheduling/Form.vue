<template>
  <div>
    <a-skeleton :loading="loading">
      <a-form :form="form" :layout="formLayout" @submit="onSubmit">
        <LookupsTreatmentType />
        <a-form-item label="Description">
          <a-textarea
            v-decorator="[
              'description',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your Category Name!',
                  },
                ],
                initialValue: entity.description,
              },
            ]"
            size="large"
            placeholder="Insert Category Name"
          />
        </a-form-item>
        <a-form-item label="Duration">
          <a-input-number
            v-decorator="[
              'duration',
              {
                initialValue: entity.duration,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Address!',
                  },
                ],
              },
            ]"
            size="large"
            class="default-select w-100"
            type="number"
            placeholder="Please input your Address"
          >
            <a-icon slot="prefix" type="calendar"
          /></a-input-number>
        </a-form-item>
        <a-form-item label="Price">
          <a-input-number
            v-decorator="[
              'price',
              {
                initialValue: entity.price,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Address!',
                  },
                ],
              },
            ]"
            size="large"
            type="number"
            class="default-select w-100"
            placeholder="Please input your Address"
          >
            <span slot="prefix">$</span>
          </a-input-number>
        </a-form-item>
        <FormActionButton :loading="btnLoading" :is-created="isCreated">
          <FormDeleteButton v-if="isCreated" slot="extra" @delete="onDelete" />
        </FormActionButton>
      </a-form>
    </a-skeleton>
  </div>
</template>
<script>
import withCrud from '~/mixins/with-crud'
import ManufacturerTreatmentServices from '~/services/API/ManufacturerTreatmentServices'
import nullHelper from '~/mixins/null-helpers'
export default {
  mixins: [withCrud, nullHelper],
  props: {
    // templateId: {
    //   required: true,
    //   type: Number,
    // },
  },
  data() {
    return {
      entityId: null,
      loading: false,
      entity: {},
      form: this.$form.createForm(this, {
        name: 'screeningCategory',
      }),
      formLayout: 'vertical',
      apiService: ManufacturerTreatmentServices,
      isCreated: false,
        gotoLink: '/manufacturer/schedules',
    }
  },
  mounted() {},
  methods: {
    afterCreate(response) {
      //   this.$emit('upsert', response)
    },
    afterUpdate(response) {},
  },
}
</script>
