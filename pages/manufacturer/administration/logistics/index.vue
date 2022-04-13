<template>
  <div class="logistics-page">
    <a-row :gutter="16" class="grey-card">
      <a-col>
        <a-card :bordered="false" class="default-card logistic-container">
            <h2>Select Partners </h2>
            <br>
            <h3>Logistics:</h3>
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
            <a-checkbox @change="onChange">
              <h2><b>Apply to partner</b></h2>
            </a-checkbox>

            <a-col class="text-right mt-15">
              <a-button type="primary" class="plr-20" @click="save">Save</a-button>
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
    methods:{
      save(){
        this.success("Contract Added!")
      }
    },
  }
</script>