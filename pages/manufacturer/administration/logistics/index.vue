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
              placeholder="select one country"
              option-label-prop="label"
            >
            <a-select-option value="china" label="China">
                China
              </a-select-option>
              <a-select-option value="usa" label="USA">
                USA
              </a-select-option>
              <a-select-option value="japan" label="Japan">
                Japan
              </a-select-option>
              <a-select-option value="korea" label="Korea">
                Korea
              </a-select-option>
            </a-select>
            <!-- Apply Checkbox -->
            <a-checkbox @change="onChange">
              <h2><b>Apply to partner</b></h2>
            </a-checkbox>

            <a-col class="text-right mt-15">
              <a-button type="primary" class="plr-20">Save</a-button>
            </a-col>

          </a-card>
      </a-col>

    </a-row>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        value: ['china'],
      };
    },
    watch: {
      value(val) {
        console.log(`selected:`, val);
      },
    },
  }
</script>