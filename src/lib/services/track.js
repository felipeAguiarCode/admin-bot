require("module-alias/register")
const BaseService = require("../core/base-service")

async function create(pageNav, jsonBase, trackType){

	const trackService = new BaseService(
		{
			page:pageNav, 
			moduleName:"track",
			jsonFile: jsonBase
		})

	await trackService.addNew()

	await trackService.setInputTextTab("id_corporate_text", 1)
	await trackService.setInputText("id_name", jsonBase.name)

	await trackService.setCheckBox("id_active", false)
	await trackService.setSelection("id_track_type", trackType)
	await trackService.setSelection("id_is_journey", 3)
	await trackService.setInputText("id_enrollment_days", 30)
	await trackService.setInputText("id_level", 2)
	await trackService.setInputText("id_pixel_name", 0)

	const trackID = await trackService.save()
	const slugName  = await trackService.getSlug()

	return {trackID, slugName}
}

async function addCourses(pageNav, jsonBase, trackID){
	const contentTypeID = 17
	const trackService = new BaseService(
		{
			page:pageNav, 
			moduleName:"track",
			jsonFile: jsonBase
		})
	

	
	await trackService.change(trackID)

	for (let index = 0; index < jsonBase.length; index++) {

		//adiciona novo item se necessario
		if(index > 0 ){
			await pageNav.evaluate(() => {
				document.querySelector("#trackpath_set-group > div > fieldset > table > tbody > tr.add-row > td > a").click()
			})
		}

		//seta tipo de conteudo
		await pageNav.evaluate((index, contentTypeID)=>{
			document.getElementById(`id_trackpath_set-${index}-content_type`).value = contentTypeID
		}, index, contentTypeID)

		
		//seta conteudo
		await pageNav.type(`input[id=id_trackpath_set-${index}-object_id_text]`, jsonBase[index].name.toString())
		await trackService.delay(4000)
		await (await pageNav.$(`input[id=id_trackpath_set-${index}-object_id_text]`)).press("ArrowDown")
		await (await pageNav.$(`input[id=id_trackpath_set-${index}-object_id_text]`)).press("Enter")

		//seta ordem
		await pageNav.type(`input[id=id_trackpath_set-${index}-order]`, jsonBase[index].order.toString())
		
		//save
		await trackService.save()

	}
}


module.exports.create = create
module.exports.addCourses = addCourses