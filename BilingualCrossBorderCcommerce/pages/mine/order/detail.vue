<template>
  <view class="order-page">
    <!--order-head start-->
    <view class="order-head" style="display:flex;align-items: center;justify-content: center;" v-if="shopCont.status==0">
      {{$t('user.order.detail.xufukuan')}}：RM{{shopCont.pay_price}} {{$t('user.order.detail.shengyu')}}：<u-count-down :time="shopCont.remain_pay_time * 1000" format="HH:mm:ss"></u-count-down>
    </view>
    <!--order-head end-->
    <!--order-sec1 start-->
    <view class="order-sec1">
      <view class="sec1-icon">
        <image class="img" src="../../../static/images/submit1.png"></image>
      </view>
      <view class="sec1-txt">
        <view class="sec1-h">{{shopCont.a_detail}}</view>
        <view class="sec1-c">
          <text class="name">{{shopCont.a_name}}</text>
          <text class="phone">{{shopCont.a_mobile}}</text>
        </view>
      </view>
    </view>
    <!--order-sec1 end-->
    <!--order-sec2 start-->
    <view class="order-sec2">
      <!--order-li start-->
      <view class="order-li">
        <view class="li-hd">
          <view class="hd-fl">
            <view class="icon">
              <image class="img" src="../../../static/images/index/dianpu.png"></image>
            </view>
            <view class="name">{{shopCont.shop_name}}</view>
          </view>
        </view>
        <!--order-mid start-->
        <view class="order-mid" v-for="item,k in shopCont.goods" :key="k">
          <view class="mid-img">
            <image class="img" :src="item.image"></image>
          </view>
          <view class="mid-txt">
            <view class="h-flex">
              <view class="t">{{item.goods_name}}</view>
            </view>
            <view class="b-flex">
              <view class="s">{{item.goods_attrs}}</view>
              <view class="num">*{{item.total_num}}</view>
            </view>
            <block v-if="shopCont.buy_type==1||shopCont.buy_type==2||shopCont.buy_type==3">
              <block v-if="shopCont.status==3&&item.back_num==0">
                <view class="shopcont">
                  <view class="price color-red f-22">
                    RM<text class="f-34">{{$filter.formatValue(item.goods_price, 'split')[0]}}</text>.{{$filter.formatValue(item.goods_price, 'split')[1] ? $filter.formatValue(item.goods_price, 'split')[1] : '00'}}
                  </view>
                  <button @click.stop="onSengqing(item)" class="order-btn gray">{{$t('user.order.detail.sqsh')}}</button>
                </view>
              </block>
            </block>
          </view>
        </view>
        <!--order-mid end-->
        <!--order-bd start-->
        <view class="order-bd">
          <view class="label">{{$t('user.order.detail.liuyan')}}</view>
          <view class="gray">{{shopCont.remark?shopCont.remark:$t('user.order.detail.wu')}}</view>
        </view>
        <!--order-bd end-->
      </view>
      <!--order-li end-->
    </view>
    <!--order-sec2 end-->
    <!--order-sec3 start-->
    <view class="order-sec3">
      <view class="sec3-li">
        <view class="label">{{$t('user.order.detail.spje')}}</view>
        <view class="price f-22">
          RM<text class="f-26">{{$filter.formatValue(shopCont.total_price, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.total_price, 'split')[1] ? $filter.formatValue(shopCont.total_price, 'split')[1] : '00'}}
        </view>
      </view>
      <!-- <view class="sec3-li">
        <view class="label">运费</view>
        <view class="price f-22">免运费
          RM<text class="f-26">{{$filter.formatValue(shopCont.goods_price, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.goods_price, 'split')[1] ? $filter.formatValue(shopCont.goods_price, 'split')[1] : '00'}}
        </view>
      </view> -->
      <view class="sec3-li" v-if="shopCont.buy_type!=2">
        <view class="label">{{$t('user.order.detail.yhq')}}</view>
        <view class="price f-22 color-red">
          -RM<text class="f-26">{{$filter.formatValue(shopCont.coupon_price, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.coupon_price, 'split')[1] ? $filter.formatValue(shopCont.coupon_price, 'split')[1] : '00'}}
        </view>
      </view>
      <view class="sec3-bot">
        <view class="price">
          <text class="color-999 f-26">{{$t('user.order.detail.gong')}}{{num}}{{$t('user.order.detail.jian')}}</text>
          <text class="f-228">{{$t('user.order.detail.xiaoji')}}：</text>
          <text class="color-red f-22">RM<text class="f-28">{{$filter.formatValue(shopCont.pay_price, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.pay_price, 'split')[1] ? $filter.formatValue(shopCont.pay_price, 'split')[1] : '00'}}</text>
        </view>
      </view>
    </view>
    <!--order-sec3 end-->
    <!--order-sec4 start-->
    <view class="order-sec4">
      <view class="sec4-t">{{$t('user.order.detail.dingdanxx')}}</view>
      <view class="sec4-li">
        <view class="label">{{$t('user.order.detail.ddbh')}}：</view>
        <view class="c">{{shopCont.order_no}}</view>
      </view>
      <view class="sec4-li" v-if="shopCont.status==1||shopCont.status==2||shopCont.status==3||shopCont.status==4||shopCont.status==5">
        <view class="label">{{$t('user.order.detail.zhiffangs')}}：</view>
        <view class="c" v-if="shopCont.pay_type==1">{{$t('user.order.detail.yuerzhifu')}}</view>
        <view class="c" v-if="shopCont.pay_type==2">{{$t('user.order.detail.sfzf')}}</view>
      </view>
      <view class="sec4-li" v-if="shopCont.status==3||shopCont.status==4||shopCont.status==5">
        <view class="flex">
          <view class="label">{{$t('user.order.detail.fhfs')}}：</view>
          <view class="c">{{shopCont.express_company}} {{shopCont.express_no}}</view>
        </view>
        <view class="copy-btn color-red f-26 m-l-40" @click="onCopy(shopCont.express_no)">{{$t('user.order.detail.fuzhi')}}</view>
      </view>
      <view class="sec4-li">
        <view class="label">{{$t('user.order.detail.changjiansj')}}：</view>
        <view class="c">{{$filter.to_date_time(shopCont.addtime)}}</view>
      </view>
      <view class="sec4-li" v-if="shopCont.status==1||shopCont.status==2||shopCont.status==3||shopCont.status==4||shopCont.status==5">
        <view class="label">{{$t('user.order.detail.fukuansj')}}：</view>
        <view class="c">{{$filter.to_date_time(shopCont.pay_time)}}</view>
      </view>
      <view class="sec4-li" v-if="shopCont.status==3||shopCont.status==4||shopCont.status==5">
        <view class="label">{{$t('user.order.detail.fahuosj')}}：</view>
        <view class="c">{{$filter.to_date_time(shopCont.freight_time)}}</view>
      </view>
      <view class="sec4-li" v-if="shopCont.status==4||shopCont.status==5">
        <view class="label">{{$t('user.order.detail.shsj')}}：</view>
        <view class="c">{{$filter.to_date_time(shopCont.receipt_time)}}</view>
      </view>
      <view class="sec4-li" v-if="shopCont.status=='-2'||shopCont.status=='-1'">
        <view class="label">{{$t('user.order.detail.guanbisjian')}}：</view>
        <view class="c">{{$filter.to_date_time(shopCont.cancel_time)}}</view>
      </view>
    </view>
    <!--order-sec4 end-->
    <!--order-fixed start-->
    <view class="order-fixed">
      <view class="fixed-con">
        <view class="fixed-fl color-red f-26" style="display:flex;align-items: center;" v-if="shopCont.status==1">{{$t('user.order.detail.syptsj')}}：<u-count-down :time="shopCont.remain_group_time * 1000" format="HH:mm:ss"></u-count-down>
        </view>
        <view class="fixed-fl color-red f-26" style="display:flex;align-items: center;" v-if="shopCont.status==3">
          <u-count-down :time="shopCont.remain_receipt_time * 1000" format="HH:mm:ss"></u-count-down>{{$t('user.order.detail.hzdsh')}}
        </view>
        <view class="fixed-fr">
          <!-- <button class="order-gray" @click="toggle1('center')">取消订单</button>
          <button class="order-btn" @click="toggle2('bottom')">立即支付</button> -->
          <!--待付款-->
          <block v-if="shopCont.status==0">
            <button class="order-gray" style="font-size: 30rpx;" @click.stop="onQueryClick">{{$t('user.order.detail.query')}}</button>
            <button class="order-btn" style="font-size: 30rpx;" @click.stop="onorderPwdClick">{{$t('user.order.detail.quzhifu')}}</button>
          </block>
          <!-- 交易关闭  ptddgb -->
          <block v-if="shopCont.status=='-2'||shopCont.status=='-1'">
            <button class="order-btn gray" style="font-size: 30rpx;" @click.stop="onDelClick">{{$t('user.order.detail.scdd')}}</button>
          </block>
          <!-- 已支付待成团 -->
          <block v-if="shopCont.status==1">
            <button class="order-gray" style="font-size: 30rpx;" @click.stop="onQueryClick">{{$t('user.order.detail.query')}}</button>
            <button class="order-btn" style="font-size: 30rpx;">{{$t('user.order.detail.yqpintuan')}}</button>
          </block>
          <!-- 等待卖家发货  ddfh -->
          <block v-if="shopCont.status==2&&shopCont.buy_type!=2">
            <button class="order-gray" style="font-size: 30rpx;" @click.stop="onQueryClick">{{$t('user.order.detail.query')}}</button>
          </block>
          <!-- 单个已发货  ptqrsh -->
          <block v-if="shopCont.status==3">
            <button class="order-btn" style="font-size: 30rpx;" @click.stop="onshopClick">{{$t('user.order.detail.qrsh')}}</button>
          </block>
          <!-- 待评价 -->
          <block v-if="shopCont.status==4">
            <button class="order-btn" style="font-size: 30rpx;" @click.stop="onPingClick">{{$t('user.order.detail.daipja')}}</button>
          </block>
          <!-- 已完成 -->
          <block v-if="shopCont.status==5">
            <button class="order-btn gray" style="font-size: 30rpx;" @click.stop="onDelClick">{{$t('user.order.detail.scdd')}}</button>
          </block>
        </view>
      </view>
    </view>
    <!--order-fixed end-->
    <!--支付方式弹出 start-->
    <uni-popup ref="popup1" type="bottom">
      <view class="mode-pop">
        <view class="mode-tit">
          <text>{{$t('user.order.detail.xzzffs')}}</text>
          <view class="cancel" @click="toggle1Close">{{$t('user.order.detail.quxiao')}}</view>
        </view>
        <view v-for="item,k in orderPayList" :key="item.id" class="mode-li">
          <view class="label">
            {{item.title}} <block v-if="item.id==1">（{{$t('user.order.detail.keyongyuer')}}<text class="color-red">RM{{userCont.money}}</text>）</block>
          </view>
          <view class="li-fr" @click="onQuanClick(item,k)">
            <radio :checked="item.isShow?true:false" value="r1" />
          </view>
        </view>
        <view class="mode-bot">
          <button class="public-btn" @click="onPayClick">{{$t('user.order.detail.btnsub')}}</button>
        </view>
      </view>
    </uni-popup>
    <!--支付方式弹出 end-->
    <!--取消订单弹出 start-->
    <uni-popup ref="QueryPopup" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-t">{{$t('user.order.detail.tishi')}}</view>
          <view class="pop-c">{{$t('user.order.detail.nqdyqxdqddm')}}</view>
          <view class="pop-b">
            <button class="pop-btn" @click.stop="onQuery">{{$t('user.order.detail.quxiao')}}</button>
            <button class="pop-btn red" @click.stop="onOrderNotpayCancelOrder">{{$t('user.order.detail.btnsub')}}</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--取消订单弹出 start-->
    <!--删除订单弹出 start-->
    <uni-popup ref="DelPopup" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-t">{{$t('user.order.detail.tishi')}}</view>
          <view class="pop-c">{{$t('user.order.detail.nqdyscdqdd')}}</view>
          <view class="pop-b">
            <button class="pop-btn" @click.stop="onDel">{{$t('user.order.detail.quxiao')}}</button>
            <button class="pop-btn red" @click.stop="onOrderDeleteOrder">{{$t('user.order.detail.btnsub')}}</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--删除订单弹出 start-->
    <!--确认收货弹出 start-->
    <uni-popup ref="shopPopup" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <!-- <view class="pop-t">提示</view> -->
          <view class="pop-c">{{$t('user.order.detail.qdysdsp')}}</view>
          <view class="pop-b">
            <button class="pop-btn" @click.stop="onshopQuery">{{$t('user.order.detail.quxiao')}}</button>
            <button class="pop-btn red" @click.stop="onOrderReceiptOrder">{{$t('user.order.detail.btnsub')}}</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--确认收货弹出 start-->
    <!--支付密码弹出 start-->
    <uni-popup ref="pwdPopup" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-t">
            <text>{{$t('user.order.detail.qsrzfmm')}}</text>
            <view class="pay-close" @click="onPwdQuery">
              <image class="img" src="../../../static/images/close1.png"></image>
            </view>
          </view>
          <view class="pop-c">
            <view class="pay-input">
              <input class="input" type="password" placeholder-class="color-999" v-model="pay_pwd" :placeholder="$t('user.order.detail.qsrzfmm')" />
            </view>
          </view>
          <view class="pay-bot">
            <button class="pay-btn" @click="onPwdClick">{{$t('user.order.detail.btnsub')}}</button>
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
  data () {
    return {
      userCont: '',// 用户信息
      order_no: '',
      shopCont: '',// 查看详情
      num: 0,// 总数量
      pay_pwd: '',// 支付密码
      orderCont: '',
      orderPayList: [{ id: 1, title: this.$t('user.order.detail.yuerzhifu'), isShow: false }, { id: 2, title: this.$t('user.order.detail.sfzf'), isShow: false },],
      isShopCont: false,// 商品详情显示中文还是英文
      MineCont: {}
    }
  },
  watch: {
    'shopCont.pay_price': {
      handler (e, m) {
        if (e < 10) {
          this.orderPayList = [{ id: 1, title: this.$t('auction.detail.yuerzhifu'), isShow: false }]
        } else {
          this.orderPayList = [{ id: 1, title: this.$t('auction.detail.yuerzhifu'), isShow: false }, { id: 2, title: this.$t('auction.detail.sfzfu'), isShow: false }]
        }
      }
    },
  },
  onLoad (args) {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    this.order_no = args.order_no
  },
  onShow () {
    this.onOrderDetailOrder()
    this.onMineInfo()
    // 实名认证
    this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
      if (res.code == 1) {
        this.MineCont = res.data
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
    onMineInfo () {
      this.$http.post(this.$apiObj.MineInfo).then(res => {
        if (res.code == 1) {
          this.userCont = res.data
        }
      })
    },
    toggle1Close () {
      this.$refs.popup1.close()
    },
    onQuanClick (item, k) {
      for (let i in this.orderPayList) {
        this.orderPayList[i].isShow = false
      }
      item.isShow = true
      this.orderCont = k + 1
    },
    onPayClick () {
      if (!this.orderCont) return uni.showToast({ icon: 'none', title: this.$t('user.order.detail.qxzzffs') })
      if (this.orderCont == 1) {
        // 余额支付弹框
        this.$refs.popup1.close()
        this.$refs.pwdPopup.open()
      } else if (this.orderCont == 2) {
        if (this.MineCont === null) return uni.showToast({ icon: 'none', title: this.$t('smrz') })
        if (this.MineCont.status == 0) return uni.showToast({ icon: 'none', title: this.$t('smrzshh') })
        if (this.MineCont.status == '-1') return uni.showToast({ icon: 'none', title: this.$t('smrzwtg') })
        this.$refs.popup1.close()
        // 3方支付
        this.$http.post(this.$apiObj.OrderMalaysiaPay, { order_no: this.order_no, money: this.shopCont.pay_price }).then(res => {
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
    },
    // 申请售后
    onSengqing (items) {
      items.order_goods_id = items.id
      if (this.shopCont.buy_type == 1) {
        uni.navigateTo({
          url: './sqsh?conter=' + JSON.stringify(items) + '&cent=' + JSON.stringify(this.shopCont)
        })
      } else {
        uni.navigateTo({
          url: './ptzcpt?conter=' + JSON.stringify(items) + '&cent=' + JSON.stringify(this.shopCont)
        })
      }
    },
    // 订单详情
    onOrderDetailOrder () {
      this.$http.post(this.$apiObj.OrderDetailOrder, { order_no: this.order_no }).then(res => {
        if (res.code == 1) {
          if (this.isShopCont) {
            console.log(res.data);
            res.data.goods.map(item => {
              item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(item.goods_name, 1) : item.goods_name
              item.goods_attrs = this.getCaption(item.goods_attrs, 1) ? this.getCaption(item.goods_attrs, 1) : item.goods_attrs
            })
          } else {
            res.data.goods.map(item => {
              item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(item.goods_name, 0) : item.goods_name
              item.goods_attrs = this.getCaption(item.goods_attrs, 0) ? this.getCaption(item.goods_attrs, 0) : item.goods_attrs
            })
          }
          let num = 0
          for (let i in res.data.goods) {
            num = num + res.data.goods[i].total_num
          }
          this.num = num
          res.data.order_goods_id = res.data.goods[0].id
          this.shopCont = res.data
        }
      })
    },
    // 点击支付
    onorderPwdClick () {
      this.$refs.popup1.open()
    },
    // 关闭支付密码
    onPwdQuery () {
      this.$refs.pwdPopup.close()
    },
    // 点击支付密码
    onPwdClick () {
      if (!this.pay_pwd) return uni.showToast({ title: this.$t('user.order.detail.qsrmm'), icon: 'none' })
      const pay_pwd = jsencrypt.setEncrypt(publiukey, String(this.pay_pwd))
      this.$http.post(this.$apiObj.OrderBalancePay, {
        major_no: this.major_no,// 购物车支付的主订单号
        order_no: this.order_no,// 小订单号
        money: this.shopCont.pay_price,// 支付总金额
        pay_pwd: pay_pwd,// rsa加密后的支付密码
      }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.order.detail.zfcg'), icon: 'none' })
          this.onOrderDetailOrder()
          this.onMineInfo()
          this.$refs.pwdPopup.close()
        }
      })
    },
    // 取消订单
    onQueryClick () {
      this.$refs.QueryPopup.open()
    },
    // 点击取消弹框
    onQuery () {
      this.$refs.QueryPopup.close()
    },
    // 取消订单接口
    onOrderNotpayCancelOrder () {
      if (this.shopCont.status == 0) {
        // 未支付取消订单
        this.$http.post(this.$apiObj.OrderNotpayCancelOrder, { order_no: this.shopCont.order_no }).then(res => {
          if (res.code == 1) {
            uni.showToast({ title: this.$t('user.order.detail.qxddcg'), icon: 'none' })
            this.onOrderDetailOrder()
            this.$refs.QueryPopup.close()
          }
        })
      } else if (this.shopCont.status == 2) {
        // 待发货取消订单（涉及退款）
        this.$http.post(this.$apiObj.OrderPayCancelOrder, { order_no: this.shopCont.order_no }).then(res => {
          if (res.code == 1) {
            uni.showToast({ title: this.$t('user.order.detail.qxddcg'), icon: 'none' })
            this.onOrderDetailOrder()
            this.$refs.QueryPopup.close()
          }
        })
      }
    },
    // 删除订单
    onDelClick () {
      this.$refs.DelPopup.open()
    },
    // 点击删除弹框
    onDel () {
      this.$refs.DelPopup.close()
    },
    // 删除订单接口
    onOrderDeleteOrder () {
      this.$http.post(this.$apiObj.OrderDeleteOrder, { order_no: this.order_no }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.order.detail.scddcg'), icon: 'none' })
          setTimeout(() => {
            uni.navigateBack({ delta: 1 })
          }, 1000);
        }
      })
    },
    // 确认收货订单
    onshopClick () {
      this.$refs.shopPopup.open()
    },
    // 点击确认收货取消弹框
    onshopQuery () {
      this.$refs.shopPopup.close()
    },
    // 确认收货
    onOrderReceiptOrder () {
      this.$http.post(this.$apiObj.OrderReceiptOrder, { order_no: this.order_no }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.order.detail.shcg'), icon: 'none' })
          this.onOrderDetailOrder()
          this.$refs.shopPopup.close()
        }
      })
    },
    // 待评价
    onPingClick () {
      uni.navigateTo({
        url: './evaluate?order_no=' + this.order_no
      })
    },
    // 申请售后
    // onSengqing (items, item) {
    //   uni.navigateTo({
    //     url: './sqsh?conter=' + JSON.stringify(items) + '&cent=' + JSON.stringify(item)
    //   })
    // },
    toggle3 (type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup3.open(type)
    },
    toggle3Close (type) {
      this.type = type
      // open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
      this.$refs.popup3.close(type)
    },
    onCopy (e) {
      // this.$emit('copy', this.shopCont.tui_express_no);
      // #ifdef H5
      let oInput = document.createElement('input');
      oInput.value = e; //要复制的订单编号
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      document.execCommand("Copy"); // 执行浏览器复制命令
      uni.showToast({ icon: 'none', title: this.$t('user.order.detail.fzcg') })
      oInput.remove()
      // #endif
      // #ifndef H5
      uni.setClipboardData({
        data: e,
        success: () => {
          uni.showToast({ icon: 'none', title: this.$t('user.order.detail.fzcg') })
        }
      });
      // #endif
    },
  }
}
</script>
<style>
page {
  background: #f9f9f9;
}
</style>
<style lang="less" scoped>
.order-page {
  padding-bottom: 100rpx;
  .order-head {
    font-size: 22rpx;
    color: #fff;
    text-align: center;
    padding: 20rpx 0;
    background: linear-gradient(90deg, #9a3064 0%, #59499b 100%);
  }
  //order-sec1 S
  .order-sec1 {
    background: #ffffff;
    border-radius: 0px 0px 30rpx 30rpx;
    padding: 30rpx;
    display: flex;
    align-items: center;
    .sec1-icon {
      width: 73rpx;
      height: 73rpx;
      border-radius: 100%;
      overflow: hidden;
      min-width: 73rpx;
      max-width: 73rpx;
      margin-right: 35rpx;
    }
    .sec1-txt {
      .sec1-h {
        font-size: 26rpx;
      }
      .sec1-m {
        font-size: 28rpx;
        margin: 10rpx 0;
      }
      .sec1-c {
        display: flex;
        .name {
          font-size: 28rpx;
          margin-right: 30rpx;
        }
        .phone {
          font-size: 26rpx;
          color: #999;
        }
      }
    }
  }
  //order-sec1 E
  //order-sec2 S
  .order-sec2 {
    background: #ffffff;
    border-radius: 30rpx;
    padding: 30rpx;
    margin: 20rpx 0;
    //order-li S
    .order-li {
      background: #ffffff;
      border-radius: 20rpx;
      margin: 20rpx 0;
      .li-hd {
        display: flex;
        align-items: center;
        justify-content: space-between;

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
        padding: 30rpx 0;
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
          width: calc(100% - 150rpx);
          .h-flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
            line-height: 36rpx;
            .t {
              font-size: 26rpx;
              line-height: 36rpx;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .num {
              font-size: 24rpx;
              color: #999;
              white-space: nowrap;
              margin-left: 20rpx;
            }
          }
          .price {
            font-size: 22rpx;
            color: #fc0609;
            font-weight: 550;
          }
          .b-flex {
            margin: 10rpx 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .s {
              font-size: 24rpx;
              color: #999;
            }
          }
        }
      }
      .order-bd {
        padding: 0 0rpx 0rpx 0rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .label {
          font-size: 28rpx;
        }
        .gray {
          color: #999;
          font-size: 26rpx;
          margin-left: 20rpx;
        }
      }
    }
    //order-li E
  }
  //order-sec2 E
  //order-sec3 S
  .order-sec3 {
    margin: 20rpx 0;
    background: #ffffff;
    border-radius: 30rpx;
    padding: 20rpx 30rpx;
    .sec3-li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 0;
      .label {
        font-size: 28rpx;
      }
      .price {
        font-weight: 550;
      }
    }
    .sec3-bot {
      display: flex;
      justify-content: flex-end;
      font-weight: 550;
      padding: 20rpx 0;
      align-items: center;
      .color-999 {
        margin-right: 10rpx;
      }
    }
  }
  //order-sec3 E
  //order-sec4 S
  .order-sec4 {
    background: #ffffff;
    border-radius: 20rpx;
    margin: 20rpx;
    padding: 30rpx;
    .sec4-t {
      font-size: 28rpx;
      font-weight: 550;
      margin-bottom: 20rpx;
    }
    .sec4-li {
      padding: 16rpx 0;
      display: flex;
      align-items: center;
      .label {
        white-space: nowrap;
        margin-right: 10rpx;
        font-size: 28rpx;
      }
      .c {
        font-size: 26rpx;
      }
    }
  }
  //order-sec4 E
  //order-fixed S
  .order-fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    .fixed-con {
      padding: 15rpx 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .fixed-fr {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
    .order-btn {
      width: 180rpx;
      height: 70rpx;
      background: #fc0609;
      border-radius: 35rpx;
      font-size: 26rpx;
      color: #fff;
      padding: 0;
      margin: 0 0 0 10rpx;
      line-height: 70rpx;
    }
    .order-gray {
      width: 180rpx;
      height: 70rpx;
      background: #ffffff;
      border: 1px solid #dfdfdf;
      border-radius: 35rpx;
      line-height: 70rpx;
      margin: 0 0 0 10rpx;
      padding: 0;
      font-size: 30rpx;
      color: #999;
    }
  }
  //order-fixed E
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
}
/deep/.u-count-down__text {
  color: #fc0609 !important;
  font-size: 26rpx !important;
}
.order-head {
  /deep/.u-count-down__text {
    color: #fff !important;
    font-size: 26rpx !important;
  }
}
.shopcont {
  display: flex;
  justify-content: space-between;
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
    text-align: center;
  }
}
</style>