'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let collection_1 = await db.collection("artitleDetailInfo");
	let collection_2 = await db.collection("artitles");
	const art_id = event;
	let info = await collection_1.where(art_id).get();
	info.data[0].comm_count += 1;
	const data_1 = await collection_1.where(art_id).update({"comm_count":info.data[0].comm_count});
	const data_2 = await collection_2.where(art_id).update({"comm_count":info.data[0].comm_count});
	//返回数据给客户端
	return {
		data_1,
		data_2,
		info
	}
};
