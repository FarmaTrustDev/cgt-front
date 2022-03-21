import request from '../request'
import { BASE_API } from '../Constant'

const baseApi = `${BASE_API}/chat`

function getConversations(data) {
  return request({
    url: `${baseApi}/get-conversations`,
    data,
  })
}

const ChatServices = {
  getConversations,
}

export default ChatServices
