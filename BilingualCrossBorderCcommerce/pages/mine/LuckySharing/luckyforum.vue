<template>
     <view class="u-page">
         <view class="mp-header">
			<view style="height: 88rpx;"></view>
			<view class="mp-header-box">
				<view class="box-back" @click="onBack">
					<image src="@/static/images/mine/collect_icon_back.png" mode="widthFix"></image>
				</view>
				<view class="box-title">{{$t('top.luckyforum')}}</view>
				<view class="box-clear" @click="getComment">
					<image src="@/static/images/mine/msg_btn_clear.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
        <view class="u-demo-block" v-for="(luckyForumListItem,topNub) in luckyForumList" :key="topNub">
            <view class="u-demo-block__content">
                <view class="album">
                    <view class="album__header">
                        <view class="album__right">
                            <view class="album__avatar">
                                <u-avatar :src="luckyForumListItem.avatar" size='40'></u-avatar>
                            </view>
                            <view>
                                <u--text :text="luckyForumListItem.nickname" bold size="17" class="album__text"></u--text>
                                <view class="item-l-level">
                                    <view class="level-icon">
                                        <image src="@/static/images/mine/mine_icon_vip.png" mode="widthFix"></image>
                                    </view>
                                    <view class="level-num">Lv.{{luckyForumListItem.level}}</view>
                                </view>
                            </view> 
                        </view>
                        <view class="album__left">
                            <view class="level-num">{{$filter.to_DateMonth(luckyForumListItem.createtime)}}</view>
                        </view>
                    </view>
                    <view class="album__content">
                        <u--text margin="0 0 8px 0" :text="luckyForumListItem.desc" ></u--text>
                        <view class="album__urls">
                            <image :src="item" v-for="(item,index) in luckyForumListItem.images" :key="index"></image>
                        </view>
                    </view>
                    <view class="album__bottom">
                        <view class="album__bottom__btn">
                            <view class="Like" @click="likesBtn(luckyForumListItem)">
                                <image src="@/static/images/mine/unLike.png" mode="widthFix" v-if="!luckyForumListItem.is_like"></image>
                                <image src="@/static/images/mine/Like.png" mode="widthFix" v-else></image>
                                <view class="Like-num">{{luckyForumListItem.likes || 0}}</view>
                            </view>
                            <view class="forumComment">
                                <image src="@/static/images/mine/forumComment.png" mode="widthFix"></image>
                                <view class="forumComment__comment" @click="tocommit(luckyForumListItem)">{{luckyForumListItem.luckyForumComments.length || 'Comment'}}</view>
                            </view>
                        </view>
                        <view class="album__bottom__text" v-if="luckyForumListItem.luckyForumComments.length > 0">
                            <view class="CommentsText" v-for="(CommentsItem,CommentsNub) in luckyForumListItem.luckyForumComments" :key="CommentsNub">{{CommentsItem.nickname}}:{{CommentsItem.comment}}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <inputbox v-show="imMessageFocusBool" :imMessageFocusBool="imMessageFocusBool" @updateImMessageFocusBool="updateImMessageFocusBool" @submit="submit"></inputbox>
    </view>
</template>

