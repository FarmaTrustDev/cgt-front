<template>
  <div>
    <div class="halfNHalf">
      <a-card class="white-card" :bordered="false">
        <a-row>
          <a-col :span="12"><span class="danger-time"> 16:58</span></a-col>
          <a-col :span="12">
            <div class="dateTimeBox">
              <span class="daysName">Wednesday</span>
              <br />
              <span class="TodaysDate">11th May 2022</span>
            </div>
          </a-col>
        </a-row>
      </a-card>

      <!-- // treatment list -->
      <div>
        <a-card class="white-card" :bordered="false">
          <a-list :data-source="treatments">
            <a-list-item slot="renderItem" slot-scope="item"
              ><a-list-item-meta>
                <a slot="title" href="#">{{ item.patientPUID }}</a>
              </a-list-item-meta></a-list-item
            >
          </a-list>
        </a-card>
      </div>
    </div>
  </div>
</template>
<script>
import TreatmentServices from '~/services/API/TreatmentServices'
export default {
  data() {
    return {
      treatments: [],
    }
  },
  mounted() {
    this.fetchTreatments()
  },
  methods: {
    fetchTreatments() {
      TreatmentServices.get({ onlyTodayTreatment: true }).then((response) => {
        this.treatments = response.data
      })
    },
  },
}
</script>
