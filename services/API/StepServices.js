import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/step`

function create(data){
    return request({
        url: `${baseApi}`,
        method : 'POST',
        data,
    })
}

function get(){
    return request({
        url : `${baseApi}`,
        method : 'GET'
    })
}

function getByProcessId(id){
    return request({
        url : `${baseApi}/get-by-process-id/${id}`,
        method : 'GET'
    })
}

function getByProjectId(id){
    return request({
        url : `${baseApi}/get-by-project-id/${id}`,
        method : 'GET'
    })
}

const StepServices = {
    create,
    get,
    getByProcessId,
    getByProjectId
}

export default StepServices