/** @jsx h */

import { UIPlugin } from '@ImgProcessor/core'
import { Provider } from '@ImgProcessor/companion-client'
import { ProviderViews } from '@ImgProcessor/provider-views'
import { h } from 'preact'

const defaultOptions = {}

export default class MyCustomProvider extends UIPlugin {
  constructor (ImgProcessor, opts) {
    super(ImgProcessor, opts)
    this.type = 'acquirer'
    this.id = this.opts.id || 'MyCustomProvider'
    Provider.initPlugin(this, opts)

    this.icon = () => (
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" fill="#000000" fillRule="nonzero" />
      </svg>
    )

    this.provider = new Provider(ImgProcessor, {
      companionUrl: this.opts.companionUrl,
      companionHeaders: this.opts.companionHeaders,
      provider: 'myunsplash',
      pluginId: this.id,
    })

    this.defaultLocale = {
      strings: {
        pluginNameMyUnsplash: 'MyUnsplash',
      },
    }

    // merge default options with the ones set by user
    this.opts = { ...defaultOptions, ...opts }

    this.i18nInit()
    this.title = this.i18n('pluginNameMyUnsplash')

    this.files = []
  }

  install () {
    this.view = new ProviderViews(this, {
      provider: this.provider,
    })

    const { target } = this.opts
    if (target) {
      this.mount(target, this)
    }
  }

  uninstall () {
    this.view.tearDown()
    this.unmount()
  }

  onFirstRender () {
    return this.view.getFolder()
  }

  render (state) {
    return this.view.render(state)
  }
}
