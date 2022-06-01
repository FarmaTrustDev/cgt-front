import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/chat`

function getConversations(data) {
  return request({
    url: `${baseApi}/get-conversations`,
    data,
  })
}

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

function fetchGroup(params = {}) {
  return request({
    url: `${baseApi}/groups`,
    params,
  })
}

function createGroup(data) {
  return request({
    url: `${baseApi}/groups`,
    data,
    method: 'POST',
  })
}

const ChatServices = {
  getConversations, create, get, fetchGroup, createGroup
}

export default ChatServices
