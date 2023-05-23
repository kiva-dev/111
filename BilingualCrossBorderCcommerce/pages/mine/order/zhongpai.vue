<template>
  <view class="order-page">
    <!--order-sec1 start-->
    <view class="order-sec1" v-if="shopCont.select_way==2">
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
        <view class="order-mid">
          <view class="mid-img">
            <image class="img" :src="shopCont.image"></image>
          </view>
          <view class="mid-txt">
            <view class="h-flex">
              <view class="t">{{shopCont.goods_name}}</view>
            </view>
            <view class="shopcont">
              {{$t('zhongpai.yuanjia')}}：
              <view class="price color-red f-22">
                RM<text class="f-34">{{$filter.formatValue(shopCont.price, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.price, 'split')[1] ? $filter.formatValue(shopCont.price, 'split')[1] : '00'}}
              </view>
            </view>
          </view>
        </view>
        <!--order-mid end-->
      </view>
      <!--order-li end-->
    </view>
    <!--order-sec2 end-->
    <!--order-sec3 start-->
    <view class="order-sec3">
      <view class="sec3-li">
        <view class="label">{{$t('zhongpai.jingbje')}}</view>
        <view class="price f-22">
          RM<text class="f-26">{{$filter.formatValue(shopCont.single_money, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.single_money, 'split')[1] ? $filter.formatValue(shopCont.single_money, 'split')[1] : '00'}}
        </view>
      </view>
      <view class="sec3-bot">
        <view class="price">
          <text class="color-999 f-26">{{$t('user.order.detail.gong')}}1{{$t('user.order.detail.jian')}}</text>
          <text class="f-228">{{$t('user.order.detail.xiaoji')}}：</text>
          <text class="color-red f-22">RM<text class="f-28">{{$filter.formatValue(shopCont.single_money, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.single_money, 'split')[1] ? $filter.formatValue(shopCont.single_money, 'split')[1] : '00'}}</text>
        </view>
      </view>
    </view>
    <!--order-sec3 end-->
    <!--order-sec4 start-->
    <view class="order-sec4">
      <view class="sec4-t">{{$t('user.order.detail.dingdanxx')}}</view>
      <view class="sec4-li">
        <view class="label">{{$t('jingpaiqishu')}}：</view>
        <view class="c">{{shopCont.stage_num}}</view>
      </view>
      <view class="sec4-li">
        <view class="label">{{$t('dueihuanma')}}：</view>
        <view class="c">{{shopCont.num_id}}</view>
      </view>
      <view class="sec4-li">
        <view class="label">{{$t('zhongpai.xdsj')}}：</view>
        <view class="c">{{$filter.to_date_time(shopCont.update_time)}}</view>
      </view>
      <view class="sec4-li">
        <view class="label">{{$t('zhongpai.ljsj')}}：</view>
        <view class="c">{{$filter.to_date_time(shopCont.select_time)}}</view>
      </view>
      <block v-if="shopCont.select_way==2">
        <!-- status 2、待发货 3、待收货  4、待确认 5、已确认 6、已完成 -->
        <view class="sec4-li" v-if="shopCont.status!==2">
          <view class="flex">
            <view class="label">{{$t('user.order.detail.fhfs')}}：</view>
            <view class="c">{{shopCont.send_company}} {{shopCont.send_number}}</view>
          </view>
          <view class="copy-btn color-red f-26 m-l-40" @click="onCopy(shopCont.send_number)">{{$t('user.order.detail.fuzhi')}}</view>
        </view>
        <view class="sec4-li" v-if="shopCont.status!==2">
          <view class="label">{{$t('zhongpai.fhsj')}}：</view>
          <view class="c">{{$filter.to_date_time(shopCont.send_time)}}</view>
        </view>
        <view class="sec4-li" v-if="shopCont.status==5||shopCont.status==6">
          <view class="label">{{$t('zhongpai.shsj')}}：</view>
          <view class="c">{{$filter.to_date_time(shopCont.receive_time)}}</view>
        </view>
      </block>
    </view>
    <!--order-sec4 end-->
    <!--order-fixed start-->
    <view class="order-fixed">
      <view class="fixed-con">
        <view></view>
        <view class="fixed-fr">
          <block v-if="shopCont.isShow&&shopCont.is_complain==0">
            <button class="order-gray" style="font-size: 30rpx;" @click.stop="onShenshuClick">{{$t('zhongpai.shenshu')}}</button>
          </block>
          <block v-if="shopCont.see_complain==1">
            <button class="order-gray" style="font-size: 30rpx;" @click.stop="onShenshu">{{$t('zhongpai.ckss')}}</button>
          </block>
          <block v-if="shopCont.status==4">
            <button class="order-gray" style="font-size: 30rpx;background:#FC0609;color:#fff;border:none" @click.stop="$noMultipleClicks(onshopClick)">{{$t('zhongpai.qrsh')}}</button>
          </block>
          <button v-if="shopCont.status===5" @click.stop="$noMultipleClicks(onquerenClick)" class="order-btn red" style="background:#FC0609;color:#fff;border:none"> {{$t('zhongpai.queren')}}</button>
        </view>
      </view>
    </view>
    <!--order-fixed end-->
    <!--确认收货弹出 start-->
    <uni-popup ref="shopPopup" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <!-- <view class="pop-t">提示</view> -->
          <view class="pop-c">{{$t('user.order.qdysdsp')}}</view>
          <view class="pop-b">
            <button class="pop-btn" @click.stop="onshopQuery">{{$t('user.order.query')}}</button>
            <button class="pop-btn red" @click.stop="$noMultipleClicks(onAuctionorderConfirmOrder)">{{$t('user.order.btnsub')}}</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--确认收货弹出 start-->
  </view>
