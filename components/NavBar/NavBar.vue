<template>
	<view class="navbar">
		<view class="warp">
			<image src="../../static/imgs/toutiao_logo.png" class="img"></image>
			<uni-icons type="search" class="search" style="font-size: 50rpx;
			color: #fff; width: 92rpx; height: 100%; line-height: 92rpx;" @click="goSearch"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name:"NavBar",
		data() {
			return {
				
			};
		},
		methods:{
			goSearch(){
				uni.navigateTo({
					url:"../../pages/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
	.warp{
		width: 100%;
		height: 92rpx;
		background-color: $base-color;
		display: flex;
		justify-content: space-between;
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		align-items: center;
		.img{
			width: 220rpx;
			height: 70rpx;
		}
	}
</style>
