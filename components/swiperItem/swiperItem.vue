<template>
	<view class="swiperitem" v-if="artitles&&navList">
		<swiper :current="current" @change="swiperChange" class="swi">
			<swiper-item v-for="(item,index) in navList" :key="index" class="swim">
				<scroll-view class="swiper-item"  scroll-y="true" @scrolltolower="scrolltolower">
					<view class="artitle-item" v-for="(value,i) in artitles[item.id]" :key="i">
						<view class="type_0" v-if="value.cover.type == 0" @click="goDetail(value.art_id)">
							<text class="tit">{{value.title}}</text>
							<view class="bottom">
								<text class="b1">作者 {{value.aut_name}}</text>
								<text class="b1">{{value.comm_count}}评论</text>
								<text class="b1">发布时间: {{value.pubdate | format}}</text>
							</view>
						</view>
						<view class="type_1" v-if="value.cover.type == 1" @click="goDetail(value.art_id)">
							<view class="top">
								<text class="t1">{{value.title}}</text>
								<image :src="value.cover.images[0] | format1" v-if="value.cover.images[0]" class="ti1">
								</image>
							</view>
							<view class="bottom">
								<text class="tb1">作者: {{value.aut_name}}</text>
								<text class="tb1">{{value.comm_count}}评论</text>
								<text class="tb1">发布时间: {{value.pubdate | format}}</text>
							</view>
						</view>
						<view class="type_3" v-if="value.cover.type == 3" @click="goDetail(value.art_id)">
							<text class="t3">{{value.title}}</text>
							<view class="img">
								<image class="imgitem" v-if="imgItem" :src="imgItem | format1" mode=""
									v-for="(imgItem,id) in value.cover.images" :key="id"></image>
							</view>
							<view class="bottom">
								<text class="text">作者 {{value.aut_name}}</text>
								<text class="text">{{value.comm_count}}评论</text>
								<text class="text">发布时间: {{value.pubdate | format}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "swiperItem",
		data() {
			return {
				navList: null,
				artitles: [],
				current: 0,
				page:[1,1,1,1,1,1,1,1,1,1,1],
				flag:false
			};
		},
		props: ["curr"],
		filters: {
			format(val) {
				return Math.ceil((new Date(val) - Date.now()) * (-1) / 24 / 60 / 60 / 1000) + "天前"
			},
			format1(val) {
				if (!val) {
					return "../../static/imgs/index_s.png"
				} else {
					return val
				}
			}
		},
		watch: {
			current() {
				if (!this.artitles[this.navList[this.current].id]) {
					uni.showLoading({
						title:"加载中"
					})
					this.getChannelArtitles();
				}
			},
			curr(newV) {
				this.current = newV;
			}
		},
		mounted() {
			this.getChannels();
		},
		methods: {
			scrolltolower(){
				if(!this.flag){
					uni.showLoading({
						title:"加载中"
					})
					this.flag = true;
					this.page[this.current]++;
					uniCloud.callFunction({
						name:"indexPageNext",
						data:{
							channel: this.navList[this.current].id,
							page:this.page[this.current]
						},
						success:async(res)=> {
							const moreInfo = await res.result.data;
							if(moreInfo.length !== 0){
								console.log(moreInfo);
								for (var i = 0; i < moreInfo.length; i++) {
									this.artitles[this.navList[this.current].id].push(res.result.data[i]);
								}
								console.log(this.artitles[this.navList[this.current].id]);
								this.flag = false;
								this.$forceUpdate();
							}
							uni.hideLoading()
						}
					})
				}
			},
			goDetail(val) {
				uni.navigateTo({
					url: "../../pages/detail/detail?art_id=" + val,
					animationType: "pop-in",
					animationDuration: 1000
				});
			},
			swiperChange(e) {
				this.current = e.detail.current;
				this.flag = false;
				this.$emit("getartcurr", this.current);
			},
			getChannels() {
				uni.showLoading({
					title: '加载中',
					success:()=>{
				uni.getStorage({
					key:"token",
					success:(res)=>{
						uniCloud.callFunction({
							name:"getMineRes",
							data:{
								"acid":res.data
							},
							success:(res)=> {
								const navList = res.result.data.data[0].myNavList;
								uniCloud.callFunction({
									name:"getNewNavList",
									data:{
										"navList":navList
									},
									success:(res)=> {
										this.navList = res.result.data;
										this.getChannelArtitles();
									}
								})
							}
						})
					},
					fail:()=> {
						uniCloud.callFunction({
							name:"getChannels",
							success:(res)=>{
								this.navList = res.result.data;
								this.getChannelArtitles();
							}
						})
					}
				})
					}
				});
			},
			getChannelArtitles() {
				uniCloud.callFunction({
					name: "getChannelArtitles",
					data: {
						channel: this.navList[this.current].id
					},
					success: async (res) => {
						this.artitles[this.navList[this.current].id] = await res.result.data;
								uni.hideLoading();
						this.$forceUpdate();
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.swiperitem {
		position: fixed;
		top: 180rpx;
		bottom: 100rpx;
		left: 0;
		right: 0;
	}

	.swi {
		width: 100%;
		height: 100%;
		.swim {
			width: 100%;
			height: 100%;

			.swiper-item {
				width: 100%;
				height: 100%;
			}
		}
	}

	.artitle-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}

	.type_0 {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		>.tit {
			color: $font-color;
			font-size: 28rpx;
			width: 75%;
		}

		.bottom {
			display: flex;
			color: #969696;
			font-size: 24rpx;
			margin-top: 20rpx;

			>.b1 {
				margin-right: 10rpx;
			}
		}
	}

	.type_1 {
		display: flex;
		flex-direction: column;

		>.top {
			display: flex;
			justify-content: space-between;

			>.t1 {
				color: $font-color;
				font-size: 28rpx;
				width: 75%;
			}

			.ti1 {
				width: 226rpx;
				height: 140rpx;
			}
		}

		.bottom {
			display: flex;
			color: #969696;
			font-size: 24rpx;
			margin-top: 10rpx;

			>.tb1 {
				margin-right: 10rpx;
			}
		}
	}

	.type_3 {
		display: flex;
		flex-direction: column;

		>.t3 {
			color: $font-color;
			font-size: 28rpx;
			width: 100%;
		}

		>.img {
			width: 100%;
			margin: 6rpx 0rpx;
			display: flex;
			justify-content: space-between;

			>.imgitem {
				width: 226rpx;
				height: 140rpx;
			}
		}

		.bottom {
			display: flex;
			color: #969696;
			font-size: 24rpx;
			margin-top: 10rpx;

			>.text {
				margin-right: 10rpx;
			}
		}
	}
</style>
