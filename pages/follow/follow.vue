<template>
	<view>
		<scroll-view class="swiper-item"  scroll-y="true">
			<view class="artitle-item" v-for="(value,i) in artBannerInfo" :key="i">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				art_id:[],
				artBannerInfo:[]
			};
		},
		onLoad(val) {
			this.art_id = val.info.split(",");
			this.getArtitleBanner();
		},
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
		methods:{
			goDetail(val) {
				uni.navigateTo({
					url: "../../pages/detail/detail?art_id=" + val,
					animationType: "pop-in",
					animationDuration: 1000
				});
			},
			getArtitleBanner(){
				uni.showLoading({
					title:"加载中"
				})
				for (var i = 0; i < this.art_id.length; i++) {
					uniCloud.callFunction({
						name:"getChannelArtitles",
						data:{
							art_id:this.art_id[i]
						},
						success:(res)=> {
							this.artBannerInfo.push(res.result.data[0]);
							uni.hideLoading();
						}
					})
				}
			}
		}
	}
</script>
<style lang="scss">
			.swiper-item {
				position: fixed;
				top: 100rpx;
				bottom: 0rpx;
				left: 0;
				right: 0;
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
			}
</style>
