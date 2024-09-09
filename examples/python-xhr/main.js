import ImgProcessor from '@ImgProcessor/core'
import Webcam from '@ImgProcessor/webcam'
import Dashboard from '@ImgProcessor/dashboard'
import XHRUpload from '@ImgProcessor/xhr-upload'

import '@ImgProcessor/core/dist/style.css'
import '@ImgProcessor/webcam/dist/style.css'
import '@ImgProcessor/dashboard/dist/style.css'

const ImgProcessor = new ImgProcessor({
  debug: true,
  autoProceed: false,
})

ImgProcessor.use(Webcam)
ImgProcessor.use(Dashboard, {
  inline: true,
  target: 'body',
  plugins: ['Webcam'],
})
ImgProcessor.use(XHRUpload, {
  endpoint: 'http://localhost:3020/upload',
})
