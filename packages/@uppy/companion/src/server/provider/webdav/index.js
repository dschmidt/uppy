const { XMLParser } = require('fast-xml-parser')
const got = require('got').default

const Provider = require('../Provider')
const logger = require('../../logger')
const { withProviderErrorHandling } = require('../providerErrors')

const getUsername = async ({ subdomain, token }) => {
  const response = await fetch(`http://${subdomain}/ocs/v1.php/cloud/user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const parser = new XMLParser()
  const data = parser.parse(await response.text())
  return data?.ocs?.data?.id
}

const getClient = async ({ subdomain, username, token }) => {
  const { createClient, AuthType } = await import('webdav')

  // TODO: username will potentially come from an untrusted source ... what can we do to avoid SSRF issues?
  return createClient(
    `http://${subdomain}/remote.php/dav/files/${username}`,
    {
      authType: AuthType.Token,
      token: {
        access_token: token,
        token_type: 'Bearer',
      },
      // FIXME: use CSRF protecting agent
      // httpAgent: ...,
      // httpsAgent: ...,
    },
  )
}

class WebDAV extends Provider {
  constructor (options) {
    super(options)
    this.authProvider = WebDAV.authProvider
  }

  // for "grant"
  static getExtraConfig () {
    return {}
  }

  static get authProvider () {
    return 'webdav'
  }

  async list (args) {
    return this.#withErrorHandling('provider.webdav.list.error', async () => {
      const { directory, token, query = { cursor: null } } = args

      const subdomain = this.dynamicOptions?.subdomain
      const username = await getUsername({ subdomain, token })
      const data = { username, items: [] }
      const client = await getClient({ subdomain, username, token })

      const path = directory || '/'

      const dir = await client.getDirectoryContents(path)

      dir.forEach(item => {
        const isFolder = item.type === 'directory'
        const requestPath = encodeURIComponent(`${directory || ''}/${item.basename}`)
        data.items.push({
          isFolder,
          id: requestPath,
          name: item.basename,
          requestPath, // TODO
          modifiedDate: item.lastmod, // TODO: convert  'Tue, 04 Jul 2023 13:09:47 GMT' to  ISO 8601
          ...(!isFolder && {
            mimeType: item.mime,
            size: item.size,
            thumbnail: null,

          }),
        })
      })

      return data
    })
  }

  async download ({ id, token }) {
    return this.#withErrorHandling('provider.webdav.download.error', async () => {
      // maybe we can avoid this by putting the username in front of the request path/id
      const subdomain = this.dynamicOptions?.subdomain
      const username = await getUsername({ subdomain, token })
      const client = await getClient({ subdomain, username, token })
      const stream = client.createReadStream(`/${id}`)
      return { stream }
    })
  }

  // eslint-disable-next-line class-methods-use-this
  async thumbnail () {
    // not implementing this because a public thumbnail from webdav will be used instead
    logger.error('call to thumbnail is not implemented', 'provider.webdav.thumbnail.error')
    throw new Error('call to thumbnail is not implemented')
  }

  // FIXME: implement
  async size ({ id, token }) {
    return this.#withErrorHandling('provider.webdav.size.error', async () => {
      return 0
    })
  }

  // FIXME: not adjusted to webdav yet ...
  // eslint-disable-next-line class-methods-use-this
  async logout () {
    // access revoke is not supported by Instagram's API
    return { revoked: false, manual_revoke_url: 'https://www.webdav.com/accounts/manage_access/' }
  }

  // FIXME: not adjusted to webdav yet ...
  async #withErrorHandling (tag, fn) {
    return withProviderErrorHandling({
      fn,
      tag,
      providerName: this.authProvider,
      isAuthError: (response) => response.statusCode === 190, // Invalid OAuth 2.0 Access Token
      getJsonErrorMessage: (body) => body?.error?.message,
    })
  }
}

module.exports = WebDAV
