<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          label="Name"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'name',
              {
                initialValue: user.name,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Name!',
                  },
                ],
              },
            ]"
            placeholder="Please input your Name"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          label="User Name"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'userName',
              {
                initialValue: user.userName,
                rules: [
                  {
                    required: true,
                    message: 'Please input your User Name',
                  },
                ],
              },
            ]"
            placeholder="Please input your User Name"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Email"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'email',
              {
                initialValue: user.email,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Email!',
                  },
                ],
              },
            ]"
            placeholder="Please input your Email"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          label="Phone"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'phone',
              {
                initialValue: user.phone,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Phone',
                  },
                ],
              },
            ]"
            placeholder="Please input your Phone"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Address"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'address',
              {
                initialValue: user.address,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Address!',
                  },
                ],
              },
            ]"
            placeholder="Please input your Address"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          label="Date of Birth"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-date-picker
            v-decorator="[
              'dob',
              {
                initialValue: user.dob,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Date of Birth!',
                  },
                ],
              },
            ]"
            style="width: 100%"
            size="large"
          >
          </a-date-picker>
        </a-form-item>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      typeLoading: true,
    }
  },
  mounted() {  },
  methods: {
    onSubmit() {},
  },
}
</script>
