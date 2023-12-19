import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/sampleProcess`

function create(data){
    return request({
        url: `${baseApi}`,
        data,
        method : 'POST',
    })
}

function getBySampleId(id){
    return request({
        url : `${baseApi}/get-by-sample-id/${id}`,
        metho: 'GET'
    })
}

const SampleProcessServices = {
    create,
    getBySampleId
}

export default SampleProcessServices