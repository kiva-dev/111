<template>
  <view class="detail-page">
    <!--detail-head start-->
    <view class="detail-head" v-if="shopCont.status=='-2'">
      <view class="t">{{$t('user.refund.detail.sqyqx')}}</view>
    </view>
    <view class="detail-head" v-if="shopCont.status=='-1'">
      <view class="t color-red">{{$t('user.refund.detail.tksb')}}</view>
      <view class="c">{{$filter.to_date_time(shopCont.refuse_time)}}</view>
    </view>
    <view class="detail-head" v-if="shopCont.status==0">
      <view class="t">{{$t('user.refund.detail.sjzcl')}}</view>
      <view class="c">
        <view class="color-red">
          <u-count-down :time="shopCont.remain_deal_time * 1000" format="DD:HH:mm" autoStart millisecond @change="onChange">
            <view class="time"> <text class="time__item">{{ timeData.days }}{{$t('user.refund.detail.day')}}</text>
              <text class="time__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}{{$t('user.refund.detail.shi')}}</text>
              <text class="time__item">{{ timeData.minutes }}{{$t('user.refund.detail.fen')}}</text>
            </view>
          </u-count-down>
        </view>{{$t('user.refund.detail.hsjwcljzdcl')}}
      </view>
    </view>
    <view class="detail-head" v-if="shopCont.status==1">
      <view class="t">{{$t('user.refund.detail.qjhsp')}}</view>
      <view class="c">{{$t('user.refund.detail.qingzai')}}<view class="color-red">
          <u-count-down :time="shopCont.tui_deal_time * 1000" format="DD:HH:mm" autoStart millisecond @change="onChange">
            <view class="time"> <text class="time__item">{{ timeData.days }}{{$t('user.refund.detail.day')}}</text>
              <text class="time__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}{{$t('user.refund.detail.shi')}}</text>
              <text class="time__item">{{ timeData.minutes }}{{$t('user.refund.detail.fen')}}</text>
            </view>
          </u-count-down>
        </view>{{$t('user.refund.detail.ntxkddh')}}</view>
    </view>
    <view class="detail-head" v-if="shopCont.status==2">
      <view class="t">{{$t('user.refund.detail.ddspsh')}}</view>
      <view class="c">{{$t('user.refund.detail.mjsdhjcww')}}</view>
    </view>
    <view class="detail-head" v-if="shopCont.status==3">
      <view class="t">{{$t('user.refund.detail.sjyfh')}}</view>
      <view class="c">{{$t('user.refund.detail.sjywnjhghsp')}}</view>
    </view>
    <block v-if="shopCont.refund_type==4">
      <view class="detail-head" v-if="shopCont.status==4">
        <view class="t">{{$t('user.refund.detail.hhcg')}}</view>
        <view class="c">{{$filter.to_date_time(shopCont.end_time)}}</view>
      </view>
    </block>
    <block v-else>
      <view class="detail-head" v-if="shopCont.status==4">
        <view class="t">
          <block v-if="shopCont.refund_type==1">{{$t('user.refund.detail.thtkcg')}}</block>
          <block v-if="shopCont.refund_type==2">{{$t('user.refund.detail.thcg')}}</block>
          <block v-if="shopCont.refund_type==3">{{$t('user.refund.detail.tkcg')}}</block>
          <block v-if="shopCont.refund_type==4">{{$t('user.refund.detail.hhcg')}}</block>
        </view>
        <view class="c">{{$filter.to_date_time(shopCont.end_time)}}</view>
      </view>
      <view class="jinerCont" v-if="shopCont.status==4&&shopCont.refund_type!=2">
        <view class="zongjine">
          <view class="title">{{$t('user.refund.detail.thzje')}}</view>
          <view class="num">RM<text class="f-34">{{$filter.formatValue(shopCont.refund_money, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.refund_money, 'split')[1] ? $filter.formatValue(shopCont.refund_money, 'split')[1] : '00'}}</view>
        </view>
        <view class="jiner">
          <view class="title">{{$t('user.refund.detail.jeythzfzh')}}</view>
          <view class="num">RM<text class="f-34">{{$filter.formatValue(shopCont.refund_money, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.refund_money, 'split')[1] ? $filter.formatValue(shopCont.refund_money, 'split')[1] : '00'}}</view>
        </view>
      </view>
    </block>
    <!--detail-head end-->
    <!--detail-sec1 start-->
    <view class="detail-sec1" v-if="shopCont.status=='-2'||shopCont.status=='-1'||shopCont.status==0||shopCont.status==1||shopCont.status==2||shopCont.status==3">
      <view class="li-hd" v-if="shopCont.status=='-2'||shopCont.status=='-1'||shopCont.status==0||shopCont.status==1||shopCont.status==2||shopCont.status==3">
        <view class="hd-fl">
          <view class="icon">
            <image class="img" src="../../../static/images/index/dianpu.png"></image>
          </view>
          <view class="name">{{shopCont.shop_name}}</view>
          <view class="more">
            <image class="img" src="../../../static/images/more.png"></image>
          </view>
        </view>
        <view class="contact" @click="onkefyu">
          <view class="icon">
            <image class="img" src="../../../static/images/icon4.png"></image>
          </view>
          <text>{{$t('user.refund.detail.lxsj')}}</text>
        </view>
      </view>
      <view class="li-text" v-if="shopCont.status==1||shopCont.status==2||shopCont.status==3">
        <view>{{$t('user.refund.detail.thdz')}}：{{shopCont.con_name}} +{{shopCont.shop_mobile_area_code}} {{shopCont.shop_mobile}}</view>
        <view>{{shopCont.shop_address}}</view>
      </view>
      <view class="li-text" v-if="shopCont.status=='-2'||shopCont.status=='-1'||shopCont.status==0">{{$t('user.refund.detail.wmysdndsq')}}</view>
      <block v-if="shopCont.tui_deal_time">
        <view class="fill-btn" v-if="shopCont.status==1" @click="toggle2('center')">{{$t('user.refund.detail.txkddh')}}</view>
      </block>
    </view>
    <!--detail-sec1 end-->
    <view class="detail-line" v-if="shopCont.status==2"></view>
    <view class="kuaidiCont" v-if="shopCont.status==2||shopCont.status==3||shopCont.refund_type==4&&shopCont.status==4">
      <view class="title">{{$t('user.refund.detail.thwl')}}：{{shopCont.tui_express_company}} {{shopCont.tui_express_no}}</view>
      <view class="fuzhi" @click="onCopy(shopCont.tui_express_no)">{{$t('user.refund.detail.fuzhi')}}</view>
    </view>
    <view class="kuaidiCont" v-if="shopCont.status==3||shopCont.refund_type==4&&shopCont.status==4">
      <view class="title">{{$t('user.refund.detail.hhwl')}}：{{shopCont.exchange_express_company}} {{shopCont.exchange_express_no}}</view>
      <view class="fuzhi" @click="onCopy(shopCont.exchange_express_no)">{{$t('user.refund.detail.fuzhi')}}</view>
    </view>
    <view class="detail-line"></view>
    <!--detail-sec2 start-->
    <view class="detail-sec2">
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
            <view class="num">*{{shopCont.num}}</view>
          </view>
          <view class="flex flex-between">
            <view class="price color-red f-22">
              RM<text class="f-34">{{$filter.formatValue(shopCont.goods_price, 'split')[0]}}</text>.{{$filter.formatValue(shopCont.goods_price, 'split')[1] ? $filter.formatValue(shopCont.goods_price, 'split')[1] : '00'}}
            </view>
          </view>
        </view>
      </view>
      <!--order-mid end-->
      <view class="detail-li">
        <view class="label">{{$t('user.refund.detail.sccyddbhg')}}:</view>
        <view class="c">{{shopCont.order_no}}</view>
      </view>
      <view class="detail-li">
        <view class="label">{{$t('user.refund.detail.ddbh')}}:</view>
        <view class="c">{{shopCont.refund_no}}</view>
      </view>
      <view class="detail-li">
        <view class="label">{{$t('user.refund.detail.sqje')}}：</view>
        <view class="c">RM{{shopCont.refund_money}}</view>
      </view>
      <view class="detail-li">
        <view class="label" v-if="shopCont.refund_type==4">{{$t('user.refund.detail.hhyy')}}：</view>
        <view class="label" v-else>{{$t('user.refund.detail.tkyy')}}：</view>
        <view class="c">{{shopCont.remark}}</view>
      </view>
      <view class="detail-li">
        <view class="label">{{$t('user.refund.detail.sqzt')}}：</view>
        <view class="c" v-if="shopCont.refund_type==1">{{$t('user.refund.detail.thtk')}}</view>
        <view class="c" v-if="shopCont.refund_type==2">{{$t('user.refund.detail.jth')}}</view>
        <view class="c" v-if="shopCont.refund_type==3">{{$t('user.refund.detail.jtk')}}</view>
        <view class="c" v-if="shopCont.refund_type==4">{{$t('user.refund.detail.huanhuo')}}</view>
      </view>
      <view class="detail-li">
        <view class="label">{{$t('user.refund.detail.sqsj')}}：</view>
        <view class="c">{{$filter.to_date_time(shopCont.addtime)}}</view>
      </view>
    </view>
    <!--detail-sec2 end-->
    <!--order-fixed start-->
    <view class="order-fixed" v-if="shopCont.status==0||shopCont.status=='-1'||shopCont.status==1||shopCont.status==3">
      <view class="fixed-con">
        <view style="color:#FC0609;font-size:26rpx;display:flex;align-items: center;" v-if="shopCont.status==3">
          <u-count-down :time="shopCont.auto_receipt_time * 1000" format="HH:mm:ss"></u-count-down>{{$t('user.refund.detail.hozidsh')}}
        </view>
        <view class="fixed-fr">
          <button class="order-gray" style="font-size:30rpx;" v-if="shopCont.status==0" @click="toggle1('center')">{{$t('user.refund.detail.chexsq')}}</button>
          <!-- <button class="order-gray">再次申请</button> -->
          <button class="order-btn" style="font-size:30rpx;" v-if="shopCont.status==3" @click="onquerrenshouhuo">{{$t('user.refund.detail.querensh')}}</button>
          <button class="order-btn" style="font-size:30rpx;" v-if="shopCont.status=='-1'" @click="onkefyu2">{{$t('user.refund.detail.ptjr')}}</button>
        </view>
      </view>
    </view>
    <!--order-fixed end-->
    <!--撤销申请弹出 start-->
    <uni-popup ref="popup1" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-c">
            <text class="f-32">{{$t('user.refund.detail.qdycxbctkthsqm')}}</text>
          </view>
          <view class="pop-b">
            <button class="pop-btn" @click="toggle1Close">{{$t('user.refund.detail.query')}}</button>
            <button class="pop-btn red" @click.stop="$noMultipleClicks(onAfterCancel)">{{$t('user.refund.detail.btnsub')}}</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--撤销申请弹出 start-->
    <!--物流快递弹出 start-->
    <uni-popup ref="popup2" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <view class="fill-pop">
            <view class="fill-li">
              <input class="input" placeholder-class="color-999" v-model="tui_express_company" :placeholder="$t('user.refund.detail.qtxnfhdkdgs')" />
              <!-- <uni-data-select v-model="value" :localdata="range" @change="change" :clear="false"></uni-data-select> -->
              <!-- <image class="more" src="../../../static/images/more4.png"></image> -->
            </view>
            <view class="fill-li">
              <input class="input" placeholder-class="color-999" v-model="tui_express_no" :placeholder="$t('user.refund.detail.qtxnfhdwldh')" />
            </view>
          </view>
          <view class="pop-b">
            <button class="pop-btn" @click="toggle2Close">{{$t('user.refund.detail.query')}}</button>
            <button class="pop-btn red" @click.stop="$noMultipleClicks(onAfterTuiExpress)">{{$t('user.refund.detail.btnsub')}}</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--物流快递弹出 start-->
    <!--确定已收到商品弹出 start-->
    <uni-popup ref="popup3" type="center">
      <view class="public-pop">
        <view class="pop-con">
          <view class="pop-c">
            <text class="f-32">{{$t('user.refund.detail.qdysdsp')}}</text>
          </view>
          <view class="pop-b">
            <button class="pop-btn" @click="toggle3Close">{{$t('user.refund.detail.query')}}</button>
            <button class="pop-btn red" @click.stop="$noMultipleClicks(onAfterReceipteGoods)">{{$t('user.refund.detail.btnsub')}}</button>
          </view>
        </view>
      </view>
    </uni-popup>
    <!--确定已收到商品弹出 start-->
    <!--联系客服弹出 start-->
    <uni-popup ref="popup3" type="center">
      <view class="email-cont">
        <image class="query" @click="onQuery" src="../../../static/images/close1.png"></image>
        <view class="title">{{$t('kefu.title')}}</view>
        <view class="cont">
          <view class="list">
            <image class="invite-tobu" src="../../../static/email.png"></image>cs-reply@kolibrimall.com
          </view>
          <view class="list">
            <image class="invite-tobu" src="../../../static/email.png"></image>info@kolibrimall.com
          </view>
          <view class="list">
            <image class="invite-tobu" src="../../../static/email.png"></image>reply@kolibrimall.com
          </view>
          <view class="list">
            <image class="invite-tobu" src="../../../static/email.png"></image>support@kolibrimall.com
          </view>
          <view class="list">
            <image class="invite-tobu" src="../../../static/email.png"></image>help@kolibrimall.com
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  data () {
    return {
      noClick: true, // 防止重复点击 
      shopCont: '',
      id: '',
      timeData: {},
      tui_express_company: '',// 快递公司
      tui_express_no: '',// 快递单号
      isShopCont: false,// 商品详情显示中文还是英文
    }
  },
  onLoad (e) {
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    this.id = e.id
    this.onAfterDetail()
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
    onkefyu () {
      this.$refs.popup3.open()
      // uni.navigateTo({
      //   url: '/pages/mine/custom?uuid=' + this.shopCont.admin_id + '&avatar=' + uni.getStorageSync('userCont').avatar
      // })
    },
    onkefyu2 () {
      this.$refs.popup3.open()
      // uni.navigateTo({
      //   url: '/pages/mine/custom?uuid=1&avatar=' + uni.getStorageSync('userCont').avatar
      // })
    },
    onQuery () {
      this.$refs.popup3.close()
    },
    onChange (e) {
      this.timeData = e
    },
    // 详情
    onAfterDetail () {
      this.$http.post(this.$apiObj.AfterDetail, { after_id: this.id }).then(res => {
        if (res.code == 1) {
          if (this.isShopCont) {
            res.data.goods_name = this.getCaption(res.data.goods_name, 1) ? this.getCaption(res.data.goods_name, 1) : res.data.goods_name
          } else {
            res.data.goods_name = this.getCaption(res.data.goods_name, 0) ? this.getCaption(res.data.goods_name, 0) : res.data.goods_name
          }
          this.shopCont = res.data
        }
      })
    },
    // 撤销申请
    onAfterCancel () {
      this.$http.post(this.$apiObj.AfterCancel, { after_id: this.id }).then(res => {
        if (res.code == 1) {
          this.$refs.popup1.close()
          uni.showToast({ icon: 'none', title: this.$t('user.refund.detail.cxsqcg') })
          this.onAfterDetail()
        }
      })
    },
    // 退款物流
    onAfterTuiExpress () {
      if (!this.tui_express_company) return uni.showToast({ icon: 'none', title: this.$t('user.refund.detail.qsrkdgs') })
      if (!this.tui_express_no) return uni.showToast({ icon: 'none', title: this.$t('user.refund.detail.qsrkdbh') })
      this.$http.post(this.$apiObj.AfterTuiExpress, { after_id: this.id, tui_express_company: this.tui_express_company, tui_express_no: this.tui_express_no }).then(res => {
        if (res.code == 1) {
          this.$refs.popup2.close()
          uni.showToast({ icon: 'none', title: this.$t('user.refund.detail.tjiaocg') })
          this.onAfterDetail()
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
      uni.showToast({ icon: 'none', title: this.$t('user.refund.detail.fuzhicg') })
      oInput.remove()
      // #endif
      // #ifndef H5
      uni.setClipboardData({
        data: e,
        success: () => {
          uni.showToast({ icon: 'none', title: this.$t('user.refund.detail.fuzhicg') })
        }
      });
      // #endif
    },
    onquerrenshouhuo () {
      this.$refs.popup3.open()
    },
    toggle3Close () {
      this.$refs.popup3.close()
    },
    // 确认收货
    onAfterReceipteGoods () {
      this.$http.post(this.$apiObj.AfterReceipteGoods, { after_id: this.id }).then(res => {
        if (res.code == 1) {
          this.$refs.popup3.close()
          uni.showToast({ icon: 'none', title: this.$t('user.refund.detail.shcg') })
          this.onAfterDetail()
        }
      })
    },
    change (e) {
      console.log('e:', e);
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
    toggle2 () {
      this.$refs.popup2.open()
    },
    toggle2Close () {
      this.$refs.popup2.close()
    },
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
    //导航点击的跳转处理函数
    navClick (url) {
      uni.navigateTo({
        url
      })
    },
  }
}
</script>

<style lang="less" scoped>
.detail-page {
  padding-bottom: 100rpx;
  .detail-head {
    padding: 40rpx 30rpx;
    font-size: 26rpx;
    .t {
      font-size: 32rpx;
      font-weight: 550;
    }
    .c {
      font-size: 26rpx;
      margin-top: 15rpx;
      display: flex;
      align-items: center;
    }
    border-bottom: 1px solid #f5f5f5;
  }
  //detail-sec1 S
  .detail-sec1 {
    padding: 30rpx;
    //li-hd E
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
        line-height: 1;
        .icon {
          width: 26rpx;
          height: 26rpx;
          min-width: 26rpx;
          max-width: 26rpx;
          margin-right: 15rpx;
        }
        .more {
          width: 10rpx;
          height: 18rpx;
          min-width: 10rpx;
          margin-left: 15rpx;
        }
        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .contact {
        display: flex;
        align-items: center;
        line-height: 1;
        font-size: 26rpx;
        white-space: nowrap;
        .icon {
          width: 26rpx;
          height: 25rpx;
          min-width: 26rpx;
          max-width: 26rpx;
          margin-right: 15rpx;
        }
      }
    }
    //li-hd E
    .li-text {
      background: #f9f9f9;
      border-radius: 20rpx;
      margin-top: 30rpx;
      padding: 20rpx;
      font-size: 26rpx;
      line-height: 1.6;
    }

    .fill-btn {
      height: 80rpx;
      border: 1px solid #dfdfdf;
      border-radius: 10rpx;
      margin: 30rpx 0;
      line-height: 80rpx;
      text-align: center;
      font-size: 28rpx;
    }
  }
  //detail-sec1 E
  .detail-line {
    height: 15rpx;
    background: #f9f9f9;
  }
  //detail-sec2 S
  .detail-sec2 {
    padding: 30rpx;
    //order-mid S
    .order-mid {
      display: flex;
      padding: 10rpx 0;
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
    //order-mid E
    .detail-li {
      padding: 20rpx 0;
      font-size: 26rpx;
      line-height: 34rpx;
      display: flex;
      align-items: center;
      .label {
        margin-right: 10rpx;
        white-space: nowrap;
      }
    }
  }
  //detail-sec2 E
  //order-fixed S
  .order-fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    box-shadow: 0px 0px 20rpx 0px rgba(153, 153, 153, 0.1);
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
      font-size: 16rpx;
      color: #999;
    }
  }
  //order-fixed E

  .fill-pop {
    .fill-li {
      margin: 20rpx 0;
      background: #f9f9f9;
      border-radius: 20rpx;
      padding: 10rpx 20rpx;
      position: relative;
      /deep/ .uni-select {
        border: none;
      }
      .more {
        width: 18rpx;
        height: 10rpx;
        position: absolute;
        right: 20rpx;
        top: 50%;
        margin-top: -5rpx;
      }
      .input {
        font-size: 28rpx;
        width: 100%;
        height: 70rpx;
      }
    }
  }
}
.kuaidiCont {
  line-height: 95rpx;
  display: flex;
  justify-content: space-between;
  padding: 0 30rpx;
  .title {
    font-size: 28rpx;
    color: #000;
  }
  .fuzhi {
    font-size: 28rpx;
    color: #fc0609;
  }
}
.jinerCont {
  padding: 30rpx;
  .zongjine {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #ff0000;
    font-weight: bold;
  }
  .jiner {
    margin-top: 10rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28rpx;
    color: #000;
    font-weight: bold;
  }
}
/deep/.u-count-down__text {
  color: #fc0609 !important;
  font-size: 26rpx !important;
}
</style>