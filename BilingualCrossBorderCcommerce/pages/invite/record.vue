<template>
  <view class="record-page">
    <view class="header">
      <!-- 邀请数：invite_num
      点击数：click_num -->
      <view class="li">{{$t('djs')}}:{{userCont.click_num}}</view>
      <view class="li">{{$t('yqs')}}:{{userCont.invite_num}}</view>
    </view>
    <view class="record-box" v-if="InviteList.length">
      <view class="record-li" v-for="item in InviteList" :key="item.id">
        <view class="dl">
          <view class="dt">
            <image class="img" :src="item.avatar"></image>
          </view>
          <view class="dd">{{item.nickname?item.nickname:'u'+item.id}}</view>
        </view>
        <view class="date">{{$t('time')}}：{{$filter.to_date_time(item.addtime)}}</view>
      </view>
    </view>
    <view v-else class="zanwusju">
      <image src="/static/images/zanwusju.png" />
      <view class="title">~{{$t('home.zanwushuju')}}~</view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      page: 1,// 页码
      pagenum: 10,// 每页显示商品数目
      totalPageNum: 0,// 总条数
      InviteList: [],
      userCont: {}
    }
  },
  onShow () {
    this.$http.post(this.$apiObj.MineInfo).then(res => {
      if (res.code == 1) {
        this.userCont = res.data
      }
    })
    this.page = 1
    this.InviteList = []
    this.onMineInviteList()
  },
  methods: {
    onMineInviteList () {
      this.$http.post(this.$apiObj.MineInviteList, { page: this.page, pagenum: this.pagenum, }).then(res => {
        if (res.code == 1) {
          this.totalPageNum = res.data.total
          this.InviteList = this.page == 1 ? res.data.data : [...this.InviteList, ...res.data.data]
        }
      })
    }
  },
  // 页面滑动到底部
  onReachBottom () {
    // 判断是否还有数据
    if (this.totalPageNum <= this.page * this.pagenum) return
    this.page++
    this.onMineInviteList()
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 30rpx;
  .li {
    font-size: 32rpx;
  }
}
.record-page {
  .record-box {
    margin: 0 30rpx;
    .record-li {
      padding: 30rpx 0;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .dl {
        display: flex;
        align-items: center;
        .dd {
          font-size: 28rpx;
          font-weight: 550;
        }
        .dt {
          width: 60rpx;
          height: 60rpx;
          border-radius: 100%;
          min-width: 60rpx;
          max-width: 60rpx;
          margin-right: 25rpx;
          overflow: hidden;
        }
      }
      .date {
        font-size: 26rpx;
        color: #999;
        white-space: nowrap;
      }
    }
  }
}
</style>