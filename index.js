const getOptions = require('loader-utils').getOptions
const fs = require('fs')

let errorEmitted = false

function loader (source) {

  this.cacheable()

  const options = getOptions(this) || {}

  const {
    fileName = 'index',
    tplLang = 'html',
    cssLang = 'css'
  } = options

  const {
    resourcePath
  } = this

  if (/<script>/.test(source) && /<\/script>/.test(source)) {
    return source
  }

  source = `<script>\n ${source} \n </script>`

  const tplPath = resourcePath.replace(`${fileName}.vue`, `${fileName}.${tplLang}`)
  const cssPath = resourcePath.replace(`${fileName}.vue`, `${fileName}.${cssLang}`)

  const isTplExists = fs.existsSync(tplPath)
  const isCssExists = fs.existsSync(cssPath)

  if (!errorEmitted && (!isTplExists)) {
    this.emitError(new Error(
      `there is should ba a ${fileName}.${tplLang} in the parent dir of ${resourcePath}`
    ))
    errorEmitted = true
  }

  let htmlContent = ''
  let cssContent = ''

  if (isTplExists) {
    htmlContent = `<template lang="${tplLang}" src="${tplPath}"></template>`
  }

  if (isCssExists) {
    cssContent = `<style scoped lang="${cssLang}" src="${cssPath}"></style>`
  }

  return source + htmlContent + cssContent
}

module.exports = loader
