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
                    {{ translation.SamplID_2_502 }}: {{record.patientEnrollmentNumber}}
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
                        <span> {{record.hospital}}</span>
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
                        <span> {{record.email}}</span>
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
                      <h6><span> +44 289 6655 </span></h6>
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
                    @click="reDirect(phase.id==1? phase.url_slug : phase.id===2 ? phase.url_slug+'&record='+JSON.stringify(record):'', phase.alias)"
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
              :record="record"
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

        <a-row :gutter="18">
        <a-col :span="10">
        <a-card :bordered="false" class="default-card details-section" style="padding-left:2px">
            
                <a-col :span="10" class="mt-15">
                <h4>
                    <strong>Company Name</strong>
                </h4>
                </a-col>
                <a-col :span="14" style="text-align: left;">
                    <a-select
                        v-decorator="[
                        'company',
                        {
                            rules: [
                            {
                                required: true,
                                message: 'Select company',
                            },
                            ],
                        },
                        ]"
                        :show-search="true"
                        placeholder="Select company name"
                        style="width: 100%; height: 60px;"
                        @select="searchCompany"
                    >
                        <a-select-option v-for="company in companyName" :key="company.companyName">
                        {{ company.companyName }}
                        </a-select-option>
                    </a-select>
                </a-col>
            
                <a-col :span="10" class="mt-15">
                <h4>
                    <strong>Address</strong>
                </h4>
                </a-col>
                <a-col :span="14">
                <a-select
                        v-decorator="[
                        'address',
                        {
                            rules: [
                            {
                                required: true,
                                message: 'Select address',
                            },
                            ],
                        },
                        ]"
                        :show-search="true"
                        placeholder="Select address name"
                        style="width: 100%; height: 60px;"
                        @blur="searchAddress"
                    >
                        <a-select-option v-for="address in addressName" :key="address.id">
                        {{ address.address }}
                        </a-select-option>
                        <!-- <a-select-option key="other" @click="addAddressModel(true)" >
                          Other
                        </a-select-option> -->
                    </a-select>
                </a-col>
                <a-col :span="10" class="mt-15">
                <h4><strong>Complete Address:</strong></h4>
                </a-col>
                <a-col :span="14" class="mt-15">
                {{ compnayAddress }}
                <a-icon v-if="!isEmpty(compnayAddress)" type="edit" @click="addAddressModel(true)" />
                
                </a-col>
        </a-card>
        </a-col>
        <a-col :span="14">
        <a-card :bordered="false" class="default-card details-section">
            <a-row>
                <a-col :span="10" class="mt-10">
                <h4>
                    <strong>Dispatch Date</strong>
                </h4>
                </a-col>
                <a-col :span="10" class="mt-10">
                <a-date-picker
                    v-decorator="[
                    'collectionDate',
                    {
                        rules: [
                        {
                            required: true,
                            message: 'Required',
                        },
                        ],
                    },
                    ]"
                    placeholder="DD/MM/YYYY"
                    format="DD/MM/YYYY"
                    style="width: 100%; height: 40px; border-radius: 25px;"
                    size="large"
                    @change="handleDateChange"
                >
                </a-date-picker>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="10" class="mt-10">
                <h4>
                    <strong>Delivery Date</strong>
                </h4>
                </a-col>
                <a-col :span="10" class="mt-10">
                <a-date-picker
                    v-decorator="[
                    'deliveryDate',
                    {
                        rules: [
                        {
                            required: true,
                            message: 'Required',
                        },
                        ],
                    },
                    ]"
                    placeholder="DD/MM/YYYY"
                    format="DD/MM/YYYY"
                    class="custom-date-picker"
                    size="large"
                    @change="handleDeliveryDateChange"
                >
                </a-date-picker>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="10" class="mt-15">
                <h4>
                    <strong>Pack Slip</strong>
                </h4>
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="10" class="mt-15">
                <a-button block type="primary" html-type="submit" style="width:100px; display: none; height:45px" @click="clickSubmit(true,'disp')">Display</a-button>
                <a-button block type="primary" html-type="submit" style="width:150px; height:45px" @click="clickSubmit(true,'print')">Display</a-button>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="10" class="mt-15">
                <h4>
                    <strong>Label</strong>
                </h4>
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="10" class="mt-15">
                <a-button block type="primary" html-type="submit" style="width:200px; display: none; height:45px;" @click="openPopViewModal(true,'disp')">Display</a-button>
                <a-button block type="primary" html-type="submit" style="width:150px; height:45px;" @click="openPopViewModal(true,'print')">Display</a-button>
                </a-col>
            </a-row>
        </a-card>
        <a-row>
            <a-col :span="10" class="mt-15">
                
            </a-col>
            
            <a-col :span="6" class="mt-15" style="margin-left: 5px;">
                <a-button block type="primary" html-type="submit" @click="collectionDate!==null && deliveryDate!==null && compnayAddress!=='' ? submitLabel() : ''" style="width:220px; height:45px">Complete</a-button>
            </a-col>
        </a-row>
        </a-col>
    </a-row>
    <a-modal
        :visible="showModal"
        class="modal-design-smart-lab-label"
        :dialog-style="{ right: '10%', top: '10%' }"
        @cancel="handelCancel(false)"
        @ok="handleOk(false)"
        >
            <a-card class="white-card-smart-lab-label">
            <a-row>
                <a-col :span="6"></a-col>
                <a-col :span="12"><img :src="getImageUrl('label/cryoheader.svg')" width="200" height="125" /></a-col>
                <a-col :span="6"></a-col>
            </a-row>
            <a-row>
                <a-col :span="10"><img :src="getImageUrl('label/qrCode.svg')" width="350" height="120" /></a-col>
                <a-col :span="14">
                <a-row>
                    <a-col>Laeuka Collection Kit</a-col>
                </a-row>
                <a-row>
                    <a-col :span="6"><img :src="getImageUrl('label/dated.svg')"> 14/12/2024</a-col>
                    <a-col :span="6"><img :src="getImageUrl('label/umbrella.svg')"> Keep Dry</a-col>
                </a-row>
                <a-row>
                    <a-col>Internal Batch No: AA234TH</a-col>
                </a-row>
                <a-row>
                    <a-col>Project Code: {{record.projectId}}</a-col>
                </a-row>
                <a-row>
                    <a-col>{{ compName }}</a-col>
                </a-row>
                <a-row>
                    <a-col>{{ compnayAddress }}</a-col>
                </a-row>
                <a-row>
                    <a-col>Cell Number: {{ cell }}</a-col>
                </a-row>
                </a-col>
            </a-row>
            <a-row>
                <a-col>&nbsp;</a-col>
            </a-row>
            <a-row>
                <a-col :span="4"></a-col>
                <a-col :span="18"><img :src="getImageUrl('label/bar.png')" width="500" height="90" /></a-col>
            </a-row>
            </a-card>
            <template v-if="labPrint" #footer>
              <a-button key="back" class="footer-btn-label footer-btn-label-cancelled no-print" @click="handelCancel(false)" >OK</a-button>
              <a-button key="submit" class="footer-btn-label no-print" type="primary" @click="printLabWindow('label')">Print</a-button>
            </template>
            <template v-else #footer>
              <a-button key="back" class="footer-btn-label footer-btn-label-cancelled no-print" @click="handelCancel(false)" >OK</a-button>
              <a-button key="submit" class="footer-btn-label no-print" type="primary" @click="handleOk(false)">OK</a-button>
            </template>
        </a-modal>
        <a-modal
        :visible="visibleAddAddress"
        title="Add New Address"
        class="support-add-modal"
        :dialog-style="{ top: '20px' }"
        :loading="loading"
        :footer="null"
        :width="600"
        @cancel="addAddressModel(false,0)"
      >
        <a-form :form="addressForm" @submit="onSubmitAddress">
          <a-row :gutter="23">
            <a-col :span="23">
              <a-form-item
                label="Complete Address *:"
                :label-col="{ span: 24 }"
                :wrapper-col="{ span: 24 }"
              >
                <a-input
                  v-decorator="[
                    'completeAddress',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input complete address',
                        },
                      ],
                    },
                  ]"
                  placeholder="Complete Address"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="23">
            <a-col :span="16"></a-col>
            <a-col :span="6">
              <FormActionButton custom-text="Update Address" :loading="loading" />
            </a-col>
          </a-row>
        </a-form>
        
      </a-modal>
          <!-- <div class="h-tabs large-tabs" style="width: 100%">
            <courierComp />
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
                  <img class="img-responsive" :src="qrUrl" />
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
          </div> -->
        </a-card>

        <a-modal
          :visible="showCourierModal"
          class="modal-design-smart-lab"
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
            
            <CustomDisplay
              :headingTitle="translation.Selecall_4_753"
              :colVal="12"
              :customDisplayData="customDisplayDataExceptionalRel"
            />
            <h2 class="mt-15">{{ translation['2.Shipp_4_761'] }}</h2>
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
            <h2 class="mt-15">{{ translation['3.Inven_2_769'] }}</h2>
            <a-row>
              <a-col :span="10"
                ><h2 class="mt-15">
                  {{ translation['4.Selec_4_770'] }}
                </h2></a-col
              >
              <a-col :span="10"
                ><h2 class="mt-15">
                  {{ translation['5.Revie_4_771'] }}
                </h2></a-col
              >
            </a-row>
            <CustomDisplay
              :headingTitle="''"
              :colVal="6"
              :customDisplayData="customDisplayDataSelectionPackage"
            />
          </a-card>
          <template v-if="kitPrint" #footer>
            <a-button class="footer-btn-label footer-btn-label-cancelled no-print" @click="handleCourierModalOk(false)">OK</a-button>
            <a-button type="primary" @click="printWindow()">Print</a-button>
          </template>
          <template v-else #footer>
            <a-button class="footer-btn-label footer-btn-label-cancelled no-print" @click="handleCourierModalOk(false)">Cancel</a-button>
            <a-button type="primary" @click="handleCourierModalOk(false)">OK</a-button>
          </template>
        </a-modal>
      </div>
    </template>
  </page-layout>
