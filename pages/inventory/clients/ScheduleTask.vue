<template>
  <div class="pg-head ml-20 schedule-task-fields">
    <a-page-header title="Schedule Task" />
    <span class="pg-head">
    <a-col :span="24" >
      <span class="ml-20">
        Does this task refer to an existing sample?
        <a-radio-group class="ml-20">
          <a-radio-button value="a"> Yes </a-radio-button>
          <a-radio-button value="b"> No </a-radio-button>
        </a-radio-group>
      </span>
    </a-col>
      <a-col :span="24" class="ml-20 mt-15">
        <a-col :span="8">
          Type of Task:
          <a-dropdown-button>
            Dropdown
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1">
                <a-icon type="user" />Sample Recipt
              </a-menu-item>
              <a-menu-item key="2">
                <a-icon type="user" />Sample Recipt
              </a-menu-item>
              <a-menu-item key="3">
                <a-icon type="user" />Sample Recipt
              </a-menu-item>
            </a-menu>
            <a-icon slot="icon" type="caret-down" />
          </a-dropdown-button>
        </a-col>
        <a-col :span="8">
          <img :src="getImageUrl('icons/equalizer.svg')" />
          <a-dropdown-button>
            Execute On
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1">
                <a-icon type="user" />Execute On
              </a-menu-item>
              <a-menu-item key="2">
                <a-icon type="user" />Execute On
              </a-menu-item>
              <a-menu-item key="3">
                <a-icon type="user" />Execute On
              </a-menu-item>
            </a-menu>
            <a-icon slot="icon" type="caret-down" />
          </a-dropdown-button>
        </a-col>
        <a-col :span="8">
          <a-date-picker />
        </a-col>
        </a-col>
        <a-col :span="24" class="ml-20 mt-20">
          <a-col :span="12">
            <a-col :span="5" class="mt-5">Assign task to:</a-col>
           <a-col :span="10"><a-input placeholder="Name" /></a-col>
          </a-col>
          <a-col :span="12">
          <a-col :span="2" class="mt-5">Email:</a-col>  
           <a-col :span="10"> <a-input placeholder="contact@org.com" /></a-col>
          </a-col>
        </a-col>
        <a-col class="ml-20 mt-20">
          Show notification:
          <a-col :span="24">
            <a-col :span="4">
                <span class="float-right mr-10">
              Now:
              </span>
            </a-col>
            <a-col :span="20">
              <a-checkbox> </a-checkbox>
            </a-col>
          </a-col>
          </a-col>
          <a-col class="ml-20 mt-20">
            <a-col :span="4">
                <span class="float-right mr-10">
              Date of task:
              </span>
              </a-col>
              <a-col :span="20">
              <a-checkbox> </a-checkbox>
            </a-col>
          </a-col>
          <a-col  class="ml-20 mt-20">
            <a-col :span="4">
                <span class="float-right mr-10">
              One week before task:
              </span>
              </a-col>
              <a-col :span="6">
              <a-checkbox> </a-checkbox>
            </a-col>
          </a-col>
        <a-col :span="24" class="ml-20 mt-20">
        <a-col :span="2" class="mt-40">Comments:</a-col>
         <a-col :span="20"><a-textarea placeholder="Basic usage" :rows="4" /></a-col>    
        </a-col>
        <a-col :span="24" class="ml-20 mt-20">
         Upload Documents:
        <a-upload class="ml-20"><img :src="getImageUrl('icons/upload.svg')" /></a-upload>
        </a-col>
        <a-col class="float-right mr-30">
            <a-button type="primary">
      Save
    </a-button></a-col>
    </span>
  </div>
</template>
<script>
import imagesHelper from '~/mixins/images-helper'

export default {
  mixins: [imagesHelper],
}
</script>
