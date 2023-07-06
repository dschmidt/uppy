import Uppy from '@uppy/core'
import WebDAV from '..'

{
  const uppy = new Uppy()
  uppy.use(WebDAV, {
    companionUrl: '',
    companionCookiesRule: 'same-origin',
    target: 'body',
    title: 'title',
  })
}
