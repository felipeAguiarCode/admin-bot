module.exports= {
	async doLogin(page, user, pass){

		try {
			await page.goto("https://app.digitalinnovation.one/admin/")

			await page.evaluate((user, pass) => { 
				document.getElementById("id_username").value = user
				document.getElementById("id_password").value = pass
			}, user, pass)

			await page.click("input[type=\"submit\"]")
            
		} catch (e) {
			console.log(`error: ${e}`) 
		}
	}
}