module.exports = {
  proseWrap: 'always',
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  overrides: [
    {
      files: 'packages/@ImgProcessor/angular/**',
      options: {
        semi: true,
      },
    },
  ],
}
