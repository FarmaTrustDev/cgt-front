<template>
  <a-card>
    <a-row>
      <a-col class="default-tabs" :span="24">
        <a-tabs type="card">
          <a-tab-pane key="1" :tab="translation.Hospi_1_47">
            <div
              v-for="hospital in hospitalData"
              :key="hospital.id"
              class="stats"
            >
              <ImageHeading
                :detail="{
                  img: hospital.profileImageUrl,
                  heading: hospital.name,
                }"
                :img-properties="{
                  width: '35px',
                }"
              >
                <span slot="extra">
                  <span class="count-bar">{{ hospital.count }}</span>
                </span>
              </ImageHeading>
            </div></a-tab-pane
          >
          <a-tab-pane key="2" :tab="translation.Count_1_487">
            <div
              v-for="hospital in countriesData"
              :key="hospital.id"
              class="stats"
            >
              <ImageHeading
                :detail="{
                  img: hospital.img,
                  heading: hospital.name,
                }"
              >
                <span slot="extra">
                  <span class="count-bar">{{ hospital.count }}</span>
                </span>
              </ImageHeading>
            </div></a-tab-pane
          >
        </a-tabs>
      </a-col>
    </a-row>
  </a-card>
</template>
<script>
import ImageHeading from '~/components/cards/ImageHeading'
import TreatmentServices from '~/services/API/TreatmentServices'
export default {
  components: {
    ImageHeading,
  },
  data() {
    return {
      hospitalData: [],
      countriesData: [
        {
          count: 24,
          id: 1,
          name: 'Germany',
          img: 'web/flags/de.svg',
        },
      ],
    }
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },   
  mounted() {
    this.fetchHospital()
  },
  methods: {
    fetchHospital() {
      TreatmentServices.getHospitalCount().then((response) => {
        this.hospitalData = response.data
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.stats {
  border: 1px solid #e2e2e2;
  border-radius: 15px;
  margin-top: 15px;
  padding: 15px;
  .count-bar {
    padding: 15px;
    display: inline-block;
    background-color: #e9f3ff;
    border-radius: 15px;
  }
}
</style>
