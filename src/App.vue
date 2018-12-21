<template>
  <div id="app">
    <ul class="nav" mode="horizontal">
      <li><a href="#base">基本信息</a></li>
      <li><a href="#des">自我描述</a></li>
      <li><a href="#word">工作经历</a></li>
      <li><a href="#project">项目经验</a></li>
      <li><a href="#edu">教育经历</a></li>
      <li><a href="#pic">图片作品</a></li>
    </ul>
    <router-view/>
  </div>
</template>

<style lang="scss">
  .nav{
    position: fixed;
    z-index: 999;
    top: 0;
    left: 50%;
    margin-left: -600px;
    width: 1200px;
    height: 60px;
    line-height: 60px;
    background: rgba(242,242,242,0.8);
    padding: 0 200px;
    @include flex(space-between);
  }
</style>