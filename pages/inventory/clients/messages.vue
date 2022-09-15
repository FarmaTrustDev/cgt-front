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
                  steve@novartis.com
                </span>
                <span class="float-right">22/07/2022</span>
              </div>

              <a-card class="mt-15">
                <p text-align="justify" class="font-wt message-paragraph">
                  Dear Raja,<br /><br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat. Duis aute irure dolor in reprehenderit
                  in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                  in culpa qui officia deserunt mollit anim id est laborum.
                  <br /><br />Kind Regards,
                  <br />
                  <br />
                  Dave
                </p>
              </a-card>
              <span
                type="card"
                :animated="false"
                class="float-right mt-15 btn-btn-msg-scren"
              >
                <a-button class="ml-5">Add Internal Note</a-button>
                <a-button class="ml-5">Reply</a-button>
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
            <a-card class="mt-15">
              <span class="message-heading"> Sample requested by NTU</span>
              <div>
                <span class="message-span"> Steve Harrington </span>
                <span class="message-span-light-text">
                  steve@novartis.com
                </span>
              </div>

              <a-card>
                <p text-align="justify" class="font-wt message-paragraph">
                  Dear Raja,<br /><br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </a-card>
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
          </a-tab-pane>
        </a-tabs>
      </div>
      <a-card class="ml-2 mr-2 h-tabs large-tabs mt-15">
        <span class="message-heading"> Sample requested by NTU</span>
        <div class="mt-15">
          <span class="message-span"> Steve Harrington </span>
          <span class="message-span-light-text"> steve@novartis.com </span>
          <span class="float-right">22/07/2022</span>
        </div>

        <a-card class="mt-15">
          <p text-align="justify" class="font-wt message-paragraph">
            Dear Raja,<br /><br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </a-card>
        <span
          type="card"
          :animated="false"
          class="float-right mt-15 btn-btn-msg-scren"
        >
          <a-button class="ml-5">Add Internal Note</a-button>
          <a-button class="ml-5">Reply</a-button>
          <a-button
            class="ml-5"
            @click="goto(`/inventory/clients/scheduletask`)"
            >Schedule Task</a-button
          >
          <a-button class="ml-5">Archive</a-button>
        </span>
      </a-card>
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
import Header from '~/components/inventory/clients/header.vue'
import routeHelpers from '~/mixins/route-helpers'
import PageLayout from '~/components/layout/PageLayout'
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
  mixins: [routeHelpers],
   data() {
    return {
      clientId:null,
      clientData,
      clientName:'',
      client:'',
    }
  },
  mounted() {
    this.getClientId()
  },
  methods:{
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
