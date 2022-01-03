import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/TreatmentType`

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
const TreatmentTypeServices = {
  get,
  getById,
}

export default TreatmentTypeServices
