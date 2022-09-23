<template>
  <div>
    <!-- <a-skeleton :loading="loading"> -->
      <a-form :form="form" :layout="formLayout" @submit="onSubmit">
        <LookupsTreatmentType
          v-if="isCreated ? isCreated : !isCreated"
          :disabled="isCreated"
          :treatment-type-id="entity.treatmentTypeId"
          :treatment-type-name="entity.treatmentTypeName"
          :fetchAll="true"
        />
        <a-form-item :label="translation.Descr_1_69">
          <a-textarea
            v-decorator="[
              'description',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input Description!',
                  },
                ],
                initialValue: entity.description,
              },
            ]"
            size="large"
            placeholder="Insert Description"
          />
        </a-form-item>
        <a-row>
        <a-col :span="11">
        <a-form-item :label="translation.Durat_1_71">
          <a-input-number
            v-decorator="[
              'duration',
              {
                initialValue: entity.duration,
                rules: [
                  {
                    required: true,
                    message: 'Please Enter Duration',
                  },
                ],
              },
            ]"
            
            class="default-select border-none w-100 float-left"
            type="number"
            placeholder="Please Enter Duration"
          >
            <a-icon slot="prefix" type="calendar"
          /></a-input-number>
        </a-form-item>
        </a-col>
        <a-col :span="2"></a-col>
        <a-col :span="11">
        <a-form-item :label="translation.Price_1_73">
          <a-input-number
            v-decorator="[
              'price',
              {
                initialValue: entity.price,
                rules: [
                  {
                    required: true,
                    message: 'Please Enter Price',
                  },
                ],
              },
            ]"
            size="large"
            type="number"
            class="default-select border-none w-100 float-right"
            placeholder="Please Enter Price"
          >
            <span slot="prefix">$</span>
          </a-input-number>
        </a-form-item>
        </a-col>
        </a-row>
        <FormActionButton :text="translation['Next_1_478']" :loading="btnLoading" :is-created="isCreated">
        </FormActionButton>
      </a-form>
    <!-- </a-skeleton> -->
  </div>
</template>
<script>
// import withCrud from '~/mixins/with-crud'
import ManufacturerTreatmentServices from '~/services/API/ManufacturerTreatmentServices'
import nullHelper from '~/mixins/null-helpers'
import notifications from '~/mixins/notifications'
export default {
  mixins: [
    // withCrud,
    notifications,
    nullHelper],
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
      manufacturerTreatment: {},
      activate:true,
      btnLoading: false
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.checkCreated()
  },
  methods: {
    async checkCreated() {
      const entityId = this.$route.params.id
      if (this.isGuid(entityId)) {
        this.entityId = entityId
        this.isCreated = true
        await this.fetch(entityId)
      }
    },
    async fetch(id) {
      this.loading = true
      await this.apiService
        .getById(id)
        .then((response) => {
          this.entity = response.data
          if (this.isFunction(this.getEntity)) {
            this.getEntity(response)
          }
          if (this.isFunction(this.afterFetch)) {
            this.afterFetch(response)
          }
        })
        .finally(() => (this.loading = false))
    },
    onSubmit(e)
    {
      e.preventDefault()
      this.form.validateFields((err, values)=>
      {
        if (!err) {
          this.upsert(values)
        } else {
          this.visibleModal = true
          this.loading = false
        }
      }
      )
    },
    upsert(values) {
      if (this.isFunction(this.beforeUpsert)) {
        this.beforeUpsert(values)
      }
      if (this.isCreated) {
        return this.update(values)
      }
      return this.create(values)
    },
    update(values) {
      this.btnLoading = true
      this.apiService
        .update(this.entityId, values)
        .then((response) => {
          this.success(response.message)
          // if (!this.isEmpty(this.gotoLink)) {
          //   this.goto(`${this.gotoLink}`)
          // }
          if (this.isFunction(this.afterUpdate)) {
            this.afterUpdate(response)
            this.btnLoading = false
            this.loading = false
          }
        })
        .catch(this.error)
        .finally(() => {
          this.loading = false
        })
    },
        create(values) {
      this.btnLoading = true
      this.loading = true
      this.apiService
        .create(values)
        .then((response) => {
          this.success(response.message)
          // if (!this.isEmpty(this.gotoLink)) {
          //   this.goto(`${this.gotoLink}/${response.data.globalId}`)
          // }
          if (this.isFunction(this.afterCreate)) {
            this.afterCreate(response)
            this.btnLoading = false
            this.loading = false
          }
        })
        .catch(this.error)
        .finally(() => {
          this.btnLoading = false
          this.loading = false
        })
    },
    afterCreate(response) {
      this.$emit('getNextTab', 2)
      //   this.$emit('upsert', response)
    },
    afterUpdate(response) {
      this.$emit('getNextTab', 2)
    },
    getEntity(entity) {
      this.$emit('getEntity', entity.data)
      // this.manufacturerTreatment = entity.data
    },
  },
}
</script>
