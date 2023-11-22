import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/QPProcess`

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
function getByProjectId(id){
    return request({
        url : `${baseApi}/getByProjectId/${id}`,
        method : 'GET'
    })
}

function getById(id){
    return request({
        url : `${baseApi}/${id}`,
        method : 'GET'
    })
}



const QPProcessServices = {
    create,
    get,
    getById,
    getByProjectId
}

export default QPProcessServices