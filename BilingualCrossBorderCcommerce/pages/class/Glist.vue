<template>
  <view class="gain-page">
    <!--gain-head start-->
    <view class="gain-head">
      <view class="icon" @click="onIndexGoodsList">
        <image class="img" src="../../static/images/search1.png"></image>
      </view>
      <input type="text" placeholder-class="color-999" :placeholder="$t('shop.qsrssgjc')" v-model="keyword">
    </view>
    <!--gain-head end-->
    <!--gain-box start-->
    <view class="gain-box">
      <!--gain-choice start-->
      <view class="gain-choice">
        <view class="li" :class="sort==1?'active':''" @click="onZonghe">
          <text>{{$t('shop.zonghe')}}</text>
          <view class="down-icon" v-if="sort==1">
            <image class="img default" src="../../static/images/icon1.png"></image>
          </view>
          <view class="down-icon" v-else>
            <image class="img default" src="../../static/images/icon2.png"></image>
            <!-- <image class="img selected" src="../../static/images/icon1.png"></image> -->
          </view>
        </view>
        <view class="li" :class="sort==2?'active':sort==3?'active':''" @click="onXiaoliang">
          <text>{{$t('shop.xl')}}</text>
          <block v-if="sort==2">
            <view class="up-icon">
              <image class="img" src="../../static/images/icon3.png"></image>
            </view>
            <view class="down-icon">
              <image class="img selected" src="../../static/images/icon1.png"></image>
            </view>
          </block>
          <block v-else-if="sort==3">
            <view class="up-icon">
              <image class="img" src="../../static/images/icon17.png"></image>
            </view>
            <view class="down-icon">
              <image class="img selected" src="../../static/images/icon2.png"></image>
            </view>
          </block>
          <block v-else>
            <view class="up-icon">
              <image class="img" src="../../static/images/icon3.png"></image>
            </view>
            <view class="down-icon">
              <image class="img selected" src="../../static/images/icon2.png"></image>
            </view>
          </block>
        </view>
        <view class="li" :class="sort==4?'active':sort==5?'active':''" @click="onMouth">
          <text>{{$t('shop.jiage')}}</text>
          <block v-if="sort==4">
            <view class="up-icon">
              <image class="img" src="../../static/images/icon3.png"></image>
            </view>
            <view class="down-icon">
              <image class="img selected" src="../../static/images/icon1.png"></image>
            </view>
          </block>
          <block v-else-if="sort==5">
            <view class="up-icon">
              <image class="img" src="../../static/images/icon17.png"></image>
            </view>
            <view class="down-icon">
              <image class="img selected" src="../../static/images/icon2.png"></image>
            </view>
          </block>
          <block v-else>
            <view class="up-icon">
              <image class="img" src="../../static/images/icon3.png"></image>
            </view>
            <view class="down-icon">
              <image class="img selected" src="../../static/images/icon2.png"></image>
            </view>
          </block>
        </view>
      </view>
      <!--gain-choice end-->
      <!--att-goods start-->
      <view class="att-goods" v-if="GoodsList.length">
        <navigator :url="'./Gdetail?id='+item.goods_id" hover-class="none" class="goods" v-for="item in GoodsList" :key="item.goods_id">
          <view class="goods-con">
            <view class="goods-img">
              <image class="img" style="border-radius: 20rpx;" :src="item.image"></image>
              <view class="goods-tip" v-if="item.tag_name">{{item.tag_name}}</view>
            </view>
            <view class="goods-t">{{ item.goods_name }}</view>
            <view class="goods-m">
              <view class="price">
                RM<text class="f-34">{{ item.goods_price }}</text>
              </view>
              <view class="sale">{{$t('shop.xl')}}{{item.sales_actual}}</view>
            </view>
            <view class="goods-b" @click.stop="onshopCont(item)">
              <view class="icon">
                <image class="img" src="../../static/images/index/dianpu.png"></image>
              </view>
              <view class="name">{{item.shop_name}}</view>
              <view class="more">
                <image class="img" src="../../static/images/index/more.png"></image>
              </view>
            </view>
          </view>
        </navigator>
      </view>
      <view v-else class="zanwusju">
        <image src="/static/images/zanwusju.png" />
        <view class="title">~{{$t('home.zanwushuju')}}~</view>
      </view>
      <!--att-goods end-->
    </view>
    <!--gain-box end-->
  </view>
