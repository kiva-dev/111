<template>
  <view class="sub-page">
    <!--sub-head start-->
    <view class="sub-head" @click="navClick('/pages/address/address')">
      <view class="head-fl" v-if="addCont">
        <view class="icon">
          <image class="img" src="../../static/images/submit1.png"></image>
        </view>
        <view class="txt">
          <view class="t">{{addCont.detail}}</view>
          <view class="b">
            <text class="name">{{addCont.name}}</text>
            <text class="phone">{{addCont.mobile.slice(0, 3)}}****{{addCont.mobile.substr(-4)}}</text>
          </view>
        </view>
      </view>
      <view class="head-fl" v-else>
        <view class="icon">
          <image class="img" src="../../static/images/submit1.png"></image>
        </view>
        <view class="txt">
          <view class="t">{{$t('order.addContXuanze')}}</view>
        </view>
      </view>
      <view class="more">
        <image class="img" src="../../static/images/more2.png"></image>
      </view>
    </view>
    <!--sub-head end-->
    <!--商品列表 start-->
    <view v-for="item in OrderList" :key="item.admin_id" class="sub-box">
      <view class="li-hd">
        <view class="icon">
          <image class="img" src="../../static/images/index/dianpu.png"></image>
        </view>
        <view class="t">{{item.shop_name}}</view>
        <view class="more">
          <image class="img" src="../../static/images/index/more.png"></image>
        </view>
      </view>
      <!--li-item start-->
      <view class="li-item" v-for="items,k in item.list" :key="k">
        <view class="li-img">
          <image class="img" :src="items.image"></image>
        </view>
        <view class="li-txt">
          <view class="t">{{items.good_name}}</view>
          <view class="specs">
            <text class="c">{{items.goods_attrs}}</text>
            <!-- <text class="c" @click="toggle('bottom')">
              <block v-for="(i,index) in items.attrs" :key="{index}">
                {{i}}
              </block>
            </text>
            <view class="icon">
              <image class="img" src="../../static/images/down1.png"></image>
            </view> -->
          </view>
          <view class="b">
            <view class="price">
              RM<text class="f-34">{{items.price}}</text>
            </view>
            <view class="cart-num">
              <!-- <button class="num-btn" @click="onJian(items)">-</button>
              <input class="num-input" v-model="items.num" disabled />
              <button class="num-btn" @click="onJia(items)">+</button> -->
            </view>
          </view>
        </view>
      </view>
      <!--li-item end-->
      <!--li-leave start-->
      <view class="li-leave">
        <view class="t">{{$t('order.liuyan')}}</view>
        <view class="c"><input type="text" v-model="item.remark" :placeholder="$t('order.liuyanxuantian')"></view>
      </view>
      <!--li-leave end-->
      <!--li-freight start-->
      <!-- <view class="li-freight">
        <view class="t">运费</view>
        <view class="c">免运费</view>
      </view> -->
      <!--li-freight end-->
    </view>
    <!--商品列表 end-->
    <!--sub-bot start-->
    <view class="sub-bot">
      <view class="bot-li">
        <view class="t">{{$t('order.shangpinjiner')}}</view>
        <view class="li-r f-22">
          RM<text class="f-26">{{totalNum}}</text>
        </view>
      </view>
      <!-- <view class="bot-li">
        <view class="t">运费</view>
        <view class="li-r f-22">免运费
          RM<text class="f-26">36.00</text>
        </view>
      </view> -->
      <view class="bot-li">
        <view class="t">{{$t('order.yhq')}}</view>
        <view class="li-r f-22 color-red" @click="onCouponPopupClick">
          <view>RM<text class="f-26">{{coupon_num}}</text></view>
          <view class="more">
            <image class="img" src="../../static/images/more3.png"></image>
          </view>
        </view>
      </view>
      <view class="bot-end">
        <text class="color-999 f-26">{{$t('order.gong')}}{{num}}{{$t('order.jian')}}</text>
        <text class="f-28">{{$t('order.xiaoji')}}：</text>
        <text class="color-red f-22">RM<text class="f-28">{{$filter.formatValue(total, 'split')[0]}}</text>.{{$filter.formatValue(total, 'split')[1] ? $filter.formatValue(total, 'split')[1] : '00'}}</text>
      </view>
    </view>
    <!--sub-bot end-->
    <!--sub-bot start-->
    <view class="sub-bot">
      <view class="bot-li" @click="toggle1('bottom')">
        <view class="t">{{$t('order.zhifufangshi')}}</view>
        <view class="li-r">
          <view class="f-28" v-if="orderCont==1">
            {{$t('order.yezfkyye')}}
            <text class="color-red">RM{{userCont.money}}</text>
            ）
          </view>
          <view class="f-28" v-else-if="orderCont==2">{{$t('order.dsfzf')}}</view>
          <view class="f-28" v-else>{{$t('order.qxzzffs')}}</view>
          <view class="more">
            <image class="img" src="../../static/images/more3.png"></image>
          </view>
        </view>
      </view>

    </view>
    <!--sub-bot end-->
    <!--sub-fixed start-->
    <view class="sub-fixed">
      <view class="fixed-con">
        <view class="t">{{$t('order.heji')}}：<text class="color-red f-bold">RM<text class="f-28">{{$filter.formatValue(total, 'split')[0]}}</text>.{{$filter.formatValue(total, 'split')[1] ? $filter.formatValue(total, 'split')[1] : '00'}}
          </text></view>
        <!-- <button class="pay-btn" @click="toggle2('center')">立即支付</button> -->
        <button class="pay-btn" @click.stop="$noMultipleClicks(onOrderReferCartOrder)">{{$t('order.ljizhifu')}}</button>
      </view>
    </view>
    <!--sub-fixed end-->
    <!--优惠券选择弹出 start-->
    <uni-popup ref="CouponPopup" type="bottom">
      <view class="you-pop">
        <view class="you-head">
          <view class="cancel" @click="onCouponPopupQuery">{{$t('order.query')}}</view>
          <view class="t">{{$t('order.xuanzeyhq')}}</view>
          <view class="define" @click="onCouponBtn">{{$t('order.btnsub')}}</view>
        </view>
        <!--you-ul start-->
        <view class="you-ul">
          <view v-for="item in MineCouponList" :key="item.id" class="li">
            <view class="li-bg">
              <image class="img" src="../../static/images/y1.png"></image>
            </view>
            <view class="li-fl">
              <view class="li-t f-28 color-red">RM<text class="f-46">{{$filter.formatValue(item.money, 'split')[0]}}</text>.{{$filter.formatValue(item.money, 'split')[1] ? $filter.formatValue(item.money, 'split')[1] : '00'}}</view>
              <view class="li-c">
                <view class="c">{{$t('order.man')}}{{item.use_limit}}{{$t('order.keyong')}}</view>
              </view>
            </view>
            <view class="li-fr">
              <view class="li-t flex flex-between flex-center" @click="oncheckbox(item)">
                <text>{{$t('order.yhq')}}</text>
                <image v-if="item.isShow" src="../../static/images/mine/radio2.png" mode="" />
                <image v-else src="../../static/images/mine/radio1.png" mode="" />
              </view>
              <view class="li-line"></view>
              <view class="li-c">
                <view class="date">{{$t('order.yxqz')}} {{item.end_time}}</view>
              </view>
            </view>
          </view>
        </view>
        <!--you-ul end-->
      </view>
    </uni-popup>
    <!--优惠券选择弹出 end-->
    <!--支付方式弹出 start-->
    <uni-popup ref="popup1">
      <view class="mode-pop">
        <view class="mode-tit">
          <text>{{$t('order.xzzffs')}}</text>
          <view class="cancel" @click="toggle1Close">{{$t('order.query')}}</view>
        </view>
        <view v-for="item,k in orderPayList" :key="item.id" class="mode-li">
          <view class="label">
            {{item.title}} <block v-if="item.id==1">（{{$t('order.kyye')}}<text class="color-red">RM{{userCont.money}}</text>）</block>
          </view>
          <view class="li-fr" @click="onQuanClick(item,k)">
            <radio :checked="item.isShow?true:false" value="r1" />
          </view>
        </view>
        <!-- <view class="mode-li">
          <view class="label">
            余额支付（可用余额<text class="color-red">RM{{userCont.money}}</text>）
          </view>
          <view class="li-fr">
            <radio checked="true" value="r1" />
          </view>
        </view>
        <view class="mode-li">
          <view class="label">
            银联支付（5555****542）
          </view>
          <view class="li-fr">
            <text class="color-red">更换银行卡</text>
            <radio value="r2" />
          </view>
        </view>
        <view class="mode-li">
          <view class="label">
            PayPal支付（555k***456）
          </view>
          <view class="li-fr">
            <radio value="r3" />
          </view>
        </view> -->
        <view class="mode-bot">
          <button class="public-btn" @click="toggle1Close">{{$t('order.btnsub')}}</button>
        </view>
      </view>
    </uni-popup>
    <!--支付方式弹出 end-->
    <!--支付密码弹出 start-->
    <uni-popup ref="pwdPopup" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-t">
            <text>{{$t('order.qsrzfmm')}}</text>
            <view class="pay-close" @click="onPwdQuery">
              <image class="img" src="../../static/images/close1.png"></image>
            </view>
          </view>
          <view class="pop-c">
            <view class="pay-input">
              <input class="input" type="password" placeholder-class="color-999" v-model="pay_pwd" :placeholder="$t('order.qsrzfmm')" />
            </view>
          </view>
          <view class="pay-bot">
            <button class="pay-btn" @click="onPwdClick">{{$t('order.btnsub')}}</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--支付密码弹出 end-->
  </view>
