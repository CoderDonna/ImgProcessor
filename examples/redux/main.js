import { compose, combineReducers, applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import ImgProcessor from '@ImgProcessor/core'
import ReduxStore from '@ImgProcessor/store-redux'
import * as ImgProcessorReduxStore from '@ImgProcessor/store-redux'
import Dashboard from '@ImgProcessor/dashboard'
import Tus from '@ImgProcessor/tus'

import '@ImgProcessor/core/dist/style.css'
import '@ImgProcessor/dashboard/dist/style.css'

function counter (state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const reducer = combineReducers({
  counter,
  // You don't have to use the `ImgProcessor` key. But if you don't,
  // you need to provide a custom `selector` to the `ImgProcessorReduxStore` call below.
  ImgProcessor: ImgProcessorReduxStore.reducer,
})

let enhancer = applyMiddleware(
  ImgProcessorReduxStore.middleware(),
  logger,
)
if (typeof __REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') {
  // eslint-disable-next-line no-undef
  enhancer = compose(enhancer, __REDUX_DEVTOOLS_EXTENSION__())
}

const store = configureStore({
  reducer,
  enhancers: [enhancer],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [ImgProcessorReduxStore.STATE_UPDATE],
      ignoreState: true,
    },
  }),
})

// Counter example from https://github.com/reactjs/redux/blob/master/examples/counter-vanilla/index.html
const valueEl = document.querySelector('#value')

function getCounter () { return store.getState().counter }
function render () {
  valueEl.innerHTML = getCounter().toString()
}
render()
store.subscribe(render)

document.querySelector('#increment').onclick = () => {
  store.dispatch({ type: 'INCREMENT' })
}
document.querySelector('#decrement').onclick = () => {
  store.dispatch({ type: 'DECREMENT' })
}
document.querySelector('#incrementIfOdd').onclick = () => {
  if (getCounter() % 2 !== 0) {
    store.dispatch({ type: 'INCREMENT' })
  }
}
document.querySelector('#incrementAsync').onclick = () => {
  setTimeout(() => store.dispatch({ type: 'INCREMENT' }), 1000)
}

// ImgProcessor using the same store
const ImgProcessor = new ImgProcessor({
  id: 'redux',
  store: new ReduxStore({ store }),
  // If we had placed our `reducer` elsewhere in Redux, eg. under an `ImgProcessor` key in the state for a profile page,
  // we'd do something like:
  //
  // store: new ReduxStore({
  //   store: store,
  //   id: 'avatar',
  //   selector: state => state.pages.profile.ImgProcessor
  // }),
  debug: true,
})
ImgProcessor.use(Dashboard, {
  target: '#app',
  inline: true,
  width: 400,
})
ImgProcessor.use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
