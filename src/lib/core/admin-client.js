const axios = require("axios")
require("dotenv").config({path:"../../../.env"})
const baseUrl = process.env.BASEURL

module.exports ={

	async getCourseData(courseID){

		const cookieValue = process.env.SECRETKEY
		const url = baseUrl.replace("_module_","courses").concat(courseID)

		const config = {
			headers: {"cookie" : cookieValue}
		}
	
		const {data} = await axios.get(url, config)

		if(data.length == 0){
			return ""
		}else{
			return data[0].value.substring(6, data[0].value.length)
		}
	},

	async getLabData(labsID){
		const cookieValue = process.env.SECRETKEY
		const url = baseUrl.replace("_module_","labprojects").concat(labsID)

		const config = {
			headers: {"cookie" : cookieValue}
		}
	
		const {data} = await axios.get(url, config)

		if(data.length == 0){
			return ""
		}else{
			let cutSpace = data[0].value.indexOf("-") +2
			return data[0].value.substring(cutSpace, data[0].value.length).trim()
		}

	},
	
	async getLiveData(liveID){
		const cookieValue = process.env.SECRETKEY
		const url = baseUrl.replace("_module_","lives").concat(liveID)

		const config = {
			headers: {"cookie" : cookieValue}
		}
	
		const {data} = await axios.get(url, config)

		if(data.length == 0){
			return ""
		}else{
			return data[0].value.substring(6, data[0].value.length).trim()
		}

	},

	async getChallengesData(challengeID){
		const cookieValue = process.env.SECRETKEY
		const url = baseUrl.replace("_module_","code-challenge").concat(challengeID)

		const config = {
			headers: {"cookie" : cookieValue}
		}
	
		const {data} = await axios.get(url, config)

		if(data.length == 0){
			return ""
		}else{
			return data[0].value.substring(6, data[0].value.length)
		}
	}
	
}


