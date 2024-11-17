<template>
  <div id="app">
    <h1>Welcome to ImgProcessor Vue Demo!</h1>
    <h2>Inline Dashboard</h2>
    <label>
      <input
        type="checkbox"
        :checked="showInlineDashboard"
        @change="
          (event) => {
            showInlineDashboard = event.target.checked
          }
        "
      />
      Show Dashboard
    </label>
    <dashboard
      v-if="showInlineDashboard"
      :ImgProcessor="ImgProcessor"
      :props="{
        metaFields: [{ id: 'name', name: 'Name', placeholder: 'File name' }],
      }"
    />
    <h2>Modal Dashboard</h2>
    <div>
      <button @click="open = true">Show Dashboard</button>
      <dashboard-modal
        :ImgProcessor="ImgProcessor2"
        :open="open"
        :props="{
          onRequestCloseModal: handleClose,
        }"
      />
    </div>

    <h2>Drag Drop Area</h2>
    <drag-drop
      :ImgProcessor="ImgProcessor"
      :props="{
        locale: {
          strings: {
            chooseFile: 'Boop a file',
            orDragDrop: 'or yoink it here',
          },
        },
      }"
    />

    <h2>Progress Bar</h2>
    <progress-bar
      :ImgProcessor="ImgProcessor"
      :props="{
        hideAfterFinish: false,
      }"
    />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Vue from 'vue'
import ImgProcessor from '@ImgProcessor/core'
import Tus from '@ImgProcessor/tus'
import { Dashboard, DashboardModal, DragDrop, ProgressBar } from '@ImgProcessor/vue'

export default {
  name: 'App',
  components: {
    Dashboard,
    DashboardModal,
    DragDrop,
    ProgressBar,
  },
  computed: {
    ImgProcessor: () =>
      new ImgProcessor({ id: 'ImgProcessor1', autoProceed: true, debug: true }).use(Tus, {
        endpoint: 'https://tusd.tusdemo.net/files/',
      }),
    ImgProcessor2: () =>
      new ImgProcessor({ id: 'ImgProcessor2', autoProceed: false, debug: true }).use(Tus, {
        endpoint: 'https://tusd.tusdemo.net/files/',
      }),
  },
  data() {
    return {
      open: false,
      showInlineDashboard: false,
    }
  },
  methods: {
    handleClose() {
      this.open = false
    },
  },
}
</script>
<style src="@ImgProcessor/core/dist/style.css"></style>
<style src="@ImgProcessor/dashboard/dist/style.css"></style>
<style src="@ImgProcessor/drag-drop/dist/style.css"></style>
<style src="@ImgProcessor/progress-bar/dist/style.css"></style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
