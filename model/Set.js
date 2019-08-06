const User = require('./user')

class Set {
  constructor(json, client) {
    this.client = client
    for(var key in json) this[key] = json[key]
  }

  static async get(id, client) {
    const set = await client.get(`/sets/${id}`)
    return new Set(set, client)
  }

  async creator() {
    return await User.get(this.created_by, this.client)
  }

  async terms() {
    return await this.client.get(`/sets/${this.id}/terms`)
  }
}

module.exports = Set