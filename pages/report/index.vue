<template>
    <div>
      <a-button @click="generatePDF()" type="promary">Generate PDF</a-button><div v-if="progressVal>0">Download in progress: {{progressVal}}/100 </div>
        <custom-form :name="'titlePage'" :data="coustomDataTitlePage" :tag="tag" />
          <a-card class="white-card-smart-lab">
            <p><b>APPROVALS:</b> This record has been reviewed by the undersigned personnel and has been found to be complete and appropriate for the activities documented herein.</p>
            <a-row>
              <a-col :span="3" class="mt-15"><span>Client:</span></a-col>
              <a-col :span="7" class="ml-5"><a-form-item><a-input v-if="tag==='tag2'" value="James Cooper" /><a-input v-else /></a-form-item></a-col>
              <a-col :span="7" class="ml-5"><a-form-item><a-input v-if="tag==='tag2'" value="Lorem ipsum" /><a-input v-else /></a-form-item></a-col>
              <a-col :span="6" class="ml-5"><a-form-item><a-input v-if="tag==='tag2'" value="23/09/22" /><a-input v-else /></a-form-item></a-col>
            </a-row>
            <a-row>
              <a-col :span="3" class="mt-15"><span></span></a-col>
              <a-col :span="7" style="margin-top:-20px; text-align:center" class="ml-5">Name</a-col>
              <a-col :span="7" style="margin-top:-20px; text-align:center" class="ml-5">Signature</a-col>
              <a-col :span="6" style="margin-top:-20px; text-align:center" class="ml-5">Date</a-col>
            </a-row>
            <a-row>
              <a-col :span="3" class="mt-15"><span>Client:</span></a-col>
              <a-col :span="7" class="ml-5"><a-form-item><a-input v-if="tag==='tag2'" value="James Cooper" /><a-input v-else /></a-form-item></a-col>
              <a-col :span="7" class="ml-5"><a-form-item><a-input v-if="tag==='tag2'" value="Lorem ipsum" /><a-input v-else /></a-form-item></a-col>
              <a-col :span="6" class="ml-5"><a-form-item><a-input v-if="tag==='tag2'" value="23/09/22" /><a-input v-else /></a-form-item></a-col>
            </a-row>
            <a-row>
              <a-col :span="3" class="mt-15"><span></span></a-col>
              <a-col :span="7" style="margin-top:-20px; text-align:center" class="ml-5">Name</a-col>
              <a-col :span="7" style="margin-top:-20px; text-align:center" class="ml-5">Signature</a-col>
              <a-col :span="6" style="margin-top:-20px; text-align:center" class="ml-5">Date</a-col>
            </a-row>
          </a-card>
          <a-card class="white-card-smart-lab">
            <h2>SECTION TO BE COMPLETED UPON ISSUANCE OF BATCH PRODUCTION RECORD.</h2>
            <a-row>
              <a-col :span="7">
                <h3>Batch Production Record (BPR) Number:</h3>
                (Verify Work Order information to confirm BPR/Lot information was not previously assigned for preprinting of labels)
              </a-col>
              <a-col :span="16" style="margin-left:5px">
                <a-form-item><a-input v-if="tag==='tag2'" value="124578" /><a-input v-else /></a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="7"><span>Experic Quality Approval of Batch Production Record Issued By:</span></a-col>
              <a-col :span="5" class="ml-5"><a-form-item><a-input v-if="tag==='tag2'" value="James Cooper" /><a-input v-else /></a-form-item></a-col>
              <a-col :span="6" class="ml-5"><a-form-item><a-input v-if="tag==='tag2'" value="Lorem ipsum" /><a-input v-else /></a-form-item></a-col>
              <a-col :span="5" class="ml-5"><a-form-item><a-input v-if="tag==='tag2'" value="23/09/22" /><a-input v-else /></a-form-item></a-col>
            </a-row>
            <a-row>
              <a-col :span="7"><span></span></a-col>
              <a-col :span="5" style="margin-top:-20px; text-align:center" class="ml-5">Name</a-col>
              <a-col :span="6" style="margin-top:-20px; text-align:center" class="ml-5">Signature</a-col>
              <a-col :span="5" style="margin-top:-20px; text-align:center" class="ml-5">Date</a-col>
            </a-row>
          </a-card>
          <custom-form :headingTitle="titlePerson" :name="'person'" :text="textPerson" :tag="tag" :customCol="customColsPerson" @handelPositiv="increasePersonVal" @handelNegative="decreasePersonVal" :loopVal="personLoopVal" :reviewedBy="true" />
          <custom-form :headingTitle="titleBatch" :name="'batch'" :customCol="customColsBatchRec" @handelPositiv="increaseBatchVal" @handelNegative="decreaseBatchVal" :loopVal="batchLoopVal" :reviewedBy="true" />
          <custom-form :headingTitle="titleBills" :name="'bills'" :customCol="customColsBills" @handelPositiv="increaseBillsVal" @handelNegative="decreaseBillsVal" :loopVal="billsLoopVal" />
          <custom-form :headingTitle="titleEquipment" :name="'equipment'" :text="textEquipment" :customCol="customColsEquipment" @handelPositiv="increaseEquipmentVal" @handelNegative="decreaseEquipmentVal" :loopVal="equipmentLoopVal" :reviewedBy="true" />
          <custom-form :headingTitle="titleLine" :name="'line'" :text="textLine" :customCol="customColsLine" :data="coustomDataLine" :loopVal="2" :reviewedBy="true" />
          <custom-form :headingTitle="titleStage" :name="'stage'" :customCol="customColsStage" @handelPositiv="increaseStageVal" @handelNegative="decreaseStageVal" :loopVal="stageLoopVal" :reviewedBy="true" />
          <custom-form :headingTitle="titlePI" :name="'pI'" :customCol="customColsPI" @handelPositiv="increasePIVal" @handelNegative="decreasePIVal" :loopVal="pILoopVal" />
          <custom-form :headingTitle="titleMI" :name="'mI'" :customCol="customColsMI" @handelPositiv="increaseMIVal" @handelNegative="decreaseMIVal" :loopVal="mILoopVal" :reviewedBy="true" />
          <custom-form :headingTitle="titleMR" :name="'mR'" :customCol="customColsMR" @handelPositiv="increaseMRVal" @handelNegative="decreaseMRVal" :loopVal="mRLoopVal" :reviewedBy="true" :verifiedBy="true" :performedBy="true" />
          <custom-form :headingTitle="titleSR" :name="'sR'" :text="textSR" :customCol="customColsSR" @handelPositiv="increaseSRVal" @handelNegative="decreaseSRVal" :loopVal="sRLoopVal" :reviewedBy="true"  />
          <custom-form :headingTitle="titleIPI" :name="'iPI'" :text="textIPI" :customCol="customColsIPI" :data="coustomDataIPI" :loopVal="5" />
          <custom-form :headingTitle="titleIPIR" :name="'iPIR'" :customCol="customColsIPIR" @handelPositiv="increaseIPIRVal" @handelNegative="decreaseIPIRVal" :loopVal="iPIRLoopVal" :reviewedBy="true" />
          <custom-form :headingTitle="titleAIPIR" :name="'aIPIR'" :customCol="customColsAIPIR" @handelPositiv="increaseAIPIRVal" @handelNegative="decreaseAIPIRVal" :loopVal="aIPIRLoopVal" :reviewedBy="true" />
          <custom-form :headingTitle="titlePLoc" :name="'pLoc'" :customCol="customColsPLoc" @handelPositiv="increasePLocVal" @handelNegative="decreasePLocVal" :loopVal="pLocLoopVal" />
          <custom-form :headingTitle="titleRLoc" :name="'rLoc'" :customCol="customColsRLoc" @handelPositiv="increaseRLocVal" @handelNegative="decreaseRLocVal" :loopVal="rLocLoopVal" :reviewedBy="true" />
          <custom-form :headingTitle="titleLS" :text="textLS" :name="'lSamp'" :customCol="customColsLS" :loopVal="1" :reviewedBy="true" :verifiedBy="true" :performedBy="true" :showButton="false" />
          <a-card class="white-card-smart-lab">
            <h2>IN-PROCESS NOTES</h2>
            <a-form-item><a-textarea style="border-radius:1px"/></a-form-item>
            <a-row>
              <a-col :span="2" class="mt-15"><span>Performed By:</span></a-col><a-col :span="9"><a-form-item><a-input /></a-form-item></a-col>
              <a-col :span="1" />
              <a-col :span="2" class="text-right mt-15 mr-10"><span>Date:</span></a-col><a-col :span="9"><a-form-item><a-input /></a-form-item></a-col>
            </a-row>
          </a-card>
          <custom-form :headingTitle="titleBRA" :name="'bRA'" :customCol="customColsBRA" @handelPositiv="increaseBRAVal" @handelNegative="decreaseBRAVal" :loopVal="bRALoopVal" :reviewedBy="true" />
          <a-card class="white-card-smart-lab">
            <h2>POST EXECUTION BATCH RECORD REVIEW</h2>
            <a-row>
              <a-col style="text-align:center">OPERATIONS REVIEW</a-col>
            </a-row>
            <p>This batch record has been reviewed by Operations for technical content and conforms to the requirements defined herein.</p>
            <a-row>
              <a-col>Comments:</a-col>
            </a-row>
            <a-row>
              <a-col><a-form-item><a-textarea style="border-radius:1px" /></a-form-item></a-col>
            </a-row>
            <a-row>
              <a-col :span="2" class="text-right mt-15 mr-10"><span>NAME</span></a-col><a-col :span="9"><a-form-item><a-input /></a-form-item></a-col>
              <a-col :span="2" class="text-right mt-15 mr-10"><span>TITLE</span></a-col><a-col :span="10"><a-form-item><a-input /></a-form-item></a-col>
            </a-row>
            <a-row>
              <a-col :span="2" class="text-right mt-15 mr-10"><span>SIGNATURE</span></a-col><a-col :span="9"><a-form-item><a-input /></a-form-item></a-col>
              <a-col :span="2" class="text-right mt-15 mr-10"><span>DATE</span></a-col><a-col :span="10"><a-form-item><a-input /></a-form-item></a-col>
            </a-row>          
          </a-card>
          <a-card class="white-card-smart-lab">
            <h2>EXPERIC QUALITY ASSURANCE REVIEW</h2>
            <a-row>
              <a-col style="text-align:center">EVENTS/DEVIATIONS</a-col>
            </a-row>
            <a-row>
              <a-col>Itemize All Events/Deviations related to this lot:</a-col>
            </a-row>
            <a-row>
              <a-col><a-form-item><a-textarea style="border-radius:1px" /></a-form-item></a-col>
            </a-row>
            <a-row>
              <a-col :span="2" class="text-right mt-15 mr-10"><span>NAME</span></a-col><a-col :span="9"><a-form-item><a-input /></a-form-item></a-col>
              <a-col :span="2" class="text-right mt-15 mr-10"><span>TITLE</span></a-col><a-col :span="10"><a-form-item><a-input /></a-form-item></a-col>
            </a-row>
            <a-row>
              <a-col :span="2" class="text-right mt-15 mr-10"><span>SIGNATURE</span></a-col><a-col :span="9"><a-form-item><a-input /></a-form-item></a-col>
              <a-col :span="2" class="text-right mt-15 mr-10"><span>DATE</span></a-col><a-col :span="10"><a-form-item><a-input /></a-form-item></a-col>
            </a-row>
            <a-row>
              <a-col :span="10" class="mt-10">
                  All applicable Events/Deviations have been satisfied to allow lot disposition:
              </a-col>
              <a-col :span="10"> 
                <a-form-item><a-checkbox>Yes</a-checkbox><a-checkbox>N/A</a-checkbox></a-form-item>
              </a-col>
            </a-row>       
            <h2>PRODUCT DISPOSITION: (Conforms to the requirement defined for the material manufactured)</h2>
            <a-row>
            <a-col :span="10" class="mt-10 mr-5" style="text-align:right">Conforms to Requirements:</a-col>  
            <a-col :span="1">
              <a-form-item><a-checkbox /></a-form-item>
            </a-col>
            <a-col :span="1" />
            <a-col :span="4"> Quantity Accepted: </a-col>
            <a-col :span="5"><a-form-item><a-input /></a-form-item> </a-col>
            </a-row>
            <a-row>
            <a-col :span="10" class="mt-10 mr-5" style="text-align:right">
              Does Not Conform to Requirements:
            </a-col>
            <a-col :span="1">
              <a-form-item><a-checkbox /></a-form-item>
            </a-col>
            <a-col :span="1" />
            <a-col :span="4"> Quantity Rejected: </a-col>
            <a-col :span="5"><a-form-item><a-input /></a-form-item> </a-col>
            </a-row>
            <a-row>
            <a-col :span="10" class="mt-15" style="text-align:right">Reason material Does Not Conform:</a-col>
            <a-col :span="2" />
            <a-col :span="11" style="margin-left:20px"><a-form-item><a-input /></a-form-item> </a-col>
            </a-row>
            <a-row>
              <a-col :span="2" class="text-right mt-15 mr-10"><span>NAME</span></a-col><a-col :span="9"><a-form-item><a-input /></a-form-item></a-col>
              <a-col :span="2" class="text-right mt-15 mr-10"><span>TITLE</span></a-col><a-col :span="10"><a-form-item><a-input /></a-form-item></a-col>
            </a-row>
            <a-row>
              <a-col :span="2" class="text-right mt-15 mr-10"><span>SIGNATURE</span></a-col><a-col :span="9"><a-form-item><a-input /></a-form-item></a-col>
              <a-col :span="2" class="text-right mt-15 mr-10"><span>DATE</span></a-col><a-col :span="10"><a-form-item><a-input /></a-form-item></a-col>
            </a-row>  
            <a-row>
              <a-col>Comments:</a-col>
            </a-row>
            <a-row>
              <a-col><a-form-item><a-textarea style="border-radius:1px" /></a-form-item></a-col>
            </a-row>
          </a-card>
          <a-card class="white-card-smart-lab">
            <h2>FINAL PRODUCT DISPOSITION: (CLIENT APPROVAL)</h2>
          <a-row>
            <a-col :span="2" class="mt-10 mr-10" style="text-align:right">
              APPROVED
            </a-col>
            <a-col :span="1">
              <a-form-item><a-checkbox style="padding-right:10px" /></a-form-item>
            </a-col>
            <a-col :span="7" class="mt-10 mr-10" style="text-align:right">
              QUARANTINE (FURTHER INSTRUCTIONS TO FOLLOW)
            </a-col>
            <a-col :span="1">
              <a-form-item><a-checkbox style="padding-right:10px" /></a-form-item>
            </a-col>
            <a-col :span="2" class="mt-10 mr-10" style="text-align:right">
              REJECT
            </a-col>
            <a-col :span="1">
              <a-form-item><a-checkbox style="padding-right:10px" /></a-form-item>
            </a-col>                    
          </a-row>
          <a-row>
              <a-col :span="2" class="text-right mt-15 mr-10"><span>NAME</span></a-col><a-col :span="9"><a-form-item><a-input /></a-form-item></a-col>
              <a-col :span="2" class="text-right mt-15 mr-10"><span>TITLE</span></a-col><a-col :span="10"><a-form-item><a-input /></a-form-item></a-col>
          </a-row>
          <a-row>
            <a-col :span="2" class="text-right mt-15 mr-10"><span>SIGNATURE</span></a-col><a-col :span="9"><a-form-item><a-input /></a-form-item></a-col>
            <a-col :span="2" class="text-right mt-15 mr-10"><span>DATE</span></a-col><a-col :span="10"><a-form-item><a-input /></a-form-item></a-col>
          </a-row>
          </a-card>
        <!-- // make its component -->
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        filename="cryoport"
        :pdf-quality="3"
        :manual-pagination="true"
        pdf-format="a4"
        :pdf-margin="5"
        pdf-orientation="landscape"
        pdf-content-width="1100px"
        @progress="onProgress($event)"
        ref="html2Pdf"
      >
        <section slot="pdf-content">
          <print-form :name="'titlePage'" :data="coustomDataTitlePage" :tag="tag" />
          <a-card class="white-card-smart-lab">
            <p><b>APPROVALS:</b> This record has been reviewed by the undersigned personnel and has been found to be complete and appropriate for the activities documented herein.</p>
            <a-row>
              <a-col :span="3" class="mt-5" style="height:30px"><span>Client:</span></a-col>
              <a-col :span="7" class="ml-5" style="border: 2px solid black;height:30px"><p v-if="tag==='tag2'">James Cooper</p><p v-else>&nbsp;</p></a-col>
              <a-col :span="7" class="ml-5" style="border: 2px solid black;height:30px"><p v-if="tag==='tag2'">Lorem ipsum</p><p v-else>&nbsp;</p></a-col>
              <a-col :span="6" class="ml-5" style="border: 2px solid black;height:30px"><p v-if="tag==='tag2'">23/09/22</p><p v-else>&nbsp;</p></a-col>
            </a-row>
            <a-row>
              <a-col :span="3" class="mt-15"><span></span></a-col>
              <a-col :span="7" style="text-align:center" class="ml-5">Name</a-col>
              <a-col :span="7" style="text-align:center" class="ml-5">Signature</a-col>
              <a-col :span="6" style="text-align:center" class="ml-5">Date</a-col>
            </a-row>
            <a-row>
              <a-col :span="3" class="mt-5" style="height:30px"><span>Client:</span></a-col>
              <a-col :span="7" class="ml-5" style="border: 2px solid black;height:30px"><p v-if="tag==='tag2'">James Cooper</p><p v-else>&nbsp;</p></a-col>
              <a-col :span="7" class="ml-5" style="border: 2px solid black;height:30px"><p v-if="tag==='tag2'">Lorem ipsum</p><p v-else>&nbsp;</p></a-col>
              <a-col :span="6" class="ml-5" style="border: 2px solid black;height:30px"><p v-if="tag==='tag2'">23/09/22</p><p v-else>&nbsp;</p></a-col>
            </a-row>
            <a-row>
              <a-col :span="3" class="mt-15" ><span></span></a-col>
              <a-col :span="7" style="text-align:center" class="ml-5">Name</a-col>
              <a-col :span="7" style="text-align:center" class="ml-5">Signature</a-col>
              <a-col :span="6" style="text-align:center" class="ml-5">Date</a-col>
            </a-row>
            <h2>SECTION TO BE COMPLETED UPON ISSUANCE OF BATCH PRODUCTION RECORD.</h2>
            <a-row style="padding-bottom:15px">
              <a-col :span="7" style="border: 1px solid black;height:90px;">
                Batch Production Record (BPR) Number: (Verify Work Order information to confirm BPR/Lot information was not previously assigned for preprinting of labels)
              </a-col>
              <a-col :span="16" class="ml-5" style="border: 1px solid black;height:90px">
                <p v-if="tag==='tag2'">124578</p><p v-else>&nbsp;</p>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="7" style="border: 1px solid black;height:50px"><span>Experic Quality Approval of Batch Production Record Issued By:</span></a-col>
              <a-col :span="5" class="ml-5" style="border: 1px solid black;height:50px"><p v-if="tag==='tag2'">James Cooper</p><p v-else>&nbsp;</p></a-col>
              <a-col :span="6" class="ml-5" style="border: 1px solid black;height:50px"><p v-if="tag==='tag2'">Lorem ipsum</p><p v-else>&nbsp;</p></a-col>
              <a-col :span="5" class="ml-5" style="border: 1px solid black;height:50px"><p v-if="tag==='tag2'">23/09/22</p><p v-else>&nbsp;</p></a-col>
            </a-row>
            <a-row>
              <a-col :span="7"><span></span></a-col>
              <a-col :span="5" style="text-align:center" class="ml-5">Name</a-col>
              <a-col :span="6" style="text-align:center" class="ml-5">Signature</a-col>
              <a-col :span="5" style="text-align:center" class="ml-5">Date</a-col>
            </a-row>
          </a-card>
          <div style="page-break-after: always;"></div>
          <print-form :headingTitle="titlePerson" :name="'person'" :text="textPerson" :tag="tag" :customCol="customColsPerson" @handelPositiv="increasePersonVal" @handelNegative="decreasePersonVal" :loopVal="personLoopVal" :reviewedBy="true" />
          <div style="page-break-after: always;"></div>
          <print-form :headingTitle="titleBatch" :name="'batch'" :customCol="customColsBatchRec" @handelPositiv="increaseBatchVal" @handelNegative="decreaseBatchVal" :loopVal="batchLoopVal" :reviewedBy="true" />
          <div style="page-break-after: always;"></div>
          <print-form :headingTitle="titleBills" :name="'bills'" :customCol="customColsBills" @handelPositiv="increaseBillsVal" @handelNegative="decreaseBillsVal" :loopVal="billsLoopVal" />
          <div style="page-break-after: always;"></div>
          <print-form :headingTitle="titleEquipment" :name="'equipment'" :text="textEquipment" :customCol="customColsEquipment" @handelPositiv="increaseEquipmentVal" @handelNegative="decreaseEquipmentVal" :loopVal="equipmentLoopVal" :reviewedBy="true" />
          <div style="page-break-after: always;"></div>
          <print-form :headingTitle="titleLine" :name="'line'" :text="textLine" :customCol="customColsLine" :data="coustomDataLine" :loopVal="2" :reviewedBy="true" />
          <div style="page-break-after: always;"></div>
          <print-form :headingTitle="titleStage" :name="'stage'" :customCol="customColsStage" @handelPositiv="increaseStageVal" @handelNegative="decreaseStageVal" :loopVal="stageLoopVal" :reviewedBy="true" />
          <print-form :headingTitle="titlePI" :name="'pI'" :customCol="customColsPI" @handelPositiv="increasePIVal" @handelNegative="decreasePIVal" :loopVal="pILoopVal" />
          <div style="page-break-after: always;"></div>
          <print-form :headingTitle="titleMI" :name="'mI'" :customCol="customColsMI" @handelPositiv="increaseMIVal" @handelNegative="decreaseMIVal" :loopVal="mILoopVal" :reviewedBy="true" />
          <div style="page-break-after: always;"></div>
          <print-form :headingTitle="titleMR" :name="'mR'" :customCol="customColsMR" @handelPositiv="increaseMRVal" @handelNegative="decreaseMRVal" :loopVal="mRLoopVal" :reviewedBy="true" :verifiedBy="true" :performedBy="true" />
          <div style="page-break-after: always;"></div>
          <print-form :headingTitle="titleSR" :name="'sR'" :text="textSR" :customCol="customColsSR" @handelPositiv="increaseSRVal" @handelNegative="decreaseSRVal" :loopVal="sRLoopVal" :reviewedBy="true"  />
          <div style="page-break-after: always;"></div>
          <print-form :headingTitle="titleIPI" :name="'iPI'" :text="textIPI" :customCol="customColsIPI" :data="coustomDataIPI" :loopVal="5" />
          <div style="page-break-after: always;"></div>
          <print-form :headingTitle="titleIPIR" :name="'iPIR'" :customCol="customColsIPIR" @handelPositiv="increaseIPIRVal" @handelNegative="decreaseIPIRVal" :loopVal="iPIRLoopVal" :reviewedBy="true" />
          <div style="page-break-after: always;"></div>
          <print-form :headingTitle="titleAIPIR" :name="'aIPIR'" :customCol="customColsAIPIR" @handelPositiv="increaseAIPIRVal" @handelNegative="decreaseAIPIRVal" :loopVal="aIPIRLoopVal" :reviewedBy="true" />
          <div style="page-break-after: always;"></div>
          <print-form :headingTitle="titlePLoc" :name="'pLoc'" :customCol="customColsPLoc" @handelPositiv="increasePLocVal" @handelNegative="decreasePLocVal" :loopVal="pLocLoopVal" />
          <print-form :headingTitle="titleRLoc" :name="'rLoc'" :customCol="customColsRLoc" @handelPositiv="increaseRLocVal" @handelNegative="decreaseRLocVal" :loopVal="rLocLoopVal" :reviewedBy="true" />
          <div style="page-break-after: always;"></div>
          <print-form :headingTitle="titleLS" :text="textLS" :name="'lSamp'" :customCol="customColsLS" :loopVal="1" :reviewedBy="true" :verifiedBy="true" :performedBy="true" :showButton="false" />
          <a-card class="white-card-smart-lab">
            <h2>IN-PROCESS NOTES</h2>
            <p style="height:100px;border: 1px solid black;">&nbsp;</p>
            <a-row>
              <a-col :span="3" class="mt-15"><span>Performed By:</span></a-col><a-col :span="8">&nbsp;</a-col>
              <a-col :span="3" class="text-right mt-15 mr-10"><span>Date:</span></a-col><a-col :span="8">&nbsp;</a-col>
            </a-row>
          </a-card>
          <div style="page-break-after: always;"></div>
          <print-form :headingTitle="titleBRA" :name="'bRA'" :customCol="customColsBRA" @handelPositiv="increaseBRAVal" @handelNegative="decreaseBRAVal" :loopVal="bRALoopVal" :reviewedBy="true" />
          <div style="page-break-after: always;"></div>
          <a-card class="white-card-smart-lab">
            <h2>POST EXECUTION BATCH RECORD REVIEW</h2>
            <a-row>
              <a-col style="text-align:center">OPERATIONS REVIEW</a-col>
            </a-row>
            <p>This batch record has been reviewed by Operations for technical content and conforms to the requirements defined herein.</p>
            <a-row>
              <a-col style="border: 1px solid black;">Comments:</a-col>
            </a-row>
            <a-row>
              <a-col style="height:100px;border: 1px solid black;">&nbsp;</a-col>
            </a-row>
            <a-row>
              <a-col :span="3" class="text-right mt-15 mr-10" style="height:20px;"><span>NAME</span></a-col><a-col :span="8" style="height:20px;">&nbsp;</a-col>
              <a-col :span="3" class="text-right mt-15 mr-10" style="height:20px;"><span>TITLE</span></a-col><a-col :span="9" style="height:20px;">&nbsp;</a-col>
            </a-row>
            <a-row>
              <a-col :span="3" class="text-right mt-15 mr-10" style="height:20px;"><span>SIGNATURE</span></a-col><a-col :span="8" style="height:20px;">&nbsp;</a-col>
              <a-col :span="3" class="text-right mt-15 mr-10" style="height:20px;"><span>DATE</span></a-col><a-col :span="9" style="height:20px;">&nbsp;</a-col>
            </a-row>          
            <h2>EXPERIC QUALITY ASSURANCE REVIEW</h2>
            <a-row>
              <a-col style="text-align:center">EVENTS/DEVIATIONS</a-col>
            </a-row>
            <a-row>
              <a-col>Itemize All Events/Deviations related to this lot:</a-col>
            </a-row>
            <a-row>
              <a-col style="height:50px;border: 1px solid black;">&nbsp;</a-col>
            </a-row>
            <a-row>
              <a-col :span="3" class="text-right mt-15 mr-10" style="height:20px;"><span>NAME</span></a-col><a-col :span="8" style="height:20px;">&nbsp;</a-col>
              <a-col :span="3" class="text-right mt-15 mr-10" style="height:20px;"><span>TITLE</span></a-col><a-col :span="9" style="height:20px;">&nbsp;</a-col>
            </a-row>
            <a-row>
              <a-col :span="3" class="text-right mt-15 mr-10" style="height:20px;"><span>SIGNATURE</span></a-col><a-col :span="8" style="height:20px;">&nbsp;</a-col>
              <a-col :span="3" class="text-right mt-15 mr-10" style="height:20px;"><span>DATE</span></a-col><a-col :span="9" style="height:20px;">&nbsp;</a-col>
            </a-row>  
            <a-row>
              <a-col :span="13" class="mt-10">
                  All applicable Events/Deviations have been satisfied to allow lot disposition:
              </a-col>
              <a-col :span="8"> 
                <a-form-item><a-checkbox>Yes</a-checkbox><a-checkbox>N/A</a-checkbox></a-form-item>
              </a-col>
            </a-row>
          </a-card>
          <div style="page-break-after: always;"></div>
          <a-card class="white-card-smart-lab">       
            <h2>PRODUCT DISPOSITION: (Conforms to the requirement defined for the material manufactured)</h2>
            <a-row>
            <a-col :span="10" class="mt-10 mr-5" style="text-align:right;height:30px;">Conforms to Requirements:</a-col>  
            <a-col :span="1" style="height:30px;">
              <a-form-item><a-checkbox /></a-form-item>
            </a-col>
            <a-col :span="1" style="height:30px;" />
            <a-col :span="4" class="mt-10" style="height:30px;"> Quantity Accepted: </a-col>
            <a-col :span="5" style="height:30px;">&nbsp;</a-col>
            </a-row>
            <a-row>
            <a-col :span="10" class="mt-10 mr-5" style="text-align:right;height:30px;">
              Does Not Conform to Requirements:
            </a-col>
            <a-col :span="1" style="height:30px;">
              <a-form-item><a-checkbox /></a-form-item>
            </a-col>
            <a-col :span="1" style="height:30px;" />
            <a-col :span="4" class="mt-10" style="height:30px;"> Quantity Rejected: </a-col>
            <a-col :span="5" style="height:30px;">&nbsp;</a-col>
            </a-row>
            <a-row>
            <a-col :span="10" class="mt-10" style="text-align:right;height:20px;">Reason material Does Not Conform:</a-col>
            <a-col :span="2" style="height:20px;" />
            <a-col :span="11" class="mt-10" style="border: 1px solid black;height:50px;">&nbsp;</a-col>
            </a-row>
            <a-row>
              <a-col :span="3" class="text-right mt-15 mr-10" style="height:20px;"><span>NAME</span></a-col><a-col :span="8" style="height:20px;">&nbsp;</a-col>
              <a-col :span="3" class="text-right mt-15 mr-10" style="height:20px;"><span>TITLE</span></a-col><a-col :span="9" style="height:20px;">&nbsp;</a-col>
            </a-row>
            <a-row>
              <a-col :span="3" class="text-right mt-15 mr-10" style="height:20px;"><span>SIGNATURE</span></a-col><a-col :span="8" style="height:20px;">&nbsp;</a-col>
              <a-col :span="3" class="text-right mt-15 mr-10" style="height:20px;"><span>DATE</span></a-col><a-col :span="9" style="height:20px;">&nbsp;</a-col>
            </a-row>  
            <a-row>
              <a-col>Comments:</a-col>
            </a-row>
            <a-row>
              <a-col style="height:100px;border: 1px solid black;">&nbsp;</a-col>
            </a-row>
            <h2>FINAL PRODUCT DISPOSITION: (CLIENT APPROVAL)</h2>
          <a-row>
            <a-col :span="2" class="mt-10 mr-10" style="text-align:right">
              APPROVED
            </a-col>
            <a-col :span="1">
              <a-form-item><a-checkbox style="padding-right:10px" /></a-form-item>
            </a-col>
            <a-col :span="8" class="mt-10 mr-10" style="text-align:right">
              QUARANTINE (FURTHER INSTRUCTIONS TO FOLLOW)
            </a-col>
            <a-col :span="1">
              <a-form-item><a-checkbox style="padding-right:10px" /></a-form-item>
            </a-col>
            <a-col :span="2" class="mt-10 mr-10" style="text-align:right">
              REJECT
            </a-col>
            <a-col :span="1">
              <a-form-item><a-checkbox style="padding-right:10px" /></a-form-item>
            </a-col>                    
          </a-row>
          <a-row>
              <a-col :span="3" class="text-right mt-15 mr-10" style="height:20px;"><span>NAME</span></a-col><a-col :span="8" style="height:20px;">&nbsp;</a-col>
              <a-col :span="3" class="text-right mt-15 mr-10" style="height:20px;"><span>TITLE</span></a-col><a-col :span="9" style="height:20px;">&nbsp;</a-col>
            </a-row>
            <a-row>
              <a-col :span="3" class="text-right mt-15 mr-10" style="height:20px;"><span>SIGNATURE</span></a-col><a-col :span="8" style="height:20px;">&nbsp;</a-col>
              <a-col :span="3" class="text-right mt-15 mr-10" style="height:20px;"><span>DATE</span></a-col><a-col :span="9" style="height:20px;">&nbsp;</a-col>
            </a-row> 
          </a-card>
        </section>
      </vue-html2pdf>
    </div>
