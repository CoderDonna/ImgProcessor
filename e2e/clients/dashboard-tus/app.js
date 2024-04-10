import { ImgProcessor } from '@ImgProcessor/core'
import Dashboard from '@ImgProcessor/dashboard'
import Tus from '@ImgProcessor/tus'
import Unsplash from '@ImgProcessor/unsplash'
import Url from '@ImgProcessor/url'

import '@ImgProcessor/core/dist/style.css'
import '@ImgProcessor/dashboard/dist/style.css'

function onShouldRetry (err, retryAttempt, options, next) {
  if (err?.originalResponse?.getStatus() === 418) {
    return true
  }
  return next(err)
}

const companionUrl = 'http://localhost:3020'
const ImgProcessor = new ImgProcessor()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files', onShouldRetry })
  .use(Url, { target: Dashboard, companionUrl })
  .use(Unsplash, { target: Dashboard, companionUrl })

// Keep this here to access ImgProcessor in tests
window.ImgProcessor = ImgProcessor
