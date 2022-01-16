<template>
	<view class="content" v-if="artitleData">
		<view class="title">
			{{artitleData.title}}
		</view>
		<view class="author">
			<image :src="artitleData.aut_photo" mode=""></image>
			<view class="info">
				<text>{{artitleData.aut_name}}</text>
				<text>{{artitleData.pubdate | format }}</text>
			</view>
			<view :class="{btn:true,checked:isFollow=='已关注'}" @click="followHandle">{{isFollow}}</view>
		</view>
		<view class="container">
			<MDParserHighlight :resource="artitleData.content"></MDParserHighlight>
		</view>
		<view class="end">
			<view :class="{btn:true,checked:isgood=='已点赞'}" @click="followHandle">
				<uni-icons type="hand-up"></uni-icons>{{isgood}}
			</view>
		</view>
		<view class="comment">
			<text style="font-size: 42rpx">评论({{artitleData.comm_count}})</text>
			<CommentInfo isParent="true" isCount="10" :commentator="artitleData.commentator" :art_id="artitleData.art_id"
				v-if="artitleData"></CommentInfo>
		</view>
	</view>
</template>

<script>
	import MDParserHighlight from '../../components/cmder-MDParserHighlight/index.vue'
	export default {
		name: "DetailContent",
		props: ["artitleData"],
		filters: {
			format(val) {
				return Math.ceil((new Date(val) - Date.now()) * (-1) / 24 / 60 / 60 / 1000) + "天前"
			}
		},
		components: {
			MDParserHighlight
		},
		data() {
			return {
				isFollow: "关注",
				isgood: "点赞"
			};
		},
		mounted() {
			this.getuserState();
		},
		methods: {
			getuserState() {
				uni.getStorage({
					key: "token",
					success: async (res) => {
						const acid = await res.data;
						uniCloud.callFunction({
							name: "getMineRes",
							data: {
								"acid":acid
							},
							success: (res) => {
								const isf =  res.result.data.data[0].followArt_id;
								console.log(this.artitleData);
								setTimeout(()=>{
									uni.hideLoading();
									if(isf.indexOf(this.artitleData.art_id)!=-1){
										this.isgood = "已点赞";
									}else{
										this.isgood = "点赞";
									}
								},1000)
							}
						})
					},
				})
			},
			followHandle() {
				uni.showLoading({
					title:"加载中"
				})
				uni.getStorage({
					key: "token",
					success: async (res) => {
						const acid = await res.data;
						uniCloud.callFunction({
							name: "changeUserInfo",
							data: {
								"art_id": this.artitleData.art_id,
								"acid": acid
							},
							success: (res) => {
								console.log(res);
								this.getuserState();
							},
						})
					},
					fail() {
						uni.navigateTo({
							url:"../../pages/login/login"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		position: fixed;
		top: 88rpx;
		bottom: 90rpx;
		left: 0;
		right: 0;
		padding: 40rpx 20rpx;
		box-sizing: border-box;
		overflow-x: hidden;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;

		.end {
			width: 100%;
			height: 200rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-top: 1px solid #ccc;
			margin-top: 40rpx;
			position: relative;
			.checked{
				background-color: $base-color;
				color: #fff !important;
			}
			&::after {
				position: absolute;
				left: calc(50% - 40rpx);
				top: -20rpx;
				background-color: #fff;
				padding: 0rpx 20rpx;
				content: "End";
				color: #ccc;
			}

			>.btn {
				width: 140rpx;
				height: 60rpx;
				border: 1px solid $base-color;
				border-radius: 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 24rpx;
				margin: 60rpx 0rpx;
			}
		}

		.container {
			margin-top: 40rpx;
		}

		.title {
			font-size: 32rpx;
			color: black;
			font-weight: bold;
			width: 100%;
		}

		.author {
			width: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-top: 40rpx;
			border-bottom: 1rpx solid #ebedf0;
			padding-bottom: 40rpx;
			.checked{
				background-color: $base-color;
				color: #fff !important;
			}
			image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				margin-right: 20rpx;
				flex-shrink: 0;
			}

			.info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding: 14rpx 0rpx;
				box-sizing: border-box;
				width: 100%;
				margin-right: 20rpx;
				color: $font-color;

				text {
					font-size: 28rpx;

					&:nth-child(2) {
						font-size: 24rpx;
						color: #ccc;
					}
				}
			}

			.btn {
				height: 44rpx;
				width: 140rpx;
				border: 1px solid $base-color;
				border-radius: 4rpx;
				font-size: 24rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: $base-color;
			}
		}
	}
</style>
