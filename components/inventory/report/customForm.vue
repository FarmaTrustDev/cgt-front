<template>
    <div>
        <!-- // make its component -->
        <a-card v-if="isEmpty(data)" class="white-card-smart-lab">
            <h2>{{headingTitle}}</h2>
            <p style="text-align:justify">{{text}}</p>
            <a-form-item class="text-right"><a-button @click="$emit('handelPositiv')">+</a-button><a-button @click="$emit('handelNegative')">-</a-button></a-form-item>
            <a-row>
                <a-col v-for="custDD in customCol" :key="name+custDD.key" :span="custDD.width" style="text-align:center">{{custDD.name}}</a-col>
            </a-row>
            <a-row v-for="x in loopVal" :key="'Row'+x">
                <a-col v-for="custDD in customCol" :key="name+'Col'+x+custDD.key" :span="custDD.width" style="text-align:center; padding-left:5px">
                    <a-form-item v-if="custDD.control===''"><a-input style="border-radius:15px;" /></a-form-item>
                    <a-form-item v-if="custDD.control==='Yes/No'"><a-checkbox>Yes</a-checkbox><a-checkbox>No</a-checkbox></a-form-item>
                    <a-form-item v-if="custDD.control==='N/A'"><a-checkbox>N/A</a-checkbox></a-form-item>
                    <span v-if="custDD.control==='serial'">{{x+'.'}}</span>
                </a-col>
            </a-row>
        </a-card>
        <a-card v-else class="white-card-smart-lab">
            <h2>{{headingTitle}}</h2>
            <p style="text-align:justify">{{text}}</p>
            <a-row>
                <a-col v-for="custDD in customCol" :key="name+custDD.key" :span="custDD.width" style="text-align:center">{{custDD.name}}</a-col>
            </a-row>
            <a-row v-for="x,index in data" :key="index">
                <a-col v-for="custDD in x" :key="name+'Col'+index+custDD.key" :span="custDD.width" style="text-align:center; padding-left:10px">
                    <a-form-item v-if="custDD.control===''"><a-input style="border-radius:15px;" /></a-form-item>
                    <a-form-item v-if="custDD.control==='Yes/No/NA'"><a-checkbox>Yes</a-checkbox><a-checkbox>No</a-checkbox><a-checkbox>N/A</a-checkbox></a-form-item>
                    <a-form-item v-if="custDD.control==='Yes/No'"><a-checkbox>Yes</a-checkbox><a-checkbox>No</a-checkbox></a-form-item>
                    <a-form-item v-if="custDD.control==='N/A'"><a-checkbox>N/A</a-checkbox></a-form-item>
                    <span v-if="custDD.control==='text'"><p style="text-align:justify">{{custDD.text}}</p></span>
                </a-col>
            </a-row>
        </a-card>
    </div>
</template>
<script>
import routeHelpers from '~/mixins/route-helpers'
import imagesHelper from '~/mixins/images-helper'
import { isEmpty } from '~/services/Utilities'
export default {
  mixins: [routeHelpers, imagesHelper],
  props: {
    headingTitle:{type: String, default: null},
    text:{type: String, default: null},
    colVal:{type: Number, default: null},
    customCol: { type: Array, default: () => [] },
    data: { type: Array, default: () => [] },
    loopVal:{type: Number, default: null },
    name:{ type: String, default:null},
  },
  methods: {
    isEmpty,
  },  
}
</script>