import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/companyAddress`

function create(data){
    return request({
        url: `${baseApi}`,
        data,
        method: 'POST'
    })
}

function get(){
    return request({
        url : `${baseApi}`,
        method: 'GET'
    })
}
function getCompanies(){
    return request({
        url : `${baseApi}/companies`,
        method: 'GET'
    })
}
function getAddressesByCompany(data){
    return request({
        url : `${baseApi}/addressByCompany/${data}`,
        method: 'GET'
    })
}
function getById(id){
    return request({
        url: `${baseApi}/GetById/${id}`,
        method: 'GET'
    })
}

const SOPServices = {
    create,
    get,
    getById,
    getCompanies,
    getAddressesByCompany
}

export default SOPServices