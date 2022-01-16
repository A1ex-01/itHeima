<template>
	<view>
		<DetailFooter :art_id="art_id" :artitleData="artitleData"></DetailFooter>
		<DetailContent :artitleData="artitleData"></DetailContent>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				art_id:null,
				artitleData:null
			}
		},
		onLoad(e) {
			this.art_id = e.art_id;
			this.getDetailData();
		},
		methods:{
			getDetailData(){
				uni.showLoading({
					title:"加载中"
				})
				uniCloud.callFunction({
					name:"getArt_idData",
					data:{
						"art_id":this.art_id
					},
					success:async(res)=>{
						this.artitleData = await res.result.data[0];
						uni.hideLoading();
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
