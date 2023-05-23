<template>
  <view class="wallet-page">
    <Headers>
      <template v-slot:header>
        <view class="header" style="color:#fff;"> {{$t('top.wdqb')}} </view>
      </template>
      <template v-slot:right>
        <view class="queryCont" @click="onQuery" style="color:#fff;margin-right:20rpx;">{{$t('top.yhklb')}}</view>
      </template>
    </Headers>
    <!--wallet-head start-->
    <view class="wallet-head">
      <view class="head-card">
        <view class="t">{{$t('user.wallet.zhje')}}</view>
        <view class="money">{{money}}</view>
        <view class="cont">
          <view class="t">{{$t('user.wallet.ktxje')}}</view>
          <view class="money">{{tocash_money}}</view>
        </view>
      </view>
      <view class="head-ul">
        <view class="li" @click="navClick('recharge')">
          <view class="icon">
            <image class="img" src="../../static/images/wallet1.png"></image>
          </view>
          <text>{{$t('user.wallet.chongzhi')}}</text>
        </view>
        <view class="li" @click="navClick('Withdrawal')">
          <view class="icon">
            <image class="img" src="../../static/images/wallet2.png"></image>
          </view>
          <text>{{$t('user.wallet.tixian')}}</text>
        </view>
      </view>
    </view>
    <!--wallet-head end-->
    <!--wallet-box start-->
    <view class="wallet-box">
      <view class="wallet-t">
        <view class="list" :class="navId===1?'active':''" @click="onNavClick(1)">{{$t('user.wallet.shouzhijilu')}}
          <view class="xian"></view>
        </view>
        <view class="list" :class="navId===2?'active':''" @click="onNavClick(2)">{{$t('tixianjilu')}}
          <view class="xian"></view>
        </view>
      </view>
      <view class="wallet-ul" v-if="navId===1">
        <view class="li" v-for="item in MoneyList" :key="item.id">
          <view class="li-fl">
            <view class="t">{{item.memo}}</view>
            <view class="c">{{$filter.to_date_time(item.addtime)}}</view>
          </view>
          <view class="num color-red"><text class="f-34">{{item.money}}</text></view>
        </view>
      </view>
      <view class="wallet-ul" v-if="navId===2">
        <view class="li active" v-for="item in MoneyList" :key="item.id">
          <view class="head">
            <view class="li-fl">
              <view class="t">{{item.memo}}
                <view v-if="item.status==0" class="lis js">{{$t('jsz')}}</view>
                <view v-if="item.status==1" class="lis yjs">{{$t('yijs')}}</view>
                <view v-if="item.status=='-1'" class="lis yjj">{{$t('yijj')}}</view>
              </view>
              <view class="c">{{$filter.to_date_time(item.addtime)}}</view>
            </view>
            <view class="num color-red"><text class="f-34">{{item.money}}</text></view>
          </view>
          <view class="shhjg">{{$t('shhjg')}}：{{item.reason}}</view>
          <view class="imgs">
            <image v-for="items,i in item.images" :key="i" class="img" :src="items" mode="scaleToFill" />
          </view>
        </view>
      </view>
    </view>
    <!--wallet-box end-->
  </view>
</template>

<script>
import md5 from 'js-md5';
import $ from '@/common/jquery-3.6.1.min.js'
import Headers from '@/components/navHeaders'
export default {
  components: { Headers },
  data () {
    return {
      money: 0,// 账户余额
      tocash_money: 0,// 可提现金额
      page: 1,// 页码
      pagenum: 6,// 每页显示商品数目
      totalPageNum: 0,// 总条数
      MoneyList: [],
      navId: 1,
    }
  },
  onShow () {
    this.page = 1
    this.MoneyList = []
    // 获取个人信息
    this.$http.post(this.$apiObj.MineInfo).then(res => {
      if (res.code == 1) {
        this.money = res.data.money
        this.tocash_money = res.data.tocash_money
      }
    })
    this.onMineMoneyList()
  },
  methods: {

    onNavClick (e) {
      this.page = 1
      this.MoneyList = []
      this.navId = e
      if (e === 1) {
        this.onMineMoneyList()
      } else {
        this.onRechargeTocashList()
      }
    },
    onMineMoneyList () {
      let isShopCont = uni.getStorageSync('locale') == 'en' ? true : false// 中文还是英文

      this.$http.post(this.$apiObj.MineMoneyList, { page: this.page, pagenum: this.pagenum }).then(res => {
        if (res.code == 1) {
          res.data.data.map(item => {
            let zhStr = item.memo
            let appid = '20220914001342711'
            let userkey = 'QzytrtrDkXeAeaEp_yW3'
            let salt = (new Date).getTime()
            const str = `${appid}${zhStr}${salt}${userkey}`;
            const sign = md5(str);/* md5加密，生成签名 */
            const params = { q: zhStr, from: 'zh', to: 'en', appid: appid, sign, salt: salt }

            //#ifdef H5
            // console.log($, "======uni-app的H5模式引入JQuery=====");
            if (isShopCont) {
              $.ajax({
                url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
                type: 'get',
                dataType: 'jsonp',
                data: params,
                success: function (data) {
                  item.memo = data.trans_result[0].dst
                }
              });
            }
            //#endif
            // #ifdef APP-PLUS
            if (isShopCont) {
              uni.request({
                url: 'https://api.fanyi.baidu.com/api/trans/vip/translate', //仅为示例，并非真实接口地址。
                data: params,
                header: {
                  'custom-header': 'hello' //自定义请求头信息
                },
                success: (res) => {
                  item.memo = res.data.trans_result[0].dst
                }
              });
            }
            // #endif
          })
          this.totalPageNum = res.data.total
          this.MoneyList = this.page == 1 ? res.data.data : [...this.MoneyList, ...res.data.data]
        }
      })
    },
    onRechargeTocashList () {
      let isShopCont = uni.getStorageSync('locale') == 'en' ? true : false// 中文还是英文

      this.$http.post(this.$apiObj.RechargeTocashList, { page: this.page, pagenum: this.pagenum }).then(res => {
        if (res.code == 1) {
          res.data.data.map(item => {
            let zhStr = item.memo
            let appid = '20220914001342711'
            let userkey = 'QzytrtrDkXeAeaEp_yW3'
            let salt = (new Date).getTime()
            const str = `${appid}${zhStr}${salt}${userkey}`;
            const sign = md5(str);/* md5加密，生成签名 */
            const params = { q: zhStr, from: 'zh', to: 'en', appid: appid, sign, salt: salt }

            //#ifdef H5
            // console.log($, "======uni-app的H5模式引入JQuery=====");
            if (isShopCont) {
              $.ajax({
                url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
                type: 'get',
                dataType: 'jsonp',
                data: params,
                success: function (data) {
                  item.memo = data.trans_result[0].dst
                }
              });
            }
            //#endif
            // #ifdef APP-PLUS
            if (isShopCont) {
              uni.request({
                url: 'https://api.fanyi.baidu.com/api/trans/vip/translate', //仅为示例，并非真实接口地址。
                data: params,
                header: {
                  'custom-header': 'hello' //自定义请求头信息
                },
                success: (res) => {
                  item.memo = res.data.trans_result[0].dst
                }
              });
            }
            // #endif
          })
          this.totalPageNum = res.data.total
          this.MoneyList = this.page == 1 ? res.data.data : [...this.MoneyList, ...res.data.data]
        }
      })
    },
    //导航点击的跳转处理函数
    navClick (url) {
      uni.navigateTo({
        url
      })
    },
    onQuery () {
      uni.navigateTo({
        url: './bank'
      })
    }
  },
  // 点击银行卡列表
  onNavigationBarButtonTap: function () {
    uni.navigateTo({
      url: './bank'
    })
  },
  // 页面滑动到底部
  onReachBottom () {
    // 判断是否还有数据
    if (this.totalPageNum <= this.page * this.pagenum) return
    this.page++
    this.onMineMoneyList()
  }
}
</script>

