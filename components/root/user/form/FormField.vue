<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          label="First Name"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'firstName',
              {
                initialValue: user.firstName,
                rules: [
                  {
                    required: true,
                    message: 'Please input your First Name',
                  },
                ],
              },
            ]"
            placeholder="Please input your First Name"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          label="Last Name"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'LastName',
              {
                initialValue: user.lastName,
                rules: [
                  {
                    required: true,
                    message: 'Please input your last Name',
                  },
                ],
              },
            ]"
            placeholder="Please input your last Name"
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
                    message: 'Please input your Email',
                  },
                ],
              },
            ]"
            placeholder="Please input your Email"
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
                    message: 'Please input your UserName',
                  },
                ],
              },
            ]"
            placeholder="Please input your UserName"
          />
        </a-form-item>
      </a-col>
      <a-col :span="22">
        <a-form-item
          label="Office Address"
        >
          <a-input
            v-decorator="[
              'address',
              {
                initialValue: user.address,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Office Address',
                  },
                ],
              },
            ]"
            placeholder="Please input your Office Address"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          label="Contact Number"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'contactNumber',
              {
                initialValue: user.contactNumber,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Contact Number',
                  },
                ],
              },
            ]"
            placeholder="Please input your Contact Number"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="What3Words"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'What3Words',
              {
                initialValue: user.What3Words,
                rules: [
                  {
                    required: true,
                    message: 'Please input your What3Words',
                  },
                ],
              },
            ]"
            placeholder="Please input your What3Words"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Department"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'department',
              {
                initialValue: user.department,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Department',
                  },
                ],
              },
            ]"
            placeholder="Please input your Department"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Postcode"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'postcode',
              {
                initialValue: user.postcode,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Postcode',
                  },
                ],
              },
            ]"
            placeholder="Please input your Postcode"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Location"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'location',
              {
                initialValue: user.location,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Location',
                  },
                ],
              },
            ]"
            placeholder="Please input your Location"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Postal Address"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'postalAddress:',
              {
                initialValue: user.postalAddress,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Postal Address',
                  },
                ],
              },
            ]"
            placeholder="Please input your Postal Address"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="County"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'county:',
              {
                initialValue: user.county,
                rules: [
                  {
                    required: true,
                    message: 'Please input your County',
                  },
                ],
              },
            ]"
            placeholder="Please input your County"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Country"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'country:',
              {
                initialValue: user.country,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Country',
                  },
                ],
              },
            ]"
            placeholder="Please input your Country"
          />
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
  mounted() {},
  methods: {
    onSubmit() {},
  },
}
</script>
