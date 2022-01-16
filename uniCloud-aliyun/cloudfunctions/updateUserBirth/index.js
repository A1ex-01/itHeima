'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = await db.collection("userInfo");
	const {acid,birthday} = event;
	const data = await collection.where({"acid":acid}).update({"birthday":birthday});
	return {
		msg:"更新成功",
		data
	}
};
