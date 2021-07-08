class BaseService {

	constructor({page, moduleName, jsonFile}){
		this.page = page
		this.moduleName = moduleName
		this.jsonFile = jsonFile
	}

	async addNew(){
		try {
			await this.page.goto(`https://app.digitalinnovation.one/admin/learning/${this.moduleName}/add/`)
		// eslint-disable-next-line no-empty
		} catch (e) {
		}
	}

	async change(id){
		try {
			await this.page.goto(`https://app.digitalinnovation.one/admin/learning/${this.moduleName}/${id}/change/`)
		// eslint-disable-next-line no-empty
		} catch (e) {
		}
	}

	delay(time) {
		return new Promise(function(resolve) { 
			setTimeout(resolve, time)
		})
	}

	async save(){
		try {
			await this.delay(4000)
			let url = ""
			await (await this.page.$("[value='Salvar e continuar editando']")).click()
			this.delay(5000)

			await this.page.reload()
			url = await this.page.url().toString()
			
			console.log(`${this.moduleName} saved.`)
			console.log(url)

			await this.delay(4000)
			url = url.replace(`https://app.digitalinnovation.one/admin/learning/${this.moduleName}/`,"")
			url = url.replace("/change/","")
			this.delay(2000)
							
			return url
		} catch (e) {
			console.log(e)
		}
	}

	async getSlug(){
		try {
			this.delay(2000)
			const slugName = await this.page.evaluate(()=> document.querySelector("#id_slug").value)
			return slugName
		} catch (e) {
			console.log(e)
		}
	}

	async setInputTextTab(fieldId, value){
		await this.page.type(`input[id=${fieldId}]`, value.toString())
		await this.delay(4000)
		await (await this.page.$(`input[id=${fieldId}]`)).press("ArrowDown")
		await (await this.page.$(`input[id=${fieldId}]`)).press("Enter")
	}

	async setInputText(fieldId, value){
		await this.page.evaluate((fieldId, value) => { 
			document.getElementById(fieldId).value = value
		},fieldId, value)
	}

	async setSelection(selectionId, value){
		await this.page.evaluate((selectionId, value) => { 
			document.getElementById(selectionId).value = value
		},selectionId, value)
	}

	async setCheckBox(checkboxId, value){
		await this.page.evaluate((checkboxId, value) => { 
			document.getElementById(checkboxId).checked = value
		},checkboxId, value)
	}

	async setSkillsById(skillArays){
		try {
			for (let index = 0; index < skillArays.length; index++) {

				//adiciona novo item se necessario
				if(index > 0 ){
					await this.page.evaluate(() => {
						document.querySelector(`#${this.moduleName}hasskills_set-group > div > fieldset > table > tbody > tr.add-row > td > a`).click()
					})
				}

				this.setSelection(`id_${this.moduleName}hasskills_set-${index}-skill`, "Android")
			}
		} catch (e) {
			console.log(e)
		}
	}

	async setSkillsByText(skillArays){
		try {
			for (let index = 0; index < skillArays.length; index++) {

				//adiciona novo item se necessario
				if(index > 0 ){
					await this.page.evaluate(() => {
						document.querySelector(`#${this.moduleName}hasskills_set-group > div > fieldset > table > tbody > tr.add-row > td > a`).click()
					})
				}     
				this.setInputTextTab(`id_${this.moduleName}hasskills_set-${index}-skill_text`, "Android")
			}
		} catch (e) {
			console.log(e)
		}
	}

}

module.exports = BaseService