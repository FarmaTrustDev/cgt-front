import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/sampleQPProcess`

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


const SampleQPProcessServices = {
    create,
    getBySampleId
}

export default SampleQPProcessServices