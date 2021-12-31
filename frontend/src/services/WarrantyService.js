import axios from '../axios.js'

export default {
  getAll(userId) {
    return axios.get(`/warranties/${userId}`);
  },

  getById(id) {
    return axios.get(`/warranty/${id}`);
  }
}