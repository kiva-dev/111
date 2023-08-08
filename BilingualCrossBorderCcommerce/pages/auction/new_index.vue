<template>
	<view class="auct-page">
		<view class="auct-head">
			<view class="auct-head-top">
				<image src="/static/images/new-index/logo.png" class="logo"></image>

				<view v-show="isShopCont">Here you have everything you want!</view>
				<view v-show="!isShopCont">让每个人都拥有他们想要的产品！</view>

				<image src="../../static/images/auction/zw.png" class="lange" v-show="!isShopCont"
					@click="onChangeLanuage(locales[0])"></image>
				<image src="/static/images/new-index/lange.png" class="lange" v-show="isShopCont"
					@click="onChangeLanuage(locales[1])"></image>

				<image src="/static/images/new-index/msg.png" class="auth" @click="navClick('/pages/mine/message')">
				</image>
			</view>
			<!--轮播图-->
			<view class="auct-banner">
				<swiper class="auct-banner-swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
					:interval="interval" :duration="duration" indicator-color="rgb(190, 190, 190)"
					indicator-active-color="rgb(255, 255, 255)">
					<swiper-item v-for="(item, index) in banner" :key="index">
						<view class="swiper-image" @click="getBanner(item)">
							<image :src="item.image" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view class="switch-layout">
			<scroll-view class="sl-scroll" scroll-x="true" @scrolltoupper="isBottoming = false"
				@scrolltolower="isBottoming = true">
				<view class="sl-scroll-box" v-for="item in FirstList" :key="item.id"
					@click="switchLogoToProduct(item.id,item.name);">
					<image :src="item.image" mode="widthFix"></image>
					<view :style="switch_id==item.id?'color: rgb(51, 222, 114);':''">{{item.name}}</view>
				</view>
			</scroll-view>
			<view class="sl-line">
				<view class="sl-line-bg" :style="{ left: isBottoming ? '14rpx':'0'}"></view>
			</view>
		</view>

		<!--抢拍分类框-->
		<view class="ongoing-type">
			<!--正在竞拍小框，只有在productId==1的时候展示-->
			<view class="ongoing-type-left" v-if="productId==1">
				<view class="ongoing-type-left-head"
					style="background: linear-gradient(180.00deg, rgba(255,198.2,198.2,1.00),rgba(255,254.75,254.75,0.00) 98.871%);">
					<image src="/static/images/new-index/ongoing.png" class="ongoing-type-left-head-logo"></image>
					<view class="ongoing-type-left-txt">
						<view>{{$t('tab.zzxy')}}</view> <span style="rgba(255, 64, 41, 0.4)"></span>
					</view>
					<view class="ongoing-type-left-more" @click="toMore(1)">
						<view>{{$t('auction.topMore')}}</view>
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
						<view class="new_price">
							<image src="/static/images/kbrick/diamond.png"></image>
							<span>{{item.auction_price}}</span>
						</view>
					</view>
				</view>
			</view>

			<!--即将开始小框，任何时候都展示-->
			<view class="ongoing-type-left">
				<view class="ongoing-type-left-head"
					style="background: linear-gradient(180.00deg, rgba(253.86,225.53,151.16,1.00),rgba(255,254.75,254.75,0.00) 98.871%);">
					<image src="/static/images/new-index/start-soon.png" class="ongoing-type-left-head-logo"></image>
					<view class="ongoing-type-left-txt">
						<view>{{$t('new.jjks')}}</view> <span></span>
					</view>
					<view class="ongoing-type-left-more" @click="toMore(2)">
						<view>{{$t('auction.topMore')}}</view>
						<image src="/static/images/products/right.png"></image>
					</view>
				</view>
				<view class="ongoing-type-left-info">
					<view class="ongoing-type-left-info-des" v-for="item in newsjingpaiList.slice(0,2)" :key="item.id"
						@click="onJingPai(item)">
						<image :src="item.image" class="ongoing-type-left-info-des-product"></image>
						<view class="ongoing-type-left-info-des-time">
							<image src="/static/images/new-index/time.png"></image>
							<view>
								<u-count-down :time="item.datetime" format="HH:mm:ss"></u-count-down>
							</view>
						</view>
						<view class="ongoing-type-left-info-des-price">
							<image src="/static/images/kbrick/diamond.png"></image><span>{{item.auction_price}}</span>
						</view>
					</view>
				</view>
			</view>

			<!--历史竞拍小框，只有在productId==2的时候展示-->
			<view class="ongoing-type-left" v-if="productId==2">
				<view class="ongoing-type-left-head">
					<image src="/static/images/new-index/historical.png" class="ongoing-type-left-head-logo"></image>
					<view class="ongoing-type-left-txt">
						<view>{{$t('new.lsjl')}}</view> <span style="background: rgba(99, 97, 250, 0.4);"></span>
					</view>
					<view class="ongoing-type-left-more" @click="toMore(3)">
						<view>{{$t('auction.topMore')}}</view>
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
						<view class="ongoing-type-left-info-des-price">
							<image src="/static/images/kbrick/diamond.png"></image><span>{{item.auction_price}}</span>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!--正在抢拍的数据-->
		<view class="new-list">
			<view class="new-list-head">
				<block v-if="productId==2">
					<image src="/static/images/new-index/ongoing.png" class="new-list-head-logo"></image>
					<view class="new-list-head-txt">
						<view>{{$t('new.zzjp')}}</view>
						<span></span>
					</view>
				</block>
				<block v-else>
					<view class="new-list-head-product">{{$t('newDetail.shangpin')}}</view>
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
				<view class="new-list-head-more" @click="productMore()">
					<view>{{$t('auction.topMore')}}</view>
					<image src="/static/images/products/right.png"></image>
				</view>
			</view>

			<!--单行显示-->
			<block v-if="selectId==1">
				<view class="new-list-item" v-for="(item,i) in productList" :key="i" @click="toProductOrJinpai(item)"
					@longpress="item.isMask=true">
					<image :src="item.image" class="new-list-item-left"></image>
					<view class="new-list-item-right">

						<view class="new-list-item-right-txt" v-if="productId==2">{{item.goods_name}}</view>
						<view class="product-right-txt" v-else>{{item.goods_name}}</view>

						<view class="new-list-item-right-tags" :style="productId==1 ? 'top: 112rpx;':''">
							<block v-if="productId==1">
								<block v-for="(data,index) in item.litestore_tag" :key="data.tag_id">
									<image :src="data.image"></image>
								</block>
							</block>
							<block v-else>
								<block v-for="(data,index) in item.tags" :key="data.tag_id">
									<image :src="data.image"></image>
								</block>
							</block>
						</view>

						<!-- <view class="new-list-item-right-start" :style="productId==1 ? 'top: 158rpx;':''">
							<view class="new-list-item-right-start-info">
								<image src="../../static/images/new-index/xx.png"></image>
								<view>{{item.litestore_goods_focus_total}}</view>
							</view>
						</view> -->

						<view class="new-list-item-right-jd" v-if="productId==2">
							<view class="new-list-item-right-jd-data">
								<view v-if="item.finish_rate">{{(item.finish_rate*100).toFixed(0)}}%</view>
								<image src="../../static/images/new-index/select-jd.png"
									:style="`width: ${(item.finish_rate*100).toFixed(0)}%;`"></image>
							</view>
							<view class="new-list-item-right-jd-auth">
								<block v-for="img in item.new_auction_avatar">
									<image :src="img"></image>
								</block>

							</view>
						</view>

						<view class="new-list-item-btm">
							<view class="new-list-item-btm-price" v-if="productId==2">
								<view class="new">
									<image src="/static/images/kbrick/diamond.png"></image>
									<span>{{item.auction_price}}</span>
								</view>
								<view class="old">RM{{item.price}}</view>
							</view>
							<view class="new-list-item-btm-price" v-else>
								<view class="new">RM<span>{{item.litestore_goods_spec[0].goods_price}}</span></view>
							</view>


							<view class="new-list-item-btm-btn" v-if="productId==2">
								<image src="../../static/images/new-index/lvxcz.png"></image>
								<view @click.stop="onMineInfo(item)">{{$t('shop.qiangpai')}}</view>
							</view>
							<view class="add_gwc" v-else @click.stop="addCart(item)"></view>
						</view>

						<view class="mask" v-show="item.isMask">
							<image src="/static/images/new-index/close.png" class="close"
								@click.stop="item.isMask=false"></image>
							<view style="height: 46rpx;"></view>
							<block v-if="productId==1">
								<view class="mask-info" v-for="data in item.litestore_tag">
									<image :src="data.image"></image>
									<view><u-parse :content="isShopCont?data.en_desc:data.zh_desc"></u-parse></view>
								</view>
							</block>
							<block v-else>
								<view class="mask-info" v-for="data in item.tags">
									<image :src="data.image"></image>
									<view><u-parse :content="isShopCont?data.en_desc:data.zh_desc"></u-parse></view>
								</view>
							</block>

						</view>

					</view>
				</view>
			</block>

			<!--一行双列显示-->
			<block v-else-if="selectId==2">
				<view class="new-list-item-two">
					<view class="info" v-for="(item,i) in productList" :key="i" @click="toProductOrJinpai(item)">
						<image :src="item.image" class="info-img"></image>
						<view class="info-tit">{{item.goods_name}}</view>

						<!-- <view class="info-tags">
							<view class="info-tag">
								<image src="/static/images/new-index/xx.png"></image>
								<view>{{item.litestore_goods_focus_total}}</view>
							</view>
						</view> -->

						<view class="info-jd" v-if="productId==2">
							<image src="/static/images/new-index/select-jd.png"
								:style="`width: ${(item.finish_rate*100).toFixed(0)}%;`"></image>
							<view>{{(item.finish_rate*100).toFixed(0)}}%</view>
						</view>

						<view class="info-btm" :style="productId==1?'margin-top: 32rpx;':''">
							<view class="info-price" v-if="productId==2">
								<view class="new">
									<image src="/static/images/kbrick/diamond.png"></image>
									<span>{{item.auction_price}}</span>
								</view>
								<view class="old">RM{{item.price}}</view>
							</view>
							<view class="info-price" v-else>
								<view class="new">RM<span>{{item.litestore_goods_spec[0].goods_price}}</span></view>
							</view>

							<view class="info-btn" v-if="productId==2">
								<image src="/static/images/new-index/lvxcz.png"></image>
								<view @click.stop="onMineInfo(item)">{{$t('shop.qiangpai')}}</view>
							</view>
							<view class="add_gwc" v-else @click.stop="addCart(item)"></view>
						</view>
					</view>
				</view>
			</block>

			<!--竖向单行显示-->
			<block v-else>
				<view class="new-list-line" v-for="(item,i) in productList" :key="i" @click="toProductOrJinpai(item)">
					<image :src="item.image" class="product_img"></image>
					<view class="product_txt">{{item.goods_name}}</view>

					<view class="info">
						<view class="info-left">
							<view class="info_jd" v-if="productId==2">
								<image src="/static/images/new-index/select-jd.png"
									:style="`width: ${(item.finish_rate*100).toFixed(0)}%;`"></image>
								<view>{{(item.finish_rate*100).toFixed(0)}}%</view>
							</view>
							<view class="info_price" v-if="productId==2">
								<view class="new">
									<image src="/static/images/kbrick/diamond.png"></image>
									<span>{{item.auction_price}}</span>
								</view>
								<view class="old">RM{{item.price}}</view>
							</view>
							<view class="info_price" v-else>
								<view class="new">RM<span>{{item.litestore_goods_spec[0].goods_price}}</span></view>
							</view>
						</view>

						<view class="info-right" v-if="productId==2">
							<image src="/static/images/new-index/lvxcz.png"></image>
							<view @click.stop="onMineInfo(item)">{{$t('shop.qiangpai')}}</view>
						</view>
						<view class="add_gwc" style="width: 64rpx;height: 64rpx;background-size: 64rpx 64rpx;" v-else
							@click.stop="addCart(item)">
						</view>
					</view>

				</view>
			</block>

			<!-- 			<view class="luck_list">
				<view class="head">
					<image src="/static/images/new-index/lv-start.png" class="head_img"></image>
					<view class="head_txt">
						<view>{{$t('xyzx')}}</view>
						<span></span>
					</view>
					<view class="head_more" @click="toXyzx">
						<view>{{$t('auction.topMore')}}</view>
						<image src="/static/images/products/right.png"></image>
					</view>
				</view>

				<view class="auct-luck">
					<view class="luck-ul">
						<navigator :url="`/pages/auction/detail?id=${item.auction_goods_id}&type=4`"
							open-type="navigate" hover-class="none" class="luck-li" v-for="item,k in LuckyList"
							:key="k">
							<view class="cent">
								<view class="li-img">
									<image class="img" :src="item.avatar"></image>
									<view class="box-name-level">
										<view class="level-icon">
											<image src="@/static/images/mine/mine_icon_vip.webp" mode="widthFix"></image>
										</view>
										<view class="level-num">Lv.{{item.level}}</view>
									</view>
								</view>
								<view class="li-txt">
									<view class="li-h">
										<view class="h-fl">
											<text class="name">{{item.nickname}}</text>
										</view>
										<view class="right">
											<view class="lis" @click.stop="onAuctionFocusLucky(item)">
												<image v-if="item.is_zan==1" src="/static/images/new/dz1.png" mode="" />
												<image v-else src="/static/images/new/dz.png" mode="" />{{item.zan_num}}
											</view>
										</view>
									</view>
									<template v-if="isShopCont">
										<view class="li-c">
											In the Joint contribution sales activities provided by{{' '}}
											<text style="color: rgb(10, 198, 142);">{{item.shop_name}}</text>
											,at the price of{{' '}}
											<text
												style="color: rgb(255, 57, 57); font-weight: bold;">RM{{item.pay_price}}</text>
											,I was lucky to win a
											{{item.goods_name}}
											{{' '}}worth{{' '}}
											<text
												style="color: rgb(255, 57, 57); font-weight: bold;">RM{{item.price}}</text>
										</view>
									</template>
									<template v-else>
										<view class="li-c">
											在
											<text style="color: rgb(10, 198, 142);">{{item.shop_name}}</text>
											提供的竞拍活动中，以
											<text style="color: rgb(255, 57, 57); font-weight: bold;">
												<image src="/static/images/kbrick/diamond.png"></image>
												{{item.pay_price}}
											</text>
											的价格，幸运地拍中价值
											<text
												style="color: rgb(255, 57, 57); font-weight: bold;">RM{{item.price}}</text>
											的
											{{item.goods_name}}
										</view>
									</template>
									<view class="li-date-f">
										<view class="bottom">
											<view class="li-date">{{$filter.to_date_time(item.update_time)}}</view>
											<view class="h-c" style="color: rgb(190,190,190);">
												{{item.stage_num}}{{$t('auction.qi')}}
											</view>
										</view>
									</view>

								</view>
							</view>
							<view class="luck-li-line" v-if="(k+1) < LuckyList.length"></view>
						</navigator>
					</view>
				</view>

			</view> -->

		</view>

		<image src="/static/images/new-index/gwc.png" v-show="productId==1" class="gwc"
			@click="navClick('/pages/cart/cart')"></image>



		<!--登录提醒-->
		<view class="not_login" v-show="showNotLogin">
			<view class="txt">Login to discover more exciting</view>
			<view class="btn" @click="toLogin()">Log in</view>
		</view>

		<!--最新用户竞拍提示-->
		<!-- <view class="jp_ts" v-show="showjpts">
			<image src="/static/images/products/auth.png" class="auth"></image>
			<image src="../../static/images/new-index/bcz.png" class="logo"></image>
			<view class="txt">{{$t('new.zxddlzy')}} {{isShopCont? addressInfo.name_en:addressInfo.name}}</view>
			<view class="time">{{addressInfo.time}}</view>
		</view> -->

		<!-- 日期时间选择器弹框 -->
		<uni-popup ref="dateTimePopup" type="bottom" :is-mask-click="false">
			<view class="custom-popup date-time-popup">
				<view class="popup-header">
					<view class="popup-cancel" @click="handleDateTimePopupCancel">{{$t('user.order.query')}}</view>
					<view class="popup-title"> </view>
					<view class="popup-confirm" @click="handleDateTimePopupConfirm">{{$t('user.order.btnsub')}}</view>
				</view>
				<view class="popup-body">
					<picker-view class="date-time-picker-view f-32" indicator-class="date-time-picker-center"
						:value="dateTimePickerValue" @change="handleDateTimePickerChange">
						<picker-view-column class="date-time-picker-item picker-month">
							<view class="picker-item"
								:class="{ active: dateTimePickerTempValue[0] === index, 'f-bold': dateTimePickerTempValue[0] === index }"
								v-for="(item, index) in monthList" :key="item">{{ item }}</view>
						</picker-view-column>
						<picker-view-column class="date-time-picker-item picker-date">
							<view class="picker-item"
								:class="{ active: dateTimePickerTempValue[1] === index, 'f-bold': dateTimePickerTempValue[1] === index }"
								v-for="(item, index) in dateList" :key="item">{{ item }}</view>
						</picker-view-column>
						<picker-view-column class="date-time-picker-item picker-year">
							<view class="picker-item"
								:class="{ active: dateTimePickerTempValue[2] === index, 'f-bold': dateTimePickerTempValue[2] === index }"
								v-for="(item, index) in yearList" :key="item">{{ item }}</view>
						</picker-view-column>
					</picker-view>
				</view>
			</view>
		</uni-popup>
		<!--抢拍次数 start-->
		<uni-popup ref="pwdPopup" type="center">
			<view class="qiangpaiShow">
				<!-- <image src="../../static/images/new/tck.png" class="kct"></image> -->
				<view class="query" @click="onQueryClick">
					<image class="" src="/static/images/kbrick/close.png"> </image>
				</view>
				<view class="qiangpaiCont">
					<view class="center">
						<view class="cent">
							<view class="cont">
								<view class="tit">{{$t('new.qpsl')}}</view>

								<view class="my-input">
									<image src="/static/images/kbrick/lv-cz.png"></image>
									<input type="number" :placeholder="$t('new.srqpsl')" v-model="isauctionNum">
								</view>

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
							<view class="btnsub" @click="onBtnSub">{{$t('auction.detail.btnsub')}}</view>
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
				<!-- <image src="../../static/images/new/tck.png" class="kct"></image> -->
				<view class="jingpai-pop">
					<view class="title">
						{{$t('auction.detail.sfqr')}} {{shopNum}} {{$t('new.kz')}} {{$t('auction.detail.gmygjpme')}}
						{{isauctionNum}} {{$t('auction.detail.gmygjpmenum')}}
					</view>
					<view class="txt" v-if="auction_num>='-1'">
						<block v-if="auction_num=='-1'">
							{{$t('Unlimited sho')}}
						</block>
						<block v-else>{{$t('auction.detail.nishengyu')}}{{auction_num}}{{$t('auction.detail.cijpjh')}}
						</block>
					</view>
					<view class="cent">
						<image class="imgs" src="/static/images/new-index/xz.png" mode="aspectFit|aspectFill|widthFix">
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
				<image src="/static/images/close1.png" class="mode-close" @click="toggle1Close"></image>

				<view class="mode-tit">
					<image src="/static/images/kbrick/diamond.png"></image>
					<view>{{shopNum}}</view>
				</view>

				<view class="mode-des">{{$t('new.xyzf')}}</view>

				<view class="mode-banlace" v-show="balance*1 < shopNum">{{$t('new.kzyebz')}}</view>

				<view class="mode-info">
					<image src="/static/images/kbrick/diamond.png" class="logo"></image>
					<view class="info-tit">
						<view class="info-name">{{$t('new.kzzf')}}</view>
						<view class="info-price">({{$t('new.kz')}}:<text>{{balance}}</text>)</view>
					</view>
					<view class="mode-info-right" @click="showRmToKdiamond=!showRmToKdiamond">
						<view>{{$t('new.dhfk')}}</view>
						<image src="/static/images/kbrick/btm.png" v-show="!showRmToKdiamond"></image>
						<image src="/static/images/kbrick/top.png" v-show="showRmToKdiamond"></image>
					</view>
				</view>

				<view class="mode-more" v-show="showRmToKdiamond">
					<view class="tit">{{$t('new.jh')}}:</view>
					<image src="/static/images/kbrick/diamond.png" class="logo"></image>
					<view class="num">{{(shopNum*1 - balance*1)>0 ? shopNum*1 - balance*1 : 0}}</view>
					<view class="price">RM <text>{{(shopNum*1 - balance*1)>0 ? shopNum*1 - balance*1 : 0}}</text></view>
					<image src="/static/images/new-index/wxz.png" class="select"
						v-show="!kdiamondSelect && (shopNum*1 - balance*1)>0" @click="kdiamondSelect=true"></image>
					<image src="/static/images/new-index/xz.png" class="select"
						v-show="kdiamondSelect && (shopNum*1 - balance*1)>0" @click="kdiamondSelect=false"></image>
				</view>

				<view class="mode-cz">
					<view @click="navClick('/pages/mine/K_brick_detail')">{{$t('new.qcz')}}</view>
					<image src="/static/images/kbrick/right.png"></image>
				</view>

				<view class="mode-switch" v-if="can_use_invite_money_rate>0">
					<image src="/static/images/new-index/wxz.png" v-show="!useInvite" @click="useInvite=!useInvite">
					</image>
					<image src="/static/images/new-index/xz.png" v-show="useInvite" @click="useInvite=!useInvite">
					</image>
					<view>(Bonuses can be used to deduct 10% K diamonds)</view>
				</view>
				<view class="mode-switch" v-else></view>

				<view class="mode-btn" @click.stop="$noMultipleClicks(onPayClick)">{{$t('new.payment')}}</view>

			</view>
		</uni-popup>
		<!--支付方式弹出 end-->
		<!--支付密码弹出 start-->
		<uni-popup ref="pwdsPopup" type="center">
			<view class="pay-pwd">
				<image src="/static/images/kbrick/close.png" class="pay-pwd-close" @click="onPwdQuery"></image>
				<view class="pay-pwd-info">
					<view class="pay-pwd-info-tit">{{$t('auction.detail.qsrzfmm')}}</view>
					<view class="pay-pwd-info-line"></view>
					<view class="pay-pwd-info-price">{{$t('new.kz')}} {{shopNum}}</view>
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
		<!--分享弹出 start-->
		<uni-popup ref="popup2" type="bottom">
			<view class="share-pop">
				<view class="share-t">{{$t('auction.detail.fengxiangdao')}}</view>
				<view class="share-ul">
					<view class="share-li" @click="ontweet">
						<view class="icon">
							<image class="img" src="../../static/images/share21.png"></image>
						</view>
						<view class="t">twitter</view>
					</view>

					<view class="share-li" @click="onfacebook">
						<view class="icon">
							<image class="img" src="../../static/images/share23.png"></image>
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
		</uni-popup>
		<!--分享弹出 end-->
		<!--优惠券弹出 start-->
		<view class="ticket-pop" v-show="show1">
			<view class="ticket-box">
				<view class="ticket-bg">
					<image class="img" src="../../static/images/ticket1.png"></image>
				</view>
				<view class="ticket-con">
					<view class="ticket-t">{{$t('home.gxxsyhq')}}</view>
					<!--ticket-ul start-->
					<view class="ticket-ul">
						<view v-for="item in CouponList" :key="item.id" class="ticket-li">
							<view class="li-bg">
								<image class="img" src="../../static/images/ticket2.png"></image>
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
					<!--ticket-ul end-->
					<view class="ticket-bot" @click="onOrderGetCoupon">{{$t('home.lingqu')}}</view>
				</view>
				<view class="ticket-close" @click="hide1">
					<image class="img" src="../../static/images/close3.png"></image>
				</view>
			</view>
		</view>
		<!--优惠券弹出 end-->

		<!--退出登录弹框-->
		<uni-popup ref="logout" type="center">
			<view class="loginout">
				<image src="../../static/images/new/tck-jy.png"></image>
				<view class="loginout-info">
					<view class="loginout-info-tit">{{$t('user.xitong.onQuery')}}</view>
					<view class="loginout-info-btn">
						<view class="loginout-info-btn-cancel" @click="$refs.logout.close()">{{$t('user.xitong.query')}}
						</view>
						<view class="loginout-info-btn-ok" @click="onLogout()">{{$t('user.xitong.btnsub')}}</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<!-- <view class="leftSider" :class="[transformClass?'removeRightX':'removeLeftX','shopCart']">
			<view class="imgArr" v-if="imgShow">
				<view>
					<img src="/static/images/mine/aixin.png" class="minImg" alt="">
				</view>
				<view class="people">
					<img src="/static/images/mine/p.png" class="pImg" alt="">
				</view>
				<view>
					<img src="/static/images/mine/listener.png" class="minImg" alt="">
				</view>
			</view>
			<image src="/static/images/new-index/addImg.png" class="newListImgDeg" v-if="imgShow" @click="transformImg">
			</image>
			<image src="/static/images/new-index/addImg.png" class="newListImg" @click="transformImg" v-else></image>
			
			<view>
				<image src="/static/images/new-index/gwc.png" v-show="productId==1" class="gwc"
					@click="navClick('/pages/cart/cart')"></image>
			</view>
		</view> -->
		<!-- 购物车 -->
		<customerService ref="customerService" />
		<!-- <view class="leftSider">
			<view @click="showContact = true">
				<image src="@/static/xuyuan/guanzhu.png" class="gz"></image>
			</view>
			<view>
				<image src="/static/images/new-index/gwc.png" v-show="productId==1" class="gwc"
					@click="navClick('/pages/cart/cart')"></image>
			</view>
		</view> -->
		<!-- 联系我们 -->
		<!-- 		<u-popup :show="showContact" mode="center" bgColor="transparent">
			<view class="contact">
				<image src="../../static/images/new/close.png" class="contact-info-close" @click="showContact = false">
				</image>
				<view class="contact-info">
					<view class="contact-info-tit">{{$t('user.myCont.ptkf')}}</view>
					<a href="fb://page/119896577745123" target="_blank" v-if="isFacebookApp && device=='android'">
						<view class="contact-info-des">
							<image src="../../static/images/new/face book.png"></image>
							<view>Face book</view>
						</view>
					</a>
					<a href="fb://page?id=119896577745123" target="_blank" v-else-if="isFacebookApp && device=='ios'">
						<view class="contact-info-des">
							<image src="../../static/images/new/face book.png"></image>
							<view>Face book</view>
						</view>
					</a>
					<view class="contact-info-des" v-else @click="showContact=false;showConfirm=true">
						<image src="../../static/images/new/face book.png"></image>
						<view>Face book</view>
					</view>
					<a href="twitter://user?screen_name=Kolibrimall2023" target="_blank" v-if="isTwitterApp">
						<view class="contact-info-des" id="twitter">
							<image src="../../static/images/share21.png"></image>
							<view>Twitter</view>
						</view>
					</a>
					<view class="contact-info-des" v-else @click="showContact=false;showConfirm=true">
						<image src="../../static/images/share21.png"></image>
						<view>Twitter</view>
					</view>
					<a href="tg://resolve?domain=Kolibrimall" target="_blank" v-if="isTelegramApp">
						<view class="contact-info-des">
							<image src="../../static/images/new/Telegram.png"></image>
							<view>Telegram</view>
						</view>
					</a>
					<view class="contact-info-des" v-else @click="showContact=false;showConfirm=true">
						<image src="../../static/images/new/Telegram.png"></image>
						<view>Telegram</view>
					</view>
					<a href="whatsapp://send?phone=+60 11-14338082" target="_blank" v-if="isWhatsApp">
						<view class="contact-info-des">
							<image src="../../static/images/new/WhatsAPP.png"></image>
							<view>WhatsAPP</view>
						</view>
					</a>
					<view class="contact-info-des" v-else @click="showContact=false;showConfirm=true">
						<image src="../../static/images/new/WhatsAPP.png"></image>
						<view>WhatsAPP</view>
					</view>
				</view>
			</view>
		</u-popup> -->
		<u-popup :show="showConfirm" mode="center" bgColor="transparent">
			<view class="showConfirm">
				<view class="showConfirm-txt">{{$t('new.wazyy')}}</view>
				<view class="showConfirm-btn">
					<view class="showConfirm-btn-cancel" @click="showConfirm=false">{{$t('home.search.query')}}</view>
					<view class="showConfirm-btn-ok" @click="checkApp()">{{$t('auction.detail.btnsub')}}</view>
				</view>
			</view>
		</u-popup>


		<!--公告-->
		<u-popup :show="showNotice" mode="center" bgColor="transparent" @touchmove.stop="">
			<view class="shownotice" style="overscroll-behavior: contain;">
				<image src="../../static/images/products/tck-lb.png" class="shownotice-head"></image>
				<image src="../../static/images/new/close.png" class="shownotice-close" @click="showNotice=false">
				</image>
				<view class="shownotice-content">
					<view class="shownotice-content-tit">Announcement</view>
					<scroll-view scroll-y style="height: 362rpx;margin-top: 20rpx;">
						<view class="shownotice-content-info">
							<u-parse :content="notice.content"></u-parse>
						</view>
					</scroll-view>

					<view class="shownotice-content-time">{{$u.timeFormat(notice.oldTime,"yyyy/mm/dd hh:MM")}}</view>
				</view>
			</view>
		</u-popup>

		<view style="height: 20rpx;"></view>
	</view>
