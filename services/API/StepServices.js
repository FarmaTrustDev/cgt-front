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
function updateStep(data){
    return request({
        url: `${baseApi}`,
        method : 'PUT',
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
function getById(id){
    return request({
        url : `${baseApi}/${id}`,
        method : 'GET'
    })
}
function deleteStep(id){
    return request({
        url : `${baseApi}/${id}`,
        method : 'DELETE'
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
    getByProjectId,
    getById,
    deleteStep,
    updateStep
}

export default StepServices