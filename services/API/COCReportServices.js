import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/cocreport`


function getBySampleId(id){
    return request({
        url : `${baseApi}/get-by-sample-id/${id}`,
        method : 'GET'
    })
}
function submitCOC(id,status){
    return request({
        url : `${baseApi}/updateStatus/${id}/${status}`,
        method : 'GET'
    })
}

function getAll(id){
    return request({
        url : `${baseApi}`,
        method : 'GET'
    })
}

const COCReportServices = {
    getBySampleId,
    getAll,
    submitCOC
}

export default COCReportServices