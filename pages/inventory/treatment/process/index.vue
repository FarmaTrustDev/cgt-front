<template>
  <page-layout
    :loading="false"
    :title="translation.SamplStatu_2_509"
    class="specific container smartlab_task_inner"
    :create="false"
  >
    <template slot="content">
      <div class="grey-card">
        <div class="patient-details-page" style="margin: 2%; margin-top: 0">
          <a-row :gutter="18">
            <a-col :span="6">
              <a-card :bordered="false" class="qr-section default-card">
                <figure class="m-0">
                  <img
                    class="img-fluid"
                    :src="`https://demoapi.qmaid.co/Uploads/patient/10/qr/637880405174699096.png`"
                    alt="Christina Braun"
                  />

                  <figcaption>
                    {{ translation.SamplID_2_502 }}: {{record.sampleId}}
                  </figcaption>
                </figure>
              </a-card>
            </a-col>
            <a-col :span="18">
              <a-card :bordered="false" class="default-card details-section">
                <article class="article">
                  <h2 class="heading pl-0">
                    {{ translation.SamplDetai_2_510 }}
                  </h2>
                </article>
                <div>
                  <a-row :gutter="20" dir="ltr">
                    <a-col :span="3" class="mt-15">
                      <h6>
                        <span class="text-muted">
                          {{ translation.Clien_1_505 }}:
                        </span>
                      </h6>
                    </a-col>
                    <a-col :span="9" class="mt-15">
                      <h6>
                        <span> {{record.clientName}}</span>
                      </h6>
                    </a-col>
                    <a-col :span="5" class="mt-15">
                      <h6>
                        <span class="text-muted"
                          >{{ translation.SamplName_2_503 }}:</span
                        >
                      </h6>
                    </a-col>
                    <a-col :span="7" class="mt-15">
                      <h6><span>Human Cells</span></h6>
                    </a-col>
                  </a-row>
                  <a-row :gutter="20" dir="ltr">
                    <a-col :span="3" class="mt-15">
                      <h6>
                        <span class="text-muted">
                          {{ translation.Email_1_511 }}:</span
                        >
                      </h6>
                    </a-col>
                    <a-col :span="9" class="mt-15">
                      <h6>
                        <span> info@gmail.com</span>
                      </h6>
                    </a-col>
                  </a-row>
                  <a-row :gutter="20" dir="ltr">
                    <a-col :span="3" class="mt-15">
                      <h6>
                        <span class="text-muted">
                          {{ translation.Phone_1_63 }}:</span
                        >
                      </h6>
                    </a-col>
                    <a-col :span="9" class="mt-15">
                      <h6><span> +44 289 6655</span></h6>
                    </a-col>
                  </a-row>
                </div>
              </a-card>
            </a-col>
          </a-row>
        </div>
        <a-card
          :bordered="false"
          class="mt-15 default-card inbound-accept-tabs tabs_body"
          style="width: 96%; margin-left: 2%"
        >
          <span>
            <!-- //Steps -->
            <div class="treatment-steps" style="width: 100%">
              <span class="step-col-large">
                <a-steps size="small" :initial="1">
                  <a-step
                    v-for="phase in phases"
                    :key="phase.id"
                    :title="phase.taskStepName"
                    :class="
                    (phase.id == (record.stageId+1) && (record.qpStatus==='Rejected' || record.qpStatus==='Quarantine')) ?
                          'ant-steps-item-error-large':
                    phase.id <= record.stageId
                    ? 'ant-steps-item-finish-large'
                    : phase.id === (record.stageId+1)
                    ? 'ant-steps-item-active-blue-large' : 'ant-steps-horizontal-large'
                    "
                    
                    :status="
                          phase.id === record.stageId
                            ? 'active'
                            : phase.id < record.stageId ?  'finish' : 'wait'
                        "
                    @click="reDirect(phase.url+'&record='+JSON.stringify(record))"
                  />
                </a-steps>
              </span>
            </div>
            <!-- //Steps -->
          </span>
        </a-card>
        
        <a-card
          v-if="activeTab == 'INBOUND_ACCEPTANCE_DETAILS' || activeTab == 'INBOUND_SHIPMENT'"
          :bordered="false"
          class="mt-15 default-card inbound-accept-tabs"
          style="width: 96%; margin-left: 2%"
        >
          <div class="h-tabs large-tabs" style="width: 100%">
            <a-row>
              <a-col :span="11">
                <a-card :bordered="false" class="default-card">
                  <article class="article">
                    <h4 class="heading pl-0">
                      {{ translation.ShippDetai_2_314 }}
                    </h4>
                  </article>
                  <div>
                    <a-row :gutter="20" dir="ltr">
                      <a-col :span="10" class="mt-15">
                        <span class="text-muted">
                          {{ translation.DispaDate_2_316 }}:</span
                        >
                      </a-col>
                      <a-col :span="6" class="mt-15 float-right">
                        <span class="text-muted"> {{ _getFormatMoment(record.arrivalDate).format("DD/MM/YYYY") }} </span>
                      </a-col>
                    </a-row>
                    <a-row :gutter="20" dir="ltr">
                      <a-col :span="10" class="mt-15">
                        <span class="text-muted">
                          {{ translation.DispaBy_2_516 }}:</span
                        >
                      </a-col>
                      <a-col :span="6" class="mt-15 float-right">
                        <span class="text-muted"> Gary Jose</span>
                      </a-col>
                    </a-row>
                    <a-row :gutter="20" dir="ltr">
                      <a-col :span="10" class="mt-15">
                        <span class="text-muted">
                          {{ translation.CarriStatu_2_320 }}</span
                        >
                      </a-col>
                      <a-col :span="6" class="mt-15 float-right">
                        <span class="text-muted"> In-Process</span>
                      </a-col>
                    </a-row>
                    <a-row :gutter="20" dir="ltr">
                      <a-col :span="10" class="mt-15">
                        <span class="text-muted">{{
                          translation.EstimArriv_3_322
                        }}</span>
                      </a-col>
                      <a-col :span="6" class="mt-15 float-right">
                        <span class="text-muted"> {{ _getFormatMoment(record.arrivalDate).format("DD/MM/YYYY") }}</span>
                      </a-col>
                    </a-row>
                  </div>
                </a-card>
              </a-col>
              <a-col :span="1"></a-col>
              <a-col :span="12">
                <a-card :bordered="false" class="default-card">
                  <article class="article">
                    <h4 class="heading pl-0">
                      {{ translation.SamplRecei_2_515 }}
                    </h4>
                  </article>
                  <div>
                    <a-row :gutter="20" dir="ltr">
                      <a-col :span="10" class="mt-15">
                        <span class="text-muted">{{
                          translation.IsRecei_2_328
                        }}</span>
                      </a-col>
                      <a-col :span="6" class="mt-15 float-right">
                        <span class="text-muted"> Done</span>
                      </a-col>
                    </a-row>
                    <a-row :gutter="20" dir="ltr">
                      <a-col :span="10" class="mt-15">
                        <span class="text-muted">
                          {{ translation['Receiby:_2_330'] }}</span
                        >
                      </a-col>
                      <a-col :span="6" class="mt-15 float-right">
                        <span class="text-muted">Fred Smith</span>
                      </a-col>
                    </a-row>
                    <a-row :gutter="20" dir="ltr">
                      <a-col :span="10" class="mt-15">
                        <span class="text-muted">
                          {{ translation['ReceiDate:_2_332'] }}</span
                        >
                      </a-col>
                      <a-col :span="6" class="mt-15 float-right">
                        <span class="text-muted">  {{ _getFormatMoment(record.arrivalDate).format("DD/MM/YYYY") }}</span>
                      </a-col>
                    </a-row>
                    <a-row :gutter="20" dir="ltr">
                      <a-col :span="10" class="mt-15">
                        <span class="text-muted">{{
                          translation['ReceiNote:_2_334']
                        }}</span>
                      </a-col>
                      <a-col :span="6" class="mt-15 float-right">
                        <span class="text-muted"> Received</span>
                      </a-col>
                    </a-row>
                  </div>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </a-card>
        <a-card
          v-if="activeTab == 'PROCESS_SAMPLE' || activeTab == 'INBOUND_PROCESS'"
          :bordered="false"
          class="mt-15 default-card inbound-accept-tabs test"
          style="width: 96%; margin-left: 2%"
        > 
          <div class="h-tabs large-tabs" style="width: 100%">
            <div>
              <strong style="font-size: 1.25rem">{{
                translation.QualiAssur_3_565
              }}</strong>
              <Process
                :collections="dummyCollection"
                :bag-id="'BUID-123'"
                :type-id="type"
                @fetchBags="() => {}"
                @updateId="updateId"
              />
            </div>
          </div>
        </a-card>
        <a-card
          v-if="activeTab == 'QP_PROCESS'"
          :bordered="false"
          class="mt-15 default-card inbound-accept-tabs test"
          style="width: 96%; margin-left: 2%"
        > 
          <div class="h-tabs large-tabs" style="width: 100%">
            <div>
              <strong style="font-size: 1.25rem">{{
                translation.QualiAssur_3_565
              }}</strong>
              <QPProcess :proj-id="record.projectId" :sample-puid="record.sampleId" :sample-id="record.id" :sample-name="record.sampleName" />
            </div>
          </div>
        </a-card>
      </div>
      <div>
        </div>
    </template>
  </page-layout>
