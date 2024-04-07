import { ImgProcessor } from '@ImgProcessor/core'
import Dashboard from '@ImgProcessor/dashboard'
import Transloadit from '@ImgProcessor/transloadit'

import generateSignatureIfSecret from './generateSignatureIfSecret.js'

import '@ImgProcessor/core/dist/style.css'
import '@ImgProcessor/dashboard/dist/style.css'

// Environment variables:
// https://en.parceljs.org/env.html
const ImgProcessor = new ImgProcessor()
  .use(Dashboard, { target: '#app', inline: true })
  .use(Transloadit, {
    service: process.env.VITE_TRANSLOADIT_SERVICE_URL,
    waitForEncoding: true,
    getAssemblyOptions: () => generateSignatureIfSecret(process.env.VITE_TRANSLOADIT_SECRET, {
      auth: { key: process.env.VITE_TRANSLOADIT_KEY },
      template_id: process.env.VITE_TRANSLOADIT_TEMPLATE,
    }),
  })

// Keep this here to access ImgProcessor in tests
window.ImgProcessor = ImgProcessor
