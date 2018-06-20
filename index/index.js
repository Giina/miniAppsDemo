Page({
  data: {
    categories: [
      {
        name: 'Movie',
        id: 'movie'
      },
      {
        name: 'Music',
        id: 'music'
      },
      {
        name: 'City',
        id: 'city'
      },
    ],
    curIndex: 0,
    toView: 0,
    details: []
  },
  switchCategory(e) {
    if (e.type === "change") {
      this.setData({
        curIndex: e.detail.current ? e.detail.current : 0,
        toView: e.detail.current,
      })
    } else if (e.type === "tap") {
      this.setData({
        curIndex: e.currentTarget.dataset.index ? e.currentTarget.dataset.index : 0,
        toView: e.currentTarget.dataset.index,
      })
    }
  },
  onLoad: function() {
    const vm=this
    wx.request({
      url: 'https://www.easy-mock.com/mock/5b29bc91353194793efa8677/example/listdata',
      success(res){
        vm.setData({
          'details':res.data.data
        })
      }
    })
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
})