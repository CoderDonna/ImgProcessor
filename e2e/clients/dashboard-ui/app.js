import ImgProcessor from '@ImgProcessor/core'
import Dashboard from '@ImgProcessor/dashboard'
import RemoteSources from '@ImgProcessor/remote-sources'
import Webcam from '@ImgProcessor/webcam'
import ScreenCapture from '@ImgProcessor/screen-capture'
import GoldenRetriever from '@ImgProcessor/golden-retriever'
import ImageEditor from '@ImgProcessor/image-editor'
import DropTarget from '@ImgProcessor/drop-target'
import Audio from '@ImgProcessor/audio'
import Compressor from '@ImgProcessor/compressor'

import '@ImgProcessor/core/dist/style.css'
import '@ImgProcessor/dashboard/dist/style.css'

const COMPANION_URL = 'http://companion.ImgProcessor.io'

const ImgProcessor = new ImgProcessor()
  .use(Dashboard, { target: '#app', inline: true })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, {
    target: Dashboard,
    showVideoSourceDropdown: true,
    showRecordingLength: true,
  })
  .use(Audio, {
    target: Dashboard,
    showRecordingLength: true,
  })
  .use(ScreenCapture, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(DropTarget, { target: document.body })
  .use(Compressor)
  .use(GoldenRetriever, { serviceWorker: true })

// Keep this here to access ImgProcessor in tests
window.ImgProcessor = ImgProcessor
