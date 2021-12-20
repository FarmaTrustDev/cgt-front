import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/user`

function detail(data) {
  return request({
    url: `${baseApi}/details`,
    data,
  })
}
function users() {
  return request({
    url: `${baseApi}/users`,
  })
}

function hospitals() {
  return request({
    url: `${baseApi}/hospitals`,
  })
}

function adminSubMenus() {
  return request({
    url: `${baseApi}/admin-menus`,
  })
}

function profile() {
  return request({
    url: `${baseApi}/profile`,
  })
}

const UserServices = {
  detail,
  adminSubMenus,
  users,
  hospitals,
  profile,
}

export default UserServices