</template>
<script>

import VueHtml2pdf from "vue-html2pdf"
import CustomForm from '~/components/inventory/report/customForm.vue'
import PrintForm from '~/components/inventory/report/printAbleForm.vue'
export const customColsPerson = [
  {
    name: 'NAME',
    key: 0,
    width:5,
    control:'',
    data:'James Cooper',
  },
  {
    name: 'SIGNATURE',
    key: 1,
    width:5,
    control:'',
    data:'Lorem ipsum',
  },
  {
    name: 'TITLE',
    key: 2,
    width:5,
    control:'',
    data:'Lorem ipsum Lorem ipsum',
  },
  {
    name: 'ROLE PERFORMED',
    key: 3,
    width:5,
    control:'',
    data:'Lorem ipsum'
  },
  {
    name: 'INITIALS',
    key: 4,
    width:2,
    control:'',
    data:'',
  },
  {
    name: 'DATE',
    key: 5,
    width:2,
    control:'',
    data:'23/09/22',
  },
]
export const customColsBRA = [
  {
    name: 'Attachment #',
    key: 0,
    width:3,
    control:'',
  },
  {
    name: 'Title',
    key: 1,
    width:17,
    control:'',
  },
  {
    name: 'Initials / Date',
    key: 2,
    width:4,
    control:'',
  },
]
export const customColsStage = [
  {
    name: 'ITEM NUMBER',
    key: 0,
    width:3,
    control:'',
  },
  {
    name: 'MATERIAL DESCRIPTION',
    key: 1,
    width:8,
    control:'',
  },
  {
    name: 'LOT NUMBER',
    key: 2,
    width:3,
    control:'',
  },
  {
    name: 'EXPIRATION DATE',
    key: 3,
    width:2,
    control:'',
  },
  {
    name: 'EXPIRATION DATE',
    key: 4,
    width:2,
    control:'',
  },
  {
    name: 'QUANTITY STAGED',
    key: 5,
    width:2,
    control:'',
  },
  {
    name: 'PERFORMED BY OPERATIONS (INITIALS/DATE)',
    key: 6,
    width:2,
    control:'',
  },
  {
    name: 'VERIFIED BY QUALITY (INITIALS/DATE)',
    key: 7,
    width:2,
    control:'',
  },    
]
export const customColsEquipment = [
  {
    name: 'Equipment ID',
    key: 0,
    width:2,
    control:'',
  },
  {
    name: 'Equipment Description',
    key: 1,
    width:12,
    control:'',
  },
  {
    name: 'Calibration / PM Due Date',
    key: 2,
    width:3,
    control:'N/A',
  },
  {
    name: 'Cleaning Verified',
    key: 3,
    width:3,
    control:'Yes/No',
  },
  {
    name: 'Performed by Operations (Initials/Date)',
    key: 4,
    width:2,
    control:'',
  },
  {
    name: 'Verified by Quality (Initials/Date)',
    key: 5,
    width:2,
    control:'',
  },
]
export const customColsBills = [
  {
    name: 'ITEM #',
    key: 0,
    width:4,
    control:'',
  },
  {
    name: 'ITEM DESCRIPTION',
    key: 1,
    width:13,
    control:'',
  },
  {
    name: 'REVISION',
    key: 2,
    width:2,
    control:'',
  },
  {
    name: 'PARTS PER UNIT',
    key: 3,
    width:2,
    control:'',
  },
  {
    name: 'ACCEPTABLE RECONCILIATION %',
    key: 4,
    width:3,
    control:'',
  },
]
export const customColsLine = [
  {
    name: 'Area Line Clearance Requirements',
    key: 0,
    width:13,
    control:'',
  },
  {
    name: 'Observations (Yes/No/N/A or value where applicable)',
    key: 1,
    width:5,
    control:'',
  },
  {
    name: 'Performed by Operations (Initials/Date)',
    key: 2,
    width:3,
    control:'',
  },
  {
    name: 'Verified by Quality (Initials/Date)',
    key: 3,
    width:3,
    control:'',
  },
]
export const customColsPI = [
  {
    name: 'Steps',
    key: 0,
    width:2,
    control:'serial',
  },
  {
    name: 'Observations (Yes/No/N/A or value where applicable)',
    key: 1,
    width:22,
    control:'',
  },
]
export const customColsMI = [
  {
    name: 'Steps',
    key: 0,
    width:1,
    control:'serial',
  },
  {
    name: 'INSTRUCTIONS',
    key: 1,
    width:16,
    control:'',
  },
  {
    name: 'PERFORMED BY OPERATIONS (INITIALS/DATE)',
    key: 2,
    width:4,
    control:'',
  },
  {
    name: 'VERIFIED BY QUALITY (INITIALS/DATE)',
    key: 3,
    width:3,
    control:'',
  },
]
export const customColsMR = [
  {
    name: 'ITEM NUMBER',
    key: 0,
    width:3,
    control:'',
  },
  {
    name: 'LOT NUMBER',
    key: 1,
    width:3,
    control:'',
  },
  {
    name: 'QUANTITY STAGED(A)',
    key: 2,
    width:3,
    control:'',
  },
  {
    name: 'QUANTITY PRODUCED(B)',
    key: 3,
    width:2,
    control:'',
  },
  {
    name: 'REJECTS(C)',
    key: 4,
    width:2,
    control:'',
  },
  {
    name: 'SAMPLES(D)',
    key: 5,
    width:2,
    control:'',
  },
  {
    name: 'BALANCE ON HAND (RETURN TO INVENTORY)(E)',
    key: 6,
    width:3,
    control:'',
  },
  {
    name: 'TOTAL(F)',
    key: 7,
    width:2,
    control:'',
  }, 
  {
    name: 'ACCEPTABLE RECONCILIATION LIMIT %',
    key: 8,
    width:2,
    control:'',
  },
  {
    name: 'RECONCILIATION %(G)',
    key: 9,
    width:2,
    control:'',
  },
]
export const customColsSR = [
  {
    name: 'TYPE (RETENTION, ANALYTICAL, MICRO, ETC.)',
    key: 0,
    width:5,
    control:'',
  },
  {
    name: 'SAMPLE INTERVAL AND QUANTITY PER INTERVAL (BEGINNING, MIDDLE END)',
    key: 1,
    width:5,
    control:'',
  },
  {
    name: 'TOTAL SAMPLE QUANTITY PER TYPE',
    key: 2,
    width:5,
    control:'',
  },
  {
    name: 'SAMPLED BY / DATE',
    key: 3,
    width:5,
    control:'',
  },
  {
    name: 'VERIFIED BY / DATE',
    key: 4,
    width:4,
    control:'',
  },
]
export const customColsIPIR = [
  {
    name: 'DATE',
    key: 0,
    width:2,
    control:'',
  },
  {
    name: 'TIME',
    key: 1,
    width:2,
    control:'',
  },
  {
    name: 'CONTAINER #',
    key: 2,
    width:4,
    control:'',
  },
  {
    name: 'SAMPLE QUANTITY',
    key: 3,
    width:4,
    control:'',
  },
  {
    name: 'NO OF ACCEPTABLE UNITS',
    key: 4,
    width:2,
    control:'',
  },
  {
    name: 'NO OF UNACCEPTABLE UNITS',
    key: 5,
    width:2,
    control:'',
  },
  {
    name: 'PERFORMED BY/DATE',
    key: 6,
    width:2,
    control:'',
  },
  {
    name: 'COMMENTS',
    key: 7,
    width:6,
    control:'',
  },
]
export const customColsAIPIR = [
  {
    name: 'DATE',
    key: 0,
    width:2,
    control:'',
  },
  {
    name: 'TIME',
    key: 1,
    width:2,
    control:'',
  },
  {
    name: 'CONTAINER #',
    key: 2,
    width:4,
    control:'',
  },
  {
    name: 'SAMPLE QUANTITY',
    key: 3,
    width:4,
    control:'',
  },
  {
    name: 'NO OF ACCEPTABLE UNITS',
    key: 4,
    width:2,
    control:'',
  },
  {
    name: 'NO OF UNACCEPTABLE UNITS',
    key: 5,
    width:2,
    control:'',
  },
  {
    name: 'PERFORMED BY/DATE',
    key: 6,
    width:2,
    control:'',
  },
  {
    name: 'COMMENTS',
    key: 7,
    width:6,
    control:'',
  },
]
export const customColsPLoc = [
  {
    name: 'DATE',
    key: 0,
    width:3,
    control:'',
  },
  {
    name: 'ACCEPTABLE UNITS',
    key: 1,
    width:5,
    control:'',
  },
  {
    name: 'UNACCEPTABLE UNITS',
    key: 2,
    width:5,
    control:'',
  },
  {
    name: 'PERFORMED BY/DATE',
    key: 3,
    width:5,
    control:'',
  },
  {
    name: 'COMMENTS',
    key: 4,
    width:6,
    control:'',
  },
]
export const customColsRLoc = [
  {
    name: 'DATE',
    key: 0,
    width:3,
    control:'',
  },
  {
    name: 'OPERATOR',
    key: 1,
    width:3,
    control:'',
  },
  {
    name: 'NO. OF REJECTS',
    key: 2,
    width:4,
    control:'',
  },
  {
    name: 'REASON FOR REJECT',
    key: 3,
    width:14,
    control:'',
  },
]
export const customColsIPI = [
  {
    name: 'ATTRIBUTE',
    key: 0,
    width:3,
    control:'',
  },
  {
    name: 'QUANTITY',
    key: 1,
    width:2,
    control:'',
  },
  {
    name: 'TEST',
    key: 2,
    width:2,
    control:'',
  },
  {
    name: 'METHOD',
    key: 3,
    width:2,
    control:'',
  },  
  {
    name: 'ACCEPTANCE CRITERIA',
    key: 4,
    width:15,
    control:'',
  },
]
export const customColsLS = [
  {
    name: 'BOM Item Number(s)',
    key: 0,
    width:24,
    control:'textArea',
  },
]
export const customDataLineRow1 = [
  {
    text: 'Materials and/or packaging components from previous activity have been removed from the room, equipment, and trash receptacles.',
    key: 0,
    width:13,
    control:'text',
    height:'70px',
  },
  {
    text: '',
    key: 1,
    width:5,
    control:'Yes/No',
    height:'70px',
  },
  {
    name: '',
    key: 2,
    width:3,
    control:'',
    height:'70px',
  },
  {
    name: '',
    key: 3,
    width:3,
    control:'',
    height:'70px',
  }
]
export const customDataLineRow2 = [
  {
    text: 'Room and Equipment Logbooks have been updated to reflect new activity to be performed.',
    key: 0,
    width:13,
    control:'text',
    height:'60px',
  },
  {
    text: '',
    key: 1,
    width:5,
    control:'Yes/No',
    height:'60px',
  },
  {
    name: '',
    key: 2,
    width:3,
    control:'',
    height:'60px',
  },
  {
    name: '',
    key: 3,
    width:3,
    control:'',
    height:'60px',
  }
]
export const customDataLineRow3 = [
  {
    text: 'The room and equipment status(es) is/are clearly labeled.',
    key: 0,
    width:13,
    control:'text',
    height:'50px',
  },
  {
    text: '',
    key: 1,
    width:5,
    control:'Yes/No',
    height:'50px',
  },
  {
    name: '',
    key: 2,
    width:3,
    control:'',
    height:'50px',
  },
  {
    name: '',
    key: 3,
    width:3,
    control:'',
    height:'50px',
  }
]
export const customDataLineRow4 = [
  {
    text: 'The room and equipment is / are released for use.',
    key: 0,
    width:13,
    control:'text',
    height:'50px',
  },
  {
    text: '',
    key: 1,
    width:5,
    control:'Yes/No',
    height:'50px',
  },
  {
    name: '',
    key: 2,
    width:3,
    control:'',
    height:'50px',
  },
  {
    name: '',
    key: 3,
    width:3,
    control:'',
    height:'50px',
  }
]
export const customDataLineRow5 = [
  {
    text: 'All materials are staged and match the Bill of Materials (BOM)? ',
    key: 0,
    width:13,
    control:'text',
    height:'50px',
  },
  {
    text: '',
    key: 1,
    width:5,
    control:'Yes/No',
    height:'50px',
  },
  {
    name: '',
    key: 2,
    width:3,
    control:'',
    height:'50px',
  },
  {
    name: '',
    key: 3,
    width:3,
    control:'',
    height:'50px',
  }
]
export const customDataLineRow6 = [
  {
    text: 'All materials have been previously approved for use and are labeled appropriately.',
    key: 0,
    width:13,
    control:'text',
    height:'70px',
  },
  {
    text: '',
    key: 1,
    width:5,
    control:'Yes/No',
    height:'70px',
  },
  {
    name: '',
    key: 2,
    width:3,
    control:'',
    height:'70px',
  },
  {
    name: '',
    key: 3,
    width:3,
    control:'',
    height:'70px',
  }
]
export const customDataLineRow7 = [
  {
    text: 'If No, Have the materials needed to start manufacturing been approved for use and labelled appropriately? (Manufacturing can proceed if “Yes” and remaining BOM materials shall be verified in Step 8 below)',
    key: 0,
    width:13,
    control:'text',
    height:'70px',
  },
  {
    text: '',
    key: 1,
    width:5,
    control:'Yes/No/NA',
    height:'70px',
  },
  {
    name: '',
    key: 2,
    width:3,
    control:'',
    height:'70px',
  },
  {
    name: '',
    key: 3,
    width:3,
    control:'',
    height:'70px',
  }
]
export const customDataLineRow8 = [
  {
    text: 'Remaining BOM materials are staged, approved, and labeled for use? (This step shall remain blank until remaining materials are available to complete the manufacturing process.)',
    key: 0,
    width:13,
    control:'text',
    height:'70px',
  },
  {
    text: '',
    key: 1,
    width:5,
    control:'Yes/No/NA',
    height:'70px',
  },
  {
    name: '',
    key: 2,
    width:3,
    control:'',
    height:'70px',
  },
  {
    name: '',
    key: 3,
    width:3,
    control:'',
    height:'70px',
  }
]
export const coustomDataLine=[customDataLineRow1, 
                                customDataLineRow2, 
                                customDataLineRow3, 
                                customDataLineRow4, 
                                customDataLineRow5, 
                                customDataLineRow6, 
                                customDataLineRow7,
                                customDataLineRow8,
                                ]
