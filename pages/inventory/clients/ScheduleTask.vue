<template>
  <div class="ml-35">
    <a-row>
        <a-col :span="10" style="margin-top: 18px;">
          Does this task refer to an existing sample?
        </a-col>
        <a-col :span="12">
          <a-form-item>
                            <a-switch
                                v-model="isConfirmed"
                                data-rowId="2"
                                size="large"
                                class="toggle_record"
                                checked-children="Yes"
                                un-checked-children="No"
                            /><span class="ml-5"></span>
                    </a-form-item>
        </a-col>
    </a-row>
    
    <a-form :form="form" :layout="formLayout" @submit.prevent="onSubmit" >
    <a-row v-if="isConfirmed">
        <a-col :span="3" style="margin-top: 18px;">
        Sample ID:
        </a-col>
        <a-col :span="15">
          <a-form-item>
          <a-input
              v-decorator="[
                'sample',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your project description',
                    },
                    { 
                      message: 'Please enter a valid description'
                    }
                  ],
                },
              ]"
              placeholder="Sample ID"
            />
          </a-form-item>
        </a-col>
    </a-row>
    <a-row>
        <a-col :span="3" style="margin-top: 18px;">
        Type of Task:
        </a-col>
        <a-col :span="7">
          <a-form-item>
            <a-select
            v-decorator="[
              'projectId',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please select your Project',
                  },
                ],
              },
            ]"
            :show-search="true"
            :filter-option="filterOption"
            placeholder="Project"
            style="width: 100%"
            size="large"
            class="default-select"
          >
            <a-select-option v-for="partner in partners" :key="partner.projectId">
              {{ partner.description }}
            </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        
        <a-col :span="3" style="margin-top: 18px; margin-left: 10px;">
        Executed On:
        </a-col>
        <a-col :span="5">
          <a-form-item>
            <a-date-picker
            v-decorator="[
              'projectDate',
              {
                rules: [
                  {
                    required: true,
                    message: translation.requi_1_336,
                  },
                ],
              },
            ]"
            placeholder="DD/MM/YYYY"
            format="DD/MM/YYYY"
            style="width: 100%"
            size="large"
          >
          </a-date-picker>
          </a-form-item>
        </a-col>
    </a-row>
    <a-row>
        <a-col :span="3" style="margin-top: 18px;">
        Assign task to:
        </a-col>
        <a-col :span="7">
          <a-form-item>
            <a-input
              v-decorator="[
                'name',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your project description',
                    },
                    { 
                      message: 'Please enter a valid description'
                    }
                  ],
                },
              ]"
              placeholder="Name"
            />
          </a-form-item>
        </a-col>
        
        <a-col :span="3" style="margin-top: 18px; margin-left: 10px;">
        Email:
        </a-col>
        <a-col :span="5">
          <a-form-item>
            <a-input
              v-decorator="[
                'email',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your project description',
                    },
                    { 
                      message: 'Please enter a valid description'
                    }
                  ],
                },
              ]"
              placeholder="Email"
            />
          </a-form-item>
        </a-col>
    </a-row>
    <a-row>
        <a-col :span="12">
          Show Notification:
        </a-col>
    </a-row>
    <a-row>
        <a-col :span="12">
          <a-form-item>
              <a-checkbox
        v-decorator="[
          `acceptedNow`,
        ]"
        :disabled="false"
      >
              <!-- Apply Checkbox -->
                <b>Now:</b>
              </a-checkbox>
              <a-checkbox
        v-decorator="[
          `acceptedDate`,
        ]"
        :disabled="false"
      >
              <!-- Apply Checkbox -->
                <b>Date of task:</b>
              </a-checkbox>
              <a-checkbox
        v-decorator="[
          `acceptedWeek`,
        ]"
        :disabled="false"
      >
              <!-- Apply Checkbox -->
                <b>One week before task:</b>
              </a-checkbox>
            </a-form-item>
        </a-col>
    </a-row>
    <a-row>
        <a-col :span="3">
        Comment:
        </a-col>
        <a-col :span="15">
          <a-form-item>
          <a-input
              v-decorator="[
                'description',
                {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your project description',
                    },
                    { 
                      message: 'Please enter a valid description'
                    }
                  ],
                },
              ]"
              placeholder="Comments"
            />
          </a-form-item>
        </a-col>
    </a-row>
    <a-row>
        <a-col :span="3">
        Upload Document:
        </a-col>
        <a-col :span="15">
          <a-upload class="ml-20"><img :src="getImageUrl('icons/upload.svg')" /></a-upload>
        </a-col>
    </a-row>

    <a-row>
      <a-form-item :label-col="{ span: 18 }" :wrapper-col="{ span: 18 }">
          <FormActionButton custom-text="Save Task" />
        </a-form-item>
    </a-row>
  </a-form>
  </div>
</template>
<script>
import moment from 'moment'
import imagesHelper from '~/mixins/images-helper'
import ProjectServices from '~/services/API/ProjectServices'
import { filterOption,isEmpty, preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
export default {
  mixins: [routeHelpers,imagesHelper],
  data() {
    return {
      partners:[],
      isConfirmed:false,
      clientName:'',
      projectName:'',
      formLayout: 'vertical',
        form: this.$form.createForm(this, {
          name: 'projectCreate',
        }),
    }
  },
  mounted() {
    this.fetchProjects()
  },
  watch: {
    isConfirmed(newValue) {
      if (newValue) {
        // Value is true when the switch is checked
        console.log(newValue);
      } else {
        // Value is false when the switch is unchecked
        console.log(newValue);
      }
    },
  },
  methods: {
    filterOption,
    isEmpty,
    preventDefault,
    fetchProjects() {
      const clientName = this.$route.query.clientName
      this.clientName=clientName
      ProjectServices.getByPartnerName(clientName).then((response) => {
        this.partners = response.data
        console.log(response)
      })
    },
    onSubmit(e) {
        this.loading = true
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            ProjectServices.getByProjectId(values.projectId).then((response)=>{
              this.projectName=response.data.description
              console.log(this.projectName)
              const originalDate = moment(values.projectDate).toDate();
              const futureDate = new Date(originalDate);
              const weekB= new Date(originalDate);
              weekB.setDate(weekB.getDate()-7);
              
              futureDate.setMonth(futureDate.getMonth() + 5);
              localStorage.setItem('sampleId',values.sample)
              localStorage.setItem('projectId',values.projectId)
              localStorage.setItem('acceptedDate',values.acceptedDate)
              localStorage.setItem('acceptedNow',values.acceptedNow)
              localStorage.setItem('acceptedWeek',values.acceptedWeek)
              localStorage.setItem('weekB',moment(weekB).format('DD/MM/YYYY'))
              localStorage.setItem('dated',moment(values.projectDate).format('DD/MM/YYYY'))
              localStorage.setItem('expDated',moment(futureDate).format('DD/MM/YYYY'))
              localStorage.setItem('client',this.clientName)
              localStorage.setItem('projectName',this.projectName)
              localStorage.setItem('isNew',"true")
            })
            this.goto('/inventory/treatment?id=2')
            /* const formData = new FormData()
            for (const key in values) {
              formData.append(key, values[key])
            }
              this.fileList.forEach((files) => {
                formData.append('profileImageUrl', files)
              }) */
            // this.upsert(values)
          } else {
            this.loading = false
          }
        })
        // this.loading = false
      },
  }
}
</script>
