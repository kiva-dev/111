<template>
	<view class="collect-page">
		<view class="collect-header">
			<image src="../../../static/images/new/left.png" @click="toMine"></image>
			<view>{{$t('user.myCont.scsp')}}</view>
		</view>

		<block v-if="jingpaiList.length<1">
			<view class="not-data">
				<image src="/static/images/new//zwdd.png"></image>
				<view>{{$t('new.zwxgnr')}}</view>
			</view>
		</block>
		<block v-else>
			<view class="collect-product" v-for="item in jingpaiList" :key="item.goods_id"
				@click="toProductInfo(item.goods_id)">
				<image :src="item.image" class="collect-product-img"></image>
				<view class="collect-product-info">
					<view class="collect-product-info-tit">{{item.goods_name}}</view>
					<view class="collect-product-info-price">RM{{item.goods_price}}</view>
					<view class="collect-product-info-list">
						<view class="collect-product-info-item" style="margin-right: 20rpx;" v-if="item.new_auction">
							<view style="background: rgba(255, 78, 47, 0.3);color: rgb(255, 78, 47);">{{$t('new.zzjp')}}
							</view>
							<view style="background: rgb(255, 78, 47);">RM{{item.new_auction}}</view>
						</view>
						<view class="collect-product-info-item" v-if="item.ready_begin">
							<view style="background: rgba(255, 179, 0, 0.2);color: rgb(255, 179, 0);">{{$t('new.jjks')}}
							</view>
							<view style="background: rgb(255, 179, 0);">RM{{item.ready_begin}}</view>
						</view>
					</view>
					<view class="collect-product-info-btm">
						<image src="/static/images/products/sj.png"></image>
						<view>{{item.shop_name}}</view>
					</view>
				</view>
			</view>
		</block>


		<!--抢拍次数 start-->
		<uni-popup ref="pwdPopup" type="center">
			<view class="qiangpaiShow">
				<image src="../../../static/images/new/tck.png" class="kct"></image>
				<view class="query" @click="onQueryClick">
					<image class="" src="../../../static/images/close1.png"> </image>
				</view>
				<view class="qiangpaiCont">
					<view class="center">
						<view class="cent">
							<view class="cont">
								<input type="number" :placeholder="$t('user.auctionM.qsrqpcs')" v-model="isauctionNum">
								<view class="num">
									<view style="color:#2c2c2c">{{$t('user.auctionM.syqpcs')}}</view>：<block
										v-if="auction_num=='-1'">
										{{$t('Unlimited sho')}}
									</block>
									<block v-else>{{auction_num}}</block>
								</view>
							</view>
						</view>
						<view class="qiangpai-btn">
							<view class="btnsub" @click="onBtnSub">{{$t('user.auctionM.queding')}}</view>
						</view>

					</view>
				</view>
			</view>
		</uni-popup>
		<!--抢拍次数 end-->
		<!--竞拍次数为0 start-->
		<uni-popup ref="pwdPopup3" type="center">
			<view class="jingpai-pop">
				<view class="title">{{$t('auction.detail.nsydjpcsw')}}{{auction_num}}{{$t('auction.detail.ci')}}</view>
				<view class="txt">{{$t('auction.detail.cgfxhyqhykhdjpcs')}}</view>
				<view class="cont">
					<view></view>
					<view class="right">
						<view class="name" @click="onQuery">{{$t('auction.detail.query')}}</view>
						<view class="ljfx" @click="onFengxiang">{{$t('auction.detail.lijifenxiang')}}</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!--竞拍次数为0 end-->

		<!--竞拍次数大于0 start-->
		<uni-popup ref="pwdPopup2" type="center">
			<view class="jingpai-ok">
				<image src="/static/images/new/tck.png" class="kct"></image>
				<view class="jingpai-pop">
					<view class="title">
						{{$t('auction.detail.sfqr')}}RM{{shopNum}}{{$t('auction.detail.gmygjpme')}}{{isauctionNum}}{{$t('auction.detail.gmygjpmenum')}}
					</view>
					<view class="txt" v-if="auction_num>='-1'">
						<block v-if="auction_num=='-1'">
							{{$t('Unlimited sho')}}
						</block>
						<block v-else>{{$t('auction.detail.nishengyu')}}{{auction_num}}{{$t('auction.detail.cijpjh')}}
						</block>
					</view>
					<view class="cent">
						<image class="imgs" src="/static/images/new/select.png" mode="aspectFit|aspectFill|widthFix">
						</image>
						<view class="txt1">{{$t('auction.detail.brywqydbty')}}</view>
						<navigator url="../mine/jpxy" hover-class="none" class="txt2">
							{{$t('auction.detail.jphdgommzxy')}}
						</navigator>
					</view>
					<view class="cont">
						<view></view>
						<view class="right">
							<view class="name" @click="ongoPayQuery">{{$t('auction.detail.query')}}</view>
							<view class="ljfx" @click="onOrderReferCartOrder">{{$t('auction.detail.btnsub')}}</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!--竞拍次数大于0 end-->

		<!--支付方式弹出 start-->
		<uni-popup ref="popup1" type="bottom">
			<view class="mode-pop">
				<view class="mode-tit">
					<text>{{$t('auction.detail.fyzf')}}</text>
					<view class="cancel" @click="toggle1Close">{{$t('auction.detail.query')}}</view>
				</view>
				<view class="cent">
					<view class="title">{{$t('auction.detail.xuzhufufy')}}</view>
					<view class="txt"><text>RM</text>{{shopNum}}</view>
				</view>
				<block v-if="shopNum>=10">
					<view v-for="item in orderPayList" :key="item.id" class="mode-li">
						<view class="label">
							{{item.title}}
							<block v-if="item.id==1">（{{$t('auction.detail.keyongyuer')}}<text class="color-red"
									style="color: #FF4E2F;">RM{{money}}</text>）</block>
						</view>
						<view class="li-fr" @click="onQuanClick(item)">
							<radio :checked="item.isShow?true:false" value="r1" />
						</view>
					</view>
				</block>
				<block v-else>
					<view class="mode-li">
						<view class="label">
							{{orderPayList[0].title}}
							<block v-if="orderPayList[0].id==1">（{{$t('auction.detail.keyongyuer')}}<text
									class="color-red" style="color: #FF4E2F;">RM{{money}}</text>）</block>
						</view>
						<view class="li-fr" @click="onQuanClick(orderPayList[0])">
							<radio :checked="orderPayList[0].isShow?true:false" value="r1" />
						</view>
					</view>
				</block>

				<view class="mode-bot">
					<button class="public-btn" style="background: #FF4E2F;"
						@click.stop="$noMultipleClicks(onPayClick)">{{$t('auction.detail.quzhifu')}}</button>
				</view>
			</view>
		</uni-popup>
		<!--支付方式弹出 end-->

		<!--支付密码弹出 start-->
		<uni-popup ref="pwdsPopup" type="center">
			<view class="pay-pwd">
				<image src="/static/images/new/tck-my.png" class="pay-pwd-img"></image>
				<image src="/static/images/new/close.png" class="pay-pwd-close" @click="onPwdQuery"></image>
				<view class="pay-pwd-info">
					<view class="pay-pwd-info-tit">{{$t('auction.detail.qsrzfmm')}}</view>
					<view class="pay-pwd-info-line"></view>
					<view class="pay-pwd-info-price">RM{{shopNum}}</view>
					<view class="pay-pwd-info-input">
						<input class="input" type="password" placeholder-class="color-999" v-model="pay_pwd"
							:placeholder="$t('auction.detail.qsrzfmm')" />
					</view>
					<view class="pay-pwd-info-btn" @click="onPwdClick">{{$t('auction.detail.btnsub')}}</view>
				</view>
			</view>
		</uni-popup>
		<!--支付密码弹出 end-->

		<!--支付成功弹出 start-->
		<uni-popup ref="payPopup" type="center">
			<view class="pay-pwd">
				<image src="/static/images/new/tck-cg.png" class="pay-pwd-img"></image>
				<view class="pay-pwd-info" style="height: 308rpx;">
					<view class="pay-pwd-info-tit" style="font-size: 32rpx;">{{$t('auction.detail.gxnzfcgznzp')}}</view>
					<view class="pay-pwd-info-price" style="font-size: 26rpx;margin-top: 30rpx;">
						{{$t('auction.detail.zpydzpjlgg')}}
					</view>
					<view class="pay-pwd-list">
						<view class="pay-pwd-list-cancel" @click="onpayQuery">{{$t('auction.detail.query')}}</view>
						<view class="pay-pwd-list-ok" @click="onQiangpai" v-if="auction_num > isauctionNum">
							{{$t('auction.detail.zaipaiyd')}}
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!--支付成功弹出 end-->

		<!--分享弹出 start-->
		<!-- <uni-popup ref="popup2" type="bottom">
			<view class="share-pop">
				<view class="share-t">{{$t('auction.detail.fengxiangdao')}}</view>
				<view class="share-ul">
					<view class="share-li" @click="ontweet">
						<view class="icon">
							<image class="img" src="/static/images/share21.png"></image>
						</view>
						<view class="t">twitter</view>
					</view>
					<view class="share-li" @click="onfacebook">
						<view class="icon">
							<image class="img" src="/static/images/share23.png"></image>
						</view>
						<view class="t">Facebook</view>
					</view>
					<view class="share-li">
						<view class="icon">
							<image class="img" src="../../static/images/share25.png"></image>
						</view>
						<view class="t">{{$t('auction.detail.fuzhilianjie')}}</view>
					</view>
				</view>
				<view class="share-bot">
					<button class="share-btn" @click="toggle2Close">{{$t('auction.detail.query')}}</button>
				</view>
			</view>
		</uni-popup> -->
		<!--分享弹出 end-->

		<!--优惠券弹出 start-->
		<!-- <view class="ticket-pop" v-show="show1">
			<view class="ticket-box">
				<view class="ticket-bg">
					<image class="img" src="./static/images/ticket1.png"></image>
				</view>
				<view class="ticket-con">
					<view class="ticket-t">{{$t('home.gxxsyhq')}}</view>
					<view class="ticket-ul">
						<view v-for="item in CouponList" :key="item.id" class="ticket-li">
							<view class="li-bg">
								<image class="img" src="/static/images/ticket2.png"></image>
							</view>
							<view class="li-fl">
								<view class="li-t">
									<view class="price">
										RM<text
											class="f-40">{{$filter.formatValue(item.money, 'split')[0]}}</text>.{{$filter.formatValue(item.money, 'split')[1] ? $filter.formatValue(item.money, 'split')[1] : '00'}}
									</view>
								</view>
								<view class="li-c">
									<view class="c">{{$t('home.man')}}{{item.use_limit}}{{$t('home.keyong')}}</view>
								</view>
							</view>
							<view class="li-fr">
								<view class="li-t">
									<view class="t">{{$t('home.yhq')}}</view>
								</view>
								<view class="li-line"></view>
								<view class="li-c">
									<view class="date">{{$t('home.yxq')}}{{item.days}}{{$t('home.day')}}</view>
								</view>
							</view>
						</view>
					</view>
					<view class="ticket-bot" @click="onOrderGetCoupon">{{$t('home.lingqu')}}</view>
				</view>
				<view class="ticket-close" @click="hide1">
					<image class="img" src="/static/images/close3.png"></image>
				</view>
			</view>
		</view> -->
		<!--优惠券弹出 end-->

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
		data() {
			return {
				jingpaiList: [], // 竞拍列表
				auction_num: '', // 剩余竞拍次数
				isauctionNum: '', // 输入的抢拍次数
				lanuage: '',
				shopNum: '', // 竞拍总价
				shopCont: '', // 商品详情
				order_no: '', // 订单编号
				noClick: true, // 防止重复点击 
				orderPayList: [{
					id: 1,
					title: this.$t('auction.detail.yuerzhifu'),
					isShow: false
				}, {
					id: 2,
					title: this.$t('auction.detail.sfzfu'),
					isShow: false
				}],
				money: '', // 总金额
				pay_pwd: '', // 支付密码
				set_paypwd: '',
			}
		},
		onLoad() {
			// 关注商品
			this.onAuctionNewGoods()
			this.lanuage = uni.getStorageSync('locale')
		},
		onShow() {
			if (uni.getStorageSync('token')) {
				// this.isLogin = true
				// 判断是否设置支付密码
				this.$http.post(this.$apiObj.MineInfo).then(res => {
					if (res.code == 1) {
						this.set_paypwd = res.data.set_paypwd
					}
				})
				// 实名认证
				this.$http.post(this.$apiObj.MineAuthDetail).then(res => {
					if (res.code == 1) {
						this.MineCont = res.data
					}
				})
			} else {
				// this.isLogin = false
			}
		},
		methods: {
			toProductInfo(id) {
				uni.navigateTo({
					url: '/pages/auction/product_info?goodsId=' + id
				})
			},
			// 点击竞拍列表
			onJingPai(item) {
				uni.navigateTo({
					url: '/pages/auction/detail?id=' + item.auction_goods_id
				})
			},
			toMine() {
				uni.switchTab({
					url: '/pages/mine/mine'
				})
			},
			// 关注商品
			onAuctionNewGoods() {
				this.$http.post(this.$apiObj.MineFocusList, {
					page: this.page,
					pagenum: this.pagenum,
					type: 1
				}).then(res => {
					if (res.code == 1) {
						this.jingpaiList = res.data.data
					}
				})
			},
			onQueryClick() {
				this.$refs.pwdPopup.close()
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
			// 个人信息获取剩余竞拍次数
			onMineInfo(e) {
				for (let i in this.jingpaiList) {
					if (this.jingpaiList[i].auction_goods_id === e.auction_goods_id) {
						e = this.jingpaiList[i]
					}
				}
				this.isauctionNum = ''
				this.shopCont = e
				this.$http.post(this.$apiObj.MineInfo, {
					auction_goods_id: e.auction_goods_id
				}).then(res => {
					if (res.code == 1) {
						this.money = res.data.money
						this.auction_num = (e.auction_type == 2 && e.total_least_num == 0) ? res.data.auction_num :
							(res.data.auction_num === -1) ? e.total_least_num : (res.data.auction_num < e
								.total_least_num) ? res.data.auction_num : e.total_least_num
						// this.auction_num = res.data.auction_num
						this.auction_num = 10
						if (res.data.auction_num !== 0) {
							this.$refs.pwdPopup.open()
						} else {
							this.$refs.pwdPopup2.open()
						}
					}
				})
			},
			// 点击提交抢拍次数数据
			onBtnSub() {
				if (this.isauctionNum > 10000) return uni.showToast({
					icon: 'none',
					title: this.$t('zdcsbn')
				})
				// // 请输入抢拍次数
				if (!this.isauctionNum) return uni.showToast({
					icon: 'none',
					title: this.$t('user.auctionM.qtxqpcs')
				})
				if (this.shopCont.auction_type == 1) {
					//1限额竞拍
					if (Number(this.isauctionNum) > Number(this.shopCont.total_least_num)) return uni.showToast({
						icon: 'none',
						title: this.$t('auction.detail.title') + '：' + this.auction_num
					})
					if (Number(this.isauctionNum) > Number(this.isauctionNum)) return uni.showToast({
						icon: 'none',
						title: this.$t('user.auctionM.qtxdcsbndysy')
					})
				} else {
					//1限额竞拍，2限时竞拍
					// if (Number(this.isauctionNum) > Number(this.shopCont.total_least_num)) return uni.showToast({ icon: 'none', title: this.$t('auction.detail.title') + '：' + this.shopCont.total_least_num })
					// if (Number(this.isauctionNum) > Number(this.auction_num)) return uni.showToast({ icon: 'none', title: this.$t('user.auctionM.qtxdcsbndysy') })
				}
				this.shopNum = (this.shopCont.auction_price * Number(this.isauctionNum)).toFixed(2)
				this.$refs.pwdPopup.close()
				this.$refs.pwdPopup2.open()
				console.log(1)
			},
			onQuery() {
				this.$refs.pwdPopup3.close()
			},
			onFengxiang() {
				this.$refs.pwdPopup.close()
				this.$refs.popup2.open()
			},

			// 点击有剩余次数取消
			ongoPayQuery() {
				this.$refs.pwdPopup2.close()
			},
			// 提交订单
			onOrderReferCartOrder() {
				this.$http.post(this.$apiObj.AuctionorderReferOrder, {
					auction_type: 2, // 1竞拍商品原价购买，2参与竞拍价购买
					num: this.isauctionNum, // 购买数量
					coupon_id: '', // 优惠券id
					address_id: '', // 地址id
					remark: '', // 备注
					money: this.shopNum, // 总金额
					auction_goods_id: this.shopCont.auction_goods_id, // 竞拍商品id
				}).then(res => {
					console.log(res)
					if (res.code == 1) {
						// this.major_no = res.data.major_no
						this.order_no = res.data.order_no
						this.$refs.pwdPopup2.close()
						this.$refs.popup1.open()
					}
				})
			},
			// 点击竞拍去支付
			onPayClick() {
				let isNum
				for (let i in this.orderPayList) {
					if (this.orderPayList[i].isShow) {
						isNum = this.orderPayList[i].id
					}
				}
				if (!isNum) return uni.showToast({
					icon: 'none',
					title: this.$t('auction.detail.qxzzffs')
				})
				this.$refs.popup1.close()
				if (isNum == 1) {
					// 余额支付弹框
					this.$refs.pwdsPopup.open()
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
					// 3方支付
					// this.$http.post(this.$apiObj.AuctionorderReferOrder, {
					//   auction_type: 2,// 1竞拍商品原价购买，2参与竞拍价购买
					//   num: this.isauctionNum,// 购买数量
					//   coupon_id: '',// 优惠券id
					//   address_id: '',// 地址id
					//   remark: '',// 备注
					//   money: this.shopCont.auction_price,// 总金额
					//   auction_goods_id: this.shopCont.auction_goods_id,// 竞拍商品id
					// }).then(ress => {
					// if (ress.code == 1) {
					this.$http.post(this.$apiObj.MineInfo, {
						auction_goods_id: this.shopCont.auction_goods_id
					}).then(resss => {
						if (resss.code == 1) {
							this.money = resss.data.money
							this.auction_num = resss.data.auction_num
						}
					})
					// this.order_no = ress.data.order_no
					this.$http.post(this.$apiObj.AuctionorderMalaysiaPay, {
						order_no: this.order_no,
						money: this.shopCont.auction_price
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
							div.setAttribute('style', 'position: absolute; width: 0; height: 0; overflow: hidden;')
							const form = div.querySelector('form')
							document.body.appendChild(div)
							form.submit()
							document.body.removeChild(div)
							//  #endif
							// #ifdef APP-PLUS  
							uni.navigateTo({
								url: '/pages/mine/webview?url=' + formStr
							});
							//  #endif
						}
					})
				}
			},
			toggle1Close() {
				this.$refs.popup1.close()
			},
			onQuanClick(item) {
				console.log(item)
				if (item.id == 1 && this.set_paypwd != '1') {
					this.$refs.popup1.close()
					for (let i in this.orderPayList) {
						this.orderPayList[i].isShow = false
					}
					uni.navigateTo({
						url: "../mine/setPassword"
					})
					return
				}
				for (let i in this.orderPayList) {
					this.orderPayList[i].isShow = false
				}
				item.isShow = true
			},

			// 点击支付密码
			onPwdClick() {
				if (!this.pay_pwd) return uni.showToast({
					title: this.$t('auction.detail.qingsshumm'),
					icon: 'none'
				})
				const pay_pwd = jsencrypt.setEncrypt(publiukey, String(this.pay_pwd))
				this.$http.post(this.$apiObj.AuctionorderBalancePay, {
					order_no: this.order_no, // 小订单号
					money: this.shopNum, // 支付总金额
					pay_pwd: pay_pwd, // rsa加密后的支付密码
				}).then(res => {
					if (res.code == 1) {
						// this.$http.post(this.$apiObj.MineInfo, { auction_goods_id: this.shopCont.auction_goods_id }).then(res => {
						//   if (res.code == 1) {
						//     this.money = res.data.money
						//     this.auction_num = res.data.auction_num
						//   }
						// })
						// this.onMineInfo()
						// this.onAuctionDetail()
						this.page = 1
						this.onAuctionNewGoods()
						setTimeout(() => {
							this.pay_pwd = ''
							this.onMineInfo(this.shopCont)
							this.$refs.pwdPopup.close()
							this.$refs.pwdPopup3.close()
							this.$refs.pwdsPopup.close()
							this.$refs.payPopup.open()
						}, 500);
					}
				})
			},
			// 点击抢拍
			onQiangpai() {
				this.$refs.payPopup.close()
				this.onMineInfo(this.shopCont)
				this.onAuctionNewGoods()
			},
			// 点击支付成功取消按钮
			onpayQuery() {
				this.$refs.payPopup.close()
			},
		}
	}
