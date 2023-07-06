<template>
	<view class="sub-page">

		<view class="submit-head" @click="navClick('/pages/address/address')" :style="!addCont?'height: 116rpx;':'' ">
			<image src="../../static/images/new-index/address.png" class="left"></image>
			<block v-if="addCont">
				<view class="info">
					<view class="info-top">
						<view class="info-name">{{addCont.name}}</view>
						<view class="info-phone">{{addCont.mobile.slice(0, 3)}}****{{addCont.mobile.substr(-4)}}</view>
					</view>
					<view class="info-des">{{addCont.detail}}</view>
				</view>
			</block>
			<block v-else>
				<view class="not_address">Add New Address</view>
			</block>
			<image src="../../static/images/products/right.png" class="right"></image>
		</view>

		<!--商品列表-->
		<view class="list" v-for="item in OrderList" :key="item.admin_id">
			<view class="list-head">
				<image :src="item.shop_logo"></image>
				<view>{{item.shop_name}}</view>
			</view>
			<view class="item" v-for="(data,index) in item.list" :key="">
				<image :src="data.image" class="item-img"></image>
				<view class="item-info">
					<view class="item-info-name">{{data.good_name}}</view>
					<view class="item-price">RM<span>{{data.price}}</span></view>
					<view class="item-btn">
						<view class="item-left" @click="onJian(data)">
							<image src="../../static/images/new-index/jian1.png" v-if="data.num==1"></image>
							<image src="../../static/images/new-index/jian.png" v-else></image>
						</view>
						<view class="item-input">
							<input type="number" style="font-size: 24rpx;" v-model="data.num"
								@confirm="inspectNum(data)" />
						</view>
						<view class="item-right" @click="onJia(data)">
							<image src="../../static/images/new-index/jia.png"></image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!--支付方式-->
		<view class="pay-type" v-show="!payAll">
			<view class="pay-head">Payment method</view>
			<view class="pay-info" v-for="(item,k) in orderPayList.slice(0,2)" :key="item.id">
				<image :src="item.img" class="pay-info-logo"></image>
				<view class="pay-info-name">{{item.title}} <text
						v-if="item.id==1">(RM{{userCont.recharge_money_balance*1}})</text></view>
				<image src="/static/images/new-index/wxz.png" class="pay-info-xz" v-show="!item.isShow"
					@click="selectPayType(item)"></image>
				<image src="/static/images/new-index/xz.png" class="pay-info-xz" v-show="item.isShow"
					@click="selectPayType(item)"></image>
			</view>

			<!-- <view class="pay-all" @click="payAll=true">
				<view>All</view>
				<image src="../../static/images/new-index/btm.png"></image>
			</view> -->
		</view>
		<!-- <view class="pay-type" v-show="payAll">
			<view class="pay-head">Payment method</view>
			<view class="pay-info" v-for="(item,k) in orderPayList" :key="item.id">
				<image :src="item.img" class="pay-info-logo"></image>
				<view class="pay-info-name">{{item.title}}</view>
				<image src="/static/images/new-index/wxz.png" class="pay-info-xz" v-show="!item.isShow"
					@click="selectPayType(item)"></image>
				<image src="/static/images/new-index/xz.png" class="pay-info-xz" v-show="item.isShow"
					@click="selectPayType(item)"></image>
			</view>
		</view> -->


		<view class="sub-fixed">
			<view class="price">RM<span>{{total}}</span></view>
			<view class="btn" @click="onOrderReferCartOrder()">{{$t('new.payment')}}</view>
		</view>

		<!--优惠券选择弹出 start-->
		<uni-popup ref="CouponPopup" type="bottom">
			<view class="you-pop">
				<view class="you-head">
					<view class="cancel" @click="onCouponPopupQuery">{{$t('order.query')}}</view>
					<view class="t">{{$t('order.xuanzeyhq')}}</view>
					<view class="define" @click="onCouponBtn">{{$t('order.btnsub')}}</view>
				</view>
				<!--you-ul start-->
				<view class="you-ul">
					<view v-for="item in MineCouponList" :key="item.id" class="li">
						<view class="li-bg">
							<image class="img" src="../../static/images/y1.png"></image>
						</view>
						<view class="li-fl">
							<view class="li-t f-28 color-red">RM<text
									class="f-46">{{$filter.formatValue(item.money, 'split')[0]}}</text>.{{$filter.formatValue(item.money, 'split')[1] ? $filter.formatValue(item.money, 'split')[1] : '00'}}
							</view>
							<view class="li-c">
								<view class="c">{{$t('order.man')}}{{item.use_limit}}{{$t('order.keyong')}}</view>
							</view>
						</view>
						<view class="li-fr">
							<view class="li-t flex flex-between flex-center" @click="oncheckbox(item)">
								<text>{{$t('order.yhq')}}</text>
								<image v-if="item.isShow" src="../../static/images/mine/radio2.png" mode="" />
								<image v-else src="../../static/images/mine/radio1.png" mode="" />
							</view>
							<view class="li-line"></view>
							<view class="li-c">
								<view class="date">{{$t('order.yxqz')}} {{item.end_time}}</view>
							</view>
						</view>
					</view>
				</view>
				<!--you-ul end-->
			</view>
		</uni-popup>
		<!--优惠券选择弹出 end-->
		<!--支付方式弹出 start-->
		<uni-popup ref="popup1">
			<view class="mode-pop">
				<view class="mode-tit">
					<text>{{$t('order.xzzffs')}}</text>
					<view class="cancel" @click="toggle1Close">{{$t('order.query')}}</view>
				</view>
				<view v-for="item,k in orderPayList" :key="item.id" class="mode-li">
					<view class="label">
						{{item.title}}
						<block v-if="item.id==1">（{{$t('order.kyye')}}<text
								class="color-red">RM{{userCont.money}}</text>）</block>
					</view>
					<view class="li-fr" @click="onQuanClick(item,k)">
						<radio :checked="item.isShow?true:false" value="r1" />
					</view>
				</view>
				<view class="mode-bot">
					<button class="public-btn" @click="toggle1Close">{{$t('order.btnsub')}}</button>
				</view>
			</view>
		</uni-popup>
		<!--支付方式弹出 end-->
		<!--支付密码弹出 start-->
		<uni-popup ref="pwdPopup" type="center">
			<view class="public-pop">
				<view class="pop-con">
					<view class="pop-t">
						<text>{{$t('order.qsrzfmm')}}</text>
						<view class="pay-close" @click="onPwdQuery">
							<image class="img" src="../../static/images/close1.png"></image>
						</view>
					</view>
					<view class="pop-c">
						<view class="pay-input">
							<input class="input" type="password" placeholder-class="color-999" v-model="pay_pwd"
								:placeholder="$t('order.qsrzfmm')" />
						</view>
					</view>
					<view class="pay-bot">
						<button class="pay-btn" style="background: rgb(10, 198, 142);"
							@click="onPwdClick">{{$t('order.btnsub')}}</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<!--支付密码弹出 end-->
	</view>
