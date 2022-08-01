<template>
  <div class="logistics-page">
    <a-form :form="form" :layout="formLayout" @submit="onSubmit">
    <a-row :gutter="16" class="grey-card">
      <a-col>
        <a-card :bordered="false" class="default-card logistic-container">
            <h2>{{translation.SelecPartn_2_458}} </h2>
            <br>
            <a-form-item>
              <a-select
                v-decorator="[
                  'HospitalsId',
                  {
                    // initialValue: entity.hospitalsId,
                    rules: [
                      {
                        required: false,
                        message: 'Please select your Logistics!',
                      },
                    ],
                  },
                ]"
                mode="multiple"
                placeholder="Select Logistics"
                style="width: 100%"
                class="default-select"
              >
                <a-select-option v-for="hospital in hospitals" :key="hospital.id">
                  {{ hospital.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-checkbox
        v-decorator="[
          `accepted`,
          {
            rules: [
              { required: true, message: 'Please input your Patient Id!' },
            ],
          },
        ]"
        class="d-none"
      />
              <!-- Apply Checkbox -->
              <a-checkbox >
                <h2><b>{{translation.Applyto_3_459}}</b></h2>
              </a-checkbox>
            </a-form-item>
            <a-col class="text-right mt-15">
              <FormActionButton :loading="btnLoading" :is-created="isCreated" />
            </a-col>

          </a-card>
      </a-col>

    </a-row>
    </a-form>
  </div>
</template>

<script>
import notifications from '~/mixins/notifications'
import routeHelpers from '~/mixins/route-helpers'
import nullHelper from '~/mixins/null-helpers'
import { LOGISTIC_ALIAS } from '~/services/Constant'
import OrganizationServices from '~/services/API/OrganizationServices'
  export default{
    mixins: [routeHelpers, nullHelper, notifications],
    data() {
      return {
        // value: ['fastlink'],
        entityId: null,
        formLayout: 'vertical',
        hospitals: [],
        hospitalLoading: true,
        btnLoading: false,
        isCreated: false,
        form: this.$form.createForm(this, {
          name: 'screening',
        }),
      };
    },
    computed:{
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    mounted() {
      this.fetchOrganization()
    },    
    methods:{
      fetchOrganization() {
        OrganizationServices.get({ organizationTypeAlias: LOGISTIC_ALIAS })
          .then((response) => {
            this.hospitals = response.data
          })
          .finally(() => (this.hospitalLoading = false))
      },     
      save(){
        this.success("Contract Added!")
      },
      onSubmit(e) {
        this.loading = true
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            // this.create(values)
          } else {
            this.loading = false
          }
        })
        // this.loading = false
      },      
      create(values) {
        this.btnLoading = true
        this.loading = true
        this.apiService
          .create(values)
          .then((response) => {
            this.success(response.message)
            if (!this.isEmpty(this.gotoLink)) {
              this.goto('/manufacturer/administration/logistics')
            }
            if (this.isFunction(this.afterCreate)) {
              this.afterCreate(response)
              this.btnLoading = false
              this.loading = false
            }
          })
          .catch(this.error)
          .finally(() => {
            // this.btnLoading = false
            // this.loading = false
            this.loading = false
          })
      },      
    },
  }
</script>