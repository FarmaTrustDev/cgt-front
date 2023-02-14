<template>
    <div>
        <a-row>
        <a-col :span="12">
          <a-form-item
            label="Tag ID: *"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'tagId',
                {
                  initialValue: entity.blyottTagId,
                  rules: [
                    {
                      required: true,
                      message: 'Please input Tag ID',
                    },
                    {
                      message: 'Please enter a valid MAC'
                    }
                  ],
                },
              ]"
              placeholder="Tag MAC"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="NFCID:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'nfcId',
                {
                  initialValue: entity.nfcId,
                  rules: [
                    {
                      message: 'Please input NFC ID',
                    },
                    {
                      message: 'Please enter a valid NFC'
                    }
                  ],
                },
              ]"
              placeholder="NFC ID"
            />
            <a-input
              v-decorator="[
                'cgtTagId',
                {
                  initialValue: entity.id,
                },
              ]"
              type="hidden"
            />  
          </a-form-item>
        </a-col>
        <a-col :span="12">
        <a-form-item
          label="Location Name:*"
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
            label="Tag Hardware Model: *"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-select
              v-decorator="[
                'hardwareModelId',
                {
                  initialValue: entity.tagHardwareModelId,
                  rules: [
                    {
                      required: true,
                      message: 'Please select Hardware Model',
                    },
                  ],
                },
              ]"
              :show-search="true"
              placeholder="Hardware Model"
              style="width: 100%"
              size="large"
              class="default-select"
            >
              <a-select-option v-for="locator in tagHardware" :key="locator.HardwareId">
                {{ locator.HardwareModel }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!-- <a-col :span="12">
          <a-form-item
            label="Assign Asset:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-select
              v-decorator="[
                'assetId',
                {
                  initialValue: entity.assetId,
                },
              ]"
              :show-search="true"
              placeholder="Asset"
              style="width: 100%"
              size="large"
              class="default-select"
            >
              <a-select-option v-for="asset in assetData" :key="asset.id">
                {{ asset.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col> -->
        </a-row>
    </div>
  </template>
  
  <script>
  import TagServices from '~/services/API/TagServices'
  import LocationServices from '~/services/API/LocationServices'
  import TagHardwareServices from '~/services/API/TagHardwareServices'
  import AssetServices from '~/services/API/AssetServices'
  import { isEmpty } from '~/services/Helpers'
  import nullHelper from '~/mixins/null-helpers'
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
        apiService: TagServices,
        newSelected: false,
        locationData:[],
        tagHardware:[],
        userData:[],
        assetData:[],
      }
    },
    mounted() {
      this.fetchLocation()
      this.fetchTagHardware()
      this.fetchAsset()
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
      fetchTagHardware(){
        TagHardwareServices.getAllTagHardware()
          .then((response) => {
              this.tagHardware = response
              console.log(this.tagHardware)
          })
          .catch((e) => {
          if (!isEmpty(e.response)) {
            const token=localStorage.getItem('blyott_refresh_token')
            AuthServices.blyottAccessToken({username:'',refreshToken:token})
            .then((response)=>{
              setBlyottAccessToken(response.Token)
              setBlyottRefreshToken(response.RefreshToken)
            }).then(()=>{
              TagHardwareServices.getAllTagHardware().then((response) => {
              this.tagHardware = response
              console.log(this.tagHardware)
              })
            })
          }
        })
      },       
      fetchAsset(){
        AssetServices.fetchAssetsFromCGTBlyott()
          .then((response) => {
              this.assetData = response.data.data
              console.log(this.assetData)
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
  