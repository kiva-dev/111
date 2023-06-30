<template>
	<view class="auct-page">

		<!--普通商品-->
		<block v-if="productId==1">
			<view class="product-head">
				<view>{{$t('tab.all')}}</view>
				<image src="../../static/images/auction/zw.png" class="lange" v-show="!isShopCont"
					@click="onChangeLanuage(locales[0])"></image>
				<image src="/static/images/new-index/lange.png" class="lange" v-show="isShopCont"
					@click="onChangeLanuage(locales[1])"></image>

				<image src="/static/images/new-index/msg.png" class="auth" @click="navClick('/pages/mine/message')">
				</image>
			</view>

			<view class="switch-logo">
				<view class="switch-logo-info" @click="getAllProducts(0);switch_id=0">
					<image src="/static/images/new-index/all_product.png"></image>
					<view :style="switch_id==0?'color: rgb(51, 222, 114);':''">{{$t('tab.all')}}</view>
				</view>
				<view class="switch-line"></view>
				<scroll-view :scroll-x="true" style="width: calc(750rpx - 180rpx);white-space: nowrap;"
					@scrolltoupper="isBottoming = false" @scrolltolower="isBottoming = true">
					<view class="switch-logo-info" v-for="item in FirstList" :key="item.id"
						@click="switchSelect(item.id)">
						<image :src="item.image"></image>
						<view :style="switch_id==item.id?'color: rgb(51, 222, 114);':''">{{item.name}}</view>
					</view>
				</scroll-view>
				<view class="sl-line">
					<view class="sl-line-bg" :style="{ left: isBottoming ? '14rpx':'0'}"></view>
				</view>
			</view>

			<!--正在抢拍的数据-->
			<view class="new-list" style="margin-top: 20rpx;">
				<view class="new-list-head">
					<block>
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
				</view>

				<!--单行显示-->
				<block v-if="selectId==1">
					<view class="new-list-item" v-for="(item,i) in productList" :key="i"
						@click="toProductInfo(item.goods_id)" @longpress="item.isMask=true">
						<image :src="item.image" class="new-list-item-left"></image>
						<view class="new-list-item-right">
							<view class="product-right-txt">{{item.goods_name}}</view>

							<view class="new-list-item-right-tags" style="top: 112rpx;">
								<block v-for="(data,index) in item.litestore_tag" :key="data.tag_id">
									<image :src="data.image"></image>
								</block>
							</view>

							<view class="new-list-item-right-start" style="top: 158rpx;">
								<view class="new-list-item-right-start-info">
									<image src="../../static/images/new-index/xx.png"></image>
									<view>{{item.litestore_goods_focus_total}}</view>
								</view>
								<view class="new-list-item-right-start-info">
									<image src="../../static/images/new-index/xcz.png"></image>
									<view>{{item.auction_goods_total}}</view>
								</view>
								<view class="new-list-item-right-start-info">
									<image src="../../static/images/new-index/pl.png"></image>
									<view>{{item.litestore_goods_comment_total}}</view>
								</view>
							</view>

							<view class="new-list-item-btm">
								<view class="new-list-item-btm-price">
									<view class="new">RM<span>{{item.litestore_goods_spec[0].goods_price}}</span></view>
								</view>

								<view class="add_gwc" @click.stop="addCart(item)"></view>
							</view>

							<view class="mask" v-show="item.isMask">
								<image src="/static/images/new-index/close.png" class="close"
									@click.stop="item.isMask=false"></image>
								<view style="height: 46rpx;"></view>
								<view class="mask-info" v-for="data in item.litestore_tag">
									<image :src="data.image"></image>
									<view><u-parse :content="isShopCont?data.en_desc:data.zh_desc"></u-parse></view>
								</view>
							</view>

						</view>
					</view>
				</block>

				<!--一行双列显示-->
				<block v-else-if="selectId==2">
					<view class="new-list-item-two">
						<view class="info" v-for="(item,i) in productList" :key="i"
							@click="toProductInfo(item.goods_id)">
							<image :src="item.image" class="info-img"></image>
							<view class="info-tit">{{item.goods_name}}</view>

							<view class="info-tags">
								<view class="info-tag">
									<image src="/static/images/new-index/xx.png"></image>
									<view>{{item.litestore_goods_focus_total}}</view>
								</view>

								<view class="info-tag">
									<image src="/static/images/new-index/xcz.png"></image>
									<view>{{item.auction_goods_total}}</view>
								</view>

								<view class="info-tag">
									<image src="/static/images/new-index/pl.png"></image>
									<view>{{item.litestore_goods_comment_total}}</view>
								</view>
							</view>


							<view class="info-btm" style="margin-top: 32rpx;">

								<view class="info-price">
									<view class="new">RM<span>{{item.litestore_goods_spec[0].goods_price}}</span></view>
								</view>

								<view class="add_gwc" @click.stop="addCart(item)"></view>
							</view>
						</view>
					</view>
				</block>

				<!--竖向单行显示-->
				<block v-else>
					<view class="new-list-line" v-for="(item,i) in productList" :key="i"
						@click="toProductInfo(item.goods_id)">
						<image :src="item.image" class="product_img"></image>
						<view class="product_txt">{{item.goods_name}}</view>

						<view class="info">
							<view class="info-left">
								<view class="info_price">
									<view class="new">RM<span>{{item.litestore_goods_spec[0].goods_price}}</span></view>
								</view>
							</view>

							<view class="add_gwc" style="width: 64rpx;height: 64rpx;background-size: 64rpx 64rpx;"
								@click.stop="addCart(item)">
							</view>
						</view>

					</view>
				</block>

			</view>

			<image src="/static/images/new-index/gwc.png" v-show="productId==1" class="gwc"
				@click="navClick('/pages/cart/cart')"></image>
		</block>

		<block v-else>
			<view class="head-img">
				<view class="more-head">
					<view class="head-input">
						<image src="/static/images/products/auth.png" class="auth"></image>
						<image src="/static/images/new-index/jjks_cz.png" class="logo"></image>
						<view class="head-input-tit">{{$t('new.zxddlzy')}}
							{{isShopCont? addressInfo.name_en:addressInfo.name}}
						</view>
						<view class="head-input-time">{{addressInfo.time}}</view>
					</view>
					<view class="right-btn">
						<image src="/static/images/new-index/mycz.png"></image>
						<view>{{$t('top.auctionDetail')}}</view>
					</view>
				</view>
				<!--抢拍分类框-->
				<view class="ongoing-type">
					<!--正在竞拍小框-->
					<view class="ongoing-type-left" v-if="id!=1">
						<view class="ongoing-type-left-head"
							style="background: linear-gradient(180.00deg, rgba(255,198.2,198.2,1.00),rgba(255,254.75,254.75,0.00) 98.871%);">
							<image src="/static/images/new-index/ongoing.png" class="ongoing-type-left-head-logo">
							</image>
							<view class="ongoing-type-left-txt">
								<view>{{$t('new.zzjp')}}</view> <span style="rgba(255, 64, 41, 0.4)"></span>
							</view>
							<view class="ongoing-type-left-more" @click="switchJinpai(1)">
								<view>{{$t('home.detail.more')}}</view>
								<image src="/static/images/products/right.png"></image>
							</view>
						</view>
						<view class="ongoing-type-left-info">
							<view class="ongoing-type-left-info-des" v-for="item in jingpaiList.slice(0,2)"
								:key="item.id" @click="onJingPai(item)">
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

					<!--即将开始小框-->
					<view class="ongoing-type-left" v-if="id!=2">
						<view class="ongoing-type-left-head"
							style="background: linear-gradient(180.00deg, rgba(253.86,225.53,151.16,1.00),rgba(255,254.75,254.75,0.00) 98.871%);">
							<image src="/static/images/new-index/start-soon.png" class="ongoing-type-left-head-logo">
							</image>
							<view class="ongoing-type-left-txt">
								<view>{{$t('new.jjks')}}</view> <span></span>
							</view>
							<view class="ongoing-type-left-more" @click="switchJinpai(2)">
								<view>{{$t('home.detail.more')}}</view>
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
								<view class="ongoing-type-left-info-des-price">
									<image src="/static/images/kbrick/diamond.png"></image>
									<span>{{item.auction_price}}</span>
								</view>
							</view>
						</view>
					</view>

					<!--历史竞拍小框-->
					<view class="ongoing-type-left" v-if="id!=3">
						<view class="ongoing-type-left-head">
							<image src="/static/images/new-index/historical.png" class="ongoing-type-left-head-logo">
							</image>
							<view class="ongoing-type-left-txt">
								<view>{{$t('new.lsjl')}}</view> <span
									style="background: rgba(99, 97, 250, 0.4);"></span>
							</view>
							<view class="ongoing-type-left-more" @click="switchJinpai(3)">
								<view>{{$t('home.detail.more')}}</view>
								<image src="/static/images/products/right.png"></image>
							</view>
						</view>
						<view class="ongoing-type-left-info">
							<view class="ongoing-type-left-info-des" v-for="item in historyList.slice(0,2)"
								:key="item.id" @click="onJingPai(item)">
								<image :src="item.image" class="ongoing-type-left-info-des-product"></image>
								<view class="ongoing-type-left-info-des-auth">
									<image :src="item.user_info.avatar"></image>
									<view>Lucky Star</view>
								</view>
								<view class="ongoing-type-left-info-des-price">
									<image src="/static/images/kbrick/diamond.png"></image>
									<span>{{item.auction_price}}</span>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!--正在抢拍的数据-->
			<view class="new-list">
				<view class="new-list-head">
					<block>
						<image src="/static/images/new-index/ongoing.png" class="new-list-head-logo" v-if="id==1">
						</image>
						<image src="/static/images/new-index/start-soon.png" class="new-list-head-logo"
							v-else-if="id==2">
						</image>
						<image src="/static/images/new-index/historical.png" class="new-list-head-logo" v-else></image>
						<view class="new-list-head-txt">
							<view>{{title}}</view>
							<span v-if="id==1"></span>
							<span style="background: rgb(254, 204, 171);" v-else-if="id==2"></span>
							<span style="background: rgba(99, 97, 250, 0.4);" v-else></span>
						</view>
					</block>

					<block v-if="id!=3">
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
					</block>

				</view>

				<!--单行显示-->
				<block v-if="selectId==1">
					<view class="new-list-item" v-for="(item,i) in productList" :key="i" @click="onJingPai(item)"
						@longpress="item.isMask=true">
						<image :src="item.image" class="new-list-item-left"
							v-if="item.check_status!=3 && item.check_status!=4"></image>
						<view class="item-historical" v-else>
							<view class="item-historical-info">
								<image :src="item.image"></image>
								<view>{{item.stage_num}}{{$t('shop.qi')}}</view>
							</view>
						</view>
						<view class="new-list-item-right" v-if="item.check_status!=3 && item.check_status!=4">
							<view class="new-list-item-right-txt">{{item.goods_name}}</view>
							<view class="new-list-item-right-tags">
								<block v-for="(data,index) in item.tags" :key="data.tag_id">
									<image :src="data.image"></image>
								</block>
							</view>

							<view class="new-list-item-right-start">
								<view class="new-list-item-right-start-info">
									<image src="../../static/images/new-index/xx.png"></image>
									<view>{{item.litestore_goods_focus_total}}</view>
								</view>
								<view class="new-list-item-right-start-info">
									<image src="../../static/images/new-index/xcz.png"></image>
									<view>{{item.auction_goods_total}}</view>
								</view>
								<view class="new-list-item-right-start-info">
									<image src="/static/images/new-index/pl.png"></image>
									<view>{{item.litestore_goods_comment_total}}</view>
								</view>
							</view>

							<view class="new-list-item-right-jd" v-if="id==1">
								<view class="new-list-item-right-jd-data">
									<view>{{(item.finish_rate*100).toFixed(0)}}%</view>
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
								<view class="new-list-item-btm-price">
									<view class="new">
										<image src="/static/images/kbrick/diamond.png"></image>
										<span>{{item.auction_price}}</span>
									</view>
									<view class="old">RM{{item.price}}</view>
								</view>


								<view class="new-list-item-btm-btn" v-if="id==1">
									<image src="../../static/images/new-index/lvxcz.png"></image>
									<view @click.stop="onMineInfo(item)">{{$t('shop.qiangpai')}}</view>
								</view>

								<view class="new-list-item-btm-btn" v-if="id==2"
									style="border: 1rpx solid rgb(248, 155, 0);">
									<image src="/static/images/new-index/time1.png" style="width: 20rpx;height: 20rpx;">
									</image>
									<u-count-down :time="item.datetime" format="HH:mm:ss"
										style="color: rgb(248, 155, 0);"></u-count-down>
								</view>
							</view>

							<view class="mask" v-show="item.isMask">
								<image src="/static/images/new-index/close.png" class="close"
									@click.stop="item.isMask=false"></image>
								<view style="height: 46rpx;"></view>
								<view class="mask-info" v-for="data in item.tags">
									<image :src="data.image"></image>
									<view><u-parse :content="isShopCont?data.en_desc:data.zh_desc"></u-parse></view>
								</view>
							</view>

						</view>

						<view class="item-historical-des" v-else>
							<view class="des-tit">{{item.goods_name}}</view>
							<view class="des-center">
								<view class="des-center-price">
									<view class="new">
										<image src="/static/images/kbrick/diamond.png"></image>
										<span>{{item.auction_price}}</span>
									</view>
									<view class="old">RM{{item.price}}</view>
								</view>
								<view class="des-center-num">x{{item.join_count}}</view>
							</view>
							<view class="des-btm">
								<view class="left">
									<image :src="item.shop_logo"></image>
									<view class="left-name">{{item.shop_name}}</view>
								</view>
								<view class="right">{{$u.timeFormat(item.end_time, 'yyyy/mm/dd hh:MM')}}</view>
							</view>
						</view>

						<view class="item-status1" v-if="item.check_status==3">
							<view>Closure</view>
						</view>

						<view class="item-status2" v-if="item.check_status==4">
							<view>Unsold</view>
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
									<view>{{item.litestore_goods_focus_total}}</view>
								</view>

								<view class="info-tag">
									<image src="/static/images/new-index/xcz.png"></image>
									<view>{{item.auction_goods_total}}</view>
								</view>

								<view class="info-tag">
									<image src="/static/images/new-index/pl.png"></image>
									<view>{{item.litestore_goods_comment_total}}</view>
								</view>
							</view>

							<view class="info-jd" v-if="id==1">
								<image src="/static/images/new-index/select-jd.png"
									:style="`width: ${(item.finish_rate*100).toFixed(0)}%;`"></image>
								<view>{{(item.finish_rate*100).toFixed(0)}}%</view>
							</view>

							<view class="info-btm">
								<view class="info-price">
									<view class="new">
										<image src="/static/images/kbrick/diamond.png"></image>
										<span>{{item.auction_price}}</span>
									</view>
									<view class="old">RM{{item.price}}</view>
								</view>

								<view class="info-btn" v-if="id==1">
									<image src="/static/images/new-index/lvxcz.png"></image>
									<view @click.stop="onMineInfo(item)">{{$t('shop.qiangpai')}}</view>
								</view>

								<view class="new-list-item-btm-btn" v-if="id==2"
									style="border: 1rpx solid rgb(248, 155, 0);">
									<image src="/static/images/new-index/time1.png" style="width: 20rpx;height: 20rpx;">
									</image>
									<u-count-down :time="item.datetime" format="HH:mm:ss"
										style="color: rgb(248, 155, 0);"></u-count-down>
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
									<image src="/static/images/new-index/select-jd.png"
										:style="`width: ${(item.finish_rate*100).toFixed(0)}%;`"></image>
									<view>{{(item.finish_rate*100).toFixed(0)}}%</view>
								</view>
								<view class="info_price">
									<view class="new">
										<image src="/static/images/kbrick/diamond.png"></image>
										<span>{{item.auction_price}}</span>
									</view>
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

		</block>


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

				<view class="mode-switch">
					<!-- <image src="/static/images/new-index/wxz.png"></image>
					<view>(Bonus for 10K diamonds)</view> -->
				</view>

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

	</view>
