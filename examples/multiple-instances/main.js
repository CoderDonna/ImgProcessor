import ImgProcessor from '@ImgProcessor/core'
import Dashboard from '@ImgProcessor/dashboard'
import GoldenRetriever from '@ImgProcessor/golden-retriever'

import '@ImgProcessor/core/dist/style.css'
import '@ImgProcessor/dashboard/dist/style.css'

// Initialise two ImgProcessor instances with the GoldenRetriever plugin,
// but with different `id`s.
const a = new ImgProcessor({
  id: 'a',
  debug: true,
})
  .use(Dashboard, {
    target: '#a',
    inline: true,
    width: 400,
  })
  .use(GoldenRetriever, { serviceWorker: false })

const b = new ImgProcessor({
  id: 'b',
  debug: true,
})
  .use(Dashboard, {
    target: '#b',
    inline: true,
    width: 400,
  })
  .use(GoldenRetriever, { serviceWorker: false })

window.a = a
window.b = b
