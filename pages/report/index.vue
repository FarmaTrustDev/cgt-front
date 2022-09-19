<template>
    <div>
        <!-- // make its component -->
        <custom-form :headingTitle="titlePerson" :name="'person'" :text="textPerson" :customCol="customColsPerson" @handelPositiv="increasePersonVal" @handelNegative="decreasePersonVal" :loopVal="personLoopVal" />
        <custom-form :headingTitle="titleBatch" :name="'batch'" :customCol="customColsBatchRec" @handelPositiv="increaseBatchVal" @handelNegative="decreaseBatchVal" :loopVal="batchLoopVal" />
        <custom-form :headingTitle="titleBills" :name="'bills'" :customCol="customColsBills" :loopVal="2" />
        <custom-form :headingTitle="titleEquipment" :name="'equipment'" :text="textEquipment" :customCol="customColsEquipment" :loopVal="2" />
        <custom-form :headingTitle="titleLine" :name="'line'" :text="textLine" :customCol="customColsLine" :data="coustomDataLine" :loopVal="2" />
        <custom-form :headingTitle="titleStage" :name="'stage'" :customCol="customColsStage" :loopVal="5" />
        <custom-form :headingTitle="titlePI" :name="'pI'" :customCol="customColsPI" :loopVal="7" />
        <custom-form :headingTitle="titleMI" :name="'mI'" :customCol="customColsMI" :loopVal="12" />
        <custom-form :headingTitle="titleMR" :name="'mR'" :customCol="customColsMR" :loopVal="5" />
        <custom-form :headingTitle="titleSR" :name="'sR'" :text="textSR" :customCol="customColsSR" :loopVal="5" />
        <custom-form :headingTitle="titleIPI" :name="'iPI'" :text="textIPI" :customCol="customColsIPI" :data="coustomDataIPI" :loopVal="5" />
        <custom-form :headingTitle="titleIPIR" :name="'iPIR'" :customCol="customColsIPIR" :loopVal="5" />
    </div>
</template>
<script>

