<template>
  <div class="roulette">
    <!-- 返回 -->
    <!-- <view class="head-info">
        <view class="top">
            <image src="/static/images/mine/header_btn_back.png" class="left" @click="toBack()"></image>
        </view>
    </view> -->
    <!-- 选择器 -->
    <view class="LuckyOrwheelSwitch">
        <view class="switch-name" :class="switch_id==1?'switch-select':''" @click="switchId(1)">
            {{$t('ranking.weekly_list')}}
        </view>
        <view class="switch-name" :class="switch_id==2?'switch-select':''" @click="switchId(2)">
            {{$t('ranking.mothly_list')}}
        </view>
    </view>
    <!-- 剩余抽奖次数 -->
    <view class="roulette-title">
        <view class="childTitle">
            <view class="luckyText">{{$t('ranking.mothly_list')}}</view>
            <image src="/static/rouletteWheel/rwStart.png" class="right"></image>
        </view>
        <view>
            <view class="childContent">
                There are still <span>100</span> lucky draws left today
            </view>
        </view>
    </view>
    <!-- 转盘 -->
    <view class="roulette-dynamics">
      <view class="childDynamics">
        <image src="/static/rouletteWheel/roulette-green.png" class="bgTurntable"></image>
        <view  class="cloudBg"></view>
        <view  class="dynamics-shop">
          <image src="/static/rouletteWheel/shopDemo.png" class="shopImage"></image>
        </view>
      </view>
    </view>
    <!-- <div class="roulette-wheel" :style="{ transform: 'rotate(' + rotation + 'deg)' }">
      <div class="roulette-item" v-for="(item, index) in items" :key="index">{{ item }}</div>
    </div> -->
    <!-- <button class="spin-button" @click="spinWheel" :disabled="isSpinning">抽奖</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
        switch_id: 1,
        items: ['奖品1', '奖品2', '奖品3', '奖品4', '奖品5', '奖品6', '奖品7', '奖品8'],
        rotation: 0,
        isSpinning: false
    };
  },
  methods: {
    switchId(e){
        console.log('切换',e);
    },
    toBack() {
        uni.navigateBack()
    },
    spinWheel() {
      if (this.isSpinning) return;
      this.isSpinning = true;
      const randomDegree = Math.floor(Math.random() * 360) + 3600; // 旋转至少3圈，即3600度
      // 模拟旋转动画
      const start = Date.now();
      const animate = () => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - start;

        if (elapsedTime < 3000) {
          this.rotation = (randomDegree / 3000) * elapsedTime;
          requestAnimationFrame(animate);
        } else {
          this.rotation = 0;
          this.isSpinning = false;
          // 在这里可以添加抽奖逻辑，例如确定最终中奖项
        }
      };
      requestAnimationFrame(animate);
    }
  }
};
</script>

<style lang="less" scoped>
.head-info {
    padding-top: 60rpx;
    background-size: 750rpx 900rpx;
    position: absolute;
    z-index: 999;
    width: 100%;
    .top {
        position: fixed;
        width: 100%;
        height: 88rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        image {
            display: block;
            width: 40rpx;
            height: 40rpx;
        }

        .left {
            margin-left: 32rpx;
        }

        .index {
            position: absolute;
            right: 32rpx;
        }
    }
}
.roulette {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #999;
    min-height: 200vh;
    background: url('/static/rouletteWheel/rwBg.png') no-repeat;
    background-size: 100% 100%;
    // 选择框
    .LuckyOrwheelSwitch {
        width: 492rpx;
        height: 64rpx;
        display: flex;
        align-items: center;
        border-radius: 64rpx;
        background: rgba(255, 255, 255, 0.4);
        margin: 0 auto;
        .switch-name {
            width: 50%;
            height: 64rpx;
            line-height: 64rpx;
            font-size: 24rpx;
            color: #0AC68E;
            text-align: center;
            border-radius: 64rpx;
        }

        .switch-select {
            background: linear-gradient(180.00deg, rgb(51, 222, 114),rgb(5, 195, 146) 98.871%);
            color: #fff;
        }
    }
    .roulette-title{
        display: flex;
        flex-direction: column;
        align-items: center;
        .childTitle{
            display: flex;
            .luckyText{
                color: transparent;
                background: linear-gradient(180.00deg, rgb(51, 222, 114),rgb(5, 195, 146));
                background-clip:text;
                text-fill-color:transparent;
                font-size: 75rpx;
                font-weight: 800;
                text-align: left;
            }
            .right{
                width: 100rpx;
                height: 100rpx;
            }
        }
        .childContent{
            color: #0AC68E;
            font-size: 28rpx;
            text-align: center;
            span{
                color: #FFB900;
                font-size: 42rpx;
                font-weight: 800;
            }
        }
    }
    .roulette-dynamics{
      width: 760rpx;
      height: 760rpx;
      position: relative;
      .childDynamics{
        width: 100%;
        height: 100%;
        .bgTurntable{
          width: 100%;
          height: 100%;
        }
        .cloudBg{
          background: url('/static/rouletteWheel/cloudBg.png') no-repeat;
          background-size: 100% 100%;
          width: 100%;
          height: 475rpx;
          margin-top: -667rpx;
        }
        .dynamics-shop{
          
        }
      }
    }
}

.roulette-wheel {
  width: 300px;
  height: 300px;
  border: 5px solid #333;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: transform 3s ease-out;
}

.roulette-item {
  position: absolute;
  width: 100px;
  text-align: center;
  font-size: 16px;
  transform-origin: 50% 100%;
}

.spin-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.spin-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
