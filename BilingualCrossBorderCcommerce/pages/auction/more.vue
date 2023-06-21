<template>
	<view class="more">
		<view class="head-img">
			<view class="more-head">
				<image src="../../static/images/auth/left.png" @click="toBack()"></image>
				<view>{{title}}</view>
			</view>

			<!--抢拍分类框-->
			<view class="ongoing-type">
				<!--正在竞拍小框，只有在productId==1的时候展示-->
				<view class="ongoing-type-left" v-if="id!=1">
					<view class="ongoing-type-left-head"
						style="background: linear-gradient(180.00deg, rgba(255,198.2,198.2,1.00),rgba(255,254.75,254.75,0.00) 98.871%);">
						<image src="/static/images/new-index/ongoing.png" class="ongoing-type-left-head-logo"></image>
						<view class="ongoing-type-left-txt">
							<view>{{$t('new.zzjp')}}</view> <span style="rgba(255, 64, 41, 0.4)"></span>
						</view>
						<view class="ongoing-type-left-more" @click="toMore(1)">
							<view>More</view>
							<image src="/static/images/products/right.png"></image>
						</view>
					</view>
					<view class="ongoing-type-left-info">
						<view class="ongoing-type-left-info-des" v-for="item in jingpaiList.slice(0,2)" :key="item.id"
							@click="onJingPai(item)">
							<image :src="item.image" class="ongoing-type-left-info-des-product"></image>
							<view class="jping-jd-data">
								<progress class="progress" :percent="item.finish_rate*100" stroke-width="5"
									activeColor="#FF4E2F" backgroundColor="#EBEBEB" />
							</view>
							<view class="old_price">RM{{item.price}}</view>
							<view class="new_price">RM<span>{{item.auction_price}}</span></view>
						</view>
					</view>
				</view>

				<!--即将开始小框，任何时候都展示-->
				<view class="ongoing-type-left" v-if="id!=2">
					<view class="ongoing-type-left-head"
						style="background: linear-gradient(180.00deg, rgba(253.86,225.53,151.16,1.00),rgba(255,254.75,254.75,0.00) 98.871%);">
						<image src="/static/images/new-index/start-soon.png" class="ongoing-type-left-head-logo">
						</image>
						<view class="ongoing-type-left-txt">
							<view>{{$t('new.jjks')}}</view> <span></span>
						</view>
						<view class="ongoing-type-left-more" @click="toMore(2)">
							<view>More</view>
							<image src="/static/images/products/right.png"></image>
						</view>
					</view>
					<view class="ongoing-type-left-info">
						<view class="ongoing-type-left-info-des" v-for="item in newsjingpaiList.slice(0,2)"
							:key="item.id" @click="onJingPai(item)">
							<image :src="item.image" class="ongoing-type-left-info-des-product"></image>
							<view class="ongoing-type-left-info-des-time">
								<image src="/static/images/new-index/time.png"></image>
								<view>
									<u-count-down :time="item.datetime" format="HH:mm:ss"></u-count-down>
								</view>
							</view>
							<view class="ongoing-type-left-info-des-price">RM<span>{{item.auction_price}}</span></view>
						</view>
					</view>
				</view>

				<!--历史竞拍小框，只有在productId==2的时候展示-->
				<view class="ongoing-type-left" v-if="id!=3">
					<view class="ongoing-type-left-head">
						<image src="/static/images/new-index/historical.png" class="ongoing-type-left-head-logo">
						</image>
						<view class="ongoing-type-left-txt">
							<view>{{$t('new.lsjl')}}</view> <span style="background: rgba(99, 97, 250, 0.4);"></span>
						</view>
						<view class="ongoing-type-left-more" @click="toMore(3)">
							<view>More</view>
							<image src="/static/images/products/right.png"></image>
						</view>
					</view>
					<view class="ongoing-type-left-info">
						<view class="ongoing-type-left-info-des" v-for="item in historyList.slice(0,2)" :key="item.id"
							@click="onJingPai(item)">
							<image :src="item.image" class="ongoing-type-left-info-des-product"></image>
							<view class="ongoing-type-left-info-des-auth">
								<image :src="item.user_info.avatar"></image>
								<view>Lucky Star</view>
							</view>
							<view class="ongoing-type-left-info-des-price">RM<span>{{item.auction_price}}</span></view>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!--正在抢拍的数据-->
		<view class="new-list">
			<view class="new-list-head">
				<block>
					<image src="/static/images/new-index/ongoing.png" class="new-list-head-logo" v-if="id==1"></image>
					<image src="/static/images/new-index/start-soon.png" class="new-list-head-logo" v-else-if="id==2">
					</image>
					<image src="/static/images/new-index/historical.png" class="new-list-head-logo" v-else></image>
					<view class="new-list-head-txt">
						<view>{{title}}</view>
						<span v-if="id==1"></span>
						<span style="background: rgb(254, 204, 171);" v-else-if="id==2"></span>
						<span style="background: rgba(99, 97, 250, 0.4);" v-else></span>
					</view>
				</block>

				<image src="/static/images/new-index/sx.png" class="new-list-head-sx" @click="selectId=1"
					v-if="selectId!=1"></image>
				<image src="/static/images/new-index/sx1.png" class="new-list-head-sx" v-else></image>

				<image src="/static/images/new-index/mf.png" class="new-list-head-mf" @click="selectId=2"
					v-if="selectId!=2"></image>
				<image src="/static/images/new-index/mf1.png" class="new-list-head-mf" v-else></image>

				<image src="/static/images/new-index/p.png" class="new-list-head-p" @click="selectId=3"
					v-if="selectId!=3"></image>
				<image src="/static/images/new-index/p1.png" class="new-list-head-p" v-else></image>
				<view class="new-list-head-line"></view>
			</view>

			<!--单行显示-->
			<block v-if="selectId==1">
				<view class="new-list-item" v-for="(item,i) in productList" :key="i" @click="onJingPai(item)"
					@longpress="item.isMask=true">
					<image :src="item.image" class="new-list-item-left"></image>
					<view class="new-list-item-right">
						<view class="new-list-item-right-txt">{{item.goods_name}}</view>
						<view class="new-list-item-right-tags">
							<image src="/static/images/new-index/kzx.png"></image>
							<image src="/static/images/new-index/xpss.png"></image>
							<image src="/static/images/new-index/tjsp.png"></image>
							<image src="/static/images/new-index/rmsp.png"></image>
							<!-- <block v-for="(data,index) in item.tags" :key="data.tag_id">
								<view>{{data.name}}</view>
							</block> -->
						</view>

						<view class="new-list-item-right-start">
							<view class="new-list-item-right-start-info">
								<image src="../../static/images/new-index/xx.png"></image>
								<view>7.9k</view>
							</view>
							<view class="new-list-item-right-start-info">
								<image src="../../static/images/new-index/xcz.png"></image>
								<view>868</view>
							</view>
							<view class="new-list-item-right-start-info">
								<view>868 Sold</view>
							</view>
						</view>

						<view class="new-list-item-right-jd" v-if="id==1">
							<view class="new-list-item-right-jd-data">
								<view>{{(item.finish_rate*100).toFixed(0)}}%</view>
								<image src="../../static/images/new-index/select-jd.png"></image>
							</view>
							<view class="new-list-item-right-jd-auth">
								<image src="../../static/images/products/auth.png"></image>
								<image src="../../static/images/products/auth.png"></image>
								<image src="../../static/images/products/auth.png"></image>
							</view>
						</view>

						<view class="new-list-item-btm">
							<view class="new-list-item-btm-price">
								<view class="new">RM<span>{{item.auction_price}}</span></view>
								<view class="old">RM{{item.price}}</view>
							</view>


							<view class="new-list-item-btm-btn" v-if="id==1">
								<image src="../../static/images/new-index/lvxcz.png"></image>
								<view @click.stop="onMineInfo(item)">{{$t('shop.qiangpai')}}</view>
							</view>
						</view>

						<view class="mask" v-show="item.isMask">
							<image src="/static/images/new-index/close.png" class="close"
								@click.stop="item.isMask=false"></image>
							<view style="height: 46rpx;"></view>
							<view class="mask-info">
								<image src="../../static/images/new-index/kzx.png"></image>
								<view>Here is the product label description</view>
							</view>
							<view class="mask-info">
								<image src="../../static/images/new-index/xpss.png"></image>
								<view>Here is the product label description</view>
							</view>
							<view class="mask-info">
								<image src="../../static/images/new-index/tjsp.png"></image>
								<view>Here is the product label description</view>
							</view>
							<view class="mask-info">
								<image src="../../static/images/new-index/rmsp.png"></image>
								<view>Here is the product label description</view>
							</view>
						</view>

					</view>
				</view>
			</block>

			<!--一行双列显示-->
			<block v-else-if="selectId==2">
				<view class="new-list-item-two">
					<view class="info" v-for="(item,i) in productList" :key="i" @click="onJingPai(item)">
						<image :src="item.image" class="info-img"></image>
						<view class="info-tit">{{item.goods_name}}</view>

						<view class="info-tags">
							<view class="info-tag">
								<image src="/static/images/new-index/xx.png"></image>
								<view>7.9k</view>
							</view>

							<view class="info-tag">
								<image src="/static/images/new-index/xx.png"></image>
								<view>868</view>
							</view>

							<view class="info-tag">
								<view>868 Sold</view>
							</view>
						</view>

						<view class="info-jd" v-if="id==1">
							<image src="/static/images/new-index/select-jd.png"></image>
							<view>{{(item.finish_rate*100).toFixed(0)}}%</view>
						</view>

						<view class="info-btm">
							<view class="info-price">
								<view class="new">RM<span>{{item.auction_price}}</span></view>
								<view class="old">RM{{item.price}}</view>
							</view>

							<view class="info-btn" v-if="id==1">
								<image src="/static/images/new-index/lvxcz.png"></image>
								<view @click.stop="onMineInfo(item)">{{$t('shop.qiangpai')}}</view>
							</view>
						</view>
					</view>
				</view>
			</block>

			<!--竖向单行显示-->
			<block v-else>
				<view class="new-list-line" v-for="(item,i) in productList" :key="i" @click="onJingPai(item)">
					<image :src="item.image" class="product_img"></image>
					<view class="product_txt">{{item.goods_name}}</view>

					<view class="info">
						<view class="info-left">
							<view class="info_jd" v-if="id==1">
								<image src="/static/images/new-index/select-jd.png"></image>
								<view>{{(item.finish_rate*100).toFixed(0)}}%</view>
							</view>
							<view class="info_price">
								<view class="new">RM<span>{{item.auction_price}}</span></view>
								<view class="old">RM{{item.price}}</view>
							</view>
						</view>

						<view class="info-right" v-if="id==1">
							<image src="/static/images/new-index/lvxcz.png"></image>
							<view @click.stop="onMineInfo(item)">{{$t('shop.qiangpai')}}</view>
						</view>
					</view>

				</view>
			</block>

		</view>

		<!--抢拍次数 start-->
		<uni-popup ref="pwdPopup" type="center">
			<view class="qiangpaiShow">
				<image src="../../static/images/new/tck.png" class="kct"></image>
				<view class="query" @click="onQueryClick">
					<image class="" src="../../static/images/close1.png"> </image>
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
				<image src="../../static/images/new/tck.png" class="kct"></image>
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
						<image class="imgs" src="../../static/images/new/select.png"
							mode="aspectFit|aspectFill|widthFix">
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
				<image src="../../static/images/new/tck-my.png" class="pay-pwd-img"></image>
				<image src="../../static/images/new/close.png" class="pay-pwd-close" @click="onPwdQuery"></image>
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
				<image src="../../static/images/new/tck-cg.png" class="pay-pwd-img"></image>
				<!-- <image src="../../static/images/new/close.png" class="pay-pwd-close" @click="onPwdQuery"></image> -->
				<view class="pay-pwd-info" style="height: 308rpx;">
					<view class="pay-pwd-info-tit" style="font-size: 32rpx;">{{$t('auction.detail.gxnzfcgznzp')}}</view>
					<view class="pay-pwd-info-price" style="font-size: 26rpx;margin-top: 30rpx;">
						{{$t('auction.detail.zpydzpjlgg')}}
					</view>
					<view class="pay-pwd-list">
						<view class="pay-pwd-list-cancel" @click="onpayQuery">{{$t('auction.detail.query')}}</view>
						<view class="pay-pwd-list-ok" @click="onQiangpai" v-if="isShowAegin">
							{{$t('auction.detail.zaipaiyd')}}
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!--支付成功弹出 end-->

	</view>
