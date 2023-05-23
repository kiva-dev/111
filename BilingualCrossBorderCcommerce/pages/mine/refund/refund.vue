<template>
  <view class="order-page">
    <!--order-tab start-->
    <!-- <view class="order-tab">
      <view :class="['li',buy_type==1?'active':'']" @click="onNavClick(1)">{{$t('user.refund.putdd')}}</view>
      <view :class="['li',buy_type==2?'active':'']" @click="onNavClick(2)">{{$t('user.refund.pintdd')}}</view>
      <view :class="['li',buy_type==3?'active':'']" @click="onNavClick(3)">{{$t('user.refund.jingpdd')}}</view>
    </view> -->
    <!--order-tab end-->
    <!--普通订单 order-box start-->
    <view class="order-box" v-if="buy_type == 1">
      <view class="order-ul" v-if="AfterList.length">
        <!--order-li start-->
        <view class="order-li" v-for="item in AfterList" :key="item.id" @click="navClick(item.id)">
          <view class="li-hd">
            <view class="hd-fl">
              <view class="icon">
                <image class="img" src="../../../static/images/index/dianpu.png"></image>
              </view>
              <view class="name">{{item.shop_name}}</view>
            </view>
            <view class="status" v-if="item.status=='-2'">{{$t('user.refund.shwc')}}</view>
            <view class="status" v-if="item.status=='-1'">{{$t('user.refund.tksb')}}</view>
            <view class="status" v-if="item.status==0">{{$t('user.refund.shz')}}</view>
            <view class="status" v-if="item.status==1">
              <block v-if="item.refund_type==1">{{$t('user.refund.tueihtk')}}</block>
              <block v-if="item.refund_type==2">{{$t('user.refund.jintueihuo')}}</block>
              <block v-if="item.refund_type==3">{{$t('user.refund.jintueikuan')}}</block>
              <block v-if="item.refund_type==4">{{$t('user.refund.huanhuo')}}</block>
            </view>
            <view class="status" v-if="item.status==2">{{$t('user.refund.mjyfhh')}}</view>
            <view class="status" v-if="item.status==3">{{$t('user.refund.sjyfh')}}</view>
            <view class="status gray" v-if="item.status==4">
              <block v-if="item.refund_type==1">{{$t('user.refund.thtkcg')}}</block>
              <block v-if="item.refund_type==2">{{$t('user.refund.thcg')}}</block>
              <block v-if="item.refund_type==3">{{$t('user.refund.tkcg')}}</block>
              <block v-if="item.refund_type==4">{{$t('user.refund.hhcg')}}</block>
            </view>
          </view>
          <!--order-mid start-->
          <view class="order-mid">
            <view class="mid-img">
              <image class="img" :src="item.image"></image>
            </view>
            <view class="mid-txt">
              <view class="h-flex">
                <view class="t">{{item.goods_name}}</view>
                <view class="num">*{{item.num}}</view>
              </view>
              <view class="b-flex">
                <view class="s">{{item.goods_attrs}}</view>
                <view class="price">
                  RM
                  <text>{{$filter.formatValue(item.refund_money, 'split')[0]}}</text>
                  .{{$filter.formatValue(item.refund_money, 'split')[1] ? $filter.formatValue(item.refund_money, 'split')[1] : '00'}}
                </view>
              </view>
            </view>
          </view>
          <!--order-mid end-->
          <!--order-bd start-->
          <view class="order-bd">
            <button class="order-btn gray" v-if="item.status=='-2'||item.status=='-1'||item.status=='4'" @click.stop="onDelClick(item)">{{$t('user.refund.scdd')}}</button>
            <button class="order-btn" v-if="item.status==0">{{$t('user.refund.shz')}}</button>
          </view>
          <!--order-bd end-->
        </view>
        <!--order-li end-->
      </view>
      <view v-else class="zanwusju">
        <image src="/static/images/zanwusju.png" />
        <view class="title">~{{$t('home.zanwushuju')}}~</view>
      </view>
    </view>
    <!--普通订单order-box end-->
    <!--拼团订单 order-box start-->
    <view class="order-box" v-if="buy_type == 2">
      <view class="order-ul" v-if="AfterList.length">
        <!--order-li start-->
        <view class="order-li" v-for="item in AfterList" :key="item.id" @click="navClick(item.id)">
          <view class="li-hd">
            <view class="hd-fl">
              <view class="icon">
                <image class="img" src="../../../static/images/index/dianpu.png"></image>
              </view>
              <view class="name">{{item.shop_name}}</view>
            </view>
            <view class="status" v-if="item.status=='-2'">{{$t('user.refund.shwc')}}</view>
            <view class="status" v-if="item.status=='-1'">{{$t('user.refund.tksb')}}</view>
            <view class="status" v-if="item.status==0">{{$t('user.refund.shz')}}</view>
            <view class="status" v-if="item.status==1">
              <block v-if="item.refund_type==1">{{$t('user.refund.tueihtk')}}</block>
              <block v-if="item.refund_type==2">{{$t('user.refund.jintueihuo')}}</block>
              <block v-if="item.refund_type==3">{{$t('user.refund.jintueikuan')}}</block>
              <block v-if="item.refund_type==4">{{$t('user.refund.huanhuo')}}</block>
            </view>
            <view class="status" v-if="item.status==2">{{$t('user.refund.mjyfhh')}}</view>
            <view class="status" v-if="item.status==3">{{$t('user.refund.sjyfh')}}</view>
            <view class="status gray" v-if="item.status==4">
              <block v-if="item.refund_type==1">{{$t('user.refund.thtkcg')}}</block>
              <block v-if="item.refund_type==2">{{$t('user.refund.thcg')}}</block>
              <block v-if="item.refund_type==3">{{$t('user.refund.tkcg')}}</block>
              <block v-if="item.refund_type==4">{{$t('user.refund.hhcg')}}</block>
            </view>
          </view>
          <!--order-mid start-->
          <view class="order-mid">
            <view class="mid-img">
              <image class="img" :src="item.image"></image>
            </view>
            <view class="mid-txt">
              <view class="h-flex">
                <view class="t">{{item.goods_name}}</view>
                <view class="num">*{{item.num}}</view>
              </view>
              <view class="b-flex">
                <view class="s">{{item.goods_attrs}}</view>
                <view class="price">{{$t('user.refund.tueikuan')}}：
                  RM
                  <text>{{$filter.formatValue(item.refund_money, 'split')[0]}}</text>
                  .{{$filter.formatValue(item.refund_money, 'split')[1] ? $filter.formatValue(item.refund_money, 'split')[1] : '00'}}
                </view>
              </view>
            </view>
          </view>
          <!--order-mid end-->
          <!--order-bd start-->
          <view class="order-bd">
            <button class="order-btn gray" v-if="item.status=='-2'||item.status=='-1'||item.status=='4'" @click.stop="onDelClick(item)">{{$t('user.refund.scdd')}}</button>
            <button class="order-btn" v-if="item.status==0">{{$t('user.refund.shz')}}</button>
          </view>
          <!--order-bd end-->
        </view>
        <!--order-li end-->
      </view>
      <view v-else class="zanwusju">
        <image src="/static/images/zanwusju.png" />
        <view class="title">~{{$t('home.zanwushuju')}}~</view>
      </view>
    </view>
    <!--订单order-box end-->
    <!--竞拍订单 order-box start-->
    <view class="order-box" v-if="buy_type == 3">
      <view class="order-ul" v-if="AfterList.length">
        <!--order-li start-->
        <view class="order-li" v-for="item in AfterList" :key="item.id" @click="navClick(item.id)">
          <view class="li-hd">
            <view class="hd-fl">
              <view class="icon">
                <image class="img" src="../../../static/images/index/dianpu.png"></image>
              </view>
              <view class="name">{{item.shop_name}}</view>
            </view>
            <view class="status" v-if="item.status=='-2'">{{$t('user.refund.shwc')}}</view>
            <view class="status" v-if="item.status=='-1'">{{$t('user.refund.tksb')}}</view>
            <view class="status" v-if="item.status==0">{{$t('user.refund.shz')}}</view>
            <view class="status" v-if="item.status==1">
              <block v-if="item.refund_type==1">{{$t('user.refund.tueihtk')}}</block>
              <block v-if="item.refund_type==2">{{$t('user.refund.jintueihuo')}}</block>
              <block v-if="item.refund_type==3">{{$t('user.refund.jintueikuan')}}</block>
              <block v-if="item.refund_type==4">{{$t('user.refund.huanhuo')}}</block>
            </view>
            <view class="status" v-if="item.status==2">{{$t('user.refund.mjyfhh')}}</view>
            <view class="status" v-if="item.status==3">{{$t('user.refund.sjyfh')}}</view>
            <view class="status gray" v-if="item.status==4">
              <block v-if="item.refund_type==1">{{$t('user.refund.thtkcg')}}</block>
              <block v-if="item.refund_type==2">{{$t('user.refund.thcg')}}</block>
              <block v-if="item.refund_type==3">{{$t('user.refund.tkcg')}}</block>
              <block v-if="item.refund_type==4">{{$t('user.refund.hhcg')}}</block>
            </view>
          </view>
          <!--order-mid start-->
          <view class="order-mid">
            <view class="mid-img">
              <image class="img" :src="item.image"></image>
            </view>
            <view class="mid-txt">
              <view class="h-flex">
                <view class="t">{{item.goods_name}}</view>
                <view class="num">*{{item.num}}</view>
              </view>
              <view class="b-flex">
                <view class="s">{{item.goods_attrs}}</view>
                <view class="price">
                  RM
                  <text>{{$filter.formatValue(item.refund_money, 'split')[0]}}</text>
                  .{{$filter.formatValue(item.refund_money, 'split')[1] ? $filter.formatValue(item.refund_money, 'split')[1] : '00'}}
                </view>
              </view>
            </view>
          </view>
          <!--order-mid end-->
          <!--order-bd start-->
          <view class="order-bd">
            <button class="order-btn gray" v-if="item.status=='-2'||item.status=='-1'||item.status=='4'" @click.stop="onDelClick(item)">{{$t('user.refund.scdd')}}</button>
            <button class="order-btn" v-if="item.status==0">{{$t('user.refund.shz')}}</button>
          </view>
          <!--order-bd end-->
        </view>
        <!--order-li end-->
      </view>
      <view v-else class="zanwusju">
        <image src="/static/images/zanwusju.png" />
        <view class="title">~{{$t('home.zanwushuju')}}~</view>
      </view>
    </view>
    <!-- 竞拍订单order-box end-->
    <!--删除订单弹出 start-->
    <uni-popup ref="popup1" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-c">
            <text class="f-32">{{$t('user.refund.qdysccddm')}}</text>
          </view>
          <view class="pop-b">
            <button class="pop-btn" @click="toggle1Close">{{$t('user.refund.query')}}</button>
            <button class="pop-btn red" @click="onAfterDeleteOrder">{{$t('user.refund.btnsub')}}</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--删除订单弹出 start-->
  </view>
