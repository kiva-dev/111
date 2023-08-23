<template>
	<view class="k-Introduction">
		<view class="header">
			<image src="/static/images/kbrick/kleft.png" @click="toBack()"></image>
			<view>{{$t('kIntroduction.title')}}</view>
		</view>

		<view class="listClass">
            <view v-for="(item,i) in list" class="item">
                <view class="content">
                    {{isShopCont ? item.des : item.des_cn}}
                </view>
            </view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShopCont: uni.getStorageSync('locale') == 'en' ? true : false,
				list: [{
						des: `Kolibri Mall Coin (KMC) is a cryptocurrency issued by the official Kolibri project in collaboration with globally recognized compliant cryptocurrency exchanges, aiming to welcome the Web3.0 era and reward platform users. All Kolibri users can exchange and receive KMC Coin for free.`,
						des_cn: `Kolibri Mall Coin是Kolibri官方计划为迎接Web3.0时代、奖励回馈平台用户而联合全球合规知名加密货币交易所发行的加密货币，所有Kolibri用户可免费兑换领取。`
					},
					{
						des: `A total of 8 billion KMC tokens are planned for issuance. Among them, 30% are reserved for platform operations and investor feedback, 10% for public sales to external users, and 60% for rewarding users and partners. There are two ways to acquire KMC coin: Kolibri users can exchange them for free based on their accumulated platform's points, and external users can purchase them on exchanges after being listed on the blockchain. Therefore, please take good care of your account and accumulated points.`,
						des_cn: `KMC币计划总共发行80亿枚，其中30%为平台保留用于运营及投回馈投资者，10%用于对外部用户公开销售、60%用来回馈奖励用户及合作伙伴。仅Kolibri用户根据积分免费兑换，以及上链后外部用户在交易所付费购买，两种获取方式。所以请务必珍惜您的账户，以及积分。`
					},
					{
						des: `Currently, each verified user can exchange their accumulated platfrom‘s points in their Kolibri account for KMC coin at a 1:1 ratio (this ratio may be adjusted later based on demand). Each individual can only possess one unique verified account, and users and identities that have been banned or removed cannot receive coin.`,
						des_cn: `目前，每个实名用户根据Kolibri账户中累积的共创积分免费1：1兑换（后续会根据需求进行下调），一个身份只能拥有一个唯一的实名账户，被封禁、除名的用户及身份无法领取。`
					},
					{
						des: `Disclaimer: Kolibri does not provide cryptocurrency trading platforms or functions. Before being listed on a public blockchain, KMC trading is not available, and circulation trading is prohibited. Only points can be exchanged for KMC coin for bookkeeping purposes. After being listed on a public blockchain, Kolibri will distribute coin based on users' provided cryptocurrency wallet addresses. Users can freely trade and hold KMC coin on designated and legally regulated cryptocurrency exchanges in countries such as the United States, Singapore, South Korea, Japan, Dubai, Hong Kong, and Malaysia.`,
						des_cn: `声明：Kolibri不提供加密货币交易平台及功能，未上公链之前，不开放KMC交易，禁止流通交易。仅提供积分兑换KMC记账。上公链后，Kolibri根据用户提供的加密钱包地址进行空投，用户可在美国、新加坡、韩国、日本、迪拜、香港、马来西亚等合法受监管的指定加密货币交易所自由交易、持有。`
					},
					{
						des: `We uphold and fulfill our commitment: to provide a platform that allows everyone to realize their dreams, to enable everyone to have desired goods, to increase value through consumption, and to gain additional value and wealth appreciation through our platform.`,
						des_cn: `我们遵守并兑现承诺：为每个人提供可以实现梦想的平台，让每个人都能拥有心仪的商品，让用户能在消费中增值，获得额外的价值回报，财富增值！`
					}
				]
			}
		},
		methods: {
			toBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less" scoped>
	.k-Introduction {
		width: 750rpx;
		min-height: 100vh;
		background: rgb(248, 248, 248);

		.header {
			position: relative;
			width: 750rpx;
			height: 88rpx;
			padding-top: 88rpx;
			background: #fff;
            display: flex;
            align-items: center;
			image {
				position: absolute;
				left: 32rpx;
				width: 40rpx;
				height: 40rpx;
				z-index: 5;
			}

			view {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
				color: rgb(51, 51, 51);
				text-align: center;
			}
		}

		.listClass {
			width: 750rpx;
			background: #fff;
			margin-top: 20rpx;
			padding: 0 40rpx;
    		box-sizing: border-box;
			.item {
				width: 100%;
				padding: 40rpx 0;
				display: flex;
				align-items: flex-start;
				.logo {
					width: 56rpx;
					height: 56rpx;
					line-height: 48rpx;
					font-size: 20rpx;
					color: rgb(255, 255, 255);
					text-align: center;
					background: url('/static/images/mine/faq_bj.png')no-repeat;
					background-size: 56rpx 56rpx;
					margin: 0 24rpx 0 32rpx;
				}

				.des {
					width: 600rpx;
				}

			}

		}

	}
</style>