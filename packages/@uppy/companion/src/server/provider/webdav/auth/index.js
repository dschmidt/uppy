const { XMLParser } = require('fast-xml-parser')

const WebDavProvider = require('../WebDavProvider')
const { getProtectedGot, validateURL } = require('../../../helpers/request')

class WebDavAuth extends WebDavProvider {
  constructor (options) {
    super(options)
    this.authProvider = WebDavAuth.authProvider
  }

  // for "grant"
  static getExtraConfig () {
    return {}
  }

  static get authProvider () {
    return 'webdavAuth'
  }

  getBaseUrl () {
    const { subdomain } = this.dynamicOptions
    const { protocol } = this.providerOptions

    return `${protocol}://${subdomain}`
  }

  async getUsername ({ token }) {
    const { allowLocalUrls } = this

    const url = `${this.getBaseUrl()}/ocs/v1.php/cloud/user`
    if (!validateURL(url, allowLocalUrls)) {
      throw new Error('invalid user url')
    }

    const response = await getProtectedGot({ url, blockLocalIPs: !allowLocalUrls }).get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).text()

    const parser = new XMLParser()
    const data = parser.parse(response)
    return data?.ocs?.data?.id
  }

  async getClient ({ username, token }) {
    const url = `${this.getBaseUrl()}/remote.php/dav/files/${username}`

    const { AuthType } = await import('webdav')
    return this.getClientHelper({
      url,
      authType: AuthType.Token,
      token: {
        access_token: token,
        token_type: 'Bearer',
      },
    })
  }

  async logout () { // eslint-disable-line class-methods-use-this
    // FIXME: adjust url
    return { revoked: false, manual_revoke_url: `${this.getBaseUrl()}/settings/user/security` }
  }
}

module.exports = WebDavAuth
