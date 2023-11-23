import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/qPStatus`

function update(data){
    return request({
        url: `${baseApi}`,
        data,
        method: 'PUT'
      })
}

function getAll(){
    return request({
        url: `${baseApi}`,
        method: 'GET'
      })
}

function getPending(){
    return request({
        url: `${baseApi}/get-pending`,
        method: 'GET'
      })
}

function getApproved(){
    return request({
        url: `${baseApi}/get-approved`,
        method: 'GET'
      })
}

function getRejected(){
    return request({
        url: `${baseApi}/get-rejected`,
        method: 'GET'
      })
}

function getQuarantine(){
    return request({
        url: `${baseApi}/get-quarantine`,
        method: 'GET'
      })
}

const QPStatusServices = {
    getPending,
    update,
    getApproved,
    getRejected,
    getQuarantine,
    getAll
}

export default QPStatusServices