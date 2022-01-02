<template>
  <a-table
    :loading="loading"
    :columns="columns"
    :pagination="pagination"
    :data-source="data"
  >
    <span slot="treatment_status" slot-scope="text, record">
      <!-- <div class="patient-timeline">
        <a class="btn btn-timeline-success btn-icon-sm" href="">Screening</a>
        <span class="sep-line-success"></span>
        <a class="btn btn-timeline-success btn-icon-sm" href="">Scheduling</a>
        <span class="sep-line-disabled"></span>
        <a class="btn btn-outline-secondary disabled">Collection</a>

        <span class="ml-0 line"></span>
        <a
          class="link ml-2 viewBtn p-15 btn-secondry"
          :href="`${actionLink}/${record.globalId}`"
          >View</a
        >
      </div> -->

      <div class="treatment-steps">
        <span v-for="treatment in record.treatments" :key="treatment.id">
          <span class="treatment-name-col">{{
            treatment.treatmentTypeName
          }}</span>
          <span class="step-col"
            ><a-steps :current="getCurrentStep(treatment)" size="small">
              <a-step title="Screening" @click="stepClick(record, treatment)" />
              <a-step
                title="Scheduling"
                @click="stepClick(record, treatment)"
              />
              <a-step
                title="Collection"
                @click="stepClick(record, treatment)"
              />
              <a-step title="Shipment" @click="stepClick(record, treatment)" />
              <a-step title="Treatment" @click="stepClick(record, treatment)" />
              <a-step
                title="After care"
                @click="stepClick(record, treatment)"
              /> </a-steps
          ></span>
        </span>
      </div>
    </span>

    <span slot="action" slot-scope="text, record">
      <a-button type="link" @click="goto(`${actionLink}/${record.globalId}`)">
        <a-icon type="edit" />
      </a-button>
    </span>

    <span slot="upsertDropdown" slot-scope="text, record">
      <a-dropdown>
        <a-button class="action-button" @click="preventDefault">
          <b><a-icon type="more" /></b>
        </a-button>
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="clickUpdate(record)">
            <a-icon type="edit" />Update
          </a-menu-item>

          <a-menu-item key="3"><a-icon type="delete" />Delete</a-menu-item>
        </a-menu>
      </a-dropdown>
    </span>

    <span slot="patientAction" slot-scope="text, record">
      <a-dropdown :trigger="['click']">
        <a-button class="action-button" @click="preventDefault">
          <b><a-icon type="more" /></b>
        </a-button>
        <a-menu slot="overlay">
          <a-menu-item key="0">
            <a>Open Ticket</a>
          </a-menu-item>
          <a-menu-item key="1">
            <a @click="goto(`/hospital/patients/${record.globalId}`)"
              >Add New Treatment</a
            >
          </a-menu-item>
          <a-menu-item key="3"> Hide Patient </a-menu-item>
        </a-menu>
      </a-dropdown>
    </span>

    <span slot="nameTags" slot-scope="tags">
      <a-tag v-for="tag in tags" :key="tag.id">{{ tag.name }}</a-tag>
    </span>
  </a-table>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import notifications from '~/mixins/notifications'
import { isEmpty, preventDefault } from '~/services/Helpers'

export default {
  mixins: [routeHelpers, notifications],
  props: {
    columns: { type: Array, default: () => [] },
    // data: { type: Array, default: () => [] },
    pagination: { type: Boolean, default: false },
    actionLink: { type: String, default: '' },
    apiService: { type: Object, required: true },
    fetchFrom: { type: Function, required: false },
    params: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      data: [],
      loading: false,
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    preventDefault,
    fetch(params = {}) {
      this.loading = true
      const fetchFrom = this.getDataApiService()
      fetchFrom(this.params)
        .then((response) => {
          this.$emit('afterFetch', response)
          if (response.data && response.data.data) {
            this.data = response.data.data
          } else {
            this.data = response.data
          }
        })
        .catch(this.error)
        .finally(() => {
          this.$emit('finally')
          this.loading = false
        })
    },
    getDataApiService() {
      return isEmpty(this.fetchFrom) ? this.apiService.get : this.fetchFrom
    },
    getCurrentStep(treatment) {
      if (treatment.isSCheduled) {
        return 1
      }
      return 3
    },
    stepClick(patient, treatment) {
      this.goto(`/hospital/patients/${patient.globalId}`, {
        treatment_id: treatment.globalId,
      })
    },
    clickUpdate(record) {
      this.$$emit('clickUpdate', record)
    },
  },
}
</script>
