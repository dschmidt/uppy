const WebdavProvider = require('../WebdavProvider')
const { validateURL } = require('../../../helpers/request')

class WebdavPublicLink extends WebdavProvider {
  async getUsername () { // eslint-disable-line class-methods-use-this
    return null
  }

  async getClient ({ query }) {
    const publicLinkURL = query?.publicLinkURL
    const { allowLocalUrls } = this
    if (!validateURL(publicLinkURL, allowLocalUrls)) {
      throw new Error('invalid public link url')
    }

    const [baseURL, publicLinkToken] = publicLinkURL.split('/s/')
    const { AuthType } = await import('webdav')
    return this.getClientHelper({
      url: `${baseURL}/public.php/webdav/`,
      authType: AuthType.Password,
      username: publicLinkToken,
      password: 'null',
    })
  }

  async logout () { // eslint-disable-line class-methods-use-this
    return { revoked: true }
  }
}

module.exports = WebdavPublicLink