const Provider = require('../Provider')
const logger = require('../../logger')
const { getProtectedHttpAgent, validateURL } = require('../../helpers/request')
const { withProviderErrorHandling } = require('../providerErrors')

/**
 * WebDavProvider base class provides implementations shared by Nextcloud and NextcloudPublicLink providers
 */
class WebDavProvider extends Provider {
  async getClientHelper ({ url, ...options }) {
    const { allowLocalUrls } = this
    if (!validateURL(url, allowLocalUrls)) {
      throw new Error('invalid webdav url')
    }
    const { protocol } = new URL(url)
    const HttpAgentClass = getProtectedHttpAgent({ protocol, blockLocalIPs: !allowLocalUrls })

    const { createClient } = await import('webdav')
    return createClient(url, {
      ...options,
      [`${protocol}Agent`] : new HttpAgentClass(),
    })
  }

  async getClient ({ username, token }) { // eslint-disable-line no-unused-vars
    logger.error('call to getUsername is not implemented', 'provider.webdav.getUsername.error')
    throw new Error('call to getUsername is not implemented')
    // return for correct return type with import()
    return this.getClientHelper() // eslint-disable-line no-unreachable
  }

  async getUsername ({ token }) { // eslint-disable-line no-unused-vars
    logger.error('call to getUsername is not implemented', 'provider.webdav.getUsername.error')
    throw new Error('call to getUsername is not implemented')
  }

  async list ({ directory, token, query = { cursor: null } }) {
    return this.#withErrorHandling('provider.webdav.list.error', async () => {
      const username = await this.getUsername({ token })
      const data = { username, items: [] }
      const client = await this.getClient({ username, token })

      const dir = await client.getDirectoryContents(directory || '/')

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
      const username = await this.getUsername({ token })
      const client = await this.getClient({ username, token })
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
  async #withErrorHandling (tag, fn) {
    return withProviderErrorHandling({
      fn,
      tag,
      isAuthError: (response) => response.statusCode === 190, // Invalid OAuth 2.0 Access Token
      getJsonErrorMessage: (body) => body?.error?.message,
      ...(this.authProvider && { providerName: this.authProvider }),
    })
  }
}

module.exports = WebDavProvider
