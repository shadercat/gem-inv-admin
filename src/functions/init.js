const axios = require('axios');

function login(password) {
    return axios.post('/admin/login', {password: password}).then(resp => {
        return resp.data;
    }).catch(err => {
        return {errors: err};
    })
}

function check(token) {
    return axios.post('/admin/check', {token: token}).then(resp => {
        return resp.data;
    }).catch(err => {
        return {errors: err}
    })

}

module.exports = {
  login: login,
  check: check
};