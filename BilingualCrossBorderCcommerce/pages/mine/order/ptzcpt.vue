<template>
  <view class="sh-page">
    <!--sh-sec1 start-->
    <view class="sh-sec1">
      <!--order-li start-->
      <view class="order-li">
        <view class="li-hd">
          <view class="hd-fl">
            <view class="icon">
              <image class="img" src="../../../static/images/index/dianpu.png"></image>
            </view>
            <view class="name">{{sangjiaCont.shop_name}}</view>
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
            <view class="b-flex">
              <view class="s">{{shopCont.goods_attrs}}</view>
              <view class="num">*{{shopCont.total_num}}</view>
            </view>
            <view class="flex flex-between">
              <view class="price color-red f-22">
                RM<text class="f-34">{{$filter.formatValue(shopCont.goods_price, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.goods_price, 'split')[1] ? $filter.formatValue(shopCont.goods_price, 'split')[1] : '00'}}
              </view>
            </view>
          </view>
        </view>
        <!--order-mid end-->
        <!--order-bd start-->
        <view class="order-bd">
          <view class="label">{{$t('user.order.sqsh.lyan')}}</view>
          <view class="gray">
            <input class="input" placeholder-class="clor-999" v-model="remark" :placeholder="$t('user.order.sqsh.qsr')" />
          </view>
        </view>
        <!--order-bd end-->
      </view>
      <!--order-li end-->
    </view>
    <!--sh-sec1 end-->
    <!--sh-sec2 start-->
    <view class="sh-sec2">
      <!-- <view class="sec2-li">
        <view class="label">退款类型：</view>
        <view class="li-fr" @click="toggle1('bottom')">
          <text>{{leixingName?leixingName:'请选择'}}</text>
          <view class="more">
            <image class="img" src="../../../static/images/more3.png"></image>
          </view>
        </view>
      </view> -->
      <view class="sec2-li" @click="toggle2('bottom')">
        <view class="label">{{$t('user.order.sqsh.hhyy')}}：</view>
        <view class="li-fr">
          <text>{{yuanyinName?yuanyinName:$t('user.order.sqsh.qxz')}}</text>
          <view class="more">
            <image class="img" src="../../../static/images/more3.png"></image>
          </view>
        </view>
      </view>
      <!-- <view class="sec2-li">
        <view class="label">退款数量：</view>
        <view class="cart-num">
          <button class="num-btn" @click="onJian(items)">-</button>
          <input class="num-input" v-model="num" disabled />
          <button class="num-btn" @click="onJia(items)">+</button>
        </view>
      </view> -->
      <!-- <view class="sec2-li">
        <view class="label">退款金额：</view>
        <view class="color-red f-22">
          RM<text class="f-28">{{$filter.formatValue(shopCont.goods_price, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.goods_price, 'split')[1] ? $filter.formatValue(shopCont.goods_price, 'split')[1] : '00'}}
        </view>
      </view> -->
      <view class="sec2-li">
        <view class="label">{{$t('user.order.sqsh.lxdh')}}：</view>
        <view class="li-input">
          <input class="input" type="number" placeholder-class="clor-999" v-model="mobile" :placeholder="$t('user.order.sqsh.qtxlxdh')" />
        </view>
      </view>
    </view>
    <!--sh-sec2 end-->
    <!--申请说明 start-->
    <view class="sh-sec2">
      <view class="sec2-li">
        <view class="sec2-text">
          <view class="label">{{$t('user.order.sqsh.sqsm')}}：</view>
          <textarea auto-height class="text" v-model="descri" placeholder-class="color-999" :placeholder="$t('user.order.sqsh.qnxxtxsqsm')"></textarea>
          <!--add-upload start-->
          <view class="add-upload">
            <view class="upload-img">
              <view v-if="images.length<9" class="xiangji">
                <image src="/static/images/mine/grade9.png" @click="chooseImage" mode="aspectFill" class="update"></image>
              </view>
              <block v-for="(image, index) in images" :key="index">
                <view class="xiangji">
                  <image :src="baseUrl+image" :data-src="baseUrl+image" mode="aspectFill" @tap="previewImage" class="update"></image>
                  <view class="guanbi" @tap="delect(index)">x</view>
                </view>
              </block>
            </view>
          </view>
          <!--add-upload end-->
        </view>
      </view>
    </view>
    <!--申请说明 end-->
    <!--提交按钮 start-->
    <view class="sh-bot">
      <button class="public-btn" @click="onOrderReferAfter">{{$t('user.order.sqsh.tjsq')}}</button>
    </view>
    <!--提交按钮 end-->
    <!--退款类型弹出 start-->
    <uni-popup ref="leixingPopup" type="bottom">
      <view class="sh-pop">
        <view class="sh-close" @click="toggle1Close">
          <image class="img" src="../../../static/images/close1.png"></image>
        </view>
        <view class="sh-tit">{{$t('user.order.sqsh.tklx')}}</view>
        <view class="sh-tip">{{$t('user.order.sqsh.qxhwfhf')}}</view>
        <view class="sh-ul">
          <view v-for="item in leixingList" :key="item.id" class="sh-li" @click="onLeixingClick(item)">
            <view class="label">{{item.title}}</view>
            <image v-if="item.isShow" src="../../../static/images/mine/radio2.png" mode="" />
            <image v-else src="../../../static/images/mine/radio1.png" mode="" />
          </view>
        </view>
        <view class="sh-last">
          <button class="public-btn" @click="toggle1Close">{{$t('user.order.sqsh.btnsub')}}</button>
        </view>
      </view>
    </uni-popup>
    <!--退款类型弹出 start-->
    <!--退款原因弹出 start-->
    <uni-popup ref="yuanyinPopup" type="bottom">
      <view class="sh-pop">
        <view class="sh-close" @click="toggle2Close">
          <image class="img" src="../../../static/images/close1.png"></image>
        </view>
        <view class="sh-tit">{{$t('user.order.sqsh.hhyy')}}</view>
        <view class="sh-tip">{{$t('user.order.sqsh.qxhwfhf')}}</view>
        <view class="sh-ul">
          <view v-for="item in yuanyinList" :key="item.id" class="sh-li" @click="onYuanyinClick(item)">
            <view class="label">{{item.title}}</view>
            <image v-if="item.isShow" src="../../../static/images/mine/radio2.png" mode="" />
            <image v-else src="../../../static/images/mine/radio1.png" mode="" />
          </view>
        </view>
        <view class="sh-last">
          <button class="public-btn" @click="toggle2Close">{{$t('user.order.sqsh.btnsub')}}</button>
        </view>
      </view>
    </uni-popup>
    <!--退款类型弹出 start-->
  </view>
