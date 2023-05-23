<template>
  <view class="class-page">
    <!--auct-head start-->
    <view class="auct-head">
      <navigator url="./search" hover-class="none" class="head-search">
        <view class="icon">
          <image class="img" src="../../static/images/search1.png"></image>
        </view>
        <view class="c">{{$t('home.iPhone')}}</view>
      </navigator>
    </view>
    <!--auct-head end-->
    <!--class-nav start-->
    <view class="class-nav">
      <view class="nav-ul">
        <view v-for="item in FirstList" :key="item.id" class="li" :class="item.id==navId?'active':''" @click="onNavClick(item)">{{item.name}}</view>
      </view>
    </view>
    <!--class-nav end-->
    <!--class-box start-->
    <view class="class-box">
      <view class="class-t">{{name}}</view>
      <view class="class-ul">
        <navigator :url="'./Glist?id='+item.id+'&name='+item.name" hover-class="none" v-for="item,k in SecondList" :key="k" class="li">
          <view class="li-con">
            <view class="li-img">
              <image class="img" :src="item.image"></image>
            </view>
            <view class="t">{{item.name}}</view>
          </view>
        </navigator>
      </view>
    </view>
    <!--class-box end-->
  </view>
</template>
<script>
export default {
  data () {
    return {
      navId: '',// 选中
      name: '',
      FirstList: [],// 一级分类
      SecondList: [],// 二级分类
      isShopCont: false,// 中文还是英文
    }
  },
  onShow () {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    // 一级分类
    this.$http.post(this.$apiObj.IndexFirstCate).then(res => {
      if (res.code == 1) {
        if (this.isShopCont) {
          res.data.map(item => {
            item.name = this.getCaption(item.name, 1)
          })
        } else {
          res.data.map(item => {
            item.name = this.getCaption(item.name, 0)
          })
        }
        this.navId = uni.getStorageSync('isNum') ? res.data[uni.getStorageSync('isNum')].id : res.data[0].id
        this.name = uni.getStorageSync('isNum') ? res.data[uni.getStorageSync('isNum')].name : res.data[0].name
        uni.removeStorageSync('isNum')
        this.FirstList = res.data
        // 获取二级分类 
        this.onIndexSecondCate()
      }
    })
  },
  methods: {
    getCaption (str, state) {
      if (state == 1) {
        var indexs = str.indexOf("|")
        str = str.substring(indexs + 1, str.length);
      } else {
        var index = str.indexOf("|")
        str = str.substring(0, index);
      }
      return str;
    },
    // 点击一级分类
    onNavClick (item) {
      this.name = item.name
      this.navId = item.id
      this.onIndexSecondCate()
    },
    // 获取二级分类
    onIndexSecondCate () {
      this.$http.post(this.$apiObj.IndexSecondCate, { c_id: this.navId }).then(res => {
        if (res.code == 1) {
          if (this.isShopCont) {
            res.data.map(item => {
              item.name = this.getCaption(item.name, 1)
            })
          } else {
            res.data.map(item => {
              item.name = this.getCaption(item.name, 0)
            })
          }
          this.SecondList = res.data
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.class-page {
  .auct-head {
    background: #9a3064;
    background: linear-gradient(90deg, #9a3064 0%, #59499b 100%);
    padding: 80rpx 30rpx 15rpx 30rpx;
    .head-search {
      height: 70rpx;
      background: #ffffff;
      border-radius: 35rpx;
      display: flex;
      align-items: center;
      padding: 0 26rpx;
      .icon {
        width: 23rpx;
        height: 24rpx;
        min-width: 23rpx;
        margin-right: 15rpx;
      }
      .c {
        font-size: 26rpx;
        color: #999;
      }
    }
  }

  .class-nav {
    position: fixed;
    left: 0;
    top: 165rpx;
    height: calc(100% - 165rpx);
    background: #f9f9f9;
    width: 200rpx;

    .nav-ul {
      position: relative;
      height: calc(100% - 160rpx);
      overflow-y: auto;
    }
    .li {
      height: 90rpx;
      text-align: center;
      line-height: 90rpx;
      position: relative;
      font-size: 26rpx;
    }
    .active {
      font-weight: 550;
      color: #fc0609;
      background: #fff;
    }
    .active:before {
      display: block;
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      width: 12rpx;
      height: 40rpx;
      background: #fc0609;
      margin-top: -20rpx;
    }
  }

  .class-box {
    position: fixed;
    right: 0;
    top: 165rpx;
    height: calc(100% - 165rpx);
    // background: #f9f9f9;
    width: 550rpx;
    overflow-y: auto;

    // margin: 0 30rpx 0 230rpx;
    .class-t {
      font-size: 28rpx;
      line-height: 90rpx;
      font-weight: 550;
    }
    .class-ul {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10rpx;
      .li {
        width: 33.3333%;
        .li-con {
          margin: 20rpx 10rpx;
        }
        .li-img {
          width: 130rpx;
          height: 130rpx;
          margin: 0 auto;
        }
        .t {
          font-size: 24rpx;
          text-align: center;
          margin-top: 15rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