</template>

<script>
	import address from '@/utils/malaysiaRegion.js';
	import customerService from '@/components/customerService/index.vue'
	import jsencrypt from '@/common/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
	//公钥.
	const publiukey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSjs8JJr/Nyb+nOG77agUDf7uT
c+kswdVEXbU8v5EL98brAw7fu4dQc1vkh1KSXqiC9EC7YmJzkkFoXUzTH2pvvDlq
UuCwtdmXOsq/b1JWKyEXzQlPIiwdHnAUjGbmHOEMAY3jKEy2dY2I6J+giJqo8B2H
NoR+zv3KaEmPSHtooQIDAQAB
-----END PUBLIC KEY-----`
	export default {
		components: {
			customerService
		},
		data() {
			return {
				isTwitterApp: false,
				isFacebookApp: false,
				isWhatsApp: false,
				isTelegramApp: false,
				showContact: false,
				showConfirm: false,
				transformClass: false, //购物车icon是否添加平移效果
				timer: '', //记录定时器状态
				imgShow: true, //三个图标入口
				useInvite: false, //是否使用赠金
				kdiamondSelect: false,
				showRmToKdiamond: false,
				isBottoming: false,
				switch_id: 0,
				addressInfo: {},
				balance: '',
				selectProductId: 0,
				showjpts: false, //是否显示竞拍提示
				showNotLogin: false, //是否显示未登录提示框
				productId: 1, //1：普通商品 2：竞拍商品
				current: 1, //轮播图指示器
				selectId: 1, //选中的视图id
				show1: false,
				CouponList: [], // 优惠券列表
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				navList: [{
						id: 1,
						title: this.$t('auction.pdsy')
					},
					{
						id: 2,
						title: this.$t('auction.zxinjp')
					},
					// { id: 3, title: this.$t('auction.jjks') }, 
					{
						id: 4,
						title: this.$t('auction.lsjz')
					},
					// { id: 5, title: this.$t('auction.xyzx') },
				], // 头部分类列表
				navId: 1, // 头部id
				banner: [], // 轮播图
				FirstList: [], // 1级分类
				page: 1, // 页码
				pagenum: 5, // 每页显示商品数目
				totalPageNum: 0, // 总条数
				newsjpList: [{
					id: 1,
					title: this.$t('auction.jindu')
				}, {
					id: 2,
					title: this.$t('auction.jssj')
				}, {
					id: 3,
					title: this.$t('auction.yuanjia')
				}, {
					id: 4,
					title: this.$t('auction.jingpaijia')
				}, {
					id: 5,
					title: this.$t('auction.zhikazng')
				}, ], // 最新竞拍头部
				newsjpId: 1, // 最新竞拍头部id
				jijiangList: [{
					id: 1,
					title: this.$t('auction.kssj')
				}, {
					id: 2,
					title: this.$t('auction.yuanjia')
				}, {
					id: 3,
					title: this.$t('auction.jingpaijia')
				}, {
					id: 4,
					title: this.$t('auction.zhikazng')
				}, ], // 即将开始头部
				jijiangId: 1, // 即将开始头部id
				lishiList: [{
					id: 1,
					title: this.$t('auction.jssj')
				}, {
					id: 2,
					title: this.$t('auction.yuanjia')
				}, {
					id: 3,
					title: this.$t('auction.jingpaijia')
				}, {
					id: 4,
					title: this.$t('auction.zhikazng')
				}], // 历史竞拍头部
				lishiId: '', // 历史竞拍头部id
				productList: [], //展示数据列表
				jingpaiList: [], // 竞拍列表
				newsjingpaiList: [], // 即将开始
				historyList: [], // 历史竞拍
				LuckyList: [], // 幸运之星
				timeData: {},
				date_start: '', // 选择日期
				show: false,
				value1: Number(new Date()),
				keyword: '', // 搜索子
				isShopCont: false, // 商品详情显示中文还是英文
				cancelText: '',
				confirmText: '',
				isShowAegin: true,
				auction_num: '', // 剩余竞拍次数
				isauctionNum: '', // 输入的抢拍次数
				shopCont: '', // 商品详情
				shopNum: '', // 竞拍总价
				order_no: '', // 订单编号
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
				noClick: true, // 防止重复点击 
				dateTimePickerShow: false,
				// 年列表
				yearList: [],
				// 月列表
				monthList: [],
				// 日列表
				dateList: [],
				dateTimePickerTempValue: [0, 0, 1],
				dateTimePickerValue: [0, 0, 1],
				set_paypwd: '',
				MineCont: {}, // 实名认证
				locales: [{
						text: this.$t('locale.en'),
						code: 'en'
					},
					{
						text: this.$t('locale.zh-hans'),
						code: 'zh-Hans'
					}
				],
				isLogin: false, //是否登录
				onOrderPrice: 0,
				noticeList: [], //公告列表
				selectNotice: {}, //当前显示的公告
				showNotice: false, //是否显示公告
				notice: {}, //公告信息
				jinPaiTimer: '',
				can_use_invite_money_rate: 0, //可使用的增加比例
				totalNum: 0
			}
		},
		watch: {
			money: {
				handler(e, m) {
					if (e < 10) {
						this.orderPayList = [{
							id: 1,
							title: this.$t('auction.detail.yuerzhifu'),
							isShow: false
						}, {
							id: 2,
							title: this.$t('new.zfjezf'),
							isShow: false
						}]
					} else {
						this.orderPayList = [{
							id: 1,
							title: this.$t('auction.detail.yuerzhifu'),
							isShow: false
						}, {
							id: 2,
							title: this.$t('new.zfjezf'),
							isShow: false
						}]
					}
				}
			},
			dateTimePickerTempValue: {
				// 侦听开始之后立即调用
				immediate: true,
				handler(newValue) {
					this.yearList = [
						new Date().getFullYear() - 1,
						new Date().getFullYear(),
						new Date().getFullYear() + 1,
						new Date().getFullYear() + 2,
						new Date().getFullYear() + 3,
						new Date().getFullYear() + 4,
					]
					// 当前年
					const currentYear = new Date().getFullYear()
					// 当前月
					const currentMonth = new Date().getMonth() + 1
					// 当前天
					const currentDate = new Date().getDate()
					const year = this.yearList[newValue[2]]
					if (year === currentYear) {
						// 当前年
						const arr = []
						for (let index = currentMonth; index <= 12; index++) {
							arr.push(String(index).padStart(2, '0'))
						}
						this.monthList = arr
					} else {
						this.monthList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
					}

					const month = this.monthList[newValue[0]]
					// 获取这个月的天数
					// new Date()第3个参数默认为1，就是每个月的1号，把它设置为0时， new Date()会返回上一个月的最后一天，然后通过getDate()方法得到天数
					const dayCount = new Date(year, month, 0).getDate()
					const arr = []
					for (let index = 1; index <= +dayCount; index++) {
						arr.push(String(index).padStart(2, '0'))
					}
					this.dateList = arr
				},
			},
		},
		onLoad(e) {
			let systemInfo = uni.getSystemInfoSync();
			this.systemLocale = systemInfo.language;
			this.applicationLocale = uni.getLocale();
			this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
			uni.onLocaleChange((e) => {
				this.applicationLocale = e.locale;
			})

			// 轮播图
			this.$http.post(this.$apiObj.AuctionBanner).then(res => {
				if (res.code == 1) {
					this.banner = res.data;
				}
			})

			// 一级分类
			setTimeout(() => {
				this.$http.post(this.$apiObj.IndexFirstCate).then(res => {
					if (res.code == 1) {
						if (this.isShopCont) {
							res.data.map(item => {
								item.name = this.getCaption(item.name, 1) ? this.getCaption(item
									.name, 1) : item.name
							})
						} else {
							res.data.map(item => {
								item.name = this.getCaption(item.name, 0) ? this.getCaption(item
									.name, 0) : item.name
							})
						}
						this.FirstList = res.data
					}
				})
			}, 1200);


			if (e.invite_code) {
				uni.removeStorageSync('token');
				sessionStorage.setItem("invite_code", e.invite_code);
				// uni.setStorageSync('invite_code', e.invite_code)
				// 取数据
				let arr = uni.getStorageSync('inviteCode') || []
				let cont = {
					inviteCode: e.invite_code
				}
				let num = 0
				for (let i in arr) {
					if (arr[i].inviteCode === e.invite_code) {
						num = num + 1
					}
				}
				if (num === 0) {
					this.$http.post(this.$apiObj.LoginClickNum, {
						invite_code: e.invite_code
					}).then(res => {})
					arr.push(cont)
				}
				// 存数据
				uni.setStorageSync('inviteCode', arr)
			}
			setTimeout(() => {
				if (e.tab) {
					this.pagenum = 10
					this.navId = Number(e.tab)
				}
			}, 100);

			this.getProductOrJinpai()
			// 最新竞拍
			this.onAuctionNewGoods()
			// 即将开始
			this.onAuctionNotbeginGoods()

			//普通商品
			if (this.productId == 1) this.getProductList(this.selectProductId)
		},
		onPullDownRefresh() {
			this.page = 1
			this.getProductOrJinpai()
			// 最新竞拍
			this.onAuctionNewGoods()
			// 即将开始
			this.onAuctionNotbeginGoods()

			//普通商品
			if (this.productId == 1) this.getProductList(this.selectProductId)

			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onShow() {
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			this.cancelText = uni.getStorageSync('locale') == 'en' ? 'cancel' : '取消'
			this.confirmText = uni.getStorageSync('locale') == 'en' ? 'confirm' : '确认'

			if (uni.getStorageSync('token')) {
				this.showNotLogin = false
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
				this.showNotLogin = true
			}

		},
		onHide() {
			clearInterval(this.jinPaiTimer)
		},
		methods: {
			//点击图片出现入口并且图片旋转
			transformImg() {
				this.imgShow = !this.imgShow
			},
			toXyzx() {
				uni.switchTab({
					url: '/pages/auction/lucky'
				})
			},

			//添加购物车
			addCart(item) {
				this.$http.post(this.$apiObj.CartAdd, {
					goods_spec_id: item.litestore_goods_spec[0].goods_spec_id,
					num: 1
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							icon: 'none',
							title: this.isShopCont ? 'Successfully added to shopping cart' : '加入购物车成功'
						})
					}
				})
			},
			getBanner(item) {
				if (item.url.indexOf('.png') !== -1) {
					uni.navigateTo({
						url: '/pages/active/activities?url=' + item.url
					})
				} else {
					uni.navigateTo({
						url: item.url
					})
				}
			},
			//首页泡泡数据展示
			showJinpaiData() {
				let num = Math.random()
				num = num * 15
				num = Math.ceil(num)

				let date = new Date()

				let data = {
					name: address[num].state,
					name_en: address[num].state_en,
					time: date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date
						.getMinutes())
				}
				this.addressInfo = data
				this.showjpts = true
				let timer = setTimeout(() => {
					this.showjpts = false
					clearTimeout(timer)
				}, 10000)
			},
			getProductOrJinpai() {
				this.$http.post(this.$apiObj.IndexSetting, {
					fields: 'whether_to_enable_ordinary_mall'
				}).then(res => {
					if (res.data.whether_to_enable_ordinary_mall == 1) this.productId = 1
					else this.productId = 2
				})
			},
			productMore() {
				uni.switchTab({
					url: '/pages/auction/jjks'
				})
			},
			//查看更多
			toMore(id) {
				uni.navigateTo({
					url: '/pages/auction/auctionT?id=' + id
				})
			},
			//普通商品或竞拍商品跳转
			toProductOrJinpai(item) {
				if (this.productId == 2) this.onJingPai(item)
				else this.toProductInfo(item.goods_id)
			},
			toProductInfo(id) {
				uni.navigateTo({
					url: '/pages/auction/product_info?goodsId=' + id
				})
			},
			//首页logo页面跳转
			switchLogoToProduct(id, name) {
				uni.setStorageSync('switch_id', id)
				uni.navigateTo({
					url: '/pages/auction/product_list?id=' + id + '&name=' + name
				})
			},

			//获取普通商品列表
			getProductList(id) {
				this.$http.post(this.$apiObj.LitestoregoodsIndex, {
					page: this.page,
					pagenum: this.pagenum,
					category_id: id > 0 ? id : ''
				}).then(res => {
					this.totalNum = res.data.total
					let arr = []
					res.data.data.forEach(item => {
						if (item.is_belong_to_mall == 1 && item.goods_status == 10) {
							arr.push(item)
						}
					})
					this.productList = this.page == 1 ? arr : [...this.productList, ...arr]
				})
			},
			//查看公告信息
			onOnticeShow(item) {
				this.showNotice = true
				this.notice = item
				console.log(item)
			},
			//获取首页公告
			getNotice() {
				this.$http.post(this.$apiObj.NoticeIndex, {
					page: 1,
					pagenum: 100
				}).then(res => {
					if (res.code == 1) {
						// this.selectNotice = res.data.data[0]
						res.data.data.forEach(item => {
							let oldTime = item.createtime
							let time = new Date(item.createtime * 1000)
							item.createtime = time.getMonth() + 1 + '.' + time.getDate()
							this.$set(item, 'oldTime', oldTime)
						})
						this.noticeList = res.data.data
						// let num = 1
						// setInterval(() => {
						// 	if (num < this.noticeList.length) {
						// 		this.selectNotice = this.noticeList[num]
						// 		if (num < 100) num++
						// 		else num = 0
						// 	} else {
						// 		num = 1
						// 		this.selectNotice = this.noticeList[0]
						// 	}
						// }, 4000)
					}
				})
			},
			toClassify(item) {
				uni.navigateTo({
					url: '/pages/auction/classify?id=' + item.id + '&name=' + item.name
				})
			},
			//退出登录
			onLogout() {
				this.$http.post(this.$apiObj.MineLoginOut).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.isShopCont ? 'Exit succeeded' : '退出成功',
							icon: 'none'
						})
						uni.removeStorageSync('token');
						uni.navigateTo({
							url: '../public/login'
						})
						this.$refs.logout.close()
					}
				})
			},
			//前往登录
			toLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			//切换语言
			onChangeLanuage(e) {
				uni.setStorageSync('UNI_LOCALE', e.code)
				uni.setStorageSync('locale', e.code)
				this.$i18n.locale = e.code;
				// #ifdef APP-PLUS
				console.log(111)
				if (this.isAndroid) {
					uni.showModal({
						content: this.$t('index.language-change-confirm'),
						success: (res) => {
							if (res.confirm) {
								uni.setLocale(e.code);
							}
						}
					})
				} else {
					uni.setLocale(e.code);
					this.$i18n.locale = e.code;
				}
				// #endif
				location.reload()
			},
			//倒计时
			timerDjs(event) {
				let time = Date.parse(new Date()) / 1000
				let diff = event - time
				let _diffData;
				if (diff > 0) {
					let d = Math.floor(diff / (3600 * 24)) //获取天数
					let h = Math.floor((diff % (3600 * 24)) / (60 * 60)) //获取时
					let m = Math.floor(((diff % (3600 * 24)) % (60 * 60)) / 60) //获取分
					let s = Math.floor(diff % 60) //获取秒
					d = d < 10 ? "0" + d : d;
					h = h < 10 ? "0" + h : h;
					m = m < 10 ? "0" + m : m;
					s = s < 10 ? "0" + s : s;
					_diffData = [d, h, m, s]
				} else {
					_diffData = ["00", "00", "00", "00"];
				}
				return _diffData;
			},
			// 日期时间选择器改变
			handleDateTimePickerChange(event) {
				// console.log(event.detail.value)
				const value = event.detail.value
				this.dateTimePickerTempValue = value
			},
			// 日期时间选择器取消
			handleDateTimePopupCancel() {
				this.dateTimePickerTempValue = this.dateTimePickerValue
				this.$refs.dateTimePopup.close()
			},
			// 日期时间选择器确定
			handleDateTimePopupConfirm() {

				this.dateTimePickerValue = this.dateTimePickerTempValue
				const year = this.yearList[this.dateTimePickerValue[0]]
				const month = this.monthList[this.dateTimePickerValue[1]]
				const date = this.dateList[this.dateTimePickerValue[2]]
				console.log({
					year,
					month,
					date
				})

				this.date_start = `${year}-${month}-${date}`
				this.show = false
				this.historyList = []
				this.page = 1
				this.onAuctionHistoryGoods()
				this.$refs.dateTimePopup.close()
			},

			// 选择日期时间 
			onopenClick() {
				this.$refs.dateTimePopup.open()
			},
			// 比较日期大小，可以直接进行比较
			compareDate(date1, date2) {
				var date1 = new Date(date1);
				var date2 = new Date(date2);
				if (date1.getTime() > date2.getTime()) {
					return true;
				} else {
					return false;
				}
			},
			// 日期加天数
			addDate(date, days) {
				if (days == undefined || days == '') {
					days = 1;
				}
				var date = new Date(date);
				date.setDate(date.getDate() + days);
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var hours = date.getHours();
				var minutes = date.getMinutes();
				let seconds = date.getSeconds(); //取秒 
				var time = date.getFullYear() + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day :
						day) + " " + (hours < 10 ? '0' + hours : hours) + ":" + (minutes < 10 ? '0' + minutes : minutes) +
					":" + (seconds < 10 ? '0' + seconds : seconds);
				return time;
			},
			// 领取优惠券
			onOrderGetCoupon() {
				let coupon_ids = []
				for (let i in this.CouponList) {
					coupon_ids.push(this.CouponList[i].id)
				}
				this.$http.post(this.$apiObj.OrderGetCoupon, {
					coupon_ids: coupon_ids.toString()
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('home.lingqucg'),
							icon: 'none'
						})
						this.show1 = false
					}
				})
			},
			hide1() {
				this.show1 = !this.show1;
			},
			onfacebook() {
				let qrUrl = 'https://h5.kolibrimall.com/h5/#/pages/auction/detail?id=' + this.shopCont.id // 生成二维码的链接
				let url = `https://www.facebook.com/sharer/sharer.php?u=${qrUrl}`
				// #ifdef H5
				window.open(url)
				// #endif
				// #ifndef H5
				plus.runtime.openURL(
					url,
					// 打开url失败，执行，如打开的是tabao://但是手机没安装，就会执行报错
					function(err) {
						console.log(err);
					}
				);
				// #endif
			},
			ontweet() {
				let qrUrl = 'https://h5.kolibrimall.com/h5/#/pages/auction/detail?id=' + this.shopCont.id // 生成二维码的链接
				let url = `https://twitter.com/intent/tweet?url=${qrUrl}`
				// #ifdef H5
				window.open(url)
				// #endif
				// #ifndef H5
				plus.runtime.openURL(
					url,
					// 打开url失败，执行，如打开的是tabao://但是手机没安装，就会执行报错
					function(err) {
						console.log(err);
					}
				);
				// #endif
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
			// 商品关注、取消关注
			onMineFocus(item) {
				this.$http.post(this.$apiObj.MineFocus, {
					type: 3,
					data_id: item.auction_goods_id
				}).then(res => {
					if (res.code == 1) {
						if (item.goods_focus == 1) {
							uni.showToast({
								icon: 'none',
								title: this.$t('auction.query')
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: this.$t('auction.btnsub')
							})
						}
						this.newsjingpaiList = []
						this.page = 1
						this.onAuctionNotbeginGoods()
					}
				})
			},
			formatter(type, value) {
				let year = uni.getStorageSync('locale') == 'en' ? 'year' : '年'
				let month = uni.getStorageSync('locale') == 'en' ? 'month' : '月'
				let day = uni.getStorageSync('locale') == 'en' ? 'day' : '日'
				if (type === 'year') {
					return `${value}${year}`
				}
				if (type === 'month') {
					return `${value}${month}`
				}
				if (type === 'day') {
					return `${value}${day}`
				}
				return value
			},
			onNavClick(id) {
				if (id == 1) {
					this.pagenum = 5
				} else {
					this.pagenum = 10
				}
				if (id == 3) {
					uni.switchTab({
						url: '/pages/auction/jjks'
					});
				} else if (id == 5) {
					uni.switchTab({
						url: '/pages/auction/xyzx'
					});
				} else {
					this.navId = id
				}
				this.keyword = ''
				this.date_start = ''
				this.page = 1
				this.newsjpId = 1
				this.jijiangId = 1
				this.lishiId = 1
				this.jingpaiList = []
				this.newsjingpaiList = []
				this.historyList = []
				this.LuckyList = []
				if (id == 1) {
					this.onAuctionNewGoods()
					this.onAuctionNotbeginGoods()
					this.onAuctionHistoryGoods()
					this.onAuctionLuckyList()
				} else if (id == 2) {
					this.onAuctionNewGoods()
				} else if (id == 3) {
					this.onAuctionNotbeginGoods()
				} else if (id == 4) {
					this.onAuctionHistoryGoods()
				} else if (id == 5) {
					this.onAuctionLuckyList()
				}
			},
			// 点击最新竞拍筛选
			onZxjpClick(id) {
				this.newsjpId = id
				this.jingpaiList = []
				this.page = 1
				this.onAuctionNewGoods()
			},
			// 最新竞拍
			onAuctionNewGoods() {
				this.$http.post(this.$apiObj.AuctionNewGoods, {
					sort: this.newsjpId,
					page: this.page,
					pagenum: this.pagenum,
					keyword: this.keyword
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
						this.jingpaiList = this.page == 1 ? res.data.data : [...this.jingpaiList, ...res.data
							.data
						]
						this.jingpaiList.forEach(item => {
							this.$set(item, 'djs', (item.pre_end_time - Date.parse(new Date()) / 1000) *
								1000)
							this.$set(item, 'isMask', false)
						})
						if (this.productId == 2) this.productList = this.jingpaiList

					}
				})
			},
			// 点击即将开始筛选
			onjjksClick(id) {
				this.jijiangId = id
				this.newsjingpaiList = []
				this.page = 1
				this.onAuctionNotbeginGoods()
			},
			// 即将开始
			onAuctionNotbeginGoods() {
				this.$http.post(this.$apiObj.AuctionNotbeginGoods, {
					sort: this.jijiangId,
					page: this.page,
					pagenum: this.pagenum,
					keyword: this.keyword
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
						this.newsjingpaiList = this.page == 1 ? res.data.data : [...this.newsjingpaiList,
							...res
							.data.data
						]
					}
				})
			},
			onlishiClick(id) {
				this.lishiId = id
				this.historyList = []
				this.page = 1
				this.onAuctionHistoryGoods()
			},
			onconfirm(e) {
				const timeFormat = uni.$u.timeFormat
				this.date_start = timeFormat(e.value, 'yyyy-mm-dd')
				this.show = false
				this.historyList = []
				this.page = 1
				this.onAuctionHistoryGoods()
			},
			// 历史竞拍
			onAuctionHistoryGoods() {
				this.$http.post(this.$apiObj.AuctionHistoryGoods, {
					sort: this.lishiId,
					page: this.page,
					pagenum: this.pagenum,
					keyword: this.keyword,
					date_start: this.date_start
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
							item.continue_time = this.daojishi(item.continue_time)
						})
						this.totalPageNum = res.data.total
						this.historyList = this.page == 1 ? res.data.data : [...this.historyList, ...res.data.data]
					}
				})
			},
			// 幸运之星
			onAuctionLuckyList() {
				this.$http.post(this.$apiObj.AuctionLuckyList, {
					page: this.page,
					pagenum: this.pagenum,
					keyword: this.keyword
				}).then(res => {
					if (res.code == 1) {
						if (this.isShopCont) {
							res.data.data.map(item => {
								item.goods_mark = this.getCaption(item.goods_mark, 1) ? this
									.getCaption(
										item.goods_mark, 1) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 1) ? this
									.getCaption(
										item.goods_name, 1) : item.goods_name
							})
						} else {
							res.data.data.map(item => {
								item.goods_mark = this.getCaption(item.goods_mark, 0) ? this
									.getCaption(
										item.goods_mark, 0) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 0) ? this
									.getCaption(
										item.goods_name, 0) : item.goods_name
							})
						}
						// res.data.data.map(item => {
						// item.continue_time = this.daojishi(item.continue_time)
						this.totalPageNum = res.data.total
						this.LuckyList = this.page == 1 ? res.data.data : [...this.LuckyList, ...res.data
							.data
						]
						// })
					}
				})
			},
			// 点赞|取消点赞幸运之星记录
			onAuctionFocusLucky(item) {
				this.$http.post(this.$apiObj.AuctionFocusLucky, {
					lucky_id: item.id
				}).then(res => {
					if (res.code == 1) {
						if (item.is_zan == 0) {
							item.is_zan = 1
							item.zan_num += 1
						} else {
							item.is_zan = 0
							item.zan_num -= 1
						}
					}
				})
			},
			// 倒计时
			daojishi(mss) {
				let s = mss % 60;
				mss = parseInt(mss / 60);
				let m = mss % 60;
				mss = parseInt(mss / 60);
				let h = mss % 24;
				mss = parseInt(mss / 24);
				let d = mss;
				return d + "d:" + h + "h:" + m + "m:" + s + 's'
			},
			onChange(e) {
				this.timeData = e
			},
			// 点击竞拍列表
			onJingPai(item) {
				uni.navigateTo({
					url: './detail?id=' + item.auction_goods_id
				})
			},
			//导航点击的跳转处理函数
			navClick(url) {
				uni.navigateTo({
					url
				})
			},
			// 个人信息获取剩余竞拍次数
			onMineInfo(e) {
				let that = this
				this.isauctionNum = ''
				this.shopCont = e
				that.pay_pwd = ''
				that.kdiamondSelect = false
				that.showRmToKdiamond = false
				that.orderPayList.forEach(item => {
					item.isShow = false
				})
				this.$http.post(this.$apiObj.MineInfo, {
					auction_goods_id: e.auction_goods_id
				}).then(res => {
					if (res.code == 1) {
						this.can_use_invite_money_rate = res.data.can_use_invite_money_rate
						this.money = res.data.recharge_money_balance
						this.balance = res.data.k_diamond_wallet
						this.auction_num = (e.auction_type == 2 && e.total_least_num == 0) ? res.data
							.auction_num :
							(res.data.auction_num === -1) ? e.total_least_num : (res.data.auction_num < e
								.total_least_num) ? res.data.auction_num : e.total_least_num

						if (res.data.auction_num !== 0) {
							if (res.data.set_paypwd == 1) {
								this.$refs.pwdPopup.open()
							} else {
								uni.showToast({
									title: that.$t('new.qszmm'),
									icon: 'none'
								})
							}
						} else {
							this.$refs.pwdPopup3.open()
						}
					}
				})
			},
			onQueryClick() {
				this.$refs.pwdPopup.close()
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
				this.onOrderReferCartOrder()
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
			// 点击竞拍去支付
			onPayClick() {
				if (this.balance * 1 < this.shopNum && !this.kdiamondSelect) {
					return uni.showToast({
						icon: 'none',
						title: 'K钻余额不足'
					})
					return
				}
				let price = this.shopNum * 1 - this.balance * 1
				if (price > this.money) {
					return uni.showToast({
						icon: 'none',
						title: '充值余额不足' + price
					})
					return
				}

				this.$refs.popup1.close()
				if (true) {
					// 余额支付弹框
					this.$refs.pwdsPopup.open()
				} else if (isNum.length > 5) {
					/**
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
					// this.order_no = ress.data.order_no
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
					**/
				}
			},
			// 关闭支付密码
			onPwdQuery() {
				this.$refs.pwdsPopup.close()
				// uni.navigateBack({ delta: 1 })
			},
			// 点击支付成功取消按钮
			onpayQuery() {
				this.$refs.payPopup.close()
			},
			// 点击支付密码
			onPwdClick() {
				if (!this.pay_pwd) return uni.showToast({
					title: this.$t('auction.detail.qingsshumm'),
					icon: 'none'
				})

				const pay_pwd = jsencrypt.setEncrypt(publiukey, String(this.pay_pwd))
				let arr = []
				this.orderPayList.forEach(item => {
					if (item.isShow) arr.push(item.id)
					else arr.push(10)
				})

				this.$http.post(this.$apiObj.AuctionorderBalancePay, {
					order_no: this.order_no, // 小订单号
					money: this.shopNum, // 支付总金额
					pay_pwd: pay_pwd, // rsa加密后的支付密码
					is_use_recharge: 2,
					is_use_invite: this.useInvite ? 1 : 2,
					is_use_k_diamond: 1,
					is_balance_convert_k_diamond: this.kdiamondSelect ? 1 : 2
				}).then(res => {
					if (res.code == 1) {
						this.isShowAegin = this.auction_num > this.isauctionNum
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						this.onAuctionNewGoods()
						setTimeout(() => {
							this.jingpaiList.forEach(item => {
								if (item.auction_goods_id == this.shopCont
									.auction_goods_id) {
									this.shopCont = item
								}
							})

							this.$refs.pwdPopup.close()
							this.$refs.pwdPopup3.close()
							this.$refs.pwdsPopup.close()
							this.$refs.payPopup.open()
						}, 500);
					}
				})

			},

			onQuanClick(item) {
				item.isShow = !item.isShow
			},
			toggle1Close() {
				this.$refs.popup1.close()
			},
			toggle2Close() {
				this.$refs.popup2.close()
			},
			// 点击抢拍
			onQiangpai() {
				this.$refs.payPopup.close()
				this.onMineInfo(this.shopCont)
			},
			onQuery() {
				this.$refs.pwdPopup3.close()
			},
			onFengxiang() {
				this.$refs.pwdPopup.close()
				this.$refs.popup2.open()
			},
			PageScroll(event) {
				
			},
		},
		// 页面滑动到底部
		onReachBottom() {
			// 判断是否还有数据
			// if (this.navId == 1) {
			// 	if (this.totalPageNum <= this.page * this.pagenum) return
			// 	this.page++
			// 	this.onAuctionNewGoods()
			// } else if (this.navId == 2) {
			// 	if (this.totalPageNum <= this.page * this.pagenum) return
			// 	this.page++
			// 	this.onAuctionNotbeginGoods()
			// } else if (this.navId == 3) {
			// 	if (this.totalPageNum <= this.page * this.pagenum) return
			// 	this.page++
			// 	this.onAuctionHistoryGoods()
			// }
			if (this.totalNum <= this.page * this.pagenum) return
			this.page++
			this.getProductList()
		},
		//监听页面滚动
		onPageScroll(e) {
			this.$refs.customerService.handleScroll();
		},
	}
