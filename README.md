# tsc-loader

> tsc -> template-script-css 

## why
在Vue 开发时，得益于 SFC 机制，我们可以将 template script css 写在 一个 vue 文件中，但是在实际中，这样可能会造成一个 vue 文件中代码量过多。因此我们需要将template，script，css内容分别抽离出来。

## how

### 安装

```bash
npm i tsc-loader -D
```

### 配置

```javascript

{
    test: /\.vue$/,
    use: [
      {
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        loader: 'tsc-loader',
        options: {
          cssLang: 'less',
          fileName: 'index',
          tplLang: 'html'
        }
      }
    ]
},
```

>template文件，vue 文件，样式文件的文件名要一致，如 index.html, index.vue, index.less。index.vue 中可以直接写 js代码，不需要包裹在 script 中