</template>

<script>
export default {
  data () {
    return {
      page: 1,
      pagenum: 10,
      buy_type: 1,// 1普通订单，2拼团订单，3竞拍订单
      AfterList: [],// 列表
      delId: '',// id
      isShopCont: false,// 商品详情显示中文还是英文
    }
  },
  onShow () {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    this.page = 1
    this.AfterList = []
    this.onAfterList()
  },
  methods: {
    onNavClick (id) {
      this.buy_type = id
      this.page = 1
      this.AfterList = []
      this.onAfterList()
    },
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
    onAfterList () {
      this.$http.post(this.$apiObj.AfterList, { page: this.page, pagenum: this.pagenum, buy_type: this.buy_type }).then(res => {
        if (res.code == 1) {
          if (this.isShopCont) {
            res.data.data.map(item => {
              item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(item.goods_name, 1) : item.goods_name
              item.goods_attrs = this.getCaption(item.goods_attrs, 1) ? this.getCaption(item.goods_attrs, 1) : item.goods_attrs
            })
          } else {
            res.data.data.map(item => {
              item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(item.goods_name, 0) : item.goods_name
              item.goods_attrs = this.getCaption(item.goods_attrs, 0) ? this.getCaption(item.goods_attrs, 0) : item.goods_attrs
            })
          }
          this.totalPageNum = res.data.total
          this.AfterList = this.page == 1 ? res.data.data : [...this.AfterList, ...res.data.data]
        }
      })
    },
    // 点击删除
    onDelClick (item) {
      this.delId = item.id
      this.$refs.popup1.open()
    },
    // 取消删除订单
    toggle1Close () {
      this.$refs.popup1.close()
    },
    // 删除订单数据
    onAfterDeleteOrder () {
      this.$http.post(this.$apiObj.AfterDeleteOrder, { after_id: this.delId }).then(res => {
        if (res.code == 1) {
          this.$refs.popup1.close()
          uni.showToast({ icon: 'none', title: this.$t('user.refund.sccg') })
          this.onAfterList()
        }
      })
    },
    //导航点击的跳转处理函数
    navClick (id) {
      uni.navigateTo({
        url: './detail?id=' + id
      })
    },
  }
}
</script>

