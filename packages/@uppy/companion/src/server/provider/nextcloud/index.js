const Provider = require('../Provider')
const logger = require('../../logger')
const { withProviderErrorHandling } = require('../providerErrors')

const getClient = async ({ publicLinkURL }) => {
  const { createClient, AuthType } = await import('webdav')
  const [baseURL, publicLinkToken] = publicLinkURL.split('/s/')

  return createClient(
    `${baseURL}/public.php/webdav/`,
    {

      authType: AuthType.Password,
      password: 'null',
      username: publicLinkToken,
      // FIXME: use CSRF protecting agent
      // httpAgent: ...,
      // httpsAgent: ...,
    },
  )
}

class Nextcloud extends Provider {
  constructor (options) {
    super(options)
    this.authProvider = Nextcloud.authProvider
  }

  async list (args) {
    return this.#withErrorHandling('provider.nextcloud.list.error', async () => {
      const { directory } = args

      const publicLinkURL = this.dynamicOptions?.publicLinkURL
      const username = null
      const data = { username, items: [] }
      const client = await getClient({ publicLinkURL })

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

  async download ({ id }) {
    return this.#withErrorHandling('provider.nextcloud.download.error', async () => {
      // maybe we can avoid this by putting the username in front of the request path/id
      const publicLinkURL = this.dynamicOptions?.publicLinkURL
      const client = await getClient({ publicLinkURL })
      const stream = client.createReadStream(`/${id}`)
      return { stream }
    })
  }

  // eslint-disable-next-line class-methods-use-this
  async thumbnail () {
    // not implementing this because a public thumbnail from nextcloud will be used instead
    logger.error('call to thumbnail is not implemented', 'provider.nextcloud.thumbnail.error')
    throw new Error('call to thumbnail is not implemented')
  }

  // FIXME: implement
  async size ({ id, token }) {
    return this.#withErrorHandling('provider.nextcloud.size.error', async () => {
      return 0
    })
  }

  // FIXME: not adjusted to nextcloud yet ...
  // eslint-disable-next-line class-methods-use-this
  async logout () {
    // access revoke is not supported by Instagram's API
    return { revoked: false, manual_revoke_url: 'https://www.nextcloud.com/accounts/manage_access/' }
  }

  // FIXME: not adjusted to nextcloud yet ...
  async #withErrorHandling (tag, fn) {
    return withProviderErrorHandling({
      fn,
      tag,
      providerName: this.authProvider,
      isAuthError: (response) => true, // Invalid OAuth 2.0 Access Token
      getJsonErrorMessage: (body) => body?.error?.message,
    })
  }
}

module.exports = Nextcloud
