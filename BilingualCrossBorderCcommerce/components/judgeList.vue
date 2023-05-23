<template>
  <view>
    <!--four-li start-->
    <view v-for="item in JudgeList" :key="item.addtime" class="four-li">
      <view class="li-hd">
        <view class="hd-fl">
          <view class="pic">
            <image class="img" :src="item.avatar"></image>
          </view>
          <view class="txt">
            <view class="t">{{item.nickname}}</view>
            <view class="star">
              <view v-for="items,j in item.star" :key="j" class="icon">
                <image class="img" src="/static/images/star1.png"></image>
              </view>
              <view v-for="i in (5-item.star)" :key="i+10" class="icon">
                <image class="img" src="/static/images/star2.png"></image>
              </view>
            </view>
          </view>
        </view>
        <view class="date">{{$filter.to_date_times(item.addtime)}}</view>
      </view>
      <view class="li-bd">{{item.content}}</view>
      <view class="li-img" v-if="item.images">
        <view v-for="items,k in item.images" :key="k" class="small">
          <image class="img" :src="items"></image>
        </view>
      </view>
    </view>
    <!--four-li end-->
  </view>
</template>

<script>
export default {
  props: ['JudgeList'],
  components: {},
  data () {
    return {}
  },
  onLoad () { },
  methods: {}
}
</script>

<style lang="less" scoped>
.four-li {
  margin: 30rpx 0;
  .li-hd {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .date {
      font-size: 26rpx;
    }
    .hd-fl {
      display: flex;
      align-items: center;
      .pic {
        width: 52rpx;
        height: 52rpx;
        border-radius: 100%;
        overflow: hidden;
        min-width: 52rpx;
        margin-right: 20rpx;
      }
      .txt {
        .t {
          font-size: 26rpx;
        }
        .star {
          display: flex;
          margin-top: 10rpx;
          .icon {
            width: 18rpx;
            height: 18rpx;
            margin-right: 10rpx;
          }
        }
      }
    }
  }

  .li-bd {
    margin: 20rpx 0;
    font-size: 26rpx;
    line-height: 36rpx;
  }
  .li-img {
    display: flex;
    overflow-x: auto;
    width: 100%;
    white-space: nowrap;
    .small {
      width: 190rpx;
      height: 190rpx;
      margin-right: 18rpx;
      min-width: 190rpx;
    }
  }
}
</style>