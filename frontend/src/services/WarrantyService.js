import axios from '../axios.js'

export default {
  getAll(userId) {
    return axios.get(`/warranties/${userId}`);
  },

  getById(id) {
    return axios.get(`/warranty/${id}`);
  },

  deleteById(id) {
    return axios.delete(`/warranty/${id}`)
  },

  add(warranty) {
    return axios.post('/warranty', warranty)
  },

  updateById(id, warranty) {
    return axios.put(`/warranty/${id}`, warranty)
  }
}