</template>
<script>
export default {
  data () {
    return {
      GoodsList: [],// 商品列表
      page: 1,// 页码
      pagenum: 10,// 每页显示商品数目
      c_id: '',// 一级分类id
      sort: '',// 1最新，2销量高到低，3销量低到高，4价格高到低，5价格低到高
      keyword: '',// 搜索关键词
      recom: '',// 1推荐商品，0未推荐商品，空字符串全部商品
      goods_type: 1,// 1普通商品，2团购商品，除团购模块都传1
      s_id: '',// 二级分类id
      totalPageNum: 0,// 总条数
      isShopCont: false,// 中文还是英文
      admin_id: "",// 店铺id
    }
  },
  watch: {
    keyword: {
      handler (e, m) {
        this.onIndexGoodsList()
      }
    },
  },
  onLoad (args) {
    if (args.admin_id) {
      this.admin_id = args.admin_id
    }
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
    uni.setNavigationBarTitle({
      title: args.name
    })
    this.s_id = args.id
  },
  onShow () {
    this.page = 1
    // 商品列表 
    this.onIndexGoodsList()
  },
  methods: {
    // 点击综合
    onZonghe () {
      this.page = 1
      this.sort = 1
      this.GoodsList = []
      this.onIndexGoodsList()
    },
    // 点击销量
    onXiaoliang () {
      this.page = 1
      this.sort = this.sort == 2 ? 3 : 2
      this.GoodsList = []
      this.onIndexGoodsList()
    },
    // 点击价格
    onMouth () {
      this.page = 1
      this.sort = this.sort == 4 ? 5 : 4
      this.GoodsList = []
      this.onIndexGoodsList()
    },
    getCaption (str, state) {
      if (state == 1) {
        if (str == undefined) {
          str = str
        } else {
          var indexs = str.indexOf("|")
          str = str.substring(indexs + 1, str.length);
        }
      } else {
        if (!str) return
        var index = str.indexOf("|")
        str = str.substring(0, index);
      }
      return str;
    },
    // 商品列表
    onIndexGoodsList () {
      this.$http.post(this.$apiObj.IndexGoodsList, { page: this.page, pagenum: this.pagenum, c_id: this.c_id, sort: this.sort, keyword: this.keyword, recom: this.recom, goods_type: this.goods_type, s_id: this.s_id, admin_id: this.admin_id }).then(res => {
        if (res.code == 1) {
          if (this.isShopCont) {
            res.data.data.map(item => {
              item.goods_name = this.getCaption(item.goods_name, 1)
              item.tag_name = this.getCaption(item.tag_name, 1)
            })
          } else {
            res.data.data.map(item => {
              item.goods_name = this.getCaption(item.goods_name, 0)
              item.tag_name = this.getCaption(item.tag_name, 0)
            })
          }
          this.totalPageNum = res.data.total
          this.GoodsList = this.page == 1 ? res.data.data : [...this.GoodsList, ...res.data.data]
        }
      })
    },
    onshopCont (item) {
      uni.setStorageSync('shop_id', item.admin_id)
      uni.navigateTo({
        url: '/pages/class/shop/shop'
      });
    },
  },
  // 页面滑动到底部
  onReachBottom () {
    // 判断是否还有数据
    if (this.totalPageNum <= this.page * this.pagenum) return
    this.page++
    this.onIndexGoodsList()
  }
}
</script>
<style lang="less" scoped>
.gain-page {
  .gain-head {
    margin: 30rpx;
    height: 70rpx;
    background: #f5f5f5;
    border-radius: 35rpx;
    padding: 0 24rpx;
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: #999;
    .icon {
      width: 23rpx;
      height: 24rpx;
      margin-right: 15rpx;
    }
    input {
      width: 600rpx;
      color: #000;
      font-size: 26rpx;
    }
  }
  .gain-box {
    margin: 30rpx;
    //gain-choice S
    .gain-choice {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 26rpx;
      line-height: 1;
      margin-right: 20rpx;
      margin-bottom: 30rpx;
      .li {
        display: flex;
        align-items: center;
        position: relative;
        .up-icon {
          width: 8rpx;
          height: 6rpx;
          position: absolute;
          right: -15rpx;
          top: 5rpx;
        }
        .down-icon {
          width: 8rpx;
          height: 6rpx;
          position: absolute;
          right: -15rpx;
          bottom: 5rpx;
          .selected {
            // display: none;
          }
        }
      }
      .active {
        .up-icon {
          // display: none;
        }
        .down-icon {
          // bottom: 8rpx;
          .default {
            // display: none;
          }
          .selected {
            display: block;
            width: 8rpx;
            height: 6rpx;
          }
        }
      }
    }

    //gain-choice E
    //att-goods S
    .att-goods {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10rpx;
      .goods {
        width: 50%;
        .goods-con {
          margin: 10rpx;
          .goods-img {
            width: 335rpx;
            height: 335rpx;
            border-radius: 10rpx;
            overflow: hidden;
            position: relative;
          }
          .goods-tip {
            height: 40rpx;
            background: #fc0609;
            background: linear-gradient(-45deg, #fc0609 0%, #ff4e50 100%);
            border-radius: 20rpx 0px 20rpx 0px;
            padding: 0 15rpx;
            color: #fff;
            line-height: 40rpx;
            font-size: 22rpx;
            position: absolute;
            left: 0;
            top: 0;
          }
          .goods-t {
            height: 70rpx;
            font-size: 26rpx;
            line-height: 35rpx;
            margin: 30rpx 0;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden; //溢出内容隐藏
            text-overflow: ellipsis; //文本溢出部分用省略号表示
            display: -webkit-box; //特别显示模式
            -webkit-line-clamp: 2; //行数
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .goods-m {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .price {
              color: #fc0609;
              font-size: 22rpx;
              font-weight: 550;
            }
            .sale {
              font-size: 20rpx;
              color: #999;
            }
          }
          .goods-b {
            display: flex;
            align-items: center;
            margin-top: 20rpx;
            .icon {
              width: 26rpx;
              height: 26rpx;
              min-width: 26rpx;
              max-width: 26rpx;
              margin-right: 10rpx;
            }
            .name {
              font-size: 24rpx;
            }
            .more {
              width: 10rpx;
              height: 18rpx;
              margin-left: 10rpx;
              min-width: 10rpx;
            }
          }
        }
      }
    }
    //att-goods E
  }
}
</style>