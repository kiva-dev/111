<template>
  <view class="eva-page">
    <view class="eva-box">
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
      </view>
      <!--order-mid start-->
      <block v-for="item,k in shopCont.goods" :key="k">
        <view class="order-li">
          <view class="order-mid">
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
              <view class="price color-red f-22">
                RM<text class="f-34">{{$filter.formatValue(item.goods_price, 'split')[0]}}</text>.{{$filter.formatValue(item.goods_price, 'split')[1] ? $filter.formatValue(item.goods_price, 'split')[1] : '00'}}
              </view>
            </view>
          </view>
        </view>
        <!--eva-hd start-->
        <view class="eva-hd">
          <view class="label">{{$t('user.order.evaluate.zhpf')}}</view>
          <view class="star">
            <view class="icon" v-for="(i,index) in item.list" :key="index" @click="clickStars(index,item)">
              <image class="img" :src="item.star>index?stara:starb"></image>
            </view>
          </view>
          <view class="tip">{{item.rateScoreText}}</view>
        </view>
        <!--eva-hd end-->
        <!--eva-bd start-->
        <view class="eva-bd">
          <textarea class="text" auto-height v-model="item.content" placeholder-class="color-999" :placeholder="$t('user.order.evaluate.cdgjdpjbp')"></textarea>
        </view>
        <!--eva-bd end-->
        <!--eva-upload start-->
        <view class="eva-upload">
          <view v-if="item.images.length<9" class="xiangji">
            <image src="/static/images/mine/grade9.png" @click="chooseImage(item)" mode="aspectFill" class="update"></image>
          </view>
          <block v-for="(image, index) in item.images" :key="index">
            <view class="xiangji">
              <image :src="baseUrl+image" :data-src="baseUrl+image" mode="aspectFill" @tap="previewImage(image,item)" class="update"></image>
              <view class="guanbi" @tap="delect(index,item)">x</view>
            </view>
          </block>
        </view>
        <!--eva-upload end-->
      </block>
      <!--eva-bot start-->
      <view class="eva-bot">
        <button class="public-btn" @click.stop="$noMultipleClicks(onOrderJudgeOrder)">{{$t('user.order.evaluate.tjpj')}}</button>
      </view>
      <!--eva-bot end-->
    </view>
  </view>
</template>
<script> 
export default {
  data () {
    return {
      noClick: true, // 防止重复点击 
      order_no: '',// 订单号
      shopCont: '',
      rateScoreDesc: [this.$t('user.order.evaluate.fcc'), this.$t('user.order.evaluate.ca'), this.$t('user.order.evaluate.yiban'), this.$t('user.order.evaluate.hao'), this.$t('user.order.evaluate.fch')],
      stara: '../../../static/images/star1.png',//亮星星
      starb: '../../../static/images/star2.png',//暗星星
      baseUrl: this.$baseUrl,
      isShopCont: false,// 商品详情显示中文还是英文
    }
  },
  onLoad (e) {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    console.log(this.$baseUrl)
    this.order_no = e.order_no
    this.onOrderWaitJudgeGoods()
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
    // 上传图片
    chooseImage (item) {
      this.show = false
      uni.chooseImage({
        count: 1,
        size: 10 * 1000000,
        sizeType: ['compressed'],
        success: (res) => {
          uni.showLoading({
            title: this.$t('user.order.evaluate.scz') + "...",
            mask: true
          });
          this.resImg = res.tempFilePaths[0] //这就是要的blod
          this.uploadImg(this.resImg, item)
        }
      })
    },
    //-----------------------------------------------结束
    uploadImg (tempFilePaths, item) {
      // console.log(tempFilePaths, "触发上传接口")
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
            item.images.push(data.data.url);
            uni.showToast({ title: this.$t('user.order.evaluate.sccg'), icon: 'none', duration: 1000 });
          } else {
            uni.showToast({
              title: this.$t('user.order.evaluate.scsb'),
              icon: 'none',
              duration: 1000
            });
          }
        }
      });
    },
    previewImage: function (e, item) {
      console.log(e)
      var current = this.$baseUrl + e
      console.log(current)
      uni.previewImage({
        current: current,
        urls: item.images
      });
    },
    delect (index, item) {
      uni.showModal({
        title: this.$t('user.order.evaluate.tishi'),
        content: this.$t('user.order.evaluate.sfyscgtp'),
        success: res => {
          if (res.confirm) {
            item.images.splice(index, 1);
            // this.numTel = item.images.length;
          }
        }
      });
    },
    clickStars (i, item) {
      item.rateScoreText = this.rateScoreDesc[i]
      item.star = i + 1
    },
    // 获取订单
    onOrderWaitJudgeGoods () {
      this.$http.post(this.$apiObj.OrderWaitJudgeGoods, { order_no: this.order_no }).then(res => {
        if (res.code == 1) {
          res.data.goods.map(item => [
            item.star = '',
            item.list = [0, 1, 2, 3, 4],
            item.rateScoreText = '',
            item.content = '',
            item.images = []
          ])
          if (this.isShopCont) {
            res.data.goods.map(item => {
              item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(item.goods_name, 1) : item.goods_name
              // item.goods_attrs = this.getCaption(item.goods_attrs, 1) ? this.getCaption(item.goods_attrs, 1) : item.goods_attrs
            })
          } else {
            res.data.goods.map(item => {
              item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(item.goods_name, 0) : item.goods_name
              // item.goods_attrs = this.getCaption(item.goods_attrs, 1) ? this.getCaption(item.goods_attrs, 1) : item.goods_attrs
            })
          }
          this.shopCont = res.data
        }
      })
    },
    onOrderJudgeOrder () {
      let data = []
      for (let i in this.shopCont.goods) {
        if (!this.shopCont.goods[i].star) return uni.showToast({ title: this.$t('user.order.evaluate.qxzxx'), icon: 'none' })
        if (!this.shopCont.goods[i].content) return uni.showToast({ title: this.$t('user.order.evaluate.qsrpj'), icon: 'none' })
        if (this.shopCont.goods[i].images.length == 0) return uni.showToast({ title: this.$t('user.order.evaluate.qsczp'), icon: 'none' })
        let shop = { order_goods_id: this.shopCont.goods[i].id, star: this.shopCont.goods[i].star, content: this.shopCont.goods[i].content, images: this.shopCont.goods[i].images.toString() }
        data.push(shop)
      }
      this.$http.post(this.$apiObj.OrderJudgeOrder, { order_no: this.order_no, data: JSON.stringify(data) }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.order.evaluate.pjcg'), icon: 'none' })
          setTimeout(() => {
            uni.navigateBack({ delta: 1 })
          }, 1000);
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.eva-page {
  .eva-box {
    padding: 30rpx;
    .eva-hd {
      display: flex;
      align-items: center;
      .star {
        display: flex;
        .icon {
          width: 26rpx;
          height: 26rpx;
          margin: 0 12rpx;
        }
      }
      .tip {
        font-size: 24rpx;
        color: #999;
      }
      .label {
        font-size: 26rpx;
        font-weight: 550;
      }
    }
    .eva-bd {
      padding: 20rpx 0;
      .text {
        font-size: 24rpx;
        width: 100%;
        min-height: 150rpx;
      }
    }
    .eva-upload {
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
    .eva-bot {
      margin-top: 30rpx;
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
        padding: 0 30rpx 0rpx 30rpx;
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
}
</style>