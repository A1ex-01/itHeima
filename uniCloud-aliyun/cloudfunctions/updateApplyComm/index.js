'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = await db.collection("artitleDetailInfo");
	const {art_id,commentator} = event;
	const data = await collection.where({"art_id":art_id}).update({"commentator":commentator});
	//返回数据给客户端
	return {
		msg:"success",
		data
	}
};
