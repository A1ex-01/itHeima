'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = await db.collection("userInfo");
	const {acid,popId} = event;
	const {data} = await collection.where({"acid":acid}).get();
	let {myNavList} = data[0];
	myNavList = myNavList.filter(item=>item!=popId);
	const msg = await collection.where({"acid":acid}).update({"myNavList":myNavList});
	return {
		msg
	}
};
