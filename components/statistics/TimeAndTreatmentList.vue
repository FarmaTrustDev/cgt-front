<template>
  <div>
    <div class="halfNHalf">
      <a-row>
        <a-col :span="24">
          <a-card class="white-card" :bordered="false">
            <a-row>
              <a-col :span="14"
                ><span class="dated-time">
                  {{ _getFormatMoment().format('HH:mm') }}</span
                >
              </a-col>
              <a-col :span="10">
                <div class="dateTimeBox">
                  <span class="daysName">{{
                    _getFormatMoment().format('dddd')
                  }}</span>
                  <br />
                  <span class="TodaysDate">{{
                    _getFormatMoment().format('Do MMM YYYY')
                  }}</span>
                </div>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
      <!-- // treatment list -->
      <div v-if="removeList">
         <a-col :span="24">
         <a-card
          v-if="user.organizationTypeAlias != 'SMARTLAB'"
          class="white-card"
          :bordered="false"
        >
        <a-row>
          <a-col :span="24">
          <div>
            <a-col :span="10">
           <span class="float-left"> {{ translation.Treat_1_29 }}</span>
           </a-col>
           <a-col :span="4"></a-col>
           <a-col :span="10">
            <span class="float-right">{{ translation.Colle_1_23 }}</span>
            </a-col>
          </div>
          </a-col>
          </a-row>
          <div class="default-border-radius border mt-15 timebox">
            <a-list v-if="isTreatment==false">
              <a-list-item >
              <div class="pl-5">  <p class="pt-1 mt-15">There are no treatment for today</p></div>
              </a-list-item>
            </a-list>
            <a-list v-if="isTreatment==true" :data-source="treatments">
             <a-list-item slot="renderItem" slot-scope="item" 
                ><a-list-item-meta>
                  <a 
                    slot="title"
                    @click="
                      goto(`/manufacturer/treatments/process/${item.globalId}`)
                    "
                    >{{ item.patientPUID }}   {{getDateOnly(item.collectionDate)}} / {{getDateOnly(item.deliveryDate)}}</a
                  >
                </a-list-item-meta>
                </a-list-item
              >
            </a-list>
          </div>
           <div
              class="text-center red-div-size mt-5"
              style="cursor: pointer"
              @click="goto(`/inventory/treatment`)"
            >
              {{ translation.Showmore_2_534 }}
            </div>
        </a-card>
        </a-col>
        <a-col :span="24">
          <a-card
            v-if="user.organizationTypeAlias == 'SMARTLAB'"
            class="white-card"
            :bordered="false"
          >
            <a-row>
              <a-col :span="24">
                <div>
                  <a-col :span="12">
                  <span class="float-left">
                  {{ translation.Sampl_1_310 }}
                  </span>
                  </a-col>
                  <a-col :span="12">
                  <span class="float-right"
                    >{{ translation.Inbou_1_498 }} / {{
                      translation.OutboProce_2_514
                    }}</span
                  ></a-col>
                </div>
              </a-col>
            </a-row>
            <a-row>
              <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="default-border-radius border mt-15 timebox">
                  <a-list>
                    <a-list-item
                      style="cursor: pointer"
                      class=" mt-3"
                      @click="goto(`/inventory/treatment/process`)"
                    >
                      <a-col :span="12">
                        <p class="ml-6">DAC48694</p>
                      </a-col>
                      <a-col :span="12">
                        <p class="float-right mr-6">{{_getFormatMoment().format('DD/MM/YYYY')}} - {{ _getFormatMoment(getMomentByStandardFormat(new Date()).add(3, 'day')).format('DD/MM/YYYY')  }}</p>
                      </a-col>
                    </a-list-item>
                  </a-list>
                </div>
              </a-col>
            </a-row>
            <a-row>
              <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="default-border-radius border mt-15 timebox">
                  <a-list>
                    <a-list-item
                      style="cursor: pointer"
                      class=" mt-3"
                      @click="goto(`/inventory/treatment/process`)"
                    >
                      <a-col :span="12">
                        <p class="ml-6">DAC43057</p>
                      </a-col>
                      <a-col :span="12">
                        <p class="float-right mr-6">{{_getFormatMoment().format('DD/MM/YYYY')}} - {{ _getFormatMoment(getMomentByStandardFormat(new Date()).add(3, 'day')).format('DD/MM/YYYY')  }}</p>
                      </a-col>
                    </a-list-item>
                  </a-list>
                </div>
              </a-col>
            </a-row>
            <div
              class="text-center p-15 red-div-size"
              style="cursor: pointer"
              @click="goto(`/inventory/treatment`)"
            >
              {{ translation.Showmore_2_534 }}
            </div>
          </a-card>
        </a-col>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import TreatmentServices from '~/services/API/TreatmentServices'
import { isEmpty } from '~/services/Helpers'
import { _getFormatMoment, getMomentByStandardFormat, } from '~/services/Helpers/MomentHelpers'
import routeHelpers from '~/mixins/route-helpers'
export default {
  
  mixins: [routeHelpers],
  props: {
    removeList: { type: Boolean, default: true },
    type: { type: String, required: false, default: 'info' },
  },
  data() {
    return {
      treatments: [],
      isTreatment : true,
      moment,
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    if (this.removeList) {
      this.fetchTreatments()
    }
  },
  methods: {
    fetchTreatments() {
      TreatmentServices.get({ onlyTodayTreatment: true }).then((response) => {
        this.treatments = response.data
        if(isEmpty(this.treatments)){
          this.isTreatment =  false
        }
      })
    },
    getDateOnly(date)
    {
      return moment(date).format('DD-MM-yyyy')
    },
    _getFormatMoment,
    getMomentByStandardFormat,
  },
}
</script>