export const coustomDataTitlePage=[[
  {
    text: 'ITEM #:',
    key: 0,
    width:8,
    control:'text',
    height:'40px',
    data:'',
  },
  {
    text: '',
    key: 1,
    width:16,
    control:'',
    height:'40px',
    data:'34578',
  },
],[
  {
    text: 'ITEM DESCRIPTION:',
    key: 0,
    width:8,
    control:'text',
    height:'40px',
    data:'',
  },
  {
    text: '',
    key: 1,
    width:16,
    control:'',
    height:'40px',
    data:'Lorem ipsum dolor sit amet, consectetur adipiscing elit consectetur adipiscing elit',
  },
],[
  {
    text: 'ROOM TEMPERATURE:',
    key: 0,
    width:8,
    control:'text',
    height:'40px',
    data:'',
  },
  {
    text: '',
    key: 1,
    width:16,
    control:'',
    height:'40px',
    data:'32 °C',
  },
],[
  {
    text: 'RELATIVE HUMIDITY:',
    key: 0,
    width:8,
    control:'text',
    height:'40px',
    data:'',
  },
  {
    text: '',
    key: 1,
    width:16,
    control:'',
    height:'40px',
    data:'47%',
  },
],[
  {
    text: 'Personal Protective Equipment (PPE) Requirements:',
    key: 0,
    width:8,
    control:'text',
    height:'60px',
    data:'',
  },
  {
    text: 'Refer to Pharmaceutical Based Exposure Control Limit Product Review Form DOC-000183[1]',
    key: 1,
    width:16,
    control:'text',
    height:'60px',
    data:'',
  },
]]
export const coustomDataIPI=[[
  {
    text: 'Appearance A',
    key: 0,
    width:3,
    control:'text',
    height:'30px',
  },
  {
    text: '',
    key: 1,
    width:3,
    control:'',
    height:'30px',
  },
  {
    text: 'Visual',
    key: 2,
    width:3,
    control:'text',
    height:'30px',
  },
  {
    text: 'NII AQL 0.065',
    key: 3,
    width:3,
    control:'text',
    height:'30px',
  },
  {
    text: '',
    key: 4,
    width:12,
    control:'',
    height:'30px',
  }
],[
  {
    text: 'Appearance B',
    key: 0,
    width:3,
    control:'text',
    height:'30px',
  },
  {
    text: '',
    key: 1,
    width:3,
    control:'',
    height:'30px',
  },
  {
    text: 'Visual',
    key: 2,
    width:3,
    control:'text',
    height:'30px',
  },
  {
    text: 'NII AQL 0.40',
    key: 3,
    width:3,
    control:'text',
    height:'30px',
  },
  {
    text: '',
    key: 4,
    width:12,
    control:'',
    height:'30px',
  }
],[
  {
    text: 'Appearance C',
    key: 0,
    width:3,
    control:'text',
    height:'30px',
  },
  {
    text: '',
    key: 1,
    width:3,
    control:'',
    height:'30px',
  },
  {
    text: 'Visual',
    key: 2,
    width:3,
    control:'text',
    height:'30px',
  },
  {
    text: 'NII AQL 0.40',
    key: 3,
    width:3,
    control:'text',
    height:'30px',
  },
  {
    text: '',
    key: 4,
    width:12,
    control:'',
    height:'30px',
  }
],[
  {
    text: 'Appearance D',
    key: 0,
    width:3,
    control:'text',
    height:'30px',
  },
  {
    text: '',
    key: 1,
    width:3,
    control:'',
    height:'30px',
  },
  {
    text: 'Visual',
    key: 2,
    width:3,
    control:'text',
    height:'30px',
  },
  {
    text: 'NII AQL 0.40',
    key: 3,
    width:3,
    control:'text',
    height:'30px',
  },
  {
    text: '',
    key: 4,
    width:12,
    control:'',
    height:'30px',
  }
],[
  {
    text: 'Seal Integrity',
    key: 0,
    width:3,
    control:'text',
    height:'30px',
  },
  {
    text: '',
    key: 1,
    width:3,
    control:'',
    height:'30px',
  },
  {
    text: 'DOC-000158',
    key: 2,
    width:3,
    control:'text',
    height:'30px',
  },
  {
    text: 'SIII AQL 0.40',
    key: 3,
    width:3,
    control:'text',
    height:'30px',
  },
  {
    text: '',
    key: 4,
    width:12,
    control:'',
    height:'30px',
  }
]
]                                
export const customColsBatchRec = [
  {
    name: 'Executable Pages',
    key: 0,
    width:10,
    control:'',
  },
  {
    name: '# of Pages Issued',
    key: 1,
    width:2,
    control:'',
  },
  {
    name: 'Issued By / Date',
    key: 2,
    width:2,
    control:'',
  },
  {
    name: '# of Additional Pages Issued',
    key: 3,
    width:2,
    control:'',
  },
  {
    name: 'Issued By / Date',
    key: 4,
    width:2,
    control:'',
  },
  {
    name: '# of Executed Pages Returned',
    key: 5,
    width:2,
    control:'',
  },
  {
    name: '# of Blank Pages Returned',
    key: 6,
    width:2,
    control:'',
  }, 
  {
    name: 'Verified By / Date',
    key: 7,
    width:2,
    control:'',
  },    
]
export default {
  components: {VueHtml2pdf, 'custom-form': CustomForm,'print-form': PrintForm },
  data(){
    return{
    customColsPerson,
    customColsBatchRec,
    customColsBills,
    customColsEquipment,
    customColsLine,
    coustomDataLine,
    coustomDataTitlePage,
    customColsStage,
    customColsPI,
    customColsMI,
    customColsMR,
    customColsSR,
    customColsIPI,
    coustomDataIPI,
    customColsIPIR,
    customColsAIPIR,
    customColsPLoc,
    customColsRLoc,
    customColsLS,
    customColsBRA,
    personLoopVal:5,
    batchLoopVal:10,
    billsLoopVal:5,
    equipmentLoopVal:10,
    lineLoopVal:5,
    stageLoopVal:5,
    pILoopVal:5,
    mILoopVal:12,
    mRLoopVal:5,
    sRLoopVal:5,
    iPILoopVal:5,
    iPIRLoopVal:5,
    aIPIRLoopVal:5,
    pLocLoopVal:5,
    rLocLoopVal:5,
    bRALoopVal:5,
    progressVal:0,
    tag:'',
    titleLine:'LINE CLEARANCE / START UP',
    titleEquipment:'EQUIPMENT',
    titlePerson:'PERSONNEL LOG',
    titleBills:'BILL OF MATERIAL',
    titleStage:'STAGING',
    titleMI:'MANUFACTURING INSTRUCTIONS',
    titlePI:'PACKAGING INSTRUCTIONS',
    titleMR:'MATERIAL RECONCILIATION',
    titleSR:'SAMPLING REQUIREMENTS:',
    titleIPI:'IN-PROCESS INSPECTIONS',
    titleIPIR:'IN-PROCESS INSPECTION RESULTS:',
    titleAIPIR:'IN-PROCESS INSPECTION RESULTS (CONTINUED):',
    titlePLoc:'PRODUCTION LOG',
    titleRLoc:'REJECT LOG',
    titleBRA:'BATCH RECORD ATTACHMENTS:',
    titleLS:'LABEL SAMPLE:',
    textLS:'Apply a representative container label (e.g. actual, scanned image) from each BOM item to the Label Sample pages within the batch record.  Record the corresponding BOM item number(s) on the Label Sample page.  If the label DOES NOT FIT in the space below, attach it to the reverse side of the Label Sample page and record “see reverse” in the space provided below, or, append it to the record and reference the attachment number in the space below, and on the Batch Record Attachments page.  If tape is being utilized to affix the label, Initial and Date across the tape.',
    titleBatch:'BATCH RECORD DOCUMENTATION RECONCILIATION LOG',
    textIPI:'Perform all startup and in-process inspections, including inspections after any planned or unplanned extended production stoppage, and close out activities according to DOC-000131.  Document unacceptable units or defects according to Experic standard operating procedure for Inspection Management.  ',
    textSR:'Refer to individual work order for sample requirements.  Label sample containers according to DOC-000131.',
    textLine:'Follow line clearance requirements per DOC-000122 and record the required information. If more than one room is used, a line clearance will be performed for each room, this line clearance document shall be issued by QA for each room used.',
    textPerson:'Each individual whose signature or initials appear within the executed production batch record must print their name and title, sign, and initial and date the Personnel Log. Signing this document ensures personnel understand the requirements and have been trained to execute processes defined within this record.  This documentation allows traceability for each signature and/or initials that appear throughout the executed document.' ,
    textEquipment:'Complete required information below for equipment used or N/A if not used.' ,
    }
  },
  mounted(){
    this.getParam()
  },
  methods:{
    getParam(){
      this.tag=this.$route.query.report
    },
    onProgress(event) {
      this.progressVal=event
      console.log(`Processed: ${event} / 100`)
    },
    hasGenerated() {
      alert("PDF generated successfully!")
    },
    generatePDF() {
      this.$refs.html2Pdf.generatePdf()
    },
    increasePersonVal(){
        this.personLoopVal=this.personLoopVal+1
    },
    decreasePersonVal(){
        this.personLoopVal=this.personLoopVal-1
    },
    increaseBatchVal(){
        this.batchLoopVal=this.batchLoopVal+1
    },
    decreaseBatchVal(){
        this.batchLoopVal=this.batchLoopVal-1
    },
    increaseBillsVal(){
      this.billsLoopVal=this.billsLoopVal+1
    },
    decreaseBillsVal(){
      this.billsLoopVal=this.billsLoopVal-1
    },
    increaseEquipmentVal(){
        this.equipmentLoopVal=this.equipmentLoopVal+1
    },
    decreaseEquipmentVal(){
        this.equipmentLoopVal=this.equipmentLoopVal-1
    },
    increaseLineVal(){
        this.lineLoopVal=this.lineLoopVal+1
    },
    decreaseLineVal(){
        this.lineLoopVal=this.lineLoopVal-1
    },
    increaseStageVal(){
        this.stageLoopVal=this.stageLoopVal+1
    },
    decreaseStageVal(){
        this.stageLoopVal=this.stageLoopVal-1
    },
    increasePIVal(){
        this.pILoopVal=this.pILoopVal+1
    },
    decreasePIVal(){
        this.pILoopVal=this.pILoopVal-1
    },
    increaseIPIVal(){
        this.iPILoopVal=this.iPILoopVal+1
    },
    decreaseIPIVal(){
        this.iPILoopVal=this.iPILoopVal-1
    },
    increaseIPIRVal(){
        this.iPIRLoopVal=this.iPIRLoopVal+1
    },
    decreaseIPIRVal(){
        this.iPIRLoopVal=this.iPIRLoopVal-1
    },
    increaseAIPIRVal(){
        this.aIPIRLoopVal=this.aIPIRLoopVal+1
    },
    decreaseAIPIRVal(){
        this.aIPIRLoopVal=this.aIPIRLoopVal-1
    },
    increasePLocVal(){
      this.pLocLoopVal=this.pLocLoopVal+1
    },
    decreasePLocVal(){
      this.pLocLoopVal=this.pLocLoopVal-1
    },
    increaseRLocVal(){
      this.rLocLoopVal=this.rLocLoopVal+1
    },
    decreaseRLocVal(){
      this.rLocLoopVal=this.rLocLoopVal-1
    },     
    decreaseMIVal(){
        this.mILoopVal=this.mILoopVal-1
    },
    increaseMIVal(){
        this.mILoopVal=this.mILoopVal+1
    },
    increaseSRVal(){
        this.sRLoopVal=this.sRLoopVal+1
    },
    decreaseSRVal(){
        this.sRLoopVal=this.sRLoopVal-1
    },
    increaseMRVal(){
        this.mRLoopVal=this.mRLoopVal+1
    },
    decreaseMRVal(){
        this.mRLoopVal=this.mRLoopVal-1
    },
    increaseBRAVal(){
        this.bRALoopVal=this.bRALoopVal+1
    },
    decreaseBRAVal(){
        this.bRALoopVal=this.bRALoopVal-1
    },               
  },
}
</script>