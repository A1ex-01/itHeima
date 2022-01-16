<template>
	<view style="padding: 20rpx;box-sizing: border-box;" v-if="allChannel&&myChannel">
		<view class="choose">未选择</view>
		<view class="todo">
			<view class="todoList" v-for="(item,index) in allChannel" :key="item.id"
				v-if="!myChannel.includes(item.name)">
				<text>{{item.name}}</text>
				<text class="mask" @click="add(item.name)">+</text>
			</view>
		</view>
		<view class="choose">已选择</view>
		<view class="do">
			<view class="doList" v-for="(item,index) in myChannel" :key="item">
				<text>{{item}}</text>
				<text class="mask" @click="sub(item)" v-if="item!='推荐'">-</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myChannel: null,
				allChannel: null
			};
		},
		mounted() {
			this.getAllChannels();
		},
		methods: {
			getAllChannels() {
				uniCloud.callFunction({
					name: "getChannels",
					success: (res) => {
						this.allChannel = res.result.data;
						this.getMineChannels();
					}
				})

			},
			sub(item){
				uni.showLoading({
					title:"加载中"
				})
				for (var i in this.allChannel) {
					if(this.allChannel[i].name == item){
						console.log(this.allChannel[i].id);
						uni.getStorage({
							key:"token",
							success: (res) => {
								uniCloud.callFunction({
									name:"DeleteMyNavList",
									data:{
										"acid":res.data,
										"popId":this.allChannel[i].id
									},
									success: (res) => {
										uni.hideLoading();
										this.getAllChannels();
										this.$forceUpdate();
										uni.$emit("indexUpdate","success");
									}
								})
							}
						})
					}
				}
			},
			add(val){
				uni.showLoading({
					title:"加载中"
				})
				for (var i in this.allChannel) {
					if(this.allChannel[i].name == val){
						console.log(this.allChannel[i].id);
						uni.getStorage({
							key:"token",
							success: (res) => {
								uniCloud.callFunction({
									name:"changeMyNavList",
									data:{
										"acid":res.data,
										"pushId":this.allChannel[i].id
									},
									success: (res) => {
										console.log(res);
										uni.hideLoading();
										this.getAllChannels();
										this.$forceUpdate();
										uni.$emit("indexUpdate","success");
										
									}
								})
							}
						})
					}
				}
			},
			getMineChannels() {
				uni.getStorage({
					key: "token",
					success: (res) => {
						uniCloud.callFunction({
							name: "getMineRes",
							data: {
								"acid": res.data
							},
							success: async (res) => {
								this.myChannel = await res.result.data.data[0].myNavList;
								for (var i = 0; i < this.allChannel.length; i++) {
									for (var j = 0; j < this.myChannel.length; j++) {
										if (this.myChannel[j] == this.allChannel[i].id) {
											this.myChannel[j] = this.allChannel[i].name;
										}
									}
								}
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.todo,
	.do {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;

		.todoList,
		.doList {
			width: 150rpx;
			font-size: 30rpx;
			padding: 16rpx 10rpx;
			margin-right: 60rpx;
			margin-bottom: 30rpx;
			text-align: center;
			border-radius: 20rpx;
		}

		.todoList {
			border: 1px solid $base-color;
			position: relative;

			.mask {
				position: absolute;
				right: -16rpx;
				top: -10rpx;
				width: 50rpx;
				height: 35rpx;
				line-height: 35rpx;
				background-color: red;
				border-radius: 28rpx;
				color: $font-color;
			}
		}

		.doList {
			border: 1px solid $font-color;
			position: relative;

			.mask {
				position: absolute;
				right: -16rpx;
				top: -10rpx;
				width: 50rpx;
				height: 35rpx;
				line-height: 35rpx;
				background-color: #ccc;
				border-radius: 28rpx;
				color: $font-color;
			}
		}
	}

	.choose {
		width: 100%;
		padding: 20rpx 0rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		background-color: rgba($color: #000000, $alpha: .1);
		border-left: 10rpx solid $base-color;
	}
</style>
