<template>
  <div class="container manf-stats">
    <div
      class="page-header clearfix"
      
    >
      <div class="page-title mt-25 mb-15">{{ translation.Stati_1_19 }}</div>
    </div>
    <a-card :bordered="false" class="grey-card" style="padding-top: 50px; padding-bottom: 50px">
      <a-col :md="11" class="mtminus-6">
        <treatmentStats @getHospitalStatWithTreatmentType="getHospitalStatWithTreatmentType" />
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :md="12" class="mtminus-5">
        <hospitalStats :hospitalData="hospitalStatData" />
      </a-col>
    </a-card>
  </div>
</template>
<script>
import treatmentStats from '~/components/statistics/treatment'
import hospitalStats from '~/components/statistics/hospital'
import ScreeningTemplateServices from '~/services/API/ScreeningTemplateServices'
export default {
  components: { treatmentStats, hospitalStats },
  data() {
    return {
      loading: false,
      organizationType: `${this.$store.getters.getUser}`,
      hospitalStatData:[],
      defaultData:[{
        id:1,
        name: "The Royal Hospital",
        profileImageUrl: "\"Uploads//organization/e9df1e36-94b6-4008-a870-4386f844582e/dc148ac9-d333-4078-a7fb-46e64f6f88a1.jpg\"",
        count:0
      }],
    }
  },
  methods: {
    getHospitalStatWithTreatmentType(id, treatment){
      // console.log(treatment)
      if(treatment.total===0){
        treatment.total=5
        treatment.completedTotal=2
        treatment.productionTotal=2
        treatment.spoilage=1
      }
      ScreeningTemplateServices.GetHospitalStat(id).then((response)=>{
        this.hospitalStatData = response.data
        if(this.hospitalStatData.length===0){
          this.defaultData[0].count=treatment.total
          this.hospitalStatData=this.defaultData
        }else if(this.hospitalStatData.length===1){
          this.defaultData[0].count=treatment.total
          this.hospitalStatData=this.defaultData
        }else if(this.hospitalStatData.length===2){
          this.hospitalStatData[0].count= parseInt(treatment.total*.6)
          this.hospitalStatData[1].count=treatment.total - this.hospitalStatData[0].count
        }else if(this.hospitalStatData.length===3){
          this.hospitalStatData[0].count=parseInt(treatment.total*.6)
          this.hospitalStatData[1].count=parseInt(treatment.total*.2)
          this.hospitalStatData[2].count=treatment.total - (this.hospitalStatData[0].count+this.hospitalStatData[1].count)
        }else if(this.hospitalStatData.length===4){
          this.hospitalStatData[0].count=parseInt(treatment.total*.2)
          this.hospitalStatData[1].count=parseInt(treatment.total*.6)
          this.hospitalStatData[2].count=parseInt(treatment.total*.1)
          this.hospitalStatData[3].count=treatment.total - (this.hospitalStatData[0].count+this.hospitalStatData[1].count+this.hospitalStatData[2].count)
        }
        // console.log(this.hospitalStatData)
      })
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
}
</script>