</script>
<style>
	page {
		background: #EBEBEB;
	}
</style>

<style lang="scss">
	// 联系我们
	.contact {
		position: relative;
		width: 686rpx;

		.contact-head {
			display: block;
			width: 686rpx;
			height: 426rpx;
			margin-bottom: -56rpx;
			z-index: 9;
		}

		.contact-info-close {
			position: absolute;
			top: 30rpx;
			right: 20rpx;
			width: 60rpx;
			height: 60rpx;
			z-index: 10;
		}

		.contact-info {
			padding: 46rpx 0;
			border: 4rpx solid rgb(10, 198, 142);
			background: #fff;
			border-radius: 16rpx;

			.contact-info-tit {
				width: 100%;
				font-size: 40rpx;
				font-weight: 700;
				text-align: center;
			}

			a {
				text-decoration: none;
			}

			.contact-info-des {
				width: 434rpx;
				height: 100rpx;
				font-size: 32rpx;
				color: rgb(44, 44, 44);
				display: flex;
				align-items: center;
				border-radius: 50rpx;
				box-shadow: 0rpx 0rpx 8rpx rgba(255, 78, 47, 0.3);
				margin: 40rpx auto 0 auto;

				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}

				view {
					margin-left: 40rpx;
				}
			}
		}
	}

	// 确认弹框
	.showConfirm {
		width: 686rpx;
		padding: 40rpx;
		background: #FFF;
		box-sizing: border-box;
		border-radius: 16rpx;
		border: 2rpx solid rgb(10, 198, 142);

		.showConfirm-txt {
			width: 80%;
			font-size: 28rpx;
			font-weight: bold;
			color: rgb(44, 44, 44);
			text-align: center;
			margin: 0 auto;
		}

		.showConfirm-btn {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 40rpx;

			view {
				width: 240rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 32rpx;
				text-align: center;
				box-sizing: border-box;
				border-radius: 16rpx;
				margin: 0 20rpx;
			}

			.showConfirm-btn-cancel {
				color: rgb(44, 44, 44);
				border: 2rpx solid rgb(10, 198, 142);
			}

			.showConfirm-btn-ok {
				color: #fff;
				background: rgb(10, 198, 142);
			}

		}

	}

	//右侧固定栏滚动
	.removeRightX {
		transform: translateX(80rpx);
		transition: all 0.5s ease;
	}

	.removeLeftX {
		transform: translateX(0);
		transition: all 0.5s ease;
	}

	.indicator {
		@include flex(row);
		justify-content: center;

		&__dot {
			height: 6px;
			width: 6px;
			border-radius: 100px;
			background-color: rgba(255, 255, 255, 0.35);
			margin: 0 5px;
			transition: background-color 0.3s;

			&--active {
				background-color: #ffffff;
			}
		}
	}

	.indicator-num {
		padding: 2px 0;
		background-color: rgba(0, 0, 0, 0.35);
		border-radius: 100px;
		width: 35px;
		@include flex;
		justify-content: center;

		&__text {
			color: #FFFFFF;
			font-size: 12px;
		}
	}
