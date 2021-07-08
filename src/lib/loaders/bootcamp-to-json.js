const xlsx = require("xlsx")
const moment = require("moment")
const adminAPI = require("../core/admin-client")
const fs = require("fs")

require("dotenv").config({path:__dirname+"/./../../.env"})

class ExcelService  {

	constructor(filePath){
		this.filePath = filePath
		this.getAPI = adminAPI
		this.ws = undefined
		this.startRow = process.env.EXCELSTARTROW
	}

	async createBootcampJSON(){
		let wb = xlsx.readFile(this.filePath, {cellDates:true})
		this.ws = wb.Sheets[process.env.EXCELCOURSE.toString()]

		let bootcampJSON = await this.createBaseObject()
		bootcampJSON.courses = await this.loadCourses()
		bootcampJSON.labs = await this.loadLabs()
		bootcampJSON.mentoring = await this.loadMentorings()
        
		await this.writeJsonToFile(bootcampJSON)

		return bootcampJSON
	}

	async createBaseObject(){
		return {
			track:{
				companyId: 1,
				name: this.ws["D10"].v,
				companyName: this.ws["D11"].v,
				workload: this.ws["D16"].v,
				dateFinish : moment(this.ws["D14"].v).format("DD/MM/YYYY") ,
				skills: ["Node.JS"]
			},
			batch:{
				dateInit:moment(this.ws["D12"].v).format("DD/MM/YYYY"),
				dateExpiration:moment(this.ws["D13"].v).format("DD/MM/YYYY"),
				exclusiveDay:15
			},
			courses: [],
			labs:[],
			mentoring:[]
		}
	}

	async loadCourses(){

		const contentFilter = "curso" 
		let contentID = undefined
		let contentName = undefined
		let contentType = undefined
		let contentList = []

		for (let row = this.startRow; row < 80; row++) {
			try {
				
				contentID = this.ws[`A${row}`].v
				contentType = this.ws[`F${row}`].v
                
				if(contentType.toLowerCase().trim() === 
					contentFilter.toLowerCase().trim()){
					
					contentName = await this.getAPI.getCourseData(contentID)

					contentList.push({
						id: contentID,
						name: contentName,
						order: (row - this.startRow)
					})
				}

			// eslint-disable-next-line no-empty
			} catch (error) {
			}
		}

		return contentList
	}

	async loadLabs(){

		const contentFilter = "Desafios de Projeto" 
		let contentID = undefined
		let contentName = undefined
		let contentType = undefined
		let contentList = []

		for (let row = this.startRow; row < 80; row++) {
			try {
				
				contentID = this.ws[`A${row}`].v
				contentType = this.ws[`F${row}`].v
                
				if(contentType.toLowerCase().trim() === 
					contentFilter.toLowerCase().trim()){
					
					contentName = await this.getAPI.getLabData(contentID)

					contentList.push({
						id: contentID,
						name: contentName,
						order: (row - this.startRow)
					})
				}

			// eslint-disable-next-line no-empty
			} catch (error) {
			}
		}

		return contentList
	}

	async loadMentorings(){
		const startRow = process.env.EXCELSTARTROW
		const contentTypeAccepted = "mentoria"
		let contentName = undefined
		let contentType = undefined
		let contentSkill = undefined
		let contentDate = undefined
		let contentHour = undefined
		let contentList = []

		for (let row = startRow; row < 500; row++) {
			try {
				//contentID = this.ws[`A${row}`].v
				contentName = this.ws[`C${row}`].v
				contentType = this.ws[`F${row}`].v
				contentSkill = this.ws[`D${row}`].v 
				contentDate = moment(this.ws[`G${row}`].v).format("DD/MM/YYYY") 
				contentHour = moment(this.ws[`G${row}`].v).format("HH:mm:SS") 

				if(contentName == undefined) contentList
				if(contentType.toLowerCase().trim() != contentTypeAccepted) continue

				contentList.push({
					//id: contentID,
					nameContent: contentName,
					skill: contentSkill,
					dateContent: contentDate,
					hourContent: contentHour, 
					order: (row - startRow)
				})
			// eslint-disable-next-line no-empty
			} catch (error) {
			}
		}
		return contentList
	}

	async writeJsonToFile(jsonData){
		try {
			fs.writeFileSync("C:/Users/DIO/Documents/projetos/robots/src/docs/bootcamp.json", JSON.stringify(jsonData))
			console.log("JSON data is saved.")
		} catch (error) {
			console.log(error)
		}
	}

	async loadJsonFromFile(){
		try {
			let rawdata = fs.readFileSync("C:/Users/DIO/Documents/projetos/robots/src/docs/bootcamp.json" , "utf8")
			console.log("JSON data is loaded.")
			return JSON.parse(rawdata)
		} catch (error) {
			console.log(error)
			console.log("Error JSON data is load.")			
		}
	}

}

module.exports = ExcelService