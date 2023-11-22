import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/donor`

function get() {
  return request({
    url: `${baseApi}`,
    method: 'GET',
  })
}

const DonorServices = {
  get,
}

export default DonorServices