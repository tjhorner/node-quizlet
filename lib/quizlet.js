const request = require('request')

const Set = require('../model/Set')
const User = require('../model/User')

class Quizlet {
  constructor(options) {
    if(!options.clientId) throw new Error("clientId is required when constructing a Quizlet client.")

    this.clientId = options.clientId
    this.clientSecret = options.clientSecret || ""
    this.authToken = options.authToken || ""
    this.redirectUri = options.redirectUri || ""

    this.apiBase = options.apiBase || "https://api.quizlet.com/2.0"
  }

  headers() {
    if(this.authToken) return { "Authorization": `Bearer ${this.authToken}` }
    return { }
  }

  get(endpoint, qs = { }) {
    qs["client_id"] = this.clientId

    return new Promise((resolve, reject) => {
      request(`${this.apiBase}${endpoint}`, {
        qs,
        headers: this.headers(),
        json: true
      }, (err, res, body) => {
        if(err) reject(err)
        if(!err) resolve(body)
      })
    })
  }

  post(endpoint, form = { }, qs = { }) {
    qs["client_id"] = this.clientId

    return new Promise((resolve, reject) => {
      request.post(`${this.apiBase}${endpoint}`, {
        qs, form,
        headers: this.headers(),
        json: true
      }, (err, res, body) => {
        if(err) reject(err)
        if(!err) resolve(body)
      })
    })
  }

  async set(id) {
    return await Set.get(id, this)
  }

  async user(username) {
    return await User.get(username, this)
  }
}

module.exports = Quizlet