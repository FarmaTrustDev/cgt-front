import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/translation`

function get(params = {}) {
  return request({
    url: `${baseApi}`,
    params,
  })
}

const TranslationServices = {
  get,
}

export default TranslationServices
