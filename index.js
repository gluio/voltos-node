var request = require('request')
var API_URL = 'https://voltos.io/v1'
const apiRequestOpts = { strictSSL: false, json: true }

var api = {
  headers: { 'User-Agent': 'voltos-node' },
  options: function(opts) {
    return Object.assign({}, apiRequestOpts, opts, { headers: this.headers })
  },
  whoami: function(token, callback) {
    var url = API_URL + '/account'
    request.get(this.options({ url: url, auth: this.tokenAuth(token) }), callback)
  },
  signup: function(email, password, tokenName, callback) {
    var url = API_URL + '/account'
    var data = {
      email: email,
      name: tokenName }
    if (password) { data.password = password }
    request.post(this.options({ url: url, form: data }), callback)
  },
  // POST /account/token
  userToken: function(email, password, tokenName, callback) {
    var url = API_URL + '/account/token'
    var data = { name: tokenName }
    request.post(this.options({ url: url, auth: this.basicAuth(email, password) }), callback)
  },
  // POST /bundles
  create: function(name, tokenName, token, callback) {
    var url = API_URL + '/bundles'
    var data = {
      name: name,
      token_name: tokenName }
    request.post(this.options({ url: url, form: data, auth: this.tokenAuth(token) }), callback)
  },
  // DELETE /bundles
  destroy: function(name, token, callback) {
    var url = API_URL + '/bundles/' + name
    request.delete(this.options({ url: url, auth: this.tokenAuth(token) }), callback)
  },
  // GET /bundles
  bundles: function(token, callback) {
    var url = API_URL + '/bundles'
    request.get(this.options({ url: url, auth: this.tokenAuth(token) }), callback)
  },
  // POST /bundles/:name/token
  bundleToken: function(name, tokenName, token, callback) {
    var url = API_URL + '/bundles/' + name + '/token'
    var data = {
      name: tokenName
    }
    request.post(this.options({ url: url, form: data, auth: this.tokenAuth(token) }), callback)
  },
  // PUT /bundles/:name
  rename: function(src, dest, token, callback) {
    var url = API_URL + '/bundles/' + src
    var data = {
      new_bundle_name: dest
    }
    request.put(this.options({ url: url, form: data, auth: this.tokenAuth(token) }), callback)
  },
  // GET /bundles/:list || GET /credentials
  list: function(name, token, callback) {
    var url = API_URL + '/bundles/' + name
    request.get(this.options({ url: url, auth: this.tokenAuth(token) }), callback)
  },
  // POST /credentials
  set: function(name, token, credentials, callback) {
    var url = API_URL + '/bundles/' + name
    request.put(this.options({ url: url, form: credentials, auth: this.tokenAuth(token) }), callback)
  },
  // DELETE /credentials
  unset: function(name, token, keys, callback) {
    var url = API_URL + '/bundles' + name + '/unset'
    var data = {}
    for (var i = 0, len = keys.length; i < len; i++) {
      data[keys[i]] = null
    }
    request.delete(this.options({ url: url, form: data, auth: this.tokenAuth(token) }), callback)
  },
  // POST /bundles/:name/fork
  fork: function(src, dest, tokenName, token, callback) {
    var url = API_URL + '/bundles/' + src + '/fork'
    var data = {
      name: dest,
      token_name: tokenName
    }
    request.post(this.options({ url: url, form: data, auth: this.tokenAuth(token) }), callback)
  },
  // POST /bundles/:name/share
  share: function(name, emails, token, callback) {
    var url = API_URL + '/bundles/' + name + '/share'
    var data = {
      email: emails
    }
    request.post(this.options({ url: url, form: data, auth: this.tokenAuth(token) }), callback)
  },
  // DELETE /bundles/:name/share
  retract: function(name, email, token, callback) {
    var url = API_URL + '/bundles/' + name + '/share'
    var data = {
      email: email
    }
    request.delete(this.options({ url: url, form: data, auth: this.tokenAuth(token) }), callback)
  },
  basicAuth: function(user, pass) {
    return { user: user, pass: pass}
  },
  tokenAuth: function(token) {
    return { bearer: 'token="' + token + '"' }
  },
}

var voltos = {
  api: api
}
module.exports = voltos