</script>

<style lang="less" scoped>
	.not-data {
		padding-top: 200rpx;

		image {
			display: block;
			width: 360rpx;
			height: 390rpx;
			margin: 0 auto;
		}

		view {
			width: 100%;
			font-size: 32rpx;
			color: rgb(190, 190, 190);
			text-align: center;
		}
	}

	.collect-page {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);
	}

	.collect-product {
		position: relative;
		width: 710rpx;
		height: 240rpx;
		display: flex;
		align-items: center;
		background: #FFF;
		border-radius: 16rpx;
		margin: 0 auto;

		.collect-product-img {
			width: 240rpx;
			height: 240rpx;
			border-radius: 16rpx;
		}

		.collect-product-info {

			.collect-product-info-tit {
				position: absolute;
				top: 20rpx;
				left: 260rpx;
				width: 430rpx;
				font-size: 24rpx;
				color: rgb(44, 44, 44);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.collect-product-info-price {
				position: absolute;
				top: 70rpx;
				left: 260rpx;
				font-size: 32rpx;
				color: rgb(255, 0, 0);
			}

			.collect-product-info-list {
				position: absolute;
				top: 126rpx;
				left: 260rpx;
				display: flex;
				align-items: center;

				.collect-product-info-item {
					width: 200rpx;
					height: 36rpx;
					font-size: 20rpx;
					color: rgb(255, 255, 255);
					display: flex;
					align-items: center;

					view {
						width: 50%;
						height: 36rpx;
						line-height: 36rpx;
						text-align: center;
						white-space: nowrap;
					}
				}
			}

			.collect-product-info-btm {
				position: absolute;
				left: 260rpx;
				bottom: 20rpx;
				font-size: 24rpx;
				color: rgb(44, 44, 44);
				display: flex;
				align-items: center;

				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
				}
			}

		}

	}


	//头部
	.collect-header {
		position: relative;
		width: 100%;
		height: 88rpx;
		display: flex;
		align-items: center;
		padding-top: 50rpx;
		background: rgb(255, 255, 255);
		margin-bottom: 30rpx;

		image {
			position: absolute;
			width: 60rpx;
			height: 60rpx;
			left: 20rpx;
			z-index: 10;
		}

		view {
			width: 100%;
			font-size: 36rpx;
			font-weight: bold;
			color: rgb(255, 78, 47);
			text-align: center;
		}
	}

	.jingpai-ok {
		position: relative;

		.kct {
			width: 640rpx;
			height: 420rpx;
			display: block;
			margin: 0 auto -60rpx auto;
		}
	}

	//竞拍中
	.jping {
		width: 710rpx;
		height: 280rpx;
		display: flex;
		align-items: center;
		background: #fff;
		border-radius: 16rpx;
		margin: 0 auto 30rpx auto;

		.jping-left {
			position: relative;
			width: 276rpx;
			height: 276rpx;
			border: 4rpx solid rgb(255, 78, 47);
			border-radius: 16rpx;

			image {
				width: 276rpx;
				height: 276rpx;
				border-radius: 16rpx;
			}

			.jping-left-q {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 280rpx;
				height: 70rpx;
				line-height: 70rpx;
				font-size: 28rpx;
				color: rgb(255, 255, 255);
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
				background: rgba(255, 78, 47, 0.3);
				border-radius: 0 0 12rpx 12rpx;
				z-index: 10;

				image {
					width: 50rpx;
					height: 50rpx;
					margin-right: 10rpx;
				}

			}
		}

		.jping-right {
			position: relative;
			height: 100%;
			width: 388rpx;
			margin-left: 20rpx;

			.jping-header {
				position: absolute;
				top: 20rpx;
				width: 100%;
				font-size: 24rpx;
				color: rgb(44, 44, 44);
				display: flex;
				align-items: center;
				justify-content: space-between;

				.jping-name {
					width: 220rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.jping-prouct-name {
					width: 150rpx;
					text-align: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

			}

			.jping-tags {
				position: absolute;
				top: 60rpx;
				width: 100%;
				height: 70rpx;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				// margin-top: 16rpx;

				view {
					// width: 120rpx;
					height: 34rpx;
					line-height: 34rpx;
					font-size: 16rpx;
					text-align: center;
					border-radius: 10rpx;
					margin-bottom: 6rpx;
					margin-right: 10rpx;
				}

				.lan {
					background: rgba(138, 212, 251, 0.5);
					color: rgb(0, 169, 255);
				}

				.chen {
					background: rgba(255, 221, 175, 0.5);
					color: rgb(255, 78, 47);
					// margin: 0 10rpx;
				}

				.red {
					background: rgba(255, 175, 175, 0.5);
					color: rgb(255, 0, 0);
				}
			}

			.jping-price {
				position: absolute;
				top: 134rpx;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				// margin-top: 30rpx;

				.jping-price-left {

					.jping-price-new {
						font-size: 26rpx;
						color: rgb(255, 0, 0);
					}

					.jping-price-old {
						font-size: 16rpx;
						color: rgb(190, 190, 190);
						text-decoration: line-through;
					}

				}

				.jping-price-btn {
					width: 100rpx;
					height: 50rpx;
					line-height: 50rpx;
					font-size: 24rpx;
					color: #fff;
					text-align: center;
					background: rgb(255, 78, 47);
					border-radius: 16rpx;
					margin-right: 10rpx;
				}

			}

			.jping-sjm {
				position: absolute;
				bottom: 54rpx;
				width: 300rpx;
				// text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.jping-jd {
				position: absolute;
				bottom: 14rpx;
				width: 100%;
				font-size: 24rpx;
				color: rgb(255, 78, 47);
				display: flex;
				align-items: center;
				justify-content: space-between;
				// margin-top: 30rpx;

				.jping-jd-data {
					width: 300rpx;
				}
			}

			.jping2 {
				color: rgb(190, 190, 190);
			}
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

		.cent {
			padding-top: 43rpx;
			text-align: center;

			.title {
				font-size: 26rpx;
				color: #222;
			}

			.txt {
				padding-top: 34rpx;
				padding-bottom: 38rpx;
				color: #FF4E2F;
				font-size: 46rpx;

				text {
					font-size: 24rpx;
				}
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
					background: #FF4E2F !important;
					border-color: #FF4E2F !important;
				}
			}
		}

		.mode-bot {
			padding: 50rpx 30rpx 50rpx 30rpx;
		}
	}

	//输入密码
	.pay-pwd {
		position: relative;

		.pay-pwd-img {
			display: block;
			width: 600rpx;
			height: 600rpx;
			margin: 0 auto -210rpx auto;
		}

		.pay-pwd-close {
			position: absolute;
			top: 420rpx;
			right: 30rpx;
			display: block;
			width: 60rpx;
			height: 60rpx;
			z-index: 10;
		}

		.pay-pwd-info {
			width: 686rpx;
			height: 428rpx;
			padding-top: 40rpx;
			background: #FFF;
			border: 4rpx solid rgb(255, 78, 47);
			border-radius: 16rpx;

			.pay-pwd-info-tit {
				width: 80%;
				font-size: 40rpx;
				font-weight: bold;
				text-align: center;
				margin: 0 auto;
			}

			.pay-pwd-info-line {
				width: 600rpx;
				border-bottom: 2rpx solid rgb(189, 189, 189);
				margin: 20rpx auto;
			}

			.pay-pwd-info-price {
				width: 100%;
				font-size: 38rpx;
				color: rgb(255, 78, 47);
				text-align: center;
			}

			.pay-pwd-info-input {
				width: 520rpx;
				height: 80rpx;
				background: #f5f5f5;
				border-radius: 10rpx;
				padding: 0 20rpx;
				margin: 20rpx auto;

				.input {
					width: 100%;
					height: 80rpx;
					font-size: 28rpx;
					text-align: left;
				}
			}

			.pay-pwd-info-btn {
				width: 400rpx;
				height: 80rpx;
				line-height: 80rpx;
				font-size: 32rpx;
				color: #fff;
				text-align: center;
				background: rgb(255, 78, 47);
				border-radius: 16rpx;
				margin: 40rpx auto;
			}

			.pay-pwd-list {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 60rpx;

				view {
					width: 220rpx;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 28rpx;
					text-align: center;
					border-radius: 16rpx;
				}

				.pay-pwd-list-cancel {
					border: 2rpx solid rgb(255, 78, 47);
				}

				.pay-pwd-list-ok {
					// width: 100%;
					color: #fff;
					background: rgb(255, 78, 47);
					margin-left: 40rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

		}

	}


	/deep/.uni-progress-inner-bar {
		border-radius: 6rpx !important;
	}

	/deep/.uni-progress-bar {
		border-radius: 6rpx !important;
	}

	/deep/.u-count-down__text {
		color: #fff !important;
	}

	.qiangpaiShow {
		position: relative;

		.kct {
			position: relative;
			width: 640rpx;
			height: 420rpx;
			display: block;
			margin: 0 auto -60rpx auto;
			z-index: 10;
		}
	}

	.query {
		position: absolute;
		top: 390rpx;
		right: 30rpx;
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		border: 1rpx solid #000;
		padding: 10rpx;
		z-index: 20;

		image {
			position: absolute;
			width: 20rpx;
			height: 20rpx;
			// top: 10rpx;
		}
	}

	.qiangpaiCont {
		width: 686rpx;
		background: #fff;
		position: relative;
		padding: 50rpx 0;
		border: 4rpx solid rgb(255, 78, 47);
		border-radius: 16rpx;
		z-index: 9;

		.center {
			.maxtitle {
				position: relative;
				display: flex;
				align-items: center;

				image {
					position: absolute;
					left: 62rpx;
					width: 72rpx;
					height: 72rpx;
				}

				.title {
					width: 100%;
					text-align: center;
					font-size: 36rpx;
					color: #000;
					font-weight: bold;
					margin-left: 20rpx;
				}
			}

			.cent {
				margin: 30rpx auto 40rpx;
				display: flex;

				.txt {
					margin-top: 5rpx;
					font-size: 30rpx;
					font-weight: bold;
					margin-right: 10rpx;
					max-width: 180rpx;
				}

				.cont {
					width: 566rpx;
					margin: 26rpx auto 0;
					text-align: center;

					input {
						width: 566rpx;
						height: 80rpx;
						border-radius: 16rpx;
						border: 2rpx solid rgb(255, 78, 47);
						font-size: 28rpx;
					}

					.num {
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 24rpx;
						margin-top: 30rpx;
						color: #fc0609;
					}
				}
			}

			.qiangpai-btn {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				.qiangpai-cancel {
					width: 206rpx;
					height: 70rpx;
					border-radius: 16rpx;
					line-height: 70rpx;
					text-align: center;
					font-size: 32rpx;
					color: #fff;
					background: rgb(255, 78, 47);
					margin-right: 30rpx;
				}

			}

			.btnsub {
				width: 406rpx;
				height: 70rpx;
				border-radius: 16rpx;
				line-height: 70rpx;
				text-align: center;
				font-size: 32rpx;
				color: #fff;
				background: rgb(255, 78, 47);
			}
		}
	}

	.jingpai-pop {
		width: 686rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 45rpx 0;
		border: 4rpx solid rgb(255, 78, 47);

		.title {
			width: 100%;
			font-size: 32rpx;
			color: #000;
			font-weight: bold;
			text-align: center;
		}

		.txt {
			width: 100%;
			margin-top: 24rpx;
			font-size: 24rpx;
			color: #fc0609;
			text-align: center;
		}

		.cent {
			width: 100%;
			display: flex;
			align-items: center;
			margin-top: 42rpx;
			// display: flex;
			// align-items: center;
			justify-content: center;

			.imgs {
				width: 26rpx;
				height: 26rpx;
				margin-right: 10rpx;
			}

			.txt1 {
				max-width: 240rpx;
				font-size: 24rpx;
				color: #999;
				text-align: center;
				margin: 0 10rpx;
			}

			.txt2 {
				max-width: 288rpx;
				font-size: 24rpx;
				color: #000;
				text-align: center;
			}
		}

		.cont {
			margin-top: 50rpx;
			display: flex;
			justify-content: center;

			.right {
				display: flex;

				view {
					width: 240rpx;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 32rpx;
					text-align: center;
					border-radius: 16rpx;
				}

				.name {
					font-size: 32rpx;
					color: #999;
					border: 1rpx solid rgb(255, 78, 47);
					margin-right: 97rpx;
				}

				.ljfx {
					color: #fff;
					background: rgb(255, 78, 47);

				}
			}
		}
	}
</style>