'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = await db.collection("userInfo");
	const account = event;
	const {affectedDocs} = await collection.where(account).get();
	return {
		msg:"获取成功",
		affectedDocs
	}
};
