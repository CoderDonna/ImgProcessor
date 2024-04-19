import { ImgProcessor } from '@ImgProcessor/core'
import Dashboard from '@ImgProcessor/dashboard'
import XHRUpload from '@ImgProcessor/xhr-upload'
import Unsplash from '@ImgProcessor/unsplash'
import Url from '@ImgProcessor/url'

import '@ImgProcessor/core/dist/style.css'
import '@ImgProcessor/dashboard/dist/style.css'

const companionUrl = 'http://localhost:3020'
const ImgProcessor = new ImgProcessor()
  .use(Dashboard, { target: '#app', inline: true })
  .use(XHRUpload, { endpoint: 'https://xhr-server.herokuapp.com/upload', limit: 6 })
  .use(Url, { target: Dashboard, companionUrl })
  .use(Unsplash, { target: Dashboard, companionUrl })

// Keep this here to access ImgProcessor in tests
window.ImgProcessor = ImgProcessor
