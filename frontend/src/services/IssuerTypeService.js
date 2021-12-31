import axios from '../axios.js'

export default {
  getTypes() {
    return axios.get('/issuer-types');
  }
}