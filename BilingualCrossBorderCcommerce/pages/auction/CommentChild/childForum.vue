<template>
     <view class="child-page" catchtouchmove="false" >
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
                                </view>
                                <!-- 内容 -->
                                <view class="album__content">
                                    <u--text margin="6px 2px" :text="luckyForumListItem.comment" ></u--text>
                                </view>
                                <view style="color:#666666;display: flex;" @click="tocommit(luckyForumListItem)">
                                    <view style="margin-right:10px">{{luckyForumListItem.createtime}}</view>
                                    <span style="color:#0AC68E">Reply</span>
                                </view>
                            </view>
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
        props: {
			commentChild: {
				type: Object,
				default: ''
			},
		},
        components:{
            inputbox,
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
            }
		},
		mounted() {
            const {user_comment_id} = this.commentChild
            this.getSelectComment(user_comment_id)
            console.log(this.commentChild,user_comment_id);
        },
        onShow(){},
		methods:{
            //获取子列表
			getSelectComment(id) {
				this.$http.post(this.$apiObj.getSelectCommentList, {
					user_comment_id: id
				}).then(res => {
					if (res.code == 1) {
						this.luckyForumList = res.data.data
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
            updateImMessageFocusBool(newValue) {
                console.log(newValue,'11111');
                this.imMessageFocusBool = newValue;
            },

            async getComment() {
                const url = this.$apiObj.GoodsCommentList;
                const CommentList = this.$apiObj.getSelectCommentList;
                try {
                    const res = await this.$http.post(url, {
					    goods_id: this.id
                    });
                    if (res.code === 1) {
                        const commentRequests = res.data.data.map(async (i) => {
                            const commentRes = await this.$http.post(CommentList, {
                                user_comment_id: i.user_comment_id
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
            tocommit(data){
                const {auction_goods_sharing_id,user_comment_id} = data
                console.log(data,'1',user_comment_id);
                this.imMessageFocusBool=true;
                this.dyid=auction_goods_sharing_id;
                this.user_comment_id = user_comment_id
            },
            //评论
            async submit(val) {
                console.log('fasong',val);
                this.$emit('submit',val)
                // if(val!=''){
                //     let data= {"auction_goods_sharing_id":this.dyid,"comment":val}
                //     const url = this.$apiObj.commentSharing;
                //     const res = await this.$http.post(url, data);
                //     if(res.code === 1){
                //         this.getComment();
                //     }
                // }else{
                //     console.error('错误');
                // }
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
.child-page{
    background: #F5F5F5;
    border-radius: 40rpx;
    box-sizing: border-box;
    margin-left: 60rpx;
}
.album {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    margin: 20rpx 0;
    border-radius: 40rpx;
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
            margin: 12rpx 0 20rpx 40rpx;
            display: flex;
            align-items: flex-start;
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
        margin:5rpx 0rpx 0 0;
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
    .album__createtime{
        width: 100%;
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
