<template>
	<view class="mine" v-if="userInfo">
		<view class="top">
			<view class="top_top">
				<image :src="userInfo.photo" mode=""></image>
				<view>
					<text>{{userInfo.name}}</text>
					<text>申请认证</text>
				</view>
			</view>
			<view class="bottom">
				<view class="attend" @click="goCollect">
					<text>{{userInfo.collectArt_id.length}}</text>
					<text>收藏</text>
				</view>
				<view class="follow" @click="goFollow">
					<text>{{userInfo.followArt_id.length}}</text>
					<text>关注</text>
				</view>
				<view class="fans" @click="goFans">
					<text>{{userInfo.fans_count}}</text>
					<text>粉丝</text>
				</view>
			</view>
		</view>
		<view class="options">
			<view class="reset" @click="reset">
				<uni-icons type="paperclip"></uni-icons>
				<text>编辑资料</text>
				<uni-icons type="right" class="row"></uni-icons>
			</view>
			<view class="xiaosi">
				<uni-icons type="chat"></uni-icons>
				<text>小思同学</text>
				<uni-icons type="right" class="row"></uni-icons>
			</view>
			<view class="exit" @click="exit">
				<uni-icons type="info"></uni-icons>
				<text>退出登录</text>
				<uni-icons type="right" class="row"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: null
			};
		},
		onLoad() {
			this.isUser();
		},

		onShow() {
			this.isUser();
		},
		methods: {
			goCollect() {
				uni.navigateTo({
					url: "../collect/collect?info=" + this.userInfo.collectArt_id
				})
			},
			goFollow() {
				uni.navigateTo({
					url: "../follow/follow?info=" + this.userInfo.followArt_id
				})
			},
			goFans() {
				uni.navigateTo({
					url: "../fans/fans"
				})
			},
			isUser() {
				uni.showLoading({
					title: "加载中"
				})
				uni.getStorage({
					key: "token",
					success: () => {
						uni.getStorage({
							key: "token",
							success: (res) => {
								uniCloud.callFunction({
									name: "getMineRes",
									data: {
										"acid": res.data
									},
									success: async (resp) => {
										this.userInfo = await resp.result.data.data[0];
										uni.hideLoading()
									}
								})
							}
						})
					},
					fail(res) {
						uni.navigateTo({
							url: '../login/login',

						});
					}
				})
			},
			reset() {
				uni.navigateTo({
					url: "../resetUserInfo/resetUserInfo"
				})
			},
			exit() {
				uni.removeStorage({
					key: "token",
					success: () => {
						this.isUser();
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.mine {
		display: flex;
		flex-direction: column;

		.top {
			width: 100%;
			height: 400rpx;
			display: flex;
			flex-direction: column;
			background-color: $base-color;
			justify-content: space-between;
			padding: 20rpx 0rpx;
			box-sizing: border-box;

			.top_top {
				display: flex;
				padding: 0rpx 40rpx;
				padding-top: 40rpx;
				box-sizing: border-box;

				>image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
				}

				>view {
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;
					justify-content: space-between;
					padding: 16rpx 0rpx;
					box-sizing: border-box;

					>text {
						font-size: 28rpx;
						color: #fff;

						&:nth-child(2) {
							font-size: 24rpx;
							background-color: #fff;
							color: $base-color;
							border-radius: 4rpx;
							padding: 0rpx 6rpx;
							box-sizing: border-box;
						}
					}
				}
			}

			.bottom {
				width: 100%;
				display: flex;

				>view {
					flex: 1;
					display: flex;
					flex-direction: column;
					height: 180rpx;
					text-align: center;
					color: #fff;

					>text {
						flex: 1;

						&:nth-child(1) {
							display: flex;
							flex-direction: column;
							justify-content: flex-end;
						}
					}
				}
			}
		}
	}

	.options {
		width: 100%;
		padding: 0rpx 32rpx;
		box-sizing: border-box;

		>view {
			width: 100%;
			height: 48rpx;
			padding: 20rpx 0rpx;
			border-bottom: 0.5rpx solid #ebedf0;
			font-size: 28rpx;
			color: $font-color;

			.row {
				margin-left: 500rpx;
			}
		}
	}
</style>
