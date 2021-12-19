import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/user`

function get(params = {}) {
  return request({
    url: `${baseApi}/details`,
    params,
  })
}

const UserServices = {
  get,
}

export default UserServices
