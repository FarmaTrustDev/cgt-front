import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/lab`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}

function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}

const LabServices = {
  get,
  getById,
}

export default LabServices
