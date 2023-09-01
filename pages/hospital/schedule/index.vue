<template>
    <div>
      <a-spin :spinning="loading">
        <a-form :form="form" layout="horizontal">
          <Form :form="form" />
        </a-form>
      </a-spin>  
    </div>
  </template>
  <script>
  import Form from '~/components/root/hospital/scheduling/Form'
  import imagesHelper from '~/mixins/images-helper'
  import {_getFormatMoment, getMomentByStandardFormat } from '~/services/Helpers/MomentHelpers'
  export default {
    components: { Form },
    mixins: [imagesHelper],
    props: {
      treatment: {
        type: Object,
        default: () => ({}),
      },
      rejection: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        formLayout: 'horizontal',
        form: this.$form.createForm(this, {
          name: 'TreatmentSchedulingForm',
        }),
        fetchIdFromParams: false,
        entity: {},
        values:{},
        isScheduled: false,
        loading: false,
        dated:'',
        containerDate:'',
        startDate:'',
        partner:'',
        url:'',
        selectionModal:false,
        visibleModalPopUp: false,
        userData:[],
        selectedUsers: [],
        patientName:'',
        treatmentTypeName:'',
        patientPUID:'',
        treatments:{},
      }
    },
    computed:{
      user() {
        return this.$store.getters.getUser
      },
    },
    mounted() {
    },
    methods: {
      getMomentByStandardFormat,
      _getFormatMoment,
    },
  }
  </script>
  <style scoped>
  .row-height {
    height: 25px;
  }
  .col-height {
    height: 60px;
  }
  </style>
  