</template>

<script>
import jsencrypt from '@/common/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
//公钥.
const publiukey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSjs8JJr/Nyb+nOG77agUDf7uT
c+kswdVEXbU8v5EL98brAw7fu4dQc1vkh1KSXqiC9EC7YmJzkkFoXUzTH2pvvDlq
UuCwtdmXOsq/b1JWKyEXzQlPIiwdHnAUjGbmHOEMAY3jKEy2dY2I6J+giJqo8B2H
NoR+zv3KaEmPSHtooQIDAQAB
-----END PUBLIC KEY-----`
export default {
  components: {},
  data () {
    return {
      noClick: true, // 防止重复点击 
      userCont: '',// 用户信息
      address_id: '',// 地址id
      addCont: '',// 收货地址
      OrderList: [],// 订单列表
      total: 0,// 合计
      totalNum: 0,// 商品价格
      MineCouponList: [],// 优惠券列表
      coupon_id: '',// 选中优惠券id
      coupon_num: 0.00,// 选中优惠券值
      num: 0,// 总共几件
      cart_ids: '',// 选中id
      major_no: '',// 订单号
      order_no: '',// 小订单号
      pay_pwd: '',// 支付密码
      use_limit: 0,// 优惠券满足条件
      orderPayList: [{ id: 1, title: this.$t('order.yezf'), isShow: false }, { id: 2, title: this.$t('order.sfzf'), isShow: false },],
      orderCont: '',
      isShopCont: false,// 中文还是英文
      set_paypwd: '',
      MineCont: {}
    }
  },
  watch: {
    total: {
      handler (e, m) {
        if (e < 10) {
          this.orderPayList = [{ id: 1, title: this.$t('auction.detail.yuerzhifu'), isShow: false }]
        } else {
          this.orderPayList = [{ id: 1, title: this.$t('auction.detail.yuerzhifu'), isShow: false }, { id: 2, title: this.$t('auction.detail.sfzfu'), isShow: false }]
        }
      }
    },
  },
  onLoad (e) {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    this.cart_ids = e.cart_ids
    // 获取购物车里面的订单列表
    this.onOrderConfirmCartOrder()
    // 获取优惠券
    this.onMineCouponList()
  },
  onShow () {
    this.onAddressList()
    this.onMineInfo()

    if (uni.getStorageSync('token')) {
      // 实名认证
      this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
        if (res.code == 1) {
          this.MineCont = res.data
        }
      })
      // 判断是否设置支付密码
      this.$http.post(this.$apiObj.MineInfo).then(res => {
        if (res.code == 1) {
          this.set_paypwd = res.data.set_paypwd
        }
      })
    }
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
    onMineInfo () {
      this.$http.post(this.$apiObj.MineInfo).then(res => {
        if (res.code == 1) {
          this.userCont = res.data
        }
      })
    },
    onQuanClick (item, k) {
      if (item.id == 1 && this.set_paypwd != '1') return uni.navigateTo({ url: "../mine/setPassword" })
      for (let i in this.orderPayList) {
        this.orderPayList[i].isShow = false
      }
      item.isShow = true
      this.orderCont = k + 1
    },
    // 收货地址
    onAddressList () {
      this.$http.post(this.$apiObj.AddressList, { page: 1, pagenum: 1000 }).then(res => {
        if (res.code == 1) {
          for (let i in res.data.data) {
            if (res.data.data[i].is_default == 1) {
              this.addCont = res.data.data[i]
              this.address_id = res.data.data[i].id
            }
          }
        }
      })
    },
    // 获取购物车里面的订单列表
    onOrderConfirmCartOrder () {
      this.$http.post(this.$apiObj.OrderConfirmCartOrder, { cart_ids: this.cart_ids }).then(res => {
        if (res.code == 1) {
          if (this.isShopCont) {
            res.data.cartdata.map(item => {
              item.list.map(items => {
                items.good_name = this.getCaption(items.good_name, 1) ? this.getCaption(items.good_name, 1) : items.good_name
              })
            })
          } else {
            res.data.cartdata.map(item => {
              item.list.map(items => {
                items.good_name = this.getCaption(items.good_name, 0) ? this.getCaption(items.good_name, 1) : items.good_name
              })
            })
          }
          res.data.cartdata.map(item => {
            item.remark = ''
          })
          this.OrderList = res.data.cartdata
          let num = 0
          for (let i in this.OrderList) {
            for (let j in this.OrderList[i].list) {
              num++
            }
          }
          this.num = num
          this.total = res.data.total
          this.totalNum = res.data.total
        }
      })
    },
    // 点击减
    onJian (items) {
      if (items.num == 1) return
      let num = items.num - 1
      this.onCartEdit(num, items)
    },
    // 点击加
    onJia (items) {
      if (items.num == items.stock_num) return
      let num = items.num + 1
      this.onCartEdit(num, items)
    },
    // 修改购物车数量
    onCartEdit (num, items) {
      this.$http.post(this.$apiObj.CartEdit, { goods_spec_id: items.goods_spec_id, num: num, cart_id: items.cart_id }).then(res => {
        if (res.code == 1) {
          items.num = num
          this.onOrderConfirmCartOrder()
        }
      })
    },
    // 获取优惠券
    onMineCouponList () {
      this.$http.post(this.$apiObj.MineCouponList, { type: 1, page: 1, pagenum: 100 }).then(res => {
        if (res.code == 1) {
          res.data.data.map(item => {
            item.isShow = false
          })
          this.MineCouponList = res.data.data
        }
      })
    },
    // 点击选择优惠券
    oncheckbox (item) {
      if (Number(item.use_limit) > this.totalNum) {
        item.isShow = false
        uni.showToast({ icon: 'none', title: this.$t('order.cyhqbny') })
        return
      }
      this.MineCouponList.map(items => {
        items.isShow = false
      })
      item.isShow = true
      this.coupon_id = item.id
      this.coupon_num = item.money
      this.use_limit = item.use_limit
      this.total = this.totalNum - this.coupon_num
    },
    // 点击优惠券确定按钮
    onCouponBtn () {
      this.$refs.CouponPopup.close()
    },
    // 购物车提交订单
    onOrderReferCartOrder () {
      if (!this.addCont) return uni.showToast({ icon: 'none', title: this.$t('order.addContXuanze') })
      let isNum
      for (let i in this.orderPayList) {
        if (this.orderPayList[i].isShow) {
          isNum = this.orderPayList[i].id
        }
      }
      if (!isNum) return uni.showToast({ icon: 'none', title: this.$t('order.qxzzffs') })
      this.$http.post(this.$apiObj.OrderReferCartOrder, { data: JSON.stringify(this.OrderList), address_id: this.address_id, coupon_id: this.coupon_id }).then(res => {
        if (res.code == 1) {
          this.major_no = res.data.major_no
          this.order_no = res.data.order_no
          if (isNum == 1) {
            // 余额支付弹框
            this.$refs.pwdPopup.open()
          } else if (isNum == 2) {
            if (this.MineCont === null) return uni.showToast({ icon: 'none', title: this.$t('smrz') })
            if (this.MineCont.status == 0) return uni.showToast({ icon: 'none', title: this.$t('smrzshh') })
            if (this.MineCont.status == '-1') return uni.showToast({ icon: 'none', title: this.$t('smrzwtg') })
            // 3方支付
            this.$http.post(this.$apiObj.OrderMalaysiaPay, { order_no: res.data.major_no ? res.data.major_no : res.data.order_no, money: this.total }).then(res => {
              if (res.code == 1) {
                const formStr = `<form action="${res.data.action_url}" method="POST" >
                        <input name="MerchantCode" value="${res.data.MerchantCode}">
                        <input name="TransNum" value="${res.data.TransNum}">
                        <input name="Currency" value="${res.data.Currency}">
                        <input name="Amount" value="${res.data.Amount}">
                        <input name="PaymentDesc" value="${res.data.PaymentDesc}">
                        <input name="FirstName" value="${res.data.FirstName}">
                        <input name="LastName" value="${res.data.LastName}">
                        <input name="EmailAddress" value="${res.data.EmailAddress}">
                        <input name="PhoneNum" value="${res.data.PhoneNum}">
                        <input name="Address" value="${res.data.Address}">
                        <input name="City" value="${res.data.City}">
                        <input name="State" value="${res.data.State}">
                        <input name="Country" value="${res.data.Country}">
                        <input name="Postcode" value="${res.data.Postcode}">
                        <input name="MerchantRemark" value="${res.data.MerchantRemark}">
                        <input name="Signature" value="${res.data.Signature}">
                      </form>`
                // #ifdef H5
                const div = document.createElement('div')
                div.innerHTML = formStr
                div.setAttribute('style', 'position: absolute; width: 0; height: 0; overflow: hidden;')
                const form = div.querySelector('form')
                document.body.appendChild(div)
                form.submit()
                document.body.removeChild(div)
                //  #endif
                // #ifdef APP-PLUS  
                uni.navigateTo({
                  url: '/pages/mine/webview?url=' + formStr
                });
                //  #endif
              }
            })
          }
        }
      })
    },
    // 关闭支付密码
    onPwdQuery () {
      this.$refs.pwdPopup.close()
      uni.showToast({ title: this.$t('order.nyqxddzf'), icon: 'none' })
      setTimeout(() => {
        uni.navigateBack({ delta: 1 })
      }, 2000);
    },
    // 点击支付密码
    onPwdClick () {
      if (!this.pay_pwd) return uni.showToast({ title: this.$t('order.qsrmm'), icon: 'none' })
      const pay_pwd = jsencrypt.setEncrypt(publiukey, String(this.pay_pwd))
      this.$http.post(this.$apiObj.OrderBalancePay, {
        major_no: this.major_no,// 购物车支付的主订单号
        order_no: this.order_no,// 小订单号
        money: this.total,// 支付总金额
        pay_pwd: pay_pwd,// rsa加密后的支付密码
      }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('order.zfcg'), icon: 'none' })
          this.$refs.pwdPopup.close()
          uni.navigateTo({
            url: '/pages/mine/order/order'
          })
          // pages/index/Psuccess
        }
      })
    },
    //导航点击的跳转处理函数
    navClick (url) {
      uni.navigateTo({
        url
      })
    },
    toggle1 (type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup1.open(type)
    },
    toggle1Close (type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup1.close(type)
    },
    toggle2 (type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup2.open(type)
    },
    toggle2Close (type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup2.close(type)
    },
    // 点击显示优惠券
    onCouponPopupClick () {
      if (this.MineCouponList.length == 0) return
      this.$refs.CouponPopup.open()
    },
    // 点击隐藏优惠券
    onCouponPopupQuery () {
      this.MineCouponList.map(item => {
        item.isShow = false
      })
      this.coupon_id = ''
      this.coupon_num = 0.00
      this.$refs.CouponPopup.close()
    }
  }
}
</script>
<style lang="less" scoped>
page {
  background: #f9f9f9;
}
.sub-page {
  padding-bottom: 100rpx;
  .sub-head {
    background: #fff;
    padding: 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .head-fl {
      display: flex;
      align-items: center;
      .icon {
        width: 73rpx;
        height: 73rpx;
        min-width: 73rpx;
        margin-right: 35rpx;
      }
      .txt {
        .t {
          font-size: 26rpx;
        }
        .c {
          font-size: 28rpx;
          margin: 10rpx 0;
        }
        .b {
          display: flex;
          white-space: nowrap;
          .name {
            font-size: 28rpx;
            margin-right: 20rpx;
          }
          .phone {
            font-size: 26rpx;
            color: #999;
          }
        }
      }
    }
    .more {
      width: 16rpx;
      height: 32rpx;
      min-width: 16rpx;
      margin-left: 20rpx;
    }
  }
  .sub-box {
    margin: 20rpx 0;
    background: #fff;
    border-radius: 30rpx;
    padding: 20rpx 30rpx;
    .li-hd {
      display: flex;
      align-items: center;
      position: relative;
      .icon {
        width: 26rpx;
        height: 26rpx;
        margin-right: 15rpx;
        min-width: 26rpx;
      }
      .t {
        font-size: 26rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .more {
        width: 10rpx;
        height: 18rpx;
        min-width: 10rpx;
        margin-left: 15rpx;
      }
    }
    .li-item {
      margin: 36rpx 0;
      display: flex;
      position: relative;
      .li-img {
        // background: #fc5917;
        border-radius: 10rpx;
        width: 175rpx;
        height: 175rpx;
        min-width: 175rpx;
        margin-right: 20rpx;
      }
      .li-txt {
        width: 100%;
        .t {
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size: 28rpx;
          line-height: 34rpx;
        }
        .specs {
          display: inline-flex;
          align-items: center;
          height: 43rpx;
          border-radius: 10rpx;
          align-items: center;
          padding: 0 10rpx;
          line-height: 43rpx;
          margin: 15rpx 0 20rpx 0;
          .c {
            font-size: 24rpx;
            color: #999;
          }
          .icon {
            width: 14rpx;
            height: 14rpx;
            margin-left: 10rpx;
            min-width: 14rpx;
          }
        }
        .b {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .cart-num {
            display: flex;
            align-items: center;
            border: 2rpx solid #eeeeee;
            border-radius: 6rpx;
            .num-btn {
              width: 40rpx;
              height: 40rpx;
              font-size: 24rpx;
              color: #999;
              padding: 0;
              margin: 0;
              line-height: 40rpx;
            }
            .num-input {
              width: 60rpx;
              height: 40rpx;
              border-left: 1px solid #eee;
              border-right: 1px solid #eee;
              text-align: center;
              font-size: 24rpx;
              font-weight: 550;
            }
          }
          .price {
            font-weight: 550;
            color: #fc0609;
            font-size: 22rpx;
          }
        }
      }
    }
    .li-leave {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .t {
        font-size: 28rpx;
      }
      .c {
        font-size: 26rpx;
        color: #999;
        input {
          font-size: 26rpx;
          width: 600rpx;
          text-align: right;
          color: #333;
        }
      }
    }
    .li-freight {
      margin: 30rpx 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .t {
        font-size: 28rpx;
      }
      .c {
        font-size: 20rpx;
      }
    }
  }

  .sub-bot {
    background: #ffffff;
    border-radius: 30rpx;
    margin: 20rpx;
    padding: 20rpx 30rpx;
    .bot-li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28rpx;
      padding: 20rpx 0;
      .li-r {
        display: flex;
        align-items: center;
        .more {
          width: 10rpx;
          height: 19rpx;
          margin-left: 15rpx;
        }
      }
    }
    .bot-end {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-weight: 550;
      padding: 20rpx 0;
    }
  }

  .sub-fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 99;
    background: #fff;
    .fixed-con {
      padding: 15rpx 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .pay-btn {
        width: 180rpx;
        height: 70rpx;
        background: #fc0609;
        border-radius: 35rpx;
        line-height: 70rpx;
        margin: 0;
        font-size: 26rpx;
        color: #fff;
      }
    }
  }
  //支付方式弹出 S
  .mode-pop {
    background: #ffffff;
    border-radius: 20rpx 20rpx 0px 0px;
    .mode-tit {
      padding: 38rpx 30rpx;
      line-height: 1;
      font-size: 32rpx;
      font-weight: 550;
      border-bottom: 1px solid #f5f5f5;
      position: relative;
      text-align: center;
      .cancel {
        position: absolute;
        right: 30rpx;
        top: 38rpx;
        color: #999;
        font-size: 26rpx;
      }
    }
    .mode-li {
      padding: 36rpx 0;
      margin: 0 30rpx;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28rpx;
      .li-fr {
        display: flex;
        align-items: center;
        /deep/ uni-radio {
          margin-left: 20rpx;
        }
        /deep/ uni-radio .uni-radio-input.uni-radio-input-checked {
          background: #fc0609 !important;
          border-color: #fc0609 !important;
        }
      }
    }
    .mode-bot {
      padding: 50rpx 30rpx 50rpx 30rpx;
    }
  }
  //支付方式弹出 E

  //支付密码弹出 S
  .pay-close {
    width: 18rpx;
    height: 18rpx;
    position: absolute;
    right: 0;
    top: 10rpx;
  }
  .pay-input {
    height: 78rpx;
    background: #f5f5f5;
    border-radius: 10rpx;
    padding: 0 20rpx;
    .input {
      width: 100%;
      height: 78rpx;
      font-size: 28rpx;
      text-align: left;
    }
  }
  .pay-bot {
    .pay-btn {
      width: 260rpx;
      height: 80rpx;
      background: #fc0609;
      border-radius: 40rpx;
      display: block;
      margin: 0 auto;
      line-height: 80rpx;
      font-size: 32rpx;
      color: #fff;
    }
  }
  //支付密码弹出 E

  //优惠券弹出 S
  .you-pop {
    background: #ffffff;
    border-radius: 20rpx 20rpx 0px 0px;
    .you-head {
      padding: 40rpx 35rpx;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      line-height: 1;
      justify-content: space-between;
      .t {
        font-size: 32rpx;
        font-weight: 550;
      }
      .cancel {
        font-size: 26rpx;
        color: #999;
      }
      .define {
        font-size: 26rpx;
        color: #fc0609;
      }
    }
    .you-ul {
      height: 600rpx;
      overflow-y: auto;
      padding: 30rpx 20rpx;
      .li {
        display: flex;
        height: 209rpx;
        position: relative;
        align-items: center;
        line-height: 50rpx;
        padding: 0 30rpx;
        justify-content: space-between;
        .li-bg {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .li-fl {
          position: relative;
          z-index: 22;
          width: 30%;
          text-align: center;
        }
        .li-fr {
          position: relative;
          z-index: 22;
          width: 60%;
          image {
            width: 40rpx;
            height: 40rpx;
          }
        }
        .li-t {
          font-weight: 550;
          padding: 6rpx 0;
        }
        .li-line {
          height: 1px;
          background: #e4e4e4;
        }
        .li-c {
          padding: 6rpx 0;
          .c {
            font-size: 28rpx;
            color: #fc0609;
          }
          .date {
            color: #666;
            font-size: 24rpx;
          }
        }
      }
    }
  }
  //优惠券弹出 E
}
//rule-pop S
.rule-pop {
  border-radius: 20rpx 20rpx 0rpx 0rpx;
  background: #fff;
  padding: 30rpx 24rpx;
  position: relative;
  .pop-close {
    width: 18rpx;
    height: 18rpx;
    position: absolute;
    right: 24rpx;
    top: 30rpx;
  }
  .pop-hd {
    display: flex;
    padding-right: 30rpx;
    .hd-txt {
      .t {
        font-size: 28rpx;
        line-height: 1.6;
      }
      .c {
        font-size: 26rpx;
        margin: 10rpx 0;
      }
      .price {
        color: #fc0609;
        font-weight: 550;
      }
    }
    .hd-img {
      width: 175rpx;
      height: 175rpx;
      border-radius: 10rpx;
      min-width: 175rpx;
      margin-right: 20rpx;
    }
  }
  .pop-li {
    margin: 30rpx 0;
    .li-t {
      font-size: 28rpx;
      margin-bottom: 20rpx;
    }
    .li-tags {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10rpx;
      .tag {
        height: 62rpx;
        background: #eeeeee;
        border-radius: 32rpx;
        border: 1px solid #eee;
        padding: 0 20rpx;
        line-height: 62rpx;
        margin: 10rpx;
      }
      .active {
        border: 1px solid #f41a0c;
        background: #ffe9e8;
        color: #f41a0c;
      }
    }
  }
  .pop-num {
    display: flex;
    margin: 30rpx 0;
    align-items: center;
    justify-content: space-between;
    .t {
      font-size: 28rpx;
    }
    .num-coum {
      display: flex;
      .coum-btn {
        width: 54rpx;
        height: 45rpx;
        background: #eeeeee;
        border-radius: 10rpx 0px 0px 10rpx;
        text-align: center;
        line-height: 45rpx;
        color: #666;
        text-align: center;
      }
      .coum-btn.last {
        border-radius: 0px 10rpx 10rpx 0px;
      }
      .coum-input {
        width: 54rpx;
        height: 45rpx;
        background: #eeeeee;
        text-align: center;
        font-size: 30rpx;
        color: #666;
        text-align: center;
        margin: 0 3rpx;
      }
    }
  }
}
.pop-bot {
  margin: 50rpx 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .public-btn {
    width: 690rpx;
    height: 90rpx;
    line-height: 90rpx;
  }
}
//rule-pop E
</style>