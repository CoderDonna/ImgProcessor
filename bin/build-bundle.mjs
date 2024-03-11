#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import chalk from 'chalk'

import esbuild from 'esbuild'
import babel from 'esbuild-plugin-babel'

const ImgProcessor_ROOT = new URL('../', import.meta.url)
const PACKAGES_ROOT = new URL('./packages/', ImgProcessor_ROOT)

function buildBundle (srcFile, bundleFile, { minify = true, standalone = '', plugins, target, format } = {}) {
  return esbuild.build({
    bundle: true,
    sourcemap: true,
    entryPoints: [srcFile],
    outfile: bundleFile,
    platform: 'browser',
    minify,
    keepNames: true,
    plugins,
    target,
    format,
  }).then(() => {
    if (minify) {
      console.info(chalk.green(`✓ Built Minified Bundle [${standalone}]:`), chalk.magenta(bundleFile))
    } else {
      console.info(chalk.green(`✓ Built Bundle [${standalone}]:`), chalk.magenta(bundleFile))
    }
  })
}

await fs.mkdir(new URL('./ImgProcessor/dist', PACKAGES_ROOT), { recursive: true })
await fs.mkdir(new URL('./@ImgProcessor/locales/dist', PACKAGES_ROOT), { recursive: true })

const methods = [
  buildBundle(
    './packages/ImgProcessor/index.mjs',
    './packages/ImgProcessor/dist/ImgProcessor.min.mjs',
    { standalone: 'ImgProcessor (ESM)', format: 'esm' },
  ),
  buildBundle(
    './packages/ImgProcessor/bundle.mjs',
    './packages/ImgProcessor/dist/ImgProcessor.min.js',
    { standalone: 'ImgProcessor', format: 'iife' },
  ),
  buildBundle(
    './packages/ImgProcessor/bundle-legacy.mjs',
    './packages/ImgProcessor/dist/ImgProcessor.legacy.min.js',
    {
      standalone: 'ImgProcessor (with polyfills)',
      target: 'es5',
      plugins:[babel({
        config:{
          compact: true,
          highlightCode: true,
          inputSourceMap: true,

          browserslistEnv: 'legacy',
          presets: [['@babel/preset-env',  {
            loose: false,
            targets: { ie:11 },
            useBuiltIns: 'entry',
            corejs: { version: '3.24', proposals: true },
          }]],
        },
      })],
    },
  ),
]

// Build mini versions of all the locales
const localesModules = await fs.opendir(new URL('./@ImgProcessor/locales/src/', PACKAGES_ROOT))
for await (const dirent of localesModules) {
  if (!dirent.isDirectory() && dirent.name.endsWith('.js')) {
    const localeName = path.basename(dirent.name, '.js')
    methods.push(
      buildBundle(
        `./packages/@ImgProcessor/locales/src/${localeName}.js`,
        `./packages/@ImgProcessor/locales/dist/${localeName}.min.js`,
        { minify: true },
      ),
    )
  }
}

// Add BUNDLE-README.MD
methods.push(
  fs.copyFile(
    new URL('./BUNDLE-README.md', ImgProcessor_ROOT),
    new URL('./ImgProcessor/dist/README.md', PACKAGES_ROOT),
  ),
)

await Promise.all(methods).then(() => {
  console.info(chalk.yellow('✓ JS bundles 🎉'))
}, (err) => {
  console.error(chalk.red('✗ Error:'), chalk.red(err.message))
})
