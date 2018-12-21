module.exports = {
  // 基本路径
  baseUrl: './',
  // 输出文件目录
  outputDir: 'docs',
  css:{
    loaderOptions:{
      sass:{
        data:`@import "@/assets/scss/all.scss";`
      }
    }
  },
  lintOnSave: false
}
