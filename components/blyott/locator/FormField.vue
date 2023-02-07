<template>
  <div>
      <a-row>
      <a-col :span="12">
        <a-form-item
          label="Locator Name: *"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'locatorName',
              {
                initialValue: entity.name,
                rules: [
                  {
                    required: true,
                    message: 'Please input locator name',
                  },
                  {
                    message: 'Please enter a locator name'
                  }
                ],
              },
            ]"
            placeholder="Locator Name"
          /> </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Locator MAC: *"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'locatorCode',
              {
                initialValue: entity.code,
                rules: [
                  {
                    required: true,
                    message: 'Please input locator MAC',
                  },
                  {
                    message: 'Please enter a valid MAC'
                  }
                ],
              },
            ]"
            placeholder="Locator MAC"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Location Name: *"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-select
            v-decorator="[
              'locationId',
              {
                initialValue: entity.locationId,
                rules: [
                  {
                    required: true,
                    message: 'Please select location',
                  },
                ],
              },
            ]"
            :show-search="true"
            placeholder="Location"
            style="width: 100%"
            size="large"
            class="default-select"
          >
            <a-select-option v-for="location in locationData" :key="location.id">
              {{ location.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Locator Hardware Model: *"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-select
            v-decorator="[
              'hardwareModelId',
              {
                initialValue: entity.locatorHardwareModelId,
                rules: [
                  {
                    required: true,
                    message: 'Please select Hardware Model',
                  },
                ],
              },
            ]"
            :show-search="true"
            placeholder="Hardware Locator"
            style="width: 100%"
            size="large"
            class="default-select"
          >
            <a-select-option v-for="locator in locatorHardware" :key="locator.HardwareId">
              {{ locator.HardwareModel }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      </a-row>
  </div>
</template>

<script>
import LocatorServices from '~/services/API/LocatorServices'
import LocationServices from '~/services/API/LocationServices'
import LocatorHardwareServices from '~/services/API/LocatorHardwareServices'
import nullHelper from '~/mixins/null-helpers'
import { isEmpty } from '~/services/Helpers'
import AuthServices from '~/services/API/AuthServices'
import { setBlyottAccessToken, setBlyottRefreshToken } from '~/services/Auth'  
export default {
  mixins: [nullHelper],
  props: {
    isCreated: {
      type: Boolean,
      default: false,
    },
    entity: {
      type: Object,
      default: () => ({}),
    },
    form: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      entityId: null,
      loading: false,
      formLayout: 'vertical',
      apiService: LocatorServices,
      newSelected: false,
      locationData:[],
      locatorHardware:[],
      userData:[],
    }
  },
  mounted() {
    this.fetchLocation()
    this.fetchLocatorHardware()
  },  
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
    users() {
      return this.$store.getters.getUser
    },
  },
  methods: {
    fetch(id) {
      this.loading = true
      this.apiService
        .getById(id)
        .then((response) => {
          this.userData = response.data
        })
        .finally(() => (this.loading = false))
    },
    fetchLocation(){
      LocationServices.fetchLocationsFromCGTBlyott()
        .then((response) => {
            this.locationData = response.data.data
            console.log(this.locationData)
        })
    },
    fetchLocatorHardware(){
      LocatorHardwareServices.getAllLocatorHardware()
        .then((response) => {
            this.locatorHardware = response
            console.log(this.locatorHardware)
        })
        .catch((e) => {
          if (!isEmpty(e.response)) {
            const token=localStorage.getItem('blyott_refresh_token')
            AuthServices.blyottAccessToken({username:'',refreshToken:token})
            .then((response)=>{
              setBlyottAccessToken(response.Token)
              setBlyottRefreshToken(response.RefreshToken)
            }).then(()=>{
              LocatorHardwareServices.getAllLocatorHardware().then((response) => {
                this.locatorHardware = response
                console.log(this.tagHardware)
              })
            })
          }
        })
    },       
    searchCountries(name, b) {
      this.fetchCountries({ name })
    },
    searchRoles(name, b) {
      this.fetchRoles({ name })
    },
  },
}
</script>
