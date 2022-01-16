'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = await db.collection("userInfo");
	const {acid,art_id} = event;
	const {data} = await collection.where({"acid":acid}).get();
	let {followArt_id} = data[0];
	if(followArt_id.indexOf(art_id) == -1){
		followArt_id.push(art_id);
	}else{
		followArt_id = followArt_id.filter(item=>item!=art_id);
	}
	console.log("+="+followArt_id);
	const msg = await collection.where({"acid":acid}).update({"followArt_id":followArt_id});
	return {
		followArt_id,
		msg
	}
};
