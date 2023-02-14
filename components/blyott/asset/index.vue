<template>
  <div>
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
      <FormFields
        :form="form"
        :entity="userData"
        :is-created="isCreated"
        @cheCreated="checkCreated"
      />
      <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 22 }">
        <FormActionButton
          :is-created="isCreated"
          :loading="loading"
          :custom-text="translation['Save&_3_453']"
        />
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import notifications from '~/mixins/notifications'
import AssetServices from '~/services/API/AssetServices'
import FormFields from '~/components/blyott/asset/FormField'
import { isEmpty } from '~/services/Utilities'

export default {
  components: { FormFields },
  mixins: [notifications, routeHelpers, nullHelper],

  data() {
    return {
      loading: false,
      successResponse: '',
      showError: false,
      userData: {},
      entityId: null,
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'assetCreate',
      }),
      gotoLink: '/blyott/asset',
      apiService: AssetServices,
      isCreated: false,
      file: [],
      activate: true,
      deactivate: true,
    }
  },
  computed: {
    users() {
      return this.$store.getters.getUser
    },
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.checkCreated()
  },
  methods: {
    checkCreated() {
      const entityId = this.$route.params.id
      if (this.isGuid(entityId)) {
        this.entityId = entityId
        this.isCreated = true
        this.fetch(entityId)
      }
    },
    fetch(id) {
      this.loading = true
      this.apiService
        .getById(id)
        .then((response) => {
          this.entity = response.data.data
          this.userData = response.data.data
          if (this.isFunction(this.getEntity)) {
            this.getEntity(response)
          }
        })
        .finally(() => (this.loading = false))
    },
    upsert(values, assetCode, locId) {
      if (this.isFunction(this.beforeUpsert)) {
        this.beforeUpsert(values)
      }
      if (this.isCreated) {
        return this.update(values, assetCode,locId)
      }
      return this.create(values, assetCode,locId)
    },
    update(values, assetCode, locId) {
      this.btnLoading = true
      this.apiService
        .updateBlyott(values)
        .then((response) => {
          this.success(response.message)
          this.apiService.getAllLocations({
          Page: 1, 
          PageSize: 25, 
          GlobalSearch: "", 
          SortBy: "AssetName", 
          SortOrder: "Asc", 
          Filters: [
            {
              FilterBy:"AssetCode",
              FilterContent:[assetCode]
            }
          ]
        })
        .then((response)=>{
            const data=response.Items[0]
            console.log(data)
            data.locationId=locId
            this.apiService.update(data).then((response)=>{
                console.log(response)
            })
        })
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
    create(values, assetCode, locId) {
      this.btnLoading = true
      this.loading = true
      this.apiService
        .createBlyott(values)
        .then((response) => {
          this.success(response.message)
          this.apiService.fetchBlyottAssetByCode(assetCode).then((response)=>{
            response.LocationId=locId
            this.apiService.create(response).then((response)=>{
                this.goto(this.gotoLink)
            })
          })
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
    onSubmit(e) {
      this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
            const assetCode= isEmpty(values.assetCode) ? Math.ceil(Math.random()*10000000) : values.assetCode
            const data = JSON.stringify({
                AssetName:values.assetName,
                AssetCode:assetCode,
                AccessLevels:[278],
                AllUsers:false,
                AssetManufacturer:values.manufacturer,
                AssetModel:values.model,
                AssetOwner:values.owner,
                AssetSupplier:values.supplier,
                AssetSerialNumber:values.supplier,
                TagId:values.tagId,
                Id:values.assetId,
                AssetId:values.assetId,
            })
          this.upsert(data,assetCode, values.locationId)
        } else {
          this.loading = false
        }
      })
    },
  },
}
</script>
