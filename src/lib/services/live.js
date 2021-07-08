const BaseService = require("../core/base-service")

async function create(pageNav, jsonBase){
	let livesCreated = []
	let ID = 0

	const liveService = new BaseService(
		{
			page:pageNav, 
			moduleName:"live"
		})

	console.log(jsonBase)

	for (let index = 0; index < jsonBase.length; index++) {

		await liveService.addNew()
	
		await liveService.setInputTextTab("id_author_text", 330417)

		await liveService.setInputTextTab("id_main_skill_text", jsonBase[index].skill)
		await liveService.setInputText("id_name", jsonBase[index].nameContent)
		await liveService.setSelection("id_level", "intermediate")

		await liveService.setInputText("id_workload", 120)
		await liveService.setInputText("id_scheduled_0", jsonBase[index].dateContent)
		await liveService.setInputText("id_scheduled_1", jsonBase[index].hourContent)
		
		ID = await liveService.save()
		
		livesCreated.push({
			id:ID,
			url:`https://app.digitalinnovation.one/admin/learning/live/${ID}/change/`,
			...jsonBase[index]
		})

		liveService.delay(3000)
	}

	return livesCreated
}

module.exports.create = create

