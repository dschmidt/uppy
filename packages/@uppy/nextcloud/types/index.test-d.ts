import Uppy from '@uppy/core'
import Nextcloud from '..'

{
  const uppy = new Uppy()
  uppy.use(Nextcloud, {
    companionUrl: '',
    companionCookiesRule: 'same-origin',
    target: 'body',
    title: 'title',
  })
}
