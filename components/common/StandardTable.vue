<template>
  <div>
    <a-table
      :loading="loading"
      :pagination="showPagination"
      :columns="columns"
      :data-source="shouldUpdate ? [...dumpData] : [...data]"
      class="rounded-table"
      :class="{ 'patient-table': patient }"
    >
      <template slot="customTitle">
        <div class="text-left treatment-title">
          {{ translation['TreatStatu_2_748'] }}
        </div>
      </template>

      <template slot="name" slot-scope="name">
        <strong>{{ name }}</strong>
      </template>

      <template slot="treatmentTypeNameRender" slot-scope="name, patient">
        <strong v-for="treatment in patient.treatments" :key="treatment.id">
          <a-tooltip :title="'TreatmentID: '+treatment.treatmentPUID">
          <span class="treatmentName mt-15">{{
            treatment.treatmentTypeName
          }}</span>
        </a-tooltip>
        </strong>

      </template>

      <template slot="image" slot-scope="src, record" class="maaz">
        <img
          width="50"
          class="img-responsive"
          :src="src"
          @click="clickImage(record)"
        />
      </template>
      <template slot="active" slot-scope="record">
        <span v-if="record">Accepted</span>
        <span v-else>New Changes Submitted</span>
      </template>
      <template slot="icon" slot-scope="icon, record">
        <a-icon type="cloud-upload" @click="clickIcon(record)" />
      </template>

      <template slot="popupOver" slot-scope="text">
        <a-popover>
          <template slot="content"> {{ text }} </template>
          <span type="primary"> {{ text }}</span>
        </a-popover>
      </template>

      <template slot="check" slot-scope="flag">
        <!-- <strong>{{ flag }}</strong> -->
        <!-- <a-icon
         
          type="check"
          two-tone-color="#52c41a"
          theme="twoTone"
        /> -->
        <a-icon
          v-if="flag"
          type="check"
          theme="outlined"
          :style="{ color: '#52c41a' }"
        />
        <a-icon
          v-else
          type="close-circle"
          two-tone-color="#eb2f96"
          theme="twoTone"
        />
      </template>

      <span
        slot="treatment_status"
        slot-scope="text, record"
        class="treatment-steps"
      >
        <span
          v-for="treatment in record.treatments"
          :key="treatment.id"
          :class="getTreatmentStepClass(record, treatment)"
        >
          <div class="container-div main">
            <div class="container-steps-div main">
              <div>
                <steps
                  :treatment="treatment"
                  :phases="phases"
                  :current-step="getCurrentStep"
                  :patient="record"
                  :goto-view="stepClick"
                ></steps>
                <span class="vertical-line-standard-table"></span>

                <a-dropdown>
                  <a-button type="primary" class="ant-btn-drop-down">
                    {{ translation['Admin_1_142'] }}
                  </a-button>
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a
                        href="javascript:;"
                        @click="gotoView(record, treatment)"
                        ><a-icon type="search" />
                        {{ translation.view_1_750 }}</a
                      >
                    </a-menu-item>
                    <a-menu-item>
                      <a
                        href="javascript:;"
                        @click="handleCancelModal(true, record, treatment)"
                        ><a-icon type="minus-circle" />
                        {{
                          treatment.isHold
                            ? translation.Resum_1_463
                            : translation.Pause_1_452
                        }}</a
                      >
                    </a-menu-item>
                    <a-menu-item class="treatment-cancel-placeholder">
                      <a
                        href="javascript:;"
                        @click="cancelTreatment(record, treatment)"
                        ><a-icon type="minus-circle" />
                        {{
                          treatment.isCancel
                            ? 'continue'
                            : translation.cance_1_296
                        }}</a
                      >
                    </a-menu-item>
                    <a-menu-item>
                      <a
                        href="javascript:;"
                        @click="handleDeleteModal(true,record, treatment)"
                        ><a-icon type="delete" />
                        {{ translation.Delet_1_451 }}</a
                      >
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
            </div>
            <!-- <div class="container-drop-down-div">
              <span class="vertical-line-standard-table"></span>
              <a-dropdown>
                <a-button type="primary" class="ant-btn-drop-down">
                  {{ translation['Admin_1_142'] }}
                </a-button>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;" @click="gotoView(record, treatment)"
                      ><a-icon type="search" /> {{ translation.view_1_750 }}</a
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a
                      href="javascript:;"
                      @click="handleCancelModal(true, record, treatment)"
                      ><a-icon type="minus-circle" />
                      {{
                        treatment.isHold
                          ? translation.Resum_1_463
                          : translation.Pause_1_452
                      }}</a
                    >
                  </a-menu-item>
                  <a-menu-item class="treatment-cancel-placeholder">
                    <a
                      href="javascript:;"
                      @click="cancelTreatment(record, treatment)"
                      ><a-icon type="minus-circle" />
                      {{
                        treatment.isCancel
                          ? 'continue'
                          : translation.cance_1_296
                      }}</a
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a
                      href="javascript:;"
                      @click="handleDeleteModal(true, record, treatment)"
                      ><a-icon type="delete" /> {{ translation.Delet_1_451 }}</a
                    >
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div> -->
          </div>
        </span>
      </span>

      <span slot="action" slot-scope="text, record">
        <a-button type="link" @click="goto(`${actionLink}/${record.globalId}`)">
          <a-icon type="edit" />
        </a-button>
      </span>
      <span slot="btn" slot-scope="text, record">
        <a-button
          type="primary"
          @click="goto(`${actionLink}/${record.globalId}`)"
        >
          {{ buttonName }}
        </a-button>
      </span>

      <span slot="upsertDropdown" slot-scope="text, record">
        <a-dropdown>
          <a-button class="action-button" @click="preventDefault">
            <b><a-icon type="more" /></b>
          </a-button>
          <a-menu slot="overlay">
            <a-menu-item key="1" @click="clickUpdate(record)">
              <a-icon type="edit" />{{ translation.Updat_1_208 }}
            </a-menu-item>

            <a-menu-item key="3"
              ><a-popconfirm
                :title="translation.Areyou_4_484"
                :ok-text="translation.yes_1_654"
                :cancel-text="translation.no_1_656"
                placement="topLeft"
                @confirm="clickDelete(record)"
              >
                <a-icon type="delete" />{{ translation.Delet_1_451 }}
              </a-popconfirm></a-menu-item
            >
          </a-menu>
        </a-dropdown>
      </span>

      <span slot="patientAction" slot-scope="text, record">
        <a-dropdown :trigger="['click']">
          <a-button class="action-button" @click="preventDefault">
            {{ translation['Admin_1_142'] }} <a-icon type="down" />
          </a-button>
          <a-menu slot="overlay">
            <a-menu-item key="0">
              <a
              @click="
                  goto(`/support?showModel=true`)
                "
              >{{ translation.OpenTicke_2_800 }}</a>
            </a-menu-item>
            <a-menu-item key="Consent">
              <a
                @click="
                  goto(`/hospital/patients/${record.globalId}?view=Consent`)
                "
                >{{ translation.Addnew_3_75 }}</a
              >
            </a-menu-item>
            <a-menu-item key="3">
              <a-popconfirm
                :title="translation.Areyou_4_484"
                :ok-text="translation.yes_1_654"
                :cancel-text="translation.no_1_656"
                placement="topLeft"
                @confirm="deletePatient(`${record.id}`)"
              >
                {{ translation.HidePatie_2_804 }}
              </a-popconfirm>
            </a-menu-item>
            <a-menu-item key="4">
              <a-popconfirm
                :title="translation.Areyou_4_484"
                :ok-text="translation.yes_1_654"
                :cancel-text="translation.no_1_656"
                placement="topLeft"
                @confirm="deadPatient(record)"
              >
                <span v-if="record.isDead"> {{ translation.Resum_1_463 }}</span>
                <span v-else>{{ translation.cance_1_296 }}</span>
              </a-popconfirm>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>

      <!-- // filter option -->
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, column, clearFilters }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="(c) => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="() => handleSearch(selectedKeys, column)"
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, column)"
        >
          {{ translation.searc_1_488 }}
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="() => handleReset(clearFilters, column)"
        >
          {{ translation.Reset_1_464 }}
        </a-button>
      </div>

      <span v-if="isHospital" slot="nameTags" slot-scope="tags">
        <a-tag>{{ tags.name }}</a-tag>
      </span>

      <span v-else slot="nameTags" slot-scope="tags">
        <a-tag v-for="tag in tags" :key="tag.id">{{ tag.name }}</a-tag>
      </span>
    </a-table>

    <!-- Todo cancel treatment modal (Remove patient table work) have to complete
    the sprint cannot segregate the patient -->
    <a-modal
      :visible="showCancelTreatmentModal"
      title="Cancel Treatment"
      :footer="null"
      @cancel="handleCancelTreatmentModal(false)"
    >
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-textarea
          v-model="treatmentCancelReason"
            v-decorator="[
              'note',
              {
                rules: [{ required: true, message: 'Required' }],
              },
            ]"
            placeholder="Enter Note"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            :loading="loading"
            type="primary"
            html-type="submit"
            class="float-right"
          >
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      title="Pause treatment"
      :visible="showPauseModal"
      :footer="false"
      @cancel="handleCancelModal(false, '', '')"
    >
        <a-form :form="form" @submit="handleOk">
        <a-form-item>
          <a-textarea
          v-model="treatmentPauseReason"
            v-decorator="[
              'note',
              {
                rules: [{ required: true, message: 'Required' }],
              },
            ]"
            placeholder="Enter Note"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            :loading="loading"
            type="primary"
            html-type="submit"
            class="float-right"
          >
            Submit
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      :visible="showFlagModal"
      @ok="handleFlagModal(true, '', '', true)"
      @cancel="handleFlagModal(false, patient, treatment, false)"
    >
      <p>
        Treatment is already in pause state, do you want to switch the status to
        cancel ?
      </p>
    </a-modal>
    <a-modal
      :visible="showDeleteModal"
      @ok="handleDeleteModal(false, '', '')"
      @cancel="deleteModal(false)"
    >
      <p>Are you sure you want to delete ?</p>
    </a-modal>
    <a-modal
      :visible="showPauseDeleteModal"
      @ok="handleModal()"
      @cancel="cancelModal(false)"
      >
      The treatment is already in cancel state. Do you want to switch the
       status to pause ?
    </a-modal>
  </div>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import notifications from '~/mixins/notifications'
