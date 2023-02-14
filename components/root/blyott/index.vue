<template>
    <div class="home-page">
      <a-row>
        <a-col :span="24" :xs="24" :md="24" :sm="24" :lg="24" :xl="24">
          <a-card class="grey-card smartlab_home" :bordered="false">
            <a-row>
              <!-- left side tabs -->
              <a-col :md="11" :lg="11">
                <a
                  href="javascript:;"
                  @click="handleSidebarKey('blyott/asset', 2)"
                >
                  <div class="home-tab mt-0">
                    <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/note-board-scheduling.svg"
                      width="120"
                      height="100"
                    />
                    <h4 class="heading-home">
                      Manage
                      <strong class="strong">
                        Assets
                      </strong>
                    </h4>
                  </div>
                </a>
  
                <a
                  href="javascript:;"
                  @click="handleSidebarKey(`blyott/tag`, 5)"
                >
                  <div class="home-tab">
                    <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg"
                      width="120"
                      height="100"
                    />
                    <h4 class="heading-home">
                      Manage
                      <strong class="strong">
                        Tags
                      </strong>
                    </h4>
                  </div>
                </a>
  
                <a href="javascript:;" @click="gotoView(`blyott/locator`)">
                  <div class="home-tab with-arrow">
                    <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg"
                      width="120"
                      height="100"
                    />
                    <h4 class="heading-home">
                      Manage
                      <strong class="strong">
                        Locators
                      </strong>
                    </h4>
                  </div>
                </a>
              </a-col>
              <!-- #end left side tabs -->
              <a-col :span="3"></a-col>
  
              <a-col :md="10">
                <a href="javascript:;" @click="gotoView(`blyott/location`)">
                  <div class="home-tab with-arrow">
                    <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg"
                      width="120"
                      height="100"
                    />
                    <h4 class="heading-home">
                      Manage
                      <strong class="strong">
                        Locations
                      </strong>
                    </h4>
                  </div>
                </a>


                <a href="javascript:;" @click="gotoView(`blyott/asset/report/allocation`)">
                  <div class="home-tab with-arrow">
                    <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg"
                      width="120"
                      height="100"
                    />
                    <h4 class="heading-home">
                      Manual
                      <strong class="strong">
                        Commissioning
                      </strong>
                    </h4>
                  </div>
                </a>

                <a href="javascript:;" @click="gotoView(`blyott/report`)">
                  <div class="home-tab with-arrow">
                    <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg"
                      width="120"
                      height="100"
                    />
                    <h4 class="heading-home">
                        <strong class="strong">
                            Reports
                        </strong>
                    </h4>
                  </div>
                </a>

              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </template>
  
  <script>
  // import { HubConnectionBuilder } from '@aspnet/signalr'
  import userDetail from '~/mixins/user-detail'
  import routeHelpers from '~/mixins/route-helpers'
  export default {
    mixins: [routeHelpers, userDetail],
    data() {
      return {}
    },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    mounted() {},
    methods: {
      gotoView(uri) {
        this.goto(`/${uri}`)
      },
    },
  }
  </script>
  <style scoped>
  .smartlab_home {
    padding-top: 0 !important;
  }
  </style>
  