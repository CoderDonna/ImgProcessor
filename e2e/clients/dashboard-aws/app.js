import { ImgProcessor } from '@ImgProcessor/core'
import Dashboard from '@ImgProcessor/dashboard'
import AwsS3 from '@ImgProcessor/aws-s3'

import '@ImgProcessor/core/dist/style.css'
import '@ImgProcessor/dashboard/dist/style.css'

const ImgProcessor = new ImgProcessor()
  .use(Dashboard, { target: '#app', inline: true })
  .use(AwsS3, {
    limit: 2,
    companionUrl: process.env.VITE_COMPANION_URL,
  })

// Keep this here to access ImgProcessor in tests
window.ImgProcessor = ImgProcessor
