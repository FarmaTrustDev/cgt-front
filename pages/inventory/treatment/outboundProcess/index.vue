<template>
  <page-layout
    :loading="false"
    :title="translation.SamplStatu_2_509"
    class="specific container"
    :create="false"
  >
    <template slot="content">
      <div class="grey-card" style="width: 100%;">
        <div class="patient-details-page" style="margin: 0 2%">
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
                    {{ translation.SamplID_2_502 }}: DAC48694
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
                        <span> Adaptimmune</span>
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
                        <span> adaptimmune@gmail.com</span>
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
                      <h6><span> +44 12345 1234</span></h6>
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
          style="margin: 3% 2%"
        >
          <span>
            <!-- //Steps -->

            <div class="treatment-steps" style="width: 100%; margin: auto">
              <span class="step-col-large">
                <a-steps size="small" :current="1">
                  <a-step
                    v-for="phase in phases"
                    :key="phase.id"
                    :title="phase.name"
                    :class="
                      phase.id == 1
                        ? 'ant-steps-item-finish-large'
                        : phase.id == 2
                        ? 'ant-steps-item-active-blue-large'
                        : 'ant-steps-horizontal-large'
                    "
                    @click="reDirect(phase.url_slug, phase.alias)"
                  />
                </a-steps>
              </span>
            </div>
          </span>
          <!-- //Steps -->
        </a-card>

        <a-card
          v-if="activeTab == 'OUTBOUND_PROCESS'"
          :bordered="false"
          class="mt-15 default-card inbound-accept-tabs"
          style="width: 96%; margin-left: 2%"
        >
          <div class="h-tabs large-tabs" style="width: 100%; margin-left: -1%">
            <Process
              :collections="dummyOutBoundCollection"
              :bag-id="'BUID-123'"
              :type-id="type"
              :active-tab="activeTab"
              @fetchBags="() => {}"
              @updateId="updateDummyOutBoundCollectionId"
              @handleActiveTab="handleActiveTab"
            />
          </div>
        </a-card>
        <a-card
          v-if="activeTab == 'COURIER'"
          :bordered="false"
          class="mt-15 default-card inbound-accept-tabs bount_status"
          style="width: 96%; margin-left: 2%"
        >
          <div class="h-tabs large-tabs" style="width: 100%">
            <div>
              <a-skeleton :loading="loading">
                <a-table
                  :should-fetch="false"
                  :pagination="false"
                  :columns="columns"
                  :data-source="bagData"
                  class="rounded-table"
                  @clickImage="clickImage"
                >
                  <template slot="image" slot-scope="src, record">
                    <img
                      width="50"
                      class="img-responsive"
                      :src="src"
                      @click="clickImage(record)"
                    />
                  </template>
                  <template slot="print" slot-scope="print, record">
                    <a-button
                      class="print-btn"
                      type="primary"
                      size="small"
                      icon="printer"
                      @click="clickImage(record)"
                      >{{ translation.Print_1_111 }}</a-button
                    >
                  </template>
                </a-table>
              </a-skeleton>
              <a-modal
                :visible="showModal"
                :title="translation.Print_1_111"
                @cancel="handleModal(false)"
              >
                <img class="img-responsive" :src="qrUrl" />
                <template slot="footer">
                  <a-button @click="handleModal(false)">{{
                    translation.cance_1_296
                  }}</a-button>
                  <a-button @click="printWindow()">{{
                    translation.Print_1_111
                  }}</a-button>
                </template>
              </a-modal>
            </div>
            <a-form>
              <LogisticLookup />
              <a-row :gutter="16">
                <a-col :span="12">
                  <a-form-item
                    :label="translation.SamplColle_3_518"
                    class="pb-0"
                  >
                    <a-input
                      v-decorator="[
                        `treatmentId`,
                        {
                          initialValue: '',
                        },
                      ]"
                      type="hidden"
                    />

                    <a-input
                      v-decorator="[
                        `hospitalId`,
                        {
                          initialValue: '',
                        },
                      ]"
                      type="hidden"
                    />
                    <a-input
                      v-decorator="[
                        `patientId`,
                        {
                          initialValue: '',
                        },
                      ]"
                      type="hidden"
                    />
                    <a-date-picker
                      v-decorator="[
                        'collectionDate',
                        {
                          rules: [
                            {
                              required: true,
                              message:
                                'Please select your Delivery Arrival Date!',
                            },
                          ],
                        },
                      ]"
                      :format="dateFormat"
                      :disabled-date="disabledDate"
                      :placeholder="translation.SelecDate_2_633"
                      style="width: 100%"
                      size="large"
                    >
                    </a-date-picker> </a-form-item
                ></a-col>
                <a-col :span="12">
                  <a-form-item
                    :label="translation.ExpecDeliv_3_388"
                    class="pb-0"
                  >
                    <a-date-picker
                      v-decorator="[
                        'deliveryDate',
                        {
                          rules: [
                            {
                              required: true,
                              message:
                                'Please select your Delivery Arrival Date!',
                            },
                          ],
                        },
                      ]"
                      :disabled-date="disabledDate"
                      :placeholder="translation.SelecDate_2_633"
                      :format="dateFormat"
                      style="width: 100%"
                      size="large"
                    >
                    </a-date-picker> </a-form-item
                ></a-col>
              </a-row>
              <a-form-item>
                <FormActionButton
                  :loading="loading"
                  @click="clickSubmit"
                  :custom-text="translation['Submi_1_248']"
                />
                <a-modal
                  :visible="showLogisticsModal"
                  :title="translation.Confi_1_646"
                  @cancel="handleLogisticsModal(false)"
                >
                  <div>
                    <a-row>
                      <a-col :span="24">{{ translation.Areyou_8_631 }}</a-col>
                    </a-row>
                  </div>
                  <!--<img class="img-responsive" :src="qrUrl" />-->
                  <template slot="footer">
                    <a-button @click="handleLogisticsModal(false)">{{
                      translation.cance_1_296
                    }}</a-button>
                    <a-button @click="confirm(false)" type="primary">{{
                      translation.Confi_1_646
                    }}</a-button>
                  </template>
                </a-modal>
              </a-form-item>
            </a-form>
          </div>
        </a-card>

        <a-modal
          :visible="showCourierModal"
          class="modal-design-smart-lab"
          :cancel-text="'Print'"
          :ok-text="'Submit'"
          :dialog-style="{ right: '20%', top: '5%' }"
          @cancel="handleCourierModal(false)"
          @ok="handleCourierModalOk(false)"
        >
          <a-card class="grey-card-smart-lab">
            <status-detail
              :heading-title="translation.Shipm_1_756"
              :statusDetails="statusDetails"
              :status="translation.Compl_1_250"
            />
            <hr class="mt-15" />
            <h2 class="mt-15">{{ translation['1.Shipp_3_779'] }}</h2>
            <CustomDisplay
              :headingTitle="''"
              :colVal="12"
              :customDisplayData="customDisplayDataShipInfo"
            />
            <a-row>
              <a-col :span="10"
                ><h2 class="mt-15">
                  {{ translation['2.Excep_3_752'] }}
                </h2></a-col
              >
              <a-col :span="10"
                ><h2 class="mt-15">
                  {{ translation['3.Trans_3_778'] }}
                </h2></a-col
              >
            </a-row>
            <CustomDisplay
              :headingTitle="translation.Selecall_4_753"
              :colVal="12"
              :customDisplayData="customDisplayDataExceptionalRel"
            />
            <h2 class="mt-15">{{ translation['4.Shipp_4_761'] }}</h2>
            <CustomDisplay
              :headingTitle="''"
              :colVal="24"
              :customDisplayData="customDisplayDataShipperAccess"
            />
            <treatment-table
              :columns="shippingTableDataColumn"
              :dataSource="shippingTableData"
              :heading-title="''"
            />
            <h2 class="mt-15">{{ translation['5.Inven_2_769'] }}</h2>
            <a-row>
              <a-col :span="10"
                ><h2 class="mt-15">
                  {{ translation['6.Selec_4_770'] }}
                </h2></a-col
              >
              <a-col :span="10"
                ><h2 class="mt-15">
                  {{ translation['7.Revie_4_771'] }}
                </h2></a-col
              >
            </a-row>
            <CustomDisplay
              :headingTitle="''"
              :colVal="6"
              :customDisplayData="customDisplayDataSelectionPackage"
            />
          </a-card>
          <template slot="footer">
            <a-button @click="printWindow()">{{
              translation.Print_1_111
            }}</a-button>
            <a-button type="primary" @click="handleCourierModalOk(false)">{{
              translation.Submi_1_248
            }}</a-button>
          </template>
        </a-modal>
      </div>
    </template>
  </page-layout>
