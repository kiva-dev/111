<template>
  <view class="bind-page">
    <!--bind-box start-->
    <view class="bind-box">
      <view class="li">
        <view class="label">{{$t('user.bank.yhzh')}}</view>
        <input class="input" placeholder-class="color-999" v-model="account" :placeholder="$t('user.bank.qsryhkh')" />
      </view>
      <view class="li">
        <view class="label">{{$t('user.bank.khyh')}}</view>
        <input class="input" placeholder-class="color-999" v-model="bank_name" :placeholder="$t('user.bank.qsrkhyh')" />
      </view>
      <view class="li">
        <view class="label">{{$t('user.bank.ckr')}}</view>
        <input class="input" placeholder-class="color-999" v-model="name" :placeholder="$t('user.bank.qsrckrxm')" />
      </view>
      <view class="li">
        <view class="label">{{$t('user.bank.gjhkdm')}}</view>
        <input class="input" placeholder-class="color-999" v-model="swift_code" :placeholder="$t('user.bank.qsrgjhkdm')" />
      </view>
      <view class="li">
        <view class="label">{{$t('user.bank.yhklx')}}</view>
        <view class="li-r">
          <text>{{$t('user.bank.cxk')}}</text>
          <!-- <view class="more">
            <image class="img" src="../../static/images/more3.png"></image>
          </view> -->
        </view>
      </view>
      <!--bind-bot start-->
      <view class="bind-bot">
        <button class="public-btn" @click.stop="$noMultipleClicks(onMineAddBankCard)">{{$t('user.bank.qrbd')}}</button>
      </view>
      <!--bind-bot end-->
    </view>
    <!--bind-box end-->
  </view>
</template>

<script>
export default {
  data () {
    return {
      noClick: true, // 防止重复点击 
      account: '',// 银行卡账号
      bank_name: '',// 银行
      name: '',// 姓名
      swift_code: '',// 国际代码
      username: '',// 实名信息
    }
  },
  onShow () {
    // 实名认证
    this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
      if (res.code == 1) {
        this.username = res.data.firstName + res.data.lastName
      }
    })
  },
  methods: {
    onMineAddBankCard () {
      if (!this.account) return uni.showToast({ title: this.$t('user.bank.qsryhkh'), icon: 'none' })
      if (!this.bank_name) return uni.showToast({ title: this.$t('user.bank.qsrkhyh'), icon: 'none' })
      if (!this.name) return uni.showToast({ title: this.$t('user.bank.qsrckrxm'), icon: 'none' })
      // if (!this.swift_code) return uni.showToast({ title: '请输入国际汇款代码', icon: 'none' })
      if (this.username != this.name) return uni.showToast({ title: this.$t('usernames'), icon: 'none' })
      this.$http.post(this.$apiObj.MineAddBankCard, {
        account: this.account,// 银行卡账号
        bank_name: this.bank_name,// 银行
        name: this.name,// 姓名
        swift_code: this.swift_code,// 国际代码
      }).then(res => {
        if (res.code == 1) {
          uni.showToast({ title: this.$t('user.bank.tjcg'), icon: 'none' })
          setTimeout(() => {
            uni.navigateBack({ delta: 1 })
          }, 1000);
        }
      })
    },
    //导航点击的跳转处理函数
    navClick (url) {
      uni.navigateTo({
        url: './bank'
      })
    },
  }
}
</script>

<style lang="less" scoped>
.bind-page {
  .bind-box {
    padding: 0 30rpx;
    .li {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      padding: 30rpx 0;
      justify-content: space-between;
      font-size: 28rpx;
      .input {
        flex: 1;
        margin-left: 20rpx;
        text-align: right;
        font-size: 28rpx;
      }
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
    .bind-bot {
      margin: 80rpx 0;
    }
  }
}
</style>