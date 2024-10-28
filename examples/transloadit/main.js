import Transloadit, { COMPANION_URL } from '@ImgProcessor/transloadit'
import ImgProcessor from '@ImgProcessor/core'
import Form from '@ImgProcessor/form'
import Dashboard from '@ImgProcessor/dashboard'
import RemoteSources from '@ImgProcessor/remote-sources'
import ImageEditor from '@ImgProcessor/image-editor'
import Webcam from '@ImgProcessor/webcam'
import ProgressBar from '@ImgProcessor/progress-bar'

import '@ImgProcessor/core/dist/style.css'
import '@ImgProcessor/dashboard/dist/style.css'
import '@ImgProcessor/image-editor/dist/style.css'
import '@ImgProcessor/progress-bar/dist/style.css'

const TRANSLOADIT_KEY = '35c1aed03f5011e982b6afe82599b6a0'
// A trivial template that resizes images, just for example purposes.
//
// "steps": {
//   ":original": { "robot": "/upload/handle" },
//   "resize": {
//     "use": ":original",
//     "robot": "/image/resize",
//     "width": 100,
//     "height": 100,
//     "imagemagick_stack": "v1.0.0"
//   }
// }
const TEMPLATE_ID = 'bbc273f69e0c4694a5a9d1b587abc1bc'

/**
 * Form
 */

const formImgProcessor = new ImgProcessor({
  debug: true,
  autoProceed: true,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Dashboard, {
    trigger: '#ImgProcessor-select-files',
    closeAfterFinish: true,
    note: 'Only PNG files please!',
  })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Form, {
    target: '#test-form',
    fields: ['message'],
    // submitOnSuccess: true,
    addResultToForm: true,
  })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

formImgProcessor.on('error', (err) => {
  document.querySelector('#test-form .error')
    .textContent = err.message
})

formImgProcessor.on('upload-error', (file, err) => {
  document.querySelector('#test-form .error')
    .textContent = err.message
})

formImgProcessor.on('complete', ({ transloadit }) => {
  const btn = document.getElementById('ImgProcessor-select-files')
  btn.hidden = true
  const selectedFiles = document.getElementById('ImgProcessor-form-selected-files')
  selectedFiles.textContent = `selected files: ${Object.keys(transloadit[0].results).length}`
})

window.formImgProcessor = formImgProcessor

/**
 * Form with Dashboard
 */

const formImgProcessorWithDashboard = new ImgProcessor({
  debug: true,
  autoProceed: false,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Dashboard, {
    inline: true,
    target: '#dashboard-form .dashboard',
    note: 'Only PNG files please!',
    hideUploadButton: true,
  })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Form, {
    target: '#dashboard-form',
    fields: ['message'],
    triggerUploadOnSubmit: true,
    submitOnSuccess: true,
    addResultToForm: true,
  })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

window.formImgProcessorWithDashboard = formImgProcessorWithDashboard

/**
 * Dashboard
 */

const dashboard = new ImgProcessor({
  debug: true,
  autoProceed: false,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Dashboard, {
    inline: true,
    target: '#dashboard',
    note: 'Only PNG files please!',
  })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

window.dashboard = dashboard

// /**
//  * Dashboard Modal
//  */

const dashboardModal = new ImgProcessor({
  debug: true,
  autoProceed: false,
})
  .use(Dashboard, { closeAfterFinish: true })
  .use(RemoteSources, { companionUrl: COMPANION_URL })
  .use(Webcam, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })

dashboardModal.on('complete', ({ transloadit, successful, failed }) => {
  if (failed?.length !== 0) {
    // eslint-disable-next-line no-console
    console.error('it failed', failed)
  } else {
    // eslint-disable-next-line no-console
    console.log('success', { transloadit, successful })
  }
})

function openModal () {
  dashboardModal.getPlugin('Dashboard').openModal()
}

window.openModal = openModal

// /**
//  * ImgProcessor.upload (files come from input[type=file])
//  */

const ImgProcessorWithoutUI = new ImgProcessor({
  debug: true,
  restrictions: {
    allowedFileTypes: ['.png'],
  },
})
  .use(Transloadit, {
    waitForEncoding: true,
    params: {
      auth: { key: TRANSLOADIT_KEY },
      template_id: TEMPLATE_ID,
    },
  })
  .use(ProgressBar, { target: '#upload-progress' })

window.doUpload = (event) => {
  const resultEl = document.querySelector('#upload-result')
  const errorEl = document.querySelector('#upload-error')

  ImgProcessorWithoutUI.addFiles(event.target.files)
  ImgProcessorWithoutUI.upload()

  ImgProcessorWithoutUI.on('complete', ({ transloadit }) => {
    resultEl.classList.remove('hidden')
    errorEl.classList.add('hidden')
    resultEl.textContent = JSON.stringify(transloadit[0].results, null, 2)

    const resizedUrl = transloadit[0].results['resize'][0]['ssl_url']
    const img = document.createElement('img')
    img.src = resizedUrl
    document.getElementById('upload-result-image').appendChild(img)
  })

  ImgProcessorWithoutUI.on('error', (err) => {
    resultEl.classList.add('hidden')
    errorEl.classList.remove('hidden')
    errorEl.textContent = err.message
  })
}
