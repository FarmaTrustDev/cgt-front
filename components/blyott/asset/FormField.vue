<template>
  <div>
      <a-row>
      <a-col :span="12">
        <a-form-item
          label="Chemical Name: *"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'assetName',
              {
                initialValue: entity.name,
                rules: [
                  {
                    required: true,
                    message: 'Please input chemical name',
                  },
                  {
                    message: 'Please enter a chemical name'
                  }
                ],
              },
            ]"
            placeholder="Chemical Name"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          label="Chemical Supplier"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'supplier',
              {
                initialValue: entity.assetSupplier,
                rules: [
                  {
                    message: 'Please input Supplier',
                  },
                  {
                    message: 'Please enter a valid Supplier'
                  }
                ],
              },
            ]"
            placeholder="Chemical Supplier"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Chemical Manufacturer:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'manufacturer',
              {
                initialValue: entity.assetManufacturer,
                rules: [
                  {
                    message: 'Please input Manufacturer',
                  },
                  {
                    message: 'Please enter a valid Manufacturer'
                  }
                ],
              },
            ]"
            placeholder="Chemical Manufacturer"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Chemical Owner:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'owner',
              {
                initialValue: entity.assetOwner,
                rules: [
                  {
                    message: 'Please input Owner',
                  },
                  {
                    message: 'Please enter a valid Owner'
                  }
                ],
              },
            ]"
            placeholder="Chemical Owner"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Chemical Volume (L):*"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'model',
              {
                initialValue: entity.assetModel,
                rules: [
                  {
                    required: true,
                    message: 'Please input Model',
                  },
                  {
                    message: 'Please enter a valid Model'
                  }
                ],
              },
            ]"
            placeholder="Chemical Model"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Chemical Serial Number:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'serialNumber',
              {
                initialValue: entity.assetSerialNumber,
                rules: [
                  {
                    message: 'Please input Serial Number',
                  },
                  {
                    message: 'Please enter a valid Serial Number'
                  }
                ],
              },
            ]"
            placeholder="Chemical Serial Number"
          />
          <a-input
              v-decorator="[
                'assetCode',
                {
                  initialValue: entity.code,
                },
              ]"
              type="hidden"
            />
            <a-input
              v-decorator="[
                'assetId',
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
            label="Assign Tag:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-select
              v-decorator="[
                'tagId',
                {
                  initialValue: entity.blyottTagId,
                  rules: [
                    {
                      message: 'Please select Tag',
                    },
                  ],
                },
              ]"
              :show-search="true"
              placeholder="Tag"
              style="width: 100%"
              size="large"
              class="default-select"
            >
              <a-select-option v-for="tag in tagData" :key="tag.blyottTagId">
                {{ tag.blyottTagId }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
  </div>
</template>

<script>
import AssetServices from '~/services/API/AssetServices'
import TagServices from '~/services/API/TagServices'
import nullHelper from '~/mixins/null-helpers'
import LocationServices from '~/services/API/LocationServices'
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
      apiService: AssetServices,
      newSelected: false,
      userData:[],
      locationData:[],
      tagData:[],
    }
  },
  mounted() {
      this.fetchTag()
      this.fetchLocation()
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
    fetchTag(){
        TagServices.getAvailableTags()
          .then((response) => {
              this.tagData = response.data.data
              console.log(this.tagData)
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
