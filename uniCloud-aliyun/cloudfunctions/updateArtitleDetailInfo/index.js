'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = await db.collection("artitleDetailInfo");
	const {art_id,acid,content,name,photo} =  event;
	const {data} = await collection.where({"art_id":art_id}).get();
	
	const info = data[0].commentator;
	info.push({
		"acid":acid,
		"comContent":content,
		"apply":[],
		"name":name,
		"photo":photo
	})
	const datas = await collection.where({"art_id":art_id}).update({"commentator":info});
	
	//返回数据给客户端
	return {
		datas,
		info
	}
};
