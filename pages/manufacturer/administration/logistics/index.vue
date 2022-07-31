<template>
  <div class="logistics-page">
    <a-row :gutter="16" class="grey-card">
      <a-col>
        <a-card :bordered="false" class="default-card logistic-container">
            <h2>{{translation.SelecPartn_2_458}} </h2>
            <br>
            <h3>{{translation.Logis_1_146}}:</h3>
            <a-select
              v-model="value"
              mode="multiple"
              placeholder=""
              option-label-prop="label"
            >
            <a-select-option value="fastlink" label="Fastlink">
                Fastlink
              </a-select-option>
              <a-select-option value="corten" label="Corten Logistics">
                Corten Logistics
              </a-select-option>
            </a-select>
            <!-- Apply Checkbox -->
            <a-checkbox>
              <h2><b>{{translation.Applyto_3_459}}</b></h2>
            </a-checkbox>

            <a-col class="text-right mt-15">
              <a-button type="primary" class="plr-20" @click="save">{{translation.save_1_462}}</a-button>
            </a-col>

          </a-card>
      </a-col>

    </a-row>
  </div>
</template>

<script>
import notifications from '~/mixins/notifications'
  export default{
    mixins: [notifications],
    data() {
      return {
        value: ['fastlink'],
      };
    },
    watch: {
      value(val) {
        console.log(`selected:`, val);
      },
    },
    computed:{
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    methods:{
      save(){
        this.success("Contract Added!")
      }
    },
  }
</script>