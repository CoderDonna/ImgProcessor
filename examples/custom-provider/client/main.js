import ImgProcessor from '@ImgProcessor/core'
import GoogleDrive from '@ImgProcessor/google-drive'
import Tus from '@ImgProcessor/tus'
import Dashboard from '@ImgProcessor/dashboard'
import MyCustomProvider from './MyCustomProvider.jsx'

import '@ImgProcessor/core/dist/style.css'
import '@ImgProcessor/dashboard/dist/style.css'

const ImgProcessor = new ImgProcessor({
  debug: true,
})

ImgProcessor.use(GoogleDrive, {
  companionUrl: 'http://localhost:3020',
})

ImgProcessor.use(MyCustomProvider, {
  companionUrl: 'http://localhost:3020',
})

ImgProcessor.use(Dashboard, {
  inline: true,
  target: 'body',
  plugins: ['GoogleDrive', 'MyCustomProvider'],
})

ImgProcessor.use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
