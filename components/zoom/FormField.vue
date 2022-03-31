<template>
  <a-row>
    <a-col :span="24">
      <a-form-item
        label="Description"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 21 }"
      >
        <a-input
          v-decorator="[
            'agenda',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your First Name',
                },
              ],
            },
          ]"
          placeholder="Please input your First Name"
        />
      </a-form-item>
    </a-col>
  </a-row>
</template>
<script>
export default {}
</script>
