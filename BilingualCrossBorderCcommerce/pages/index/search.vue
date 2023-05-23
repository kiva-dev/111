<template>
  <view class="search-page">
    <Headers>
      <template v-slot:header>
        <view class="header">
          <view class="left">
            <image src="../../static/images/search1.png" mode="" @click="onCaxun" />
            <view class="cont"><input type="text" v-model="keyword" :placeholder="$t('home.search.query')"></view>
          </view>
        </view>
      </template>
      <template v-slot:right>
        <view class="queryCont" @click="onQuery">{{$t('home.search.query')}}</view>
      </template>
    </Headers>
    <!-- 进去默认数据 -->
    <block v-if="isNum==1">
      <!--search-head start-->
      <view class="search-head">
        <view class="hd">
          <view class="t">{{$t('home.search.ssls')}}</view>
          <view class="delete">
            <image class="img" v-if="historyList.length>0" src="../../static/images/delete1.png" @click="onclick" mode="aspectFill" />
          </view>
        </view>
        <view class="bd">
          <block v-if="historyList.length>0">
            <block v-for="item,k in historyList" :key="k">
              <view v-if="item" class="tag" @click="onHistoryClick(item)">
                {{item}}
              </view>
            </block>
          </block>
          <view v-else class="list">{{$t('home.search.sszwsj')}}</view>
        </view>
      </view>
      <!--search-head end-->
      <!--hot-box start-->
      <view class="hot-box">
        <!--hot-hd start-->
        <view class="hot-hd">
          <view class="t">{{$t('home.search.rmsp')}}</view>
          <view class="fre" @click="onCaxun">
            <text>{{$t('home.search.hyh')}}</text>
            <view class="icon">
              <image class="img" src="../../static/images/re1.png"></image>
            </view>
          </view>
        </view>
        <!--hot-hd end-->
        <!--att-goods start-->
        <view class="att-goods">
          <navigator :url="'../class/Gdetail?id='+item.goods_id" hover-class="none" class="goods" v-for="item in GoodsList" :key="item.id">
            <view class="goods-con">
              <view class="goods-img">
                <image class="img" :src="item.image"></image>
              </view>
              <view class="goods-t" style=" height: 70rpx;line-height:35rpx;">{{item.goods_name}}</view>
              <view class="goods-m">
                <view class="price">
                  RM<text class="f-34">{{item.goods_price}}</text>
                </view>
                <view class="sale">{{$t('home.search.xl')}}{{item.sales_actual}}</view>
              </view>
              <view class="goods-b">
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
        <!--att-goods end-->
      </view>
      <!--hot-box end-->
    </block>
    <!-- 搜索所有数据为空 -->
    <block v-if="isNum==2">
      <view class="cart-null">
        <view class="null-img">
          <image class="img" src="../../static/images/null2.png"></image>
        </view>
        <view class="tip">{{$t('home.search.zwnr')}}~</view>
      </view>
    </block>
    <!-- 搜索的结果 -->
    <block v-if="isNum==3">
      <!--tab切换 start-->
      <view class="att-tab">
        <view class="tab">
          <view :class="['li',Inv==0?'active':'']" @click="Inv=0">{{$t('home.search.shop')}}</view>
          <view :class="['li',Inv==1?'active':'']" @click="Inv=1">{{$t('home.search.dianpu')}}</view>
        </view>
      </view>
      <!--tab切换 end-->
      <!--搜索商品数据 start-->
      <view class="att-box" v-show="Inv == 0">
        <!--att-goods start-->
        <view class="att-goods">
          <navigator :url="'../class/Gdetail?id='+item.goods_id" hover-class="none" v-for="item in GoodsList" :key="item.id" class="goods">
            <view class="goods-con">
              <view class="goods-img">
                <image class="img" :src="item.image"></image>
              </view>
              <view class="goods-t" style=" height: 70rpx;line-height:35rpx;">{{item.goods_name}}</view>
              <view class="goods-m">
                <view class="price">
                  RM<text class="f-34">{{item.goods_price}}</text>
                </view>
                <view class="sale">{{$t('home.search.xl')}}{{item.sales_actual}}</view>
              </view>
              <view class="goods-b">
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
        <!--att-goods end-->
      </view>
      <!--搜索商品数据 end-->
      <!--搜索店铺数据 start-->
      <view class="att-box" v-show="Inv == 1">
        <!--att-shop start-->
        <view class="att-shop">
          <!--shop-li start-->
          <view v-for="item in ShopList" :key="item.id" class="shop-li">
            <view class="li-hd">
              <view class="hd-fl">
                <view class="hd-img">
                  <image class="img" :src="item.shop_logo"></image>
                </view>
                <view class="hd-txt">
                  <view class="t">{{item.shop_name}}</view>
                  <view class="c">{{item.focus_num}}{{$t('home.search.gz')}}</view>
                </view>
              </view>
              <view class="hd-fr" @click="onshopCont(item)">
                <text>{{$t('home.search.jindian')}}</text>
                <view class="more">
                  <image class="img" src="../../static/images/mine/more1.png"></image>
                </view>
              </view>
            </view>
            <view class="li-bd">
              <view v-for="items in item.goods" :key="items.goods_id" class="li">
                <view class="con">
                  <image class="img" :src="items.image"></image>
                </view>
              </view>
            </view>
          </view>
          <!--shop-li end-->
        </view>
        <!--att-shop end-->
      </view>
      <!--搜索店铺数据 end-->
    </block>
  </view>