<script>
import inputbox from "@/components/session/input.vue";
	export default {
        components:{
            inputbox
        },
		data() {
			return {
                luckyForumList:[],
                imMessageFocusBool:false,
                albumWidth: 0,
                likeNub:1,
                dyid:'',
            }
		},
        computed: {
            siderClasses() {
                return this.$t('luckysharing.content')
            }
        },
        onShow(){

        },
		methods:{
            updateImMessageFocusBool(newValue) {
                this.imMessageFocusBool = newValue;
            },
            async getComment() {
                const url = this.$apiObj.auctionGoodsSharingList;
                const CommentList = this.$apiObj.auctionGoodsSharingCommentList;
                try {
                    const res = await this.$http.post(url, {});
                    if (res.code === 1) {
                        console.log(res);
                        const commentRequests = res.data.data.map(async (i) => {
                            const commentRes = await this.$http.post(CommentList, {
                            "auction_goods_sharing_id": i.auction_goods_sharing_id
                            });
                            return commentRes.data.data;
                        });
                        const comments = await Promise.all(commentRequests);
                        this.luckyForumList = res.data.data;
                        this.luckyForumList.forEach((item, index) => {
                            item.luckyForumComments = comments[index];
                        });
                    }
                } catch (error) {
                    // 处理请求错误
                    console.error(error);
                }
            },
            //键盘弹起
            tocommit({auction_goods_sharing_id}){
                this.imMessageFocusBool=true;
                this.dyid=auction_goods_sharing_id;
            },
            //评论
            async submit(val) {
                if(val!=''){
                    let data= {"auction_goods_sharing_id":this.dyid,"comment":val}
                    const url = this.$apiObj.commentSharing;
                    const res = await this.$http.post(url, data);
                    if(res.code === 1){
                        this.getComment();
                    }
                }else{
                    console.error('错误');
                }
            },
            // 点赞
            likesBtn({auction_goods_sharing_id,is_like}){
                let obj = {auction_goods_sharing_id,is_like}
                console.log(obj);
            },
            onBack(){
                const routeArr = getCurrentPages().map(i => i.route);
				if (routeArr.length > 1) {
					uni.navigateBack();
				} else {
					uni.switchTab({
						url: '/pages/auction/auction'
					});
				}
            }
		}

	}
</script>

<style lang="less" scoped>
.u-page{
    background: #F8F8F8;
}
.album {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 40rpx;
    margin-bottom: 20rpx;
    background: #fff;
    .item-l-level{
        width: 80rpx;
        height: 30rpx;
        margin-top: 8rpx;
        padding-right: 5rpx;
        box-sizing: border-box;
        background: rgb(253, 240, 226);
        border-radius: 100rpx;
        display: flex;
        .level-icon {
            width: 30rpx;
            height: 30rpx;
            image {
                width: 100%;
            }
        }
        .level-num {
            margin-left: 5rpx;
            color: rgb(219, 132, 37);
            font-size: 16rpx;
            line-height: 30rpx;
        }
    }
    .album__header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        .album__right,
        .album__left{
            width: 50%;
            display: flex;
            align-items: center;
        }
        .album__right{
            justify-content: flex-start;
            .album__avatar {
                margin-right: 40rpx;
                image{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .album__left{
             justify-content: flex-end;
             color: #666;
             font-size: 16px;
        }
        .album__text{
            margin: 20rpx 0;
        }
    }
    .album__content {
        margin:45rpx 0rpx 0 0;
        flex: 1;
        .album__urls{
            margin-top:40rpx;
            display: flex;
            align-items: center;
            flex-direction: row;
            flex-wrap: wrap;
            align-content: space-between;
            image{
                width: 180rpx;
                height: 180rpx !important;
                margin: 0 40rpx 40rpx 0;
                border-radius: 24rpx;
            }
        }
    }
    .album__bottom{
        // height: 80rpx;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        color: #666;
        font-size: 16px;
        .album__bottom__btn{
            display: flex;
            width: 100%;
            align-items: center;
            .Like{
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 15%;
            }
            .forumComment{
                display: flex;
                align-items: center;
                margin-left: 40rpx;
                justify-content: space-around;
                .forumComment__comment{
                    margin-left: 20rpx;
                }
            }
            image{
                width: 45rpx;
            }
        }
        .album__bottom__text{
            box-sizing: border-box;
            width: 100%;
            font-size: 30rpx;
            background: #F5F5F5;
            margin-top: 20rpx;
            padding: 30rpx;
            border-radius: 30rpx;
            .CommentsText{
                margin: 10rpx 0;
            }
        }
    }
}
.mp-header {
    width: 100%;
    background: #fff;

    .mp-header-box {
        width: 100%;
        height: 88rpx;
        padding: 0 32rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1rpx solid rgb(204, 204, 204);

        .box-back {
            width: 40rpx;
            height: 40rpx;

            image {
                width: 100%;
            }
        }

        .box-title {
            color: rgb(51, 51, 51);
            font-size: 40rpx;
        }

        .box-clear {
            width: 36rpx;
            height: 36rpx;

            image {
                width: 100%;
            }
        }
    }
}
</style>
