import ImgProcessor from '@ImgProcessor/core'
import Dashboard from '@ImgProcessor/dashboard'
import Compressor from '@ImgProcessor/compressor'

import '@ImgProcessor/core/dist/style.css'
import '@ImgProcessor/dashboard/dist/style.css'

const ImgProcessor = new ImgProcessor()
  .use(Dashboard, {
    target: document.body,
    inline: true,
  })
  .use(Compressor, {
    mimeType: 'image/webp',
  })

// Keep this here to access ImgProcessor in tests
window.ImgProcessor = ImgProcessor
