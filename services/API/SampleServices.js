import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/sample`

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}

function create(data){
    return request({
        url: `${baseApi}`,
        data,
        method: 'POST'
      })
}

const SampleServices = {
  getById,
  create
}

export default SampleServices