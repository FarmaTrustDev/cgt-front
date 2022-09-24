<template>
    <div>
        <!-- // make its component -->
        <a-card v-if="isEmpty(data)" class="white-card-smart-lab">
            <h2>{{headingTitle}}</h2>
            <p style="text-align:justify">{{text}}</p>
            
            <a-row>
                <a-col v-for="custDD in customCol" :key="name+custDD.key" :span="custDD.width" style="text-align:center;">{{custDD.name}}</a-col>
            </a-row>
            <a-row v-for="x in loopVal" :key="'Row'+x">
                <a-col v-for="custDD in customCol" :key="name+'Col'+x+custDD.key" :span="custDD.width" style="border: 1px solid black; text-align:center; height:35px; padding-left:5px">
                    <a-form-item v-if="custDD.control==='Yes/No'" style="height:35px"><a-checkbox>Yes</a-checkbox><a-checkbox>No</a-checkbox></a-form-item>
                    <a-form-item v-if="custDD.control==='N/A'"  style="height:35px"><a-checkbox>N/A</a-checkbox></a-form-item>
                    <p v-if="custDD.control==='serial'" class="mt-15" >{{x+'.'}}</p>
                    <p v-else class="mt-15 text-left" ><span v-if="tag==='tag2' && 'data' in custDD">{{custDD.data}}</span><span v-else>&nbsp;</span></p>
                </a-col>
            </a-row>
            <a-row v-if="performedBy">
                <a-col :span="3" class="mt-15" style="height:15px;"><span>Performed By:</span></a-col><a-col :span="8">&nbsp;</a-col>
                <a-col :span="3" class="text-right mt-15 mr-10" style="height:15px;"><span>Date:</span></a-col><a-col :span="8">&nbsp;</a-col>
            </a-row>                        
            <a-row v-if="verifiedBy">
                <a-col :span="3" class="mt-15" style="height:15px;"><span>Verified By:</span></a-col><a-col :span="8">&nbsp;</a-col>
                <a-col :span="3" class="text-right mt-15 mr-10" style="height:15px;"><span>Date:</span></a-col><a-col :span="8">&nbsp;</a-col>
            </a-row>                                    
            <a-row v-if="reviewedBy">
                <a-col :span="3" class="mt-15" style="height:15px;"><span>Reviewed By:</span></a-col><a-col :span="8">&nbsp;</a-col>
                <a-col :span="3" class="text-right mt-15 mr-10" style="height:15px;"><span>Date:</span></a-col><a-col :span="8">&nbsp;</a-col>
            </a-row>
        </a-card>
        <a-card v-else class="white-card-smart-lab">
            <h2>{{headingTitle}}</h2>
            <p style="text-align:justify">{{text}}</p>
            <a-row>
                <a-col v-for="custDD in customCol" :key="name+custDD.key" :span="custDD.width" style="text-align:center;">{{custDD.name}}</a-col>
            </a-row>
            <a-row v-for="x,index in data" :key="index">
                <a-col v-for="custDD in x" :key="name+'Col'+index+custDD.key" :span="custDD.width" :style="'height: '+custDD.height+';border: 1px solid black;text-align:center; padding-left:10px'">
                    <a-form-item v-if="custDD.control==='Yes/No/NA'"><a-checkbox>Yes</a-checkbox><a-checkbox>No</a-checkbox><a-checkbox>N/A</a-checkbox></a-form-item>
                    <a-form-item v-if="custDD.control==='Yes/No'"><a-checkbox>Yes</a-checkbox><a-checkbox>No</a-checkbox></a-form-item>
                    <a-form-item v-if="custDD.control==='N/A'"><a-checkbox>N/A</a-checkbox></a-form-item>
                    <span v-if="custDD.control==='text'"><p style="text-align:justify" class="mt-10">{{custDD.text}}</p></span>
                    <p v-else class="mt-15 text-left"><span v-if="tag==='tag2' && 'data' in custDD">{{custDD.data}}</span><span v-else>&nbsp;</span></p>
                </a-col>
            </a-row>
            <a-row v-if="performedBy">
                <a-col :span="3" class="mt-15" style="height:35px;"><span>Performed By:</span></a-col><a-col :span="8">&nbsp;</a-col>
                <a-col :span="3" class="text-right mt-15 mr-10" style="height:35px;"><span>Date:</span></a-col><a-col :span="8">&nbsp;</a-col>
            </a-row>                        
            <a-row v-if="verifiedBy">
                <a-col :span="3" class="mt-15" style="height:35px;"><span>Verified By:</span></a-col><a-col :span="8">&nbsp;</a-col>
                <a-col :span="3" class="text-right mt-15 mr-10" style="height:35px;"><span>Date:</span></a-col><a-col :span="8">&nbsp;</a-col>
            </a-row>                                    
            <a-row v-if="reviewedBy">
                <a-col :span="3" class="mt-15" style="height:35px;"><span>Reviewed By:</span></a-col><a-col :span="8">&nbsp;</a-col>
                <a-col :span="3" class="text-right mt-15 mr-10" style="height:35px;"><span>Date:</span></a-col><a-col :span="8">&nbsp;</a-col>
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
    reviewedBy:{type: Boolean, default:false},
    performedBy:{type: Boolean, default:false},
    verifiedBy:{type: Boolean, default:false},
    showButton:{type: Boolean, default:true},
    tag:{type: String, default: 'tag1'},
},
  methods: {
    isEmpty,
  },  
}
</script>