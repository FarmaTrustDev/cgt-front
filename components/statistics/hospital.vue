<template>
  <a-card>
    <a-row v-if="user.organizationTypeAlias!='SMARTLAB'">
      <a-col class="default-tabs" :span="24">
        <a-tabs type="card">
          <a-tab-pane key="1" :tab="translation.Hospi_1_47">
            <div
              v-for="hospital in hospitalData"
              :key="hospital.id"
              class="stats mb-15"
            >
              <ImageHeading
                :detail="{
                  img: hospital.profileImageUrl,
                  heading: hospital.name,
                }"
                :img-properties="{
                  width: '25px',
                }"
                class="mt-15"
              >
                <span slot="extra">
                  <span class="count-bar mb-15">{{ hospital.count }}</span>
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
                class="mt-15"
              >
                <span slot="extra">
                  <span class="count-bar mb-15">{{ hospital.count }}</span>
                </span>
              </ImageHeading>
            </div></a-tab-pane
          >
        </a-tabs>
      </a-col>
    </a-row>
    <a-row v-if="user.organizationTypeAlias=='SMARTLAB'">
      <a-col :span="24">
        <a-tabs type="card" >
          <a-tab-pane key="1" :tab="translation.Hospi_1_47">
            <div
              v-for="hospital in smartLabHospData"
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
              v-for="hospital in smartLabCountData"
              :key="hospital.id"
              class="stats"
            >
              <ImageHeading
                :detail="{
                  img: hospital.img,
                  heading: hospital.name,
                }"
              >
                <span slot="extra" >
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
import ImageHeading from '~/components/cards/StatsImageHeading'
import TreatmentServices from '~/services/API/TreatmentServices'
export default {
  components: {
    ImageHeading,
  },
  props:{
    hospitalData :{type: Array,default: () => []}
  },
  data() {
    return {
      // hospitalData: [],
      smartLabHospData:[{id: '1',profileImageUrl:'icons/hospital.png', name:'The Royal Hospital', count: 20},{id: '2',profileImageUrl:'icons/hospital.png', name:'Baystate Clinic', count:10},{id: '3',profileImageUrl:'icons/hospital.png', name:'University Hospital Birmingham', count:15}],
      smartLabCountData:[{id: '1',img:'Icons/flags/1x1/us.svg', name:'United States', count:5},{id: '2',img:'Icons/flags/1x1/de.svg', name:'Germany', count:3},{id: '4',img:'Icons/flags/1x1/gb.svg', name:'United Kingdom', count:2}],
      countriesData: [
        {
          count: 26,
          id: 3,
          name: 'United kingdom',
          img: 'web/flags/uk.png'
        },
        {
          count: 25,
          id: 2,
          name: 'USA',
          img: 'web/flags/us.png'
        },
        {
          count: 24,
          id: 1,
          name: 'Germany',
          img: 'web/flags/de.png',
        },
        
      ],
    }
  },
  computed:{
    user() {
      return this.$store.getters.getUser
    },
    translation() {
      return this.$store.getters.getTranslation
    },
  },   
  mounted() {
    // this.fetchHospital()
  },
  methods: {
    fetchHospital() {
      TreatmentServices.getHospitalCount().then((response) => {
        // this.hospitalData = response.data
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
  padding-left: 15px;
  height: 100px;
  .count-bar {
    padding: 25px;
    display: inline-block;
    background-color: #e9f3ff;
    border-radius: 15px;
    // padding-right: 5px;
  }
}
</style>
