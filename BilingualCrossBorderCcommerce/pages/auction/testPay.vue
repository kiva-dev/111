<template>
  <view class="content">
    <view class="uni-list">
      <radio-group @change="applePriceChange">
        <label class="uni-list-cell" v-for="(item, index) in productList" :key="index">
          <radio :value="item.productid" :checked="item.checked" />
          <view class="price">{{item.title}} {{item.price}}</view>
        </label>
      </radio-group>
    </view>
    <view class="uni-padding-wrap">
      <button class="btn-pay" @click="payment" :loading="loading" :disabled="disabled">确认支付</button>
    </view>
  </view>
</template>

<script>
  import {
    Iap,
    IapTransactionState
  } from "@/utils/iap.js"

  export default {
    data() {
      return {
        title: "iap",
        loading: false,
        disabled: true,
        productId: "",
        productList: []
      }
    },
    onLoad: function() {
      // 创建示例
      this._iap = new Iap({
        products: [] // 苹果开发者中心创建
      })

      this.init();
    },
    onShow() {
      if (this._iap.ready) {
        this.restore();
      }
    },
    onUnload() {},
    methods: {
      async init() {
        uni.showLoading({
          title: '检测支付环境...'
        });

        try {
          // 初始化，获取iap支付通道
          await this._iap.init();

          // 从苹果服务器获取产品列表
          this.productList = await this._iap.getProduct();
          this.productList[0].checked = true;
          this.productId = this.productList[0].productid;

          // 填充产品列表，启用界面
          this.disabled = false;
        } catch (e) {
          uni.showModal({
            title: "init",
            content: e.message,
            showCancel: false
          });
        } finally {
          uni.hideLoading();
        }

        if (this._iap.ready) {
          this.restore();
        }
      },
      async restore() {
        // 检查上次用户已支付且未关闭的订单，可能出现原因：首次绑卡，网络中断等异常

        // 在此处检查用户是否登陆

        uni.showLoading({
          title: '正在检测已支付且未关闭的订单...'
        });

        try {
          // 从苹果服务器检查未关闭的订单，可选根据 username 过滤，和调用支付时透传的值一致
          const transactions = await this._iap.restoreCompletedTransactions({
            username: ""
          });

          if (!transactions.length) {
            return;
          }

          // 开发者业务逻辑，从服务器获取当前用户未完成的订单列表，和本地的比较
          // 此处省略

          switch (transaction.transactionState) {
            case IapTransactionState.purchased:
              // 用户已付款，在此处请求开发者服务器，在服务器端请求苹果服务器验证票据
              //let result = await this.validatePaymentResult();

              // 验证通过，交易结束，关闭订单
              // if (result) {
              //   await this._iap.finishTransaction(transaction);
              // }
              break;
            case IapTransactionState.failed:
              // 关闭未支付的订单
              await this._iap.finishTransaction(transaction);
              break;
            default:
              break;
          }
        } catch (e) {
          uni.showModal({
            content: e.message,
            showCancel: false
          });
        } finally {
          uni.hideLoading();
        }
      },
      async payment() {
        if (this.loading == true) {
          return;
        }
        this.loading = true;

        uni.showLoading({
          title: '支付处理中...'
        });

        try {
          // 从开发者服务器创建订单
          // const orderId = await this.createOrder({
          //   productId: this.productId
          // });

          // 请求苹果支付
          const transaction = await this._iap.requestPayment({
            productid: this.productId,
            manualFinishTransaction: true,
            // username: username + orderId //根据业务需求透传参数，关联用户和订单关系
          });

          // 在此处请求开发者服务器，在服务器端请求苹果服务器验证票据
          // await this.validatePaymentResult({
          //   orderId: orderId,
          //   username: username,
          //   transactionReceipt: transaction.transactionReceipt, // 不可作为订单唯一标识
          //   transactionIdentifier: transaction.transactionIdentifier
          // });

          // 验证成功后关闭订单
          //await this._iap.finishTransaction(transaction);

          // 支付成功
        } catch (e) {
          uni.showModal({
            content: e.message,
            showCancel: false
          });
        } finally {
          this.loading = false;
          uni.hideLoading();
        }
      },
      createOrder({
        productId
      }) {
        return new Promise((resolve, reject) => {})
      },
      validatePaymentResult(data) {
        return new Promise((resolve, reject) => {});
      },
      applePriceChange(e) {
        this.productId = e.detail.value;
      }
    }
  }
</script>

<style>
  .content {
    padding: 15px;
  }

  button {
    background-color: #007aff;
    color: #ffffff;
  }

  .uni-list-cell {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

  .price {
    margin-left: 10px;
  }

  .btn-pay {
    margin-top: 30px;
  }
</style>