</template>

<script>
import moment from 'moment'
import PageLayout from '~/components/layout/PageLayout'
import Process from '~/components/root/inventory/Process'
import { QUARANTINE_STORAGE } from '~/services/Constant'
import imagesHelper from '~/mixins/images-helper'
// import LogisticLookup from '~/components/lookups/LogisticLookup'
import { STANDARD_UK_DATE_FORMAT } from '~/services/Constant/DateTime'
import LabelServices from '~/services/API/LabelServices'
import {
  getMomentByStandardFormat,
  _disabledPreviousDate,
} from '~/services/Helpers/MomentHelpers'
import notifications from '~/mixins/notifications'
import routeHelpers from '~/mixins/route-helpers'
import { isEmpty } from '~/services/Helpers'
import { INVENTORY_OUTBOUND_STATUS_STEPS } from '~/services/Constant/Phases'
import StatusDetail from '~/components/inventory/treatment/statusDetail'
// import courierComp from '~/components/inventory/courierComp'
import CustomDisplay from '~/components/inventory/treatment/customDisplay'
import treatmentTable from '~/components/inventory/treatment/treatmentTable'
import StepServices from '~/services/API/StepServices'
import CompanyAddressServices from '~/services/API/CompanyAddressServices'

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
    value: 'N/A',
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
    value: 'N/A',
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
    value: 'N/A',
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
    value: 'N/A',
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
    value: 'N/A',
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
    // LogisticLookup,
    StatusDetail,
    CustomDisplay,
    treatmentTable,
    // courierComp
    // shipment,
  },
  middleware: 'auth',
  mixins: [routeHelpers, notifications,imagesHelper],
  data() {
    return {
      activeTab: 'OUTBOUND_PROCESS',
      type: 'outbound',
      qrUrl: null,
      visibleAddAddress:false,
      isCreatedAddress:false,
      addressForm: this.$form.createForm(this, { name: 'equipmentForm' }),
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
      record:{},
      selectedIdex:0,
      showModalKit:false,
      compnayAddress:'',
      cell:'',
      compName:'',
      companyAddIndex:0,
      collectionDate:null,
      deliveryDate:null,
      companyName:[],
      addressName:[],
      addressNames:[
        [
          {
            id:1, name:'Birmingham', detail:'Rectory Road Sutton Coldfield, B75 7RR', phone:'+44 121 424 2000'
          }
        ],
        [
          {
            id:1, name:'Birmingham', detail:'Bordesley Green East, B9 5SS', phone:'+44 121 424 2000'
          }
        ],
        [
          {
            id:1, name:'Birmingham', detail:'Mindelsohn Way Edgbaston, B15 2GW', phone:'+44 121 627 2000'
          }
        ],
        [
          {
            id:1, name:'Birmingham', detail:'Lode Lane Solihull, B91 2JL', phone:'+44 121 424 2000'
          }
        ],
        [
          {
            id:1, name:'Nottingham', detail:'Hucknall Road, NG5 1PB', phone:'+44 115 969 1169'
          }
        ],
        [
          {
            id:1, name:'Nottingham', detail:'Lister Rd, Lenton, NG7 2FT', phone:'+44 115 919 4477'
          }
        ],
        [
          {
            id:1, name:'Nottingham', detail:'Derby Rd, Lenton,NG7 2UH', phone:'+44 115 924 9924'
          }
        ],
        [
          {
            id:1, name:'St. Louis', detail:'114 N Taylor Ave, St. Louis, MO 63108',phone:'+314 534 8600'
          },
          {
            id:2, name:'Jacksonville', detail:'4411 Sunbeam Rd, Jacksonville, FL 32257', phone:'+904 737 4852'
          },
          {
            id:3, name:'Chicago', detail:'3650 W Armitage Ave, Chicago, IL 60647', phone:'+773 772 5111'
          },
          {
            id:4, name:'Frederick', detail:'3 Hillcrest Dr STE A101, Frederick, MD 21703', phone:'+240 575 9940'
          },
          {
            id:5, name:'Staten Island', detail:'165 Vanderbilt Ave, Staten Island, NY 10304', phone:'+1 844 692 4692'
          },
          {
            id:6, name:'New York', detail:'230 W 17th St, New York, NY 10011', phone:'+212 206 5200'
          }
        ]
      ],
      isSubmit:false,
      labPrint:false,
      labDisp:false,
      kitPrint:false,
      kitDisp:false,


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
        // this.phases[2].name = newValues.Couri_1_234

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
    this.getCompany()
  },
  methods: {
    disabledDate: _disabledPreviousDate,
    isEmpty,
    handleActiveTab(view) {
      this.setActiveTab(view)
    },
    setActiveTab(view) {
      if (!isEmpty(view)) {
        this.activeTab = view
      } else {
        this.activeTab = this.$route.query.view
      }
      const obj=this.$route.query.record
      this.record=JSON.parse(obj)
      if (this.record && this.record.projectId) {
        this.getSteps(this.record.projectId);
      }      
    },
    getCompany(){
      CompanyAddressServices.getCompanies().then((response)=>{
        this.companyName=response.data
      })
    },
    searchCompany(name) {
      // this.selectedIdex=name-1
      CompanyAddressServices.getAddressesByCompany(name).then((response)=>{
        this.addressName=response.data
      })
      console.log(this.selectedIdex)
    },
    searchAddress(id){
      if(id!==undefined && id!=='other'){
        this.compnayAddress=this.addressName.find(item=>item.id===id).completeAddress
        this.cell=this.addressName.find(item=>item.id===id).phoneNo
        this.compName=this.addressName.find(item=>item.id===id).companyName
        console.log(this.compnayAddress)
      }
    },
    addAddressModel(e) {
      this.addressForm.resetFields()
      this.isCreatedAddress = false
      this.visibleAddAddress = e
    },
    onSubmitAddress(e) {
      e.preventDefault()
      this.addressForm.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          console.log(values)
          this.compnayAddress=values.completeAddress
          this.loading=false
          this.visibleAddAddress=false
          /* 
            CompanyAddressServices.createAddress(values).then((response)=>{
              success(this, { message: response.data })
                this.fetchEquipments()
                this.loading = false
                this.isCreatedAddress = false
                this.addressForm.resetFields()
            }).catch(this.error)
         */
        }
      })
    },
    submitLabel(){
      this.record=JSON.parse(this.$route.query.record)
      console.log(this.record)
      const dateParts = this.record.collectionDateDeliveryDate.split('-');
      const arrivalDates = this.parseDate(dateParts[0]);
      const expiryDates = this.parseDate(dateParts[1]);
      const obj={
        sampleId:this.record.patientEnrollmentNumber,
        sampleName:this.record.treatmentType,
        clientName:this.record.hospital,
        labelStatus:'Dispatched',
        arrivalDate:arrivalDates,
        expiryDate:expiryDates,
        company:this.compName,
        address:this.compnayAddress,
        phoneNo:this.cell,
      }
      console.log(obj)
      LabelServices.create(obj).then((response)=>{
        console.log(response)
        this.goto('/inventory/treatment')
      })
    },
    parseDate(dateStr) {
      const [day, month, year] = dateStr.split('/').map(Number);
      return new Date(year, month - 1, day); // Subtract 1 from the month since months are zero-indexed
    },
    getSteps(projectId){
        StepServices.getByProjectId(projectId).then((response) => {
            console.log(response)
            this.dummyOutBoundCollection=response.data
          })
    },
    getTranslationData() {
      this.phases[0].name = this.translation.StoreSampl_2_579
      this.phases[1].name = this.translation.OutboProce_2_514
      // this.phases[2].name = this.translation.Couri_1_234

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
    clickSubmit(val, opt) {
      console.log(customDisplayDataSelectionPackage)
      this.statusDetails[0].createdOn=moment().add(-6, 'day').format('DD/MM/YYYY')
      customDisplayDataShipInfo[3].value=moment(this.collectionDate, 'DD/MM/YYYY').format('DD/MM/YYYY')
      // customDisplayDataShipInfo[8].value=moment(this.collectionDate, 'DD/MM/YYYY').add(-1, 'day').format('DD/MM/YYYY')
      customDisplayDataSelectionPackage[4].value=moment(this.collectionDate, 'DD/MM/YYYY').add(-4, 'day').format('DD/MM/YYYY')
      customDisplayDataSelectionPackage[5].value=moment(this.collectionDate, 'DD/MM/YYYY').add(-3, 'day').format('DD/MM/YYYY')
      customDisplayDataSelectionPackage[6].value=moment(this.collectionDate, 'DD/MM/YYYY').add(-2, 'day').format('DD/MM/YYYY')
      customDisplayDataSelectionPackage[7].value=moment(this.collectionDate, 'DD/MM/YYYY').add(-1, 'day').format('DD/MM/YYYY')
      if(opt==='print'){
        this.kitPrint=true
      }else{
        this.kitPrint=false
      }
      
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
      
      this.showCourierModal = false
      // this.goto('/inventory/storage/tasks')
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
    handleDateChange(date){
            this.collectionDate=date.format('DD/MM/YYYY')
        },
        handleDeliveryDateChange(date){
            this.deliveryDate=date.format('DD/MM/YYYY')
        },
        
        handleOk() {
            this.showModal = false
        },
        handelCancel(val){
            this.showModal = val
        },
        handleKitOk() {
            this.showModalKit = false
        },
        handelKitCancel(val){
            this.showModalKit = val
        },
        openPopViewModal(val, opt) {
            if(opt==='print'){
            this.labPrint=true
            }else{
            this.labPrint=false
            }
            this.showModal = val
        },
        openPopKitViewModal(val, opt) {
            if(opt==='print'){
            this.kitPrint=true
            }else{
            this.kitPrint=false
            }
            
            this.showModal = val
        },
        printLabWindow(opt) {
            if(opt==='kit'){
            this.showModalKit = false
            }
            else{
            this.showModal = false
            }
            window.print()
        },
  },
}
</script>
