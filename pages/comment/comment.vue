<template>
	<view>
		<CommentInfo isParent="true" isCount="100" :commentator="commentator" :art_id="art_id"
			v-if="commentator"></CommentInfo>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				art_id:null,
				commentator:null
			};
		},
		onLoad(val) {
			this.art_id = val.art_id;
			this.getInfo();
		},
		methods:{
			getInfo(){
				uni.showLoading({
					title:"加载中"
				})
				uniCloud.callFunction({
					name:"getArt_idData",
					data:{
						"art_id":this.art_id
					},
					success:(res)=> {
						this.commentator =  res.result.data[0].commentator;
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
