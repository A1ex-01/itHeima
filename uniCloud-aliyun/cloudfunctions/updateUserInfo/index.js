'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = await db.collection("userInfo");
	const {acid,imgsrc} = event;
	const data = await collection.where({"acid":acid}).update({"photo":imgsrc});
	return {
		msg:"更新成功",
		data
	}
};
