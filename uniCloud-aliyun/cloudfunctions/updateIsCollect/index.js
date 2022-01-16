'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = await db.collection("userInfo");
	const {acid,art_id} = event;
	const {data} = await collection.where({"acid":acid}).get();
	let {collectArt_id} = data[0];
	if(collectArt_id.indexOf(art_id) == -1){
		collectArt_id.push(art_id);
	}else{
		collectArt_id = collectArt_id.filter(item=>item!=art_id);
	}
	const msg = await collection.where({"acid":acid}).update({"collectArt_id":collectArt_id});
	return {
		collectArt_id,
		msg
	}
};