</template>

<script>
import moment from 'moment'
import PageLayout from '~/components/layout/PageLayout'
import Process from '~/components/root/inventory/Process'
import { QUARANTINE_PROCESS_PHASES } from '~/services/Constant/Phases'
import { QUARANTINE_STORAGE } from '~/services/Constant'
// import shipment from '~/components/inventory/treatment/shipment'
import tabsHelpers from '~/mixins/tabs-helpers'
import routeHelpers from '~/mixins/route-helpers'
import { isEmpty } from '~/services/Helpers'
import StepServices from '~/services/API/StepServices'
import QPProcess from '~/components/root/inventory/qpProcess'
import SmartLabTasksServices from '~/services/API/SmartLabTasksServices'
import {_getFormatMoment } from '~/services/Helpers/MomentHelpers'
import SampleProcessServices from '~/services/API/SampleProcessServices'
export default {
  components: {
    'page-layout': PageLayout,
    Process, QPProcess
    // shipment,
  },
  mixins: [tabsHelpers, routeHelpers],
  middleware: 'auth',
  data() {
    return {
    moment,
      activeTab: 'inbound',
      actTabId:1,
      type: 'inbound',
      phases: QUARANTINE_PROCESS_PHASES,
      record:{},
      dummyCollection: [
        {
          id: 1,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Hasthe_8_592}`,
        },
        {
          id: 2,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Doesthe_8_593}`,
        },
        {
          id: 3,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Confithere_7_594}`,
        },
        {
          id: 4,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Confipacka_8_595}`,
        },
        {
          id: 5,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Confithe_13_596}`,
        },
        {
          id: 6,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Confino_5_597}`,
        },
        {
          id: 7,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Confithere_6_598}`,
        },
        {
          id: 8,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Confithat_12_599}`,
          alias: QUARANTINE_STORAGE,
        },
      ],
      dummyOutBoundCollection: [
        // {
        //   id: 1,
        //   isCollected: false,
        //   name: `${this.$store.getters.getTranslation.TheOutbo_5_526}`,
        // },
        {
          id: 2,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Hassampl_6_583}`,
        },
        {
          id: 3,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Doessampl_6_584}`,
        },
        {
          id: 4,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.IsSampl_6_529}`,
        },
        {
          id: 5,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Hassampl_6_585}`,
        },
        {
          id: 6,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Isdocum_9_586}`,
        },
      ],
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch: {
    translation(newValues, oldValue) {
      if (newValues !== oldValue) {
        // this.phases[0].name = newValues.InbouAccep_3_834
        // this.phases[1].name = newValues.ProceSampl_2_499
        // this.phases[2].name = newValues.StoreSampl_2_579

        /* this.dummyCollection[0].name = newValues.Hasthe_8_592
        this.dummyCollection[1].name = newValues.Doesthe_8_593
        this.dummyCollection[2].name = newValues.Confithere_7_594
        this.dummyCollection[3].name = newValues.Confipacka_8_595
        this.dummyCollection[4].name = newValues.Confithe_13_596
        this.dummyCollection[5].name = newValues.Confino_5_597
        this.dummyCollection[6].name = newValues.Confithere_6_598 */
        // this.dummyCollection[7].name = newValues.Confithat_12_599

        this.dummyOutBoundCollection[0].name = newValues.Hassampl_6_583
        this.dummyOutBoundCollection[1].name = newValues.Doessampl_6_584
        this.dummyOutBoundCollection[2].name = newValues.IsSampl_6_529
        this.dummyOutBoundCollection[3].name = newValues.Hassampl_6_585
        this.dummyOutBoundCollection[4].name = newValues.Isdocum_9_586
      }
    },
  },
  mounted() {
    this.handleActiveTab()
    this.getTranslationData()
    this.$store.commit('setSelectedMenu', [`2`])
    this.sampleStepsByTaskId()
    // this.getSteps()
  },
  methods: {
    _getFormatMoment,
    getTranslationData() {
      // this.phases[0].name = this.translation.InbouAccep_3_834
      // this.phases[1].name = this.translation.ProceSampl_2_499
      // this.phases[2].name = this.translation.StoreSampl_2_579
    },
    sampleStepsByTaskId(){
      // const actTabId=parseInt(this.activeTab)
      SmartLabTasksServices.getStepsByTaskId(this.actTabId).then((response)=>{
        console.log(response.data)
        this.phases=response.data
      })
    },
    handleActiveTab() {
      this.activeTab = this.$route.query.view
      // this.record= this.$route.query.record
      const obj=this.$route.query.record
      this.record=JSON.parse(obj)
      console.log(this.record)
      this.sampleStepsByTaskId()
      if (this.record && this.record.projectId) {
        this.checkCreated(this.record.sampleId,this.record.projectId);
      }
    },
    checkCreated(sampleId,projectId){
      SampleProcessServices.getBySampleId(sampleId).then((response)=>{
        if(isEmpty(response.data)){
          this.getSteps(projectId)
        }
        else{
          this.dummyCollection = response.data
        }
      }).catch(this.error)
    },
    getSteps(projectId){
        console.log(this.dummyCollection)
        StepServices.getByProjectId(projectId).then((response) => {
            console.log(response)
            this.dummyCollection=response.data
          })
    },
    updateId(collectionId) {
      const dumCollection = this.dummyCollection.map((collection) => {
        if (collection.id === collectionId) {
          collection.isCollected = true
        }
        return collection
      })

      this.dummyCollection = dumCollection
    },
    setActiveTav(tab) {
      this.activeTab = tab
    },
    reDirect(url) {
      if (!isEmpty(url)) {
        this.handleActiveTab()
        // this.activeTab = alias
        this.goto(url)
      }
    },
  },
}
</script>