</template>

<script>
import PageLayout from '~/components/layout/PageLayout'
import Process from '~/components/root/inventory/Process'
import { QUARANTINE_STORAGE } from '~/services/Constant'
import LogisticLookup from '~/components/lookups/LogisticLookup'
import { STANDARD_UK_DATE_FORMAT } from '~/services/Constant/DateTime'
import {
  getMomentByStandardFormat,
  _disabledPreviousDate,
} from '~/services/Helpers/MomentHelpers'
import notifications from '~/mixins/notifications'
import routeHelpers from '~/mixins/route-helpers'
import { isEmpty } from '~/services/Helpers'
import { INVENTORY_OUTBOUND_STATUS_STEPS } from '~/services/Constant/Phases'
import StatusDetail from '~/components/inventory/treatment/statusDetail'
import CustomDisplay from '~/components/inventory/treatment/customDisplay'
import treatmentTable from '~/components/inventory/treatment/treatmentTable'

// import shipment from '~/components/inventory/treatment/shipment'
export const customDisplayDataShipInfo = [
  {
    title: '',
    value: 'Clinical Site 1',
    key: 0,
    url: '',
  },
  {
    title: '',
    value: 'Mrs Dr',
    key: 1,
    url: '',
  },
  {
    title: '',
    value: 'Text here...',
    key: 2,
    url: '',
  },
  {
    title: '',
    value: '27/06/2022',
    key: 3,
    url: '',
  },
  {
    title: '',
    value: 'CRYOPDP',
    key: 4,
    url: '',
  },
  {
    title: '',
    value: 'Cryogenic',
    key: 5,
    url: '',
  },
  {
    title: '',
    value: '07700000000',
    key: 6,
    url: '',
  },
  {
    title: '',
    value: 'Andrea Marosan',
    key: 7,
    url: '',
  },
  {
    title: '',
    value: '27/06/2023 at 14:00',
    key: 8,
    url: '',
  },
]
export const customDisplayDataSelectionPackage = [
  {
    title: '',
    value: 'Andrea Marosan',
    key: 0,
    url: '',
  },
  {
    title: '',
    value: 'QA User NJ',
    key: 1,
    url: '',
  },
  {
    title: '',
    value: 'QA User NJ',
    key: 2,
    url: '',
  },
  {
    title: '',
    value: 'Najib Rehman',
    key: 3,
    url: '',
  },
  {
    title: '',
    value: '27/06/2023 at 14:06',
    key: 4,
    url: '',
  },
  {
    title: '',
    value: '27/06/2023 at 14:09',
    key: 5,
    url: '',
  },
  {
    title: '',
    value: '27/06/2023 at 14:10',
    key: 6,
    url: '',
  },
  {
    title: '',
    value: '27/06/2023 at 14:11',
    key: 7,
    url: '',
  },
]
export const customDisplayDataExceptionalRel = [
  {
    title: '',
    value: 'S-01',
    key: 1,
    url: '',
  },
  {
    title: '',
    value: 'No',
    key: 0,
    url: 'web/icons/greenTick.png',
  },
  {
    title: '',
    value: '27/06/2023',
    key: 2,
    url: '',
  },
  {
    title: '',
    value: 'No',
    key: 3,
    url: 'web/icons/greenTick.png',
  },
  {
    title: '',
    value: 'C-02',
    key: 4,
    url: '',
  },
  {
    title: '',
    value: 'No',
    key: 5,
    url: 'web/icons/greenTick.png',
  },
  {
    title: '',
    value: '1564765136',
    key: 6,
    url: '',
  },
  {
    title: '',
    value: 'e-Signature',
    key: 7,
    url: '',
  },
]
export const customDisplayDataShipperAccess = [
  {
    title: '',
    value: 'No',
    key: 0,
    url: 'web/icons/greenTick.png',
  },
  {
    title: '',
    value: 'No',
    key: 1,
    url: 'web/icons/greenTick.png',
  },
  {
    title: '',
    value: 'No',
    key: 2,
    url: 'web/icons/greenTick.png',
  },
  {
    title: '',
    value: 'No',
    key: 3,
    url: 'web/icons/greenTick.png',
  },
]
export const shippingTableData = [
  {
    shipperType: 'CXVC1SP',
    temperature: 'Cryogenic',
    shipperID: '15641164456',
    monitorID: '165469516',
    sealType: 'Tamper Seal',
    trackingID: '1654650654165',
  },
]
export default {
  components: {
    'page-layout': PageLayout,
    Process,
    LogisticLookup,
    StatusDetail,
    CustomDisplay,
    treatmentTable,
    // shipment,
  },
  middleware: 'auth',
  mixins: [routeHelpers, notifications],
  data() {
    return {
      activeTab: 'OUTBOUND_PROCESS',
      type: 'outbound',
      qrUrl: null,
      loading: false,
      showModal: false,
      showLogisticsModal: false,
      dateFormat: STANDARD_UK_DATE_FORMAT,
      phases: INVENTORY_OUTBOUND_STATUS_STEPS,
      customDisplayDataShipInfo,
      showCourierModal: false,
      shippingTableData,
      customDisplayDataShipperAccess,
      customDisplayDataExceptionalRel,
      customDisplayDataSelectionPackage,
      shippingTableDataColumn: [
        {
          title: `${this.$store.getters.getTranslation.ShippType_2_766}`,
          dataIndex: 'shipperType',
          key: 'shipperType',
        },
        {
          title: `${this.$store.getters.getTranslation.Tempe_1_605}`,
          dataIndex: 'temperature',
          key: 'temperature',
        },
        {
          title: `${this.$store.getters.getTranslation.ShippID_2_767}`,
          dataIndex: 'shipperID',
          key: 'shipperID',
        },
        {
          title: `${this.$store.getters.getTranslation.MonitID_2_714}`,
          dataIndex: 'monitorID',
          key: 'monitorID',
        },
        {
          title: `${this.$store.getters.getTranslation.SealType_2_768}`,
          dataIndex: 'sealType',
          key: 'sealType',
        },
        {
          title: `${this.$store.getters.getTranslation['TrackID:_2_667']}`,
          dataIndex: 'trackingID',
          key: 'trackingID',
        },
      ],
      statusDetails: [
        {
          clientID: 'DAC-654',
          projectID: '123456a',
          protocolD: 'T1',
          arn: 'ARN-0633-003',
          createdBy: 'David Handerson',
          client: 'Novartis',
          project: 'Texas Test Project',
          protocol: 'Kiet Test',
          description: 'Novartis Receipt',
          createdOn: '27/06/2023',
          location: 'Cryoport - London',
        },
      ],
      bagData: [
        {
          puid: 'DAC7993',
          qrUrl:
            'https://demoapi.qmaid.co/Uploads/patient/12/qr/637882805424838187.png',
        },
      ],
      columns: [
        {
          title: `${this.$store.getters.getTranslation.Sampl_1_310}`,
          dataIndex: 'qrUrl',
          key: 'qrUrl',
          scopedSlots: { customRender: 'image' },
        },
        {
          title: `${this.$store.getters.getTranslation.SamplID_2_502}`,
          dataIndex: 'puid',
          key: 'puid',
        },
        {
          title: `${this.$store.getters.getTranslation.Print_1_111}` + ' QR',
          dataIndex: 'print',
          key: 'print',
          scopedSlots: { customRender: 'print' },
        },
      ],

      dummyCollection: [
        {
          id: 1,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Packarecei_2_518}`,
        },
        {
          id: 2,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Doespacka_6_519}`,
        },
        {
          id: 3,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Isthere_6_520}`,
        },
        {
          id: 4,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Arethere_5_587}`,
        },
        {
          id: 5,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Doesthe_9_522}`,
          alias: QUARANTINE_STORAGE,
        },
        {
          id: 6,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Isitem_7_523}`,
        },
        {
          id: 7,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Isthere_8_524}`,
        },
        {
          id: 8,
          isCollected: false,
          name: `${this.$store.getters.getTranslation.Specifreez_9_525}`,
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
        this.dummyOutBoundCollection[0].name = newValues.Hassampl_6_583
        this.dummyOutBoundCollection[1].name = newValues.Doessampl_6_584
        this.dummyOutBoundCollection[2].name = newValues.IsSampl_6_529
        this.dummyOutBoundCollection[3].name = newValues.Hassampl_6_585
        this.dummyOutBoundCollection[4].name = newValues.Isdocum_9_586

        this.dummyCollection[0].name = newValues.Packarecei_2_518
        this.dummyCollection[1].name = newValues.Doespacka_6_519
        this.dummyCollection[2].name = newValues.Isthere_6_520
        this.dummyCollection[3].name = newValues.Arethere_5_587
        this.dummyCollection[4].name = newValues.Doesthe_9_522
        this.dummyCollection[5].name = newValues.Isitem_7_523
        this.dummyCollection[6].name = newValues.Isthere_8_524
        this.dummyCollection[7].name = newValues.Specifreez_9_525

        this.columns[0].title = newValues.Sampl_1_310
        this.columns[1].title = newValues.SamplID_2_502
        this.columns[2].title = newValues.Print_1_111

        this.phases[0].name = newValues.StoreSampl_2_579
        this.phases[1].name = newValues.OutboProce_2_514
        this.phases[2].name = newValues.Couri_1_234

        this.customDisplayDataExceptionalRel[0].title = newValues.Works_1_754
        this.customDisplayDataExceptionalRel[1].title =
          newValues.ExpirProdu_2_755
        this.customDisplayDataExceptionalRel[2].title = newValues['Date:_1_664']
        this.customDisplayDataExceptionalRel[3].title =
          newValues.QuaraProdu_2_756
        this.customDisplayDataExceptionalRel[4].title =
          newValues.TransVesse_3_706
        this.customDisplayDataExceptionalRel[5].title = newValues.NotClini_4_757
        this.customDisplayDataExceptionalRel[6].title =
          newValues.ShipmTrack_3_758
        this.customDisplayDataExceptionalRel[7].title = newValues.QAExcep_3_759

        this.customDisplayDataShipperAccess[0].title =
          newValues.ClienProvi_9_762
        this.customDisplayDataShipperAccess[1].title = newValues['Other-_8_763']
        this.customDisplayDataShipperAccess[2].title =
          newValues['CXVC1-High_7_764']
        this.customDisplayDataShipperAccess[3].title = newValues['EXP-6-_7_765']

        this.customDisplayDataShipInfo[0].title = newValues.ReceiInsti_2_728
        this.customDisplayDataShipInfo[1].title = newValues.Consi_1_729
        this.customDisplayDataShipInfo[2].title = newValues.AdditInfor_2_751
        this.customDisplayDataShipInfo[3].title = newValues.PlannDate_4_731
        this.customDisplayDataShipInfo[4].title = newValues['CouriName:_2_732']
        this.customDisplayDataShipInfo[5].title = newValues.ShippTempe_2_733
        this.customDisplayDataShipInfo[6].title = newValues.CouriPhone_2_734
        this.customDisplayDataShipInfo[7].title = newValues['Initiby:_2_661']
        this.customDisplayDataShipInfo[8].title = newValues['Date:_1_664']

        this.customDisplayDataSelectionPackage[0].title =
          newValues['Selecby:_2_772']
        this.customDisplayDataSelectionPackage[1].title =
          newValues['Verifby:_2_774']
        this.customDisplayDataSelectionPackage[2].title =
          newValues.QARelea_2_776
        this.customDisplayDataSelectionPackage[3].title =
          newValues['Complby:_2_663']
        this.customDisplayDataSelectionPackage[4].title =
          newValues['Date:_1_664']
        this.customDisplayDataSelectionPackage[5].title =
          newValues['Date:_1_664']
        this.customDisplayDataSelectionPackage[6].title =
          newValues['Date:_1_664']
        this.customDisplayDataSelectionPackage[7].title =
          newValues['Date:_1_664']

        this.shippingTableDataColumn[0].title = newValues.ShippType_2_766
        this.shippingTableDataColumn[1].title = newValues.Tempe_1_605
        this.shippingTableDataColumn[2].title = newValues.ShippID_2_767
        this.shippingTableDataColumn[3].title = newValues.MonitID_2_714
        this.shippingTableDataColumn[4].title = newValues.SealType_2_768
        this.shippingTableDataColumn[5].title = newValues['TrackID:_2_667']
      }
    },
  },
  mounted() {
    this.getTranslationData()
    this.handleActiveTab()
  },
  methods: {
    disabledDate: _disabledPreviousDate,
    handleActiveTab(view) {
      this.setActiveTab(view)
    },
    setActiveTab(view) {
      if (!isEmpty(view)) {
        this.activeTab = view
      } else {
        this.activeTab = this.$route.query.view
      }
    },
    getTranslationData() {
      this.phases[0].name = this.translation.StoreSampl_2_579
      this.phases[1].name = this.translation.OutboProce_2_514
      this.phases[2].name = this.translation.Couri_1_234

      this.customDisplayDataExceptionalRel[0].title =
        this.translation.Works_1_754
      this.customDisplayDataExceptionalRel[1].title =
        this.translation.ExpirProdu_2_755
      this.customDisplayDataExceptionalRel[2].title =
        this.translation['Date:_1_664']
      this.customDisplayDataExceptionalRel[3].title =
        this.translation.QuaraProdu_2_756
      this.customDisplayDataExceptionalRel[4].title =
        this.translation.TransVesse_3_706
      this.customDisplayDataExceptionalRel[5].title =
        this.translation.NotClini_4_757
      this.customDisplayDataExceptionalRel[6].title =
        this.translation.ShipmTrack_3_758
      this.customDisplayDataExceptionalRel[7].title =
        this.translation.QAExcep_3_759

      this.customDisplayDataShipperAccess[0].title =
        this.translation.ClienProvi_9_762
      this.customDisplayDataShipperAccess[1].title =
        this.translation['Other-_8_763']
      this.customDisplayDataShipperAccess[2].title =
        this.translation['CXVC1-High_7_764']
      this.customDisplayDataShipperAccess[3].title =
        this.translation['EXP-6-_7_765']

      this.customDisplayDataShipInfo[0].title =
        this.translation.ReceiInsti_2_728
      this.customDisplayDataShipInfo[1].title = this.translation.Consi_1_729
      this.customDisplayDataShipInfo[2].title =
        this.translation.AdditInfor_2_751
      this.customDisplayDataShipInfo[3].title = this.translation.PlannDate_4_731
      this.customDisplayDataShipInfo[4].title =
        this.translation['CouriName:_2_732']
      this.customDisplayDataShipInfo[5].title =
        this.translation.ShippTempe_2_733
      this.customDisplayDataShipInfo[6].title =
        this.translation.CouriPhone_2_734
      this.customDisplayDataShipInfo[7].title =
        this.translation['Initiby:_2_661']
      this.customDisplayDataShipInfo[8].title = this.translation['Date:_1_664']

      this.customDisplayDataSelectionPackage[0].title =
        this.translation['Selecby:_2_772']
      this.customDisplayDataSelectionPackage[1].title =
        this.translation['Verifby:_2_774']
      this.customDisplayDataSelectionPackage[2].title =
        this.translation.QARelea_2_776
      this.customDisplayDataSelectionPackage[3].title =
        this.translation['Complby:_2_663']
      this.customDisplayDataSelectionPackage[4].title =
        this.translation['Date:_1_664']
      this.customDisplayDataSelectionPackage[5].title =
        this.translation['Date:_1_664']
      this.customDisplayDataSelectionPackage[6].title =
        this.translation['Date:_1_664']
      this.customDisplayDataSelectionPackage[7].title =
        this.translation['Date:_1_664']

      this.shippingTableDataColumn[0].title = this.translation.ShippType_2_766
      this.shippingTableDataColumn[1].title = this.translation.Tempe_1_605
      this.shippingTableDataColumn[2].title = this.translation.ShippID_2_767
      this.shippingTableDataColumn[3].title = this.translation.MonitID_2_714
      this.shippingTableDataColumn[4].title = this.translation.SealType_2_768
      this.shippingTableDataColumn[5].title = this.translation['TrackID:_2_667']
    },
    collectionDateChange(value, date) {
      this.form.setFieldsValue({
        deliveryDate: getMomentByStandardFormat(date).add(2, 'day'),
      })
    },
    updateId(collectionId) {
      const dumCollection = this.dummyOutBoundCollection.map((collection) => {
        if (collection.id === collectionId) {
          collection.isCollected = true
        }
        return collection
      })

      this.dummyCollection = dumCollection
    },
    updateDummyOutBoundCollectionId(collectionId) {
      const dumCollection = this.dummyOutBoundCollection.map((collection) => {
        if (collection.id === collectionId) {
          collection.isCollected = true
        }
        return collection
      })

      this.dummyOutBoundCollection = dumCollection
    },
    clickImage(record) {
      // console.log(record)
      this.qrUrl = record.qrUrl
      this.handleModal(true)
    },
    handleModal(show) {
      this.showModal = show
    },
    printWindow() {
      window.print()
    },
    clickSubmit() {
      this.showCourierModal = true
      // this.handleLogisticsModal(true)
    },
    handleLogisticsModal(show) {
      this.showLogisticsModal = show
      // console.log(this.showLogisticsModal)
    },
    handleCourierModal() {
      this.showCourierModal = false
    },
    handleCourierModalOk() {
      this.success('Submitted successfully')
      this.showCourierModal = false
      this.goto('/inventory/storage/tasks')
    },
    confirm(show) {
      this.showLogisticsModal = show
      this.success('Request sent to logistics')
    },
    reDirect(url, alias) {
      if (!isEmpty(url)) {
        this.activeTab = alias
        this.goto(url)
      }
    },
  },
}
</script>