<style lang="less" scoped>
.wallet-page {
  //wallet-head S
  .wallet-head {
    background: #f9f9f9;
    border-radius: 25rpx;
    margin: 36rpx 30rpx;
    overflow: hidden;
    .head-card {
      background: linear-gradient(205.24deg, rgba(255,78,47,1.00) 0.523%,rgba(255,216,68,1.00) 101.333%);
      height: 320rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      color: #fff;
      text-align: center;
      flex-direction: column;
      .cont {
        position: absolute;
        bottom: 20rpx;
        right: 30rpx;
        display: flex;
        color: #fff;
        text-align: center;
        .t {
          font-size: 26rpx;
        }
        .money {
          font-size: 26rpx;
          margin-top: 0;
          margin-left: 20rpx;
        }
      }
      .t {
        font-size: 32rpx;
      }
      .money {
        font-size: 76rpx;
        font-weight: 600;
        margin-top: 30rpx;
      }
    }
    .head-ul {
      padding: 40rpx 30rpx;
      display: flex;
      .li {
        text-align: center;
        display: flex;
        width: 50%;
        align-items: center;
        justify-content: center;
        font-size: 28rpx;
        font-weight: 550;
        .icon {
          width: 44rpx;
          height: 44rpx;
          min-width: 44rpx;
          margin-right: 20rpx;
        }
      }
    }
  }
  //wallet-head E
  .wallet-box {
    margin: 40rpx 30rpx;
    .wallet-t {
      margin: 0 130rpx;
      font-size: 28rpx;
      // font-weight: 550;
      display: flex;
      justify-content: space-between;
      .list {
        color: #999;
        .xian {
          width: 112rpx;
          height: 2rpx;
          background: #fff;
          margin-top: 10rpx;
        }
        &.active {
          color: #000;
          .xian {
            background: #000;
          }
        }
      }
    }
    .wallet-ul {
      margin-top: 30rpx;
      .li {
        background: #ffffff;
        box-shadow: 0px 0px 20rpx 0px rgba(153, 153, 153, 0.1);
        border-radius: 20rpx;
        margin: 20rpx 0;
        padding: 35rpx 36rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &.active {
          display: block;
          .head {
            display: flex;
            justify-content: space-between;
            .li-fl {
              .t {
                display: flex;
                align-items: center;
                .lis {
                  // width: 78rpx;
                  height: 40rpx;
                  line-height: 40rpx;
                  border-radius: 6rpx;
                  padding: 0 10rpx;
                  font-size: 22rpx;
                  color: #fff;
                  margin-left: 10rpx;
                  &.js {
                    background: #ffa115;
                  }
                  &.yjs {
                    background: #25cd21;
                  }
                  &.yjj {
                    background: #fc0609;
                  }
                }
              }
              .c {
              }
            }
          }
          .shhjg {
            margin-top: 25rpx;
            font-size: 24rpx;
            color: #808080;
          }
          .imgs {
            margin-top: 20rpx;
            display: flex;
            flex-wrap: wrap;
            .img {
              width: 144rpx;
              height: 144rpx;
            }
          }
        }
        .t {
          font-size: 28rpx;
        }
        .c {
          color: #999;
          margin-top: 20rpx;
        }
        .num {
          font-size: 28rpx;
          font-weight: 600;
        }
      }
    }
  }
}
</style>