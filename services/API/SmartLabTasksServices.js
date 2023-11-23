import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/SmartLabTasks`

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

function getById(id){
    return request({
        url : `${baseApi}/${id}`,
        method : 'GET'
    })
}

function getStepsByTaskId(id){
    return request({
        url : `${baseApi}/getSLTSteps/${id}`,
        method : 'GET'
    })
}

const SmartLabTasksServices = {
    create,
    get,
    getById,
    getStepsByTaskId
}

export default SmartLabTasksServices