<template>
  <a-row>
    <a-col :span="24">
      <a-form-item
        label="Description"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
      >
        <a-textarea
          v-decorator="[
            'agenda',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your Description',
                },
              ],
            },
          ]"
          placeholder="Please input your Description"
        />
      </a-form-item>
    </a-col>
  </a-row>
</template>
<script>
export default {}
</script>
