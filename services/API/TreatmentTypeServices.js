import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/TreatmentType`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}

const TreatmentTypeServices = {
  get,
}

export default TreatmentTypeServices
