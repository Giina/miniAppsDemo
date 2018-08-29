// iqiyi/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    currentIndex: 0,
    indicatorDots: false,
    autoplay: false,
    circular: true,
    interval: 5000,
    duration: 1000,
    details: []
  },
  swiperChange(e) {
    const vm = this
    vm.setData({
      currentIndex: e.detail.current || 0
    })
  },
  preview({
    currentTarget: {
      dataset: {
        index
      }
    }
  }) {
    const vm = this
    let urls = []
    if (vm.data.details[index].has_poster) {
      urls.push('https://img.reelgood.com/content/movie/' + vm.data.details[index].id + '/poster-780.jpg')
    }
    if (vm.data.details[index].has_backdrop) {
      urls.push('https://img.reelgood.com/content/movie/' + vm.data.details[index].id + '/backdrop-1920.jpg')
    }
    if (urls.length > 0) {
      wx.previewImage({
        urls
      })
    } else {
      wx.showToast({
        title: '暂无图片可以预览',
      })
    }
  },
  setClip({
    currentTarget: {
      dataset: {
        index
      }
    }
  }) {
    const vm=this
    wx.setClipboardData({
      data: vm.data.details[index].slug.replace('-',' ')
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const vm = this
    fetchData(vm)
    fetchData(vm)
    fetchData(vm)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

function fetchData(vm) {
  wx.request({
    url: 'https://api.reelgood.com/v1/roulette/netflix?nocache=true^&content_kind=movie&availability=onAnySource',
    success({
      data: {
        id
      }
    }) {
      wx.request({
        url: `https://api.reelgood.com/v1/movie/${id}?availability=onAnySource&interaction=true`,
        success({
          data
        }) {
          console.log(data)
          let arr = vm.data.details
          arr.push(data)
          vm.setData({
            details: arr
          })
        }
      })
    }
  })
}