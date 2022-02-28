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
function get() {
  return request({
    url: `${baseApi}`,
  })
}
function create(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}
function getById(id) {
  return request({
    url: `${baseApi}/${id}`,
  })
}
function update(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'put',
  })
}
function destroy(id) {
  return request({
    url: `${baseApi}/${id}`,
    method: 'DELETE',
  })
}
const UserServices = {
  detail,
  adminSubMenus,
  users,
  hospitals,
  profile,
  create,
  getById,
  update,
  destroy,
  get,
}

export default UserServices
