<template>
  <view>
    <view v-if="loaded || list.itemIndex < 15" class="uni-indexed-list__title-wrapper">
      <text v-if="list.items && list.items.length > 0" class="uni-indexed-list__title">{{ list.key==='首字母'?'最近使用':list.key }}</text>
    </view>
    <view v-if="(loaded || list.itemIndex < 15) && list.items && list.items.length > 0" class="uni-indexed-list__list">
      <view v-for="(item, index) in list.items" :key="index" class="uni-indexed-list__item" hover-class="uni-indexed-list__item--hover">
        <view class="uni-indexed-list__item-container" @click="onClick(idx, index)">
          <view class="uni-indexed-list__item-border" :class="{'uni-indexed-list__item-border--last':index===list.items.length-1}">
            <view class="title">{{item.name.city}}</view>
            <view class="name">{{item.name.code}}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'UniIndexedList',
  emits: ['itemClick'],
  props: {
    loaded: {
      type: Boolean,
      default: false
    },
    idx: {
      type: Number,
      default: 0
    },
    list: {
      type: Object,
      default () {
        return {}
      }
    },
    showSelect: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick (idx, index) {
      this.$emit("itemClick", {
        idx,
        index
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.uni-indexed-list__list {
  // background-color: $uni-bg-color;
  /* #ifndef APP-NVUE */
  // display: flex;
  /* #endif */
  // flex-direction: column;
  // border-top-style: solid;
  // border-top-width: 1px;
  // border-top-color: #dedede;
}

.uni-indexed-list__item {
  // font-size: 14px;
  /* #ifndef APP-NVUE */
  // display: flex;
  /* #endif */
  // flex: 1;
  // flex-direction: row;
  // justify-content: space-between;
  // align-items: center;
}

.uni-indexed-list__item-container {
  // padding-left: 15px;
  // flex: 1;
  // position: relative;
  /* #ifndef APP-NVUE */
  // display: flex;
  // box-sizing: border-box;
  /* #endif */
  // flex-direction: row;
  // justify-content: space-between;
  // align-items: center;
  /* #ifdef H5 */
  // cursor: pointer;
  /* #endif */
}

.uni-indexed-list__item-border {
  flex: 1;
  position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  box-sizing: border-box;
  /* #endif */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 83rpx;
  padding: 0 33rpx;
  // padding-left: 0;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #f5f5f5;
}

.uni-indexed-list__item-border--last {
  border-bottom-width: 0px;
}

.uni-indexed-list__item-content {
  // flex: 1;
  // font-size: 14px;
  // color: #191919;
}

.uni-indexed-list {
  /* #ifndef APP-NVUE */
  // display: flex;
  /* #endif */
  // flex-direction: row;
}

.uni-indexed-list__title-wrapper {
  /* #ifndef APP-NVUE */
  display: flex;
  width: 100%;
  height: 60rpx;
  line-height: 60rpx;
  /* #endif */
  background: #f9f9f9;
  font-size: 26rpx;
  padding-left: 30rpx;
  color: #000;
}

.uni-indexed-list__title {
  // padding: 6px 12px;
  // line-height: 24px;
  // font-size: 16px;
  // font-weight: 500;
}
.title {
  font-size: 26rpx;
  color: #000;
}
.name {
  font-size: 26rpx;
  color: #999;
}
</style>
