import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/user`

function detail(data) {
  return request({
    url: `${baseApi}/user-detail`,
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
function getBlockedUsers() {
  return request({
    url: `${baseApi}/blocked-users`,
  })
}

function getTimeTable() {
  return request({
    url: `${baseApi}/timetable`,
  })
}

function profile() {
  return request({
    url: `${baseApi}/profile`,
  })
}

function upsertTimeTable(data) {
  return request({
    url: `${baseApi}/timetable`,
    method: 'post',
    data,
  })
}
const UserServices = {
  detail,
  adminSubMenus,
  getBlockedUsers,
  users,
  hospitals,
  getTimeTable,
  upsertTimeTable,
  profile,
}

export default UserServices
