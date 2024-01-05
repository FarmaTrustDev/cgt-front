<template>
  <page-layout
    :create="false"
    :loading="false"
    :bordered="false"
    class="specific-storage container"
  >
    <div slot="content">
      <div class="h-tabs large-tabs" style="margin-left: 2%">
        <Header :url="'web/inventory/storage/hub/clients/'+clientId+'.png'" :clientNames="clientName" :client="client" :show-button="false" />
        <a-input-search
          placeholder="Search"
          class="search-field-msg-x inventory-search pt-15 float-right"
        />
        <!-- <a-icon slot="prefix" type="search" /> -->

        <a-tabs type="card" :animated="false" class="client_msgs mt-15">
          <a-tab-pane key="1" tab="All">
            <a-card class="mt-15 mr-30">
              <span class="message-heading"> Sample requested by NTU</span>
              <div class="mt-15">
                <span class="message-span"> Steve Harrington </span>
                <span class="message-span-light-text">
                  steve@{{client.toLowerCase()}}.com
                </span>
                <span class="float-right"> {{moment(_getFutureMomentStandardFormatted(-1,'day')).format('DD/MM/YYYY') }} </span>
              </div>

              <a-card class="mt-15">
                
                  <p class="font-wt message-paragraph">
                  Dear Chris,<br />
                  </p>
                  <p class="font-wt message-paragraph" style="text-align:justify">
                  We need to get a variety of different samples to NTU as a matter of urgency. These include the samples that are in storage.
                  </p>
                  <p class="font-wt message-paragraph" style="text-align:justify">
                  We also need some cell collection kits to get to Prof John Adamson in the same shipment as they are now running quite low. We need those to include blood collection kits which include our Category A kits. I have checked the portal and we have enough supplies to ensure we can make both category A and B samples so could you sent 20 collection kits for me please.
                  Please let me know if there are any issues and I will follow up in the portal chat.
                  </p>
                  <br />
                  <p class="font-wt message-paragraph">
                  Thanks,
                  </p>
                  <p class="font-wt message-paragraph">
                  Steve
                  </p>
                
              </a-card>
              <span
                type="card"
                :animated="false"
                class="float-right mt-15 btn-btn-msg-scren"
              >
                <a-button class="ml-5">Add Internal Note</a-button>
                <a-button class="ml-5" @click="showM()">Reply</a-button>
                <a-button
                  class="ml-5"
                  @click="goto(`/inventory/clients/scheduletask?clientName=`+client)"
                  >Schedule Task</a-button
                >
                <a-button class="ml-5">Archive</a-button>
              </span>
            </a-card>
            <a-card class="mt-15 mr-30">
        <span class="message-heading"> Sample requested by NTU</span>
        <div class="mt-15">
          <span class="message-span"> Andrew Jacob </span>
          <span class="message-span-light-text"> jacob@{{client.toLowerCase()}}.com </span>
          <span class="float-right">{{moment(_getFutureMomentStandardFormatted()).format('DD/MM/YYYY') }}</span>
        </div>

        <a-card class="mt-15">
          <p text-align="justify" class="font-wt message-paragraph">
            Dear Taylor,<br />
          </p>  
                <p class="font-wt message-paragraph" style="text-align:justify">
                  We've received your shipment including sample ID: DAC13248, However, there were some unnamed samples in the box. Can you send over their ID details please?
                </p>
                  
                  <p class="font-wt message-paragraph">
                  Thanks,
                  </p>
                  <p class="font-wt message-paragraph">
                  Jacob      
                  </p>
        </a-card>
        <span
          type="card"
          :animated="false"
          class="float-right mt-15 btn-btn-msg-scren"
        >
          <a-button class="ml-5">Add Internal Note</a-button>
          <a-button class="ml-5" @click="showM()">Reply</a-button>
          <a-button
            class="ml-5"
            @click="goto(`/inventory/clients/scheduletask`)"
            >Schedule Task</a-button
          >
          <a-button class="ml-5">Archive</a-button>
        </span>
      </a-card>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Archived">
            <a-card class="mt-15 mr-30">
              <span class="message-heading"> Sample requested by NTU</span>
              <div class="mt-15">
                <span class="message-span"> Steve Harrington </span>
                <span class="message-span-light-text">
                  steve@{{client.toLowerCase()}}.com
                </span>
              </div>

              <a-card class="mt-15">
                <p class="font-wt message-paragraph" style="text-align:justify">
                  Dear Chris,<br /><br />
                </p>
                <p class="font-wt message-paragraph" style="text-align:justify">
                  We're planning a new research project which will require approximately 4 freezers worth of storage at -80°C. Do you have the capacity for that?
                </p>
                <p class="font-wt message-paragraph">
                  Thanks,
                  </p>
                  <p class="font-wt message-paragraph">
                  Steve      
                  </p>
              </a-card>
              <a-tabs
                type="card"
                :animated="false"
                class="float-right mt-15 btn-btn-msg-scren"
              >
                <a-tab-pane tab="Add Internal Note"></a-tab-pane>
                <a-tab-pane tab="Reply"></a-tab-pane>
                <a-tab-pane tab="Schedule Tasks"></a-tab-pane>
                <a-tab-pane tab="Archive"></a-tab-pane>
              </a-tabs>
            </a-card>
            <a-card class="mt-15 mr-30">
        <span class="message-heading"> Sample requested by NTU</span>
        <div class="mt-15">
          <span class="message-span"> Andrew Jacob </span>
          <span class="message-span-light-text"> jacob@{{client.toLowerCase()}}.com </span>
          <span class="float-right">22/07/2022</span>
        </div>

        <a-card class="mt-15">
          <p text-align="justify" class="font-wt message-paragraph">
            Dear Taylor,<br />
          </p>  
                <p class="font-wt message-paragraph" style="text-align:justify">
                  We've received a carton containing 100 vials of PSCs, however, there are 20 vials more than we expected. Can you confirm that these are all PSCs?
                </p>
                  
                  <p class="font-wt message-paragraph">
                  Thanks,
                  </p>
                  <p class="font-wt message-paragraph">
                  Jacob      
                  </p>
        </a-card>
        <a-tabs
                type="card"
                :animated="false"
                class="float-right mt-15 btn-btn-msg-scren"
              >
                <a-tab-pane tab="Add Internal Note"></a-tab-pane>
                <a-tab-pane tab="Reply"></a-tab-pane>
                <a-tab-pane tab="Schedule Tasks"></a-tab-pane>
                <a-tab-pane tab="Archive"></a-tab-pane>
              </a-tabs>
      </a-card>
          </a-tab-pane>
        </a-tabs>
      </div>
      <a-modal
            :visible="showModal"
            class="modal-design-smart-lab-label"
            :dialog-style="{ right: '10%', top: '10%' }"
            @cancel="handelCancel(false)"
            @ok="handleOk(false)"
          >
              <a-card class="white-card-smart-lab-label">
                
        
        <a-col :span="24">
          <a-form-item>
            <a-textarea
      v-model="textareaValue"
      :rows="20"
      placeholder="Write email here"
      :auto-size="{ minRows: 20, maxRows: 20 }"
    ></a-textarea>
          </a-form-item>
        </a-col>                
              </a-card>
              <div slot="footer">
                <a-button @click="handelCancel(false)">{{translation.cance_1_296}}</a-button>
                <a-button type="primary" @click="handleOk(false)">Send Email</a-button>

      </div>
          </a-modal>
    </div>
  </page-layout>
  <!-- <div>
      <p>
        <a-card class="mt-15">
          <a-descriptions title="Sample requested by NTU">
            <a-descriptions-item label="Steve Harrington">
              steve@novartis.com
            </a-descriptions-item>
          </a-descriptions>
          <a-card>
            <p text-align="justify" class="font-wt">
              Dear Raja,<br /><br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </a-card>
          <p>
            <br /><br />Kind Regards,
            <br />
            <br />
            Dave
          </p>
          <a-tabs
            type="card"
            :animated="false"
            class="float-right message-scr-tabs"
          >
            <a-tab-pane tab="add internal note"></a-tab-pane>
            <a-tab-pane tab="reply"></a-tab-pane>
            <a-tab-pane tab="schedule tasks"></a-tab-pane>
            <a-tab-pane tab="archive"></a-tab-pane>
          </a-tabs>
        </a-card>
      </p>
    </div> -->
