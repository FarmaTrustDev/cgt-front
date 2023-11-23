<template>
    <page-layout
      :loading="false"
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
                      Kit ID: {{record.sampleId}}
                    </figcaption>
                  </figure>
                </a-card>
              </a-col>
              <a-col :span="18">
                <a-card :bordered="false" class="default-card details-section">
                  <article class="article">
                    <h2 class="heading pl-0">
                      Dispatch Details
                    </h2>
                  </article>
                  <div>
                    <a-row :gutter="20" dir="ltr">
                      <a-col :span="5" class="mt-15">
                        <h6>
                          <span class="text-muted">
                            Client Name:
                          </span>
                        </h6>
                      </a-col>
                      <a-col :span="7" class="mt-15">
                        <h6>
                          <span> {{ record.clientName}}</span>
                        </h6>
                      </a-col>
                      <a-col :span="5" class="mt-15">
                        <h6>
                          <span class="text-muted"
                            >Kit Type:</span
                          >
                        </h6>
                      </a-col>
                      <a-col :span="7" class="mt-15">
                        <h6><span>{{record.sampleName}}</span></h6>
                      </a-col>
                    </a-row>
                    <a-row :gutter="20" dir="ltr">
                      <a-col :span="5" class="mt-15">
                        <h6>
                          <span class="text-muted">
                            {{ translation.Email_1_511 }}:</span
                          >
                        </h6>
                      </a-col>
                      <a-col :span="7" class="mt-15">
                        <h6>
                          <span> info@gmail.com</span>
                        </h6>
                      </a-col>
                      <a-col :span="5" class="mt-15">
                        <h6>
                          <span class="text-muted"
                            >Ref:</span
                          >
                        </h6>
                      </a-col>
                      <a-col :span="7" class="mt-15">
                        <h6><span>TAC8838G</span></h6>
                      </a-col>
                    </a-row>
                    <a-row :gutter="20" dir="ltr">
                      <a-col :span="5" class="mt-15">
                        <h6>
                          <span class="text-muted">
                            {{ translation.Phone_1_63 }}:</span
                          >
                        </h6>
                      </a-col>
                      <a-col :span="7" class="mt-15">
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
                  <a-steps size="small" :current="2">
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
                      :status="
                        phase.id == 1 ? 'finish' : phase.id == 2 ? 'wait' : ''
                      "
                      @click="reDirect(phase.id===2? phase.url_slug+'?record='+JSON.stringify(record) : '', phase.alias)"
                    />
                  </a-steps>
                </span>
              </div>
              <!-- //Steps -->
            </span>
          </a-card>
          <a-card
            v-if="isSubmit"
            :bordered="false"
            class="mt-15 default-card inbound-accept-tabs"
            style="width: 96%; margin-left: 2%"
          >
          <div><h4 class="heading pl-0"><strong>Dispatch Details</strong></h4></div>
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
                        <a-button block type="primary" html-type="submit" style="width:100px; height:45px; display: none;" @click="openPopKitViewModal(true,'disp')">Display</a-button>
                        <a-button block type="primary" html-type="submit" style="width:150px; height:45px" @click="openPopKitViewModal(true,'print')">Display</a-button>
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
                        <a-button block type="primary" html-type="submit" style="width:100px; height:45px; display: none;" @click="openPopViewModal(true,'disp')">Display</a-button>
                        <a-button block type="primary" html-type="submit" style="width:150px; height:45px" @click="openPopViewModal(true,'print')">Display</a-button>
                      </a-col>
                    </a-row>
                </a-card>
                <a-row>
                    <a-col :span="10" class="mt-15">
                       
                    </a-col>
                    
                    <a-col :span="6" class="mt-15">
                        <a-button block type="primary" html-type="submit" @click="collectionDate!==null && deliveryDate!==null && compnayAddress!=='' ? submitLabel() : ''" style="width:220px; height:45px">Complete</a-button>
                    </a-col>
                </a-row>
              </a-col>
            </a-row>






          </a-card>
          
          <a-card
            v-else
            :bordered="false"
            class="mt-15 default-card inbound-accept-tabs"
            style="width: 96%; margin-left: 2%"
          >
            <div><h4 class="heading pl-0"><strong>Pick List</strong></h4></div>
            <div class="collection-processing-steps" style="margin-top:10px">
                <a-form :form="form" layout="horizontal">
                    <a-table
                        :columns="columns"
                        :row-key="(record) => record.id"
                        :data-source="pickList"
                        :pagination="false"
                        :loading="loading"
                        class="borderless-table rounded-table"
                    >
                        <template slot="collected" slot-scope="item, row">
                        <!-- {{ row }} -->
                        <a-form-item class="mt-5" style="height: 20px;">
                            <a-switch
                            v-if="!row.isCollected"
                            v-decorator="[
                                `collection[id-${row.id}][collect]`,
                                {
                                initialValue: row.isCollected,
                                valuePropName: 'checked',
                                rules: [
                                    {
                                    required: false,
                                    message: promptMessage,
                                    },
                                ],
                                },
                            ]"
                            :checked-children="translation.yes_1_654"
                            :un-checked-children="translation.no_1_656"
                            @change="(value) => handleCheck(value, row.id)"
                            />

                            <a-icon
                            v-else
                            class="text-success"
                            style="font-size: 1rem;"
                            type="check"
                            ></a-icon>
                        </a-form-item>
                        </template>
                        <template slot="notes" slot-scope="item, row" >
                        <a-form-item class="mtminus-2" style="height: 20px;">
                            <a-input
                            v-if="!row.isCollected"
                            v-decorator="[
                                `collection[id-${row.id}][notes]`,
                                {
                                initialValue: row.notes,
                                rules: [
                                    {
                                    required: !notesRequired[row.id],
                                    message: promptMessage,
                                    },
                                ],
                                },
                            ]"
                            :placeholder="translation.Enternote_3_588"
                            @blur="(e) => handleInput(row.id,e)"
                            />
                            <span v-else>{{ row.notes }}</span>
                            <a-input
                            v-decorator="[
                                `collection[id-${row.id}][id]`,
                                {
                                initialValue: row.id,
                                },
                            ]"
                            type="hidden"
                            />
                        </a-form-item>
                        </template>
                        <template slot="itemName" slot-scope="itemName, row" >
                            <div :style="getColor(row.color)" style="display: flex; align-items: left;">
                                <a-col style="height: 60px;">
                                    <div style="display: flex; align-items: center; padding-left: 10px; height: 60px;">
                                        <img :src="getImageUrl(row.url)" style="height: 50px; width: 60px; padding-left: 5px; padding-top: 5px;">
                                        <span style="margin-left: 5px; margin-top: -2px;">{{ row.item }}</span>
                                    </div>
                                </a-col>
                            </div>
                        </template>
                        <template slot="serialNo" slot-scope="serialNo, row" >
                            <div class="mtminus-2">{{ row.serialNo }}</div>
                        </template>
                        <template slot="expiryDate" slot-scope="expiryDate, row" >
                            <div class="mtminus-2">{{ row.expiryDate }}</div>
                        </template>
                    </a-table>

                    <a-form-item class="mt-15">
                    <FormActionButton
                        :disabled="buttonEnable"
                        :text="translation['Submi_1_248']"
                        @click="submit"
                        :loading="loading"
                    />
                    </a-form-item>
                </a-form>
            </div>
          </a-card>
          <a-modal
            :visible="showModalKit"
            class="modal-design-smart-lab-label"
            :dialog-style="{ right: '10%', top: '10%' }"
            @cancel="handelKitCancel(false)"
            @ok="handleKitOk(false)"
          >
          <a-row>
            <h2>
              <strong>Package Details</strong>
            </h2>
          </a-row>
          <a-row>
            <a-col :span="4" style="margin-left:-52px">
              <img :src="getImageUrl('label/qrCode.svg')" width="200" height="80" />
            </a-col>
            <a-col :span="20" style="margin-left:42px">
              <a-row style="line-height:30px">
                <a-col :span="14">
                  Expected Receipt Date: <strong> {{deliveryDate}} at 13:00</strong>
                </a-col>
                <a-col :span="10">
                  Lot number: <strong> ABC1</strong>
                </a-col>
              </a-row>
              <a-row style="line-height:30px">
                <a-col :span="14">
                  Item Master: <strong> IC-SPC-003</strong>
                </a-col>
                <a-col :span="10">
                  Client Ref. <strong> UY234</strong>
                </a-col>
              </a-row>
              <a-row style="line-height:30px">
                <a-col :span="14">
                  Description: <strong> Lauka Kit</strong>
                </a-col>
                <a-col :span="10">
                  Quantity:<strong> 01</strong>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-row>
            <h2>
              <strong>Information</strong>
            </h2>
            <h2>
              Cryoportal Number: 123456789-1234-87654321
            </h2>
          </a-row>
          <a-card
            :bordered="false"
            class="mt-15 default-card inbound-accept-tabs"
            style="width: 96%; margin-left: 2%"
          >
          <a-row>
            <h2>
              <strong>Package Details</strong>
            </h2>
          </a-row>
          <a-row>
            <kitImgColl 
                v-for="(c, index) in pickList" 
                :key="index" 
                :detail="c"
            >
            {{ c }}
              <span slot="extra">
                <span><img :src="getImageUrl(c.url)"></span>
              </span>
            
              <!-- :img-properties="{ width: '50px', height: '50px' }" -->
            </kitImgColl>
          </a-row>
          <a-row style="line-height: 30px; margin-top: 25px;">
            <a-col>
              <h2>
                <strong>Delivery Details</strong>
              </h2>
            </a-col>
          </a-row>
          <a-row style="line-height:30px">
            <a-col :span="11">
              <strong>Number of items:</strong> 9
            </a-col>
            <a-col :span="13">
              <strong>Project:</strong> BayState USA IN89873
            </a-col>
          </a-row>
          <a-row style="line-height:30px">
            <a-col :span="11">
              <strong> Pack Completion Date:</strong> {{ moment(collectionDate, 'DD/MM/YYYY').add(-2, 'day').format('DD/MM/YYYY') }}
            </a-col>
            <a-col :span="13">
              <strong>Location:</strong> {{ compnayAddress }}
            </a-col>
          </a-row>
          <a-row style="line-height:30px">
            <a-col :span="11">
              <strong> Hospital Name:</strong> {{ compName }}
            </a-col>
            <a-col :span="13">
              <strong> Number of boxes:</strong> 01
            </a-col>
          </a-row>
          </a-card>
          <template v-if="kitPrint" #footer>
            
            <a-button key="back" class="footer-btn-label footer-btn-label-cancelled no-print" @click="handelKitCancel(false)" >OK</a-button>
            <a-button key="submit" class="footer-btn-label no-print" type="primary" @click="printWindow('kit')">Print</a-button>
          </template>
          </a-modal>
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
                <a-button key="submit" class="footer-btn-label no-print" type="primary" @click="printWindow('label')">Print</a-button>
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
        </div>
      </template>
    </page-layout>
  </template>
  
  <script>
  import moment from 'moment'
  import PageLayout from '~/components/layout/PageLayout'
  import { KIT_COLLECTION_PHASES } from '~/services/Constant/Phases'
  import tabsHelpers from '~/mixins/tabs-helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import { isEmpty } from '~/services/Helpers'
  import imagesHelper from '~/mixins/images-helper'
  import LabelServices from '~/services/API/LabelServices'
  import kitImgColl from '~/components/cards/kitImgColl'
  import CompanyAddressServices from '~/services/API/CompanyAddressServices'
  export default {
    components: {'page-layout': PageLayout,kitImgColl},
    mixins: [tabsHelpers, routeHelpers,imagesHelper],
    middleware: 'auth',
    data() {
      return {
        moment,
        visibleAddAddress:false,
        isCreatedAddress:false,
        addressForm: this.$form.createForm(this, { name: 'equipmentForm' }),
        btnLoading: false,
        loading: false,
        buttonEnable: false,
        notesRequired: {},
        noteItem:[],
        showModal:false,
        selectedIdex:0,
        showModalKit:false,
        compnayAddress:'',
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
        columns: [
            {
            title: `Items`,
            dataIndex: 'item',
            width: '30%',
            scopedSlots: { customRender: 'itemName' },
            },
            {
            title: `Serial No.`,
            dataIndex: 'serialNo',
            key:'serialNo',
            scopedSlots: { customRender: 'serialNo' },
            },
            {
            title: `Expiry Date`,
            dataIndex: 'expiryDate',
            key:'expiryDate',
            scopedSlots: { customRender: 'expiryDate' },
            },
            {
            title: `${this.$store.getters.getTranslation.Notes_1_350}`,
            dataIndex: 'notes',
            scopedSlots: { customRender: 'notes' },
            },
            {
            title: `Scanned`,
            dataIndex: 'collected',
            scopedSlots: { customRender: 'collected' },
            },
        ],

        formLayout: 'vertical',
        form: this.$form.createForm(this, {
            name: 'bagCollectionProcess',
        }),
        activeTab: 'KIT_BUILDER',
        type: 'inbound',
        phases: KIT_COLLECTION_PHASES,
        record:{},
        pickList: [
        {
          id: 1,
          item: 'Tubes',
          serialNo: '12345',
          expiryDate: '14/09/2025',
          color:'#F5636342',
          url:'web/inventory/tubes.svg',
        },
        {
          id: 2,
          item: 'Needles',
          serialNo: '234567',
          expiryDate: '14/08/2025',
          color:'#2F78E3',
          url:'web/inventory/needles.svg',
        },
        {
          id: 3,
          item: 'Masks',
          serialNo: '352683',
          expiryDate: '14/07/2025',
          color:'#FFFBD4',
          url:'web/inventory/masks.svg',
        },
        {
          id: 4,
          item: 'Plasters',
          serialNo: '837582',
          expiryDate: '14/10/2025',
          color:'#CDF4DC',
          url:'web/inventory/plaster.svg',
        },
        {
          id: 5,
          item: 'Gloves',
          serialNo: '374826',
          expiryDate: '14/12/2024',
          color:'#FFDBB0',
          url:'web/inventory/gloves.svg',
        },
        {
          id: 6,
          item: 'Liquid bags',
          serialNo: '836837',
          expiryDate: '14/06/2025',
          color:'#98DCBC',
          url:'web/inventory/liquid.svg',
        },
        {
          id: 7,
          item: 'Antiseptic wipes',
          serialNo: '264725',
          expiryDate: '14/09/2025',
          color:'#D06DFF42',
          url:'web/inventory/antiseptic.svg',
        },
        {
          id: 8,
          item: 'Containers',
          serialNo: '284612',
          expiryDate: '14/09/2025',
          color:'#D298FF',
          url:'web/inventory/container.svg',
        },
        {
          id: 9,
          item: 'Labels',
          serialNo: '987653',
          expiryDate: '14/09/2025',
          color:'#FFA9A9',
          url:'web/inventory/label.svg',
        },
      ],
      filledData:0,
        
        promptMessage:`${this.$store.getters.getTranslation.Pleasinput_4_578}`,
        
      }
    },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    mounted() {
      this.handleActiveTab()
      // this.getTranslationData()
      this.$store.commit('setSelectedMenu', [`2`])
      this.getCompany()
      // this.getSteps()
    },
    methods: {
      isEmpty,
      handleActiveTab() {
        this.activeTab = this.$route.query.view
        // this.record= this.$route.query.record
        const obj=this.$route.query.record
        this.record=JSON.parse(obj)
      },
      handleDateChange(date){
        this.collectionDate=date.format('DD/MM/YYYY')
      },
      handleDeliveryDateChange(date){
        this.deliveryDate=date.format('DD/MM/YYYY')
      },
      /* searchCompany(name) {
        this.selectedIdex=name-1
        console.log(this.selectedIdex)
      }, */
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
      /* searchAddress(name){
        if(name!==undefined){
          this.companyAddIndex=name-1
          this.compnayAddress=this.addressName[this.selectedIdex][this.companyAddIndex].detail
        }
      }, */
      handleInput(rowId,e) {
      if(this.noteItem.includes(rowId)){
        this.noteItem.splice(this.noteItem.indexOf(rowId),1);
        this.filledData=this.filledData - 1
      }
      if(this.filledData<0){
        this.filledData=0
      }
      if(!this.notesRequired[rowId] && e.target.value!==null){
        // console.log(this.noteItem)
        this.noteItem.push(rowId)
        this.filledData=this.filledData + 1
        // this.sendData(this.filledData)
      }
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
    getColor(color){
        return {
          backgroundColor: color, // Set another background color for a different condition
          height: '60px',
          borderRadius: '10px',
          marginLeft:'20px'
        };
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
        
        this.showModalKit = val
      },
      handleCheck(value, rowId,alias) {
      // console.log(alias)
      const notesRequired = this.notesRequired
      notesRequired[rowId] = value
      this.notesRequired = notesRequired
      if(value===true){
        this.filledData=this.filledData+1
      }else{
        this.filledData=this.filledData-1
      }
      if(this.filledData<0){
        this.filledData=0
      }
      // this.sendData(this.filledData)
    },
    submit() {
      this.form.validateFields((err,values)=>{
        if(!err){
            this.isSubmit=true
        }
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
      printWindow(opt) {
        if(opt==='kit'){
          this.showModalKit = false
        }
        else{
          this.showModal = false
        }
        window.print()
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
  <style scoped>
  .borderless-table {
    border: none; /* Remove the border */
  }
  .a-date-picker.custom-date-picker {
    border-radius: 10px; /* Adjust the border-radius value as needed */
  }
  .green-background {
    background-color: green;
  }
  
  .red-background {
    background-color: red;
  }
  </style>