import { isEmpty, preventDefault } from '~/services/Helpers'
import steps from '~/components/common/Steps'
import { PATIENT_TREATMENT_PHASES } from '~/services/Constant/Phases'
import PatientServices from '~/services/API/PatientServices'
import TreatmentServices from '~/services/API/TreatmentServices'
import paginationHelper from '~/mixins/pagination'
import filterOption from '~/mixins/filter-options'
export default {
  components: { steps },
  mixins: [routeHelpers, notifications, paginationHelper, filterOption],
  props: {
    columns: { type: Array, default: () => [] },
    dumpData: { type: Array, default: () => [] },
    // eslint-disable-next-line vue/require-prop-types
    // pagination: { required: false, default: false },
    actionLink: { type: String, default: '' },
    buttonName: { type: String, default: '' },
    // eslint-disable-next-line vue/require-default-prop
    apiService: { type: Object, required: false },
    // eslint-disable-next-line vue/require-default-prop
    fetchFrom: { type: Function, required: false },
    params: { type: Object, default: () => ({}) },
    rounded: { type: Boolean, default: false },
    patient: { type: Boolean, default: false },
    shouldFetch: { type: Boolean, default: true },
    showPagination: { type: Boolean, default: true },
    shouldUpdate: { type: Boolean, default: false },
    isHospital: { type: Boolean, default: false },
    isManufacturer: { type: Boolean, default: false },
  },

  data() {
    return {
      data: [],
      recordData: [],
      patientData: [],
      form: this.$form.createForm(this, { name: 'coordinated' }),
      loading: false,
      showDeleteModal: false,
      showPauseModal: false,
      showFlagModal: false,
      phases: PATIENT_TREATMENT_PHASES,
      treatmentCancelReason: '',
      treatmentPauseReason : '',
      showCancelTreatmentModal: false,
      treatmentForCancellation: {},
      treatmentForPause: {},
      showPauseDeleteModal: false
      // pagination: {},
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    if (this.shouldFetch) {
      this.fetch()
      this.getFetchMethod()
    } else {
      this.data = this.dumpData
    }
  },
  methods: {
    preventDefault,
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-unused-expressions
          this.submitCancelResponse()
          this.handleCancelTreatmentModal(false)
        }
      })
    },
    handleOk(e)
    {
      e.preventDefault()
      this.form.validateFields((err, values)=>{
        if(!err){
          this.submitPauseResponse()
          this.showPauseModal = false
        }
      })
    },
    submitPauseResponse()
    {
      const treatment = this.treatmentForPause
      TreatmentServices.hold(treatment.globalId, !treatment.isHold, {
        notes: this.treatmentPauseReason
      })
        .then((response) => {
          this.$emit('fetchParent', response)
          this.treatmentPauseReason = ''
        })
        .catch(this.error)
    },
    fetch(params = {}) {
      this.loading = true
      const fetchFrom = this.getDataApiService()
      fetchFrom({ ...this.params, ...this.pagination, ...params })
        .then((response) => {
          this.$emit('afterFetch', response)
          if (response.data && response.data.data) {
            this.data = response.data.data
            this.setPagination(response.data)
          } else {
            this.setPagination(response.data)
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
      return isEmpty(this.fetchFrom)
        ? this.isHospital
          ? this.apiService.getHospitalScreening
          : this.apiService.get
        : this.fetchFrom
    },
    getCurrentStep(treatment) {
      // Most expensive Operation in whole application
      if (!isEmpty(treatment.phaseId)) {
        const phases = this.phases
        let currentPhase = 0
        for (let phase = 0; phase < phases.length; phase++) {
          if (phases[phase].phaseId <= treatment.phaseId) {
            currentPhase = phases[phase].id
          } else {
            currentPhase = phases[phase].id
            break
          }
        }
        return currentPhase
      }
      return 1
    },
    stepClick(patient, treatment, phase) {
      // insane logic
      //  2 for patient
      // console.log(patient, treatment.phaseId, phase.phaseId)
      // return false
      if (
        phase.id !== 1 &&
        (treatment.phaseId == null || treatment.phaseId < 2) &&
        treatment.phaseId < phase.phaseId
      ) {
        return false
      }
      const routeModel =
        phase.url_type === 1 ? patient.globalId : treatment.globalId
      return this.goto(`${phase.url_slug}${routeModel}`, {
        treatment_id: treatment.globalId,
        ...phase.params,
      })
    },
    gotoCollectionScreen(patient, treatment) {
      if (!isEmpty(treatment)) {
        this.goto(`/hospital/patients/collection/${treatment.globalId}`, {
          treatment_id: treatment.globalId,
        })
      }
    },
    gotoView(patient, treatment) {
      if (!isEmpty(treatment)) {
        this.goto(`/hospital/patients/treatment/${treatment.globalId}`)
      }
    },
    clickUpdate(record) {
      this.$emit('clickUpdate', record)
    },
    clickDelete(record) {
      this.$emit('clickDelete', record)
    },
    getFetchMethod() {
      this.$emit('getFetch', this.fetch)
    },
    deletePatient(record) {
      PatientServices.destroy(record).then((response) => {
        this.success(response.message)
        this.fetch()
      })
    },

    handleFlagModal(e, patient, treatment, isHold) {
      // eslint-disable-next-line eqeqeq
      if (e == true && isHold == false) {
        this.patientData = patient
        this.recordData = treatment
        this.showFlagModal = e
      }
      // eslint-disable-next-line eqeqeq
      else if (e == true && isHold == true) {
        this.showFlagModal = false
        this.holdTreatment(this.patientData, this.recordData)
        this.recordData.isHold = false
        this.cancelTreatment(this.patientData, this.recordData)
      }
      // eslint-disable-next-line eqeqeq
      else if (e == false && isHold == false) {
        this.showFlagModal = false
      }
    },
    deadPatient(patient) {
      const isDead = !patient.isDead
      TreatmentServices.markDead(patient.globalId, isDead).then((response) => {
        this.$emit('fetchParent', response)
      })
    },
    clickImage(record) {
      this.$emit('clickImage', record)
    },
    clickIcon(record) {
      this.$emit('clickIcon', record)
    },
    handleCancelTreatmentModal(show) {
      this.showCancelTreatmentModal = show
    },
    submitCancelResponse() {
      /// ANy how need to optimize on high priority
      console.log(this.treatmentForCancellation,'treatmentForCancellation')
      const treatment = this.treatmentForCancellation
      this.loading = true
      TreatmentServices.cancel(treatment.globalId, !treatment.isCancel, {
        notes: this.treatmentCancelReason,
      })
        .then((response) => {
          this.handleCancelTreatmentModal(false)
          this.success(response.message)
          this.treatmentCancelReason = ''
          this.$emit('fetchParent', response)
        })
        .catch(this.error)
        .finally(() => (this.loading = true))
    },
    cancelTreatment(patient, treatment) {
      // eslint-disable-next-line eqeqeq
      if (treatment.isHold == true) {
        this.handleFlagModal(true, patient, treatment, false)
      } else {
        this.treatmentForCancellation = treatment
        this.handleCancelTreatmentModal(true)
      }
    },
    holdTreatment(patient, treatment) {
      TreatmentServices.hold(treatment.globalId, !treatment.isHold, {
        notes: this.treatmentPauseReason
      })
        .then((response) => {
          this.$emit('fetchParent', response)
          this.treatmentPauseReason = ''
        })
        .catch(this.error)
        
    },
    getTreatmentStepClass(patient, treatment) {
      if (patient.isDead) {
        return 'dead'
      } else if (treatment.isHold || treatment.isCancel) {
        return 'hold'
      }
    },
    getPagination() {
      if (!this.showPagination) {
        return false
      }
      return this.pagination
    },
    deleteTreatment(e, patient, treatment) {
      console.log(treatment, 'treatment')
      TreatmentServices.destroy(treatment.id).then((response) => {
        this.success(response.message)
        this.fetch()
      })
      // console.log(patient, treatment)
    },
    handleDeleteModal(e, patient, treatment) {
      // eslint-disable-next-line eqeqeq
      if (e == true) {
        this.patientData = patient
        this.recordData = treatment
        this.deleteModal(e)
      }
      // eslint-disable-next-line eqeqeq
      else if (e == false) {
        this.deleteTreatment(e, this.patientData, this.recordData)
        this.deleteModal(e)
      }
    },
    deleteModal(e) {
      this.showDeleteModal = e
    },
    handleCancelModal(e, record, treatment) {
      this.patientData = record
      this.recordData = treatment
      this.treatmentForPause =  treatment
      console.log(this.recordData, 'record data')
      // eslint-disable-next-line eqeqeq
      if(this.recordData.isCancel==true)
      {
        this.cancelModal(true)
      }
      else
      {
        this.showPauseModal = e
      }
    },
    handleModal(){
      this.cancelTreatment(this.patientData, this.recordData)
      this.showPauseModal = true
      this.cancelModal(false)
    },
    cancelModal(e){
      this.showPauseDeleteModal = e
    }
  },
}
</script>
