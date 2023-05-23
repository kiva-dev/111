<template>
  <view class="raise-page">
    <view class="raise-box">
      <!--raise-tab start-->
      <view class="raise-tab">
        <view class="li" :class="navId==1?'active':''" @click="onNavClick(1)">{{$t('home.appraise.qb')}}</view>
        <view class="li" :class="navId==2?'active':''" @click="onNavClick(2)">{{$t('home.appraise.hp')}}{{goods_judge}}</view>
        <view class="li" :class="navId==3?'active':''" @click="onNavClick(3)">{{$t('home.appraise.zp')}}{{normal_judge}}</view>
        <view class="li" :class="navId==4?'active':''" @click="onNavClick(4)">{{$t('home.appraise.cp')}}{{bad_judge}}</view>
      </view>
      <!--raise-tab end-->
      <!--detail-four start-->
      <view class="detail-four" v-if="JudgeList.length">
        <JudgeList :JudgeList="JudgeList"></JudgeList>
      </view>
      <view v-else class="zanwusju">
        <image src="/static/images/zanwusju.png" />
        <view class="title">~{{$t('home.zanwushuju')}}~</view>
      </view>
      <!--detail-four end-->
    </view>
  </view>
</template>

<script>import JudgeList from '@/components/judgeList'
export default {
  components: { JudgeList },
  data () {
    return {
      navId: 1,
      id: '',
      JudgeList: [],// 评价列表
      totalPageNum: 0,// 评价总条数
      page: 1,// 页码
      pagenum: 10,// 每页显示商品数目
      goods_judge: 0, //好评数
      normal_judge: 0, //中评数
      bad_judge: 0, //差评数
    }
  },
  onLoad (e) {
    this.id = e.id
    // 评价列表
    this.onOrderGoodsJudgeList()
  },
  methods: {
    onNavClick (e) {
      this.navId = e
      this.page = 1
      this.JudgeList = []
      this.onOrderGoodsJudgeList()
    },
    // 评价列表
    onOrderGoodsJudgeList () {
      this.$http.post(this.$apiObj.OrderGoodsJudgeList, { goods_id: this.id, type: this.navId, page: this.page, pagenum: this.pagenum }).then(res => {
        if (res.code == 1) {
          this.goods_judge = res.data.goods_judge
          this.normal_judge = res.data.normal_judge
          this.bad_judge = res.data.bad_judge
          this.totalPageNum = res.data.list.total
          this.JudgeList = this.page == 1 ? res.data.list.data : [...this.JudgeList, ...res.data.list.data]
        }
      })
    },
  },
  // 页面滑动到底部
  onReachBottom () {
    // 判断是否还有数据
    if (this.totalPageNum <= this.page * this.pagenum) return
    this.page++
    this.onOrderGoodsJudgeList()
  }
}
</script>

<style lang="less" scoped>
.raise-page {
  .raise-box {
    padding: 30rpx;
    .raise-tab {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10rpx;
      .li {
        width: 150rpx;
        height: 60rpx;
        background: #f9f9f9;
        border-radius: 30rpx;
        margin: 10rpx;
        text-align: center;
        line-height: 60rpx;
        font-size: 26rpx;
      }
      .active {
        background: #fc0609;
        border-color: #fc0609;
        color: #fff;
      }
    }
    //detail-four S
    .detail-four {
      background: #fff;

      .four-btn {
        width: 210rpx;
        height: 60rpx;
        border: 1px solid #dddddd;
        border-radius: 30rpx;
        line-height: 60rpx;
        font-size: 24rpx;
        margin: 50rpx auto;
      }
    }
    //detail-four E
  }
}
</style>