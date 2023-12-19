import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/sample`

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}
function get() {
  return request({
    url: `${baseApi}`,
  })
}

function getSampleByTaskId(id) {
  return request({
    url: `${baseApi}/task-id/${id}`,
  })
}

function create(data){
    return request({
        url: `${baseApi}`,
        data,
        method: 'POST'
      })
}

function update(data){
  return request({
      url: `${baseApi}`,
      data,
      method: 'PUT'
    })
}

const SampleServices = {
  getById,
  create,
  getSampleByTaskId,
  get,
  update
}

export default SampleServices