</template>

<script>
	import jsencrypt from '@/common/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
	const publiukey = `-----BEGIN PUBLIC KEY-----
	MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSjs8JJr/Nyb+nOG77agUDf7uT
	c+kswdVEXbU8v5EL98brAw7fu4dQc1vkh1KSXqiC9EC7YmJzkkFoXUzTH2pvvDlq
	UuCwtdmXOsq/b1JWKyEXzQlPIiwdHnAUjGbmHOEMAY3jKEy2dY2I6J+giJqo8B2H
	NoR+zv3KaEmPSHtooQIDAQAB
	-----END PUBLIC KEY-----`
	export default {
		data() {
			return {
				title: '',
				id: 0,
				selectId: 1,
				productList: [], //商品展示
				jingpaiList: [], //正在竞拍
				newsjingpaiList: [], //即将开始
				historyList: [], //历史记录
				page: 1,
				pagenum: 10,
				shopNum: '',
				auction_num: '', // 剩余竞拍次数
				isauctionNum: '', // 输入的抢拍次数
				orderPayList: [{
					id: 1,
					title: this.$t('auction.detail.yuerzhifu'),
					isShow: false
				}, {
					id: 2,
					title: this.$t('auction.detail.sfzfu'),
					isShow: false
				}],
				pay_pwd: '', // 支付密码
				money: '', // 总金额
				isShowAegin: true,
				set_paypwd: '',
				MineCont: {}, // 实名认证
				noClick: true, // 防止重复点击 
			}
		},
		onLoad(e) {
			if (e.id) this.id = e.id
			console.log(this.id)
			if (e.id == 1) this.title = 'Ongoing'
			else if (e.id == 2) this.title = 'Start Soon'
			else this.title = 'Historical'
		},
		onShow() {
			if (uni.getStorageSync('token')) {
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
			}
		},
		mounted() {
			this.onAuctionNewGoods()
			this.onAuctionNotbeginGoods()
			this.onAuctionHistoryGoods()
		},
		methods: {
			toBack() {
				uni.navigateBack()
			},
			// 最新竞拍
			onAuctionNewGoods() {
				this.$http.post(this.$apiObj.AuctionNewGoods, {
					sort: 1,
					page: this.page,
					pagenum: this.pagenum,
				}).then(res => {
					if (res.code == 1) {
						res.data.data.forEach(item => {
							item.tags.forEach(items => {
								let arr = items.name.split('|')
								if (!this.isShopCont) {
									items.name = arr[0]
								} else {
									if (arr.length < 2) {
										items.name = arr[0]
									} else {
										items.name = arr[1]
									}
								}
							})
						})

						res.data.data.map(item => {
							item.remain_time = item.remain_time * 1000
						})
						this.totalPageNum = res.data.total
						this.productList = this.page == 1 ? res.data.data : [...this.productList, ...res.data
							.data
						]
						this.productList.forEach(item => {
							this.$set(item, 'djs', (item.pre_end_time - Date.parse(new Date()) / 1000) *
								1000)
							this.$set(item, 'isMask', false)
						})
						this.jingpaiList = this.productList
					}
				})
			},

			// 即将开始
			onAuctionNotbeginGoods() {
				this.$http.post(this.$apiObj.AuctionNotbeginGoods, {
					sort: 1,
					page: this.page,
					pagenum: this.pagenum
				}).then(res => {
					if (res.code == 1) {
						res.data.data.forEach(item => {
							item.tags.forEach(items => {
								let arr = items.name.split('|')
								if (!this.isShopCont) {
									items.name = arr[0]
								} else {
									if (arr.length < 2) {
										items.name = arr[0]
									} else {
										items.name = arr[1]
									}
								}
							})
						})
						res.data.data.map(item => {
							let time = (item.start_time - Date.parse(new Date()) / 1000) *
								1000
							this.$set(item, 'datetime', time)
						})
						this.totalPageNum = res.data.total
						this.productList = this.page == 1 ? res.data.data : [...this.productList,
								...res
								.data.data
							],
							this.newsjingpaiList = this.productList
					}
				})
			},

			// 历史竞拍
			onAuctionHistoryGoods() {
				this.$http.post(this.$apiObj.AuctionHistoryGoods, {
					sort: 1,
					page: this.page,
					pagenum: this.pagenum,
					date_start: ''
				}).then(res => {
					if (res.code == 1) {
						res.data.data.forEach(item => {
							item.tags.forEach(items => {
								let arr = items.name.split('|')
								if (!this.isShopCont) {
									items.name = arr[0]
								} else {
									if (arr.length < 2) {
										items.name = arr[0]
									} else {
										items.name = arr[1]
									}
								}
							})
						})
						// res.data.data.map(item => {
						// 	item.continue_time = this.daojishi(item.continue_time)
						// })
						this.totalPageNum = res.data.total
						this.productList = this.page == 1 ? res.data.data : [...this.productList, ...res.data
							.data],
							this.historyList = this.productList
					}
				})
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
						this.auction_num = (e.auction_type == 2 && e.total_least_num == 0) ? res.data
							.auction_num :
							(res.data.auction_num === -1) ? e.total_least_num : (res.data.auction_num < e
								.total_least_num) ? res.data.auction_num : e.total_least_num
						// this.auction_num = res.data.auction_num
						if (res.data.auction_num !== 0) {
							this.$refs.pwdPopup.open()
						} else {
							this.$refs.pwdPopup3.open()
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
			},

			onQueryClick() {
				this.$refs.pwdPopup.close()
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
					if (res.code == 1) {
						// this.major_no = res.data.major_no
						this.order_no = res.data.order_no
						this.$refs.pwdPopup2.close()
						this.$refs.popup1.open()
					}
				})
			},

			onQuanClick(item) {
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
					this.$http.post(this.$apiObj.MineInfo, {
						auction_goods_id: this.shopCont.auction_goods_id
					}).then(resss => {
						if (resss.code == 1) {
							this.money = resss.data.money
							this.auction_num = resss.data.auction_num
						}
					})
					this.$http.post(this.$apiObj.AuctionorderMalaysiaPay, {
						order_no: this.order_no,
						money: this.shopNum
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
						this.isShowAegin = this.auction_num > this.isauctionNum
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

			// 点击支付成功取消按钮
			onpayQuery() {
				this.$refs.payPopup.close()
			},

			// 关闭支付密码
			onPwdQuery() {
				this.$refs.pwdsPopup.close()
			},
			// 点击竞拍列表
			onJingPai(item) {
				uni.navigateTo({
					url: './detail?id=' + item.auction_goods_id
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.more {
		width: 100%;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.more-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			// background: linear-gradient(180.00deg, rgb(51, 222, 114), rgb(5, 195, 146) 98.871%);

			image {
				position: absolute;
				left: 32rpx;
				width: 40rpx;
				height: 40rpx;
			}

			view {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: #FFF;
				text-align: center;
			}

		}
		
		.head-img{
			width: 750rpx;
			height: 560rpx;
			background: url('/static/images/new-index/head-img.png') no-repeat;
			background-size: 750rpx 560rpx;
		}
		
		//抢拍分类框
		.ongoing-type {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 20rpx;

			.ongoing-type-left {
				width: 332rpx;
				height: 274rpx;
				background: #fff;
				border-radius: 16rpx;
				margin: 0 10rpx;

				.ongoing-type-left-head {
					position: relative;
					width: 100%;
					height: 60rpx;
					display: flex;
					align-items: center;
					background: linear-gradient(180.00deg, rgba(194.37, 193.57, 255, 1.00), rgba(255, 254.75, 254.75, 0.00) 98.871%);
					border-radius: 16rpx 16rpx 0 0;

					.ongoing-type-left-head-logo {
						width: 36rpx;
						height: 36rpx;
						margin-left: 20rpx;
					}

					.ongoing-type-left-txt {
						position: relative;
						font-size: 24rpx;
						color: rgb(51, 51, 51);
						margin-left: 8rpx;

						view {
							position: relative;
							z-index: 2;
						}

						span {
							position: relative;
							display: block;
							width: 72rpx;
							height: 8rpx;
							background: rgb(254, 204, 171);
							border-radius: 100rpx;
							margin: -8rpx auto 0 auto;
							z-index: 1;
						}

					}

					.ongoing-type-left-more {
						position: absolute;
						right: 20rpx;
						font-size: 20rpx;
						color: rgb(102, 102, 102);
						display: flex;
						align-items: center;

						image {
							display: block;
							width: 16rpx;
							height: 16rpx;
							margin-top: 4rpx;
							margin-left: 4rpx;
						}
					}

				}

				.ongoing-type-left-info {
					width: 100%;
					display: flex;
					align-items: center;

					.ongoing-type-left-info-des {
						width: 50%;

						.jping-jd-data {
							width: 108rpx;
							margin: 4rpx auto 8rpx auto;
						}

						.ongoing-type-left-info-des-product {
							display: block;
							width: 132rpx;
							height: 132rpx;
							margin: 0 auto;
						}

						.ongoing-type-left-info-des-time {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 112rpx;
							height: 26rpx;
							font-size: 14rpx;
							color: rgb(255, 57, 57);
							padding: 2rpx 8rpx;
							border: 1px solid rgba(255, 57, 57, 0.4);
							border-radius: 20rpx;
							margin: 4rpx auto 8rpx auto;

							image {
								width: 14rpx;
								height: 14rpx;
								margin-right: 6rpx;
							}

						}

						.ongoing-type-left-info-des-auth {
							width: 100%;
							height: 30rpx;
							font-size: 16rpx;
							color: rgb(51, 51, 51);
							display: flex;
							align-items: center;
							justify-content: center;
							margin: 4rpx 0 8rpx 0;

							image {
								width: 24rpx;
								height: 24rpx;
								border-radius: 50%;
								margin-right: 8rpx;
							}
						}

						.ongoing-type-left-info-des-price {
							width: 100%;
							font-size: 16rpx;
							color: rgb(255, 57, 57);
							text-align: center;

							span {
								font-size: 28rpx;
								font-weight: bold;
							}
						}

						.old_price {
							width: 100%;
							font-size: 16rpx;
							color: rgb(153, 153, 153);
							text-decoration: line-through;
							text-align: center;
						}

						.new_price {
							width: 100%;
							font-size: 16rpx;
							font-weight: bold;
							color: rgb(255, 57, 57);
							text-align: center;

							span {
								font-size: 28rpx;
							}
						}

					}

				}

			}

		}


		//抢拍商品展示
		.new-list {
			width: 100%;
			min-height: 1100rpx;
			padding: 24rpx 0;
			background: #fff;
			border-radius: 16rpx 16rpx 0 0;
			margin-top: -64rpx;

			//头部切换
			.new-list-head {
				position: relative;
				width: 100%;
				display: flex;
				align-items: center;
				margin-bottom: 36rpx;

				.new-list-head-logo {
					width: 48rpx;
					height: 48rpx;
					margin-left: 32rpx;
				}

				.new-list-head-txt {
					position: relative;
					font-size: 32rpx;
					color: rgb(51, 51, 51);
					margin-left: 8rpx;

					view {
						position: relative;
						z-index: 2;
					}

					span {
						position: relative;
						display: block;
						width: 92rpx;
						height: 8rpx;
						background: rgba(255, 64, 41, 0.4);
						border-radius: 100rpx;
						margin: -8rpx auto 0 auto;
						z-index: 1;
					}
				}

				.new-list-head-product {
					font-size: 32rpx;
					font-weight: bold;
					color: rgb(51, 51, 51);
					margin-left: 32rpx;
				}

				.new-list-head-sx {
					position: absolute;
					right: 150rpx;
					width: 32rpx;
					height: 32rpx;
				}

				.new-list-head-mf {
					position: absolute;
					right: 100rpx;
					width: 32rpx;
					height: 32rpx;
				}

				.new-list-head-p {
					position: absolute;
					right: 50rpx;
					width: 32rpx;
					height: 32rpx;
				}

				.new-list-head-more {
					position: absolute;
					right: 32rpx;
					display: flex;
					align-items: center;

					image {
						width: 16rpx;
						height: 16rpx;
						margin: 4rpx 0 0 4rpx;
					}
				}

			}

			//单行显示
			.new-list-item {
				width: 686rpx;
				height: 272rpx;
				display: flex;
				align-items: center;
				background: #fff;
				box-shadow: 0px 4rpx 12rpx rgba(198, 198, 198, 0.3);
				border-radius: 20rpx;
				margin: 0 auto 16rpx auto;

				.new-list-item-left {
					width: 272rpx;
					height: 272rpx;
					border-radius: 20rpx 0 0 20rpx;
				}

				.new-list-item-right {
					position: relative;
					width: 352rpx;
					height: 100%;
					margin-left: 24rpx;

					.new-list-item-right-txt {
						position: absolute;
						top: 20rpx;
						width: 352rpx;
						font-size: 28rpx;
						font-weight: bold;
						color: rgb(51, 51, 51);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.new-list-item-right-tags {
						position: absolute;
						top: 64rpx;
						width: 100%;
						font-size: 16rpx;
						color: rgb(102, 102, 102);
						display: flex;
						flex-wrap: wrap;
						align-items: center;

						view {
							padding: 4rpx 8rpx;
							box-sizing: border-box;
							border: 1rpx solid rgb(204, 204, 204);
							border-radius: 4rpx;
							margin-right: 12rpx;
						}

						image {
							width: 28rpx;
							height: 28rpx;
							margin-right: 16rpx;
						}

					}

					.new-list-item-right-start {
						position: absolute;
						top: 110rpx;
						width: 100%;
						display: flex;
						align-items: center;

						.new-list-item-right-start-info {
							min-width: 86rpx;
							font-size: 16rpx;
							color: rgb(102, 102, 102);
							text-align: center;
							display: flex;
							align-items: center;
							justify-content: center;

							image {
								width: 16rpx;
								height: 16rpx;
								margin-right: 4rpx;
							}
						}

						.new-list-item-right-start-info:nth-child(2) {
							border: 1rpx solid rgb(204, 204, 204);
							border-top: none;
							border-bottom: none;
						}

					}

					.new-list-item-right-jd {
						position: absolute;
						top: 146rpx;
						width: 100%;
						display: flex;
						align-items: center;

						.new-list-item-right-jd-data {
							position: relative;
							width: 280rpx;
							height: 32rpx;
							background: url('/static/images/new-index/jd-bj.png') no-repeat;
							background-size: 280rpx 32rpx;

							view {
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
								font-size: 20rpx;
								color: rgb(255, 255, 255);
								z-index: 2;
							}

							image {
								position: absolute;
								top: 50%;
								left: 2rpx;
								transform: translate(0, -50%);
								width: 228rpx;
								height: 28rpx;
								z-index: 1;
							}

						}

						.new-list-item-right-jd-auth {
							display: flex;
							align-items: center;

							image {
								position: relative;
								width: 32rpx;
								height: 32rpx;
								border-radius: 50%;
								margin-left: 4rpx;
								z-index: 3;
							}

							image:nth-child(2) {
								position: relative;
								margin-left: -14rpx;
								z-index: 2;
							}

							image:nth-child(3) {
								position: relative;
								margin-left: -14rpx;
								z-index: 1;
							}
						}

					}

					.new-list-item-btm {
						position: absolute;
						bottom: 24rpx;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.new-list-item-btm-price {

							.new {
								font-size: 20rpx;
								font-weight: bold;
								color: rgb(255, 57, 57);

								span {
									font-size: 32rpx;
								}
							}

							.old {
								font-size: 16rpx;
								color: rgb(153, 153, 153);
								text-decoration: line-through;
							}
						}

						.new-list-item-btm-btn {
							width: 124rpx;
							height: 48rpx;
							font-size: 24rpx;
							color: rgb(10, 198, 142);
							box-sizing: border-box;
							border: 1rpx solid rgb(10, 198, 142);
							border-radius: 100rpx;
							display: flex;
							align-items: center;
							justify-content: center;

							image {
								width: 24rpx;
								height: 24rpx;
								margin-right: 8rpx;
							}
						}

					}

					.mask {
						position: absolute;
						width: 100%;
						height: 100%;
						background: rgba(0, 0, 0, 0.86);
						border-radius: 0 20rpx 20rpx 0;
						z-index: 15;

						.close {
							position: absolute;
							right: 16rpx;
							top: 16rpx;
							width: 24rpx;
							height: 24rpx;
						}

						.mask-info {
							width: 100%;
							font-size: 16rpx;
							color: rgb(255, 255, 255);
							display: flex;
							align-items: center;
							margin-bottom: 20rpx;

							image {
								width: 36rpx;
								height: 36rpx;
								margin: 0 8rpx 0 20rpx;
							}
						}

					}

				}

			}

			//一行多列显示
			.new-list-item-two {
				width: 686rpx;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: space-between;
				margin: 0 auto;

				.info {
					width: 336rpx;
					min-height: 524rpx;
					max-height: 578rpx;
					background: rgb(255, 255, 255);
					box-shadow: 0px 4rpx 12rpx rgba(198, 198, 198, 0.3);
					border-radius: 20rpx;
					margin-bottom: 20rpx;

					.info-img {
						display: block;
						width: 336rpx;
						height: 336rpx;
						border-radius: 20rpx 20rpx 0 0;
					}

					.info-tit {
						width: 302rpx;
						font-size: 24rpx;
						color: rgb(51, 51, 51);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin: 16rpx auto;
					}

					.info-tags {
						min-width: 302rpx;
						display: flex;
						align-items: center;

						.info-tag {
							display: flex;
							align-items: center;
							padding: 0 16rpx;

							image {
								width: 16rpx;
								height: 16rpx;
							}

							view {
								font-size: 16rpx;
								color: rgb(102, 102, 102);
								margin-left: 8rpx;
							}
						}

						.info-tag:nth-child(2) {
							border: 1rpx solid rgb(204, 204, 204);
							border-top: none;
							border-bottom: none;
						}

					}

					.info-jd {
						position: relative;
						width: 296rpx;
						height: 32rpx;
						background: url('/static/images/new-index/jd-bj.png') no-repeat;
						background-size: 296rpx 32rpx;
						margin: 24rpx auto 28rpx auto;

						image {
							position: absolute;
							top: 50%;
							left: 2rpx;
							transform: translate(0, -50%);
							width: 228rpx;
							height: 28rpx;
						}

						view {
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%, -50%);
							font-size: 20rpx;
							color: rgb(255, 255, 255);
						}

					}

					.info-btm {
						width: 302rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin: 0 auto;

						.info-price {
							.new {
								font-size: 20rpx;
								font-weight: bold;
								color: rgb(255, 57, 57);

								span {
									font-size: 32rpx;
								}
							}

							.old {
								font-size: 16rpx;
								color: rgb(153, 153, 153);
								text-decoration: line-through;
							}

						}

						.info-btn {
							width: 124rpx;
							height: 48rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							box-sizing: border-box;
							border: 2rpx solid rgb(10, 198, 142);
							border-radius: 100rpx;

							image {
								width: 24rpx;
								height: 24rpx;
							}

							view {
								font-size: 24rpx;
								color: rgb(10, 198, 142);
								margin-left: 8rpx;
							}
						}
					}

				}

			}

			//竖向单行显示
			.new-list-line {
				width: 686rpx;
				padding-bottom: 24rpx;
				background: rgb(255, 255, 255);
				border-radius: 20rpx;
				box-shadow: 0px 4rpx 12rpx rgba(198, 198, 198, 0.3);
				margin: 0 auto 20rpx auto;

				.product_img {
					display: block;
					width: 686rpx;
					height: 686rpx;
					border-radius: 20rpx 20rpx 0 0;
				}

				.product_txt {
					width: 628rpx;
					font-size: 28rpx;
					color: rgb(51, 51, 51);
					margin: 16rpx auto 24rpx auto;
				}

				.info {
					width: 628rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 0 auto;

					.info-left {

						.info_jd {
							position: relative;
							width: 386rpx;
							height: 32rpx;
							background: url('/static/images/new-index/jd-bj.png') no-repeat;
							background-size: 386rpx 32rpx;

							image {
								position: absolute;
								top: 50%;
								left: 2rpx;
								transform: translate(0, -50%);
								width: 308rpx;
								height: 28rpx;
							}

							view {
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
								font-size: 20rpx;
								color: rgb(255, 255, 255);
							}
						}

						.info_price {
							display: flex;
							align-items: flex-end;
							margin-top: 14rpx;

							.new {
								font-size: 24rpx;
								font-weight: bold;
								color: rgb(255, 57, 57);
								margin-right: 8rpx;

								span {
									font-size: 40rpx;
								}
							}

							.old {
								font-size: 16rpx;
								color: rgb(153, 153, 153);
								text-decoration: line-through;
							}
						}

					}

					.info-right {
						width: 176rpx;
						height: 68rpx;
						box-sizing: border-box;
						border: 4rpx solid rgb(10, 198, 142);
						border-radius: 140rpx;
						display: flex;
						align-items: center;
						justify-content: center;

						image {
							width: 36rpx;
							height: 36rpx;
							margin-right: 8rpx;
						}

						view {
							font-size: 32rpx;
							color: rgb(10, 198, 142);
						}
					}

				}

			}

			//加入购物车
			.add_gwc {
				width: 48rpx;
				height: 48rpx;
				background: url('/static/images/new-index/add_gwc.png') no-repeat;
				background-size: 48rpx 48rpx;
			}

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
							color: rgb(255, 78, 47);
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
				color: rgb(255, 78, 47);
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

		.jingpai-ok {
			position: relative;

			.kct {
				width: 640rpx;
				height: 420rpx;
				display: block;
				margin: 0 auto -60rpx auto;
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
				// height: 428rpx;
				padding-top: 40rpx;
				padding-bottom: 20rpx;
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
						color: #fff;
						background: rgb(255, 78, 47);
						margin-left: 40rpx;
					}
				}

			}

		}

	}
</style>