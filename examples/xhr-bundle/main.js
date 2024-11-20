import ImgProcessor from '@ImgProcessor/core'
import Dashboard from '@ImgProcessor/dashboard'
import XHRUpload from '@ImgProcessor/xhr-upload'

import '@ImgProcessor/core/dist/style.css'
import '@ImgProcessor/dashboard/dist/style.css'

const ImgProcessor = new ImgProcessor({
  debug: true,
  meta: { something: 'xyz' },
})

ImgProcessor.use(Dashboard, {
  target: '#app',
  inline: true,
  hideRetryButton: true,
  hideCancelButton: true,
})

ImgProcessor.use(XHRUpload, {
  bundle: true,
  endpoint: 'http://localhost:9967/upload',
  allowedMetaFields: ['something'],
  fieldName: 'files',
})
