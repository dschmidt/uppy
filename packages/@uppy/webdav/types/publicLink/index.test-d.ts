import Uppy from '@uppy/core'
import WebdavPublicLink from '.'

{
  const uppy = new Uppy()
  uppy.use(WebdavPublicLink, {
    companionUrl: '',
    companionCookiesRule: 'same-origin',
    target: 'body',
    title: 'title',
  })
}
