/* eslint-disable react/react-in-jsx-scope */
import ImgProcessor from '@ImgProcessor/core'
/* eslint-disable-next-line no-unused-vars */
import React, { useState } from 'react'
import { Dashboard, DashboardModal, DragDrop } from '@ImgProcessor/react'
import ThumbnailGenerator from '@ImgProcessor/thumbnail-generator'
import RemoteSources from '@ImgProcessor/remote-sources'

import '@ImgProcessor/core/dist/style.css'
import '@ImgProcessor/dashboard/dist/style.css'
import '@ImgProcessor/drag-drop/dist/style.css'

export default function App () {
  const RemoteSourcesOptions = {
    companionUrl: 'http://companion.ImgProcessor.io',
    sources: ['GoogleDrive', 'OneDrive', 'Unsplash', 'Zoom', 'Url'],
  }
  const ImgProcessorDashboard = new ImgProcessor({ id: 'dashboard' }).use(RemoteSources, { ...RemoteSourcesOptions })
  const ImgProcessorModal = new ImgProcessor({ id: 'modal' })
  const ImgProcessorDragDrop = new ImgProcessor({ id: 'drag-drop' }).use(ThumbnailGenerator)
  const [open, setOpen] = useState(false)

  // drag-drop has no visual output so we test it via the ImgProcessor instance
  window.ImgProcessor = ImgProcessorDragDrop

  return (
    <div style={{ maxWidth: '30em', margin: '5em 0', display: 'grid', gridGap: '2em' }}>
      <button type="button" id="open" onClick={() => setOpen(!open)}>
        Open Modal
      </button>

      <Dashboard id="dashboard" ImgProcessor={ImgProcessorDashboard} />
      <DashboardModal id="modal" open={open} ImgProcessor={ImgProcessorModal} />
      <DragDrop id="drag-drop" ImgProcessor={ImgProcessorDragDrop} />
    </div>
  )
}
