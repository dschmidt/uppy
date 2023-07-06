const { XMLParser } = require('fast-xml-parser')

const WebdavProvider = require('../WebdavProvider')
const { getProtectedGot, validateURL } = require('../../../helpers/request')

const cloudTypePathMappings = {
  nextcloud: {
    manual_revoke_url: '/settings/user/security',
  },
  owncloud: {
    manual_revoke_url: '/settings/personal?sectionid=security',
  },
}

class WebdavAuth extends WebdavProvider {
  constructor (options) {
    super(options)
    this.authProvider = WebdavAuth.authProvider
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

  async logout ({ query: { cloudType } }) {
    const manual_revoke_url = cloudTypePathMappings[cloudType]?.manual_revoke_url
    return {
      revoked: false,
      ...(manual_revoke_url && { manual_revoke_url: `${this.getBaseUrl()}${manual_revoke_url}` }),
    }
  }
}

module.exports = WebdavAuth
