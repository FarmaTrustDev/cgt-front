import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/cocreport`


function getBySampleId(id){
    return request({
        url : `${baseApi}/get-by-sample-id/${id}`,
        method : 'GET'
    })
}

const COCReportServices = {
    getBySampleId,
}

export default COCReportServices