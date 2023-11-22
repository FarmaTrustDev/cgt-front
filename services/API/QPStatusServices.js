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

function getPending(){
    return request({
        url: `${baseApi}/get-pending`,
        method: 'GET'
      })
}

const QPStatusServices = {
    getPending,
    update
}

export default QPStatusServices