</template>
<script>
import Headers from '@/components/navHeaders'
export default {
  components: { Headers },
  data () {
    return {
      Inv: 1,// 选中tab
      isNum: 1,// 1默认 2空  3有数据
      keyword: "",
      GoodsList: [],// 商品列表
      page: 1,// 页码
      pagenum: 10,// 每页显示商品数目
      c_id: '',// 一级分类id
      sort: 2,// 1最新，2销量高到低，3销量低到高，4价格高到低，5价格低到高
      // keyword: '',// 搜索关键词
      recom: '',// 1推荐商品，0未推荐商品，空字符串全部商品
      goods_type: 1,// 1普通商品，2团购商品，除团购模块都传1
      s_id: '',// 二级分类id
      totalPageNum: 0,// 总条数
      totalPageNum1: 0,// 总条数
      ShopList: [],// 店铺列表
      historyList: [],// 历史记录
      totalPageNums: 0,
      isShopCont: false,// 中文还是英文
    }
  },
  watch: {
    keyword: {
      handler (e, m) {
        this.onCaxun()
      }
    },
  },
  onLoad () {
    uni.setStorageSync('UNI_LOCALE', 'en')
    this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
  },
  onShow () {
    this.historyList = uni.getStorageSync('historyList') ? uni.getStorageSync('historyList') : []
    this.historyList = this.noRepeat(this.historyList)
    this.onCaxun()
  },
  methods: {
    // 跳转店铺
    onshopCont (item) {
      uni.setStorageSync('shop_id', item.id)
      uni.navigateTo({
        url: '/pages/class/shop/shop'
      });
    },
    onShowClick () {
      this.show = false
      this.historyList = []
      uni.setStorageSync('historyList', this.historyList)
    },
    // 取消搜索
    onQuery () {
      this.keyword = ''
      this.onCaxun()
    },
    // 点击历史记录
    onHistoryClick (item) {
      this.keyword = item
      this.onCaxun()
    },
    // 搜索店铺
    onIndexShopList () {
      if (!this.keyword) return this.ShopList = []
      this.$http.post(this.$apiObj.IndexShopList, { keyword: this.keyword, page: this.page, pagenum: this.pagenum }).then(res => {
        if (res.code == 1) {
          if (this.isShopCont) {
            res.data.data.map(item => {
              item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(item.goods_name, 1) : item.goods_name
            })
          } else {
            res.data.data.map(item => {
              item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(item.goods_name, 0) : item.goods_name
            })
          }
          this.totalPageNum1 = res.data.total
          this.ShopList = this.page == 1 ? res.data.data : [...this.ShopList, ...res.data.data]
        }
      })
    },
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
    onclick () {
      this.historyList = []
      uni.setStorageSync('historyList', this.historyList)
    },
    noRepeat (arr) {
      let newArr = [...new Set(arr)]
      return newArr
    },
    // 商品列表
    onIndexGoodsList () {
      this.$http.post(this.$apiObj.IndexGoodsList, { page: this.page, pagenum: this.pagenum, c_id: this.c_id, sort: this.sort, keyword: this.keyword, recom: this.recom, goods_type: this.goods_type, s_id: this.s_id }).then(res => {
        if (res.code == 1) {
          if (this.isShopCont) {
            res.data.data.map(item => {
              item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(item.goods_name, 1) : item.goods_name
            })
          } else {
            res.data.data.map(item => {
              item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(item.goods_name, 0) : item.goods_name
            })
          }
          this.totalPageNums = res.data.total
          this.GoodsList = this.page == 1 ? res.data.data : [...this.GoodsList, ...res.data.data]
        }
      })
    },
    // 点击切换tab
    changeTab (Inv) {
      this.navIdx = Inv;
    },
    // 查询数据
    onCaxun () {
      this.page = 1
      this.ShopList = []
      this.GoodsList = []
      this.onIndexShopList()
      this.onIndexGoodsList()
      this.historyList.push(this.keyword.trim())
      this.historyList = this.noRepeat(this.historyList)
      uni.setStorageSync('historyList', this.historyList)
      if (this.keyword == '') {
        // 没有关键词
        this.isNum = 1
      } else if (this.totalPageNum > 0 || this.totalPageNum1 > 0) {
        // 有数据
        this.isNum = 3
      } else {
        // 空数据
        this.isNum = 2
      }
    },
  },
  // 页面滑动到底部
  onReachBottom () {
    // 判断是否还有数据
    if (this.totalPageNum) {
      if (this.totalPageNum <= this.page * this.pagenum) return
      this.page++
      this.onIndexShopList()
    }
    if (this.totalPageNums) {
      if (this.totalPageNums <= this.page * this.pagenum) return
      this.page++
      this.onIndexGoodsList()
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  // width: 690rpx;
  display: flex;
  align-items: center;
  .left {
    width: 615rpx;
    height: 70rpx;
    background: #f5f5f5;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    image {
      width: 36rpx;
      height: 36rpx;
      margin: 0 10rpx;
    }
    .cont {
      input {
        text-align: left;
        font-size: 28rpx;
      }
    }
  }
}
.queryCont {
  text-align: center;
  font-size: 28rpx;
  color: #fff;
  margin-right: 10rpx;
}
.search-page {
  .search-head {
    padding: 30rpx;
    box-sizing: border-box;
    .hd {
      display: flex;
      align-items: ceter;
      justify-content: space-between;
      .t {
        font-size: 28rpx;
        font-weight: 550;
      }
      .delete {
        width: 28rpx;
        height: 28rpx;
      }
    }
    .bd {
      display: flex;
      flex-wrap: wrap;
      margin: 20rpx -10rpx;
      .tag {
        height: 60rpx;
        background: #f9f9f9;
        border-radius: 30rpx;
        padding: 0 15rpx;
        margin: 10rpx;
        font-size: 26rpx;
        text-align: center;
        line-height: 60rpx;
      }
    }
  }
  .hot-box {
    padding: 0 30rpx 30rpx;
    box-sizing: border-box;
    .hot-hd {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20rpx;
      .t {
        font-size: 28rpx;
        font-weight: 550;
      }
      .fre {
        display: flex;
        align-items: center;
        font-size: 22rpx;
        color: #999;
        .icon {
          width: 22rpx;
          height: 22rpx;
          margin-left: 10rpx;
        }
      }
    }
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
          }
          .goods-t {
            font-size: 26rpx;
            line-height: 1.2;
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
            margin-top: 30rpx;
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
  }
}
.att-tab {
  display: flex;
  justify-content: center;
  padding: 20rpx 30rpx;
  .tab {
    display: flex;
    background: #f5f5f5;
    border-radius: 35rpx;
    overflow: hidden;
  }
  .li {
    width: 170rpx;
    height: 70rpx;
    text-align: center;
    line-height: 70rpx;
    font-size: 26rpx;
  }
  .active {
    background: #fc0609;
    color: #fff;
  }
}
.att-box {
  margin: 30rpx;
  .att-goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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
        }
        .goods-t {
          font-size: 26rpx;
          line-height: 1.2;
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
          width: 100%;
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
          margin-top: 30rpx;
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

  .att-shop {
    .shop-li {
      border-bottom: 1px solid #eeeeee;
      padding: 20rpx 0;
      .li-hd {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .hd-fl {
          display: flex;
          width: calc(100% -100rpx);
          .hd-img {
            width: 60rpx;
            height: 60rpx;
            border-radius: 10rpx;
            overflow: hidden;
            min-width: 60rpx;
            margin-right: 20rpx;
          }
          .hd-txt {
            width: calc(100% - 80rpx);
            .t {
              font-size: 26rpx;
              font-weight: 550;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .c {
              font-size: 20rpx;
              color: #999;
            }
          }
        }
        .hd-fr {
          color: #999;
          font-size: 26rpx;
          display: flex;
          align-items: center;
          .more {
            width: 12rpx;
            height: 22rpx;
            margin-left: 10rpx;
          }
        }
      }
      .li-bd {
        display: flex;
        flex-wrap: wrap;
        .li {
          width: 33.3333%;
        }
        .con {
          margin: 13rpx;
          width: 212rpx;
          height: 212rpx;
        }
      }
    }
  }
}
.cart-null {
  padding: 450rpx 30rpx 0;
  text-align: center;
  font-size: 32rpx;
  color: #999;
  .null-img {
    width: 393rpx;
    height: 290rpx;
    margin: 0 auto;
  }
}
</style>