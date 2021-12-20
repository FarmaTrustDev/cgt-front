import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/ScreeningTemplate`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}

function create(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}

const ScreeningTemplateServices = {
  get,
  create,
}

export default ScreeningTemplateServices
