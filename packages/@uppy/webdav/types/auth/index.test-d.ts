import Uppy from '@uppy/core'
import WebdavAuth from '.'

{
  const uppy = new Uppy()
  uppy.use(WebdavAuth, {
    companionUrl: '',
    companionCookiesRule: 'same-origin',
    target: 'body',
    title: 'title',
  })
}
