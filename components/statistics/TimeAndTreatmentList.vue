<template>
  <div>
    <div class="halfNHalf">
      <a-card class="white-card" :bordered="false">
        <a-row>
          <a-col :span="12"
            ><span class="danger-time">
              {{ _getFormatMoment().format('HH:mm') }}</span
            ></a-col
          >
          <a-col :span="12">
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

      <!-- // treatment list -->
      <div v-if="removeList">
        <a-card class="white-card" :bordered="false">
          <div>
            {{ translation.Treat_1_29 }}
            <span class="float-right">{{ translation.Colle_1_23 }}</span>
          </div>
          <div class="default-border-radius border p-10 mt-15">
            <a-list :data-source="treatments">
              <a-list-item slot="renderItem" slot-scope="item"
                ><a-list-item-meta>
                  <a
                    slot="title"
                    @click="
                      goto(`/manufacturer/treatments/process/${item.globalId}`)
                    "
                    >{{ item.patientPUID }}</a
                  >
                </a-list-item-meta></a-list-item
              >
            </a-list>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>
<script>
import TreatmentServices from '~/services/API/TreatmentServices'
import { _getFormatMoment } from '~/services/Helpers/MomentHelpers'
import routeHelpers from '~/mixins/route-helpers'
export default {
  mixins: [routeHelpers],
  props: { removeList: { type: Boolean, default: true } },
  data() {
    return {
      treatments: [],
    }
  },
  computed: {
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
      })
    },
    _getFormatMoment,
  },
}
</script>