<style lang="less" scoped>
page {
  background: #f9f9f9;
}
.order-page {
  //order-tab S
  .order-tab {
    display: flex;
    background: #fff;
    padding: 0 30rpx;
    height: 90rpx;
    background: #ffffff;
    text-align: center;
    .li {
      width: 33.333%;
      font-size: 26rpx;
      position: relative;
      line-height: 90rpx;
    }
    .active {
      color: #fc0609;
    }
    .active::after {
      height: 2rpx;
      background: #fc0609;
      display: block;
      width: 100%;
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
    }
  }
  //order-tab E
  //order-box S
  .order-box {
    margin: 0 30rpx;
    .order-nav {
      display: flex;
      justify-content: space-between;
      padding: 30rpx 0 40rpx 0;
      .li {
        font-size: 26rpx;
        position: relative;
        line-height: 1;
      }
      .active {
        font-weight: 550;
        color: #fc0609;
      }
      .active::after {
        width: 50rpx;
        height: 6rpx;
        background: #fc0609;
        border-radius: 3rpx;
        display: block;
        content: "";
        position: absolute;
        left: 50%;
        bottom: -28rpx;
        margin-left: -25rpx;
      }
    }
    //order-li S
    .order-li {
      background: #ffffff;
      border-radius: 20rpx;
      margin: 20rpx 0;
      .li-hd {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f5f5f5;
        padding: 25rpx 30rpx;
        .hd-fl {
          display: inline-flex;
          align-items: center;
          font-size: 28rpx;
          flex: 1;
          width: calc(100% - 180rpx);
          margin-right: 20rpx;
          .icon {
            width: 26rpx;
            height: 26rpx;
            min-width: 26rpx;
            max-width: 26rpx;
            margin-right: 15rpx;
          }
          .name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .status {
          color: #fc0609;
          white-space: nowrap;
        }
        .status.gray {
          color: #999;
        }
      }
      .order-mid {
        display: flex;
        padding: 30rpx;
        .mid-img {
          width: 130rpx;
          height: 130rpx;
          border-radius: 10rpx;
          overflow: hidden;
          margin-right: 20rpx;
          min-width: 130rpx;
          max-width: 130rpx;
        }
        .mid-txt {
          .h-flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
            line-height: 36rpx;
            .t {
              font-size: 26rpx;
              line-height: 36rpx;
            }
            .num {
              font-size: 24rpx;
              color: #999;
              white-space: nowrap;
              margin-left: 20rpx;
            }
          }
          .b-flex {
            margin-top: 20rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .s {
              font-size: 24rpx;
              color: #999;
            }
            .price {
              font-size: 22rpx;
              color: #fc0609;
            }
          }
        }
      }
      .order-bd {
        padding: 0 30rpx 30rpx 30rpx;
        display: flex;
        justify-content: flex-end;
        .order-btn {
          width: 140rpx;
          height: 50rpx;
          border: 1px solid #fc0609;
          border-radius: 25rpx;
          margin: 0 0 0 20rpx;
          line-height: 50rpx;
          font-size: 22rpx;
          color: #fc0609;
          padding: 0;
        }
        .order-btn.gray {
          border-color: #999999;
          color: #999999;
        }
      }
    }
    //order-li E
  }
  //order-box E
}
.mid-txt {
  width: 600rpx;
}
</style>
