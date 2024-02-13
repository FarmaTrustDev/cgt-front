<template>
  <a-skeleton :loading="loading">
    <a-timeline>
      <a-timeline-item
        v-for="step in sortedSteps"
        :key="step.id"
        :color="isExcursionTab === true ? step.id === maxCompletedStep ? 'red' : step.isCompleted ? 'green' : 'grey' : step.isCompleted ? 'green' : 'grey'"
      >
       <a-icon v-if="isExcursionTab === true && step.id === maxCompletedStep" :style="{fontSize: '16px !important'}" slot="dot" type="close-o"  />
        <a-icon v-else-if="step.isCompleted" slot="dot" type="check-circle-o" />
        <a-icon v-else slot="dot" type="clock-circle-o" />
        <div
          class="step-bar"
          :class="isExcursionTab === true ? step.id === maxCompletedStep ? 'red-border' : step.isCompleted ? 'green-border' : 'grey-border' : step.isCompleted ? 'green-border' : 'grey-border'"
        >
          <!-- {{ step }} -->
          <a-row>
            <a-col :span="16">
              <span class="left">
                <span class="step-title" :class="getTimelineClass(step.id,step.name)">{{ step.name }}</span>
                <span class="date-time">{{
                  isEmpty(step.dateTime) ? 'Pending' : step.dateTime
                }}</span>
              </span>
            </a-col>
            <a-col :span="8">
              <div v-if="step.isCompleted" class="right d-block">
                <strong class="step-title d-block" :class="getTimelineClass(step.id,'')"> by: {{ step.by }}</strong>
                <span class="organization" :class="getTimelineClass(step.id,'')">{{ step.organizationName }}</span>
                <!-- <a-upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  :default-file-list="uploadedFiles(step.uploads)"
                >
                </a-upload> -->
                <ul v-if="!isEmpty(step.uploads)">
                  <li v-for="upload in step.uploads" :key="upload.uid">
                    <a
                      :href="getImageUrl(upload.url)"
                      download
                      target="_blank"
                      >{{ upload.name }}</a
                    >
                  </li>
                </ul>
              </div>
            </a-col>
          </a-row>
        </div></a-timeline-item
      >
    </a-timeline>
  </a-skeleton>
</template>

<script>
import TreatmentServices from '~/services/API/TreatmentServices'
import { isEmpty } from '~/services/Utilities'
import imagesHelper from '~/mixins/images-helper'

export default {
  mixins: [imagesHelper],
  props: {
    treatment: { required: true, type: Object },
    bag: { required: true, type: Object },
    stepTypeId: { required: true, type: Number },
    isExcursionTab: {type:Boolean},
  },
  data() {
    return { steps: null, loading: false, maxCompletedStep: 0 }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
    sortedSteps() {
      if (!this.steps) {
        return [];
      }
      return this.steps.slice().sort((a, b) => a.id - b.id);
    }
  },
  watch: {
    translation(newValues, oldValue) {
      if (newValues !== oldValue) {
        if (this.steps != null) {
          this.steps[0].by = newValues.InbouDate_2_635
          this.steps[1].by = newValues.InbouProce_2_513
          this.steps[2].by = newValues.Stora_1_366
          this.steps[3].by = newValues.VisuaCheck_2_636
          this.steps[4].by = newValues.PackaDepot_2_637
          this.steps[5].by = newValues.CouriPick_3_648
        }
      }
    },
  },
  mounted() {
    this.fetchSteps()
    this.getTranslationData()
  },
  methods: {
    isEmpty,
    fetchSteps() {
      // this.loading = true
      TreatmentServices.getCustody(
        this.treatment.id,
        this.bag.id,
        this.stepTypeId
      )
        .then((response) => {
          if (!isEmpty(response.data)) {
            this.steps = response.data.steps
            this.maxCompletedStep = response.data.maxCompletedStepId;
            console.log(response)
          }
        })
        // .finally(() => (this.loading = false))
    },
    getTranslationData() {
      if (this.steps != null) {
        this.steps[0].by = this.translation.InbouDate_2_635
        this.steps[1].by = this.translation.InbouProce_2_513
        this.steps[2].by = this.translation.Stora_1_366
        this.steps[3].by = this.translation.VisuaCheck_2_636
        this.steps[4].by = this.translation.PackaDepot_2_637
        this.steps[5].by = this.translation.CouriPick_3_648
      }
    },
    sendName(id,name)
    {
      if(this.isExcursionTiemline(id)){
        this.$emit('getName',name)
      }
    },
    getTimelineClass(id,name)
    {
      this.sendName(id,name)
      return  this.isExcursionTiemline(id) ?
      'color-red' : '' 
    },
    isExcursionTiemline(id)
    {
      return this.isExcursionTab === true && 
      id === this.maxCompletedStep
    }
  },
}
</script>
<style scoped>
.grey-card .ant-card-body {
    padding: 9px;
    padding-top: 2%;
}
</style>