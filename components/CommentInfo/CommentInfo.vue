<template>
	<view class="cinfo" v-if="commentator&&isCount">
		<view class="userInfo" v-for="(item,index) in commentator" :key="index" v-if="index < isCount">
			<view class="user">
				<image :src="item.photo"></image>
				<view class="cont">
					<text>{{item.name}}</text>
					<text style="font-size: 22rpx;">{{item.comContent}}</text>
					<view class="apply" @click.stop="handle(index)">
						回复
					</view>
				</view>
			</view>
			<template v-if="item.apply">
				<commentInfo isParent="false" :commentator="item.apply" :art_id="art_id" :isCount="isCount">
				</commentInfo>
			</template>
		</view>
		<uni-popup ref="popup" type="center">
			<uni-popup-dialog type="success" mode="input" title="回复" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "CommentInfo",
		props: ["commentator", "art_id", "isParent", "isCount"],
		data() {
			return {
				index: 0,
				isP: null
			};
		},
		mounted() {
			// this.exchange();
			this.isP = this.isParent;
		},
		watch: {},
		methods: {
			exchange() {
				for (let i = 0; i < this.commentator.length; i++) {
					uniCloud.callFunction({
						name: "getMineRes",
						data: {
							"acid": this.commentator[i].acid
						},
						success: (res) => {
							if (!this.commentator[i].name) {
								const name = res.result.data.data[0].name;
								const photo = res.result.data.data[0].photo;
								Object.assign(this.commentator[i], {
									"name": name,
									"photo": photo
								});
								console.log(i);
							}
							this.$forceUpdate();
						}
					})
				}
			},
			handle(i) {
				this.$refs.popup.open("center");
				this.index = i;
				uni.getStorage({
					key: "token",
					fail() {
						uni.navigateTo({
							url: "../../pages/login/login"
						})
					}
				})
				// this.$forceUpdate();
			},
			confirm(val) {
				uni.showLoading({
					title: "加载中"
				})
				let _this = this;
				while (_this.isP == "false") {
					_this = _this.$parent.$parent.$parent;
				}
				if (val) {
					uni.getStorage({
						key: "token",
						success: (res) => {
							let obj = {
								"acid": res.data,
								"comContent": val,
								"apply": []
							};
							uni.getStorage({
								key: "token",
								success: (res) => {
									uniCloud.callFunction({
										name: "getMineRes",
										data: {
											"acid": res.data
										},
										success: (res) => {
											const name = res.result.data.data[0].name;
											const photo = res.result.data.data[0].photo;
											Object.assign(obj, {
												"name": name,
												"photo": photo
											});
											console.log(obj);
											this.commentator[this.index].apply.push(obj);
											uniCloud.callFunction({
												name: "updateApplyComm",
												data: {
													"art_id": this.art_id,
													"commentator": _this.commentator
												},
												success: () => {
													uni.hideLoading();
													// this.exchange();
													console.log(_this.commentator)
													this.$forceUpdate();
											
												}
											})
										}
									})
								}
							})
						}
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.cinfo {
		width: 100%;
		margin-top: 50rpx;

		.userInfo {
			width: 100%;
			padding: 10rpx 10rpx;
			box-sizing: border-box;
			margin-bottom: 20rpx;
			background-color: rgba(0, 123, 255, 0.1);

			.user {
				display: flex;

				>image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}

				>.cont {
					margin-top: 15rpx;
					display: flex;
					flex-direction: column;
					margin-top: 20rpx;
					justify-content: space-between;

				}
			}

		}
	}

	.apply {
		width: 48rpx;
		height: 32rpx;
		font-size: 24rpx;
		padding: 4rpx 16rpx;
		border-radius: 20rpx;
		border: 1px solid #ccc;
		color: $font-color;
		margin-top: 8rpx;
	}
</style>
