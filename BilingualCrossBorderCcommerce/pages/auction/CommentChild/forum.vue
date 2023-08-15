<template>
     <view class="u-page" catchtouchmove="false" >
         <view class="mp-header">
			<view style="height: 88rpx;"></view>
			<view class="mp-header-box">
				<view class="box-back" @click="onBack">
					<image src="@/static/images/mine/collect_icon_back.png" mode="widthFix"></image>
				</view>
				<view class="box-title">{{$t('top.luckyforum')}}</view>
				<view class="box-clear" @click="onShareClick">
					<image src="@/static/images/mine/msg_btn_clear.png" mode="widthFix"></image>
				</view>
			</view>
            <!--头部导航 start-->
			<view class="auct-nav">
				<view v-for="item in navList" :key="item.id" class="li" :class="item.id==navId?'active':''" @click="onNavClick(item.id)">
                    <u-icon :name="item.name" :color="item.id==navId?'#1DD181':'#666666'" ></u-icon>
                    {{item.title}}
                </view>
			</view>
		</view>
        <view class="u-demo-block" v-for="(luckyForumListItem,topNub) in luckyForumList" :key="topNub" >
            <view class="u-demo-block__content">
                <view class="album">
                    <!-- 左侧头像 -->
                    <view class="album__header">
                        <view class="album__right">
                            <view class="album__avatar">
                                <u-avatar :src="luckyForumListItem.user.avatar" size='40'></u-avatar>
                            </view>
                            <view style="display:flex;flex-direction: column">
                                <view class="album__nickname">
                                    <u--text :text="luckyForumListItem.user.nickname" bold size="17" class="album__text"></u--text>
                                    <view class="item-l-level">
                                        <view class="level-icon">
                                            <image src="@/static/images/mine/mine_icon_vip.webp" mode="widthFix"></image>
                                        </view>
                                        <view class="level-num">Lv.{{luckyForumListItem.user.level}}</view>
                                    </view>
                                </view>
                                <view class="album__createtime">
                                    <view class="level-num">{{luckyForumListItem.createtime}}</view>
                                </view>
                            </view>
                        </view>
                         <view class="album__left">
                            <view class="level-num">{{$filter.to_DateMonth(luckyForumListItem.createtime)}}</view>
                        </view>
                    </view>
                    <!-- 内容 -->
                    <view class="album__content">
                        <view class="start-class">
                            <u-rate active-color="#0AC68E" inactive-color="#CCCCCC" readonly minCount='1' gutter="8" size='18' :allowHalf='true' v-model="luckyForumListItem.the_star"></u-rate>
                            <span>{{luckyForumListItem.the_star}}</span>
                        </view>
                        <u--text margin="6px 2px" :text="luckyForumListItem.comment" ></u--text>
                        <view class="album__urls">
                            <image :src="item" v-for="(item,index) in luckyForumListItem.images" :key="index"></image>
                        </view>
                    </view>
                    <!-- 子级评论 -->
                    <view class="album__bottom">
                        <view class="album__bottom__btn">
                            <view class="forumComment" @click="childComment(luckyForumListItem)">
                                <image src="@/static/images/mine/forumComment.png" mode="widthFix"></image>
                                <view class="forumComment__comment">{{luckyForumListItem.luckyForumComments.length || 'Comment'}}</view>
                            </view>
                        </view>
                        <!-- <view class="album__bottom__text" v-if="luckyForumListItem.luckyForumComments.length > 0">
                            <view class="CommentsText" v-for="(CommentsItem,CommentsNub) in luckyForumListItem.luckyForumComments" :key="CommentsNub">{{CommentsItem.nickname}}:{{CommentsItem.comment}}</view>
                        </view> -->
                    </view>
                </view>
            </view>
        </view>
        <u-popup :show="popupShow" @close="close" @open="open" mode="bottom" round="20" :closeOnClickOverlay='false' :closeable='true'>
            <view class="popup-child album" >
                <view class="popup-top">
                    {{commentaryList.length || 0}} Replies
                </view>
                <view style="width: 100%;height: 50vh;overflow: overlay;">
                    <view v-for="(commentaryListItem,topNub) in commentaryList" :key="topNub" style="width: 100%;box-sizing: border-box;padding: 20px;">
                        <!-- 左侧头像 -->
                        <view class="album__header">
                            <view class="album__right">
                                <view class="album__avatar">
                                    <u-avatar :src="commentaryListItem.user.avatar" size='40'></u-avatar>
                                </view>
                                <view style="display:flex;flex-direction: column" >
                                    <view class="album__nickname">
                                        <u--text :text="commentaryListItem.user.nickname" bold size="17" class="album__text"></u--text>
                                        <view class="item-l-level">
                                            <view class="level-icon">
                                                <image src="@/static/images/mine/mine_icon_vip.webp" mode="widthFix"></image>
                                            </view>
                                            <view class="level-num">Lv.{{commentaryListItem.user.level}}</view>
                                        </view>
                                    </view>
                                    <view class="popup__createtime">
                                        <view class="level-num">{{commentaryListItem.comment}}</view>
                                    </view>
                                    <view style="color:#666666;display: flex;" @click="tocommit(commentaryListItem)">
                                        <view>{{commentaryListItem.createtime}}</view>
                                        <span style="color:#0AC68E">Reply</span>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="comment-botm">
                <view class="comment-botm-inpit">
                    <u--input :placeholder="$t('new.wxs')" border="surround" maxlength="100" v-model="comment" @confirm="sendCommentTwoInfo()"></u--input>
                </view>
                <view class="comment-num">{{comment.length}}/100</view>
            </view>
		</u-popup>
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
                id:'',
                luckyForumList:[],
                user_comment_id:'',
                comment:'',
                commentaryList:[],
                imMessageFocusBool:false,
                albumWidth: 0,
                likeNub:1,
                dyid:'',
                popupShow: false,
				navId: 1,
                navList: [{
					id: 1,
                    name:"",
					title: this.$t('newDetail.shangpin')
				}, {
                    id: 2,
                    name:"photo",
					title: this.$t('newDetail.pinglun')
				}, {
                    id: 3,
                    name:"heart",
					title: this.$t('newDetail.xianqin')
				}]
            }
		},
        computed: {
            siderClasses() {
                return this.$t('luckysharing.content')
            }
        },
        onLoad(e) {
			if (e.id) this.id = e.id;
		},
        onShow(){
            this.getComment()
        },
		methods:{
            //获取子列表
			getSelectComment(id) {
				this.$http.post(this.$apiObj.getSelectCommentList, {
					user_comment_id: id
				}).then(res => {
					if (res.code == 1) {
						this.commentaryList = res.data.data
					}
				})
			},
            //发送二级评论
			sendCommentTwoInfo() {
                const user_comment_id = this.user_comment_id
				this.$http.post(this.$apiObj.SendComment, {
					goods_id: this.id,
					comment: this.comment,
					user_comment_id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: this.$t('new.fsplcg'),
							icon:"none"
						})
						this.getSelectComment(user_comment_id)
						this.comment = ''
					}
				})
			},
            childComment({user_comment_id}){
                this.popupShow = true
                this.user_comment_id = user_comment_id
            },
            open() {
                this.getSelectComment(this.user_comment_id)
            },
            close() {
                this.popupShow = false
                this.user_comment_id = ''
            },
            onShareClick(e){
				uni.navigateTo({
					url: '/pages/auction/CommentChild/sharing?orderauctionrecordid=' + this.id
				});
            },
            updateImMessageFocusBool(newValue) {
                this.imMessageFocusBool = newValue;
            },

            async getComment() {
                const url = this.$apiObj.GoodsCommentList;
                const CommentList = this.$apiObj.auctionGoodsSharingCommentList;
                try {
                    const res = await this.$http.post(url, {
					    goods_id: this.id
                    });
                    if (res.code === 1) {
                        const commentRequests = res.data.data.map(async (i) => {
                            const commentRes = await this.$http.post(CommentList, {
                            "auction_goods_sharing_id": i.auction_goods_sharing_id
                            });
                            return commentRes.data.data;
                        });
                        const comments = await Promise.all(commentRequests);
                        this.luckyForumList = res.data.data;
                        this.luckyForumList.forEach((item, index) => {
                            if (item.images) {
                                item.images = item.images.split(',');
                            }
                            item.luckyForumComments = comments[index];
                        });
                    }
                } catch (error) {
                    // 处理请求错误
                    console.error(error);
                }
            },
            //键盘弹起
            tocommit({auction_goods_sharing_id,user_comment_id}){
                console.log('1',user_comment_id);
                this.imMessageFocusBool=true;
                this.dyid=auction_goods_sharing_id;
                this.user_comment_id = user_comment_id
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
/deep/ .u-popup__content{
    overflow: hidden;
}
/deep/ .u-popup__content__close--top-right{
    top: 25px;
}
.auct-nav {
    width: 100%;
    padding: 40rpx 0 30rpx 0;
    display: flex;
    justify-content: space-around;
    text-align: center;


    .li {
        width: 20%;
        font-size: 26rpx;
        text-align: center;
        position: relative;
        text-align: center;
        display: flex;
        justify-content:center;
        align-items: center;
    }

    .active {
        color: #1DD181;
        font-weight: 550;
    }
    // .active::after {
    //     width: 32rpx;
    //     height: 5rpx;
    //     background: #1DD181;
    //     border-radius: 3rpx;
    //     position: absolute;
    //     bottom: -10rpx;
    //     left: 50%;
    //     margin-left: -16rpx;
    //     display: block;
    //     content: "";
    // }
}
.u-page{
    background: #F8F8F8;
    .u-demo-block{
        margin: 20rpx 0;
    }
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
        margin: 8rpx 0 0 20rpx;
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
            .album__nickname{
                display: flex;
                justify-content: flex-start;
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
        .start-class{
            display: flex;
            align-items: center;
            span{
                color: rgb(10, 198, 142);
                font-size: 32rpx;
                font-weight: 500;
                text-align: left;
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
.popup-child{
    background: #fff;
    height: 60vh;
    overflow: scroll;
    padding:40rpx 0;
    .popup-top{
        width: 100%;
        height: 100rpx;
        color: rgb(51, 51, 51);
        font-size: 42rpx;
        text-align: center;
        border-bottom: 1px solid #F3F3F3;
    }
    .popup__createtime{
        color: rgb(51, 51, 51);
        font-size: 42rpx;
        text-align: left;
        text-transform: capitalize;
    }
}
.comment-botm {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 144rpx;
    display: flex;
    align-items: center;
    background: #FFF;
    box-shadow: 0px -4rpx 14rpx rgba(255, 198, 188, 0.3);

    .comment-botm-inpit {
        width: 600rpx;
        display: flex;
        align-items: center;
        margin: 0 auto;
    }
    
    .comment-num{
        width: 100rpx;
        font-size: 24rpx;
        text-align: center;
    }
}
</style>