</template>

<script>
	import address from '@/utils/malaysiaRegion.js';
	import jsencrypt from '@/common/jsencrypt-Rsa/jsencrypt/jsencrypt.vue';
	import apiObj from '../../http/api';
	import Mywaterfall from '@/components/Mywaterfall.vue';
	import More from '@/pages/auction/more.vue'
	//公钥.
	const publiukey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCSjs8JJr/Nyb+nOG77agUDf7uT
c+kswdVEXbU8v5EL98brAw7fu4dQc1vkh1KSXqiC9EC7YmJzkkFoXUzTH2pvvDlq
UuCwtdmXOsq/b1JWKyEXzQlPIiwdHnAUjGbmHOEMAY3jKEy2dY2I6J+giJqo8B2H
NoR+zv3KaEmPSHtooQIDAQAB
-----END PUBLIC KEY-----`
	export default {
		components: {
			Mywaterfall,
			More
		},
		data() {
			return {
				kdiamondSelect: false,
				showRmToKdiamond: false,
				addressInfo: {},
				isBottoming: false,
				switch_id: 0,
				id: 2, //决定当前页面展示那个竞拍数据
				title: 'Ongoing', //标题显示
				selectId: 1, //不同的显示形式
				productId: 0,
				balanceOrOther: 0,
				selectProductsId: 0,
				isShowAegin: true,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				navList: [{
					id: 1,
					title: this.$t('auction.pdsy')
				}, {
					id: 2,
					title: this.$t('auction.zxinjp')
				}, {
					id: 3,
					title: this.$t('auction.jjks')
				}, {
					id: 4,
					title: this.$t('auction.lsjz')
				}, {
					id: 5,
					title: this.$t('auction.xyzx')
				}, ], // 头部分类列表
				navId: 3, // 头部id
				banner: [], // 轮播图
				FirstList: [], // 1级分类
				page: 1, // 页码
				pagenum: 10, // 每页显示商品数目
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
				}, {
					id: 3,
					title: '组合支付(余额+赠送金额)',
					isShow: false
				}],
				pay_pwd: '', // 支付密码
				money: '', // 总金额
				balance: '', //k钻余额
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
				productList: [],
				productInfoId: 0,
				jinPaiTimer: ''
			}
		},
		watch: {
			keyword: {
				handler(e, m) {
					if (this.navId == 1) {
						this.pagenum = 5
					} else [
						this.pagenum = 10
					]
					this.date_start = ''
					this.page = 1
					// this.navId = id
					this.newsjpId = 1
					this.jijiangId = 1
					this.lishiId = 1
					this.jingpaiList = []
					this.newsjingpaiList = []
					this.historyList = []
					this.LuckyList = []
					this.onAuctionNewGoods()
					this.onAuctionNotbeginGoods()
					this.onAuctionHistoryGoods()
					this.onAuctionLuckyList()
				}
			},
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
		onShow() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			})
			this.scrollToTop = 0
			this.switch_id = 0
			this.isShopCont = uni.getStorageSync('locale') == 'en' ? true : false
			this.cancelText = uni.getStorageSync('locale') == 'en' ? 'cancel' : '取消'
			this.confirmText = uni.getStorageSync('locale') == 'en' ? 'confirm' : '确认'
			this.page = 1
			this.newsjpId = 1
			this.jijiangId = 1
			this.lishiId = 1
			this.jingpaiList = []
			this.newsjingpaiList = []
			this.historyList = []
			this.LuckyList = []
			this.keyword = ''
			this.date_start = ''
			this.navId = 3

			// 轮播图
			this.$http.post(this.$apiObj.AuctionBanner).then(res => {
				if (res.code == 1) {
					this.banner = res.data
				}
			})
			// 一级分类
			this.$http.post(this.$apiObj.IndexFirstCate).then(res => {
				if (res.code == 1) {
					if (this.isShopCont) {
						res.data.map(item => {
							item.name = this.getCaption(item.name, 1) ? this.getCaption(item.name, 1) :
								item.name
						})
					} else {
						res.data.map(item => {
							item.name = this.getCaption(item.name, 0) ? this.getCaption(item.name, 0) :
								item.name
						})
					}
					this.FirstList = res.data
				}
			})

			if (uni.getStorageSync('token')) {
				this.isLogin = true
			}
			this.id = 2
			this.title = this.$t('new.jjks')

			this.getProductOrJinpai()

			this.showJinpaiData()
		},
		onHide() {
			this.selectProductsId = 0
		},
		onLoad() {
			let systemInfo = uni.getSystemInfoSync();
			this.systemLocale = systemInfo.language;
			this.applicationLocale = uni.getLocale();
			this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
			uni.onLocaleChange((e) => {
				this.applicationLocale = e.locale;
			})
		},
		beforeDestroy() {

		},
		methods: {
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
			},
			//获取当前展示普通商品还是竞拍商品
			getProductOrJinpai() {
				//如果有值说明是从首页点击更多进入
				let product = uni.getStorageSync('productId')
				if (product == 1) {
					this.switch_id = uni.getStorageSync('switch_id') || 0
					this.productId = 1
					this.getAllProducts(this.switch_id)
					return
				} else if (product == 2) {
					this.productId = 2
					// 最新竞拍
					this.onAuctionNewGoods()
					// 最新竞拍
					this.onAuctionNotbeginGoods()
					// 历史竞拍
					this.onAuctionHistoryGoods()

					//记住当前竞拍选择的品类
					let id = uni.getStorageSync('jinpaiId')
					if (id) {
						this.id = id
						this.switchJinpai(id)
					}
					return
				}

				this.$http.post(this.$apiObj.IndexSetting, {
					fields: 'whether_to_enable_ordinary_mall'
				}).then(res => {
					//如果开启了普通商品，当前页面展示普通商品，否则展示竞拍商品数据
					if (res.data.whether_to_enable_ordinary_mall == 1) {
						this.productId = 1
						this.getAllProducts(0)
					} else {
						this.productId = 2
						// 最新竞拍
						this.onAuctionNewGoods()
						// 最新竞拍
						this.onAuctionNotbeginGoods()
						// 历史竞拍
						this.onAuctionHistoryGoods()
					}
					let id = uni.getStorageSync('jinpaiId')
					if (id) {
						this.id = id
						this.switchJinpai(id)
						uni.removeStorageSync('jinpaiId')
					}
				})
			},

			//数据切换
			switchJinpai(id) {
				this.id = id
				this.selectId = 1
				uni.setStorageSync('productId', 2)
				if (this.id == 1) {
					this.title = this.$t('new.zzjp')
					uni.setStorageSync('jinpaiId', 1) //更新当前选择的竞拍id
					this.onAuctionNewGoods()
				} else if (this.id == 2) {
					this.title = this.$t('new.jjks')
					uni.setStorageSync('jinpaiId', 2) //更新当前选择的竞拍id
					this.onAuctionNotbeginGoods()
				} else {
					this.title = this.$t('new.lsjl')
					uni.setStorageSync('jinpaiId', 3) //更新当前选择的竞拍id
					this.onAuctionHistoryGoods()
				}
			},

			switchSelection() {
				this.$on.switchSelection()
			},
			toProductInfo(id) {
				uni.setStorageSync('productInfo', false)
				uni.navigateTo({
					url: '/pages/auction/product_info?goodsId=' + id
				})
			},
			//切换选择分类
			switchSelect(id) {
				this.switch_id = id
				uni.setStorageSync('switch_id', id)
				this.page = 1
				this.getAllProducts(id)
			},
			//获取首页数据
			getAllProducts(id) {
				this.productInfoId = id
				this.$http.post(this.$apiObj.LitestoregoodsIndex, {
					page: this.page,
					pagenum: this.pagenum,
					category_id: id == 0 ? '' : id
				}).then(res => {
					if (res.code == 1) {
						this.totalPageNum = res.data.total
						res.data.data.forEach(item => {
							item.litestore_tag.forEach(data => {
								let arr = data.name.split("|")
								if (!this.isShopCont) data.name = arr[0]
								else data.name = arr[1]
							})
						})
						this.productList = this.page == 1 ? res.data.data : [...this.productList, ...res.data
							.data
						];
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
				location.reload()
			},
			// 选择日期时间
			handleSelectDateTime() {
				this.$refs.dateTimePopup.open()
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
			onopenClick() {
				this.$refs.dateTimePopup.open()
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
				if (id == 2) {
					uni.switchTab({
						url: '/pages/auction/auction'
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
						if (this.isShopCont) {
							res.data.data.map(item => {
								item.goods_mark = this.getCaption(item.goods_mark, 1) ? this.getCaption(
									item.goods_mark, 1) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(
									item.goods_name, 1) : item.goods_name
							})
						} else {
							res.data.data.map(item => {
								item.goods_mark = this.getCaption(item.goods_mark, 0) ? this.getCaption(
									item.goods_mark, 0) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(
									item.goods_name, 0) : item.goods_name
							})
						}
						res.data.data.map(item => {
							item.remain_time = item.remain_time * 1000
						})
						this.totalPageNum = res.data.total
						this.jingpaiList = this.page == 1 ? res.data.data : [...this.jingpaiList, ...res.data.data]

						if (this.id == 1) this.productList = this.jingpaiList

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
						if (this.isShopCont) {
							res.data.data.map(item => {
								item.tags.map(items => {
									items.name = this.getCaption(items.name, 1) ? this.getCaption(
										items.name, 1) : items.name
								})
								item.goods_mark = this.getCaption(item.goods_mark, 1) ? this.getCaption(
									item.goods_mark, 1) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(
									item.goods_name, 1) : item.goods_name
							})
						} else {
							res.data.data.map(item => {
								item.tags.map(items => {
									items.name = this.getCaption(items.name, 0) ? this.getCaption(
										items.name, 0) : items.name
								})
								item.goods_mark = this.getCaption(item.goods_mark, 0) ? this.getCaption(
									item.goods_mark, 0) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(
									item.goods_name, 0) : item.goods_name
							})
						}
						res.data.data.map(item => {
							let time = (item.start_time - Date.parse(new Date()) / 1000) *
								1000
							this.$set(item, 'datetime', time)
						})
						this.totalPageNum = res.data.total
						this.newsjingpaiList = this.page == 1 ? res.data.data : [...this.newsjingpaiList, ...res
							.data.data
						]
						if (this.id == 2) this.productList = this.newsjingpaiList
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
						if (this.isShopCont) {
							res.data.data.map(item => {
								item.goods_mark = this.getCaption(item.goods_mark, 1) ? this.getCaption(
									item.goods_mark, 1) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(
									item.goods_name, 1) : item.goods_name
							})
						} else {
							res.data.data.map(item => {
								item.goods_mark = this.getCaption(item.goods_mark, 0) ? this.getCaption(
									item.goods_mark, 0) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(
									item.goods_name, 0) : item.goods_name
							})
						}
						res.data.data.map(item => {
							item.continue_time = this.daojishi(item.continue_time)
						})
						this.totalPageNum = res.data.total
						this.historyList = this.page == 1 ? res.data.data : [...this.historyList, ...res.data
							.data
						]
						if (this.id == 3) this.productList = this.historyList

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
								item.goods_mark = this.getCaption(item.goods_mark, 1) ? this.getCaption(
									item.goods_mark, 1) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 1) ? this.getCaption(
									item.goods_name, 1) : item.goods_name
							})
						} else {
							res.data.data.map(item => {
								item.goods_mark = this.getCaption(item.goods_mark, 0) ? this.getCaption(
									item.goods_mark, 0) : item.goods_mark
								item.goods_name = this.getCaption(item.goods_name, 0) ? this.getCaption(
									item.goods_name, 0) : item.goods_name
							})
						}
						// res.data.data.map(item => {
						// item.continue_time = this.daojishi(item.continue_time)
						this.totalPageNum = res.data.total
						this.LuckyList = this.page == 1 ? res.data.data : [...this.LuckyList, ...res.data.data]
						// })
					}
				})
			},
			// 点赞|取消点赞幸运之星记录
			onAuctionFocusLucky(id) {
				this.$http.post(this.$apiObj.AuctionFocusLucky, {
					lucky_id: id
				}).then(res => {
					if (res.code == 1) {
						this.page = 1
						this.LuckyList = []
						this.onAuctionLuckyList()
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
				return d + this.$t('auction.day') + h + this.$t('auction.shi') + m + this.$t('auction.fen') + s + this.$t(
					'auction.miao')
			},
			onChange(e) {
				this.timeData = e
			},
			// 点击竞拍列表
			onJingPai(item) {
				uni.setStorageSync('productInfo', true)
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
						this.money = res.data.recharge_money_balance
						this.balance = res.data.k_diamond_wallet
						// this.auction_num = res.data.auction_num
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
				if (this.shopCont.auction_type == 1) {
					if (Number(this.isauctionNum) > Number(this.shopCont.total_least_num)) return uni.showToast({
						icon: 'none',
						title: this.$t('auction.detail.title') + '：' + this.shopCont.total_least_num
					})
				}
				if (Number(this.isauctionNum) > Number(this.isauctionNum)) return uni.showToast({
					icon: 'none',
					title: this.$t('user.auctionM.qtxdcsbndysy')
				})
				this.shopNum = this.shopCont.auction_price * Number(this.isauctionNum)
				this.$refs.pwdPopup.close()
				this.$refs.pwdPopup2.open()
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
					this.balanceOrOther = 2
					this.$refs.pwdsPopup.open()

					/**
					// 3方支付
					this.$http.post(this.$apiObj.AuctionorderReferOrder, {
						auction_type: 2, // 1竞拍商品原价购买，2参与竞拍价购买
						num: 1, // 购买数量
						coupon_id: '', // 优惠券id
						address_id: '', // 地址id
						remark: '', // 备注
						money: this.shopCont.auction_price, // 总金额
						auction_goods_id: this.shopCont.id, // 竞拍商品id
					}).then(res => {
						if (res.code == 1) {
							this.$http.post(this.$apiObj.MineInfo, {
								auction_goods_id: this.shopCont.auction_goods_id
							}).then(res => {
								if (res.code == 1) {
									this.money = res.data.money
									this.auction_num = res.data.auction_num
								}
							})
							this.$http.post(this.$apiObj.AuctionorderMalaysiaPay, {
								order_no: res.data.order_no,
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
					})**/
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
					is_use_invite: 2,
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
							console.log(this.shopCont)
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
			}
		},
		// 页面滑动到底部
		onReachBottom() {
			// 判断是否还有数据
			// 最新竞拍
			// this.$bus.$emit('onReachBottom', this.selectProductsId)
			if (this.page * this.pagenum >= this.totalPageNum) return

			if (this.productId == 1) {
				this.page++
				this.getAllProducts(this.productInfoId)
			} else {
				this.page++
				if (this.id == 1) this.onAuctionNewGoods()
				else if (this.id == 2) this.onAuctionNotbeginGoods()
				else this.onAuctionHistoryGoods()
			}
		}
	}
</script>
<style>
	page {
		background: #f9f9f9;
	}
</style>
<style lang="less" scoped>
	/deep/.uni-progress-inner-bar {
		border-radius: 6rpx !important;
	}

	/deep/.uni-progress-bar {
		border-radius: 6rpx !important;
	}

	.auct-page {

		.more-head {
			position: relative;
			width: 100%;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;

			.head-input {
				position: relative;
				width: 510rpx;
				height: 64rpx;
				display: flex;
				align-items: center;
				background: #fff;
				border-radius: 64rpx;
				margin-left: 32rpx;

				.auth {
					width: 52rpx;
					height: 52rpx;
					border-radius: 50%;
					margin: 0 8rpx 0 6rpx;
				}

				.logo {
					width: 28rpx;
					height: 28rpx;
				}

				.head-input-tit {
					max-width: 300rpx;
					font-size: 20rpx;
					color: rgb(102, 102, 102);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-left: 8rpx;
				}

				.head-input-time {
					position: absolute;
					right: 24rpx;
					font-size: 20rpx;
					color: rgb(102, 102, 102);
				}
			}

			.right-btn {
				position: absolute;
				right: 24rpx;
				width: 160rpx;
				height: 64rpx;
				font-size: 20rpx;
				font-weight: bold;
				color: rgb(255, 57, 57);
				display: flex;
				align-items: center;
				justify-content: center;
				background: rgb(255, 255, 255);
				border-radius: 64rpx;

				image {
					width: 24rpx;
					height: 24rpx;
					margin-right: 6rpx;
				}

			}

		}

		.product-head {
			position: relative;
			width: 750rpx;
			height: 88rpx;
			padding-top: 88rpx;
			display: flex;
			align-items: center;
			background: rgb(10, 198, 142);

			view {
				width: 100%;
				font-size: 32rpx;
				font-weight: bold;
				color: rgb(255, 255, 255);
				text-align: center;
			}

			.lange {
				position: absolute;
				right: 108rpx;
				width: 44rpx;
				height: 44rpx;
				z-index: 5;
			}

			.auth {
				position: absolute;
				right: 32rpx;
				width: 44rpx;
				height: 44rpx;
				z-index: 5;
			}

		}

		//一级分类图标
		.switch-logo {
			position: relative;
			width: 100%;
			height: 216rpx;
			background: #fff;
			display: flex;
			align-items: center;
			margin-top: 20rpx;

			.switch-line {
				height: 52rpx;
				border-right: 4rpx solid rgb(10, 198, 142);
				margin-top: -50rpx;
			}

			.switch-logo-info {
				display: inline-block;
				width: 120rpx;
				text-align: center;
				margin: 0 32rpx;

				image {
					width: 88rpx;
					height: 88rpx;
				}

				view {
					width: 120rpx;
					height: 54rpx;
					font-size: 20rpx;
					color: rgb(51, 51, 51);
					text-align: center;
					// word-break: break-all;
					overflow: hidden;
					white-space: normal;
				}

			}

			.sl-line {
				width: 36rpx;
				height: 6rpx;
				background: #E8E8E8;
				position: absolute;
				left: 50%;
				bottom: 20rpx;
				transform: translate(-50%, 0);
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

					image {
						width: 88rpx;
					}

					p {
						width: 100%;
						margin-top: 12rpx;
						color: rgb(51, 51, 51);
						font-size: 20rpx;
						word-break: break-all;
						word-wrap: break-word;
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
				position: relative;
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

				.item-historical {
					position: relative;
					width: 206rpx;
					height: 272rpx;
					margin: 0 16rpx;

					.item-historical-info {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 206rpx;
						height: 206rpx;
						border-radius: 16rpx;

						image {
							width: 206rpx;
							height: 206rpx;
							border-radius: 16rpx;
						}

						view {
							position: absolute;
							bottom: 0;
							width: 206rpx;
							height: 48rpx;
							line-height: 48rpx;
							font-size: 18rpx;
							color: rgb(255, 255, 255);
							text-align: center;
							background: rgba(0, 0, 0, 0.4);
							border-radius: 0 0 16rpx 16rpx;
						}
					}

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

				//历史商品状态
				.item-status1 {
					position: absolute;
					top: 0;
					right: 0;
					width: 120rpx;
					height: 120rpx;
					background: url('/static/images/new-index/status2.png') no-repeat;
					background-size: 120rpx 120rpx;

					view {
						position: absolute;
						top: 28%;
						left: 33%;
						font-size: 24rpx;
						color: #fff;
						transform: rotate(45deg);
					}

				}

				.item-status2 {
					position: absolute;
					top: 0;
					right: 0;
					width: 120rpx;
					height: 120rpx;
					background: url('/static/images/new-index/status3.png') no-repeat;
					background-size: 120rpx 120rpx;

					view {
						position: absolute;
						top: 28%;
						left: 33%;
						font-size: 24rpx;
						color: #fff;
						transform: rotate(45deg);
					}
				}

				//历史商品展示
				.item-historical-des {
					position: relative;
					width: 412rpx;
					height: 100%;

					.des-tit {
						position: absolute;
						top: 24rpx;
						width: 366rpx;
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

					.des-center {
						position: absolute;
						top: 112rpx;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.des-center-price {
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

						.des-center-num {
							font-size: 16rpx;
							color: rgb(153, 153, 153);
						}
					}

					.des-btm {
						position: absolute;
						bottom: 24rpx;
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.left {
							display: flex;
							align-items: center;

							image {
								width: 32rpx;
								height: 32rpx;
								border-radius: 50%;
							}

							.left-name {
								font-size: 20rpx;
								color: rgb(51, 51, 51);
								margin-left: 8rpx;
							}
						}

						.right {
							font-size: 16rpx;
							color: rgb(153, 153, 153);
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

		.head-img {
			width: 750rpx;
			height: 560rpx;
			background: url('/static/images/new-index/head-img1.png') no-repeat;
			background-size: 750rpx 560rpx;
		}

		.gwc {
			position: fixed;
			right: 32rpx;
			bottom: 200rpx;
			width: 92rpx;
			height: 92rpx;
			z-index: 100;
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


		//新的头部
		.head-list {
			width: 100%;
			height: 130rpx;
			font-size: 16rpx;
			color: rgb(148, 148, 148);
			display: flex;
			align-items: center;
			margin-top: 30rpx;

			.head-left {
				width: 170rpx;
				text-align: center;

				image {
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
				}
			}

			.select-product {
				font-size: 20rpx;
				font-weight: 700;
				color: rgb(255, 78, 47);

				image {
					width: 80rpx;
					height: 80rpx;
				}
			}

			.head-line {
				height: 60rpx;
				border-left: 1rpx solid rgb(190, 190, 190);
			}

			.head-right-img {
				display: block;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				margin: 30rpx auto 0 auto;
			}

			.head-right {
				width: 568rpx;
				margin-left: 10rpx;

				.head-right-item {
					width: 156rpx;
					height: 130rpx;
					display: inline-block;
					text-align: center;

					.select-img {
						display: block;
						width: 80rpx;
						height: 80rpx;
					}

					.t {
						width: 100%;
						height: 70rpx;
						overflow: hidden;
						white-space: normal;

					}
				}
			}
		}

		//头部列表
		.banner-list {
			width: 750rpx;
			height: 170rpx;
			padding-top: 20rpx;
			background: #fff;


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

		//商品列表
		.products-list {
			width: 670rpx;

			// column-count: 2;
			display: flex;
			flex-wrap: wrap;
			// align-items: flex-start;
			justify-content: space-between;
			margin-top: 40rpx;
			margin-left: 40rpx;

			.products-item {
				width: 320rpx;
				// flex-grow: 1;
				// display: flex;
				// flex-direction: column;
				// break-inside: avoid;
				// height: 100%;
				padding-bottom: 10rpx;
				background: #fff;
				border-radius: 16rpx;
				box-shadow: 0px 4rpx 14rpx rgba(190, 190, 190, 0.3);
				margin: 0 0 30rpx 0;

				image {
					// display: block;
					width: 320rpx;
					height: 320rpx;
					border-radius: 16rpx 16rpx 0 0;
				}

				.products-item-name {
					width: 300rpx;
					font-size: 20rpx;
					color: rgb(44, 44, 44);
					margin: 10rpx auto;
					word-break: break-all;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.products-item-tags {
					width: 300rpx;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					margin: 10rpx auto;

					view {
						font-size: 16rpx;
						padding: 6rpx 10rpx;
						border-radius: 6rpx;
						margin-right: 10rpx;
						margin-bottom: 10rpx;
					}

					.lan {
						color: rgb(0, 169, 255);
						background: rgba(93, 191, 254, 0.3);
					}

					.red {
						color: rgb(255, 0, 0);
						background: rgba(255, 198, 188, 0.5);
					}

					.chen {
						color: rgb(255, 78, 47);
						background: rgba(255, 221, 175, 0.5);
					}

				}

				.products-item-price {
					font-size: 24rpx;
					color: rgb(255, 78, 47);
					margin-left: 10rpx;

					span {
						font-size: 32rpx;
					}
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
			right: 60rpx;
			z-index: 20;

			image {
				position: absolute;
				width: 36rpx;
				height: 36rpx;
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

		.jingpai-pop {
			width: 686rpx;
			background: #ffffff;
			border-radius: 20rpx;
			padding: 45rpx 0;
			// border: 4rpx solid rgb(10, 198, 142);

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

		.jingpai-ok {
			position: relative;

			.kct {
				width: 640rpx;
				height: 420rpx;
				display: block;
				margin: 0 auto -60rpx auto;
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


		//竞拍中
		.jping {
			width: 710rpx;
			height: 280rpx;
			display: flex;
			align-items: center;
			background: #fff;
			border-radius: 16rpx;
			margin: 20rpx auto 30rpx auto;

			.jping-left {
				position: relative;
				width: 280rpx;
				height: 280rpx;
				box-sizing: border-box;
				border: 4rpx solid rgb(255, 78, 47);
				border-radius: 16rpx;

				image {
					width: 272rpx;
					height: 272rpx;
					border-radius: 12rpx;
				}

				.jping-left-q {
					position: absolute;
					left: 0;
					bottom: -4rpx;
					width: 272rpx;
					height: 70rpx;
					line-height: 70rpx;
					font-size: 28rpx;
					color: rgb(255, 255, 255);
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					background: rgba(255, 78, 47, 0.3);
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
				width: 388rpx;
				height: 100%;
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
						width: 360rpx;
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
					top: 134rpx;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;

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
					margin-top: 10rpx;

					.jping-jd-name {
						// width: 150rpx;
						// overflow: hidden;
						// text-overflow: ellipsis;
						// white-space: nowrap;
					}

					.jping-jd-data {
						width: 300rpx;
						margin-right: 20rpx;
					}
				}
			}
		}

		.auct-head {
			position: relative;
			width: 100%;
			display: flex;
			align-items: center;
			background: #FF4E2F;
			// background: linear-gradient(90deg, #9a3064 0%, #59499b 100%);
			padding: 80rpx 0rpx 15rpx 0rpx;

			.logo {
				width: 60rpx;
				height: 60rpx;
				margin-left: 40rpx;
			}

			.auth {
				width: 50rpx;
				height: 50rpx;
				margin-left: 40rpx;
			}

			.hedaer-langes {
				width: 360rpx;
				height: 40rpx;
				margin-left: 16rpx;
			}

			.hedaer-langes1 {
				width: 360rpx;
				height: 54rpx;
				margin-left: 16rpx;
			}

			.lange {
				width: 50rpx;
				height: 50rpx;
				margin-left: 30rpx;
			}

			.header-login {
				font-size: 24rpx;
				color: #fff;
				margin-left: 30rpx;
			}

			.head-search {
				height: 70rpx;
				background: #ffffff;
				border-radius: 35rpx;
				display: flex;
				align-items: center;
				padding: 0 26rpx;
				// margin-left: 40rpx;

				.icon {
					width: 33rpx;
					height: 34rpx;
					min-width: 23rpx;
					margin-right: 15rpx;
				}

				.c {
					font-size: 26rpx;
					color: #999;
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

		.auct-banner {
			.banner-img {
				height: 270rpx;
			}

			/deep/ uni-swiper {
				height: 270rpx;
			}

			/deep/ uni-swiper .uni-swiper-dot {
				width: 10rpx;
				height: 10rpx;
			}

			/deep/ uni-swiper .uni-swiper-dot.uni-swiper-dot-active {
				width: 30rpx;
				height: 10rpx;
				background: #ffffff;
				border-radius: 5rpx;
			}
		}

		.auct-class {
			background: #fff;
			padding: 30rpx;
			display: flex;
			flex-wrap: wrap;

			.li {
				width: 20%;
				margin-bottom: 40rpx;
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
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx 20rpx;

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
			background: #fff;

			// padding: 10rpx 0rpx 0rpx 0rpx;
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

				.luck-li {
					padding: 30rpx 0;
					border-bottom: 1px solid #f5f5f5;

					.cent {
						display: flex;

						.li-img {
							width: 80rpx;
							height: 80rpx;
							overflow: hidden;
							border-radius: 100%;
							min-width: 80rpx;
							margin-right: 20rpx;
						}

						.li-txt {
							flex: 1;

							.li-h {
								display: flex;
								align-items: center;
								justify-content: space-between;

								.h-fl {
									display: flex;
									align-items: center;

									.name {
										font-size: 28rpx;
										font-weight: 550;
									}

									.vip {
										height: 25rpx;
										background: #000000;
										padding: 0 10rpx;
										font-size: 22rpx;
										color: #ffc263;
										margin-left: 10rpx;
										line-height: 25rpx;
									}
								}

								.h-c {
									font-size: 24rpx;
									color: #999;
								}
							}

							.li-c {
								margin: 15rpx 0;
								font-size: 24rpx;
								line-height: 36rpx;
							}

							.li-date {
								font-size: 22rpx;
								color: #999;
							}
						}
					}

					.bottom {
						margin-top: 25rpx;
						display: flex;
						justify-content: space-between;

						.right {
							display: flex;
							align-items: center;

							.lis {
								display: flex;
								align-items: center;
								margin-left: 45rpx;

								image {
									width: 30rpx;
									height: 30rpx;
									margin-right: 13rpx;
								}
							}
						}
					}
				}

				.luck-li:nth-last-child(1) {
					border: none;
				}
			}
		}
	}

	/deep/.u-count-down__text {
		color: rgb(248, 155, 0) !important;
		font-size: 20rpx !important;
	}

	.zxjpCont {
		background: #fff;
		display: flex;
		padding: 40rpx 20rpx 10rpx;

		.li {
			width: auto;
			height: 45rpx;
			line-height: 45rpx;
			background: #f5f5f5;
			border-radius: 23rpx;
			font-size: 24rpx;
			color: #000;
			margin-right: 20rpx;
			padding: 0 18rpx;

			&:nth-child(5) {
				margin-right: 0;
			}

			&.active {
				background: rgb(255, 78, 47);
				color: #fff;
			}
		}
	}

	.jingpai-pop {
		width: 660rpx;
		background: #ffffff;
		border-radius: 20rpx;
		padding: 45rpx 40rpx;

		.title {
			font-size: 32rpx;
			color: #000;
			font-weight: bold;
		}

		.txt {
			margin-top: 25rpx;
			font-size: 28rpx;
			color: rgb(255, 78, 47);
		}

		.cent {
			margin-top: 42rpx;
			display: flex;
			align-items: center;

			.imgs {
				width: 26rpx;
				height: 26rpx;
			}

			.txt1 {
				font-size: 24rpx;
				color: #999;
				margin: 0 10rpx;
			}

			.txt2 {
				font-size: 24rpx;
				color: #000;
			}
		}

		.cont {
			margin-top: 50rpx;
			display: flex;
			justify-content: space-between;

			.right {
				display: flex;

				.name {
					font-size: 32rpx;
					color: #999;
					margin-right: 97rpx;
				}

				.ljfx {
					font-size: 32rpx;
					color: rgb(255, 78, 47);
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
		padding-top: 88rpx;
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
			background: rgb(255, 78, 47);
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
			color: rgb(255, 78, 47);
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
					color: rgb(255, 78, 47);
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