</template>

<script>
	import jsencrypt from '@/common/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
	//公钥.
	const publiukey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSjs8JJr/Nyb+nOG77agUDf7uT
c+kswdVEXbU8v5EL98brAw7fu4dQc1vkh1KSXqiC9EC7YmJzkkFoXUzTH2pvvDlq
UuCwtdmXOsq/b1JWKyEXzQlPIiwdHnAUjGbmHOEMAY3jKEy2dY2I6J+giJqo8B2H
NoR+zv3KaEmPSHtooQIDAQAB
-----END PUBLIC KEY-----`
	export default {
		components: {},
		data() {
			return {
				selectNum: 0, //选择支付方式
				payAll: false,
				noClick: true, // 防止重复点击 
				userCont: '', // 用户信息
				address_id: '', // 地址id
				addCont: '', // 收货地址
				OrderList: [], // 订单列表
				total: 0, // 合计
				totalNum: 0, // 商品价格
				MineCouponList: [], // 优惠券列表
				coupon_id: '', // 选中优惠券id
				coupon_num: 0.00, // 选中优惠券值
				num: 0, // 总共几件
				cart_ids: '', // 选中id
				major_no: '', // 订单号
				order_no: '', // 小订单号
				pay_pwd: '', // 支付密码
				use_limit: 0, // 优惠券满足条件
				time: '',
				orderPayList: [{
					id: 1,
					title: this.$t('order.yezf'),
					isShow: false,
					img: '../../static/images/new-index/balance.png'
				}, {
					id: 2,
					title: 'PayEssence',
					isShow: false,
					img: '/static/images/new-index/pe.png'
				}, {
					id: 3,
					title: 'Combination payment',
					isShow: false,
					img: '/static/images/new-index/zh.png'
				}, ],
				orderCont: '',
				isShopCont: false, // 中文还是英文
				set_paypwd: '',
				MineCont: {},
			}
		},

		onLoad(e) {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			this.cart_ids = e.cart_ids
			// 获取购物车里面的订单列表
			this.onOrderConfirmCartOrder()
			// 获取优惠券
			this.onMineCouponList()
		},
		onShow() {
			this.onAddressList()

			if (uni.getStorageSync('token')) {
				// 实名认证
				this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
					if (res.code == 1) {
						this.MineCont = res.data
					}
				})
				console.log(111)
				// 判断是否设置支付密码
				this.$http.post(this.$apiObj.MineInfo).then(res => {
					if (res.code == 1) {
						this.userCont = res.data
						this.set_paypwd = res.data.set_paypwd
						if (res.data.set_paypwd != 1) {
							uni.showModal({
								title: this.$t('mine.tip'),
								content: this.$t('new.qqwszmm'),
								success: (res) => {
									if (res.confirm) {
										uni.navigateTo({
											url: '/pages/mine/setPassword'
										})
									} else {
										uni.navigateBack()
									}
								},
							})
						}
					}
				})
			}
		},
		methods: {
			//切换支付方式
			selectPayType(item) {
				item.isShow = !item.isShow
				if (item.isShow) {
					this.orderPayList.forEach(data => {
						if (item.id != data.id) data.isShow = false
					})
				}
			},
			//支付
			payProduct() {

			},
			getCaption(str, state) {
				if (state == 1) {
					var indexs = str.indexOf("|")
					str = str.substring(indexs + 1, str.length);
				} else {
					var index = str.indexOf("|")
					str = str.substring(0, index);
				}
				return str;
			},
			onQuanClick(item, k) {
				if (item.id == 1 && this.set_paypwd != '1') return uni.navigateTo({
					url: "../mine/setPassword"
				})
				for (let i in this.orderPayList) {
					this.orderPayList[i].isShow = false
				}
				item.isShow = true
				this.orderCont = k + 1
			},
			// 收货地址
			onAddressList() {
				this.$http.post(this.$apiObj.AddressList, {
					page: 1,
					pagenum: 1000
				}).then(res => {
					if (res.code == 1) {
						for (let i in res.data.data) {
							if (res.data.data[i].is_default == 1) {
								this.addCont = res.data.data[i]
								this.address_id = res.data.data[i].id
							}
						}
					}
				})
			},
			// 获取购物车里面的订单列表
			onOrderConfirmCartOrder() {
				this.$http.post(this.$apiObj.OrderConfirmCartOrder, {
					cart_ids: this.cart_ids
				}).then(res => {
					if (res.code == 1) {
						if (this.isShopCont) {
							res.data.cartdata.map(item => {
								item.list.map(items => {
									items.good_name = this.getCaption(items.good_name, 1) ? this
										.getCaption(items.good_name, 1) : items.good_name
								})
							})
						} else {
							res.data.cartdata.map(item => {
								item.list.map(items => {
									items.good_name = this.getCaption(items.good_name, 0) ? this
										.getCaption(items.good_name, 1) : items.good_name
								})
							})
						}
						res.data.cartdata.map(item => {
							item.remark = ''
						})
						this.OrderList = res.data.cartdata
						let num = 0
						for (let i in this.OrderList) {
							for (let j in this.OrderList[i].list) {
								num++
							}
						}
						this.num = num
						this.total = res.data.total
						this.totalNum = res.data.total
					}
				})
			},
			// 点击减
			onJian(items) {
				if (items.num == 1) return
				let num = items.num - 1
				this.onCartEdit(num, items)
			},
			// 点击加
			onJia(items) {
				if (items.num == items.stock_num) return
				let num = items.num + 1
				this.onCartEdit(num, items)
			},
			// 修改购物车数量
			onCartEdit(num, items) {
				this.$http.post(this.$apiObj.CartEdit, {
					goods_spec_id: items.goods_spec_id,
					num: num,
					cart_id: items.cart_id
				}).then(res => {
					if (res.code == 1) {
						items.num = num
						this.onOrderConfirmCartOrder()
					}
				})
			},
			// 获取优惠券
			onMineCouponList() {
				this.$http.post(this.$apiObj.MineCouponList, {
					type: 1,
					page: 1,
					pagenum: 100
				}).then(res => {
					if (res.code == 1) {
						res.data.data.map(item => {
							item.isShow = false
						})
						this.MineCouponList = res.data.data
					}
				})
			},
			// 点击选择优惠券
			oncheckbox(item) {
				if (Number(item.use_limit) > this.totalNum) {
					item.isShow = false
					uni.showToast({
						icon: 'none',
						title: this.$t('order.cyhqbny')
					})
					return
				}
				this.MineCouponList.map(items => {
					items.isShow = false
				})
				item.isShow = true
				this.coupon_id = item.id
				this.coupon_num = item.money
				this.use_limit = item.use_limit
				this.total = this.totalNum - this.coupon_num
			},
			// 点击优惠券确定按钮
			onCouponBtn() {
				this.$refs.CouponPopup.close()
			},
			// 购物车提交订单
			onOrderReferCartOrder() {
				// console.log(111)
				if (!this.addCont) return uni.showToast({
					icon: 'none',
					title: this.$t('order.addContXuanze')
				})
				let isNum
				for (let i in this.orderPayList) {
					if (this.orderPayList[i].isShow) {
						isNum = this.orderPayList[i].id
					}
				}
				if (!isNum) return uni.showToast({
					icon: 'none',
					title: this.$t('order.qxzzffs')
				})
				this.$http.post(this.$apiObj.OrderReferCartOrder, {
					data: JSON.stringify(this.OrderList),
					address_id: this.address_id,
					coupon_id: this.coupon_id
				}).then(res => {
					if (res.code == 1) {
						this.major_no = res.data.major_no
						this.order_no = res.data.order_no
						this.time = res.time

						// uni.showToast({
						// 	icon: 'none',
						// 	title: '暂未开放支付'
						// })
						// setTimeout(() => {
						// 	uni.navigateBack({
						// 		delta: 1
						// 	})
						// }, 2000);

						if (isNum == 1) {
							// 余额支付弹框
							this.$refs.pwdPopup.open()
						} else if (isNum == 2) {
							if (this.MineCont === null) return uni.showToast({
								icon: 'none',
								title: this.$t('smrz')
							})
							if (this.MineCont.status == 0) return uni.showToast({
								icon: 'none',
								title: this.$t('smrzshh')
							})
							if (this.MineCont.status == '-1') return uni.showToast({
								icon: 'none',
								title: this.$t('smrzwtg')
							})
							let arr = this.total.split(',')
							let price = ''
							arr.forEach(item => {
								price += item
							})
							// 3方支付
							this.$http.post(this.$apiObj.OrderMalaysiaPay, {
								major_no: res.data.major_no ? res.data.major_no : res.data.order_no,
								money: price * 1
							}).then(res => {
								if (res.code == 1) {
									const formStr = `<form action="${res.data.action_url}" method="POST" >
                        <input name="MerchantCode" value="${res.data.MerchantCode}">
                        <input name="TransNum" value="${res.data.TransNum}">
                        <input name="Currency" value="${res.data.Currency}">
                        <input name="Amount" value="${res.data.Amount}">
                        <input name="PaymentDesc" value="${res.data.PaymentDesc}">
                        <input name="FirstName" value="${res.data.FirstName}">
                        <input name="LastName" value="${res.data.LastName}">
                        <input name="EmailAddress" value="${res.data.EmailAddress}">
                        <input name="PhoneNum" value="${res.data.PhoneNum}">
                        <input name="Address" value="${res.data.Address}">
                        <input name="City" value="${res.data.City}">
                        <input name="State" value="${res.data.State}">
                        <input name="Country" value="${res.data.Country}">
                        <input name="Postcode" value="${res.data.Postcode}">
                        <input name="MerchantRemark" value="${res.data.MerchantRemark}">
                        <input name="Signature" value="${res.data.Signature}">
                      </form>`
									// #ifdef H5
									const div = document.createElement('div')
									div.innerHTML = formStr
									div.setAttribute('style',
										'position: absolute; width: 0; height: 0; overflow: hidden;')
									const form = div.querySelector('form')
									document.body.appendChild(div)
									form.submit()
									document.body.removeChild(div)
									//  #endif
									// #ifdef APP-PLUS  
									uni.redirectTo({
										url: '/pages/mine/webview?url=' + formStr
									});
									//  #endif
								}
							})
						}
					}
				})
			},
			// 关闭支付密码
			onPwdQuery() {
				this.$refs.pwdPopup.close()
				uni.showToast({
					title: this.$t('order.nyqxddzf'),
					icon: 'none'
				})
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 2000);
			},
			// 点击支付密码
			onPwdClick() {
				if (!this.pay_pwd) return uni.showToast({
					title: this.$t('order.qsrmm'),
					icon: 'none'
				})
				const pay_pwd = jsencrypt.setEncrypt(publiukey, String(this.pay_pwd))

				let arr = this.total.split(',')
				let price = ''
				arr.forEach(item => {
					price += item
				})
				this.$http.post(this.$apiObj.OrderBalancePay, {
					major_no: this.major_no, // 购物车支付的主订单号
					order_no: this.order_no, // 小订单号
					money: price * 1, // 支付总金额
					pay_pwd: pay_pwd, // rsa加密后的支付密码
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('order.zfcg'),
							icon: 'none'
						})
						this.$refs.pwdPopup.close()

						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/cart/order_success?order_price=' + price +
									'&order_no=' + (this.major_no ? this.major_no : this
										.order_no) + '&time=' + this.time
							})
						}, 2000)

						// pages/index/Psuccess
					}
				})
			},
			//导航点击的跳转处理函数
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			toggle1(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup1.open(type)
			},
			toggle1Close(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup1.close(type)
			},
			toggle2(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup2.open(type)
			},
			toggle2Close(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup2.close(type)
			},
			// 点击显示优惠券
			onCouponPopupClick() {
				if (this.MineCouponList.length == 0) return
				this.$refs.CouponPopup.open()
			},
			// 点击隐藏优惠券
			onCouponPopupQuery() {
				this.MineCouponList.map(item => {
					item.isShow = false
				})
				this.coupon_id = ''
				this.coupon_num = 0.00
				this.$refs.CouponPopup.close()
			}
		}
	}
</script>
<style lang="less" scoped>
	/deep/.uni-input-input {
		text-align: center !important;
	}

	page {
		background: #f9f9f9;
	}

	.sub-page {
		padding-bottom: 100rpx;

		//新的地址选择
		.submit-head {
			position: relative;
			width: 686rpx;
			height: 194rpx;
			display: flex;
			align-items: center;
			background: #fff;
			border-radius: 20rpx;
			margin: 24rpx auto;

			.not_address {
				font-size: 28rpx;
				color: rgb(102, 102, 102);
			}

			.left {
				width: 48rpx;
				height: 48rpx;
				margin: 0 24rpx 0 24rpx;
			}

			.info {
				.info-top {
					display: flex;
					align-items: center;

					.info-name {
						font-size: 32rpx;
						font-weight: bold;
						color: rgb(51, 51, 51);
					}

					.info-phone {
						font-size: 28rpx;
						color: rgb(102, 102, 102);
						margin-left: 20rpx;
					}

				}

				.info-des {
					width: 516rpx;
					line-height: 44rpx;
					font-size: 24rpx;
					color: rgb(102, 102, 102);
					word-break: break-all;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					margin-top: 20rpx;
				}
			}

			.right {
				position: absolute;
				right: 24rpx;
				width: 36rpx;
				height: 36rpx;
				;
			}

		}

		//新的商品列表
		.list {
			width: 686rpx;
			padding: 26rpx 0 24rpx 0;
			background: #fff;
			border-radius: 20rpx;
			margin: 0 auto 28rpx auto;

			.list-head {
				width: 100%;
				display: flex;
				align-items: center;
				margin-bottom: 24rpx;

				image {
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					margin-left: 24rpx;
				}

				view {
					font-size: 28rpx;
					color: rgb(51, 51, 51);
					margin-left: 12rpx;
				}
			}

			.item {
				width: 100%;
				height: 206rpx;
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				.item-img {
					width: 206rpx;
					height: 206rpx;
					border-radius: 16rpx;
					margin: 0 24rpx;
				}

				.item-info {
					position: relative;
					width: 416rpx;
					height: 100%;

					.item-info-name {
						width: 100%;
						line-height: 36rpx;
						font-size: 24rpx;
						color: rgb(51, 51, 51);
						word-break: break-all;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}

					.item-price {
						position: absolute;
						left: 0;
						bottom: 0;
						font-size: 20rpx;
						font-weight: bold;
						color: rgb(255, 57, 57);

						span {
							font-size: 28rpx;
						}
					}

					.item-btn {
						position: absolute;
						right: 0;
						bottom: 0;
						width: 132rpx;
						height: 48rpx;
						display: flex;
						align-items: center;
						box-sizing: border-box;
						border: 1rpx solid rgb(204, 204, 204);
						border-radius: 48rpx;

						.item-input {
							width: 52rpx;
							// height: 100%;
							box-sizing: border-box;
							border: 1rpx solid rgb(204, 204, 204);
							border-top: none;
							border-bottom: none;
						}

						.item-left {
							position: relative;
							width: 40rpx;
							height: 48rpx;
							border-radius: 48rpx 0 0 48rpx;

							image {
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
								width: 16rpx;
								height: 2rpx;
							}
						}

						.item-right {
							position: relative;
							width: 40rpx;
							height: 48rpx;
							border-radius: 0 48rpx 48rpx 0;

							image {
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
								width: 16rpx;
								height: 16rpx;
							}
						}
					}
				}

			}

		}

		//支付方式
		.pay-type {
			width: 686rpx;
			padding: 24rpx 0;
			background: #fff;
			border-radius: 20rpx;
			margin: 0 auto 20rpx auto;

			.pay-head {
				font-size: 28rpx;
				color: rgb(51, 51, 51);
				margin: 0 0 32rpx 24rpx;
			}

			.pay-info {
				position: relative;
				width: 100%;
				height: 40rpx;
				display: flex;
				align-items: center;
				margin-bottom: 36rpx;

				.pay-info-logo {
					display: block;
					width: 36rpx;
					height: 36rpx;
					margin: 0 16rpx 0 24rpx;
				}

				.pay-info-name {
					font-size: 24rpx;
					color: rgb(51, 51, 51);

					text {
						color: rgb(255, 57, 57);
					}
				}

				.pay-info-xz {
					position: absolute;
					right: 24rpx;
					width: 40rpx;
					height: 40rpx;
				}

			}

			.pay-all {
				width: 100%;
				height: 30rpx;
				font-size: 24rpx;
				color: rgb(102, 102, 102);
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 24rpx;
					height: 24rpx;
					margin-left: 8rpx;
				}
			}

		}


		.sub-head {
			background: #fff;
			padding: 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.head-fl {
				display: flex;
				align-items: center;

				.icon {
					width: 73rpx;
					height: 73rpx;
					min-width: 73rpx;
					margin-right: 35rpx;
				}

				.txt {
					.t {
						font-size: 26rpx;
					}

					.c {
						font-size: 28rpx;
						margin: 10rpx 0;
					}

					.b {
						display: flex;
						white-space: nowrap;

						.name {
							font-size: 28rpx;
							margin-right: 20rpx;
						}

						.phone {
							font-size: 26rpx;
							color: #999;
						}
					}
				}
			}

			.more {
				width: 16rpx;
				height: 32rpx;
				min-width: 16rpx;
				margin-left: 20rpx;
			}
		}

		.sub-box {
			margin: 20rpx 0;
			background: #fff;
			border-radius: 30rpx;
			padding: 20rpx 30rpx;

			.li-hd {
				display: flex;
				align-items: center;
				position: relative;

				.icon {
					width: 26rpx;
					height: 26rpx;
					margin-right: 15rpx;
					min-width: 26rpx;
				}

				.t {
					font-size: 26rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.more {
					width: 10rpx;
					height: 18rpx;
					min-width: 10rpx;
					margin-left: 15rpx;
				}
			}

			.li-item {
				margin: 36rpx 0;
				display: flex;
				position: relative;

				.li-img {
					// background: #fc5917;
					border-radius: 10rpx;
					width: 175rpx;
					height: 175rpx;
					min-width: 175rpx;
					margin-right: 20rpx;
				}

				.li-txt {
					width: 100%;

					.t {
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
						font-size: 28rpx;
						line-height: 34rpx;
					}

					.specs {
						display: inline-flex;
						align-items: center;
						height: 43rpx;
						border-radius: 10rpx;
						align-items: center;
						padding: 0 10rpx;
						line-height: 43rpx;
						margin: 15rpx 0 20rpx 0;

						.c {
							font-size: 24rpx;
							color: #999;
						}

						.icon {
							width: 14rpx;
							height: 14rpx;
							margin-left: 10rpx;
							min-width: 14rpx;
						}
					}

					.b {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.cart-num {
							display: flex;
							align-items: center;
							border: 2rpx solid #eeeeee;
							border-radius: 6rpx;

							.num-btn {
								width: 40rpx;
								height: 40rpx;
								font-size: 24rpx;
								color: #999;
								padding: 0;
								margin: 0;
								line-height: 40rpx;
							}

							.num-input {
								width: 60rpx;
								height: 40rpx;
								border-left: 1px solid #eee;
								border-right: 1px solid #eee;
								text-align: center;
								font-size: 24rpx;
								font-weight: 550;
							}
						}

						.price {
							font-weight: 550;
							color: #fc0609;
							font-size: 22rpx;
						}
					}
				}
			}

			.li-leave {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.t {
					font-size: 28rpx;
				}

				.c {
					font-size: 26rpx;
					color: #999;

					input {
						font-size: 26rpx;
						width: 600rpx;
						text-align: right;
						color: #333;
					}
				}
			}

			.li-freight {
				margin: 30rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.t {
					font-size: 28rpx;
				}

				.c {
					font-size: 20rpx;
				}
			}
		}

		.sub-bot {
			background: #ffffff;
			border-radius: 30rpx;
			margin: 20rpx;
			padding: 20rpx 30rpx;

			.bot-li {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				padding: 20rpx 0;

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

			.bot-end {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-weight: 550;
				padding: 20rpx 0;
			}
		}

		.sub-fixed {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 96rpx;
			z-index: 99;
			display: flex;
			align-items: center;
			background: #fff;

			.price {
				font-size: 20rpx;
				font-weight: bold;
				color: rgb(255, 57, 57);
				margin-left: 32rpx;

				span {
					font-size: 36rpx;
				}
			}

			.btn {
				position: absolute;
				right: 32rpx;
				width: 200rpx;
				height: 72rpx;
				line-height: 72rpx;
				font-size: 28rpx;
				color: rgb(255, 255, 255);
				text-align: center;
				background: rgb(10, 198, 142);
				border-radius: 72rpx;
			}

		}

		//支付方式弹出 S
		.mode-pop {
			background: #ffffff;
			border-radius: 20rpx 20rpx 0px 0px;

			.mode-tit {
				padding: 38rpx 30rpx;
				line-height: 1;
				font-size: 32rpx;
				font-weight: 550;
				border-bottom: 1px solid #f5f5f5;
				position: relative;
				text-align: center;

				.cancel {
					position: absolute;
					right: 30rpx;
					top: 38rpx;
					color: #999;
					font-size: 26rpx;
				}
			}

			.mode-li {
				padding: 36rpx 0;
				margin: 0 30rpx;
				border-bottom: 1px solid #f5f5f5;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;

				.li-fr {
					display: flex;
					align-items: center;

					/deep/ uni-radio {
						margin-left: 20rpx;
					}

					/deep/ uni-radio .uni-radio-input.uni-radio-input-checked {
						background: #fc0609 !important;
						border-color: #fc0609 !important;
					}
				}
			}

			.mode-bot {
				padding: 50rpx 30rpx 50rpx 30rpx;
			}
		}

		//支付方式弹出 E

		//支付密码弹出 S
		.pay-close {
			width: 18rpx;
			height: 18rpx;
			position: absolute;
			right: 0;
			top: 10rpx;
		}

		.pay-input {
			height: 78rpx;
			background: #f5f5f5;
			border-radius: 10rpx;
			padding: 0 20rpx;

			.input {
				width: 100%;
				height: 78rpx;
				font-size: 28rpx;
				text-align: left;
			}
		}

		.pay-bot {
			.pay-btn {
				width: 260rpx;
				height: 80rpx;
				background: #fc0609;
				border-radius: 40rpx;
				display: block;
				margin: 0 auto;
				line-height: 80rpx;
				font-size: 32rpx;
				color: #fff;
			}
		}

		//支付密码弹出 E

		//优惠券弹出 S
		.you-pop {
			background: #ffffff;
			border-radius: 20rpx 20rpx 0px 0px;

			.you-head {
				padding: 40rpx 35rpx;
				border-bottom: 1px solid #f5f5f5;
				display: flex;
				align-items: center;
				line-height: 1;
				justify-content: space-between;

				.t {
					font-size: 32rpx;
					font-weight: 550;
				}

				.cancel {
					font-size: 26rpx;
					color: #999;
				}

				.define {
					font-size: 26rpx;
					color: #fc0609;
				}
			}

			.you-ul {
				height: 600rpx;
				overflow-y: auto;
				padding: 30rpx 20rpx;

				.li {
					display: flex;
					height: 209rpx;
					position: relative;
					align-items: center;
					line-height: 50rpx;
					padding: 0 30rpx;
					justify-content: space-between;

					.li-bg {
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
					}

					.li-fl {
						position: relative;
						z-index: 22;
						width: 30%;
						text-align: center;
					}

					.li-fr {
						position: relative;
						z-index: 22;
						width: 60%;

						image {
							width: 40rpx;
							height: 40rpx;
						}
					}

					.li-t {
						font-weight: 550;
						padding: 6rpx 0;
					}

					.li-line {
						height: 1px;
						background: #e4e4e4;
					}

					.li-c {
						padding: 6rpx 0;

						.c {
							font-size: 28rpx;
							color: #fc0609;
						}

						.date {
							color: #666;
							font-size: 24rpx;
						}
					}
				}
			}
		}

		//优惠券弹出 E
	}

	//rule-pop S
	.rule-pop {
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background: #fff;
		padding: 30rpx 24rpx;
		position: relative;

		.pop-close {
			width: 18rpx;
			height: 18rpx;
			position: absolute;
			right: 24rpx;
			top: 30rpx;
		}

		.pop-hd {
			display: flex;
			padding-right: 30rpx;

			.hd-txt {
				.t {
					font-size: 28rpx;
					line-height: 1.6;
				}

				.c {
					font-size: 26rpx;
					margin: 10rpx 0;
				}

				.price {
					color: #fc0609;
					font-weight: 550;
				}
			}

			.hd-img {
				width: 175rpx;
				height: 175rpx;
				border-radius: 10rpx;
				min-width: 175rpx;
				margin-right: 20rpx;
			}
		}

		.pop-li {
			margin: 30rpx 0;

			.li-t {
				font-size: 28rpx;
				margin-bottom: 20rpx;
			}

			.li-tags {
				display: flex;
				flex-wrap: wrap;
				margin: 0 -10rpx;

				.tag {
					height: 62rpx;
					background: #eeeeee;
					border-radius: 32rpx;
					border: 1px solid #eee;
					padding: 0 20rpx;
					line-height: 62rpx;
					margin: 10rpx;
				}

				.active {
					border: 1px solid #f41a0c;
					background: #ffe9e8;
					color: #f41a0c;
				}
			}
		}

		.pop-num {
			display: flex;
			margin: 30rpx 0;
			align-items: center;
			justify-content: space-between;

			.t {
				font-size: 28rpx;
			}

			.num-coum {
				display: flex;

				.coum-btn {
					width: 54rpx;
					height: 45rpx;
					background: #eeeeee;
					border-radius: 10rpx 0px 0px 10rpx;
					text-align: center;
					line-height: 45rpx;
					color: #666;
					text-align: center;
				}

				.coum-btn.last {
					border-radius: 0px 10rpx 10rpx 0px;
				}

				.coum-input {
					width: 54rpx;
					height: 45rpx;
					background: #eeeeee;
					text-align: center;
					font-size: 30rpx;
					color: #666;
					text-align: center;
					margin: 0 3rpx;
				}
			}
		}
	}

	.pop-bot {
		margin: 50rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.public-btn {
			width: 690rpx;
			height: 90rpx;
			line-height: 90rpx;
		}
	}

	//rule-pop E
</style>