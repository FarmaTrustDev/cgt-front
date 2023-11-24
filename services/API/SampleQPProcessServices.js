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



const SampleQPProcessServices = {
    create,
}

export default SampleQPProcessServices