</template>
<script>
import moment from 'moment'
import Header from '~/components/inventory/clients/header.vue'
import notifications from '~/mixins/notifications'
import routeHelpers from '~/mixins/route-helpers'
import PageLayout from '~/components/layout/PageLayout'
import {
  _getFormatMoment,
  getMomentByStandardFormat,
} from '~/services/Helpers/MomentHelpers'
import { _getFutureMomentStandardFormatted } from '~/services/Helpers/MomentHelpers'
export const clientData = [
  {
    title: 'Adaptimmune',
    value: 'Adam Holioc',
    key:1,
  },
  {
    title: 'TCR',
    value: 'Andrew Symond',
    key:2,
  },
  {
    title: 'gsk',
    value: 'Mc GIll',
    key:3,
  },
  {
    title: 'ANTHONY',
    value: 'Richardson',
    key:4,
  },  
  {
    title: 'Kite',
    value: 'Viv Richard',
    key:5,
  },
  {
    title: 'Novartis',
    value: 'Shaun Pollak',
    key:6,
  },  
]
export default {
  components: { Header, PageLayout },
  mixins: [routeHelpers,notifications],
   data() {
    return {
      clientId:null,
      clientData,
      clientName:'',
      client:'',
      showModal:false,
    }
  },
  mounted() {
    this.getClientId()
  },
  methods:{
    _getFormatMoment,
    moment,
    getMomentByStandardFormat,
    _getFutureMomentStandardFormatted,
    handleOk() {
        this.showModal = false
        this.success('Email sent successfully')
      },
      handelCancel(val){
        this.showModal = val
      },
      showM(){
        this.showModal=true
      },
    getClientId(){
      this.clientId=this.$route.query.clientId
      for(const i in this.clientData ){
        if(this.clientData[i].key===parseInt(this.clientId)){
          this.clientName=this.clientData[i].value
          this.client=this.clientData[i].title
        }
      }
    },
  }, 
}
</script>
