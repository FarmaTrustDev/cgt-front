<template>
    <div>
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
                        <a-select-option v-for="company in companyName" :key="company.id">
                        {{ company.name }}
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
                        <a-select-option v-for="address in addressName[selectedIdex]" :key="address.id">
                        {{ address.name }}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="10" class="mt-15">
                <h4><strong>Complete Address:</strong></h4>
                </a-col>
                <a-col :span="14" class="mt-15">
                {{ compnayAddress }}
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
                            message: translation.requi_1_336,
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
                            message: translation.requi_1_336,
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
                <a-col :span="14" class="mt-15">
                <a-button block type="primary" html-type="submit" style="width:100px; height:45px" @click="openPopKitViewModal(true,'disp')">Display</a-button>
                <a-button block type="primary" html-type="submit" style="width:110px; height:45px" @click="openPopKitViewModal(true,'print')">Print</a-button>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="10" class="mt-15">
                <h4>
                    <strong>Label</strong>
                </h4>
                </a-col>
                <a-col :span="10" class="mt-15">
                <a-button block type="primary" html-type="submit" style="width:100px; height:45px" @click="openPopViewModal(true,'disp')">Display</a-button>
                <a-button block type="primary" html-type="submit" style="width:110px; height:45px" @click="openPopViewModal(true,'print')">Print</a-button>
                </a-col>
            </a-row>
        </a-card>
        <a-row>
            <a-col :span="10" class="mt-15">
                
            </a-col>
            <a-col :span="5" class="mt-15">
                
            </a-col>
            <a-col :span="6" class="mt-15">
                <a-button block type="primary" html-type="submit" @click="collectionDate!==null && deliveryDate!==null && compnayAddress!=='' ? goto('/inventory/treatment'): ''" style="width:100px; height:45px">Complete</a-button>
            </a-col>
        </a-row>
        </a-col>
    </a-row>
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
            <strong>Location:</strong> {{ (addressName[selectedIdex][companyAddIndex] !== undefined) ? addressName[selectedIdex][companyAddIndex].detail : '' }}
        </a-col>
        </a-row>
        <a-row style="line-height:30px">
        <a-col :span="11">
            <strong> Hospital Name:</strong> {{ companyName[selectedIdex].name}}
        </a-col>
        <a-col :span="13">
            <strong> Number of boxes:</strong> 01
        </a-col>
        </a-row>
        </a-card>
        <template v-if="kitPrint" #footer>
        
        <a-button key="back" class="footer-btn-label footer-btn-label-cancelled no-print" @click="handelKitCancel(false)" >Cancel</a-button>
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
                    <a-col>Project Code: {{projectId}}</a-col>
                </a-row>
                <a-row>
                    <a-col>{{ companyName[selectedIdex].name}}</a-col>
                </a-row>
                <a-row>
                    <a-col>{{ (addressName[selectedIdex][companyAddIndex] !== undefined) ? addressName[selectedIdex][companyAddIndex].detail : '' }}</a-col>
                </a-row>
                <a-row>
                    <a-col>Cell Number: +1 206 203 5278</a-col>
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
            
            <a-button key="back" class="footer-btn-label footer-btn-label-cancelled no-print" @click="handelCancel(false)" >Cancel</a-button>
            <a-button key="submit" class="footer-btn-label no-print" type="primary" @click="printWindow('label')">Print</a-button>
            </template>
        </a-modal>
    </div>
</template>
<script>
  import moment from 'moment'
  import routeHelpers from '~/mixins/route-helpers'
  import { isEmpty } from '~/services/Helpers'
  import imagesHelper from '~/mixins/images-helper'
  import kitImgColl from '~/components/cards/kitImgColl'
  export default {
    components: {kitImgColl},
    mixins: [routeHelpers,imagesHelper],
    middleware: 'auth',
    props: {
        pickList: { type: Object, default: () => ({}), required: true },
        reDirectAddress: {type: String, required:true},
        projectId:{type:String, record:true}
    },
    data(){
        return{
            moment,
            selectedIdex:0,
            showModalKit:false,
            compnayAddress:'',
            companyAddIndex:0,
            collectionDate:null,
            deliveryDate:null,
            companyName:[
            {id:1, name:'Good Hope Hospital'}, 
            {id:2, name:'Heartlands Hospital'},
            {id:3, name:'Queen Elizabeth Hospita'},
            {id:4, name:'Solihull Hospital'},
            {id:5, name:'Nottingham University Hospitals NHS Trust'},
            {id:6, name:'Nottingham NHS Treatment Centre'},
            {id:7, name:'Be The Match'},
            ],
            addressName:[
            [
                {
                id:1, name:'Birmingham', detail:'Rectory Road Sutton Coldfield, B75 7RR'
                }
            ],
            [
                {
                id:1, name:'Birmingham', detail:'Bordesley Green East, B9 5SS'
                }
            ],
            [
                {
                id:1, name:'Birmingham', detail:'Mindelsohn Way Edgbaston, B15 2GW'
                }
            ],
            [
                {
                id:1, name:'Birmingham', detail:'Lode Lane Solihull, B91 2JL'
                }
            ],
            [
                {
                id:1, name:'Nottingham', detail:'Hucknall Road, NG5 1PB'
                }
            ],
            [
                {
                id:1, name:'Nottingham', detail:'Lister Rd, Lenton, NG7 2FT'
                }
            ],
            [
                {
                id:1, name:'St. Louis', detail:'114 N Taylor Ave, St. Louis, MO 63108'
                },
                {
                id:2, name:'Jacksonville', detail:'4411 Sunbeam Rd, Jacksonville, FL 32257'
                },
                {
                id:3, name:'Chicago', detail:'3650 W Armitage Ave, Chicago, IL 60647'
                },
                {
                id:4, name:'Frederick', detail:'3 Hillcrest Dr STE A101, Frederick, MD 21703'
                },
                {
                id:5, name:'Staten Island', detail:'165 Vanderbilt Ave, Staten Island, NY 10304'
                },
                {
                id:6, name:'New York', detail:'230 W 17th St, New York, NY 10011'
                }
            ]
            ],
            isSubmit:false,
            labPrint:false,
            labDisp:false,
            kitPrint:false,
            kitDisp:false,
        }
    },
    methods: {
        isEmpty,
        handleDateChange(date){
            this.collectionDate=date.format('DD/MM/YYYY')
        },
        handleDeliveryDateChange(date){
            this.deliveryDate=date.format('DD/MM/YYYY')
        },
        searchCompany(name) {
            this.selectedIdex=name-1
            console.log(this.selectedIdex)
        },
        searchAddress(name){
            if(name!==undefined){
            this.companyAddIndex=name-1
            this.compnayAddress=this.addressName[this.selectedIdex][this.companyAddIndex].detail
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
        printWindow(opt) {
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