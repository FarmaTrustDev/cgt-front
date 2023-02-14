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
import LocationServices from '~/services/API/LocationServices'
import FormFields from '~/components/blyott/location/FormField'
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
        name: 'locationCreate',
      }),
      gotoLink: '/blyott/location',
      apiService: LocationServices,
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
    upsert(values, locationCode, locationId) {
      if (this.isFunction(this.beforeUpsert)) {
        this.beforeUpsert(values)
      }
      if (this.isCreated) {
        return this.update(values, locationCode)
      }
      return this.create(values, locationCode)
    },
    update(values, locationCode) {
      console.log(values)
      // this.btnLoading = true
      this.apiService
        .updateBlyott(values)
        .then((response) => {
          this.success(response.message)
          this.apiService.getAllLocations({
          Page: 1, 
          PageSize: 25, 
          GlobalSearch: "", 
          SortBy: "LocationName", 
          SortOrder: "Asc", 
          Filters: [
            {
              FilterBy:"LocationCode",
              FilterContent:[locationCode]
            }
          ]
        })
        .then((response)=>{
            const data=response.Items[0]
            console.log(data)
            this.apiService.update(data).then((response)=>{
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
    create(values, locationCode) {
      this.btnLoading = true
      this.loading = true
      this.apiService
        .createBlyott(values)
        .then((response) => {
          this.success(response.message)
          this.apiService.getAllLocations({
          Page: 1, 
          PageSize: 25, 
          GlobalSearch: "", 
          SortBy: "LocationName", 
          SortOrder: "Asc", 
          Filters: [
            {
              FilterBy:"LocationCode",
              FilterContent:[locationCode]
            }
          ]
        })
        .then((response)=>{
            const data=response.Items[0]
            console.log(data)
            this.apiService.create(data).then((response)=>{
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
            const locCode=isEmpty(values.locationCode) ? Math.ceil(Math.random()*10000000) : values.locationCode
            const data = JSON.stringify({
                LocationName:values.locationName,
                LocationCode: locCode,
                LocationType:0,
                Building:values.building,
                Floor:values.floor,
                RoomCategory:values.roomCategory,
                LocationId: values.locationId,
                Id:values.locationId
            })
          this.upsert(data,locCode,values.locationId)
        } else {
          this.loading = false
        }
      })
    },
  },
}
</script>