import customForm from '~/components/inventory/report/customForm.vue'
export const customColsPerson = [
  {
    name: 'NAME',
    key: 0,
    width:5,
    control:'',
  },
  {
    name: 'SIGNATURE',
    key: 1,
    width:5,
    control:'',
  },
  {
    name: 'TITLE',
    key: 2,
    width:5,
    control:'',
  },
  {
    name: 'ROLE PERFORMED',
    key: 3,
    width:5,
    control:'',
  },
  {
    name: 'INITIALS',
    key: 4,
    width:2,
    control:'',
  },
  {
    name: 'DATE',
    key: 5,
    width:2,
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
    width:14,
    control:'',
  },
  {
    name: 'Calibration / PM Due Date',
    key: 2,
    width:2,
    control:'N/A',
  },
  {
    name: 'Cleaning Verified',
    key: 3,
    width:2,
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
    width:15,
    control:'',
  },
  {
    name: 'Observations (Yes/No/N/A or value where applicable)',
    key: 1,
    width:3,
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
export const customDataLineRow1 = [
  {
    text: 'Materials and/or packaging components from previous activity have been removed from the room, equipment, and trash receptacles.',
    key: 0,
    width:15,
    control:'text',
  },
  {
    text: '',
    key: 1,
    width:3,
    control:'Yes/No',
  },
  {
    name: '',
    key: 2,
    width:3,
    control:'',
  },
  {
    name: '',
    key: 3,
    width:3,
    control:'',
  }
]
export const customDataLineRow2 = [
  {
    text: 'Room and Equipment Logbooks have been updated to reflect new activity to be performed.',
    key: 0,
    width:15,
    control:'text',
  },
  {
    text: '',
    key: 1,
    width:3,
    control:'Yes/No',
  },
  {
    name: '',
    key: 2,
    width:3,
    control:'',
  },
  {
    name: '',
    key: 3,
    width:3,
    control:'',
  }
]
export const customDataLineRow3 = [
  {
    text: 'The room and equipment status(es) is/are clearly labeled.',
    key: 0,
    width:15,
    control:'text',
  },
  {
    text: '',
    key: 1,
    width:3,
    control:'Yes/No',
  },
  {
    name: '',
    key: 2,
    width:3,
    control:'',
  },
  {
    name: '',
    key: 3,
    width:3,
    control:'',
  }
]
export const customDataLineRow4 = [
  {
    text: 'The room and equipment is / are released for use.',
    key: 0,
    width:15,
    control:'text',
  },
  {
    text: '',
    key: 1,
    width:3,
    control:'Yes/No',
  },
  {
    name: '',
    key: 2,
    width:3,
    control:'',
  },
  {
    name: '',
    key: 3,
    width:3,
    control:'',
  }
]
export const customDataLineRow5 = [
  {
    text: 'All materials are staged and match the Bill of Materials (BOM)? ',
    key: 0,
    width:15,
    control:'text',
  },
  {
    text: '',
    key: 1,
    width:3,
    control:'Yes/No',
  },
  {
    name: '',
    key: 2,
    width:3,
    control:'',
  },
  {
    name: '',
    key: 3,
    width:3,
    control:'',
  }
]
export const customDataLineRow6 = [
  {
    text: 'All materials have been previously approved for use and are labeled appropriately.',
    key: 0,
    width:15,
    control:'text',
  },
  {
    text: '',
    key: 1,
    width:3,
    control:'Yes/No',
  },
  {
    name: '',
    key: 2,
    width:3,
    control:'',
  },
  {
    name: '',
    key: 3,
    width:3,
    control:'',
  }
]
export const customDataLineRow7 = [
  {
    text: 'If No, Have the materials needed to start manufacturing been approved for use and labelled appropriately? (Manufacturing can proceed if “Yes” and remaining BOM materials shall be verified in Step 8 below)',
    key: 0,
    width:15,
    control:'text',
  },
  {
    text: '',
    key: 1,
    width:3,
    control:'Yes/No/NA',
  },
  {
    name: '',
    key: 2,
    width:3,
    control:'',
  },
  {
    name: '',
    key: 3,
    width:3,
    control:'',
  }
]
export const customDataLineRow8 = [
  {
    text: 'Remaining BOM materials are staged, approved, and labeled for use? (This step shall remain blank until remaining materials are available to complete the manufacturing process.)',
    key: 0,
    width:15,
    control:'text',
  },
  {
    text: '',
    key: 1,
    width:3,
    control:'Yes/No/NA',
  },
  {
    name: '',
    key: 2,
    width:3,
    control:'',
  },
  {
    name: '',
    key: 3,
    width:3,
    control:'',
  }
]
export const customDataLineRow9 = [
  {
    text: 'Verify that all personnel responsible for the execution of this record have been previously trained on the equipment required, SOPs, work instructions and batch production record prior to the start of any activity within this production run (An operations supervisor, lead or designee shall be responsible for this step)',
    key: 0,
    width:15,
    control:'text',
  },
  {
    text: '',
    key: 1,
    width:3,
    control:'Yes/No',
  },
  {
    name: '',
    key: 2,
    width:3,
    control:'',
  },
  {
    name: '',
    key: 3,
    width:3,
    control:'',
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
                                customDataLineRow9,
                                ]
export const coustomDataIPI=[[
  {
    text: 'Appearance A',
    key: 0,
    width:3,
    control:'text',
  },
  {
    text: '',
    key: 1,
    width:2,
    control:'',
  },
  {
    text: 'Visual',
    key: 2,
    width:2,
    control:'text',
  },
  {
    text: 'NII AQL 0.065',
    key: 3,
    width:2,
    control:'text',
  },
  {
    text: '',
    key: 4,
    width:15,
    control:'',
  }
],[
  {
    text: 'Appearance B',
    key: 0,
    width:3,
    control:'text',
  },
  {
    text: '',
    key: 1,
    width:2,
    control:'',
  },
  {
    text: 'Visual',
    key: 2,
    width:2,
    control:'text',
  },
  {
    text: 'NII AQL 0.40',
    key: 3,
    width:2,
    control:'text',
  },
  {
    text: '',
    key: 4,
    width:15,
    control:'',
  }
],[
  {
    text: 'Appearance C',
    key: 0,
    width:3,
    control:'text',
  },
  {
    text: '',
    key: 1,
    width:2,
    control:'',
  },
  {
    text: 'Visual',
    key: 2,
    width:2,
    control:'text',
  },
  {
    text: 'NII AQL 0.40',
    key: 3,
    width:2,
    control:'text',
  },
  {
    text: '',
    key: 4,
    width:15,
    control:'',
  }
],[
  {
    text: 'Appearance D',
    key: 0,
    width:3,
    control:'text',
  },
  {
    text: '',
    key: 1,
    width:2,
    control:'',
  },
  {
    text: 'Visual',
    key: 2,
    width:2,
    control:'text',
  },
  {
    text: 'NII AQL 0.40',
    key: 3,
    width:2,
    control:'text',
  },
  {
    text: '',
    key: 4,
    width:15,
    control:'',
  }
],[
  {
    text: 'Seal Integrity',
    key: 0,
    width:3,
    control:'text',
  },
  {
    text: '',
    key: 1,
    width:2,
    control:'',
  },
  {
    text: 'DOC-000158',
    key: 2,
    width:2,
    control:'text',
  },
  {
    text: 'SIII AQL 0.40',
    key: 3,
    width:2,
    control:'text',
  },
  {
    text: '',
    key: 4,
    width:15,
    control:'',
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
  components: { customForm },
  data(){
    return{
    customColsPerson,
    customColsBatchRec,
    customColsBills,
    customColsEquipment,
    customColsLine,
    coustomDataLine,
    customColsStage,
    customColsPI,
    customColsMI,
    customColsMR,
    customColsSR,
    customColsIPI,
    coustomDataIPI,
    customColsIPIR,
    personLoopVal:5,
    batchLoopVal:5,
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
    titleBatch:'BATCH RECORD DOCUMENTATION RECONCILIATION LOG',
    textIPI:'Perform all startup and in-process inspections, including inspections after any planned or unplanned extended production stoppage, and close out activities according to DOC-000131.  Document unacceptable units or defects according to Experic standard operating procedure for Inspection Management.  ',
    textSR:'Refer to individual work order for sample requirements.  Label sample containers according to DOC-000131.',
    textLine:'Follow line clearance requirements per DOC-000122 and record the required information. If more than one room is used, a line clearance will be performed for each room, this line clearance document shall be issued by QA for each room used.',
    textPerson:'Each individual whose signature or initials appear within the executed production batch record must print their name and title, sign, and initial and date the Personnel Log. Signing this document ensures personnel understand the requirements and have been trained to execute processes defined within this record.  This documentation allows traceability for each signature and/or initials that appear throughout the executed document.' ,
    textEquipment:'Complete required information below for equipment used or N/A if not used.' ,
    }
  },
  methods:{
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
    }    
  },
}
</script>