</template>
<script> 
export default {
  data () {
    return {
      noClick: true, // 防止重复点击 
      id: '',
      shopCont: '',// 查看详情
      orderCont: '',
      isShopCont: false,// 商品详情显示中文还是英文
      timeCont: ''
    }
  },
  onLoad (args) {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    this.id = args.id
    this.$http.post(this.$apiObj.IndexSetting).then(res => {
      if (res.code == 1) {
        this.timeCont = res.data
      }
    })
  },
  onShow () {
    setTimeout(() => {
      this.onOrderDetailOrder()
    }, 500);
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
    // 订单详情
    onOrderDetailOrder () {
      this.$http.post(this.$apiObj.AuctionorderWinDetail, { record_id: this.id }).then(res => {
        if (res.code == 1) {
          // if (this.isShopCont) {
          //   console.log(res.data);
          //   res.data.goods.map(item => {
          //     item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(item.goods_name, 1) : item.goods_name
          //     item.goods_attrs = this.getCaption(item.goods_attrs, 1) ? this.getCaption(item.goods_attrs, 1) : item.goods_attrs
          //   })
          // } else {
          //   res.data.goods.map(item => {
          //     item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(item.goods_name, 0) : item.goods_name
          //     item.goods_attrs = this.getCaption(item.goods_attrs, 0) ? this.getCaption(item.goods_attrs, 0) : item.goods_attrs
          //   })
          // }
          // let num = 0
          // for (let i in res.data.goods) {
          //   num = num + res.data.goods[i].total_num
          // }
          // this.num = num
          // res.data.order_goods_id = res.data.goods[0].id


          // 是否显示申诉按钮
          let isShow = false
          /**
           * status 2、待发货 3、待收货  4、待确认 5、已确认 6、已完成
           * shop_send_days     商家发货天数
           * auto_receipt_days  确认收货天数
           * user_end_days      结束前可申诉天数
           * shop_receive_days  商家填写签收信息天数
           */
          // 判断是否在3天内发货，是不显示，否则显示
          res.data.time = this.$filter.to_date_time(res.data.select_time)
          res.data.time1 = this.$filter.to_date_time(res.data.receive_time)
          if (res.data.status == 2) {
            let shop_send_days = res.data.select_time + this.timeCont.shop_send_days * 60
            if (shop_send_days * 1000 < new Date().getTime()) {
              isShow = true
            } else {
              isShow = false
            }
          }
          // 判断商家30天内填写图文签收信息
          if (res.data.status == 3) {
            let shop_send_days = res.data.send_time + this.timeCont.shop_receive_days * 60
            if (shop_send_days * 1000 < new Date().getTime()) {
              isShow = true
            } else {
              isShow = false
            }
          }
          // 用户7天内确认不显示，超过显示
          // if (res.data.status == 4) {
          //   let shop_send_days = res.data.sign_time + this.timeCont.auto_receipt_days * 5
          //   if (shop_send_days * 1000 < new Date().getTime()) {
          //     isShow = true
          //   } else {
          //     isShow = false
          //   }
          // }
          // 用户显示申诉按钮14天内申诉，超过不显示
          if (res.data.status == 5) {
            console.log(this.timeCont.user_end_days);
            let shop_send_days = res.data.receive_time + this.timeCont.user_end_days * 60
            if (shop_send_days * 1000 > new Date().getTime()) {
              isShow = true
            } else {
              isShow = false
            }
          }
          res.data.isShow = isShow
          this.shopCont = res.data
        }
      })
    },
    // 确认收货订单
    onshopClick () {
      this.order_no = this.shopCont.id
      this.$refs.shopPopup.open()
    },
    // 点击确认收货取消弹框
    onshopQuery () {
      this.$refs.shopPopup.close()
    },
    // 中拍确认收货
    onAuctionorderConfirmOrder () {
      this.$http.post(this.$apiObj.AuctionorderConfirmOrder, { record_id: this.id }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.order.shcg'), icon: 'none' })
          this.onOrderDetailOrder()
          this.$refs.shopPopup.close()
        }
      })
    },
    onShenshuClick () {
      uni.navigateTo({
        url: './shenshu?id=' + this.shopCont.id + '&conter=' + JSON.stringify(this.shopCont)
      })
    },
    // 查看申诉详情
    onShenshu () {
      uni.navigateTo({
        url: './shenshuCont?id=' + this.shopCont.id + '&cont=' + JSON.stringify(this.shopCont)
      })
    },
    // 确认完成
    onquerenClick () {
      this.$http.post(this.$apiObj.AuctionorderAutoConfirm, { record_id: this.shopCont.id }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('zhongpai.qrwc'), icon: 'none' })
          this.onOrderDetailOrder()
        }
      })
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
      min-width: 180rpx;
      height: 70rpx;
      background: #ffffff;
      border: 1px solid #dfdfdf;
      border-radius: 35rpx;
      line-height: 70rpx;
      margin: 0 0 0 10rpx;
      padding: 0 15rpx;
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
  align-items: center;
  margin-top: 60rpx;
  // justify-content: space-between;
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