</template>
<script>
export default {
  data () {
    return {
      sangjiaCont: '',// 总商品数据
      shopCont: '',// 单个商品数据
      order_goods_id: '',// 订单详情id
      remark: '',// 备注
      refund_type: '',// 1退货退款，2仅退货，3仅退款
      reason: '',// 退款原因：1拍错/多拍/不想要，2协商一致退款，3商品缺货，4买家发错货，5其他原因
      num: 0,// 退款数量
      mobile_area_code: 60,// 手机号区域编码
      mobile: '',// 手机号码
      descri: '',// 申请说明
      refund_money: 0,// 应退金额
      images: [],// 图片
      leixingList: [{ id: 1, title: this.$t('user.order.sqsh.thtk'), isShow: false }, { id: 2, title: this.$t('user.order.sqsh.jth'), isShow: false }, { id: 3, title: this.$t('user.order.sqsh.jtk'), isShow: false }, { id: 4, title: this.$t('user.order.sqsh.wyhh'), isShow: false }],// 退款类型
      leixingName: '',// 类型
      yuanyinList: [{ id: 4, title: this.$t('user.order.sqsh.mjfch'), isShow: false }, { id: 5, title: this.$t('user.order.sqsh.qtyy'), isShow: false }],// 退款原因
      yuanyinName: '',// 原因
      totNum: '',// 最大数量
      baseUrl: this.$baseUrl
    }
  },
  onLoad (args) {
    this.sangjiaCont = JSON.parse(args.cent)
    this.shopCont = JSON.parse(args.conter)
    this.order_goods_id = JSON.parse(args.conter).order_goods_id
    this.totNum = JSON.parse(args.conter).total_num - JSON.parse(args.conter).back_num
  },
  methods: {
    // 上传图片
    chooseImage () {
      this.show = false
      uni.chooseImage({
        count: 1,
        size: 10 * 1000000,
        sizeType: ['compressed'],
        success: (res) => {
          uni.showLoading({
            title: this.$t('user.order.sqsh.scz'),
            mask: true
          });
          this.resImg = res.tempFilePaths[0] //这就是要的blod
          this.uploadImg(this.resImg)
        }
      })
    },
    //-----------------------------------------------结束
    uploadImg (tempFilePaths) {
      uni.uploadFile({
        url: this.$baseUrl + 'api/Common/upload',
        filePath: tempFilePaths,
        name: 'file',
        header: {
          token: uni.getStorageSync('token'),
        },
        success: res => {
          var data = JSON.parse(res.data);
          if (data.code == 200) {
            this.images.push(data.data.url);
            uni.showToast({ title: this.$t('user.order.sqsh.sccg'), icon: 'none', duration: 1000 });
          } else {
            uni.showToast({
              title: this.$t('user.order.sqsh.scsb'),
              icon: 'none',
              duration: 1000
            });
          }
        }
      });
    },
    previewImage: function (e) {
      var current = e.target.dataset.src;
      uni.previewImage({
        current: current,
        urls: this.images
      });
    },
    delect (index) {
      uni.showModal({
        title: this.$t('user.order.sqsh.tishi'),
        content: this.$t('user.order.sqsh.sfyscgtp'),
        success: res => {
          if (res.confirm) {
            this.images.splice(index, 1);
            // this.numTel = item.images.length;
          }
        }
      });
    },
    // 点击类型
    onLeixingClick (item) {
      this.leixingList.map(items => {
        items.isShow = false
      })
      item.isShow = true
      this.leixingName = item.title
      this.refund_type = item.id
      this.num = 1
      this.onOrderRefundMoney()
    },
    // 点击原因
    onYuanyinClick (item) {
      this.yuanyinList.map(items => {
        items.isShow = false
      })
      item.isShow = true
      this.yuanyinName = item.title
      this.reason = item.id
    },
    // 点击减
    onJian () {
      if (!this.refund_type) return uni.showToast({ icon: 'none', title: this.$t('user.order.sqsh.qxztklx') })
      if (!this.num) return uni.showToast({ icon: 'none', title: this.$t('user.order.sqsh.qjsplj') })
      if (this.num == 1) return uni.showToast({ icon: 'none', title: this.$t('user.order.sqsh.ydzxsl') })
      this.num = this.num - 1
      this.onOrderRefundMoney()
    },
    // 点击加
    onJia () {
      if (!this.refund_type) return uni.showToast({ icon: 'none', title: this.$t('user.order.sqsh.qxztklx') })
      if (this.num == this.totNum) return uni.showToast({ icon: 'none', title: this.$t('user.order.sqsh.ydzdsl') })
      this.num = this.num + 1
      this.onOrderRefundMoney()
    },
    // 申请售后应退款金额
    onOrderRefundMoney () {
      this.$http.post(this.$apiObj.OrderRefundMoney, { order_goods_id: this.shopCont.order_goods_id, num: this.num, refund_type: this.refund_type }).then(res => {
        if (res.code == 1) {
          this.refund_money = res.data.refund_money
        }
      })
    },
    // 提交申请
    onOrderReferAfter () {
      // if (!this.remark) return uni.showToast({ icon: 'none', title: '请输入留言' })
      // if (!this.num) return uni.showToast({ icon: 'none', title: '请选择退款数量' })
      if (!this.reason) return uni.showToast({ icon: 'none', title: this.$t('user.order.sqsh.qxztkyy') })
      // if (!this.refund_type) return uni.showToast({ icon: 'none', title: '请选择退款数量' })
      if (!this.mobile) return uni.showToast({ icon: 'none', title: this.$t('user.order.sqsh.qsrlxdh') })
      if (!this.descri) return uni.showToast({ icon: 'none', title: this.$t('user.order.sqsh.qsrsqsm') })
      this.$http.post(this.$apiObj.OrderReferAfter, {
        order_goods_id: this.order_goods_id,// 订单详情id
        remark: this.remark,// 备注
        refund_type: 4,// 1退货退款，2仅退货，3仅退款
        reason: this.reason,// 退款原因：1拍错/多拍/不想要，2协商一致退款，3商品缺货，4买家发错货，5其他原因
        num: 1,// 退款数量
        mobile_area_code: this.mobile_area_code,// 手机号区域编码
        mobile: this.mobile,// 手机号码
        descri: this.descri,// 申请说明
        refund_money: this.shopCont.goods_price,// 应退金额
        images: this.images.toString(),// 图片
      }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.order.sqsh.sqcg'), icon: 'none' })
          setTimeout(() => {
            uni.navigateBack({ delta: 1 })
          }, 1000);
        }
      })
    },

    toggle1 () {
      this.$refs.leixingPopup.open()
    },
    toggle1Close () {
      this.$refs.leixingPopup.close()
    },
    toggle2 () {
      this.$refs.yuanyinPopup.open()
    },
    toggle2Close () {
      this.$refs.yuanyinPopup.close()
    }
  }
}
</script>
<style lang="less" scope>
page {
  background: #f9f9f9;
}
.sh-page {
  //sh-sec1 S
  .sh-sec1 {
    background: #ffff;
    padding: 30rpx;
    border-radius: 0px 0px 30rpx 30rpx;
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
          input {
            color: #333;
            width: 600rpx;
            text-align: right;
            font-size: 28rpx;
          }
        }
      }
    }
    //order-li E
  }
  //sh-sec1 E
  //sh-sec2 S
  .sh-sec2 {
    background: #ffffff;
    border-radius: 20rpx;
    margin: 20rpx 0;
    padding: 0 30rpx;
    .sec2-li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f5f5f5;
      padding: 40rpx 0;
      line-height: 1;
      font-size: 26rpx;
      .label {
        font-size: 26rpx;
      }
      .li-fr {
        display: flex;
        align-items: center;
        .more {
          width: 12rpx;
          height: 24rpx;
          min-width: 10rpx;
          margin-left: 15rpx;
        }
      }
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
      .li-input {
        flex: 1;
        .input {
          width: 100%;
          font-size: 26rpx;
          text-align: right;
          width: 100%;
        }
      }
    }
    .sec2-text {
      width: 100%;
      .text {
        padding: 20rpx 0;
        width: 100%;
        font-size: 26rpx;
      }
      .add-upload {
        display: flex;
        margin-top: 20rpx;
        .upload-img {
          display: flex;
          flex-wrap: wrap;
          .xiangji {
            position: relative;
            margin-right: 30rpx;
            margin-bottom: 30rpx;
            &:nth-child(4n) {
              margin-right: 0;
            }
            .update {
              width: 144rpx;
              height: 144rpx;
              display: block;
            }
            .guanbi {
              position: absolute;
              top: -15rpx;
              right: -15rpx;
              width: 30rpx;
              height: 30rpx;
              line-height: 26rpx;
              text-align: center;
              border-radius: 15rpx;
              background: red;
              color: #fff;
            }
          }
        }
      }
    }
  }
  //sh-sec2 E
  .sh-bot {
    margin: 50rpx 30rpx;
  }

  .sh-pop {
    background: #ffffff;
    border-radius: 20rpx 20rpx 0px 0px;
    padding: 30rpx;
    .sh-close {
      width: 18rpx;
      height: 18rpx;
      position: absolute;
      right: 30rpx;
      top: 30rpx;
    }
    .sh-tit {
      font-size: 32rpx;
      font-weight: 550;
      text-align: center;
    }
    .sh-tip {
      background: #f9f9f9;
      border-radius: 10rpx;
      padding: 10rpx 20rpx;
      font-size: 24rpx;
      line-height: 35rpx;
      margin-top: 30rpx;
    }
    .sh-ul {
      padding: 0 20rpx;
      .sh-li {
        padding: 30rpx 0;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .label {
          font-size: 26rpx;
        }
        image {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
    .sh-last {
      padding: 30rpx 0;
    }
  }
}
</style>