</style>

<style lang="less" scoped>
	.auct-page {

		//头部
		.auct-head {
			position: relative;
			width: 100%;
			height: 440rpx;
			padding-top: 60rpx;
			box-sizing: border-box;
			background: url('/static/images/new-index/header.png') no-repeat;
			background-size: 100% 100%;

			.auct-head-top {
				width: 100%;
				height: 88rpx;
				display: flex;
				align-items: center;

				view {
					width: 410rpx;
					font-size: 16rpx;
					color: rgb(255, 255, 255);
					text-align: center;
					// word-break: break-all;
					margin: 0 70rpx 0 24rpx;
				}

				.logo {
					width: 64rpx;
					height: 64rpx;
					margin-left: 32rpx;
				}

				.auth {
					width: 44rpx;
					height: 44rpx;
					margin-left: 32rpx;
				}

				.lange {
					width: 42rpx;
					height: 42rpx;
				}
			}

			.auct-banner {
				margin: 24rpx 32rpx;

				.swiper-image {
					width: 100%;
					height: 296rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 24rpx;
					}
				}
			}
		}

		//一级分类图标
		.switch-layout {
			width: 100%;
			margin-top: 70rpx;
			background: rgb(255, 255, 255);
			padding: 24rpx 0 20rpx;
			box-sizing: border-box;

			.sl-scroll {
				width: 100%;
				white-space: nowrap;

				.sl-scroll-box {
					width: 20%;
					display: inline-block;
					text-align: center;
					vertical-align: top;

					image {
						width: 88rpx;
					}

					view {
						width: 100%;
						margin-top: 12rpx;
						color: rgb(51, 51, 51);
						font-size: 20rpx;
						white-space: normal;
						// word-break: break-all;
						// word-wrap: break-word;
					}
				}
			}

			.sl-line {
				margin: 20rpx auto 0;
				width: 36rpx;
				height: 6rpx;
				background: #E8E8E8;
				position: relative;
				border-radius: 40rpx;

				.sl-line-bg {
					width: 22rpx;
					height: 6rpx;
					background: rgb(10, 198, 142);
					border-radius: 40rpx;
					position: absolute;
					left: 0;
					top: 0;
					transition: left .5s;
				}
			}
		}

		//抢拍分类框
		.ongoing-type {
			width: 100%;
			margin-top: 24rpx;
			display: flex;
			align-items: center;
			justify-content: center;

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

							image {
								width: 24rpx;
								height: 24rpx;
							}

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

							image {
								width: 24rpx;
								height: 24rpx;
							}

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
			min-height: 800rpx;
			padding: 24rpx 0;
			background: #fff;
			border-radius: 16rpx 16rpx 0 0;
			margin-top: 24rpx;

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
					right: 328rpx;
					width: 32rpx;
					height: 32rpx;
				}

				.new-list-head-mf {
					position: absolute;
					right: 268rpx;
					width: 32rpx;
					height: 32rpx;
				}

				.new-list-head-p {
					position: absolute;
					right: 208rpx;
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

					.product-right-txt {
						position: absolute;
						top: 20rpx;
						width: 352rpx;
						font-size: 28rpx;
						font-weight: bold;
						color: rgb(51, 51, 51);
						overflow: hidden;
						text-overflow: ellipsis;
						word-break: break-all;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}

					.new-list-item-right-tags {
						position: absolute;
						top: 64rpx;
						width: 100%;
						font-size: 16rpx;
						color: rgb(102, 102, 102);
						display: flex;
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
							border-radius: 50%;
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
							// min-width: 86rpx;
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

						.new-list-item-right-start-info2:nth-child(2) {
							border-right: none;
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
							overflow: hidden;

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
								width: 100%;
								height: 28rpx;
								border-radius: 28rpx;
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

								image {
									width: 24rpx;
									height: 24rpx;
								}

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

						.info-tag2:nth-child(2) {
							border-right: none;
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
							border-radius: 28rpx;
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

								image {
									width: 24rpx;
									height: 24rpx;
								}

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
								border-radius: 28rpx;
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

								image {
									width: 24rpx;
									height: 24rpx;
								}

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

		//幸运之星
		.luck_list {
			width: 686rpx;
			padding-top: 24rpx;
			margin-top: 16rpx;
			margin: 0 auto;

			.head {
				position: relative;
				width: 100%;
				display: flex;
				align-items: center;

				.head_img {
					width: 44rpx;
					height: 44rpx;
					margin-left: 24rpx;
				}

				.head_txt {
					position: relative;
					font-size: 32rpx;
					color: rgb(51, 51, 51);
					margin-left: 8rpx;

					view {
						position: relative;
						z-index: 2;
					}

					span {
						position: absolute;
						bottom: 0%;
						left: 50%;
						transform: translate(-50%, 0);
						width: 92rpx;
						height: 8rpx;
						background: rgba(10, 198, 142, 0.4);
						z-index: 1;
					}
				}

				.head_more {
					position: absolute;
					right: 0;
					font-size: 20rpx;
					color: rgb(51, 51, 51);
					display: flex;
					align-items: center;

					image {
						width: 16rpx;
						height: 16rpx;
						margin-top: 4rpx;
						margin-left: 4rpx;
					}
				}

			}

		}

		.leftSider {
			position: fixed;
			right: 32rpx; //-50
			bottom: 200rpx;
			z-index: 100;

			.gwc {
				width: 92rpx;
				height: 92rpx;
			}

			.gz {
				width: 92rpx;
				height: 92rpx;
			}

			.newListImg {
				width: 92rpx;
				height: 92rpx;
			}

			.newListImgDeg {
				width: 92rpx;
				height: 92rpx;
				margin-top: 30rpx;
				transform: rotate(-45deg);
			}

			//三个入口
			.imgArr {
				background: #fff;
				width: 92rpx;
				height: 280rpx;
				border-radius: 45rpx;
				box-shadow: 0 0 20rpx rgba(198, 198, 198, 0.3);
				text-align: center;

				.people {
					margin-top: 30rpx;

					.pImg {
						width: 45rpx;
						height: 40rpx;
					}
				}

				.minImg {
					width: 45rpx;
					height: 45rpx;
					text-align: center;
					margin-top: 40rpx;
				}
			}

		}

		//未登录提醒
		.not_login {
			position: fixed;
			left: 50%;
			bottom: 16rpx;
			transform: translate(-50%, 0);
			width: 618rpx;
			height: 72rpx;
			background: rgba(0, 0, 0, 0.7);
			border-radius: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 100;

			.txt {
				font-size: 24rpx;
				color: rgb(255, 255, 255);
			}

			.btn {
				width: 160rpx;
				height: 56rpx;
				line-height: 56rpx;
				font-size: 24rpx;
				color: rgb(255, 255, 255);
				text-align: center;
				background: linear-gradient(180.00deg, rgba(51, 222, 114, 1.00), rgba(5, 195, 146, 1.00) 98.871%);
				border-radius: 56rpx;
				margin-left: 56rpx;
			}

		}

		//竞拍提醒
		.jp_ts {
			position: fixed;
			top: 200rpx;
			left: 50%;
			transform: translate(-50%, 0);
			width: 618rpx;
			height: 72rpx;
			display: flex;
			align-items: center;
			background: rgba(0, 0, 0, 0.68);
			border-radius: 72rpx;

			.auth {
				width: 56rpx;
				height: 56rpx;
				border-radius: 50%;
				margin-left: 8rpx;
			}

			.logo {
				width: 28rpx;
				height: 28rpx;
				margin-left: 28rpx;
			}

			.txt {
				max-width: 300rpx;
				font-size: 24rpx;
				color: rgb(255, 255, 255);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-left: 8rpx;
			}

			.time {
				position: absolute;
				right: 32rpx;
				font-size: 24rpx;
				color: rgb(255, 255, 255);
			}

		}

		//没有数据
		.not-data-info {
			padding-top: 100rpx;

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

		//切换商品类型
		.switch {
			width: 730rpx;
			margin: 20rpx auto;

			.switch-head {
				width: 100%;
				display: flex;
				align-items: center;

				.switch-head-name {
					width: calc(100% / 3);
					text-align: center;

					span {
						display: block;
						width: 110rpx;
						height: 4rpx;
						background: rgb(255, 78, 47);
						border-radius: 2rpx;
						margin: -10rpx auto 0 auto;
					}
				}

				.switch-head-select {
					width: calc(100% / 3);
					height: 70rpx;
					line-height: 70rpx;
					font-weight: 700;
					color: rgb(255, 78, 47);
					background: #FFF;
					border-radius: 16rpx 16rpx 0rpx 0rpx;
					box-shadow: 0px -4rpx 14rpx rgba(255, 198, 188, 0.3);
				}

			}

			.switch-content {
				width: 710rpx;
				min-height: calc(100vh - 440rpx);
				padding: 26rpx 10rpx;
				background: #fff;
				box-shadow: 0px -4rpx 14rpx rgba(255, 198, 188, 0.3);
			}

		}

		//公告
		.notice {
			width: 100%;
			height: 92rpx;
			display: flex;
			align-items: center;
			background: #fff;

			image {
				width: 50rpx;
				height: 50rpx;
				margin: 0 10rpx 0 30rpx;
			}

			.notice-txt {
				width: 630rpx;
				height: 60rpx;
				overflow: hidden;
				// margin-top: 6rpx;

				.notice-list {
					width: 570rpx;
					height: 184rpx;
					margin-left: 30rpx;
					animation: noticeAnimation 4.5s linear 2s infinite normal;
					// margin-top: 6rpx;


				}

				.notice-item {
					width: 100%;
					height: 60rpx;
					line-height: 60rpx;
					display: flex;
					align-items: center;

					.notice-tit {
						width: 500rpx;
					}
				}

				.notice-time {
					font-size: 24rpx;
					color: rgb(149, 149, 149);
				}
			}
		}

		@keyframes noticeAnimation {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(-180rpx);
			}
		}

		//公告弹出框
		.shownotice {
			position: relative;
			width: 686rpx;

			.shownotice-head {
				position: relative;
				display: block;
				width: 600rpx;
				height: 372rpx;
				margin: 0 0 -48rpx 66rpx;
				z-index: 5;
			}

			.shownotice-close {
				position: absolute;
				top: 342rpx;
				right: 20rpx;
				width: 60rpx;
				height: 60rpx;
				z-index: 10;
			}

			.shownotice-content {
				width: 686rpx;
				height: 620rpx;
				padding-top: 40rpx;
				background: #fff;
				border: 4rpx solid rgb(255, 78, 47);
				border-radius: 16rpx;

				.shownotice-content-tit {
					width: 100%;
					font-size: 40rpx;
					font-weight: 700;
					text-align: center;
				}

				.shownotice-content-info {
					width: 616rpx;
					height: 362rpx;
					line-height: 40rpx;
					font-size: 32rpx;
					color: rgb(44, 44, 44);
					word-break: break-all;
					margin: 50rpx auto 0 auto;
				}

				.shownotice-content-time {
					font-size: 24rpx;
					color: rgb(149, 149, 149);
					margin-top: 100rpx;
					margin-left: 448rpx;
				}
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
				top: 20rpx;
				right: 20rpx;
				display: block;
				width: 36rpx;
				height: 36rpx;
				z-index: 10;
			}

			.pay-pwd-info {
				width: 686rpx;
				// height: 428rpx;
				padding-top: 40rpx;
				padding-bottom: 20rpx;
				background: #FFF;
				// border: 4rpx solid rgb(10, 198, 142);
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
					color: rgb(10, 198, 142);
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
					background: rgb(10, 198, 142);
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
						border: 2rpx solid rgb(10, 198, 142);
					}

					.pay-pwd-list-ok {
						color: #fff;
						background: rgb(10, 198, 142);
						margin-left: 40rpx;
					}
				}

			}

		}

		//退出登录
		.loginout {

			image {
				display: block;
				width: 600rpx;
				height: 372rpx;
				margin: 0 auto -46rpx auto;
			}

			.loginout-info {
				width: 686rpx;
				// height: 228rpx;
				padding-top: 80rpx;
				padding-bottom: 20rpx;
				background: #fff;
				border: 4rpx solid rgb(255, 78, 47);
				border-radius: 16rpx;

				.loginout-info-tit {
					width: 100%;
					font-size: 40rpx;
					color: rgb(44, 44, 44);
					text-align: center;
				}

				.loginout-info-btn {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 60rpx;

					view {
						width: 240rpx;
						height: 60rpx;
						line-height: 60rpx;
						font-size: 32rpx;
						text-align: center;
						border-radius: 16rpx;
					}

					.loginout-info-btn-cancel {
						color: rgb(44, 44, 44);
						border: 2rpx solid rgb(255, 78, 47);
					}

					.loginout-info-btn-ok {
						color: #fff;
						padding: 2rpx;
						background: rgb(255, 78, 47);
						margin-left: 40rpx;
					}
				}
			}
		}

		.new-item {
			width: 340rpx;
			height: 700rpx;
			background: #FFF;
			border-radius: 16rpx;
			margin-left: 24rpx;
			margin-bottom: 20rpx;

			.new-item-tags {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				margin-top: 20rpx;

				.tag {
					font-size: 16rpx;
					color: #00A9FF;
					padding: 0 10rpx;
					background: rgba(138, 212, 251, 0.5);
					border-radius: 10rpx;
					margin-left: 14rpx;
					margin-bottom: 8rpx;
				}

			}

			.new-item-img {
				display: block;
				width: 340rpx;
				height: 340rpx;
			}

			.new-item-name {
				width: 320rpx;
				line-height: 30rpx;
				font-size: 24rpx;
				color: #2C2C2C;
				margin: 10rpx auto 0 auto;
			}

			.new-item-price {
				font-size: 24rpx;
				color: #FF4E2F;
				margin: 20rpx 0 20rpx 10rpx;

				text {
					font-size: 32rpx;
				}
			}

			.new-item-jindu {
				width: 100%;
				font-size: 16rpx;
				color: #2C2C2C;
				display: flex;
				align-items: center;

				.new-item-jindu-name {
					margin-left: 10rpx;
				}

				.new-item-jindu-data {
					width: 140rpx;
					height: 10rpx;
					// display: flex;
					margin-left: 10rpx;
					border-radius: 50%;
				}

				.new-item-jindu-bfb {
					font-size: 16rpx;
					color: #FF4E2F;
					margin-left: 10rpx;
				}

			}

			.new-item-shoucang {
				position: relative;
				width: 100%;
				display: flex;
				align-items: center;
				margin-top: 20rpx;

				image {
					width: 40rpx;
					height: 40rpx;
					margin-left: 10rpx;
				}

				.new-item-shoucang-name {
					font-size: 24rpx;
					color: #BEBEBE;
					margin-left: 10rpx;
				}

				.new-item-shoucang-btn {
					position: absolute;
					right: 20rpx;
					width: 140rpx;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 24rpx;
					color: #FF4E2F;
					text-align: center;
					border: 1rpx solid rgb(255, 78, 47);
					border-radius: 16rpx;
				}

			}

		}



		.auct-nav {
			background: #fff;
			padding: 30rpx 30rpx;
			display: flex;
			justify-content: space-between;
			text-align: center;

			.li {
				font-size: 26rpx;
				position: relative;
				width: 50%;
			}

			.active {
				color: rgb(255, 78, 47);
				font-weight: 550;
			}

			.active::after {
				width: 32rpx;
				height: 5rpx;
				background: rgb(255, 78, 47);
				border-radius: 3rpx;
				position: absolute;
				bottom: -10rpx;
				left: 50%;
				margin-left: -16rpx;
				display: block;
				content: "";
			}
		}


		.banner-list {
			width: 750rpx;
			height: 170rpx;
			background: #fff;
			margin: 20rpx auto 0 auto;


			.banner-item {
				display: inline-block;
				width: 164rpx;
				height: 170rpx;
				font-size: 24rpx;
				text-align: center;

				image {
					width: 86rpx;
					height: 94rpx;
				}

				.t {
					width: 130rpx;
					height: 66rpx;
					white-space: normal;
					overflow: hidden;
					// text-overflow: ellipsis;
					word-break: break-all;
					margin: 0 auto;
				}
			}

		}

		.auct-class {
			width: 180rpx;
			height: 160rpx;
			// display: flex;
			// align-items: center;

			// margin: 20rpx auto 0 auto;

			.li {
				width: 25%;

			}

			.icon {
				width: 86rpx;
				height: 95rpx;
				margin: 0 auto;
			}

			.t {
				font-size: 24rpx;
				text-align: center;
			}
		}

		.auct-title {
			// width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx 20rpx;
			margin-top: 20rpx;

			.t {
				font-size: 28rpx;
				font-weight: 550;
			}

			.more {
				font-size: 26rpx;
				display: flex;
				align-items: center;

				.icon {
					width: 10rpx;
					height: 18rpx;
					margin-left: 15rpx;
				}
			}
		}

		.auct-new {
			width: 100%;
			// display: flex;
			// flex-wrap: wrap;
			// background: #fff;

			// padding: 10rpx 0rpx 0rpx 0rpx;
			.new-li {
				width: 340rpx;
				background: #fff;
				// padding: 30rpx;
				border-bottom: 10rpx solid #f9f9f9;
				margin-left: 24rpx;
				// display: flex;

				.li-img {
					display: block;
					width: 340rpx;
					height: 340rpx;
					border-radius: 10rpx;
				}

				.li-date {
					height: 40rpx;
					background: rgb(255, 78, 47);
					background: linear-gradient(-45deg, rgb(255, 78, 47) 0%, #ff4e50 100%);
					border-radius: 10px 0px 10rpx 0px;
					position: absolute;
					left: 0;
					top: 0;
					line-height: 40rpx;
					padding: 0 10rpx;
					font-size: 22rpx;
					color: #fff;
				}

				.li-t {
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					background: rgba(252, 6, 9, 0.3);
					height: 34rpx;
					border-radius: 10rpx;
					line-height: 34rpx;
					text-align: center;
					color: #fff;
					font-size: 22rpx;
					line-height: 34rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.li-txt {
					width: calc(100% - 255rpx);

					.li-h {

						// display: flex;
						// align-items: center;
						// justify-content: space-between;
						.name {
							width: 320rpx;
							line-height: 30rpx;
							font-size: 24rpx;
							color: #2C2C2C;
							// font-weight: 550;
							// overflow: hidden;
							// text-overflow: ellipsis;
							// white-space: nowrap;
							// width: 93%;
						}

						.s {
							color: #999;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							// max-width: 70%;
						}
					}

					.t {
						font-size: 26rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin: 10rpx 0 10rpx 0;
					}

					.li-tags {
						display: flex;
						flex-wrap: wrap;
						margin: 0 -5rpx;

						.tag {
							margin: 5rpx;
							// width: 110rpx;

							height: 30rpx;
							background: #e1ebff;
							line-height: 30rpx;
							text-align: center;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 22rpx;
							color: #699dff;
						}

						.yellow {
							background: #ffedcc;
							color: #ffa503;
						}

						.red {
							background: #ffe2e2;
							color: #d32524;
						}
					}

					.li-price {
						width: 100%;
						margin: 20rpx 0;

						.price-fl {
							width: 100%;
							font-size: 24rpx;

							.red {
								color: rgb(255, 78, 47);

							}

							.gray {
								color: #999;
								// text-decoration: line-through;
							}
						}

						.price-btn {
							width: 100rpx;
							height: 50rpx;
							background: rgb(255, 78, 47);
							border-radius: 10rpx;
							min-width: 100rpx;
							max-width: 100rpx;
							text-align: center;
							line-height: 50rpx;
							margin: 0;
							font-size: 24rpx;
							color: #fff;
						}
					}

					.li-b {
						display: flex;
						align-items: center;
						justify-content: space-between;
						color: rgb(255, 78, 47);

						.w {}

						.li-pro {
							position: relative;
							flex: 1;
							margin: 0 10rpx;
							height: 12rpx;
							background: #f5f5f5;
							border-radius: 6rpx;

							.pro {
								position: absolute;
								left: 0;
								top: 0;
								height: 100%;
								border-radius: 6rpx;
								background: rgb(255, 78, 47);
							}
						}
					}
				}
			}
		}

		//竞拍中
		.jping {
			position: relative;
			width: 710rpx;
			height: 320rpx;
			display: flex;
			align-items: center;
			background: #fff;
			border-radius: 16rpx;
			box-shadow: 0px 4rpx 14px rgba(190, 190, 190, 0.3);
			margin: 0rpx auto 30rpx auto;

			.jping-result {
				position: absolute;
				right: 0;
				bottom: 0;
				width: 200rpx;
				height: 200rpx;
				background: url('../../static/images/products/hui.png') no-repeat;
				background-size: 200rpx 200rpx;

				view {
					position: absolute;
					top: 110rpx;
					left: 76rpx;
					transform: rotate(-45deg);
					font-size: 24rpx;
					color: rgb(255, 255, 255);
				}
			}

			.jping-left {
				position: relative;
				width: 268rpx;
				height: 320rpx;
				box-sizing: border-box;
				border: 4rpx solid rgb(255, 78, 47);
				border-radius: 16rpx;

				image {
					width: 260rpx;
					height: 260rpx;
					border-radius: 12rpx 12rpx 0 0;
				}

				.jping-left-q {
					position: absolute;
					left: 0;
					bottom: -4rpx;
					width: 260rpx;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 24rpx;
					color: rgb(255, 255, 255);
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					background: rgba(255, 78, 47, 0.5);
					border-radius: 0 0 10rpx 10rpx;
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
				width: 416rpx;
				height: 100%;
				margin-left: 10rpx;

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
						width: 416rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}

				.jping-tags {
					position: absolute;
					top: 70rpx;
					width: 100%;
					height: 70rpx;
					display: flex;
					flex-wrap: wrap;
					align-items: flex-start;
					// display: -webkit-box;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;


					view {
						// width: 120rpx;
						height: 34rpx;
						line-height: 34rpx;
						font-size: 16rpx;
						text-align: center;
						padding: 0 10rpx;
						border-radius: 10rpx;
						margin-bottom: 4rpx;
						margin-right: 10rpx;
					}

					.lan {
						background: rgba(138, 212, 251, 0.5);
						color: rgb(0, 169, 255);
					}

					.chen {
						background: rgba(255, 221, 175, 0.5);
						color: rgb(255, 78, 47);
					}

					.red {
						background: rgba(255, 175, 175, 0.5);
						color: rgb(255, 0, 0);
					}
				}

				.jping-price {
					position: absolute;
					bottom: 112rpx;
					width: 100%;
					display: flex;
					align-items: center;
					// justify-content: space-between;

					.jping-price-left {

						.jping-price-new {
							font-size: 32rpx;
							color: rgb(255, 0, 0);
						}

						.jping-price-old {
							font-size: 16rpx;
							color: rgb(190, 190, 190);
							text-decoration: line-through;
							margin-left: 16rpx;
						}

					}

					.jping-price-num {
						position: absolute;
						right: 84rpx;
						font-size: 16rpx;
						color: rgb(44, 44, 44);
						// margin-left: 10rpx;
					}

					.jping-price-btn {
						position: absolute;
						right: 10rpx;
						width: 100rpx;
						height: 50rpx;
						line-height: 50rpx;
						font-size: 24rpx;
						color: #fff;
						text-align: center;
						background: rgb(255, 78, 47);
						border-radius: 16rpx;
					}

				}

				.jping-sjm {
					position: absolute;
					bottom: 20rpx;
					width: 300rpx;
					font-size: 24rpx;
					color: rgb(44, 44, 44);
					display: flex;
					align-items: center;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

					image {
						width: 40rpx;
						height: 40rpx;
						margin-right: 10rpx;
					}
				}

				.jping-jd {
					position: absolute;
					bottom: 62rpx;
					width: 100%;
					font-size: 24rpx;
					color: rgb(255, 78, 47);
					display: flex;
					align-items: center;
					margin-top: 10rpx;

					.jping-jd-name {
						// width: 150rpx;
						// overflow: hidden;
						// text-overflow: ellipsis;
						// white-space: nowrap;
					}

					.jping-jd-data {
						width: 340rpx;
						margin-right: 20rpx;
					}
				}



				.jping-auth {
					position: absolute;
					bottom: 72rpx;
					width: 100%;
					display: flex;
					align-items: center;

					.jping-auth-info {
						width: 40rpx;
						height: 40rpx;
						border-radius: 50%;
					}

					.jping-star {
						position: absolute;
						left: 24rpx;
						bottom: 0;
						width: 20rpx;
						height: 20rpx;
					}

					.jping-auth-name {
						max-width: 200rpx;
						font-size: 24rpx;
						color: rgb(255, 78, 47);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: normal;
						margin-left: 10rpx;
					}
				}

			}
		}


		.auct-start {
			margin: 30rpx 0;

			.auct-title {
				margin-bottom: 30rpx;
			}

			.new-li {
				background: #fff;
				padding: 30rpx;
				border-bottom: 10rpx solid #f9f9f9;
				display: flex;

				.li-img {
					width: 230rpx;
					height: 230rpx;
					border-radius: 10rpx;
					position: relative;
					margin-right: 25rpx;
					min-width: 230rpx;
					max-width: 230rpx;
					overflow: hidden;
				}

				.li-date {
					height: 40rpx;
					background: #9a3064;
					background: linear-gradient(90deg, #9a3064 0%, #59499b 100%);
					border-radius: 10px 0px 10rpx 0px;
					position: absolute;
					left: 0;
					top: 0;
					line-height: 40rpx;
					padding: 0 10rpx;
					font-size: 22rpx;
					color: #fff;
				}

				.li-t {
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					background: rgba(90, 86, 255, 0.5);
					height: 34rpx;
					border-radius: 10rpx;
					line-height: 34rpx;
					text-align: center;
					color: #fff;
					font-size: 22rpx;
					line-height: 34rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.li-txt {
					width: calc(100% - 255rpx);

					.li-h {

						// display: flex;
						// align-items: center;
						// justify-content: space-between;
						.name {
							font-size: 28rpx;
							font-weight: 550;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							// width: 93%;
						}

						.s {
							color: #999;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							// max-width: 70%;
						}
					}

					.t {
						font-size: 26rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin: 10rpx 0 10rpx 0;
					}

					.li-tags {
						display: flex;
						flex-wrap: wrap;
						margin: 0 -5rpx;

						.tag {
							margin: 5rpx;
							// width: 110rpx;
							height: 30rpx;
							background: #e1ebff;
							line-height: 30rpx;
							text-align: center;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 22rpx;
							color: #699dff;
						}

						.yellow {
							background: #ffedcc;
							color: #ffa503;
						}

						.red {
							background: #ffe2e2;
							color: #d32524;
						}
					}

					.li-price {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin: 10rpx 0;

						.price-fl {
							.red {
								color: rgb(255, 78, 47);
								margin-right: 20rpx;
							}

							.gray {
								color: #999;
								text-decoration: line-through;
							}
						}
					}

					.li-b {
						display: flex;
						align-items: center;
						justify-content: flex-end;
						color: rgb(255, 78, 47);

						.price-btn {
							width: 100rpx;
							height: 50rpx;
							background: rgb(255, 78, 47);
							border-radius: 10rpx;
							min-width: 100rpx;
							max-width: 100rpx;
							text-align: center;
							line-height: 50rpx;
							margin: 0;
							font-size: 24rpx;
							color: #fff;
						}
					}
				}
			}
		}

		.auct-his {
			margin: 0rpx 0;

			.auct-title {
				margin-bottom: 30rpx;
			}

			.new-li {
				background: #fff;
				padding: 30rpx;
				border-bottom: 10rpx solid #f9f9f9;
				display: flex;

				.li-img {
					width: 230rpx;
					height: 230rpx;
					border-radius: 10rpx;
					position: relative;
					margin-right: 25rpx;
					min-width: 230rpx;
					max-width: 230rpx;
					overflow: hidden;
				}

				.li-date {
					height: 40rpx;
					background: #9a3064;
					background: linear-gradient(90deg, #9a3064 0%, #59499b 100%);
					border-radius: 10px 0px 10rpx 0px;
					position: absolute;
					left: 0;
					top: 0;
					line-height: 40rpx;
					padding: 0 10rpx;
					font-size: 22rpx;
					color: #fff;
				}

				.li-t {
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					background: rgba(0, 0, 0, 0.5);
					height: 34rpx;
					border-radius: 10rpx;
					line-height: 34rpx;
					text-align: center;
					color: #fff;
					font-size: 22rpx;
					line-height: 34rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.li-txt {
					width: calc(100% - 255rpx);

					.li-h {

						// display: flex;
						// align-items: center;
						// justify-content: space-between;
						.name {
							font-size: 28rpx;
							font-weight: 550;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							// width: 93%;
						}

						.s {
							color: #999;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							// max-width: 70%;
						}
					}

					.t {
						font-size: 26rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin: 10rpx 0 10rpx 0;
					}

					.li-price {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin: 10rpx 0;

						.price-fl {
							.red {
								color: rgb(255, 78, 47);
								margin-right: 20rpx;
							}

							.gray {
								color: #999;
								text-decoration: line-through;
							}
						}
					}

					.li-time {
						// height: 45rpx;
						background: #ffe2e2;
						padding: 0 15rpx;
						display: flex;
						font-size: 22rpx;
						color: rgb(255, 78, 47);
						line-height: 45rpx;
						margin: 15rpx 0;
					}

					.li-b {
						font-size: 22rpx;
						color: #999;
					}
				}
			}
		}

		.auct-luck {
			margin: 30rpx 0;

			.auct-title {
				margin-bottom: 30rpx;
			}

			.luck-ul {
				background: #fff;
				padding: 0 30rpx;

				.luck-li-line {
					width: 638rpx;
					border-bottom: 1px solid rgb(204, 204, 204);
					margin-top: 32rpx;
				}

				.luck-li {
					position: relative;
					padding: 30rpx 0;
					// border-bottom: 1px solid #f5f5f5;

					.cent {
						display: flex;

						image {
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							margin-right: 20rpx;
						}

						.vip {
							width: 102rpx;
							height: 28rpx;
							text-indent: 32rpx;
							font-size: 16rpx;
							color: rgb(219, 132, 37);
							margin-left: -4rpx;
							line-height: 25rpx;
							background: url('/static/images/new-index/vips.png') no-repeat;
							background-size: 102rpx 28rpx;
							border-radius: 12rpx;
							margin-top: 8rpx;
						}

						.box-name-level {
							width: 120rpx;
							height: 40rpx;
							margin-left: 20rpx;
							background: rgb(253, 240, 226);
							border-radius: 100rpx;
							display: flex;
							margin-left: -20rpx;

							.level-icon {
								width: 40rpx;
								height: 40rpx;

								image {
									width: 100%;
								}
							}

							.level-num {
								margin-left: 8rpx;
								color: rgb(219, 132, 37);
								font-size: 20rpx;
								line-height: 40rpx;
							}
						}

						.li-txt {
							width: 540rpx;
							// word-break: break-all;
							flex: 1;

							.li-h {
								max-width: 340rpx;
								display: flex;
								align-items: center;
								justify-content: space-between;

								.h-fl {
									display: flex;
									align-items: center;

									.name {
										max-width: 400rpx;
										font-size: 28rpx;
										font-weight: 550;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}


								}

								.h-c {
									font-size: 24rpx;
									color: rgb(190, 190, 190);
								}
							}

							.li-c {
								width: 100%;
								margin: 15rpx 0;
								font-size: 24rpx;
								line-height: 40rpx;

								image {
									width: 24rpx;
									height: 24rpx;
								}
							}

							.li-date {
								font-size: 22rpx;
								color: #999;
							}
						}
					}

					.right {
						position: absolute;
						right: 20rpx;
						display: flex;
						align-items: center;

						.lis {
							display: flex;
							align-items: center;
							margin-left: 45rpx;

							image {
								width: 40rpx;
								height: 40rpx;
								margin-right: 13rpx;
							}
						}
					}

					.bottom {
						margin-top: 25rpx;
						display: flex;
						justify-content: space-between;


					}
				}

				.luck-li:nth-last-child(1) {
					border: none;
				}
			}
		}

	}

	/deep/.u-count-down__text {
		width: 100%;
		height: 70rpx;
		line-height: 70rpx;
		color: rgb(255, 57, 57) !important;
		font-size: 28rpx !important;
	}

	/deep/.uni-progress-inner-bar {
		border-radius: 6rpx !important;
	}

	/deep/.uni-progress-bar {
		border-radius: 6rpx !important;
	}

	.zxjpCont {
		background: #fff;
		display: flex;
		padding: 0 20rpx;

		.li {
			width: 20%;
			height: 45rpx;
			line-height: 45rpx;
			background: #f5f5f5;
			border-radius: 23rpx;
			font-size: 24rpx;
			color: #000;
			margin-right: 20rpx;
			padding: 0 18rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			&:nth-child(5) {
				margin-right: 0;
			}

			&.active {
				background: rgb(255, 78, 47);
				color: #fff;
			}
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
		top: 20rpx;
		right: 30rpx;
		z-index: 20;

		image {
			width: 36rpx;
			height: 36rpx;
			// top: 10rpx;
		}
	}

	.qiangpaiCont {
		width: 686rpx;
		background: #fff;
		position: relative;
		padding: 60rpx 0 50rpx 0;
		// border: 4rpx solid rgb(10, 198, 142);
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
				margin: 0rpx auto 40rpx;
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
					margin: 10rpx auto 0;
					text-align: center;

					.tit {
						width: 100%;
						font-size: 28rpx;
						font-weight: bold;
						color: rgb(51, 51, 51);
						text-align: center;
						margin-bottom: 20rpx;
					}


					.my-input {
						width: 566rpx;
						display: flex;
						align-items: center;
						background: rgb(241, 241, 241);
						border-radius: 16rpx;

						image {
							display: block;
							width: 32rpx;
							height: 32rpx;
							margin: 0 16rpx 0 24rpx;
						}

					}

					uni-input {
						width: 480rpx;
						height: 80rpx;
						border: none;
						font-size: 28rpx;
						text-align: left;
					}

					.num {
						display: flex;
						align-items: center;
						// justify-content: center;
						font-size: 24rpx;
						margin-top: 30rpx;
						color: rgb(10, 198, 142);
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
					background: rgb(10, 198, 142);
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
				background: rgb(10, 198, 142);
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

	.jingpai-pop {
		width: 686rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 45rpx 0;
		// border: 4rpx solid rgb(10, 198, 142);

		.title {
			width: 80%;
			font-size: 32rpx;
			color: #000;
			font-weight: bold;
			text-align: center;
			margin: 0 auto;
		}

		.txt {
			width: 100%;
			margin-top: 24rpx;
			font-size: 24rpx;
			color: rgb(10, 198, 142);
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
					border: 1rpx solid rgb(10, 198, 142);
					margin-right: 97rpx;
				}

				.ljfx {
					color: #fff;
					background: rgb(10, 198, 142);

				}
			}
		}
	}

	//支付方式弹出 S
	.mode-pop {
		background: #ffffff;
		border-radius: 20rpx 20rpx 0px 0px;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		padding-top: 60rpx;
		padding-bottom: 24rpx;

		.mode-close {
			position: absolute;
			top: 40rpx;
			right: 32rpx;
			width: 32rpx;
			height: 32rpx;
		}

		.mode-tit {
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}

			view {
				font-size: 56rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
			}
		}

		.mode-des {
			width: 100%;
			font-size: 28rpx;
			color: rgb(153, 153, 153);
			text-align: center;
			margin-top: 24rpx;
		}

		.mode-banlace {
			width: 100%;
			font-size: 28rpx;
			color: rgb(255, 57, 57);
			text-align: center;
			margin-top: 12rpx;
		}

		.mode-info {
			position: relative;
			width: 100%;
			display: flex;
			align-items: center;
			margin-top: 136rpx;

			.logo {
				width: 48rpx;
				height: 48rpx;
				margin-left: 40rpx;
			}

			.info-tit {
				margin-left: 24rpx;

				.info-name {
					font-size: 28rpx;
					color: rgb(51, 51, 51);
				}

				.info-price {
					font-size: 24rpx;
					color: rgb(102, 102, 102);

					text {
						color: rgb(10, 198, 142);
						margin-left: 8rpx;
					}
				}
			}

			.mode-info-right {
				position: absolute;
				right: 40rpx;
				font-size: 20rpx;
				color: rgb(102, 102, 102);
				display: flex;
				align-items: center;

				image {
					width: 24rpx;
					height: 24rpx;
					margin-left: 8rpx;
				}
			}

			.select {
				position: absolute;
				right: 40rpx;
				width: 40rpx;
				height: 40rpx;
			}

		}

		.mode-more {
			position: relative;
			width: 100%;
			display: flex;
			align-items: center;
			margin-top: 20rpx;

			.tit {
				font-size: 28rpx;
				color: rgb(51, 51, 51);
				margin-left: 112rpx;
			}

			.logo {
				width: 32rpx;
				height: 32rpx;
				margin-left: 20rpx;
			}

			.num {
				font-size: 28rpx;
				color: rgb(102, 102, 102);
				margin-left: 8rpx;
			}

			.price {
				position: absolute;
				right: 100rpx;
				font-size: 24rpx;
				color: rgb(255, 57, 57);
			}

			.select {
				position: absolute;
				right: 40rpx;
				width: 40rpx;
				height: 40rpx;
			}

		}

		.mode-cz {
			font-size: 24rpx;
			color: rgb(10, 198, 142);
			display: flex;
			align-items: center;
			margin-left: 112rpx;
			margin-top: 20rpx;

			image {
				width: 24rpx;
				height: 24rpx;
				margin-left: 8rpx;
			}
		}

		.mode-switch {
			font-size: 24rpx;
			color: rgb(102, 102, 102);
			display: flex;
			align-items: center;
			margin-top: 240rpx;

			image {
				display: block;
				width: 32rpx;
				height: 32rpx;
				margin: 0 12rpx 0 32rpx;
			}
		}

		.mode-btn {
			width: 686rpx;
			height: 88rpx;
			line-height: 88rpx;
			font-size: 40rpx;
			color: rgb(255, 255, 255);
			text-align: center;
			background: rgb(10, 198, 142);
			border-radius: 88rpx;
			margin: 24rpx auto;
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
			background: rgb(10, 198, 142);
			border-radius: 40rpx;
			display: block;
			margin: 0 auto;
			line-height: 80rpx;
			font-size: 32rpx;
			color: #fff;
		}
	}

	//支付密码弹出 E
	// 支付成功弹框
	.payConter {
		width: 660rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 48rpx 41rpx;

		.title {
			font-size: 30rpx;
			color: #000;
			font-weight: 600;
		}

		.txt {
			font-size: 28rpx;
			color: #5a56ff;
			padding: 26rpx 0;
		}

		.name {
			font-size: 28rpx;
			color: rgb(10, 198, 142);
		}

		.cont {
			margin-top: 45rpx;
			display: flex;
			justify-content: space-between;

			.right {
				display: flex;
				align-items: center;

				.query {
					font-size: 32rpx;
					color: #999;
					margin-right: 96rpx;
				}

				.cen {
					font-size: 32rpx;
					color: rgb(10, 198, 142);
				}
			}
		}
	}

	// 支付成功弹框
	//share-pop S
	.share-pop {
		background: #ffffff;
		border-radius: 20rpx 20rpx 0px 0px;

		.share-t {
			font-size: 28rpx;
			font-weight: 550;
			text-align: center;
			padding: 30rpx;
		}

		.share-ul {
			display: flex;
			flex-wrap: wrap;
			padding: 50rpx 30rpx;
			text-align: center;

			.share-li {
				width: 20%;

				.icon {
					width: 90rpx;
					height: 90rpx;
					margin: 0 auto;
				}

				.t {
					font-size: 28rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					// line-height: 1;
					margin-top: 25rpx;
				}
			}
		}

		.share-bot {
			padding: 40rpx 30rpx;
			border-top: 1px solid #f5f5f5;

			.share-btn {
				font-size: 28rpx;
				font-weight: 550;
				width: 100%;
				padding: 0;
				margin: 0;
			}
		}
	}

	//share-pop E

	//优惠券弹出 S
	.ticket-pop {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: center;
		justify-content: center;

		.ticket-box {
			position: relative;
			width: 683rpx;
			height: 736rpx;

			.ticket-close {
				position: absolute;
				width: 60rpx;
				height: 60rpx;
				left: 50%;
				bottom: -90rpx;
				margin-left: -30rpx;
				z-index: 66;
			}

			.ticket-bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}

			.ticket-con {
				position: relative;
				z-index: 11;
				padding: 100rpx 80rpx;

				.ticket-t {
					font-size: 24rpx;
					color: #fff;
					text-align: center;
					padding: 60rpx 0 20rpx 0;
				}

				.ticket-ul {
					background: #e91d00;
					padding: 10rpx 20rpx;
					overflow-y: auto;
					height: 360rpx;

					.ticket-li {
						position: relative;
						margin: 10rpx 0;
						padding: 20rpx;
						line-height: 50rpx;
						display: flex;
						align-items: center;
						height: 130rpx;
						justify-content: space-between;

						.li-line {
							height: 1px;
							background: #e4e4e4;
						}

						.li-bg {
							height: 100%;
							position: absolute;
							left: 0;
							top: 0;
							width: 100%;
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
							width: 55%;
						}

						.li-t {
							font-weight: 550;

							.price {
								font-size: 26rpx;
								color: rgb(255, 78, 47);
							}

							.t {
								font-size: 32rpx;
							}
						}

						.li-c {
							.c {
								font-size: 24rpx;
								color: rgb(255, 78, 47);
							}

							.date {
								color: #666;
								font-size: 22rpx;
							}
						}
					}
				}

				.ticket-bot {
					height: 80rpx;
					background: linear-gradient(135deg, #ecc988 0%, #f9e2b7 100%);
					border-radius: 40rpx;
					width: 402rpx;
					margin: 30rpx auto;
					line-height: 80rpx;
					text-align: center;
					font-size: 28rpx;
					color: #e91d00;
					font-weight: 550;
				}
			}
		}
	}

	//优惠券弹出 E
	// 日期时间选择器弹框
	.date-time-popup {
		.popup-header {
			padding: 20rpx;

			.popup-title {
				font-weight: bold;
				font-size: 30rpx;
			}
		}

		.popup-body {
			.date-time-picker-view {
				height: 500rpx;

				.date-time-picker-center {
					height: 80rpx;
				}

				.date-time-picker-item {
					// flex-grow flex-shrink flex-basis
					// flex: 0 1 auto;
					flex: 0 1 auto;
					text-align: center;

					&.picker-year {
						width: 33.333%;
						// background: pink;
					}

					&.picker-month {
						width: 33.333%;
						// background: green;
					}

					&.picker-date {
						width: 33.333%;
						// background: hotpink;
					}

					&.picker-text {
						width: 130rpx;
						// background: yellowgreen;
					}

					&.picker-time {
						width: 220rpx;
						flex: 1;
						// background: peru;
					}
				}

				.picker-item {
					line-height: 80rpx;

					&.active {
						color: #af2521;
					}
				}
			}
		}
	}

	.custom-popup {
		background: #fff;

		.popup-header {
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #f5f5f5;
			box-sizing: border-box;

			.popup-cancel,
			.popup-confirm,
			.popup-title {
				height: 84rpx;
				display: flex;
				align-items: center;
				// background: pink;
			}

			.popup-cancel,
			.popup-confirm {
				padding: 0 20rpx;
			}

			.popup-cancel {
				color: #999;
			}

			.popup-title {
				flex: 1;
				font-weight: 600;
				// background: #f5f5f5;
				display: flex;
				justify-content: center;
			}

			.popup-confirm {
				color: #af2521;
			}
		}

		.popup-body {
			min-height: 440rpx;
		}
	}
</style>