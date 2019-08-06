const Set = require('./Set')

class User {
  constructor(json, client) {
    this.client = client
    for(var key in json) this[key] = json[key]
  }

  static async get(username, client) {
    const user = await client.get(`/users/${username}`)
    return new User(user, client)
  }

  async allSets() {
    const userSets = await this.client.get(`/users/${this.username}/sets`)
    return userSets.map(s => new Set(s, this.client))
  }
}

module.exports = User