<template>
  <dashboard :ImgProcessor="ImgProcessor" />
</template>

<script>
import Vue from 'vue'
import ImgProcessor from '@ImgProcessor/core'
import { Dashboard } from '@ImgProcessor/vue'

export default {
  name: 'App',
  components: {
    Dashboard,
  },
  computed: {
    ImgProcessor: () => new ImgProcessor(),
  },
}
</script>

<style src="@ImgProcessor/core/dist/style.css"></style>
<style src="@ImgProcessor/dashboard/dist/style.css"></style>
