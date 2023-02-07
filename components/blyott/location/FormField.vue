<template>
  <div>
      <a-row>
      <a-col :span="12">
        <a-form-item
          label="Location Name: *"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'locationName',
              {
                initialValue: entity.name,
                rules: [
                  {
                    required: true,
                    message: 'Please input location name',
                  },
                  {
                    message: 'Please enter a location name'
                  }
                ],
              },
            ]"
            placeholder="Location Name"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          label="Building"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'building',
              {
                initialValue: entity.building,
                rules: [
                  {
                    message: 'Please input Building',
                  },
                  {
                    message: 'Please enter a valid Building'
                  }
                ],
              },
            ]"
            placeholder="Building"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Floor"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'floor',
              {
                initialValue: entity.floor,
                rules: [
                  {
                    message: 'Please input Floor',
                  },
                  {
                    message: 'Please enter a valid Floor'
                  }
                ],
              },
            ]"
            placeholder="Floor"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Room Category"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'roomCategory',
              {
                initialValue: entity.roomCategory,
                rules: [
                  {
                    message: 'Please input Room Category',
                  },
                  {
                    message: 'Please enter a valid Room Category'
                  }
                ],
              },
            ]"
            placeholder="Room Category"
          />
          <a-input
              v-decorator="[
                'locationCode',
                {
                  initialValue: entity.code,
                },
              ]"
              type="hidden"
            />
            <a-input
              v-decorator="[
                'locationId',
                {
                  initialValue: entity.id,
                },
              ]"
              type="hidden"
            />  
        </a-form-item>
      </a-col>
      </a-row>
  </div>
</template>

<script>
import LocationServices from '~/services/API/LocationServices'
import nullHelper from '~/mixins/null-helpers'
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
      apiService: LocationServices,
      newSelected: false,
      userData:[],
    }
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
    searchCountries(name, b) {
      this.fetchCountries({ name })
    },
    searchRoles(name, b) {
      this.fetchRoles({ name })
    },
  },
}
</script>
