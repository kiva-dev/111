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
            <view class="flex">{{$t('zhongpai.yuanjia')}}：
              <view class="price color-red f-22">
                RM<text class="f-34">{{$filter.formatValue(shopCont.single_money, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.single_money, 'split')[1] ? $filter.formatValue(shopCont.single_money, 'split')[1] : '00'}}
              </view>
            </view>
          </view>
        </view>
        <!--order-mid end-->
      </view>
      <!--order-li end-->
    </view>
    <!--sh-sec1 end-->
    <!--sh-sec2 start-->
    <view class="sh-sec2">
      <view class="sec2-li">
        <view class="label">{{$t('user.order.sqsh.lxdh')}}：</view>
        <view class="li-input">
          <view class="label" @click="navClick('/pages/public/ownership')">
            <text>{{mobile_area_code}}</text>
            <view class="icon">
              <image class="img" src="../../../static/images/icon5.png"></image>
            </view>
          </view>
          <input class="input" type="number" maxlength="15" placeholder-class="clor-999" v-model="mobile" :placeholder="$t('user.order.sqsh.qtxlxdh')" />
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
      <button class="public-btn" @click.stop="$noMultipleClicks(onAuctionorderReferComplain)">{{$t('zhongpai.tjss')}}</button>
    </view>
    <!--提交按钮 end-->
  </view>
</template>
<script>
export default {
  data () {
    return {
      noClick: true, // 防止重复点击 
      shopCont: '',// 商品数据
      mobile_area_code: 60,// 手机号区域编码
      mobile: '',// 手机号码
      descri: '',// 申请说明 
      images: [],// 图片
      baseUrl: this.$baseUrl,
      id: '',//中奖记录id
    }
  },
  onLoad (args) {
    this.id = args.id
    this.shopCont = JSON.parse(args.conter)
  },
  onShow () {
    if (uni.getStorageSync('phoneCont')) {
      this.mobile_area_code = JSON.parse(uni.getStorageSync('phoneCont')).code
    } else {
      this.mobile_area_code = '+60'
      let title = { city: this.$t('phone.mlxy'), code: "+60", "sou": "M" }
      uni.setStorageSync('phoneCont', JSON.stringify(title))
    }
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
    navClick (url) {
      uni.navigateTo({
        url
      })
    },
    // 提交申请
    onAuctionorderReferComplain () {
      if (!this.mobile) return uni.showToast({ icon: 'none', title: this.$t('user.order.sqsh.qsrlxdh') })
      if (!this.descri && this.images.length === 0) return uni.showToast({ icon: 'none', title: this.$t('zhongpai.smhtpexy') })
      if (this.mobile_area_code == 86) {
        if (this.mobile) {
          var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ //11位手机号码正则
          if (!reg_tel.test(this.mobile)) return uni.showToast({ title: this.$t('login.qsrzqsjh'), icon: 'none' })
        }
      }
      this.$http.post(this.$apiObj.AuctionorderReferComplain, {
        record_id: this.id,// 中奖记录id
        mobile_area_code: this.mobile_area_code.slice(1),// 手机号区域码
        mobile: this.mobile,// 手机号码
        mark: this.descri,// 说明，说明和图片二选一
        images: this.images.toString(),// 图片，多张用英文逗号隔开
      }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.order.sqsh.sqcg'), icon: 'none' })
          setTimeout(() => {
            uni.navigateBack({ delta: 1 })
          }, 1000);
        }
      })
    },
  }
}
</script>
<style>
page {
  background: #f9f9f9;
}
</style>
<style lang="less" scope>
.sh-page {
  //sh-sec1 S
  .sh-sec1 {
    background: #ffff;
    padding: 30rpx 30rpx 0;
    border-radius: 0px 0px 30rpx 30rpx;
    //order-li S
    .order-li {
      background: #ffffff;
      border-radius: 20rpx;
      margin: 20rpx 0 0;
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
        padding: 28rpx 0 30rpx;
        .mid-img {
          width: 155rpx;
          height: 155rpx;
          border-radius: 10rpx;
          overflow: hidden;
          margin-right: 20rpx;
          min-width: 155rpx;
          max-width: 155rpx;
        }
        .mid-txt {
          width: calc(100% - 170rpx);
          .h-flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
            line-height: 36rpx;
            .t {
              font-size: 28rpx;
              line-height: 36rpx;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #000;
              font-weight: 500;
            }
            .num {
              font-size: 24rpx;
              color: #999;
              white-space: nowrap;
              margin-left: 20rpx;
            }
          }
          .flex {
            margin-top: 80rpx;
            align-items: center;
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
        display: flex;
        align-items: center;
        flex: 1;
        .label {
          width: 124rpx;
          margin-right: 10rpx;
          font-size: 28rpx;
          display: flex;
          align-items: center;
          line-height: 1;
          .icon {
            width: 11rpx;
            height: 7rpx;
            min-width: 11rpx;
            max-width: 11rpx;
            margin-left: 10rpx;
          }
        }
        .input {
          width: 300rpx;
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
    position: fixed;
    bottom: 30rpx;
    width: 690rpx;
    left: 30rpx;
    // margin: 50rpx 30rpx;
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