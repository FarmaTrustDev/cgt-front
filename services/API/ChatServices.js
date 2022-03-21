import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/chat`

function getConversations(data) {
  return request({
    url: `${baseApi}/get-conversations`,
    data,
  })
}

function create(data) {
  return request({
    url: `${baseApi}`,
    data,
    method: 'POST',
  })
}

const ChatServices = {
  getConversations, create
}

export default ChatServices
