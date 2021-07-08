require("module-alias/register")
const BaseService = require("../core/base-service")

async function create(pageNav, jsonBase, trackID){

	const batchService = new BaseService(
		{
			page:pageNav, 
			moduleName:"batch",
			jsonFile: jsonBase
		})

	
	await batchService.addNew()
	
	await batchService.setInputText("id_start_enrollment", jsonBase.dateInit)
	await batchService.setInputText("id_finish_enrollment", jsonBase.dateExpiration)
	await batchService.setInputTextTab("id_track_text", trackID)

	await batchService.setSelection("id_school", 1)
	await batchService.setInputTextTab("id_corporate_text", 1)
	await batchService.setInputText("id_exclusive_days", jsonBase.exclusiveDay)

	const ID = await batchService.save()
	
	return ID
}

module.exports.create = create

