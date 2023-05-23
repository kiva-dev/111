<template>
  <view class="att-page">
    <!--att-tab start-->
    <view class="att-tab">
      <view class="tab">
        <view :class="['li',type==1?'active':'']" @click="changeTab(1)">{{$t('user.attentionM.shangpin')}}</view>
        <view :class="['li',type==2?'active':'']" @click="changeTab(2)">{{$t('user.attentionM.dianpu')}}</view>
      </view>
    </view>
    <!--att-tab end-->
    <!--att-box start-->
    <view class="att-box" v-if="type == 1">
      <!--att-goods start-->
      <view class="att-goods">
        <view v-for="item,k in FocusList" :key="k" class="goods" @click="onShopClick(item)">
          <view class="goods-con">
            <view class="goods-img">
              <image class="img" :src="item.image"></image>
            </view>
            <view class="goods-t">{{item.goods_name}}</view>
            <view class="goods-m">
              <view class="price">
                RM<text class="f-34">{{item.goods_price}}</text>
              </view>
              <view class="sale">{{$t('user.attentionM.xiaoliang')}}{{item.sales_actual}}</view>
            </view>
            <view class="goods-b">
              <view class="icon">
                <image class="img" src="../../static/images/index/dianpu.png"></image>
              </view>
              <view class="name">{{item.shop_name}}</view>
              <view class="more">
                <image class="img" src="../../static/images/index/more.png"></image>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!--att-goods end-->
    </view>
    <!--att-box end-->
    <!--att-box start-->
    <view class="att-box" v-if="type == 2">
      <!--att-shop start-->
      <view class="att-shop">
        <!--shop-li start-->
        <view v-for="item,k in FocusList" :key="k" class="shop-li">
          <view class="li-hd">
            <view class="hd-fl">
              <view class="hd-img">
                <image class="img" :src="item.shop_logo"></image>
              </view>
              <view class="hd-txt">
                <view class="t">{{item.shop_name}}</view>
                <view class="c">{{item.focus_num}}{{$t('user.attentionM.guanzhu')}}</view>
              </view>
            </view>
            <!-- <view class="hd-fr" @click="onshopCont(item)">
              <text>{{$t('user.attentionM.jindian')}}</text>
              <view class="more">
                <image class="img" src="../../static/images/mine/more1.png"></image>
              </view>
            </view> -->
          </view>
          <view class="li-bd">
            <view v-for="items,j in item.goods" :key="j" class="li" @click="onShopClick(items)">
              <view class="con">
                <image class="img" :src="items.image"></image>
              </view>
            </view>
          </view>
        </view>
        <!--shop-li end-->
      </view>
      <!--att-shop end-->
    </view>
    <!--att-box end-->
  </view>
</template>

<script>
export default {
  data () {
    return {
      type: 1,
      page: 1,
      pagenum: 10,
      totalPageNum: 0,
      FocusList: []
    }
  },
  onShow () {
    this.page = 1
    this.FocusList = []
    this.onMineFocusList()
  },
  methods: {
    changeTab (Inv) {
      this.type = Inv;
      this.page = 1
      this.FocusList = []
      this.onMineFocusList()
    },
    onMineFocusList () {
      this.$http.post(this.$apiObj.MineFocusList, { page: this.page, pagenum: this.pagenum, type: this.type }).then(res => {
        if (res.code == 1) {
          this.totalPageNum = res.data.total
          this.FocusList = this.page == 1 ? res.data.data : [...this.FocusList, ...res.data.data]
        }
      })
    },
    onShopClick (item) {
      if (item.goods_type == 1) {
        uni.navigateTo({
          url: '/pages/class/Gdetail?id=' + item.goods_id
        });
      } else {
        uni.navigateTo({
          url: '/pages/index/detail?id=' + item.goods_id
        });
      }
    },
    onshopCont (item) {
      uni.setStorageSync('shop_id', item.id)
      uni.navigateTo({
        url: '/pages/class/shop/shop'
      });
    },
  },
  // 页面滑动到底部
  onReachBottom () {
    if (this.totalPageNum <= this.page * this.pagenum) return
    this.page++
    this.onMineFocusList()
  }
}
</script>


<style lang="less" scoped>
.att-page {
  .att-tab {
    display: flex;
    justify-content: center;
    padding: 20rpx 30rpx;
    .tab {
      display: flex;
      background: #f5f5f5;
      border-radius: 35rpx;
      overflow: hidden;
    }
    .li {
      width: 170rpx;
      height: 70rpx;
      text-align: center;
      line-height: 70rpx;
      font-size: 26rpx;
    }
    .active {
      background: #fc0609;
      color: #fff;
    }
  }
  .att-box {
    margin: 30rpx;
    .att-goods {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10rpx;
      .goods {
        width: 50%;
        .goods-con {
          margin: 10rpx;
          .goods-img {
            width: 335rpx;
            height: 335rpx;
            border-radius: 10rpx;
            overflow: hidden;
          }
          .goods-t {
            height: 60rpx;
            font-size: 26rpx;
            line-height: 1.2;
            margin: 30rpx 0;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden; //溢出内容隐藏
            text-overflow: ellipsis; //文本溢出部分用省略号表示
            display: -webkit-box; //特别显示模式
            -webkit-line-clamp: 2; //行数
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .goods-m {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .price {
              color: #fc0609;
              font-size: 22rpx;
              font-weight: 550;
            }
            .sale {
              font-size: 20rpx;
              color: #999;
            }
          }
          .goods-b {
            display: flex;
            align-items: center;
            margin-top: 30rpx;
            .icon {
              width: 26rpx;
              height: 26rpx;
              min-width: 26rpx;
              max-width: 26rpx;
              margin-right: 10rpx;
            }
            .name {
              font-size: 24rpx;
            }
            .more {
              width: 10rpx;
              height: 18rpx;
              margin-left: 10rpx;
              min-width: 10rpx;
            }
          }
        }
      }
    }

    .att-shop {
      .shop-li {
        border-bottom: 1px solid #eeeeee;
        padding: 20rpx 0;
        .li-hd {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .hd-fl {
            display: flex;
            width: calc(100% -100rpx);
            .hd-img {
              width: 60rpx;
              height: 60rpx;
              border-radius: 10rpx;
              overflow: hidden;
              min-width: 60rpx;
              margin-right: 20rpx;
            }
            .hd-txt {
              width: calc(100% - 80rpx);
              .t {
                font-size: 26rpx;
                font-weight: 550;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .c {
                font-size: 20rpx;
                color: #999;
              }
            }
          }
          .hd-fr {
            color: #999;
            font-size: 26rpx;
            display: flex;
            align-items: center;
            .more {
              width: 12rpx;
              height: 22rpx;
              margin-left: 10rpx;
            }
          }
        }
        .li-bd {
          display: flex;
          flex-wrap: wrap;
          .li {
            width: 33.3333%;
          }
          .con {
            margin: 13rpx;
            width: 212rpx;
            height: 212rpx;
          }
        }
      }
    }
  }
}
</style>